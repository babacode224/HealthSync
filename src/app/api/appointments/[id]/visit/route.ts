import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const visitSchema = z.object({
  diagnosis: z.string().optional(),
  notes: z.string().optional(),
  vitals: z
    .object({
      bp: z.string().optional(),
      hr: z.string().optional(),
      temp: z.string().optional(),
      spo2: z.string().optional(),
      weight: z.string().optional(),
    })
    .optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "DOCTOR" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only doctors can create visit notes" }, { status: 403 });
  }

  const { id } = await params;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { doctor: true, visit: true },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  if (role === "DOCTOR" && appointment.doctor.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your appointment" }, { status: 403 });
  }

  if (appointment.visit) {
    return NextResponse.json({ error: "Visit notes already exist for this appointment" }, { status: 409 });
  }

  const body = await req.json();
  const parsed = visitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const visit = await prisma.visit.create({
    data: {
      appointmentId: id,
      doctorId: appointment.doctorId,
      diagnosis: parsed.data.diagnosis,
      notes: parsed.data.notes,
      vitals: (parsed.data.vitals as any) || undefined,
    },
  });

  if (appointment.status !== "COMPLETED") {
    await prisma.appointment.update({
      where: { id },
      data: { status: "COMPLETED" },
    });
  }

  return NextResponse.json(visit, { status: 201 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "DOCTOR" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only doctors can update visit notes" }, { status: 403 });
  }

  const { id } = await params;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { doctor: true, visit: true },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  if (role === "DOCTOR" && appointment.doctor.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your appointment" }, { status: 403 });
  }

  if (!appointment.visit) {
    return NextResponse.json({ error: "No visit notes to update" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = visitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const visit = await prisma.visit.update({
    where: { id: appointment.visit.id },
    data: {
      ...(parsed.data.diagnosis !== undefined && { diagnosis: parsed.data.diagnosis }),
      ...(parsed.data.notes !== undefined && { notes: parsed.data.notes }),
      ...(parsed.data.vitals && { vitals: parsed.data.vitals }),
    },
  });

  return NextResponse.json(visit);
}
