"use client";

import { useState } from "react";

type Period = "week" | "month" | "quarter" | "year";

const monthlyData = [
  { month: "Jan", patients: 62, revenue: 248000, telehealth: 18, inPerson: 44 },
  { month: "Feb", patients: 58, revenue: 232000, telehealth: 20, inPerson: 38 },
  { month: "Mar", patients: 71, revenue: 284000, telehealth: 24, inPerson: 47 },
  { month: "Apr", patients: 68, revenue: 272000, telehealth: 22, inPerson: 46 },
  { month: "May", patients: 75, revenue: 300000, telehealth: 28, inPerson: 47 },
  { month: "Jun", patients: 82, revenue: 328000, telehealth: 32, inPerson: 50 },
];

const topConditions = [
  { condition: "Essential Hypertension", count: 34, percent: 22 },
  { condition: "Type 2 Diabetes Mellitus", count: 28, percent: 18 },
  { condition: "Upper Respiratory Infection", count: 21, percent: 14 },
  { condition: "Malaria (Uncomplicated)", count: 18, percent: 12 },
  { condition: "Peptic Ulcer Disease", count: 14, percent: 9 },
  { condition: "Asthma", count: 12, percent: 8 },
  { condition: "Migraine", count: 10, percent: 6 },
  { condition: "Dyslipidemia", count: 8, percent: 5 },
];

const patientDemographics = {
  age: [
    { range: "0-17", count: 8, percent: 5 },
    { range: "18-30", count: 32, percent: 21 },
    { range: "31-45", count: 48, percent: 31 },
    { range: "46-60", count: 42, percent: 27 },
    { range: "60+", count: 24, percent: 16 },
  ],
  sex: { male: 68, female: 86 },
};

