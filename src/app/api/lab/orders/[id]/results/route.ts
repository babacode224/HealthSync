import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const resultSchema = z.object({
  parameter: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().optional(),
  referenceMin: z.string().optional(),
  referenceMax: z.string().optional(),
  flag: z.enum(["normal", "low", "high", "critical-low", "critical-high"]).optional(),
  notes: z.string().optional(),
});

const batchResultSchema = z.object({
  results: z.array(resultSchema).min(1),
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
  if (role !== "LAB_TECH" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only lab techs can upload results" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = batchResultSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const order = await prisma.labOrder.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: "Lab order not found" }, { status: 404 });
  }

  if (order.status === "CANCELLED") {
    return NextResponse.json({ error: "Cannot add results to a cancelled order" }, { status: 400 });
  }

  const results = await prisma.labResult.createManyAndReturn({
    data: parsed.data.results.map((r) => ({
      labOrderId: id,
      ...r,
    })),
  });

  if (order.status !== "COMPLETED") {
    const labTech = await prisma.labTech.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    await prisma.labOrder.update({
      where: { id },
      data: {
        status: "PROCESSING",
        ...(labTech && !order.labTechId && { labTechId: labTech.id }),
      },
    });
  }

  return NextResponse.json(results, { status: 201 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "LAB_TECH" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only lab techs can delete results" }, { status: 403 });
  }

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const resultId = searchParams.get("resultId");

  if (!resultId) {
    return NextResponse.json({ error: "resultId query param is required" }, { status: 400 });
  }

  const result = await prisma.labResult.findFirst({
    where: { id: resultId, labOrderId: id },
  });

  if (!result) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  await prisma.labResult.delete({ where: { id: resultId } });

  return NextResponse.json({ success: true });
}
