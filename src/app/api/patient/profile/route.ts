import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  bloodType: z.string().optional(),
  genotype: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  maritalStatus: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: {
      user: { select: { firstName: true, lastName: true, email: true, phone: true, image: true, createdAt: true } },
      emergencyContacts: true,
      allergies: true,
      conditions: true,
      insurancePolicy: true,
    },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { firstName, lastName, phone, ...patientData } = parsed.data;

  const dateOfBirth = patientData.dateOfBirth ? new Date(patientData.dateOfBirth) : undefined;

  const [user, patient] = await Promise.all([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
      },
    }),
    prisma.patient.update({
      where: { userId: session.user.id },
      data: {
        ...patientData,
        ...(dateOfBirth && { dateOfBirth }),
      },
    }),
  ]);

  return NextResponse.json({ user, patient });
}
