"use client";

import { useState } from "react";

type View = "queue" | "entry" | "validated";
type EntryStep = "select" | "input" | "review";

interface TestOrder {
  id: string;
  patient: string;
  age: number;
  sex: string;
  doctor: string;
  testName: string;
  testType: string;
  sampleId: string;
  sampleType: string;
  collectedAt: string;
  priority: "routine" | "urgent" | "stat";
  status: "pending-entry" | "entered" | "validated" | "released";
}

interface ResultParam {
  name: string;
  value: string;
  unit: string;
  refLow: number;
  refHigh: number;
  flag: "normal" | "high" | "low" | "critical-high" | "critical-low" | "";
}

const testOrders: TestOrder[] = [
  { id: "LAB-2026-4521", patient: "Adebayo Oluwatobi", age: 36, sex: "M", doctor: "Dr. Sarah Jenkins", testName: "HbA1c", testType: "Clinical Chemistry", sampleId: "SMP-8841", sampleType: "Whole Blood (EDTA)", collectedAt: "Today, 8:15 AM", priority: "routine", status: "pending-entry" },
  { id: "LAB-2026-4522", patient: "Emeka Nwosu", age: 62, sex: "M", doctor: "Dr. Sarah Jenkins", testName: "Comprehensive Metabolic Panel", testType: "Clinical Chemistry", sampleId: "SMP-8842", sampleType: "Serum", collectedAt: "Today, 8:30 AM", priority: "urgent", status: "pending-entry" },
  { id: "LAB-2026-4523", patient: "Chioma Okafor", age: 28, sex: "F", doctor: "Dr. Sarah Jenkins", testName: "Full Blood Count", testType: "Haematology", sampleId: "SMP-8843", sampleType: "Whole Blood (EDTA)", collectedAt: "Today, 9:00 AM", priority: "routine", status: "pending-entry" },
  { id: "LAB-2026-4524", patient: "Fatima Bello", age: 45, sex: "F", doctor: "Dr. Sarah Jenkins", testName: "ESR + CRP", testType: "Haematology", sampleId: "SMP-8844", sampleType: "Whole Blood (EDTA)", collectedAt: "Today, 9:15 AM", priority: "routine", status: "pending-entry" },
  { id: "LAB-2026-4525", patient: "Oluwaseun Adeyemi", age: 41, sex: "M", doctor: "Dr. Sarah Jenkins", testName: "H. Pylori Antibody", testType: "Serology", sampleId: "SMP-8845", sampleType: "Serum", collectedAt: "Today, 9:45 AM", priority: "routine", status: "pending-entry" },
  { id: "LAB-2026-4526", patient: "Grace Okonkwo", age: 30, sex: "F", doctor: "Dr. Michael Obi", testName: "Antenatal Panel", testType: "Multiple", sampleId: "SMP-8846", sampleType: "Whole Blood + Urine", collectedAt: "Today, 10:00 AM", priority: "urgent", status: "pending-entry" },
];

const validatedResults: { id: string; patient: string; testName: string; validatedBy: string; validatedAt: string; abnormals: number; released: boolean }[] = [
  { id: "LAB-2026-4510", patient: "Ibrahim Musa", testName: "Lipid Panel", validatedBy: "Dr. Akinwale (Pathologist)", validatedAt: "Today, 7:45 AM", abnormals: 1, released: true },
  { id: "LAB-2026-4508", patient: "Blessing Udo", testName: "Thyroid Function", validatedBy: "Dr. Akinwale (Pathologist)", validatedAt: "Yesterday, 4:30 PM", abnormals: 0, released: true },
  { id: "LAB-2026-4505", patient: "Kalu Eze", testName: "Renal Function", validatedBy: "Dr. Akinwale (Pathologist)", validatedAt: "Yesterday, 2:15 PM", abnormals: 2, released: true },
  { id: "LAB-2026-4501", patient: "Ngozi Ibe", testName: "Liver Function", validatedBy: "Dr. Akinwale (Pathologist)", validatedAt: "Yesterday, 11:00 AM", abnormals: 0, released: true },
];

