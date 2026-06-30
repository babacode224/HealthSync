import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updatePharmacyProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  pharmacyName: z.string().optional(),
  pharmacyAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

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
    include: {
      user: {
        select: {
          firstName: true, lastName: true, email: true,
          phone: true, image: true, createdAt: true,
        },
      },
    },
  });

  if (!pharmacist) {
    return NextResponse.json({ error: "Pharmacist profile not found" }, { status: 404 });
  }

  return NextResponse.json(pharmacist);
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
  const parsed = updatePharmacyProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { firstName, lastName, phone, ...pharmacistData } = parsed.data;

  const [user, pharmacist] = await Promise.all([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
      },
    }),
    prisma.pharmacist.update({
      where: { userId: session.user.id },
      data: pharmacistData,
    }),
  ]);

  return NextResponse.json({ user, pharmacist });
}
