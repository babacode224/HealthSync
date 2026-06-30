"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const stats = [
  { value: "50K+", label: "Active Patients" },
  { value: "1,200+", label: "Verified Doctors" },
  { value: "99.2%", label: "AI Accuracy" },
  { value: "24/7", label: "Always Available" },
];

const features = [
  {
    title: "AI-Powered Triage",
    desc: "Our clinical AI analyzes symptoms in seconds, providing evidence-based triage recommendations trained on millions of cases across African and global health contexts.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    color: "primary",
  },
  {
    title: "Smart Appointments",
    desc: "Book with verified specialists instantly. Our system checks real-time availability, prevents double-booking, and sends automated reminders via SMS and email.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    color: "secondary",
  },
  {
    title: "E-Prescriptions",
    desc: "Doctors issue digital prescriptions that go directly to your chosen pharmacy. Track refills, set medication reminders, and never lose a prescription again.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    color: "tertiary",
  },
  {
    title: "Lab Integration",
    desc: "Order lab tests digitally, track sample collection and processing in real-time, and receive results with AI-flagged abnormal values directly in your dashboard.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
      </svg>
    ),
    color: "primary",
  },
  {
    title: "Secure Health Records",
    desc: "Your complete medical history in one place. Allergies, conditions, visit notes, and lab results - all encrypted with military-grade security and NDPR compliant.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    color: "secondary",
  },
  {
    title: "Emergency SOS",
    desc: "One-tap emergency assistance transmits your medical profile and GPS location to nearby responders. Family members receive instant alerts with your status.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
    color: "error",
  },
];

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    desc: "Sign up in under 2 minutes. Add your medical history, allergies, and insurance details to your secure profile.",
  },
  {
    step: "02",
    title: "Find & Book",
    desc: "Browse verified doctors by specialty, read reviews, check real-time availability, and book instantly - no phone calls needed.",
  },
  {
    step: "03",
    title: "Get Care",
    desc: "Attend appointments in-person or via telehealth. Receive digital prescriptions, lab orders, and visit summaries automatically.",
  },
  {
    step: "04",
    title: "Track & Thrive",
    desc: "Monitor your health journey with lab results, medication tracking, AI insights, and seamless follow-up scheduling.",
  },
];

const portals = [
  {
    title: "Patient Portal",
    desc: "Your health dashboard with appointments, prescriptions, lab results, and AI triage - all in one place.",
    features: ["AI Symptom Checker", "Appointment Booking", "Prescription Tracking", "Lab Results", "Health Records", "Emergency SOS"],
    gradient: "from-primary to-primary-container",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Doctor Portal",
    desc: "Manage your practice efficiently with smart scheduling, patient management, and digital prescriptions.",
    features: ["Patient Queue", "Visit Notes & Vitals", "Digital Prescriptions", "Lab Orders", "Schedule Management", "Practice Analytics"],
    gradient: "from-secondary to-[#00a03e]",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
      </svg>
    ),
  },
  {
    title: "Pharmacy Portal",
    desc: "Receive digital prescriptions, manage refill requests, and keep patients notified when orders are ready.",
    features: ["Incoming Prescriptions", "Refill Management", "Inventory Tracking", "Patient Notifications", "Revenue Analytics", "NAFDAC Compliance"],
    gradient: "from-tertiary to-[#b86800]",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349" />
      </svg>
    ),
  },
  {
    title: "Lab Portal",
    desc: "Process orders efficiently with sample tracking, result entry with auto-flagging, and priority management.",
    features: ["Order Queue", "Sample Tracking", "Result Entry", "Auto-Flag Abnormals", "STAT Priority", "Completion Reports"],
    gradient: "from-[#6b21a8] to-[#9333ea]",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const pricing = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    desc: "Perfect for getting started with digital healthcare.",
    features: ["AI Symptom Checker", "Up to 3 appointments/month", "Digital prescriptions", "Basic health records", "Email support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "₦15,000",
    period: "/month",
    desc: "For individuals who want the full HealthSync experience.",
    features: ["Everything in Basic", "Unlimited appointments", "Lab result tracking", "Priority AI triage", "Family profiles (up to 5)", "24/7 phone support", "Medication reminders"],
    cta: "Start Premium",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For hospitals, clinics, and healthcare organizations.",
    features: ["Everything in Premium", "Custom integration API", "Dedicated account manager", "Staff training", "Custom branding", "SLA guarantee", "Audit & compliance reports"],
    cta: "Contact Sales",
    popular: false,
  },
];

const testimonials = [
  {
    quote: "HealthSync's AI triage saved me a trip to the ER for what turned out to be a minor allergic reaction. The precision and calm guidance are unmatched.",
    name: "Sarah Jenkins",
    role: "Patient, Lagos",
    initials: "SJ",
  },
  {
    quote: "Managing my practice has never been easier. Digital prescriptions go straight to the pharmacy and I can track patient follow-ups effortlessly.",
    name: "Dr. Adebayo Okonkwo",
    role: "General Practitioner, Abuja",
    initials: "AO",
  },
  {
    quote: "As a pharmacist, receiving digital prescriptions with full patient context means fewer errors and faster dispensing. Our refill management is now seamless.",
    name: "Amina Bello",
    role: "Chief Pharmacist, Ibadan",
    initials: "AB",
  },
];

