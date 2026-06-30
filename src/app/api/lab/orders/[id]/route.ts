import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateOrderSchema = z.object({
  status: z.enum(["ORDERED", "SAMPLE_COLLECTED", "PROCESSING", "COMPLETED", "CANCELLED"]).optional(),
  sampleType: z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const order = await prisma.labOrder.findUnique({
    where: { id },
    include: {
      patient: {
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          allergies: true,
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
      results: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Lab order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
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
  if (role !== "LAB_TECH" && role !== "ADMIN") {
    return NextResponse.json({ error: "Only lab techs can update orders" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = updateOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const order = await prisma.labOrder.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: "Lab order not found" }, { status: 404 });
  }

  const updateData: any = {};

  if (parsed.data.status) {
    updateData.status = parsed.data.status;
    if (parsed.data.status === "SAMPLE_COLLECTED") {
      updateData.collectedAt = new Date();
    }
    if (parsed.data.status === "COMPLETED") {
      updateData.completedAt = new Date();
    }
  }

  if (parsed.data.sampleType) {
    updateData.sampleType = parsed.data.sampleType;
  }

  if (!order.labTechId) {
    const labTech = await prisma.labTech.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (labTech) {
      updateData.labTechId = labTech.id;
    }
  }

  const updated = await prisma.labOrder.update({
    where: { id },
    data: updateData,
    include: {
      patient: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
      results: true,
    },
  });

  if (parsed.data.status === "COMPLETED") {
    const patientRecord = await prisma.patient.findUnique({
      where: { id: updated.patientId },
      select: { userId: true },
    });
    if (patientRecord) {
      await prisma.notification.create({
        data: {
          userId: patientRecord.userId,
          title: "Lab Results Ready",
          message: `Your ${updated.testName} results are now available.`,
          type: "system",
          link: "/dashboard/health-records",
        },
      });
    }
  }

  return NextResponse.json(updated);
}
