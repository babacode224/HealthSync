import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const role = (session.user as any).role;

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: {
      patient: {
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      },
      doctor: {
        include: {
          user: { select: { id: true, firstName: true, lastName: true } },
        },
      },
      medications: true,
      refills: { orderBy: { requestedAt: "desc" } },
    },
  });

  if (!prescription) {
    return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
  }

  if (role === "PATIENT" && prescription.patient.user.id !== session.user.id) {
    return NextResponse.json({ error: "Not your prescription" }, { status: 403 });
  }

  if (role === "DOCTOR" && prescription.doctor.user.id !== session.user.id) {
    return NextResponse.json({ error: "Not your prescription" }, { status: 403 });
  }

  return NextResponse.json(prescription);
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
    return NextResponse.json({ error: "Only doctors can update prescriptions" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: { doctor: true },
  });

  if (!prescription) {
    return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
  }

  if (role === "DOCTOR" && prescription.doctor.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your prescription" }, { status: 403 });
  }

  const updateData: any = {};
  if (body.status) updateData.status = body.status;
  if (body.endDate) updateData.endDate = new Date(body.endDate);
  if (body.refillsTotal !== undefined) updateData.refillsTotal = body.refillsTotal;
  if (body.pharmacy !== undefined) updateData.pharmacy = body.pharmacy;

  const updated = await prisma.prescription.update({
    where: { id },
    data: updateData,
    include: { medications: true },
  });

  return NextResponse.json(updated);
}
