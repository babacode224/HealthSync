import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const allergySchema = z.object({
  name: z.string().min(1),
  severity: z.enum(["mild", "moderate", "severe"]).optional(),
});

const conditionSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["active", "managed", "resolved"]).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      allergies: true,
      conditions: true,
    },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({
    allergies: patient.allergies,
    conditions: patient.conditions,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { type } = body;

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  if (type === "allergy") {
    const parsed = allergySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const allergy = await prisma.allergy.create({
      data: { patientId: patient.id, ...parsed.data },
    });
    return NextResponse.json(allergy, { status: 201 });
  }

  if (type === "condition") {
    const parsed = conditionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const condition = await prisma.condition.create({
      data: { patientId: patient.id, ...parsed.data },
    });
    return NextResponse.json(condition, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid type. Use 'allergy' or 'condition'." }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "type and id are required" }, { status: 400 });
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  if (type === "allergy") {
    const existing = await prisma.allergy.findFirst({
      where: { id, patientId: patient.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Allergy not found" }, { status: 404 });
    }
    await prisma.allergy.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (type === "condition") {
    const existing = await prisma.condition.findFirst({
      where: { id, patientId: patient.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Condition not found" }, { status: 404 });
    }
    await prisma.condition.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
