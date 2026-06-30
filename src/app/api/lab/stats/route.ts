import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "LAB_TECH" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const labTech = await prisma.labTech.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  const labTechFilter = labTech
    ? { OR: [{ labTechId: labTech.id }, { labTechId: null }] }
    : {};

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    pendingOrders,
    sampleCollected,
    processing,
    completedToday,
    completedThisMonth,
    urgentOrders,
    statOrders,
    flaggedResults,
  ] = await Promise.all([
    prisma.labOrder.count({
      where: { status: "ORDERED", ...labTechFilter },
    }),
    prisma.labOrder.count({
      where: { status: "SAMPLE_COLLECTED", ...labTechFilter },
    }),
    prisma.labOrder.count({
      where: { status: "PROCESSING", ...labTechFilter },
    }),
    prisma.labOrder.count({
      where: {
        status: "COMPLETED",
        completedAt: { gte: startOfDay },
        ...(labTech ? { labTechId: labTech.id } : {}),
      },
    }),
    prisma.labOrder.count({
      where: {
        status: "COMPLETED",
        completedAt: { gte: startOfMonth },
        ...(labTech ? { labTechId: labTech.id } : {}),
      },
    }),
    prisma.labOrder.count({
      where: {
        priority: "URGENT",
        status: { not: "COMPLETED" },
        ...labTechFilter,
      },
    }),
    prisma.labOrder.count({
      where: {
        priority: "STAT",
        status: { not: "COMPLETED" },
        ...labTechFilter,
      },
    }),
    prisma.labResult.count({
      where: {
        flag: { in: ["high", "low", "critical-high", "critical-low"] },
        labOrder: {
          completedAt: { gte: startOfMonth },
          ...(labTech ? { labTechId: labTech.id } : {}),
        },
      },
    }),
  ]);

  return NextResponse.json({
    pendingOrders,
    sampleCollected,
    processing,
    completedToday,
    completedThisMonth,
    urgentOrders,
    statOrders,
    flaggedResults,
  });
}