const faqs = [
  {
    q: "Is HealthSync available in my area?",
    a: "HealthSync is currently available across Nigeria with plans to expand to Ghana, Kenya, and South Africa by Q2 2027. Our AI triage is accessible from anywhere with internet.",
  },
  {
    q: "How secure is my health data?",
    a: "We use AES-256 encryption for all data at rest and TLS 1.3 for data in transit. We are fully NDPR (Nigeria Data Protection Regulation) compliant and follow HIPAA guidelines for international best practices.",
  },
  {
    q: "Can I use HealthSync for my family?",
    a: "Yes! Premium plans include family profiles for up to 5 members. Each family member gets their own health dashboard while you manage appointments and records from a single account.",
  },
  {
    q: "How does the AI triage work?",
    a: "Our AI is trained on millions of clinical cases with a focus on conditions prevalent in African populations. It asks targeted questions about your symptoms, analyzes your medical history, and provides an evidence-based urgency assessment. It does not replace a doctor - it helps you decide when and how urgently to seek care.",
  },
  {
    q: "What types of providers can join HealthSync?",
    a: "We welcome doctors, pharmacists, and lab technicians. All providers go through a verification process where our admin team reviews credentials before activation. This ensures every provider on the platform is qualified and trustworthy.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No hidden fees. The Basic plan is completely free. Premium is ₦15,000/month with full transparency. Appointment fees are set by individual providers and shown upfront before booking.",
  },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{value}</div>
      <div className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePortal, setActivePortal] = useState(0);

  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-surface to-secondary/5" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

          <div className="max-w-[1440px] mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Now Live in Nigeria
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-bold tracking-tight text-on-surface">
                Healthcare That{" "}
                <span className="text-primary">Understands</span> Africa.
              </h1>

              <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                HealthSync connects patients, doctors, pharmacies, and labs on
                one AI-powered platform. Book appointments, manage prescriptions,
                track lab results, and access intelligent triage - all from your phone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/signup"
                  className="bg-primary text-on-primary text-sm font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                >
                  Start Free Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/register/provider"
                  className="bg-surface text-primary text-sm font-semibold px-8 py-4 rounded-xl border border-outline-variant hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  Join as Provider
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary-container"].map((bg, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-surface ${bg} flex items-center justify-center text-white font-bold text-xs`}>
                      {["MD", "RN", "GP", "DR"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant">
                  <span className="font-bold text-primary">1,200+</span> verified providers already on board
                </p>
              </div>
            </div>

            {/* Hero Visual - Dashboard Preview */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/50 bg-surface">
                {/* Mock dashboard header */}
                <div className="bg-primary px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-lg px-4 py-1.5 text-white/60 text-xs">
                    healthsync.ng/dashboard
                  </div>
                </div>
                {/* Mock dashboard content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-on-surface-variant">Welcome back,</div>
                      <div className="text-lg font-bold text-on-surface">Chioma Adeyemi</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">CA</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Next Appointment", value: "Today, 2:30 PM", color: "bg-primary/10 text-primary" },
                      { label: "Prescriptions", value: "3 Active", color: "bg-secondary/10 text-secondary" },
                      { label: "Lab Results", value: "1 New", color: "bg-tertiary/10 text-tertiary" },
                    ].map((card) => (
                      <div key={card.label} className={`${card.color} rounded-xl p-3`}>
                        <div className="text-[10px] font-medium opacity-80">{card.label}</div>
                        <div className="text-sm font-bold mt-1">{card.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-on-surface">AI Triage Complete</div>
                        <div className="text-[10px] text-on-surface-variant">Low urgency - schedule routine visit</div>
                      </div>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -bottom-4 -left-8 bg-surface p-4 rounded-2xl shadow-xl border border-outline-variant/50 z-20 flex items-center gap-3 max-w-[260px]">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-on-surface">Prescription Ready</div>
                  <div className="text-[10px] text-on-surface-variant">MedPharm Lagos - Pick up anytime</div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-4 -right-4 bg-surface p-3 rounded-xl shadow-xl border border-outline-variant/50 z-20">
                <div className="text-xs font-medium text-on-surface-variant">AI Accuracy</div>
                <div className="text-2xl font-bold text-primary">99.2%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-surface-container-low border-y border-outline-variant/50">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Platform Features</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Everything You Need, <span className="text-primary">One Platform</span>
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                From AI-powered symptom assessment to lab result tracking,
                HealthSync covers the entire healthcare journey for patients and providers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const colorMap: Record<string, { bg: string; text: string; border: string }> = {
                  primary: { bg: "bg-primary/10", text: "text-primary", border: "hover:border-primary/30" },
                  secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "hover:border-secondary/30" },
                  tertiary: { bg: "bg-tertiary/10", text: "text-tertiary", border: "hover:border-tertiary/30" },
                  error: { bg: "bg-error/10", text: "text-error", border: "hover:border-error/30" },
                };
                const c = colorMap[feature.color];
                return (
                  <div
                    key={feature.title}
                    className={`bg-surface rounded-2xl p-7 border border-outline-variant/50 ${c.border} hover:shadow-lg transition-all group`}
                  >
                    <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center ${c.text} mb-5 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-surface-container-low scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Simple Process</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                How HealthSync <span className="text-secondary">Works</span>
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Get started in minutes. Our streamlined process makes healthcare
                accessible and stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.step} className="relative">
                  <div className="bg-surface rounded-2xl p-7 border border-outline-variant/50 h-full">
                    <div className="text-4xl font-black text-primary/10 mb-4">{step.step}</div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-outline-variant">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portal Showcase */}
        <section id="portals" className="py-20 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">5 Specialized Portals</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Built for <span className="text-primary">Every Role</span> in Healthcare
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Whether you are a patient, doctor, pharmacist, lab technician, or
                administrator - HealthSync has a dedicated portal designed for your workflow.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {portals.map((portal, i) => (
                <button
                  key={portal.title}
                  onClick={() => setActivePortal(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activePortal === i
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {portal.title}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${portals[activePortal].gradient} flex items-center justify-center text-white`}>
                  {portals[activePortal].icon}
                </div>
                <h3 className="text-2xl font-bold">{portals[activePortal].title}</h3>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  {portals[activePortal].desc}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {portals[activePortal].features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-on-surface-variant">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={activePortal === 0 ? "/signup" : "/register/provider"}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-6 py-3 rounded-xl hover:bg-primary-container transition-all"
                >
                  {activePortal === 0 ? "Sign Up as Patient" : "Register as Provider"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Portal preview mockup */}
              <div className="bg-surface-container-low rounded-2xl border border-outline-variant/50 p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-outline-variant/50">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${portals[activePortal].gradient}`} />
                  <span className="text-xs font-semibold text-on-surface-variant">{portals[activePortal].title} Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {portals[activePortal].features.slice(0, 4).map((f, i) => (
                    <div key={f} className="bg-surface rounded-xl p-4 border border-outline-variant/30">
                      <div className="text-[10px] font-medium text-on-surface-variant mb-1">{f}</div>
                      <div className="text-lg font-bold text-on-surface">{[12, 8, 3, 5][i]}</div>
                      <div className="mt-2 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30 rounded-full" style={{ width: `${[75, 60, 90, 45][i]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-surface rounded-xl p-4 border border-outline-variant/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-on-surface">Recent Activity</span>
                    <span className="text-[10px] text-primary font-medium">View All</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-t border-outline-variant/20">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {["CA", "BO", "KN"][i - 1]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-on-surface truncate">
                          {["Appointment completed", "New prescription issued", "Lab results ready"][i - 1]}
                        </div>
                        <div className="text-[10px] text-on-surface-variant">{["2 hours ago", "Yesterday", "3 days ago"][i - 1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Testimonials</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Trusted by <span className="text-primary">Healthcare Professionals</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-surface rounded-2xl p-7 border border-outline-variant/50 hover:shadow-lg transition-all">
                  <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">{t.name}</div>
                      <div className="text-xs text-on-surface-variant">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Pricing</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Simple, <span className="text-primary">Transparent</span> Pricing
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Start free, upgrade when you need more. No hidden fees, no surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-7 border transition-all ${
                    plan.popular
                      ? "bg-primary text-on-primary border-primary shadow-xl scale-[1.02] relative"
                      : "bg-surface border-outline-variant/50 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "" : "text-on-surface"}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-black ${plan.popular ? "" : "text-on-surface"}`}>{plan.price}</span>
                      {plan.period && <span className={`text-sm ${plan.popular ? "opacity-80" : "text-on-surface-variant"}`}>{plan.period}</span>}
                    </div>
                    <p className={`text-sm mt-2 ${plan.popular ? "opacity-80" : "text-on-surface-variant"}`}>{plan.desc}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <svg className={`w-5 h-5 shrink-0 ${plan.popular ? "text-on-primary" : "text-secondary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span className={plan.popular ? "opacity-90" : "text-on-surface-variant"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                    className={`block text-center text-sm font-semibold py-3 rounded-xl transition-all ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-surface-container-low scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl border border-outline-variant/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-on-surface pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Security */}
        <section className="py-16">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "NDPR Compliant",
                  desc: "Fully compliant with Nigeria Data Protection Regulation. Your data stays in Africa.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  ),
                },
                {
                  title: "HIPAA Standards",
                  desc: "Following international best practices for health information security and patient privacy.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  ),
                },
                {
                  title: "NAFDAC Verified",
                  desc: "Pharmacy operations follow NAFDAC guidelines for prescription dispensing and drug safety.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="bg-primary text-on-primary p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 to-transparent" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to Transform Your Healthcare Experience?
                </h2>
                <p className="text-base mb-8 opacity-80 leading-relaxed max-w-xl mx-auto">
                  Join thousands of patients and healthcare providers already using
                  HealthSync. Start your free account today - no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="bg-white text-primary text-sm font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-all shadow-lg"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    href="/register/provider"
                    className="bg-white/10 text-white border border-white/20 text-sm font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
                  >
                    Register as Provider
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
