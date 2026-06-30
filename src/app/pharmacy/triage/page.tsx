"use client";

import { useState } from "react";

const prescriptions = [
  { id: "RX-4501", patient: "Adewale Okafor", age: 42, doctor: "Dr. Sarah Jenkins", submitted: "8 min ago", priority: "stat", status: "pending", drugs: [{ name: "Aspirin 300mg", qty: 1, type: "Tablet", freq: "STAT", route: "Oral" }, { name: "Clopidogrel 75mg", qty: 30, type: "Tablet", freq: "Once daily", route: "Oral" }, { name: "Atorvastatin 40mg", qty: 30, type: "Tablet", freq: "Once daily", route: "Oral" }], diagnosis: "Acute Coronary Syndrome", allergies: ["Penicillin"], interactions: [{ severity: "moderate", drugs: "Aspirin + Clopidogrel", note: "Increased bleeding risk. Monitor for signs of bleeding." }], insurance: "NHIS Active", aiFlag: "STAT priority — patient in acute cardiac event. Verify aspirin allergy status before dispensing." },
  { id: "RX-4502", patient: "Ngozi Eze", age: 35, doctor: "Dr. Adebayo Bakare", submitted: "20 min ago", priority: "urgent", status: "pending", drugs: [{ name: "Artemether/Lumefantrine 80/480mg", qty: 24, type: "Tablet", freq: "Twice daily x3 days", route: "Oral" }, { name: "Paracetamol 500mg", qty: 20, type: "Tablet", freq: "Every 6 hours PRN", route: "Oral" }], diagnosis: "Plasmodium falciparum Malaria", allergies: [], interactions: [], insurance: "NHIS Active", aiFlag: "Weight-based dosing confirmed for 65kg patient. Standard 3-day ACT regimen." },
  { id: "RX-4503", patient: "Fatima Bello", age: 55, doctor: "Dr. Sarah Jenkins", submitted: "45 min ago", priority: "routine", status: "in_review", drugs: [{ name: "Omeprazole 40mg", qty: 30, type: "Capsule", freq: "Once daily (before breakfast)", route: "Oral" }, { name: "Hyoscine Butylbromide 10mg", qty: 20, type: "Tablet", freq: "Three times daily PRN", route: "Oral" }], diagnosis: "Biliary Colic", allergies: ["Sulfonamides"], interactions: [], insurance: "Private - AXA Mansard", aiFlag: "Dose increased from 20mg to 40mg. Previous prescription was 20mg — confirm with prescriber." },
  { id: "RX-4504", patient: "Ibrahim Yusuf", age: 48, doctor: "Dr. Funke Adeyemi", submitted: "1 hr ago", priority: "routine", status: "pending", drugs: [{ name: "Diclofenac 50mg", qty: 20, type: "Tablet", freq: "Twice daily with food", route: "Oral" }, { name: "Omeprazole 20mg", qty: 20, type: "Capsule", freq: "Once daily", route: "Oral" }, { name: "Methocarbamol 500mg", qty: 30, type: "Tablet", freq: "Three times daily", route: "Oral" }], diagnosis: "Lumbar Radiculopathy", allergies: [], interactions: [{ severity: "low", drugs: "Diclofenac + Omeprazole", note: "Appropriate co-prescription — gastroprotection for NSAID use." }], insurance: "Self-pay", aiFlag: "NSAID with gastroprotection co-prescribed. Good practice. 2-week course appropriate." },
  { id: "RX-4505", patient: "Emeka Nwosu", age: 8, doctor: "Dr. Adebayo Bakare", submitted: "1.5 hrs ago", priority: "routine", status: "dispensed", drugs: [{ name: "Cetirizine 5mg", qty: 14, type: "Syrup (5ml)", freq: "Once daily", route: "Oral" }, { name: "Calamine Lotion", qty: 1, type: "Bottle (100ml)", freq: "Apply to affected area TDS", route: "Topical" }], diagnosis: "Viral Exanthem", allergies: ["Peanuts"], interactions: [], insurance: "NHIS Active", aiFlag: "Pediatric dose confirmed for 25kg child. Cetirizine syrup formulation selected." },
  { id: "RX-4506", patient: "Aisha Mohammed", age: 62, doctor: "Dr. Sarah Jenkins", submitted: "2 hrs ago", priority: "stat", status: "pending", drugs: [{ name: "Nifedipine 10mg", qty: 1, type: "Capsule (bite & swallow)", freq: "STAT", route: "Oral" }, { name: "Amlodipine 10mg", qty: 30, type: "Tablet", freq: "Once daily", route: "Oral" }, { name: "Furosemide 40mg", qty: 14, type: "Tablet", freq: "Once daily", route: "Oral" }], diagnosis: "Hypertensive Emergency", allergies: ["ACE Inhibitors"], interactions: [{ severity: "high", drugs: "Nifedipine + Amlodipine", note: "Dual calcium channel blockers — risk of excessive hypotension. Verify with prescriber." }], insurance: "NHIS Active", aiFlag: "HIGH ALERT: Dual CCB detected. Nifedipine STAT for acute BP reduction, then transition to amlodipine maintenance. Confirm prescriber intent." },
  { id: "RX-4507", patient: "Oluwaseun Adeyemi", age: 22, doctor: "Dr. Funke Adeyemi", submitted: "2.5 hrs ago", priority: "routine", status: "dispensed", drugs: [{ name: "Ibuprofen 400mg", qty: 10, type: "Tablet", freq: "Three times daily with food", route: "Oral" }, { name: "Strepsils Lozenges", qty: 1, type: "Pack (16)", freq: "Every 3 hours PRN", route: "Oral" }], diagnosis: "Viral Pharyngitis", allergies: [], interactions: [], insurance: "Self-pay", aiFlag: "Short-course NSAID appropriate. No antibiotics prescribed — consistent with viral diagnosis." },
];

