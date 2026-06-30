"use client";

import { useState } from "react";

type TestStatus = "received" | "processing" | "completed" | "flagged";
type TestCategory = "hematology" | "chemistry" | "microbiology" | "immunology" | "urinalysis";

type TestOrder = {
  id: string; patient: string; avatar: string; avatarBg: string; doctor: string;
  testName: string; category: TestCategory; status: TestStatus;
  receivedAt: string; priority: "routine" | "urgent" | "stat";
  sampleType: string; sampleId: string;
  results: { param: string; value: string; unit: string; refRange: string; flag: "normal" | "high" | "low" | "critical" }[] | null;
};

const testOrders: TestOrder[] = [
  { id: "LAB-7001", patient: "Adaeze Okafor", avatar: "AO", avatarBg: "bg-primary", doctor: "Dr. Sarah Jenkins", testName: "Complete Blood Count (CBC)", category: "hematology", status: "received", receivedAt: "10:30 AM", priority: "routine", sampleType: "Whole Blood (EDTA)", sampleId: "SMP-44201", results: null },
  { id: "LAB-7002", patient: "Bayo Yusuf", avatar: "BY", avatarBg: "bg-secondary", doctor: "Dr. James Adeyemi", testName: "Fasting Blood Glucose", category: "chemistry", status: "received", receivedAt: "10:15 AM", priority: "urgent", sampleType: "Serum", sampleId: "SMP-44202", results: null },
  { id: "LAB-7003", patient: "Chioma Eze", avatar: "CE", avatarBg: "bg-tertiary", doctor: "Dr. Linda Baji", testName: "Lipid Panel", category: "chemistry", status: "processing", receivedAt: "09:45 AM", priority: "routine", sampleType: "Serum", sampleId: "SMP-44198", results: null },
  { id: "LAB-7004", patient: "Emeka Madu", avatar: "EM", avatarBg: "bg-primary", doctor: "Dr. Sarah Jenkins", testName: "Liver Function Test (LFT)", category: "chemistry", status: "processing", receivedAt: "09:20 AM", priority: "urgent", sampleType: "Serum", sampleId: "SMP-44195", results: null },
  { id: "LAB-7005", patient: "Fatima Bello", avatar: "FB", avatarBg: "bg-secondary", doctor: "Dr. James Adeyemi", testName: "Urinalysis", category: "urinalysis", status: "completed", receivedAt: "08:50 AM", priority: "routine", sampleType: "Urine (Midstream)", sampleId: "SMP-44190", results: [
    { param: "Color", value: "Yellow", unit: "", refRange: "Yellow", flag: "normal" },
    { param: "pH", value: "6.0", unit: "", refRange: "4.5–8.0", flag: "normal" },
    { param: "Specific Gravity", value: "1.025", unit: "", refRange: "1.005–1.030", flag: "normal" },
    { param: "Protein", value: "Negative", unit: "", refRange: "Negative", flag: "normal" },
    { param: "Glucose", value: "Negative", unit: "", refRange: "Negative", flag: "normal" },
    { param: "WBC", value: "2-4", unit: "/hpf", refRange: "0–5", flag: "normal" },
  ]},
  { id: "LAB-7006", patient: "Grace Okwu", avatar: "GO", avatarBg: "bg-tertiary", doctor: "Dr. Linda Baji", testName: "Thyroid Function Panel", category: "immunology", status: "completed", receivedAt: "08:30 AM", priority: "routine", sampleType: "Serum", sampleId: "SMP-44187", results: [
    { param: "TSH", value: "5.8", unit: "mIU/L", refRange: "0.4–4.0", flag: "high" },
    { param: "Free T4", value: "0.7", unit: "ng/dL", refRange: "0.8–1.8", flag: "low" },
    { param: "Free T3", value: "2.1", unit: "pg/mL", refRange: "2.3–4.2", flag: "low" },
  ]},
  { id: "LAB-7007", patient: "Ibrahim Musa", avatar: "IM", avatarBg: "bg-primary", doctor: "Dr. Sarah Jenkins", testName: "Blood Culture", category: "microbiology", status: "flagged", receivedAt: "Yesterday", priority: "stat", sampleType: "Whole Blood", sampleId: "SMP-44180", results: [
    { param: "Organism", value: "Staphylococcus aureus", unit: "", refRange: "No growth", flag: "critical" },
    { param: "Colony Count", value: ">100,000 CFU/mL", unit: "", refRange: "<1,000 CFU/mL", flag: "critical" },
    { param: "Gram Stain", value: "Gram +ve cocci in clusters", unit: "", refRange: "No organisms", flag: "critical" },
  ]},
  { id: "LAB-7008", patient: "Kola Ajayi", avatar: "KA", avatarBg: "bg-secondary", doctor: "Dr. James Adeyemi", testName: "HbA1c", category: "chemistry", status: "completed", receivedAt: "Yesterday", priority: "routine", sampleType: "Whole Blood (EDTA)", sampleId: "SMP-44175", results: [
    { param: "HbA1c", value: "8.2", unit: "%", refRange: "< 5.7", flag: "high" },
    { param: "Estimated Avg. Glucose", value: "189", unit: "mg/dL", refRange: "< 117", flag: "high" },
  ]},
];

