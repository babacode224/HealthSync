import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "PENDING";
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const providers: any[] = [];
  let total = 0;

  if (!type || type === "DOCTOR") {
    const where: any = { verificationStatus: status };
    const [doctors, count] = await Promise.all([
      prisma.doctor.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true, lastName: true, email: true,
              phone: true, image: true, createdAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: type ? (page - 1) * limit : 0,
        take: type ? limit : undefined,
      }),
      prisma.doctor.count({ where }),
    ]);
    providers.push(
      ...doctors.map((d) => ({ ...d, providerType: "DOCTOR" }))
    );
    total += count;
  }

  if (!type || type === "PHARMACIST") {
    const where: any = { verificationStatus: status };
    const [pharmacists, count] = await Promise.all([
      prisma.pharmacist.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true, lastName: true, email: true,
              phone: true, image: true, createdAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: type ? (page - 1) * limit : 0,
        take: type ? limit : undefined,
      }),
      prisma.pharmacist.count({ where }),
    ]);
    providers.push(
      ...pharmacists.map((p) => ({ ...p, providerType: "PHARMACIST" }))
    );
    total += count;
  }

  if (!type || type === "LAB_TECH") {
    const where: any = { verificationStatus: status };
    const [labTechs, count] = await Promise.all([
      prisma.labTech.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true, lastName: true, email: true,
              phone: true, image: true, createdAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: type ? (page - 1) * limit : 0,
        take: type ? limit : undefined,
      }),
      prisma.labTech.count({ where }),
    ]);
    providers.push(
      ...labTechs.map((l) => ({ ...l, providerType: "LAB_TECH" }))
    );
    total += count;
  }

  providers.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({
    providers: type ? providers : providers.slice((page - 1) * limit, page * limit),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}
