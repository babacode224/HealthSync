import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    totalUsers,
    totalPatients,
    totalDoctors,
    totalPharmacists,
    totalLabTechs,
    pendingDoctors,
    pendingPharmacists,
    pendingLabTechs,
    totalAppointments,
    totalPrescriptions,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.pharmacist.count(),
    prisma.labTech.count(),
    prisma.doctor.count({ where: { verificationStatus: "PENDING" } }),
    prisma.pharmacist.count({ where: { verificationStatus: "PENDING" } }),
    prisma.labTech.count({ where: { verificationStatus: "PENDING" } }),
    prisma.appointment.count(),
    prisma.prescription.count(),
  ]);

  return NextResponse.json({
    totalUsers,
    totalPatients,
    providers: {
      doctors: { total: totalDoctors, pending: pendingDoctors },
      pharmacists: { total: totalPharmacists, pending: pendingPharmacists },
      labTechs: { total: totalLabTechs, pending: pendingLabTechs },
    },
    pendingVerifications: pendingDoctors + pendingPharmacists + pendingLabTechs,
    totalAppointments,
    totalPrescriptions,
  });
}
