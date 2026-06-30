"use client";

import { useState } from "react";

type Period = "today" | "week" | "month";

const stats = {
  today: { dispensed: 34, revenue: "₦182,400", avgWait: "12 min", controlled: 3 },
  week: { dispensed: 218, revenue: "₦1,247,600", avgWait: "14 min", controlled: 19 },
  month: { dispensed: 891, revenue: "₦5,128,300", avgWait: "13 min", controlled: 72 },
};

const topMedications = [
  { name: "Metformin HCl 500mg/1000mg", category: "Antidiabetics", count: 142, revenue: "₦398,600", pct: 100 },
  { name: "Amlodipine Besylate 5mg/10mg", category: "Antihypertensives", count: 118, revenue: "₦295,000", pct: 83 },
  { name: "Omeprazole 20mg", category: "GI/Antacids", count: 97, revenue: "₦174,600", pct: 68 },
  { name: "Atorvastatin 10mg/20mg", category: "Statins", count: 89, revenue: "₦267,000", pct: 63 },
  { name: "Amoxicillin 500mg", category: "Antibiotics", count: 76, revenue: "₦152,000", pct: 54 },
  { name: "Paracetamol 500mg", category: "Analgesics", count: 68, revenue: "₦47,600", pct: 48 },
  { name: "Lisinopril 10mg/20mg", category: "Antihypertensives", count: 54, revenue: "₦145,800", pct: 38 },
  { name: "Ciprofloxacin 500mg", category: "Antibiotics", count: 43, revenue: "₦129,000", pct: 30 },
];

const weeklyVolume = [
  { day: "Mon", count: 38, revenue: 198400 },
  { day: "Tue", count: 42, revenue: 224600 },
  { day: "Wed", count: 35, revenue: 187200 },
  { day: "Thu", count: 45, revenue: 248900 },
  { day: "Fri", count: 40, revenue: 210500 },
  { day: "Sat", count: 18, revenue: 96200 },
  { day: "Sun", count: 0, revenue: 0 },
];

const paymentBreakdown = [
  { type: "NHIS", pct: 42, amount: "₦2,153,886", color: "bg-primary" },
  { type: "AXA Mansard", pct: 23, amount: "₦1,179,509", color: "bg-secondary" },
  { type: "Leadway Health", pct: 12, amount: "₦615,396", color: "bg-tertiary" },
  { type: "Cash Pay", pct: 18, amount: "₦923,094", color: "bg-outline" },
  { type: "Other Insurance", pct: 5, amount: "₦256,415", color: "bg-primary/40" },
];

const controlledLog = [
  { date: "June 27", drug: "Diazepam 5mg × 30", patient: "Fatima Bello", doctor: "Dr. Michael Obi", pharmacist: "Pharm. Chidi Okoro", status: "dispensed" },
  { date: "June 27", drug: "Tramadol 50mg × 20", patient: "Tunde Ogundimu", doctor: "Dr. Sarah Jenkins", pharmacist: "Pharm. Chidi Okoro", status: "dispensed" },
  { date: "June 27", drug: "Codeine Phosphate 30mg × 14", patient: "Ibrahim Musa", doctor: "Dr. Amara Obi", pharmacist: "Pharm. Ada Nwachukwu", status: "pending" },
  { date: "June 26", drug: "Diazepam 10mg × 20", patient: "Ngozi Eze", doctor: "Dr. Michael Obi", pharmacist: "Pharm. Chidi Okoro", status: "dispensed" },
  { date: "June 26", drug: "Tramadol 100mg × 30", patient: "Emeka Nwosu", doctor: "Dr. Sarah Jenkins", pharmacist: "Pharm. Ada Nwachukwu", status: "dispensed" },
];

const stockTurnover = [
  { category: "Antibiotics", turnover: 4.2, status: "optimal" },
  { category: "Antidiabetics", turnover: 3.8, status: "optimal" },
  { category: "Antihypertensives", turnover: 3.5, status: "optimal" },
  { category: "Analgesics", turnover: 5.1, status: "high" },
  { category: "Statins", turnover: 2.9, status: "optimal" },
  { category: "GI/Antacids", turnover: 3.1, status: "optimal" },
  { category: "Respiratory", turnover: 1.8, status: "low" },
  { category: "CNS/Sedatives", turnover: 1.2, status: "low" },
];

