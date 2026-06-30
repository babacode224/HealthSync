import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateLabProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  labName: z.string().optional(),
  labAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

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
    include: {
      user: {
        select: {
          firstName: true, lastName: true, email: true,
          phone: true, image: true, createdAt: true,
        },
      },
    },
  });

  if (!labTech) {
    return NextResponse.json({ error: "Lab tech profile not found" }, { status: 404 });
  }

  return NextResponse.json(labTech);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "LAB_TECH" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = updateLabProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { firstName, lastName, phone, ...labData } = parsed.data;

  const [user, labTech] = await Promise.all([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
      },
    }),
    prisma.labTech.update({
      where: { userId: session.user.id },
      data: labData,
    }),
  ]);

  return NextResponse.json({ user, labTech });
}