const recentReviews = [
  { patient: "Chioma Okafor", rating: 5, comment: "Dr. Jenkins is very thorough and takes time to explain everything.", date: "June 25, 2026" },
  { patient: "Adebayo Oluwatobi", rating: 5, comment: "Great follow-up on my diabetes management. Feeling much better.", date: "June 24, 2026" },
  { patient: "Amina Yusuf", rating: 4, comment: "Good consultation. Wait time was a bit long.", date: "June 18, 2026" },
  { patient: "Oluwaseun Adeyemi", rating: 5, comment: "Very professional. Explained my test results clearly.", date: "June 15, 2026" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("month");

  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));
  const maxPatients = Math.max(...monthlyData.map((d) => d.patients));
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalPatients = monthlyData.reduce((s, d) => s + d.patients, 0);
  const avgRating = (recentReviews.reduce((s, r) => s + r.rating, 0) / recentReviews.length).toFixed(1);

  const pctChange = (curr: number, prev: number) => {
    const change = ((curr - prev) / prev) * 100;
    return { value: Math.abs(change).toFixed(1), positive: change >= 0 };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Analytics</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Performance insights and patient trends</p>
        </div>
        <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5">
          {(["week", "month", "quarter", "year"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${period === p ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Patients This Month", value: current.patients, change: pctChange(current.patients, previous.patients), prefix: "" },
          { label: "Revenue (June)", value: `₦${(current.revenue / 1000).toFixed(0)}K`, change: pctChange(current.revenue, previous.revenue), prefix: "" },
          { label: "Telehealth Rate", value: `${Math.round((current.telehealth / current.patients) * 100)}%`, change: { value: "4.2", positive: true }, prefix: "" },
          { label: "Patient Rating", value: avgRating, change: { value: "0.1", positive: true }, prefix: "★ " },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <div className="text-xs text-on-surface-variant font-medium">{kpi.label}</div>
            <div className="text-2xl font-bold text-on-surface mt-1">{kpi.prefix}{kpi.value}</div>
            <div className={`text-xs font-semibold mt-1 ${kpi.change.positive ? "text-secondary" : "text-error"}`}>
              {kpi.change.positive ? "↑" : "↓"} {kpi.change.value}% vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Patient Volume Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-4">Patient Volume (6 Months)</h3>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] font-bold text-on-surface">{d.patients}</div>
                <div className="w-full flex flex-col gap-0.5" style={{ height: `${(d.patients / maxPatients) * 100}%` }}>
                  <div className="flex-1 bg-primary rounded-t-sm" style={{ flex: d.inPerson }} />
                  <div className="bg-secondary rounded-b-sm" style={{ flex: d.telehealth }} />
                </div>
                <div className="text-[10px] text-on-surface-variant">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary" /><span className="text-[10px] text-on-surface-variant">In-Person</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-secondary" /><span className="text-[10px] text-on-surface-variant">Telehealth</span></div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-4">Revenue Trend (₦)</h3>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] font-bold text-on-surface">{(d.revenue / 1000).toFixed(0)}K</div>
                <div className="w-full bg-secondary rounded-t-sm" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} />
                <div className="text-[10px] text-on-surface-variant">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-on-surface-variant">
            YTD Total: <span className="font-bold text-on-surface">₦{(totalRevenue / 1000000).toFixed(2)}M</span> · Avg: <span className="font-bold text-on-surface">₦{(totalRevenue / monthlyData.length / 1000).toFixed(0)}K/mo</span>
          </div>
        </div>
      </div>

      {/* Top Conditions & Demographics */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Top Conditions */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-3">Top Conditions (H1 2026)</h3>
          <div className="space-y-2.5">
            {topConditions.map((c) => (
              <div key={c.condition} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-on-surface truncate">{c.condition}</span>
                    <span className="text-xs text-on-surface-variant shrink-0 ml-2">{c.count}</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-on-surface">Patient Demographics</h3>

          <div>
            <div className="text-xs font-bold text-on-surface-variant uppercase mb-2">Age Distribution</div>
            <div className="flex gap-1.5 h-20 items-end">
              {patientDemographics.age.map((a) => (
                <div key={a.range} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[10px] font-bold text-on-surface">{a.count}</div>
                  <div className="w-full bg-primary/70 rounded-t-sm" style={{ height: `${(a.count / 48) * 100}%` }} />
                  <div className="text-[10px] text-on-surface-variant">{a.range}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-on-surface-variant uppercase mb-2">Sex Distribution</div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: `${(patientDemographics.sex.male / (patientDemographics.sex.male + patientDemographics.sex.female)) * 100}%` }} />
                  <div className="bg-secondary h-full flex-1" />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" /><span className="text-xs text-on-surface-variant">Male {patientDemographics.sex.male} ({Math.round((patientDemographics.sex.male / (patientDemographics.sex.male + patientDemographics.sex.female)) * 100)}%)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-secondary" /><span className="text-xs text-on-surface-variant">Female {patientDemographics.sex.female} ({Math.round((patientDemographics.sex.female / (patientDemographics.sex.male + patientDemographics.sex.female)) * 100)}%)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
        <h3 className="text-sm font-bold text-on-surface mb-3">Performance Metrics</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Avg. Consultation Duration", value: "18 min", target: "20 min", status: "good" },
            { label: "Patient Wait Time (Avg)", value: "12 min", target: "< 15 min", status: "good" },
            { label: "Same-Day Appointments", value: "34%", target: "> 25%", status: "good" },
            { label: "Prescription Accuracy", value: "99.2%", target: "> 99%", status: "good" },
            { label: "Follow-up Compliance", value: "78%", target: "> 85%", status: "warning" },
            { label: "No-Show Rate", value: "8%", target: "< 10%", status: "good" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.status === "good" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                {m.status === "good" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                )}
              </div>
              <div>
                <div className="text-xs text-on-surface-variant">{m.label}</div>
                <div className="text-sm font-bold text-on-surface">{m.value} <span className="text-[10px] font-normal text-on-surface-variant">(target: {m.target})</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Reviews */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
          <h3 className="text-sm font-bold text-on-surface">Recent Patient Reviews</h3>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-tertiary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span className="text-sm font-bold text-on-surface">{avgRating}</span>
            <span className="text-xs text-on-surface-variant">({recentReviews.length} reviews)</span>
          </div>
        </div>
        {recentReviews.map((r, i) => (
          <div key={i} className="px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-on-surface">{r.patient}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`w-3 h-3 ${j < r.rating ? "text-tertiary" : "text-surface-container-high"}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
              </div>
              <span className="text-xs text-on-surface-variant">{r.date}</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