export default function PharmacyAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("month");
  const [tab, setTab] = useState<"overview" | "medications" | "revenue" | "controlled">("overview");

  const s = stats[period];
  const maxCount = weeklyVolume.reduce((max, d) => Math.max(max, d.count), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Analytics & Reports</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Dispensing metrics, revenue, and compliance reporting</p>
        </div>
        <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5">
          {(["today", "week", "month"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${period === p ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
              {p === "today" ? "Today" : p === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Prescriptions Dispensed", value: s.dispensed, color: "text-primary", bg: "bg-primary/10" },
          { label: "Revenue", value: s.revenue, color: "text-secondary", bg: "bg-secondary-container/20" },
          { label: "Avg Wait Time", value: s.avgWait, color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
          { label: "Controlled Substances", value: s.controlled, color: "text-error", bg: "bg-error-container/30" },
        ].map((st) => (
          <div key={st.label} className={`${st.bg} rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${st.color}`}>{st.value}</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "overview" as const, label: "Overview" },
          { key: "medications" as const, label: "Top Medications" },
          { key: "revenue" as const, label: "Revenue & Payments" },
          { key: "controlled" as const, label: "Controlled Log" },
        ]).map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-4">
          {/* Weekly volume chart */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Weekly Dispensing Volume</h3>
            <div className="flex items-end gap-3 h-40">
              {weeklyVolume.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-on-surface">{d.count}</span>
                  <div className="w-full bg-surface-container-high rounded-t-lg relative" style={{ height: "100%" }}>
                    <div className={`absolute bottom-0 w-full rounded-t-lg transition-all ${d.count === 0 ? "bg-outline-variant/30" : "bg-primary"}`} style={{ height: `${maxCount > 0 ? (d.count / maxCount) * 100 : 0}%` }} />
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock turnover */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Stock Turnover Rate (Monthly)</h3>
            <div className="space-y-3">
              {stockTurnover.map((st) => (
                <div key={st.category} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant w-32 shrink-0">{st.category}</span>
                  <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${st.status === "high" ? "bg-tertiary" : st.status === "low" ? "bg-error/60" : "bg-primary"}`} style={{ width: `${(st.turnover / 6) * 100}%` }} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-on-surface w-8 text-right">{st.turnover}×</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${st.status === "optimal" ? "bg-secondary-container/30 text-secondary" : st.status === "high" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-error-container/50 text-error"}`}>
                      {st.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Medications */}
      {tab === "medications" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Medication</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1 text-right">Qty</div>
            <div className="col-span-2 text-right">Revenue</div>
            <div className="col-span-2">Volume</div>
          </div>
          {topMedications.map((m, i) => (
            <div key={m.name} className="grid grid-cols-12 gap-2 items-center px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
              <div className="col-span-1 text-sm font-bold text-on-surface-variant">{i + 1}</div>
              <div className="col-span-4">
                <div className="text-sm font-medium text-on-surface">{m.name}</div>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">{m.category}</span>
              </div>
              <div className="col-span-1 text-sm font-bold text-on-surface text-right">{m.count}</div>
              <div className="col-span-2 text-sm font-medium text-on-surface text-right">{m.revenue}</div>
              <div className="col-span-2">
                <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revenue & Payments */}
      {tab === "revenue" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Payment Method Breakdown</h3>
            {/* Stacked bar */}
            <div className="h-8 rounded-full overflow-hidden flex mb-4">
              {paymentBreakdown.map((p) => (
                <div key={p.type} className={`${p.color} h-full`} style={{ width: `${p.pct}%` }} title={`${p.type}: ${p.pct}%`} />
              ))}
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {paymentBreakdown.map((p) => (
                <div key={p.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${p.color} shrink-0`} />
                  <div>
                    <div className="text-xs font-medium text-on-surface">{p.type} ({p.pct}%)</div>
                    <div className="text-[10px] text-on-surface-variant">{p.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily revenue */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Daily Revenue (This Week)</h3>
            <div className="space-y-2">
              {weeklyVolume.filter((d) => d.revenue > 0).map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant w-10 shrink-0 font-medium">{d.day}</span>
                  <div className="flex-1 h-6 bg-surface-container-high rounded-lg overflow-hidden">
                    <div className="h-full bg-secondary rounded-lg flex items-center justify-end pr-2" style={{ width: `${(d.revenue / 250000) * 100}%` }}>
                      <span className="text-[10px] font-bold text-on-secondary">₦{(d.revenue / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Export Revenue Report (PDF)
            </button>
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Export CSV</button>
          </div>
        </div>
      )}

      {/* Controlled Substances Log */}
      {tab === "controlled" && (
        <div className="space-y-4">
          <div className="bg-error-container/20 border border-error/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            <div>
              <div className="text-xs font-bold text-error">Controlled Substances Audit Trail</div>
              <div className="text-xs text-on-surface-variant mt-0.5">All controlled substance dispensing is logged per NAFDAC Schedule II–IV requirements. Records are immutable and retained for 5 years.</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Recent Controlled Dispensing</h3>
              <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Export Log
              </button>
            </div>
            {controlledLog.map((c, i) => (
              <div key={i} className="px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">{c.drug}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.status === "dispensed" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>{c.status.toUpperCase()}</span>
                    </div>
                    <div className="text-xs text-on-surface mt-0.5">Patient: {c.patient}</div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-on-surface-variant">
                      <span>Prescribed by: {c.doctor}</span>
                      <span>·</span>
                      <span>Dispensed by: {c.pharmacist}</span>
                      <span>·</span>
                      <span>{c.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
