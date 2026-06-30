import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

async function main() {
  console.log("🌱 Seeding database...");

  const password = await bcrypt.hash("password123", 12);

  // ─── Admin ────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@healthsync.ng" },
    update: {},
    create: {
      email: "admin@healthsync.ng",
      firstName: "System",
      lastName: "Admin",
      passwordHash: password,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ Admin: ${admin.email}`);

  // ─── Doctors ──────────────────────────────────────────────
  const doctorsData = [
    {
      email: "dr.adaeze@healthsync.ng",
      firstName: "Adaeze",
      lastName: "Okonkwo",
      phone: "+2348012345001",
      licenseNumber: "MDCN/2018/45621",
      specialty: "General Practice",
      yearsExperience: "8",
      practiceName: "HealthSync General Clinic",
      practiceAddress: "15 Marina Road",
      city: "Lagos",
      state: "Lagos",
      bio: "Experienced general practitioner with a focus on preventive care and chronic disease management.",
      consultationFee: 1500000,
    },
    {
      email: "dr.emeka@healthsync.ng",
      firstName: "Emeka",
      lastName: "Nwosu",
      phone: "+2348012345002",
      licenseNumber: "MDCN/2016/38942",
      specialty: "Cardiology",
      yearsExperience: "10",
      practiceName: "Heart Care Center",
      practiceAddress: "42 Ikoyi Crescent",
      city: "Lagos",
      state: "Lagos",
      bio: "Board-certified cardiologist specializing in heart failure management and preventive cardiology.",
      consultationFee: 2500000,
    },
    {
      email: "dr.fatima@healthsync.ng",
      firstName: "Fatima",
      lastName: "Ibrahim",
      phone: "+2348012345003",
      licenseNumber: "MDCN/2019/52103",
      specialty: "Pediatrics",
      yearsExperience: "6",
      practiceName: "Little Stars Pediatric Clinic",
      practiceAddress: "8 Wuse II",
      city: "Abuja",
      state: "FCT",
      bio: "Pediatrician passionate about child health and development, with expertise in neonatal care.",
      consultationFee: 1800000,
    },
  ];

  const doctors = [];
  for (const d of doctorsData) {
    const { licenseNumber, specialty, yearsExperience, practiceName, practiceAddress, city, state, bio, consultationFee, ...userData } = d;
    const user = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        ...userData,
        passwordHash: password,
        role: "DOCTOR",
        emailVerified: new Date(),
        doctor: {
          create: {
            licenseNumber,
            licenseExpiry: new Date("2027-12-31"),
            specialty,
            yearsExperience,
            practiceName,
            practiceAddress,
            city,
            state,
            bio,
            consultationFee,
            verificationStatus: "APPROVED",
            verifiedAt: new Date(),
            schedules: {
              create: [
                { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
                { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
                { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
                { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
                { dayOfWeek: 5, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
              ],
            },
          },
        },
      },
      include: { doctor: true },
    });
    doctors.push(user);
    console.log(`  ✓ Doctor: ${user.email}`);
  }

  // ─── Pharmacist ───────────────────────────────────────────
  const pharmacist = await prisma.user.upsert({
    where: { email: "pharm.bola@healthsync.ng" },
    update: {},
    create: {
      email: "pharm.bola@healthsync.ng",
      firstName: "Bola",
      lastName: "Adesanya",
      phone: "+2348012345010",
      passwordHash: password,
      role: "PHARMACIST",
      emailVerified: new Date(),
      pharmacist: {
        create: {
          licenseNumber: "PCN/2020/11234",
          licenseExpiry: new Date("2027-06-30"),
          pharmacyName: "HealthSync Pharmacy",
          pharmacyAddress: "22 Allen Avenue",
          city: "Lagos",
          state: "Lagos",
          verificationStatus: "APPROVED",
        },
      },
    },
  });
  console.log(`  ✓ Pharmacist: ${pharmacist.email}`);

  // ─── Lab Tech ─────────────────────────────────────────────
  const labTech = await prisma.user.upsert({
    where: { email: "lab.chidi@healthsync.ng" },
    update: {},
    create: {
      email: "lab.chidi@healthsync.ng",
      firstName: "Chidi",
      lastName: "Eze",
      phone: "+2348012345020",
      passwordHash: password,
      role: "LAB_TECH",
      emailVerified: new Date(),
      labTech: {
        create: {
          licenseNumber: "MLSCN/2019/78432",
          licenseExpiry: new Date("2027-09-30"),
          labName: "HealthSync Diagnostics",
          labAddress: "5 Admiralty Way, Lekki",
          city: "Lagos",
          state: "Lagos",
          verificationStatus: "APPROVED",
        },
      },
    },
  });
  console.log(`  ✓ Lab Tech: ${labTech.email}`);

  // ─── Patients ─────────────────────────────────────────────
  const patientsData = [
    {
      email: "amara.patient@gmail.com",
      firstName: "Amara",
      lastName: "Obi",
      phone: "+2348098765001",
      dateOfBirth: new Date("1990-03-15"),
      gender: "Female",
      bloodType: "O+",
      genotype: "AA",
      height: "165",
      weight: "62",
      address: "12 Lekki Phase 1",
      city: "Lagos",
      state: "Lagos",
      maritalStatus: "Single",
      allergies: [
        { name: "Penicillin", severity: "severe" },
        { name: "Dust mites", severity: "mild" },
      ],
      conditions: [
        { name: "Asthma", status: "managed" },
      ],
      emergencyContacts: [
        { name: "Ngozi Obi", relationship: "Mother", phone: "+2348055512345", isPrimary: true },
        { name: "Kalu Obi", relationship: "Brother", phone: "+2348055512346" },
      ],
    },
    {
      email: "tunde.patient@gmail.com",
      firstName: "Tunde",
      lastName: "Bakare",
      phone: "+2348098765002",
      dateOfBirth: new Date("1985-08-22"),
      gender: "Male",
      bloodType: "A+",
      genotype: "AS",
      height: "178",
      weight: "80",
      address: "7 Victoria Island",
      city: "Lagos",
      state: "Lagos",
      maritalStatus: "Married",
      allergies: [
        { name: "Sulfonamides", severity: "moderate" },
      ],
      conditions: [
        { name: "Hypertension", status: "active" },
        { name: "Type 2 Diabetes", status: "managed" },
      ],
      emergencyContacts: [
        { name: "Yetunde Bakare", relationship: "Wife", phone: "+2348055598765", isPrimary: true },
      ],
    },
    {
      email: "chioma.patient@gmail.com",
      firstName: "Chioma",
      lastName: "Eze",
      phone: "+2348098765003",
      dateOfBirth: new Date("1995-11-10"),
      gender: "Female",
      bloodType: "B+",
      genotype: "AA",
      height: "160",
      weight: "55",
      address: "3 Garki Area 11",
      city: "Abuja",
      state: "FCT",
      maritalStatus: "Single",
      allergies: [] as { name: string; severity: string }[],
      conditions: [] as { name: string; status: string }[],
      emergencyContacts: [
        { name: "Obioma Eze", relationship: "Father", phone: "+2348055543210", isPrimary: true },
      ],
    },
    {
      email: "ibrahim.patient@gmail.com",
      firstName: "Ibrahim",
      lastName: "Musa",
      phone: "+2348098765004",
      dateOfBirth: new Date("1978-01-05"),
      gender: "Male",
      bloodType: "AB+",
      genotype: "AA",
      height: "182",
      weight: "90",
      address: "15 Ahmadu Bello Way",
      city: "Kaduna",
      state: "Kaduna",
      maritalStatus: "Married",
      allergies: [
        { name: "Aspirin", severity: "moderate" },
        { name: "Shellfish", severity: "severe" },
      ],
      conditions: [
        { name: "Chronic Back Pain", status: "active" },
        { name: "High Cholesterol", status: "managed" },
        { name: "Malaria (past)", status: "resolved" },
      ],
      emergencyContacts: [
        { name: "Halima Musa", relationship: "Wife", phone: "+2348055567890", isPrimary: true },
        { name: "Yusuf Musa", relationship: "Son", phone: "+2348055567891" },
      ],
    },
    {
      email: "blessing.patient@gmail.com",
      firstName: "Blessing",
      lastName: "Adeleke",
      phone: "+2348098765005",
      dateOfBirth: new Date("2000-06-20"),
      gender: "Female",
      bloodType: "O-",
      genotype: "AS",
      height: "170",
      weight: "65",
      address: "9 Ring Road",
      city: "Ibadan",
      state: "Oyo",
      maritalStatus: "Single",
      allergies: [
        { name: "Latex", severity: "mild" },
      ],
      conditions: [
        { name: "Sickle Cell Trait", status: "managed" },
      ],
      emergencyContacts: [
        { name: "Grace Adeleke", relationship: "Mother", phone: "+2348055511111", isPrimary: true },
      ],
    },
  ];

  const patients: any[] = [];
  for (const p of patientsData) {
    const { allergies, conditions, emergencyContacts, dateOfBirth, gender, bloodType, genotype, height, weight, address, city, state, maritalStatus, ...userData } = p;
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        ...userData,
        passwordHash: password,
        role: "PATIENT",
        emailVerified: new Date(),
        patient: {
          create: {
            dateOfBirth,
            gender,
            bloodType,
            genotype,
            height,
            weight,
            address,
            city,
            state,
            maritalStatus,
            allergies: { create: allergies },
            conditions: { create: conditions },
            emergencyContacts: { create: emergencyContacts },
          },
        },
      },
      include: { patient: true },
    });
    patients.push(user);
    console.log(`  ✓ Patient: ${user.email}`);
  }

  // ─── Insurance for first 2 patients ──────────────────────
  const patientIds = patients.map((p) => p.patient!.id);

  await prisma.insurancePolicy.upsert({
    where: { patientId: patientIds[0] },
    update: {},
    create: {
      patientId: patientIds[0],
      provider: "HMO HealthGuard",
      planName: "Premium Gold",
      policyNumber: "HG-2024-001234",
      groupNumber: "GRP-CORP-456",
      memberId: "MEM-001234",
      effectiveDate: new Date("2024-01-01"),
      expiryDate: new Date("2026-12-31"),
      coverageType: "Comprehensive",
      copay: "₦2,500",
      deductible: "₦50,000",
      maxCoverage: "₦5,000,000",
    },
  });

  await prisma.insurancePolicy.upsert({
    where: { patientId: patientIds[1] },
    update: {},
    create: {
      patientId: patientIds[1],
      provider: "Leadway Health",
      planName: "Family Plus",
      policyNumber: "LH-2024-005678",
      groupNumber: "GRP-FAM-789",
      memberId: "MEM-005678",
      effectiveDate: new Date("2024-03-01"),
      expiryDate: new Date("2027-02-28"),
      coverageType: "Family",
      copay: "₦3,000",
      deductible: "₦75,000",
      maxCoverage: "₦8,000,000",
    },
  });
  console.log("  ✓ Insurance policies created");

  // ─── Appointments ─────────────────────────────────────────
  const now = new Date();
  const doctorIds = doctors.map((d) => d.doctor!.id);

  const appointmentsData = [
    {
      patientId: patientIds[0],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() + 2 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "SCHEDULED" as const,
      reason: "Annual health checkup",
    },
    {
      patientId: patientIds[0],
      doctorId: doctorIds[1],
      dateTime: new Date(now.getTime() + 7 * 24 * 60 * 60000),
      type: "TELEHEALTH" as const,
      status: "SCHEDULED" as const,
      reason: "Follow-up on heart palpitations",
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() - 3 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "COMPLETED" as const,
      reason: "Blood pressure review",
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[1],
      dateTime: new Date(now.getTime() + 5 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "SCHEDULED" as const,
      reason: "Cardiology consultation for hypertension management",
    },
    {
      patientId: patientIds[2],
      doctorId: doctorIds[2],
      dateTime: new Date(now.getTime() + 1 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "SCHEDULED" as const,
      reason: "General wellness check",
    },
    {
      patientId: patientIds[3],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() - 7 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "COMPLETED" as const,
      reason: "Back pain consultation",
    },
    {
      patientId: patientIds[3],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() + 14 * 24 * 60 * 60000),
      type: "FOLLOW_UP" as const,
      status: "SCHEDULED" as const,
      reason: "Follow-up: back pain treatment progress",
    },
    {
      patientId: patientIds[4],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() - 1 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "CANCELLED" as const,
      reason: "Routine checkup",
      cancelReason: "Patient rescheduled",
    },
    {
      patientId: patientIds[4],
      doctorId: doctorIds[0],
      dateTime: new Date(now.getTime() + 10 * 24 * 60 * 60000),
      type: "IN_PERSON" as const,
      status: "SCHEDULED" as const,
      reason: "Rescheduled routine checkup",
    },
  ];

  const appointments = [];
  for (const a of appointmentsData) {
    const endTime = new Date(a.dateTime.getTime() + 30 * 60000);
    const appt = await prisma.appointment.create({
      data: {
        ...a,
        endTime,
        cancelledAt: a.status === "CANCELLED" ? new Date() : null,
      },
    });
    appointments.push(appt);
  }
  console.log(`  ✓ ${appointments.length} appointments created`);

  // ─── Visit notes for completed appointments ───────────────
  const completedAppts = appointments.filter((a) => a.status === "COMPLETED");
  for (const appt of completedAppts) {
    await prisma.visit.create({
      data: {
        appointmentId: appt.id,
        doctorId: appt.doctorId,
        diagnosis: appt.reason?.includes("Blood pressure")
          ? "Essential hypertension, well-controlled on current medication"
          : "Chronic lower back pain, mechanical origin. No neurological deficits.",
        notes: "Patient presenting in good condition. Vitals within acceptable range. Continue current management plan.",
        vitals: {
          bp: "130/85",
          hr: "72",
          temp: "36.8",
          spo2: "98",
          weight: appt.reason?.includes("Blood pressure") ? "80" : "90",
        },
      },
    });
  }
  console.log(`  ✓ ${completedAppts.length} visit notes created`);

  // ─── Prescriptions ────────────────────────────────────────
  const prescriptionsData = [
    {
      patientId: patientIds[0],
      doctorId: doctorIds[0],
      status: "ACTIVE" as const,
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60000),
      endDate: new Date(now.getTime() + 150 * 24 * 60 * 60000),
      refillsTotal: 5,
      refillsUsed: 1,
      pharmacy: "HealthSync Pharmacy, Allen Avenue",
      medications: [
        {
          name: "Ventolin Inhaler",
          dosage: "100mcg",
          frequency: "As needed, max 4 puffs daily",
          route: "Inhalation",
          instructions: "Shake well before use. Use spacer for best results. Rinse mouth after use.",
          sideEffects: "Tremor, headache, increased heart rate",
        },
      ],
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[1],
      status: "ACTIVE" as const,
      startDate: new Date(now.getTime() - 60 * 24 * 60 * 60000),
      endDate: new Date(now.getTime() + 120 * 24 * 60 * 60000),
      refillsTotal: 5,
      refillsUsed: 2,
      pharmacy: "HealthSync Pharmacy, Allen Avenue",
      medications: [
        {
          name: "Amlodipine",
          dosage: "5mg",
          frequency: "Once daily",
          route: "Oral",
          instructions: "Take in the morning with or without food. Do not stop abruptly.",
          sideEffects: "Ankle swelling, dizziness, flushing",
        },
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          route: "Oral",
          instructions: "Take with meals. Start with lower dose and increase gradually.",
          sideEffects: "Nausea, diarrhea, stomach upset",
        },
      ],
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[0],
      status: "COMPLETED" as const,
      startDate: new Date(now.getTime() - 180 * 24 * 60 * 60000),
      endDate: new Date(now.getTime() - 90 * 24 * 60 * 60000),
      refillsTotal: 2,
      refillsUsed: 2,
      pharmacy: "MedPlus Pharmacy, VI",
      medications: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "Three times daily",
          route: "Oral",
          instructions: "Complete the full course. Take with plenty of water.",
          sideEffects: "Nausea, diarrhea, rash",
        },
      ],
    },
    {
      patientId: patientIds[3],
      doctorId: doctorIds[0],
      status: "ACTIVE" as const,
      startDate: new Date(now.getTime() - 7 * 24 * 60 * 60000),
      endDate: new Date(now.getTime() + 83 * 24 * 60 * 60000),
      refillsTotal: 3,
      refillsUsed: 0,
      pharmacy: "HealthSync Pharmacy, Allen Avenue",
      medications: [
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "Three times daily after meals",
          route: "Oral",
          instructions: "Take after food. Do not exceed 1200mg per day. Avoid if you have stomach ulcers.",
          sideEffects: "Stomach pain, nausea, dizziness",
        },
        {
          name: "Methocarbamol",
          dosage: "750mg",
          frequency: "Three times daily",
          route: "Oral",
          instructions: "May cause drowsiness. Avoid driving or operating machinery.",
          sideEffects: "Drowsiness, dizziness, nausea",
        },
      ],
    },
    {
      patientId: patientIds[4],
      doctorId: doctorIds[0],
      status: "ACTIVE" as const,
      startDate: new Date(now.getTime() - 14 * 24 * 60 * 60000),
      endDate: new Date(now.getTime() + 76 * 24 * 60 * 60000),
      refillsTotal: 2,
      refillsUsed: 0,
      pharmacy: "HealthSync Pharmacy, Allen Avenue",
      medications: [
        {
          name: "Folic Acid",
          dosage: "5mg",
          frequency: "Once daily",
          route: "Oral",
          instructions: "Take with breakfast. Essential for sickle cell trait management.",
          sideEffects: "Rarely: nausea, bloating",
        },
      ],
    },
  ];

  for (const rx of prescriptionsData) {
    const { medications, ...prescriptionData } = rx;
    await prisma.prescription.create({
      data: {
        ...prescriptionData,
        medications: { create: medications },
      },
    });
  }
  console.log(`  ✓ ${prescriptionsData.length} prescriptions created`);

  // ─── Refills for active prescriptions ─────────────────────
  const activeRx = await prisma.prescription.findMany({
    where: { refillsUsed: { gt: 0 } },
    select: { id: true, pharmacy: true, refillsUsed: true },
  });

  for (const rx of activeRx) {
    for (let i = 0; i < rx.refillsUsed; i++) {
      await prisma.refill.create({
        data: {
          prescriptionId: rx.id,
          pharmacy: rx.pharmacy,
          cost: 350000 + Math.floor(Math.random() * 200000),
          status: "picked_up",
          requestedAt: new Date(now.getTime() - (30 * (rx.refillsUsed - i)) * 24 * 60 * 60000),
          filledAt: new Date(now.getTime() - (29 * (rx.refillsUsed - i)) * 24 * 60 * 60000),
        },
      });
    }
  }
  console.log("  ✓ Refill history created");

  // ─── Lab Orders ───────────────────────────────────────────
  const labTechRecord = await prisma.labTech.findUnique({
    where: { userId: labTech.id },
    select: { id: true },
  });

  const labOrdersData = [
    {
      patientId: patientIds[0],
      doctorId: doctorIds[0],
      labTechId: labTechRecord?.id,
      testName: "Complete Blood Count (CBC)",
      testCode: "CBC-001",
      category: "Hematology",
      priority: "ROUTINE" as const,
      status: "COMPLETED" as const,
      sampleType: "Blood",
      clinicalNotes: "Annual health checkup - routine blood work",
      collectedAt: new Date(now.getTime() - 10 * 24 * 60 * 60000),
      completedAt: new Date(now.getTime() - 9 * 24 * 60 * 60000),
      results: [
        { parameter: "WBC", value: "6.5", unit: "x10³/µL", referenceMin: "4.0", referenceMax: "11.0", flag: "normal" },
        { parameter: "RBC", value: "4.8", unit: "x10⁶/µL", referenceMin: "4.0", referenceMax: "5.5", flag: "normal" },
        { parameter: "Hemoglobin", value: "13.2", unit: "g/dL", referenceMin: "12.0", referenceMax: "16.0", flag: "normal" },
        { parameter: "Hematocrit", value: "40", unit: "%", referenceMin: "36", referenceMax: "46", flag: "normal" },
        { parameter: "Platelets", value: "250", unit: "x10³/µL", referenceMin: "150", referenceMax: "400", flag: "normal" },
      ],
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[1],
      labTechId: labTechRecord?.id,
      testName: "Lipid Panel",
      testCode: "LIP-001",
      category: "Chemistry",
      priority: "ROUTINE" as const,
      status: "COMPLETED" as const,
      sampleType: "Blood",
      clinicalNotes: "Monitoring cholesterol for hypertension patient",
      collectedAt: new Date(now.getTime() - 5 * 24 * 60 * 60000),
      completedAt: new Date(now.getTime() - 4 * 24 * 60 * 60000),
      results: [
        { parameter: "Total Cholesterol", value: "245", unit: "mg/dL", referenceMin: "0", referenceMax: "200", flag: "high" },
        { parameter: "LDL", value: "160", unit: "mg/dL", referenceMin: "0", referenceMax: "100", flag: "high" },
        { parameter: "HDL", value: "42", unit: "mg/dL", referenceMin: "40", referenceMax: "60", flag: "normal" },
        { parameter: "Triglycerides", value: "180", unit: "mg/dL", referenceMin: "0", referenceMax: "150", flag: "high" },
      ],
    },
    {
      patientId: patientIds[1],
      doctorId: doctorIds[0],
      testName: "Fasting Blood Glucose",
      testCode: "GLU-001",
      category: "Chemistry",
      priority: "ROUTINE" as const,
      status: "ORDERED" as const,
      sampleType: "Blood",
      clinicalNotes: "Quarterly diabetes monitoring",
    },
    {
      patientId: patientIds[3],
      doctorId: doctorIds[0],
      testName: "Lumbar Spine X-Ray",
      testCode: "XR-LSP-001",
      category: "Radiology",
      priority: "URGENT" as const,
      status: "SAMPLE_COLLECTED" as const,
      sampleType: "Imaging",
      clinicalNotes: "Chronic lower back pain - rule out disc herniation",
      collectedAt: new Date(now.getTime() - 1 * 24 * 60 * 60000),
    },
    {
      patientId: patientIds[4],
      doctorId: doctorIds[0],
      testName: "Hemoglobin Electrophoresis",
      testCode: "HBE-001",
      category: "Hematology",
      priority: "ROUTINE" as const,
      status: "PROCESSING" as const,
      sampleType: "Blood",
      clinicalNotes: "Sickle cell trait confirmation and monitoring",
      labTechId: labTechRecord?.id,
      collectedAt: new Date(now.getTime() - 2 * 24 * 60 * 60000),
    },
  ];

  for (const lo of labOrdersData) {
    const { results: resultData, ...orderData } = lo as any;
    const order = await prisma.labOrder.create({ data: orderData });
    if (resultData) {
      await prisma.labResult.createMany({
        data: resultData.map((r: any) => ({ labOrderId: order.id, ...r })),
      });
    }
  }
  console.log(`  ✓ ${labOrdersData.length} lab orders created`);

  // ─── Notifications ────────────────────────────────────────
  const notificationsData = [
    {
      userId: patients[0].id,
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Adaeze Okonkwo is in 2 days. Please arrive 15 minutes early.",
      type: "appointment",
      link: "/dashboard/appointments",
    },
    {
      userId: patients[1].id,
      title: "Prescription Refill Due",
      message: "Your Amlodipine prescription has 3 refills remaining. Consider requesting a refill soon.",
      type: "prescription",
      link: "/dashboard/prescriptions",
    },
    {
      userId: patients[0].id,
      title: "Lab Results Available",
      message: "Your recent blood work results are now available for review.",
      type: "system",
      link: "/dashboard/health-records",
    },
    {
      userId: doctors[0].id,
      title: "New Appointment",
      message: "Amara Obi has booked an appointment for an annual health checkup.",
      type: "appointment",
      link: "/doctor/appointments",
    },
  ];

  for (const n of notificationsData) {
    await prisma.notification.create({ data: n });
  }
  console.log(`  ✓ ${notificationsData.length} notifications created`);

  console.log("\n✅ Seed complete!");
  console.log("\n📋 Login credentials (all accounts use the same password):");
  console.log("   Password: password123");
  console.log("\n   Admin:      admin@healthsync.ng");
  console.log("   Doctors:    dr.adaeze@healthsync.ng / dr.emeka@healthsync.ng / dr.fatima@healthsync.ng");
  console.log("   Pharmacist: pharm.bola@healthsync.ng");
  console.log("   Lab Tech:   lab.chidi@healthsync.ng");
  console.log("   Patients:   amara.patient@gmail.com / tunde.patient@gmail.com / chioma.patient@gmail.com");
  console.log("               ibrahim.patient@gmail.com / blessing.patient@gmail.com");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