const cmpParams: ResultParam[] = [
  { name: "Glucose (Fasting)", value: "", unit: "mg/dL", refLow: 70, refHigh: 100, flag: "" },
  { name: "BUN", value: "", unit: "mg/dL", refLow: 7, refHigh: 20, flag: "" },
  { name: "Creatinine", value: "", unit: "mg/dL", refLow: 0.7, refHigh: 1.3, flag: "" },
  { name: "eGFR", value: "", unit: "mL/min", refLow: 60, refHigh: 120, flag: "" },
  { name: "Sodium", value: "", unit: "mEq/L", refLow: 136, refHigh: 145, flag: "" },
  { name: "Potassium", value: "", unit: "mEq/L", refLow: 3.5, refHigh: 5.0, flag: "" },
  { name: "Chloride", value: "", unit: "mEq/L", refLow: 98, refHigh: 106, flag: "" },
  { name: "CO2", value: "", unit: "mEq/L", refLow: 23, refHigh: 29, flag: "" },
  { name: "Calcium", value: "", unit: "mg/dL", refLow: 8.5, refHigh: 10.5, flag: "" },
  { name: "Total Protein", value: "", unit: "g/dL", refLow: 6.0, refHigh: 8.3, flag: "" },
  { name: "Albumin", value: "", unit: "g/dL", refLow: 3.5, refHigh: 5.5, flag: "" },
  { name: "Bilirubin (Total)", value: "", unit: "mg/dL", refLow: 0.1, refHigh: 1.2, flag: "" },
  { name: "ALP", value: "", unit: "U/L", refLow: 44, refHigh: 147, flag: "" },
  { name: "ALT", value: "", unit: "U/L", refLow: 7, refHigh: 56, flag: "" },
  { name: "AST", value: "", unit: "U/L", refLow: 10, refHigh: 40, flag: "" },
];

const priorityColors: Record<string, string> = {
  routine: "bg-surface-container-high text-on-surface-variant",
  urgent: "bg-tertiary-fixed/30 text-tertiary",
  stat: "bg-error-container/50 text-error",
};