const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
  stat: { label: "STAT", color: "text-red-700", bg: "bg-red-100" },
  urgent: { label: "Urgent", color: "text-orange-700", bg: "bg-orange-100" },
  routine: { label: "Routine", color: "text-blue-700", bg: "bg-blue-100" },
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100" },
  in_review: { label: "Reviewing", color: "text-purple-700", bg: "bg-purple-100" },
  dispensed: { label: "Dispensed", color: "text-green-700", bg: "bg-green-100" },
};

type Tab = "queue" | "interactions" | "inventory_check" | "stats";

export default function PharmacyTriagePage() {
  const [tab, setTab] = useState<Tab>("queue");
  const [selectedRx, setSelectedRx] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filtered = prescriptions.filter(p => priorityFilter === "all" || p.priority === priorityFilter)
    .sort((a, b) => {
      const order = { stat: 0, urgent: 1, routine: 2 };
      return (order[a.priority as keyof typeof order] ?? 2) - (order[b.priority as keyof typeof order] ?? 2);
    });

  const rxDetail = selectedRx ? prescriptions.find(p => p.id === selectedRx) : null;

  const stats = {
    total: prescriptions.length,
    stat: prescriptions.filter(p => p.priority === "stat").length,
    pending: prescriptions.filter(p => p.status === "pending").length,
    interactions: prescriptions.filter(p => p.interactions.length > 0).length,
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "queue", label: "Rx Queue" },
    { key: "interactions", label: "Drug Interactions" },
    { key: "inventory_check", label: "Stock Check" },
    { key: "stats", label: "Dispensing Stats" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Prescription Triage</h1>
        <p className="text-on-surface-variant text-sm mt-1">AI-prioritized prescription queue with drug interaction screening</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Prescriptions", value: stats.total, icon: "📋", color: "text-primary" },
          { label: "STAT Orders", value: stats.stat, icon: "🚨", color: "text-red-600" },
          { label: "Pending Dispense", value: stats.pending, icon: "⏳", color: "text-amber-600" },
          { label: "Interaction Alerts", value: stats.interactions, icon: "⚠️", color: "text-orange-600" },
        ].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">{s.icon} {s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedRx(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Queue Tab */}
      {tab === "queue" && (
        <div className="flex gap-6">
          <div className={`${rxDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex gap-2 flex-wrap">
              {["all", "stat", "urgent", "routine"].map(f => (
                <button key={f} onClick={() => setPriorityFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${priorityFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {f === "all" ? `All (${prescriptions.length})` : `${priorityConfig[f].label} (${prescriptions.filter(p => p.priority === f).length})`}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(rx => {
                const pri = priorityConfig[rx.priority];
                const st = statusConfig[rx.status];
                return (
                  <button key={rx.id} onClick={() => setSelectedRx(rx.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedRx === rx.id ? "border-primary ring-1 ring-primary" : rx.priority === "stat" ? "border-red-300" : "border-outline-variant"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-on-surface-variant">{rx.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pri.bg} ${pri.color}`}>{pri.label}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.color}`}>{st.label}</span>
                          {rx.interactions.some(i => i.severity === "high") && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">⚠ Interaction</span>}
                        </div>
                        <h3 className="font-semibold text-on-surface text-sm mt-1">{rx.patient} <span className="font-normal text-on-surface-variant">({rx.age}y)</span></h3>
                        <div className="text-xs text-on-surface-variant mt-0.5">{rx.doctor} · {rx.diagnosis}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {rx.drugs.map(d => (
                            <span key={d.name} className="px-2 py-0.5 rounded-lg bg-surface-container-low text-[10px] text-on-surface-variant">{d.name}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-xs text-on-surface-variant">{rx.submitted}</div>
                        <div className="text-[10px] text-on-surface-variant mt-1">{rx.drugs.length} items</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rx Detail */}
          {rxDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className={`p-5 ${rxDetail.priority === "stat" ? "bg-red-700" : "bg-primary"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/70">{rxDetail.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase">{priorityConfig[rxDetail.priority].label}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-1">{rxDetail.patient}</h3>
                    <p className="text-white/70 text-sm">{rxDetail.doctor} · {rxDetail.diagnosis}</p>
                  </div>
                  <button onClick={() => setSelectedRx(null)} className="text-white/70 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                {/* AI Flag */}
                <div className={`rounded-xl p-4 ${rxDetail.interactions.some(i => i.severity === "high") ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                    <span className="text-sm font-semibold text-on-surface">AI Pharmacist Review</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{rxDetail.aiFlag}</p>
                </div>

                {/* Drug List */}
                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-3">Prescribed Medications</h4>
                  <div className="space-y-3">
                    {rxDetail.drugs.map(d => (
                      <div key={d.name} className="flex items-start justify-between bg-surface-container-lowest rounded-lg p-3 border border-outline-variant">
                        <div>
                          <div className="text-sm font-medium text-on-surface">{d.name}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5">{d.type} · {d.route} · {d.freq}</div>
                        </div>
                        <span className="text-sm font-medium text-primary">×{d.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactions */}
                {rxDetail.interactions.length > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Drug Interactions</h4>
                    {rxDetail.interactions.map((int, i) => (
                      <div key={i} className={`rounded-lg p-3 ${int.severity === "high" ? "bg-red-50 border border-red-200" : int.severity === "moderate" ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${int.severity === "high" ? "bg-red-200 text-red-800" : int.severity === "moderate" ? "bg-amber-200 text-amber-800" : "bg-green-200 text-green-800"}`}>{int.severity.toUpperCase()}</span>
                          <span className="text-xs font-medium text-on-surface">{int.drugs}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">{int.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-1">Allergies</h4>
                    {rxDetail.allergies.length > 0 ? rxDetail.allergies.map(a => (
                      <span key={a} className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 mr-1">{a}</span>
                    )) : <span className="text-xs text-on-surface-variant">NKDA</span>}
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-1">Insurance</h4>
                    <span className="text-xs text-on-surface-variant">{rxDetail.insurance}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {rxDetail.status === "pending" && <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Verify & Dispense</button>}
                  {rxDetail.status === "pending" && <button className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Query Prescriber</button>}
                  {rxDetail.status === "in_review" && <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Complete Review</button>}
                  <button className="px-4 py-2.5 bg-error text-on-error rounded-xl text-sm font-medium hover:opacity-90 transition-all">Reject</button>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Print Label</button>
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Patient Counseling</button>
                </div>

                <div className="text-[10px] text-on-surface-variant text-center pt-2 border-t border-outline-variant">NAFDAC-compliant dispensing. All prescriptions verified by licensed pharmacist.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drug Interactions Tab */}
      {tab === "interactions" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <span className="font-semibold text-amber-800">AI Drug Interaction Scanner</span>
            </div>
            <p className="text-sm text-amber-700">{stats.interactions} prescriptions flagged with potential drug interactions today.</p>
          </div>

          <div className="space-y-3">
            {prescriptions.filter(p => p.interactions.length > 0).map(rx => (
              <div key={rx.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-on-surface text-sm">{rx.patient} <span className="text-on-surface-variant font-normal">({rx.id})</span></h3>
                    <div className="text-xs text-on-surface-variant">{rx.doctor} · {rx.diagnosis}</div>
                  </div>
                  <button onClick={() => { setTab("queue"); setSelectedRx(rx.id); }} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-all">View Rx</button>
                </div>
                {rx.interactions.map((int, i) => (
                  <div key={i} className={`rounded-lg p-3 mb-2 last:mb-0 ${int.severity === "high" ? "bg-red-50 border border-red-200" : int.severity === "moderate" ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${int.severity === "high" ? "bg-red-200 text-red-800" : int.severity === "moderate" ? "bg-amber-200 text-amber-800" : "bg-green-200 text-green-800"}`}>{int.severity.toUpperCase()}</span>
                      <span className="text-sm font-medium text-on-surface">{int.drugs}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">{int.note}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Check Tab */}
      {tab === "inventory_check" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Stock Availability for Active Prescriptions</h2>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">Medication</th><th className="text-left px-4 py-3 font-medium">Required</th><th className="text-left px-4 py-3 font-medium">In Stock</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">NAFDAC Reg</th></tr></thead>
              <tbody>
                {[
                  { name: "Aspirin 300mg Tab", required: 1, stock: 250, status: "available", nafdac: "A4-0234" },
                  { name: "Clopidogrel 75mg Tab", required: 30, stock: 120, status: "available", nafdac: "A4-1892" },
                  { name: "Atorvastatin 40mg Tab", required: 30, stock: 85, status: "available", nafdac: "A4-2341" },
                  { name: "Artemether/Lumefantrine", required: 24, stock: 200, status: "available", nafdac: "A4-0567" },
                  { name: "Paracetamol 500mg Tab", required: 20, stock: 500, status: "available", nafdac: "A4-0012" },
                  { name: "Omeprazole 40mg Cap", required: 30, stock: 15, status: "low", nafdac: "A4-1456" },
                  { name: "Nifedipine 10mg Cap", required: 1, stock: 45, status: "available", nafdac: "A4-0789" },
                  { name: "Amlodipine 10mg Tab", required: 30, stock: 8, status: "low", nafdac: "A4-0923" },
                  { name: "Furosemide 40mg Tab", required: 14, stock: 0, status: "out", nafdac: "A4-1234" },
                  { name: "Diclofenac 50mg Tab", required: 20, stock: 180, status: "available", nafdac: "A4-0345" },
                ].map(m => (
                  <tr key={m.name} className="border-t border-outline-variant hover:bg-surface-container-low/50">
                    <td className="px-4 py-3 text-sm font-medium text-on-surface">{m.name}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">{m.required}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">{m.stock}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${m.status === "available" ? "bg-green-100 text-green-700" : m.status === "low" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{m.status === "available" ? "In Stock" : m.status === "low" ? "Low Stock" : "Out of Stock"}</span></td>
                    <td className="px-4 py-3 text-xs font-mono text-on-surface-variant">{m.nafdac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <span className="text-sm font-semibold text-red-800">Stock Alert</span>
            </div>
            <p className="text-xs text-red-700">Furosemide 40mg is out of stock. RX-4506 (Aisha Mohammed) requires this medication. Contact supplier or suggest alternative to prescriber.</p>
          </div>
        </div>
      )}

      {/* Dispensing Stats Tab */}
      {tab === "stats" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Today&apos;s Dispensing Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">23</div><div className="text-xs opacity-70">Total Dispensed</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">4.2 min</div><div className="text-xs opacity-70">Avg Processing Time</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">98.5%</div><div className="text-xs opacity-70">Accuracy Rate</div></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
              <h3 className="font-semibold text-on-surface mb-3">Top Dispensed Medications</h3>
              {[
                { name: "Paracetamol 500mg", count: 45 },
                { name: "Amoxicillin 500mg", count: 32 },
                { name: "Artemether/Lumefantrine", count: 28 },
                { name: "Metformin 500mg", count: 22 },
                { name: "Amlodipine 5mg", count: 18 },
              ].map((m, i) => (
                <div key={m.name} className="flex items-center justify-between py-2 border-b border-outline-variant last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-on-surface">{m.name}</span>
                  </div>
                  <span className="text-sm font-medium text-on-surface">{m.count}</span>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
              <h3 className="font-semibold text-on-surface mb-3">Pharmacist Performance</h3>
              {[
                { name: "Pharm. Chioma Obi", dispensed: 12, time: "3.8 min", accuracy: "100%" },
                { name: "Pharm. Yemi Alade", dispensed: 8, time: "4.5 min", accuracy: "97.5%" },
                { name: "Pharm. Hassan Musa", dispensed: 3, time: "4.1 min", accuracy: "100%" },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-outline-variant last:border-0">
                  <div>
                    <div className="text-sm font-medium text-on-surface">{p.name}</div>
                    <div className="text-xs text-on-surface-variant">{p.dispensed} dispensed · {p.time} avg</div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{p.accuracy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
