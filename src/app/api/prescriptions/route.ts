import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const medicationSchema = z.object({
  name: z.string().min(1),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  route: z.string().optional(),
  instructions: z.string().optional(),
  sideEffects: z.string().optional(),
});

const createPrescriptionSchema = z.object({
  patientId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  refillsTotal: z.number().int().min(0).optional(),
  pharmacy: z.string().optional(),
  medications: z.array(medicationSchema).min(1),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
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

  const [prescriptions, total] = await Promise.all([
    prisma.prescription.findMany({
      where,
      include: {
        patient: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        doctor: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        medications: true,
        refills: { orderBy: { requestedAt: "desc" }, take: 3 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.prescription.count({ where }),
  ]);

  return NextResponse.json({
    prescriptions,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "DOCTOR" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only doctors can create prescriptions" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createPrescriptionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!doctor && role !== "ADMIN") {
    return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
  }

  const patient = await prisma.patient.findUnique({
    where: { id: parsed.data.patientId },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const prescription = await prisma.prescription.create({
    data: {
      patientId: patient.id,
      doctorId: doctor!.id,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      refillsTotal: parsed.data.refillsTotal || 0,
      pharmacy: parsed.data.pharmacy,
      medications: {
        create: parsed.data.medications,
      },
    },
    include: {
      medications: true,
      patient: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return NextResponse.json(prescription, { status: 201 });
}