export default function ResultsPage() {
  const [view, setView] = useState<View>("queue");
  const [selectedOrder, setSelectedOrder] = useState<TestOrder | null>(null);
  const [entryStep, setEntryStep] = useState<EntryStep>("select");
  const [params, setParams] = useState<ResultParam[]>(cmpParams);
  const [techNotes, setTechNotes] = useState("");

  const startEntry = (order: TestOrder) => {
    setSelectedOrder(order);
    setParams(cmpParams.map((p) => ({ ...p, value: "", flag: "" })));
    setTechNotes("");
    setEntryStep("input");
    setView("entry");
  };

  const updateParam = (idx: number, val: string) => {
    setParams((prev) => {
      const updated = [...prev];
      const num = parseFloat(val);
      let flag: ResultParam["flag"] = "";
      if (val && !isNaN(num)) {
        const p = updated[idx];
        if (num < p.refLow * 0.5) flag = "critical-low";
        else if (num < p.refLow) flag = "low";
        else if (num > p.refHigh * 1.5) flag = "critical-high";
        else if (num > p.refHigh) flag = "high";
        else flag = "normal";
      }
      updated[idx] = { ...updated[idx], value: val, flag };
      return updated;
    });
  };

  const flagColors: Record<string, string> = {
    normal: "text-secondary",
    high: "text-tertiary",
    low: "text-tertiary",
    "critical-high": "text-error font-bold",
    "critical-low": "text-error font-bold",
  };

  const flagLabels: Record<string, string> = {
    normal: "",
    high: "H",
    low: "L",
    "critical-high": "HH",
    "critical-low": "LL",
  };

  const abnormalCount = params.filter((p) => p.flag && p.flag !== "normal").length;
  const criticalCount = params.filter((p) => p.flag === "critical-high" || p.flag === "critical-low").length;
  const filledCount = params.filter((p) => p.value !== "").length;

  const stats = {
    pending: testOrders.filter((o) => o.status === "pending-entry").length,
    urgent: testOrders.filter((o) => o.priority === "urgent" || o.priority === "stat").length,
    validated: validatedResults.length,
    released: validatedResults.filter((r) => r.released).length,
  };

  // Entry View
  if (view === "entry" && selectedOrder) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <button onClick={() => { setView("queue"); setSelectedOrder(null); }} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          Back to Queue
        </button>

        {/* Order Header */}
        <div className="bg-primary rounded-xl p-5 text-on-primary">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">{selectedOrder.testName}</h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-on-primary/20`}>{selectedOrder.priority.toUpperCase()}</span>
              </div>
              <div className="text-sm text-on-primary/70 mt-0.5">{selectedOrder.id} · {selectedOrder.testType}</div>
            </div>
            <div className="text-right text-sm text-on-primary/70">
              <div><span className="text-on-primary/50">Patient:</span> {selectedOrder.patient} ({selectedOrder.age}{selectedOrder.sex})</div>
              <div><span className="text-on-primary/50">Doctor:</span> {selectedOrder.doctor}</div>
              <div><span className="text-on-primary/50">Sample:</span> {selectedOrder.sampleId} · {selectedOrder.sampleType}</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {(["input", "review"] as EntryStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${entryStep === s ? "bg-primary text-on-primary" : i === 0 && entryStep === "review" ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-on-surface-variant"}`}>
                {i === 0 && entryStep === "review" ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-semibold capitalize ${entryStep === s ? "text-primary" : "text-on-surface-variant"}`}>{s === "input" ? "Enter Results" : "Review & Validate"}</span>
              {i < 1 && <div className="flex-1 h-px bg-outline-variant" />}
            </div>
          ))}
        </div>

        {/* Input Step */}
        {entryStep === "input" && (
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface">Test Parameters ({filledCount}/{params.length} entered)</h3>
                {abnormalCount > 0 && (
                  <span className="text-xs font-bold text-error">{abnormalCount} abnormal{criticalCount > 0 ? ` (${criticalCount} critical)` : ""}</span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low/50">
                      <th className="text-left px-5 py-2 text-xs font-bold text-on-surface-variant">Parameter</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Result</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Unit</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Reference Range</th>
                      <th className="text-center px-3 py-2 text-xs font-bold text-on-surface-variant">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((p, i) => (
                      <tr key={p.name} className={`border-b border-outline-variant last:border-0 ${p.flag === "critical-high" || p.flag === "critical-low" ? "bg-error-container/10" : ""}`}>
                        <td className="px-5 py-2 font-medium text-on-surface">{p.name}</td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            step="any"
                            value={p.value}
                            onChange={(e) => updateParam(i, e.target.value)}
                            className={`w-24 px-2 py-1.5 rounded-lg border text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary ${p.flag === "critical-high" || p.flag === "critical-low" ? "border-error bg-error-container/10 text-error font-bold" : p.flag === "high" || p.flag === "low" ? "border-tertiary bg-tertiary-fixed/10 text-tertiary" : "border-outline-variant bg-surface text-on-surface"}`}
                            placeholder="—"
                          />
                        </td>
                        <td className="px-3 py-2 text-on-surface-variant">{p.unit}</td>
                        <td className="px-3 py-2 text-on-surface-variant">{p.refLow} – {p.refHigh}</td>
                        <td className="px-3 py-2 text-center">
                          {p.flag && p.flag !== "normal" && (
                            <span className={`text-xs font-bold ${flagColors[p.flag] || ""}`}>{flagLabels[p.flag]}</span>
                          )}
                          {p.flag === "normal" && <span className="text-xs text-secondary">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Critical Alert */}
            {criticalCount > 0 && (
              <div className="bg-error-container/20 border border-error/30 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                <div>
                  <div className="text-sm font-bold text-error">Critical Values Detected</div>
                  <div className="text-xs text-error/80 mt-0.5">
                    {params.filter((p) => p.flag === "critical-high" || p.flag === "critical-low").map((p) => `${p.name}: ${p.value} ${p.unit}`).join(", ")}
                    . Ordering physician must be notified immediately per protocol.
                  </div>
                </div>
              </div>
            )}

            {/* Tech Notes */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-2">Technician Notes</h3>
              <textarea value={techNotes} onChange={(e) => setTechNotes(e.target.value)} rows={3} placeholder="Add any observations, sample quality issues, or comments..." className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setEntryStep("review")} disabled={filledCount === 0} className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Proceed to Review
              </button>
              <button className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Save as Draft</button>
            </div>
          </div>
        )}

        {/* Review Step */}
        {entryStep === "review" && (
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-outline-variant">
                <h3 className="text-sm font-bold text-on-surface">Results Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low/50">
                      <th className="text-left px-5 py-2 text-xs font-bold text-on-surface-variant">Parameter</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Result</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Unit</th>
                      <th className="text-left px-3 py-2 text-xs font-bold text-on-surface-variant">Reference</th>
                      <th className="text-center px-3 py-2 text-xs font-bold text-on-surface-variant">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.filter((p) => p.value !== "").map((p) => (
                      <tr key={p.name} className={`border-b border-outline-variant last:border-0 ${p.flag === "critical-high" || p.flag === "critical-low" ? "bg-error-container/10" : ""}`}>
                        <td className="px-5 py-2 font-medium text-on-surface">{p.name}</td>
                        <td className={`px-3 py-2 font-bold ${flagColors[p.flag] || "text-on-surface"}`}>{p.value}</td>
                        <td className="px-3 py-2 text-on-surface-variant">{p.unit}</td>
                        <td className="px-3 py-2 text-on-surface-variant">{p.refLow} – {p.refHigh}</td>
                        <td className="px-3 py-2 text-center">
                          {p.flag === "normal" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary">NORMAL</span>}
                          {(p.flag === "high" || p.flag === "low") && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-tertiary-fixed/30 text-tertiary">{p.flag.toUpperCase()}</span>}
                          {(p.flag === "critical-high" || p.flag === "critical-low") && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-error-container/50 text-error">CRITICAL</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {techNotes && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <h4 className="text-xs font-bold text-on-surface-variant uppercase">Technician Notes</h4>
                <p className="text-sm text-on-surface mt-1">{techNotes}</p>
              </div>
            )}

            {/* Pathologist Sign-off */}
            <div className="bg-surface-container-lowest border border-primary/30 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Pathologist Validation</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">DA</div>
                <div>
                  <div className="text-sm font-semibold text-on-surface">Dr. Akinwale</div>
                  <div className="text-xs text-on-surface-variant">Consultant Pathologist · On Duty</div>
                </div>
              </div>
              <textarea rows={2} placeholder="Pathologist interpretation or comments (optional)..." className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <div className="flex gap-3">
                <button onClick={() => { setView("queue"); setSelectedOrder(null); }} className="px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  Validate & Release
                </button>
                <button onClick={() => setEntryStep("input")} className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Edit Results</button>
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium text-error hover:bg-error-container/20 transition-all">Reject & Rerun</button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              Validated results are auto-released to the patient portal and ordering physician. Critical values trigger immediate SMS/push notification.
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Results Entry</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Enter, validate, and release lab test results</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending Entry", value: stats.pending, color: "text-primary" },
          { label: "Urgent / STAT", value: stats.urgent, color: "text-error" },
          { label: "Validated Today", value: stats.validated, color: "text-secondary" },
          { label: "Released", value: stats.released, color: "text-tertiary" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "queue" as View, label: `Pending (${stats.pending})` },
          { key: "validated" as View, label: `Validated (${stats.validated})` },
        ]).map((t) => (
          <button key={t.key} onClick={() => setView(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Queue */}
      {view === "queue" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant">
            <h3 className="text-sm font-bold text-on-surface">Samples Awaiting Result Entry</h3>
          </div>
          {testOrders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${o.priority === "urgent" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-primary/10 text-primary"}`}>
                {o.patient.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-on-surface">{o.patient}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityColors[o.priority]}`}>{o.priority.toUpperCase()}</span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">{o.testName} · {o.testType}</div>
                <div className="text-xs text-on-surface-variant">Sample: {o.sampleId} · {o.sampleType} · Collected: {o.collectedAt}</div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-xs text-on-surface-variant">{o.doctor}</div>
              </div>
              <button onClick={() => startEntry(o)} className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all shrink-0">
                Enter Results
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Validated */}
      {view === "validated" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant">
            <h3 className="text-sm font-bold text-on-surface">Recently Validated Results</h3>
          </div>
          {validatedResults.map((r) => (
            <div key={r.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-on-surface">{r.patient}</span>
                  <span className="text-xs text-on-surface-variant">— {r.testName}</span>
                </div>
                <div className="text-xs text-on-surface-variant">{r.validatedBy} · {r.validatedAt}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {r.abnormals > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-tertiary-fixed/30 text-tertiary">{r.abnormals} ABNORMAL</span>}
                {r.released && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary">RELEASED</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
