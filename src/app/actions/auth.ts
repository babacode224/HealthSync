"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signIn } from "@/lib/auth";
import { Role } from "@/generated/prisma/client";

const registerPatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
});

const registerProviderSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  role: z.enum(["DOCTOR", "PHARMACIST", "LAB_TECH"]),
  licenseNumber: z.string().min(3),
  licenseExpiry: z.string().optional(),
  specialty: z.string().optional(),
  yearsExperience: z.string().optional(),
  practiceName: z.string().optional(),
  practiceAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  bio: z.string().optional(),
});

export async function registerPatient(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerPatientSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Invalid input. Please check your fields." };
  }

  const { firstName, lastName, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
      role: "PATIENT",
      patient: { create: {} },
    },
  });

  return { success: true };
}

export async function registerProvider(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerProviderSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Invalid input. Please check your fields." };
  }

  const data = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const role = data.role as Role;

  await prisma.$transaction(async (tx: any) => {
    const user = await tx.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        passwordHash,
        role,
      },
    });

    if (role === "DOCTOR") {
      await tx.doctor.create({
        data: {
          userId: user.id,
          licenseNumber: data.licenseNumber,
          licenseExpiry: data.licenseExpiry
            ? new Date(data.licenseExpiry)
            : null,
          specialty: data.specialty || "General Practice",
          yearsExperience: data.yearsExperience,
          practiceName: data.practiceName,
          practiceAddress: data.practiceAddress,
          city: data.city,
          state: data.state,
          bio: data.bio,
        },
      });
    } else if (role === "PHARMACIST") {
      await tx.pharmacist.create({
        data: {
          userId: user.id,
          licenseNumber: data.licenseNumber,
          licenseExpiry: data.licenseExpiry
            ? new Date(data.licenseExpiry)
            : null,
          pharmacyName: data.practiceName,
          pharmacyAddress: data.practiceAddress,
          city: data.city,
          state: data.state,
        },
      });
    } else if (role === "LAB_TECH") {
      await tx.labTech.create({
        data: {
          userId: user.id,
          licenseNumber: data.licenseNumber,
          licenseExpiry: data.licenseExpiry
            ? new Date(data.licenseExpiry)
            : null,
          labName: data.practiceName,
          labAddress: data.practiceAddress,
          city: data.city,
          state: data.state,
        },
      });
    }
  });

  return { success: true };
}

export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return { success: true };
  } catch {
    return { error: "Invalid email or password." };
  }
}
