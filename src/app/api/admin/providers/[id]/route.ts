import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const verificationSchema = z.object({
  providerType: z.enum(["DOCTOR", "PHARMACIST", "LAB_TECH"]),
  action: z.enum(["APPROVE", "REJECT", "UNDER_REVIEW"]),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          firstName: true, lastName: true, email: true,
          phone: true, image: true, createdAt: true, role: true,
        },
      },
      schedules: true,
    },
  });
  if (doctor) return NextResponse.json({ ...doctor, providerType: "DOCTOR" });

  const pharmacist = await prisma.pharmacist.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          firstName: true, lastName: true, email: true,
          phone: true, image: true, createdAt: true, role: true,
        },
      },
    },
  });
  if (pharmacist) return NextResponse.json({ ...pharmacist, providerType: "PHARMACIST" });

  const labTech = await prisma.labTech.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          firstName: true, lastName: true, email: true,
          phone: true, image: true, createdAt: true, role: true,
        },
      },
    },
  });
  if (labTech) return NextResponse.json({ ...labTech, providerType: "LAB_TECH" });

  return NextResponse.json({ error: "Provider not found" }, { status: 404 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = verificationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const statusMap = {
    APPROVE: "APPROVED" as const,
    REJECT: "REJECTED" as const,
    UNDER_REVIEW: "UNDER_REVIEW" as const,
  };

  const newStatus = statusMap[parsed.data.action];
  const updateData: any = {
    verificationStatus: newStatus,
    ...(parsed.data.action === "APPROVE" && { verifiedAt: new Date() }),
  };

  let updated;

  if (parsed.data.providerType === "DOCTOR") {
    updated = await prisma.doctor.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
  } else if (parsed.data.providerType === "PHARMACIST") {
    updated = await prisma.pharmacist.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
  } else {
    updated = await prisma.labTech.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
  }

  await prisma.notification.create({
    data: {
      userId: updated.userId,
      title: parsed.data.action === "APPROVE"
        ? "Account Verified"
        : parsed.data.action === "REJECT"
          ? "Verification Rejected"
          : "Verification Under Review",
      message: parsed.data.action === "APPROVE"
        ? "Your provider account has been verified. You can now access all features."
        : parsed.data.action === "REJECT"
          ? "Your verification was not approved. Please contact support for more information."
          : "Your credentials are being reviewed. We will notify you once the review is complete.",
      type: "system",
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: `PROVIDER_${parsed.data.action}`,
      entity: parsed.data.providerType,
      entityId: id,
      details: { newStatus, providerType: parsed.data.providerType } as any,
    },
  });

  return NextResponse.json({ ...updated, providerType: parsed.data.providerType });
}