type Filter = "all" | TestStatus;
type View = "pipeline" | "list";

export default function LabTestsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("pipeline");
  const [selected, setSelected] = useState<TestOrder | null>(null);
  const [orders, setOrders] = useState(testOrders);
  const [showEntryForm, setShowEntryForm] = useState(false);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const statusStyle = (s: TestStatus) => ({ received: "bg-primary-fixed text-primary", processing: "bg-tertiary-fixed/30 text-tertiary", completed: "bg-secondary-container/50 text-secondary", flagged: "bg-error-container/50 text-error" }[s]);
  const statusLabel = (s: TestStatus) => s.charAt(0).toUpperCase() + s.slice(1);
  const priorityStyle = (p: string) => ({ routine: "bg-surface-container-high text-on-surface-variant", urgent: "bg-tertiary-fixed/30 text-tertiary", stat: "bg-error text-on-error" }[p] || "");
  const flagStyle = (f: string) => ({ normal: "text-secondary", high: "text-error font-bold", low: "text-tertiary font-bold", critical: "text-error font-bold bg-error-container/20" }[f] || "");
  const catLabel = (c: TestCategory) => ({ hematology: "Hematology", chemistry: "Chemistry", microbiology: "Microbiology", immunology: "Immunology", urinalysis: "Urinalysis" }[c]);

  const counts = { received: orders.filter((o) => o.status === "received").length, processing: orders.filter((o) => o.status === "processing").length, completed: orders.filter((o) => o.status === "completed").length, flagged: orders.filter((o) => o.status === "flagged").length };

  const advanceStatus = (id: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const next: Record<TestStatus, TestStatus> = { received: "processing", processing: "completed", completed: "completed", flagged: "flagged" };
      return { ...o, status: next[o.status] };
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Test Management</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Track samples, process tests, and deliver results</p>
        </div>
        <div className="flex gap-2 self-start">
          <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5">
            <button onClick={() => setView("pipeline")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === "pipeline" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>Pipeline</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === "list" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>List</button>
          </div>
        </div>
      </div>

      {/* Pipeline stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {([
          { key: "received" as Filter, label: "Samples Received", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>, color: "text-primary bg-primary-fixed" },
          { key: "processing" as Filter, label: "In Processing", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
          { key: "completed" as Filter, label: "Completed", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-secondary bg-secondary-container/30" },
          { key: "flagged" as Filter, label: "Flagged / Critical", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>, color: "text-error bg-error-container/50" },
        ]).map((s) => (
          <button key={s.key} onClick={() => setFilter(s.key === filter ? "all" : s.key)} className={`text-left bg-surface-container-lowest border rounded-xl p-4 hover:shadow-sm transition-all ${s.key === filter ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <div className="text-xl font-bold text-on-surface">{counts[s.key]}</div>
                <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">{s.label}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Pipeline view */}
      {view === "pipeline" && (
        <div className="grid lg:grid-cols-4 gap-4">
          {(["received", "processing", "completed", "flagged"] as TestStatus[]).map((status) => {
            const items = orders.filter((o) => o.status === status);
            const colColors = { received: "border-primary", processing: "border-tertiary", completed: "border-secondary", flagged: "border-error" };
            return (
              <div key={status} className="space-y-2">
                <div className={`flex items-center gap-2 pb-2 border-b-2 ${colColors[status]}`}>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyle(status)}`}>{statusLabel(status)}</span>
                  <span className="text-xs text-on-surface-variant font-semibold">{items.length}</span>
                </div>
                {items.map((order) => (
                  <button key={order.id} onClick={() => { setSelected(order); setShowEntryForm(false); }} className={`w-full text-left bg-surface-container-lowest border rounded-lg p-3 hover:shadow-sm transition-all ${selected?.id === order.id ? "border-primary ring-1 ring-primary" : order.priority === "stat" ? "border-error" : "border-outline-variant"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 rounded-full ${order.avatarBg} flex items-center justify-center text-white text-[8px] font-bold`}>{order.avatar}</div>
                      <span className="text-xs font-bold text-on-surface truncate">{order.patient}</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant truncate">{order.testName}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase ${priorityStyle(order.priority)}`}>{order.priority}</span>
                      <span className="text-[9px] text-outline">{order.receivedAt}</span>
                    </div>
                  </button>
                ))}
                {items.length === 0 && <div className="text-center py-6 text-[10px] text-outline">No tests</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-7 px-4 py-2.5 border-b border-outline-variant bg-surface-container-low">
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">Patient / Test</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Category</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Sample ID</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Priority</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Time</span>
          </div>
          {filtered.map((order, i) => (
            <div key={order.id} onClick={() => { setSelected(order); setShowEntryForm(false); }} className={`grid sm:grid-cols-7 gap-1 sm:gap-0 items-center px-4 py-3 cursor-pointer hover:bg-surface-container-low transition-colors ${i < filtered.length - 1 ? "border-b border-outline-variant" : ""} ${selected?.id === order.id ? "bg-primary-fixed/20" : ""}`}>
              <div className="col-span-2 flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${order.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{order.avatar}</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-on-surface truncate">{order.patient}</div>
                  <div className="text-[10px] text-on-surface-variant truncate">{order.testName}</div>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant">{catLabel(order.category)}</span>
              <span className="text-xs font-mono text-on-surface-variant">{order.sampleId}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit uppercase ${priorityStyle(order.priority)}`}>{order.priority}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit ${statusStyle(order.status)}`}>{statusLabel(order.status)}</span>
              <span className="text-xs text-on-surface-variant">{order.receivedAt}</span>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel (shows below on narrow, could be modal on desktop) */}
      {selected && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 text-on-primary">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-semibold opacity-80">{selected.id} • {selected.sampleId}</div>
                <div className="text-lg font-bold mt-0.5">{selected.testName}</div>
                <div className="text-xs opacity-80 mt-0.5">{selected.patient} • Ordered by {selected.doctor}</div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{statusLabel(selected.status)}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase">{selected.priority}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{catLabel(selected.category)}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
            <div className="flex items-center gap-1">
              {["Received", "Processing", "Completed"].map((step, i) => {
                const idx = { received: 0, processing: 1, completed: 2, flagged: 2 }[selected.status];
                const done = i <= idx;
                return (
                  <div key={step} className="flex items-center gap-1 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${done ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-outline"}`}>
                      {done ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> : i + 1}
                    </div>
                    {i < 2 && <div className={`flex-1 h-0.5 ${i < idx ? "bg-secondary" : "bg-surface-container-high"}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample info */}
          <div className="px-4 py-3 border-b border-outline-variant grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between"><span className="text-on-surface-variant">Sample Type</span><span className="font-medium text-on-surface">{selected.sampleType}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Received</span><span className="font-medium text-on-surface">{selected.receivedAt}</span></div>
          </div>

          {/* Results */}
          {selected.results && (
            <div className="px-4 py-3 border-b border-outline-variant">
              <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Test Results</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="text-left py-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Parameter</th>
                      <th className="text-left py-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Result</th>
                      <th className="text-left py-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unit</th>
                      <th className="text-left py-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Reference</th>
                      <th className="text-left py-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.results.map((r, i) => (
                      <tr key={i} className={`border-b border-outline-variant last:border-0 ${r.flag === "critical" ? "bg-error-container/10" : ""}`}>
                        <td className="py-2 text-on-surface font-medium">{r.param}</td>
                        <td className={`py-2 ${flagStyle(r.flag)}`}>{r.value}</td>
                        <td className="py-2 text-on-surface-variant">{r.unit}</td>
                        <td className="py-2 text-on-surface-variant">{r.refRange}</td>
                        <td className="py-2">
                          {r.flag !== "normal" && (
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${r.flag === "critical" ? "bg-error text-on-error" : r.flag === "high" ? "bg-error-container/50 text-error" : "bg-tertiary-fixed/30 text-tertiary"}`}>{r.flag}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selected.status === "flagged" && (
                <div className="mt-3 p-2.5 bg-error-container/20 rounded-lg flex items-start gap-2">
                  <svg className="w-4 h-4 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                  <div>
                    <span className="text-xs text-error font-bold">Critical Values Detected</span>
                    <p className="text-[10px] text-error mt-0.5">Positive blood culture with Staphylococcus aureus. Immediate notification sent to Dr. Sarah Jenkins. Antibiotic sensitivity testing initiated.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Result entry form */}
          {!selected.results && showEntryForm && (
            <div className="px-4 py-3 border-b border-outline-variant">
              <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Enter Results</h4>
              <div className="space-y-2">
                {(selected.testName.includes("CBC") ? ["WBC", "RBC", "Hemoglobin", "Hematocrit", "Platelets", "MCV", "MCH"] : selected.testName.includes("Glucose") ? ["Fasting Glucose"] : ["Total Cholesterol", "LDL", "HDL", "Triglycerides"]).map((param) => (
                  <div key={param} className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-xs text-on-surface font-medium">{param}</label>
                    <input type="text" placeholder="Value" className="px-2 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    <input type="text" placeholder="Unit" className="px-2 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 p-2.5 bg-primary-fixed/30 rounded-lg">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                <span className="text-[10px] text-primary font-medium">AI QC will auto-flag abnormal values against reference ranges</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-all">Submit & Complete</button>
                <button onClick={() => setShowEntryForm(false)} className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant transition-all">Cancel</button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-4 flex flex-wrap gap-2">
            {selected.status === "received" && (
              <button onClick={() => { advanceStatus(selected.id); setSelected({ ...selected, status: "processing" }); }} className="px-5 py-2 rounded-lg bg-tertiary text-on-tertiary text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
                Start Processing
              </button>
            )}
            {selected.status === "processing" && !showEntryForm && (
              <button onClick={() => setShowEntryForm(true)} className="px-5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>
                Enter Results
              </button>
            )}
            {(selected.status === "completed" || selected.status === "flagged") && (
              <>
                <button className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                  Send to Doctor
                </button>
                <button className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:text-primary hover:border-primary transition-all">Print Report</button>
              </>
            )}
            {selected.status === "flagged" && (
              <button className="px-4 py-2 rounded-lg bg-error text-on-error text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
                Alert Doctor Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
