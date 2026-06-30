import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const specialty = searchParams.get("specialty");
  const search = searchParams.get("search");

  const where: any = {
    verificationStatus: "APPROVED",
  };

  if (specialty) {
    where.specialty = specialty;
  }

  if (search) {
    where.user = {
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
      ],
    };
  }

  const doctors = await prisma.doctor.findMany({
    where,
    include: {
      user: { select: { firstName: true, lastName: true, image: true } },
      schedules: { where: { isActive: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(doctors);
}
