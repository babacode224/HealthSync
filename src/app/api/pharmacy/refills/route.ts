import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateRefillSchema = z.object({
  refillId: z.string().min(1),
  status: z.enum(["pending", "ready", "picked_up"]),
  cost: z.number().int().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "PHARMACIST" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "pending";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const pharmacist = await prisma.pharmacist.findUnique({
    where: { userId: session.user.id },
    select: { pharmacyName: true },
  });

  const where: any = { status };

  if (pharmacist?.pharmacyName) {
    where.OR = [
      { pharmacy: { contains: pharmacist.pharmacyName, mode: "insensitive" } },
      { prescription: { pharmacy: { contains: pharmacist.pharmacyName, mode: "insensitive" } } },
    ];
  }

  const [refills, total] = await Promise.all([
    prisma.refill.findMany({
      where,
      include: {
        prescription: {
          include: {
            patient: {
              include: {
                user: { select: { firstName: true, lastName: true, phone: true } },
              },
            },
            medications: true,
          },
        },
      },
      orderBy: { requestedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.refill.count({ where }),
  ]);

  return NextResponse.json({
    refills,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "PHARMACIST" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = updateRefillSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const refill = await prisma.refill.findUnique({
    where: { id: parsed.data.refillId },
    include: {
      prescription: {
        include: {
          patient: { select: { userId: true } },
        },
      },
    },
  });

  if (!refill) {
    return NextResponse.json({ error: "Refill not found" }, { status: 404 });
  }

  const updateData: any = { status: parsed.data.status };
  if (parsed.data.cost !== undefined) updateData.cost = parsed.data.cost;
  if (parsed.data.status === "picked_up") updateData.filledAt = new Date();

  const updated = await prisma.refill.update({
    where: { id: parsed.data.refillId },
    data: updateData,
  });

  if (parsed.data.status === "ready") {
    await prisma.notification.create({
      data: {
        userId: refill.prescription.patient.userId,
        title: "Prescription Ready",
        message: "Your prescription refill is ready for pickup at the pharmacy.",
        type: "prescription",
        link: "/dashboard/prescriptions",
      },
    });
  }

  return NextResponse.json(updated);
}
