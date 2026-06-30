import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "date query param is required (YYYY-MM-DD)" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      schedules: { where: { dayOfWeek, isActive: true } },
    },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  if (doctor.schedules.length === 0) {
    return NextResponse.json({ slots: [], message: "Doctor is not available on this day" });
  }

  const schedule = doctor.schedules[0];
  const startOfDay = new Date(dateStr + "T00:00:00");
  const endOfDay = new Date(dateStr + "T23:59:59");

  const existingAppointments = await prisma.appointment.findMany({
    where: {
      doctorId: id,
      dateTime: { gte: startOfDay, lte: endOfDay },
      status: { in: ["SCHEDULED", "CHECKED_IN", "IN_PROGRESS"] },
    },
    select: { dateTime: true },
  });

  const bookedTimes = new Set(
    existingAppointments.map((a) => a.dateTime.toISOString())
  );

  const slots: { time: string; available: boolean }[] = [];
  const [startHour, startMin] = schedule.startTime.split(":").map(Number);
  const [endHour, endMin] = schedule.endTime.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const duration = schedule.slotDuration;

  for (let m = startMinutes; m + duration <= endMinutes; m += duration) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const slotDate = new Date(date);
    slotDate.setHours(h, min, 0, 0);

    const isPast = slotDate <= new Date();
    const isBooked = bookedTimes.has(slotDate.toISOString());

    slots.push({
      time: `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
      available: !isPast && !isBooked,
    });
  }

  return NextResponse.json({ slots, schedule });
}
