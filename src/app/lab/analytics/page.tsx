"use client";

import { useState } from "react";

type Period = "today" | "week" | "month";

const stats = {
  today: { tests: 28, avgTAT: "2.4 hrs", rejectionRate: "3.6%", qcPass: "97%" },
  week: { tests: 186, avgTAT: "2.8 hrs", rejectionRate: "4.1%", qcPass: "96%" },
  month: { tests: 742, avgTAT: "2.6 hrs", rejectionRate: "3.8%", qcPass: "97%" },
};

const testVolume = [
  { type: "Chemistry", count: 234, pct: 100, color: "bg-primary" },
  { type: "Hematology", count: 189, pct: 81, color: "bg-secondary" },
  { type: "Microbiology", count: 98, pct: 42, color: "bg-tertiary" },
  { type: "Immunology", count: 76, pct: 32, color: "bg-primary/60" },
  { type: "Endocrine", count: 62, pct: 26, color: "bg-secondary/60" },
  { type: "Tumor Markers", count: 45, pct: 19, color: "bg-outline" },
  { type: "Cardiac", count: 38, pct: 16, color: "bg-error/60" },
];

const turnaroundByType = [
  { type: "STAT", target: "1 hr", actual: "0.8 hrs", status: "met", pct: 80 },
  { type: "Urgent", target: "2 hrs", actual: "1.9 hrs", status: "met", pct: 95 },
  { type: "Routine", target: "4 hrs", actual: "3.2 hrs", status: "met", pct: 80 },
  { type: "Culture", target: "48 hrs", actual: "42 hrs", status: "met", pct: 88 },
  { type: "Histology", target: "72 hrs", actual: "68 hrs", status: "met", pct: 94 },
];

const rejectionReasons = [
  { reason: "Hemolyzed specimen", count: 12, pct: 42 },
  { reason: "Insufficient volume", count: 8, pct: 28 },
  { reason: "Clotted sample", count: 4, pct: 14 },
  { reason: "Wrong tube/container", count: 2, pct: 7 },
  { reason: "Patient not fasting", count: 2, pct: 7 },
  { reason: "Labelling error", count: 1, pct: 4 },
];

const qcResults = [
  { analyzer: "Beckman AU5800 (Chemistry)", level: "Normal", result: "Pass", lastRun: "June 27, 10:00 AM", cv: "1.8%", status: "pass" },
  { analyzer: "Beckman AU5800 (Chemistry)", level: "Abnormal", result: "Pass", lastRun: "June 27, 10:00 AM", cv: "2.1%", status: "pass" },
  { analyzer: "Sysmex XN-1000 (Hematology)", level: "Normal", result: "Pass", lastRun: "June 27, 09:30 AM", cv: "1.5%", status: "pass" },
  { analyzer: "Sysmex XN-1000 (Hematology)", level: "Abnormal", result: "Pass", lastRun: "June 27, 09:30 AM", cv: "2.4%", status: "pass" },
  { analyzer: "Abbott i2000SR (Immunoassay)", level: "Normal", result: "Warning", lastRun: "June 27, 09:00 AM", cv: "4.2%", status: "warning" },
  { analyzer: "Abbott i2000SR (Immunoassay)", level: "Abnormal", result: "Pass", lastRun: "June 27, 09:00 AM", cv: "3.1%", status: "pass" },
  { analyzer: "BioMérieux VITEK 2 (Micro)", level: "QC Organism", result: "Pass", lastRun: "June 27, 08:00 AM", cv: "—", status: "pass" },
];

const equipment = [
  { name: "Beckman AU5800", type: "Chemistry Analyzer", calibration: "June 25, 2026", nextCal: "July 25, 2026", status: "current", uptime: 99.2 },
  { name: "Sysmex XN-1000", type: "Hematology Analyzer", calibration: "June 20, 2026", nextCal: "July 20, 2026", status: "current", uptime: 98.8 },
  { name: "Abbott i2000SR", type: "Immunoassay System", calibration: "June 22, 2026", nextCal: "July 22, 2026", status: "current", uptime: 97.5 },
  { name: "BioMérieux VITEK 2", type: "Microbiology ID/AST", calibration: "June 15, 2026", nextCal: "July 15, 2026", status: "current", uptime: 99.0 },
  { name: "Roche cobas e411", type: "Cardiac Markers", calibration: "June 10, 2026", nextCal: "July 10, 2026", status: "due-soon", uptime: 96.3 },
];

const techWorkload = [
  { name: "David Akinwale", tests: 312, avgPerDay: 14, speciality: "Chemistry, Cardiac", efficiency: 96 },
  { name: "Funmi Adebisi", tests: 278, avgPerDay: 13, speciality: "Hematology, Coagulation", efficiency: 94 },
  { name: "Grace Okonkwo", tests: 198, avgPerDay: 9, speciality: "Microbiology, Culture", efficiency: 92 },
  { name: "Samuel Eze", tests: 245, avgPerDay: 11, speciality: "Immunology, Endocrine", efficiency: 95 },
];

