import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateAppointmentSchema = z.object({
  status: z.enum(["SCHEDULED", "CHECKED_IN", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"]).optional(),
  dateTime: z.string().optional(),
  type: z.enum(["IN_PERSON", "TELEHEALTH", "FOLLOW_UP", "EMERGENCY"]).optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  cancelReason: z.string().optional(),
});

async function getAppointmentWithAuth(id: string, userId: string, role: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: {
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, image: true } },
        },
      },
      doctor: {
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, image: true } },
        },
      },
      visit: true,
    },
  });

  if (!appointment) return null;

  if (role === "ADMIN") return appointment;

  if (role === "PATIENT" && appointment.patient.user.id === userId) return appointment;
  if (role === "DOCTOR" && appointment.doctor.user.id === userId) return appointment;

  return null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const role = (session.user as any).role;
  const appointment = await getAppointmentWithAuth(id, session.user.id, role);

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json(appointment);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const role = (session.user as any).role;
  const appointment = await getAppointmentWithAuth(id, session.user.id, role);

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = updateAppointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const updateData: any = {};

  if (parsed.data.status) {
    if (parsed.data.status === "CANCELLED") {
      if (!["SCHEDULED", "CHECKED_IN"].includes(appointment.status)) {
        return NextResponse.json({ error: "Cannot cancel an appointment that is already in progress or completed" }, { status: 400 });
      }
      updateData.status = "CANCELLED";
      updateData.cancelledAt = new Date();
      updateData.cancelReason = parsed.data.cancelReason || null;
    } else if (parsed.data.status === "CHECKED_IN") {
      if (appointment.status !== "SCHEDULED") {
        return NextResponse.json({ error: "Can only check in to scheduled appointments" }, { status: 400 });
      }
      updateData.status = "CHECKED_IN";
    } else if (parsed.data.status === "IN_PROGRESS") {
      if (role !== "DOCTOR" && role !== "ADMIN") {
        return NextResponse.json({ error: "Only doctors can start appointments" }, { status: 403 });
      }
      if (!["SCHEDULED", "CHECKED_IN"].includes(appointment.status)) {
        return NextResponse.json({ error: "Appointment is not ready to start" }, { status: 400 });
      }
      updateData.status = "IN_PROGRESS";
    } else if (parsed.data.status === "COMPLETED") {
      if (role !== "DOCTOR" && role !== "ADMIN") {
        return NextResponse.json({ error: "Only doctors can complete appointments" }, { status: 403 });
      }
      if (appointment.status !== "IN_PROGRESS") {
        return NextResponse.json({ error: "Appointment must be in progress to complete" }, { status: 400 });
      }
      updateData.status = "COMPLETED";
    } else if (parsed.data.status === "NO_SHOW") {
      if (role !== "DOCTOR" && role !== "ADMIN") {
        return NextResponse.json({ error: "Only doctors can mark no-shows" }, { status: 403 });
      }
      updateData.status = "NO_SHOW";
    } else {
      updateData.status = parsed.data.status;
    }
  }

  if (parsed.data.dateTime) {
    const newDate = new Date(parsed.data.dateTime);
    if (newDate <= new Date()) {
      return NextResponse.json({ error: "Appointment must be in the future" }, { status: 400 });
    }
    updateData.dateTime = newDate;
    updateData.endTime = new Date(newDate.getTime() + 30 * 60000);
  }

  if (parsed.data.type) updateData.type = parsed.data.type;
  if (parsed.data.reason !== undefined) updateData.reason = parsed.data.reason;
  if (parsed.data.notes !== undefined) updateData.notes = parsed.data.notes;

  const updated = await prisma.appointment.update({
    where: { id },
    data: updateData,
    include: {
      patient: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
      doctor: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return NextResponse.json(updated);
}
