import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!q || q.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 });
  }

  const role = (session.user as any).role;
  const results: any = {};

  if (!type || type === "patients") {
    if (role === "DOCTOR" || role === "ADMIN" || role === "PHARMACIST" || role === "LAB_TECH") {
      results.patients = await prisma.patient.findMany({
        where: {
          user: {
            OR: [
              { firstName: { contains: q, mode: "insensitive" } },
              { lastName: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          },
        },
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true, phone: true, image: true },
          },
        },
        take: limit,
      });
    }
  }

  if (!type || type === "doctors") {
    results.doctors = await prisma.doctor.findMany({
      where: {
        OR: [
          { user: { firstName: { contains: q, mode: "insensitive" } } },
          { user: { lastName: { contains: q, mode: "insensitive" } } },
          { specialty: { contains: q, mode: "insensitive" } },
          { practiceName: { contains: q, mode: "insensitive" } },
        ],
      },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true, image: true },
        },
      },
      take: limit,
    });
  }

  if (!type || type === "appointments") {
    const appointmentWhere: any = {
      OR: [
        { reason: { contains: q, mode: "insensitive" } },
        { patient: { user: { firstName: { contains: q, mode: "insensitive" } } } },
        { patient: { user: { lastName: { contains: q, mode: "insensitive" } } } },
        { doctor: { user: { firstName: { contains: q, mode: "insensitive" } } } },
        { doctor: { user: { lastName: { contains: q, mode: "insensitive" } } } },
      ],
    };

    if (role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });
      if (patient) appointmentWhere.patientId = patient.id;
    } else if (role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });
      if (doctor) appointmentWhere.doctorId = doctor.id;
    }

    results.appointments = await prisma.appointment.findMany({
      where: appointmentWhere,
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
      },
      orderBy: { dateTime: "desc" },
      take: limit,
    });
  }

  if (!type || type === "prescriptions") {
    const rxWhere: any = {
      OR: [
        { medications: { some: { name: { contains: q, mode: "insensitive" } } } },
        { patient: { user: { firstName: { contains: q, mode: "insensitive" } } } },
        { patient: { user: { lastName: { contains: q, mode: "insensitive" } } } },
      ],
    };

    if (role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });
      if (patient) rxWhere.patientId = patient.id;
    } else if (role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });
      if (doctor) rxWhere.doctorId = doctor.id;
    }

    results.prescriptions = await prisma.prescription.findMany({
      where: rxWhere,
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
        medications: { select: { name: true, dosage: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  if (!type || type === "lab_orders") {
    if (role !== "PATIENT") {
      const labWhere: any = {
        OR: [
          { testName: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
          { patient: { user: { firstName: { contains: q, mode: "insensitive" } } } },
          { patient: { user: { lastName: { contains: q, mode: "insensitive" } } } },
        ],
      };

      results.labOrders = await prisma.labOrder.findMany({
        where: labWhere,
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
        },
        orderBy: { createdAt: "desc" },
        take: limit,
      });
    }
  }

  return NextResponse.json(results);
}
