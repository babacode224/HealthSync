import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "PHARMACIST" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pharmacist = await prisma.pharmacist.findUnique({
    where: { userId: session.user.id },
    select: { pharmacyName: true },
  });

  const pharmacyFilter = pharmacist?.pharmacyName
    ? {
        OR: [
          { pharmacy: { contains: pharmacist.pharmacyName, mode: "insensitive" as const } },
          { prescription: { pharmacy: { contains: pharmacist.pharmacyName, mode: "insensitive" as const } } },
        ],
      }
    : {};

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    pendingRefills,
    readyForPickup,
    filledToday,
    filledThisMonth,
    revenueToday,
    revenueThisMonth,
  ] = await Promise.all([
    prisma.refill.count({
      where: { status: "pending", ...pharmacyFilter },
    }),
    prisma.refill.count({
      where: { status: "ready", ...pharmacyFilter },
    }),
    prisma.refill.count({
      where: {
        status: "picked_up",
        filledAt: { gte: startOfDay },
        ...pharmacyFilter,
      },
    }),
    prisma.refill.count({
      where: {
        status: "picked_up",
        filledAt: { gte: startOfMonth },
        ...pharmacyFilter,
      },
    }),
    prisma.refill.aggregate({
      where: {
        status: "picked_up",
        filledAt: { gte: startOfDay },
        cost: { not: null },
        ...pharmacyFilter,
      },
      _sum: { cost: true },
    }),
    prisma.refill.aggregate({
      where: {
        status: "picked_up",
        filledAt: { gte: startOfMonth },
        cost: { not: null },
        ...pharmacyFilter,
      },
      _sum: { cost: true },
    }),
  ]);

  return NextResponse.json({
    pendingRefills,
    readyForPickup,
    filledToday,
    filledThisMonth,
    revenueToday: revenueToday._sum.cost || 0,
    revenueThisMonth: revenueThisMonth._sum.cost || 0,
  });
}
