"use client";

import { useState } from "react";

type Period = "7d" | "30d" | "90d";

const kpis = [
  { label: "Total Users", value: "2,847", change: "+12.3%", up: true },
  { label: "Active Providers", value: "186", change: "+8.1%", up: true },
  { label: "Appointments (MTD)", value: "1,429", change: "+15.7%", up: true },
  { label: "Revenue (MTD)", value: "₦14.2M", change: "+22.4%", up: true },
  { label: "Prescriptions Filled", value: "3,218", change: "+9.6%", up: true },
  { label: "Avg. Wait Time", value: "12 min", change: "-18.2%", up: false },
];

const userGrowth = [
  { month: "Jan", patients: 1820, providers: 142 },
  { month: "Feb", patients: 1950, providers: 148 },
  { month: "Mar", patients: 2100, providers: 155 },
  { month: "Apr", patients: 2280, providers: 164 },
  { month: "May", patients: 2520, providers: 175 },
  { month: "Jun", patients: 2847, providers: 186 },
];

const revenueByService = [
  { service: "Consultations", amount: 5200000, pct: 36.6 },
  { service: "Prescriptions", amount: 3800000, pct: 26.8 },
  { service: "Lab Tests", amount: 2900000, pct: 20.4 },
  { service: "Marketplace", amount: 1500000, pct: 10.6 },
  { service: "Telehealth", amount: 800000, pct: 5.6 },
];

const topProviders = [
  { name: "Dr. Sarah Jenkins", specialty: "Internal Medicine", patients: 142, rating: 4.9, revenue: "₦2.1M" },
  { name: "Dr. James Adeyemi", specialty: "Endocrinology", patients: 118, rating: 4.8, revenue: "₦1.8M" },
  { name: "Dr. Linda Baji", specialty: "Obstetrics", patients: 96, rating: 4.9, revenue: "₦1.5M" },
  { name: "Pharm. Chidinma Eze", specialty: "Clinical Pharmacy", patients: 210, rating: 4.7, revenue: "₦1.2M" },
  { name: "Lab. Olumide Fash", specialty: "Pathology", patients: 184, rating: 4.8, revenue: "₦980K" },
];

const regionData = [
  { region: "Lagos", users: 1240, pct: 43.6 },
  { region: "Abuja", users: 520, pct: 18.3 },
  { region: "Port Harcourt", users: 310, pct: 10.9 },
  { region: "Ibadan", users: 245, pct: 8.6 },
  { region: "Kano", users: 198, pct: 7.0 },
  { region: "Others", users: 334, pct: 11.7 },
];

const recentActivity = [
  { action: "New provider verified", detail: "Dr. Ibrahim Musa — General Practice", time: "2 hours ago", type: "success" },
  { action: "Subscription upgraded", detail: "MedPlus Pharmacy → Enterprise plan", time: "4 hours ago", type: "info" },
  { action: "Provider application rejected", detail: "Dr. Oluwaseun Bami — Expired license", time: "6 hours ago", type: "error" },
  { action: "System alert resolved", detail: "API latency spike — auto-scaled", time: "8 hours ago", type: "warning" },
  { action: "New pharmacy onboarded", detail: "GreenLife Pharmacy, Abuja", time: "Yesterday", type: "success" },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  const maxUsers = Math.max(...userGrowth.map((d) => d.patients));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Platform Analytics</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">System-wide performance metrics and insights</p>
        </div>
        <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5 self-start">
          {(["7d", "30d", "90d"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${period === p ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>
              {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-sm transition-all">
            <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold text-on-surface">{kpi.value}</div>
            <div className={`text-xs font-semibold mt-1 ${kpi.label === "Avg. Wait Time" ? "text-secondary" : kpi.up ? "text-secondary" : "text-error"}`}>
              {kpi.up && kpi.label !== "Avg. Wait Time" ? "↑" : "↓"} {kpi.change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-4">User Growth</h3>
          <div className="space-y-2">
            {userGrowth.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant w-8 shrink-0">{d.month}</span>
                <div className="flex-1 flex gap-1">
                  <div className="bg-primary rounded-sm h-5" style={{ width: `${(d.patients / maxUsers) * 100}%` }} title={`${d.patients} patients`} />
                  <div className="bg-secondary rounded-sm h-5" style={{ width: `${(d.providers / maxUsers) * 100}%` }} title={`${d.providers} providers`} />
                </div>
                <span className="text-[10px] text-on-surface-variant w-16 text-right shrink-0">{d.patients.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-outline-variant">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary" /><span className="text-[10px] text-on-surface-variant">Patients</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-secondary" /><span className="text-[10px] text-on-surface-variant">Providers</span></div>
          </div>
        </div>

        {/* Revenue by Service */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-4">Revenue by Service</h3>
          <div className="space-y-3">
            {revenueByService.map((r, i) => {
              const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary/60", "bg-secondary/60"];
              return (
                <div key={r.service}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-on-surface">{r.service}</span>
                    <span className="text-xs text-on-surface-variant">₦{(r.amount / 1000000).toFixed(1)}M ({r.pct}%)</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className={`h-2 rounded-full ${colors[i]} transition-all`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between">
            <span className="text-xs font-bold text-on-surface">Total Revenue</span>
            <span className="text-xs font-bold text-primary">₦14.2M</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Providers */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant">
            <h3 className="text-sm font-bold text-on-surface">Top Providers</h3>
          </div>
          <div className="hidden sm:grid grid-cols-5 px-5 py-2 border-b border-outline-variant bg-surface-container-low">
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">Provider</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Patients</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Rating</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Revenue</span>
          </div>
          {topProviders.map((p, i) => (
            <div key={i} className="grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
              <div className="col-span-2">
                <div className="text-sm font-semibold text-on-surface">{p.name}</div>
                <div className="text-[10px] text-on-surface-variant">{p.specialty}</div>
              </div>
              <span className="text-sm text-on-surface">{p.patients}</span>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-tertiary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span className="text-sm font-medium text-on-surface">{p.rating}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{p.revenue}</span>
            </div>
          ))}
        </div>

        {/* Regional Distribution */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-4">Regional Distribution</h3>
          <div className="space-y-3">
            {regionData.map((r, i) => {
              const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-primary/70", "bg-secondary/70", "bg-surface-container-high"];
              return (
                <div key={r.region}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-on-surface">{r.region}</span>
                    <span className="text-xs text-on-surface-variant">{r.users.toLocaleString()} users ({r.pct}%)</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className={`h-2 rounded-full ${colors[i]} transition-all`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-outline-variant">
          <h3 className="text-sm font-bold text-on-surface">Recent Platform Activity</h3>
        </div>
        {recentActivity.map((a, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${a.type === "success" ? "bg-secondary-container/30 text-secondary" : a.type === "error" ? "bg-error-container/50 text-error" : a.type === "warning" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-primary-fixed text-primary"}`}>
              {a.type === "success" && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
              {a.type === "error" && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>}
              {a.type === "warning" && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>}
              {a.type === "info" && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-on-surface">{a.action}</div>
              <div className="text-xs text-on-surface-variant">{a.detail}</div>
            </div>
            <span className="text-[10px] text-outline shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
