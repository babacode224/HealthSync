"use client";

import Link from "next/link";

const platformStats = [
  { label: "Total Users", value: "24,592", sub: "Patients 18,201 • Providers 6,391", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>, color: "text-primary bg-primary-fixed" },
  { label: "Platform Revenue", value: "$1.2M", sub: "+10.5% this month", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-secondary bg-secondary-container/30" },
  { label: "System Uptime", value: "99.98%", sub: "All services operational", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-secondary bg-secondary-container/30" },
];

const activityLog = [
  { user: "Dr. Sarah Chen", action: "Verified as Specialist (Cardiology)", time: "2 mins ago", avatar: "SC", avatarBg: "bg-primary" },
  { user: "New Patient: Marcus J.", action: "Registration complete via Mobile App", time: "8 mins ago", avatar: "MJ", avatarBg: "bg-secondary" },
  { user: "Login Attempt Blocked", action: "Suspicious IP 41.58.x.x — auto-blocked", time: "15 mins ago", avatar: "!", avatarBg: "bg-error" },
  { user: "Dr. Julian Vance", action: "License renewal submitted for review", time: "22 mins ago", avatar: "JV", avatarBg: "bg-tertiary" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {platformStats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</div>
                <div className="text-2xl font-bold text-on-surface mt-0.5">{stat.value}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{stat.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-bold text-on-surface">User Growth & Revenue</h3>
              <p className="text-xs text-on-surface-variant">Performance metrics for the last 6 months.</p>
            </div>
            <div className="flex bg-surface-container-high rounded-lg overflow-hidden">
              <button className="px-3 py-1 text-xs font-semibold bg-primary text-on-primary">Last 6 Months</button>
              <button className="px-3 py-1 text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">All Time</button>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            {/* Simple bar chart */}
            <div className="flex items-end gap-3 h-40">
              {[
                { month: "Jan", patients: 60, revenue: 40 },
                { month: "Feb", patients: 70, revenue: 50 },
                { month: "Mar", patients: 65, revenue: 55 },
                { month: "Apr", patients: 80, revenue: 60 },
                { month: "May", patients: 85, revenue: 70 },
                { month: "Jun", patients: 95, revenue: 80 },
              ].map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end h-32">
                    <div className="flex-1 rounded-t bg-primary" style={{ height: `${d.patients}%` }} />
                    <div className="flex-1 rounded-t bg-secondary" style={{ height: `${d.revenue}%` }} />
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-medium">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <div className="w-3 h-3 rounded bg-primary" /> Patients
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <div className="w-3 h-3 rounded bg-secondary" /> Revenue
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-inverse-surface rounded-xl p-5 text-inverse-on-surface">
              <div className="text-xs font-medium text-inverse-on-surface/70 uppercase tracking-wider">Active Appointments</div>
              <div className="text-3xl font-bold mt-1">1,402</div>
              <div className="text-xs mt-1 text-inverse-on-surface/60">+12 since 09:00 AM</div>
            </div>
            <div className="bg-inverse-surface rounded-xl p-5 text-inverse-on-surface">
              <div className="text-xs font-medium text-inverse-on-surface/70 uppercase tracking-wider">Pending Verifications</div>
              <div className="text-3xl font-bold mt-1">87</div>
              <div className="text-xs mt-1 text-inverse-on-surface/60">Priority: 12 Medical Degrees</div>
            </div>
          </div>
        </div>

        {/* Operations Log */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Operations Log</h3>
            <p className="text-[10px] text-on-surface-variant">Live registration & activity feed</p>
          </div>
          <div className="space-y-3">
            {activityLog.map((entry, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full ${entry.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {entry.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-on-surface">{entry.user}</div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">{entry.action}</p>
                    <span className="text-[10px] text-outline mt-1 block">{entry.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/activity"
            className="block text-center mt-3 text-xs font-semibold text-primary border border-outline-variant rounded-lg py-2.5 hover:border-primary hover:shadow-sm transition-all"
          >
            View All Activity
          </Link>
        </div>
      </div>
    </div>
  );
}
