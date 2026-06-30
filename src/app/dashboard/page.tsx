"use client";

import Link from "next/link";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Chen",
    specialty: "Cardiology",
    time: "Today, 2:30 PM",
    avatar: "SC",
    avatarBg: "bg-primary",
  },
  {
    id: 2,
    doctor: "Dr. Michael Obi",
    specialty: "Dermatology",
    time: "Tomorrow, 10:00 AM",
    avatar: "MO",
    avatarBg: "bg-secondary",
  },
  {
    id: 3,
    doctor: "Dr. Leke Taiwo",
    specialty: "General Practice",
    time: "Fri, Jun 27, 9:00 AM",
    avatar: "LT",
    avatarBg: "bg-tertiary",
  },
];

const recentRecords = [
  {
    date: "Oct 14, 2025",
    activity: "AI Triage Session",
    result: "High Priority",
    resultColor: "text-error bg-error-container",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    date: "Oct 20, 2025",
    activity: "Blood Work Results",
    result: "Normal Vitals",
    resultColor: "text-secondary bg-secondary-container/30",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
      </svg>
    ),
  },
  {
    date: "Oct 15, 2025",
    activity: "Marketplace Purchase",
    result: "Vitamin D3 Supplement",
    resultColor: "text-on-surface-variant bg-surface-container-high",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
];

export default function PatientDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">
            Welcome back, Alexander
          </h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Your vitals were last synced 2 hours ago. Everything looks stable.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 rounded-full text-sm font-bold shadow-sm shrink-0 w-fit">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          HEALTH SCORE: 82/100
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left column — AI Triage CTA + Quick Actions */}
        <div className="lg:col-span-3 space-y-6">
          {/* AI Triage CTA */}
          <div className="bg-gradient-to-br from-primary via-primary-container to-primary rounded-2xl p-6 sm:p-8 text-on-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
            <div className="relative">
              <h2 className="text-xl font-bold mb-2">Feeling unwell?</h2>
              <p className="text-sm text-on-primary/80 mb-5 max-w-sm leading-relaxed">
                Start our AI-powered triage to get instant guidance and schedule
                necessary appointments.
              </p>
              <Link
                href="/dashboard/triage"
                className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-bold px-6 py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
                </svg>
                Start AI Triage
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-bold text-on-surface mb-3">Quick Actions</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                href="/dashboard/appointments"
                className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-on-surface">Book Appointment</div>
                <svg className="w-4 h-4 text-outline ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
              <Link
                href="/dashboard/records"
                className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-on-surface">View Prescriptions</div>
                <svg className="w-4 h-4 text-outline ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
              <Link
                href="/dashboard/marketplace"
                className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-on-surface">Browse Marketplace</div>
                <svg className="w-4 h-4 text-outline ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recent Health Records */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-on-surface">Recent Health Records</h3>
              <Link href="/dashboard/records" className="text-xs font-semibold text-primary hover:underline">
                View History
              </Link>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-3 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
                <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Date</span>
                <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Activity</span>
                <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Result/Action</span>
              </div>
              {recentRecords.map((record, i) => (
                <div
                  key={i}
                  className={`grid sm:grid-cols-3 gap-1 sm:gap-0 px-5 py-3 hover:bg-surface-container-low transition-colors cursor-pointer ${
                    i < recentRecords.length - 1 ? "border-b border-outline-variant" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="text-primary">{record.icon}</span>
                    {record.date}
                  </div>
                  <div className="text-sm font-medium text-on-surface">{record.activity}</div>
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${record.resultColor}`}>
                      {record.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Appointments */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Appointments</h3>
            <Link href="/dashboard/appointments" className="text-xs font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${apt.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {apt.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-on-surface">{apt.doctor}</div>
                    <div className="text-xs text-on-surface-variant">{apt.specialty}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <svg className="w-3.5 h-3.5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="text-xs font-medium text-on-surface-variant">{apt.time}</span>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
