import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "DOCTOR" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60000);

  const [
    todayAppointments,
    totalPatients,
    upcomingAppointments,
    completedThisMonth,
    activePrescriptions,
    pendingVisitNotes,
  ] = await Promise.all([
    prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        dateTime: { gte: startOfDay, lt: endOfDay },
        status: { in: ["SCHEDULED", "CHECKED_IN", "IN_PROGRESS"] },
      },
    }),
    prisma.appointment.groupBy({
      by: ["patientId"],
      where: { doctorId: doctor.id },
    }).then((groups) => groups.length),
    prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        dateTime: { gt: now },
        status: "SCHEDULED",
      },
    }),
    prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        status: "COMPLETED",
        updatedAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), 1),
        },
      },
    }),
    prisma.prescription.count({
      where: { doctorId: doctor.id, status: "ACTIVE" },
    }),
    prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        status: "COMPLETED",
        visit: null,
      },
    }),
  ]);

  return NextResponse.json({
    todayAppointments,
    totalPatients,
    upcomingAppointments,
    completedThisMonth,
    activePrescriptions,
    pendingVisitNotes,
  });
}