export default function LabAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("month");
  const [tab, setTab] = useState<"overview" | "quality" | "equipment" | "staff">("overview");

  const s = stats[period];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Analytics & Quality Control</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Performance metrics, QC monitoring, and compliance</p>
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
          { label: "Tests Processed", value: s.tests, color: "text-primary", bg: "bg-primary/10" },
          { label: "Avg Turnaround", value: s.avgTAT, color: "text-secondary", bg: "bg-secondary-container/20" },
          { label: "Rejection Rate", value: s.rejectionRate, color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
          { label: "QC Pass Rate", value: s.qcPass, color: "text-secondary", bg: "bg-secondary-container/20" },
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
          { key: "quality" as const, label: "Quality Control" },
          { key: "equipment" as const, label: "Equipment" },
          { key: "staff" as const, label: "Staff Workload" },
        ]).map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Test volume */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-4">Test Volume by Department</h3>
              <div className="space-y-3">
                {testVolume.map((t) => (
                  <div key={t.type} className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant w-24 shrink-0">{t.type}</span>
                    <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                      <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-on-surface w-8 text-right shrink-0">{t.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Turnaround times */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-4">Turnaround Time Performance</h3>
              <div className="space-y-3">
                {turnaroundByType.map((t) => (
                  <div key={t.type} className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant w-16 shrink-0 font-medium">{t.type}</span>
                    <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.status === "met" ? "bg-secondary" : "bg-error"}`} style={{ width: `${t.pct}%` }} />
                    </div>
                    <div className="text-right shrink-0 w-28">
                      <span className="text-xs font-bold text-on-surface">{t.actual}</span>
                      <span className="text-[10px] text-on-surface-variant"> / {t.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rejection reasons */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Sample Rejection Reasons (This Month)</h3>
            <div className="space-y-2">
              {rejectionReasons.map((r) => (
                <div key={r.reason} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface w-40 shrink-0">{r.reason}</span>
                  <div className="flex-1 h-4 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-error/60 rounded-full flex items-center pl-2" style={{ width: `${r.pct}%`, minWidth: "40px" }}>
                      <span className="text-[9px] font-bold text-on-error">{r.pct}%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-on-surface w-6 text-right shrink-0">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quality Control */}
      {tab === "quality" && (
        <div className="space-y-4">
          <div className="bg-secondary-container/20 border border-secondary/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            <div>
              <div className="text-sm font-bold text-secondary">QC Status: All analyzers operational</div>
              <div className="text-xs text-on-surface-variant mt-0.5">1 warning on Abbott i2000SR (Normal level) — CV above threshold. Recalibration recommended.</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Today&apos;s QC Results</h3>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all">Run QC</button>
            </div>
            {qcResults.map((qc, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${qc.status === "pass" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                  {qc.status === "pass" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-on-surface">{qc.analyzer}</div>
                  <div className="text-xs text-on-surface-variant">Level: {qc.level} · CV: {qc.cv} · {qc.lastRun}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${qc.status === "pass" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                  {qc.result.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment */}
      {tab === "equipment" && (
        <div className="space-y-3">
          {equipment.map((eq) => (
            <div key={eq.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">{eq.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${eq.status === "current" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                      {eq.status === "current" ? "CALIBRATED" : "DUE SOON"}
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{eq.type}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                    <span>Last Cal: {eq.calibration}</span>
                    <span>·</span>
                    <span>Next Cal: {eq.nextCal}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-secondary">{eq.uptime}%</div>
                  <div className="text-[10px] text-on-surface-variant">Uptime</div>
                </div>
              </div>
              <div className="mt-3 h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${eq.uptime}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Staff Workload */}
      {tab === "staff" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Technician Performance (This Month)</h3>
            </div>
            {techWorkload.map((tech) => (
              <div key={tech.name} className="px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {tech.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">{tech.name}</div>
                      <div className="text-xs text-on-surface-variant">{tech.speciality}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-primary">{tech.tests}</div>
                    <div className="text-[10px] text-on-surface-variant">tests processed</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="bg-primary/5 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-primary">{tech.avgPerDay}</div>
                    <div className="text-[10px] text-on-surface-variant">Avg/Day</div>
                  </div>
                  <div className="bg-secondary-container/20 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-secondary">{tech.efficiency}%</div>
                    <div className="text-[10px] text-on-surface-variant">Efficiency</div>
                  </div>
                  <div className="bg-surface-container-high rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-on-surface">{tech.tests}</div>
                    <div className="text-[10px] text-on-surface-variant">Total</div>
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
