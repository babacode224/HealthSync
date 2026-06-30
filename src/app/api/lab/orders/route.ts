import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createLabOrderSchema = z.object({
  patientId: z.string().min(1),
  testName: z.string().min(1),
  testCode: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(["ROUTINE", "URGENT", "STAT"]).optional(),
  clinicalNotes: z.string().optional(),
  sampleType: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const role = (session.user as any).role;

  let where: any = {};

  if (role === "LAB_TECH") {
    const labTech = await prisma.labTech.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!labTech) {
      return NextResponse.json({ error: "Lab tech not found" }, { status: 404 });
    }
    where.OR = [
      { labTechId: labTech.id },
      { labTechId: null },
    ];
  } else if (role === "DOCTOR") {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    where.doctorId = doctor.id;
  } else if (role === "PATIENT") {
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    where.patientId = patient.id;
  }

  if (status) where.status = status;
  if (priority) where.priority = priority;

  const [orders, total] = await Promise.all([
    prisma.labOrder.findMany({
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
        labTech: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        results: true,
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.labOrder.count({ where }),
  ]);

  return NextResponse.json({
    orders,
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
    return NextResponse.json({ error: "Only doctors can order lab tests" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createLabOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!doctor && role !== "ADMIN") {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  const patient = await prisma.patient.findUnique({
    where: { id: parsed.data.patientId },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const order = await prisma.labOrder.create({
    data: {
      patientId: patient.id,
      doctorId: doctor!.id,
      testName: parsed.data.testName,
      testCode: parsed.data.testCode,
      category: parsed.data.category,
      priority: parsed.data.priority || "ROUTINE",
      clinicalNotes: parsed.data.clinicalNotes,
      sampleType: parsed.data.sampleType,
    },
    include: {
      patient: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return NextResponse.json(order, { status: 201 });
}
