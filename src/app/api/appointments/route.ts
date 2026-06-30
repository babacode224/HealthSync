import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createAppointmentSchema = z.object({
  doctorId: z.string().min(1),
  dateTime: z.string().min(1),
  type: z.enum(["IN_PERSON", "TELEHEALTH", "FOLLOW_UP", "EMERGENCY"]).optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const upcoming = searchParams.get("upcoming");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const role = (session.user as any).role;

  let where: any = {};

  if (role === "PATIENT") {
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    where.patientId = patient.id;
  } else if (role === "DOCTOR") {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    where.doctorId = doctor.id;
  }

  if (status) {
    where.status = status;
  }

  if (upcoming === "true") {
    where.dateTime = { gte: new Date() };
    where.status = { in: ["SCHEDULED", "CHECKED_IN"] };
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        patient: {
          include: {
            user: { select: { firstName: true, lastName: true, image: true } },
          },
        },
        doctor: {
          include: {
            user: { select: { firstName: true, lastName: true, image: true } },
          },
        },
      },
      orderBy: { dateTime: upcoming === "true" ? "asc" : "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.appointment.count({ where }),
  ]);

  return NextResponse.json({
    appointments,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createAppointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: parsed.data.doctorId },
    select: { id: true, verificationStatus: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  if (doctor.verificationStatus !== "APPROVED") {
    return NextResponse.json({ error: "Doctor is not yet verified" }, { status: 400 });
  }

  const appointmentDate = new Date(parsed.data.dateTime);
  if (appointmentDate <= new Date()) {
    return NextResponse.json({ error: "Appointment must be in the future" }, { status: 400 });
  }

  const conflicting = await prisma.appointment.findFirst({
    where: {
      doctorId: doctor.id,
      dateTime: appointmentDate,
      status: { in: ["SCHEDULED", "CHECKED_IN", "IN_PROGRESS"] },
    },
  });

  if (conflicting) {
    return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 });
  }

  const endTime = new Date(appointmentDate.getTime() + 30 * 60000);

  const appointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      dateTime: appointmentDate,
      endTime,
      type: parsed.data.type || "IN_PERSON",
      reason: parsed.data.reason,
      notes: parsed.data.notes,
    },
    include: {
      doctor: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
