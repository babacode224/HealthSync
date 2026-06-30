"use client";

import Link from "next/link";

const stats = [
  {
    label: "Total Patients",
    value: "1,240",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    color: "text-primary bg-primary-fixed",
  },
  {
    label: "Appointments",
    value: "8",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    color: "text-secondary bg-secondary-container/30",
  },
  {
    label: "Earnings (Monthly)",
    value: "$12,450",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    color: "text-tertiary bg-tertiary-fixed/30",
  },
  {
    label: "Avg. Rating",
    value: "4.9/5",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    color: "text-tertiary bg-tertiary-fixed/30",
  },
];

const appointments = [
  { time: "09:30 AM", name: "James Douglas", type: "In-Person", status: "confirmed", avatar: "JD" },
  { time: "10:15 AM", name: "Alice Lowry", type: "Telemedicine", status: "confirmed", avatar: "AL" },
  { time: "11:00 AM", name: "Robert Miller", type: "In-Person", status: "pending", avatar: "RM" },
  { time: "02:30 PM", name: "Karen Wright", type: "Telemedicine", status: "confirmed", avatar: "KW" },
];

const referrals = [
  {
    name: "Sarah Connor",
    summary: "Persistent chest pain, shortness of breath, history of hypertension.",
    date: "Referred 2d ago",
    avatar: "SC",
  },
  {
    name: "Michael Vance",
    summary: "Chronic joint pain, worsening in lower back during morning hours.",
    date: "Referred 1w ago",
    avatar: "MV",
  },
  {
    name: "David Goggins",
    summary: "Follow-up referral for physical therapy progress and lab review.",
    date: "Referred 1d ago",
    avatar: "DG",
  },
];

export default function DoctorDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome + Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">
            Welcome back, Dr. Jenkins
          </h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            General Practitioner • <strong>St. Mary&apos;s Medical Center</strong>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-sm font-medium text-on-surface px-4 py-2 rounded-lg hover:border-primary hover:shadow-sm transition-all">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
            </svg>
            Issue Prescription
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-sm font-medium text-on-surface px-4 py-2 rounded-lg hover:border-primary hover:shadow-sm transition-all">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            View Patient Records
          </button>
          <Link
            href="/doctor/appointments"
            className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Schedule Availability
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-xl font-bold text-on-surface">{stat.value}</div>
                <div className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left — Upcoming Appointments */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Upcoming Appointments</h3>
            <Link href="/doctor/appointments" className="text-xs font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Time</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">Patient Name</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Type</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
            </div>
            {appointments.map((apt, i) => (
              <div
                key={i}
                className={`grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-5 py-3 hover:bg-surface-container-low transition-colors cursor-pointer ${
                  i < appointments.length - 1 ? "border-b border-outline-variant" : ""
                }`}
              >
                <div className="text-sm font-medium text-on-surface-variant">{apt.time}</div>
                <div className="col-span-2 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {apt.avatar}
                  </div>
                  <span className="text-sm font-medium text-on-surface">{apt.name}</span>
                </div>
                <div className="text-sm text-on-surface-variant">{apt.type}</div>
                <div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      apt.status === "confirmed"
                        ? "bg-secondary-container/30 text-secondary"
                        : "bg-tertiary-fixed/30 text-tertiary"
                    }`}
                  >
                    {apt.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Recent Referrals */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Recent Referrals</h3>
            <Link href="/doctor/triage" className="text-xs font-semibold text-primary hover:underline">
              View Full Triage Queue
            </Link>
          </div>
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div
                key={ref.name}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant text-xs font-bold shrink-0">
                    {ref.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-on-surface">{ref.name}</h4>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5 line-clamp-2">{ref.summary}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[11px] text-outline">{ref.date}</span>
                      <button className="text-xs font-semibold text-primary hover:underline">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
