import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const refillRequestSchema = z.object({
  pharmacy: z.string().optional(),
});

const updateRefillSchema = z.object({
  status: z.enum(["pending", "ready", "picked_up"]),
  cost: z.number().int().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = refillRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: {
      patient: { select: { userId: true } },
    },
  });

  if (!prescription) {
    return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
  }

  if (prescription.patient.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your prescription" }, { status: 403 });
  }

  if (prescription.status !== "ACTIVE") {
    return NextResponse.json({ error: "Prescription is not active" }, { status: 400 });
  }

  if (prescription.refillsUsed >= prescription.refillsTotal) {
    return NextResponse.json({ error: "No refills remaining" }, { status: 400 });
  }

  const refill = await prisma.refill.create({
    data: {
      prescriptionId: id,
      pharmacy: parsed.data.pharmacy || prescription.pharmacy,
    },
  });

  await prisma.prescription.update({
    where: { id },
    data: { refillsUsed: { increment: 1 } },
  });

  return NextResponse.json(refill, { status: 201 });
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
  if (role !== "PHARMACIST" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only pharmacists can update refill status" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = updateRefillSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const refillId = searchParams.get("refillId");

  if (!refillId) {
    return NextResponse.json({ error: "refillId query param is required" }, { status: 400 });
  }

  const refill = await prisma.refill.findFirst({
    where: { id: refillId, prescriptionId: id },
  });

  if (!refill) {
    return NextResponse.json({ error: "Refill not found" }, { status: 404 });
  }

  const updateData: any = { status: parsed.data.status };
  if (parsed.data.cost !== undefined) updateData.cost = parsed.data.cost;
  if (parsed.data.status === "picked_up") updateData.filledAt = new Date();

  const updated = await prisma.refill.update({
    where: { id: refillId },
    data: updateData,
  });

  return NextResponse.json(updated);
}
