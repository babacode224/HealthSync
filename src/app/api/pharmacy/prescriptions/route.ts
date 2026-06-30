import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

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
  const status = searchParams.get("status");
  const refillStatus = searchParams.get("refillStatus");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const pharmacist = await prisma.pharmacist.findUnique({
    where: { userId: session.user.id },
    select: { pharmacyName: true },
  });

  const where: any = {};

  if (pharmacist?.pharmacyName) {
    where.pharmacy = { contains: pharmacist.pharmacyName, mode: "insensitive" };
  }

  if (status) {
    where.status = status;
  }

  if (refillStatus) {
    where.refills = { some: { status: refillStatus } };
  }

  const [prescriptions, total] = await Promise.all([
    prisma.prescription.findMany({
      where,
      include: {
        patient: {
          include: {
            user: { select: { firstName: true, lastName: true, phone: true } },
            allergies: true,
          },
        },
        doctor: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        medications: true,
        refills: { orderBy: { requestedAt: "desc" } },
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
