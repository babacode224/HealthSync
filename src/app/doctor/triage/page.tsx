"use client";

import { useState } from "react";

const incomingCases = [
  { id: "TRG-001", patient: "Adewale Okafor", age: 42, gender: "Male", submitted: "10 min ago", symptoms: ["Severe chest pain", "Shortness of breath", "Sweating"], vitals: { bp: "160/95", hr: 112, temp: "37.2°C", spo2: "94%" }, aiSeverity: "critical", aiScore: 95, aiSuggestion: "Possible acute coronary syndrome. Immediate ECG and troponin recommended.", history: ["Hypertension", "Type 2 Diabetes"], medications: ["Amlodipine 10mg", "Metformin 500mg"], status: "pending" },
  { id: "TRG-002", patient: "Ngozi Eze", age: 35, gender: "Female", submitted: "25 min ago", symptoms: ["High fever (39.8°C)", "Severe headache", "Joint pain", "Chills"], vitals: { bp: "110/70", hr: 98, temp: "39.8°C", spo2: "97%" }, aiSeverity: "high", aiScore: 78, aiSuggestion: "Presentation consistent with malaria or dengue fever. Rapid diagnostic test and blood film recommended.", history: ["None significant"], medications: [], status: "pending" },
  { id: "TRG-003", patient: "Chidi Okonkwo", age: 28, gender: "Male", submitted: "40 min ago", symptoms: ["Persistent cough (3 weeks)", "Night sweats", "Weight loss"], vitals: { bp: "120/75", hr: 82, temp: "37.6°C", spo2: "96%" }, aiSeverity: "high", aiScore: 72, aiSuggestion: "TB screening strongly recommended given symptom duration and pattern. Isolate if possible pending sputum test.", history: ["Previous pneumonia"], medications: [], status: "in_review" },
  { id: "TRG-004", patient: "Fatima Bello", age: 55, gender: "Female", submitted: "1 hr ago", symptoms: ["Abdominal pain (RUQ)", "Nausea", "Bloating after meals"], vitals: { bp: "135/85", hr: 76, temp: "37.0°C", spo2: "98%" }, aiSeverity: "medium", aiScore: 55, aiSuggestion: "Symptoms suggest biliary colic or cholecystitis. Abdominal ultrasound and liver function tests recommended.", history: ["Obesity", "Gallstones"], medications: ["Omeprazole 20mg"], status: "pending" },
  { id: "TRG-005", patient: "Emeka Nwosu", age: 8, gender: "Male", submitted: "1.5 hrs ago", symptoms: ["Rash (trunk and limbs)", "Mild fever", "Itching"], vitals: { bp: "95/60", hr: 92, temp: "37.8°C", spo2: "99%" }, aiSeverity: "low", aiScore: 30, aiSuggestion: "Likely viral exanthem or allergic reaction. Monitor for progression. Antihistamine may provide symptomatic relief.", history: ["Childhood asthma"], medications: ["Salbutamol inhaler PRN"], status: "reviewed" },
  { id: "TRG-006", patient: "Aisha Mohammed", age: 62, gender: "Female", submitted: "2 hrs ago", symptoms: ["Dizziness", "Blurred vision", "Unsteady gait"], vitals: { bp: "180/110", hr: 68, temp: "36.8°C", spo2: "97%" }, aiSeverity: "high", aiScore: 82, aiSuggestion: "Hypertensive emergency with neurological symptoms. Rule out stroke — urgent CT head recommended. Do not delay treatment.", history: ["Hypertension", "Hyperlipidemia"], medications: ["Lisinopril 20mg", "Atorvastatin 40mg"], status: "pending" },
  { id: "TRG-007", patient: "Oluwaseun Adeyemi", age: 22, gender: "Female", submitted: "2.5 hrs ago", symptoms: ["Sore throat", "Mild fever", "Swollen lymph nodes"], vitals: { bp: "115/72", hr: 78, temp: "37.9°C", spo2: "99%" }, aiSeverity: "low", aiScore: 22, aiSuggestion: "Likely viral pharyngitis. Rapid strep test if bacterial infection suspected. Symptomatic treatment advised.", history: ["None"], medications: [], status: "reviewed" },
  { id: "TRG-008", patient: "Ibrahim Yusuf", age: 48, gender: "Male", submitted: "3 hrs ago", symptoms: ["Lower back pain", "Radiating to left leg", "Numbness"], vitals: { bp: "130/82", hr: 74, temp: "36.9°C", spo2: "98%" }, aiSeverity: "medium", aiScore: 45, aiSuggestion: "Likely lumbar radiculopathy. Red flags absent. MRI if conservative treatment fails after 6 weeks. NSAIDs for pain.", history: ["Sedentary lifestyle"], medications: [], status: "pending" },
];

const severityConfig: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: "Critical", color: "text-red-700", bg: "bg-red-100" },
  high: { label: "High", color: "text-orange-700", bg: "bg-orange-100" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-100" },
  low: { label: "Low", color: "text-green-700", bg: "bg-green-100" },
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending Review", color: "text-blue-700", bg: "bg-blue-100" },
  in_review: { label: "In Review", color: "text-purple-700", bg: "bg-purple-100" },
  reviewed: { label: "Reviewed", color: "text-green-700", bg: "bg-green-100" },
};

type Tab = "queue" | "ai_insights" | "protocols" | "history";

export default function DoctorTriagePage() {
  const [tab, setTab] = useState<Tab>("queue");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = incomingCases.filter(c => {
    if (severityFilter !== "all" && c.aiSeverity !== severityFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  }).sort((a, b) => b.aiScore - a.aiScore);

  const caseDetail = selectedCase ? incomingCases.find(c => c.id === selectedCase) : null;

  const stats = {
    total: incomingCases.length,
    critical: incomingCases.filter(c => c.aiSeverity === "critical").length,
    pending: incomingCases.filter(c => c.status === "pending").length,
    avgScore: Math.round(incomingCases.reduce((a, b) => a + b.aiScore, 0) / incomingCases.length),
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "queue", label: "Triage Queue" },
    { key: "ai_insights", label: "AI Insights" },
    { key: "protocols", label: "Clinical Protocols" },
    { key: "history", label: "Triage History" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">AI-Assisted Triage</h1>
        <p className="text-on-surface-variant text-sm mt-1">AI-prioritized patient cases with clinical decision support</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Cases", value: stats.total, icon: "📋", color: "text-primary" },
          { label: "Critical", value: stats.critical, icon: "🚨", color: "text-red-600" },
          { label: "Pending Review", value: stats.pending, icon: "⏳", color: "text-blue-600" },
          { label: "Avg AI Score", value: stats.avgScore, icon: "🤖", color: "text-purple-600" },
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
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedCase(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Queue Tab */}
      {tab === "queue" && (
        <div className="flex gap-6">
          <div className={`${caseDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex gap-2 flex-wrap">
              {["all", "critical", "high", "medium", "low"].map(f => (
                <button key={f} onClick={() => setSeverityFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${severityFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {f === "all" ? `All (${incomingCases.length})` : `${severityConfig[f].label} (${incomingCases.filter(c => c.aiSeverity === f).length})`}
                </button>
              ))}
              <div className="border-l border-outline-variant mx-1" />
              {["all", "pending", "in_review", "reviewed"].map(f => (
                <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === f ? "bg-secondary text-on-secondary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {f === "all" ? "All Status" : statusConfig[f].label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(c => {
                const sev = severityConfig[c.aiSeverity];
                const st = statusConfig[c.status];
                return (
                  <button key={c.id} onClick={() => setSelectedCase(c.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedCase === c.id ? "border-primary ring-1 ring-primary" : c.aiSeverity === "critical" ? "border-red-300" : "border-outline-variant"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-on-surface text-sm">{c.patient}</h3>
                          <span className="text-xs text-on-surface-variant">{c.age}y {c.gender}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sev.bg} ${sev.color}`}>{sev.label}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.color}`}>{st.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {c.symptoms.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-lg bg-surface-container-low text-[10px] text-on-surface-variant">{s}</span>
                          ))}
                        </div>
                        <p className="text-xs text-on-surface-variant mt-2 italic line-clamp-1">AI: {c.aiSuggestion}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className={`text-lg font-bold ${c.aiScore >= 80 ? "text-red-600" : c.aiScore >= 50 ? "text-amber-600" : "text-green-600"}`}>{c.aiScore}</div>
                        <div className="text-[10px] text-on-surface-variant">AI Score</div>
                        <div className="text-[10px] text-on-surface-variant mt-1">{c.submitted}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Case Detail */}
          {caseDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className={`p-5 ${caseDetail.aiSeverity === "critical" ? "bg-red-700" : "bg-primary"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/70">{caseDetail.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white uppercase">{severityConfig[caseDetail.aiSeverity].label}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-1">{caseDetail.patient}</h3>
                    <p className="text-white/70 text-sm">{caseDetail.age} years · {caseDetail.gender} · {caseDetail.submitted}</p>
                  </div>
                  <button onClick={() => setSelectedCase(null)} className="text-white/70 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                {/* AI Analysis */}
                <div className={`rounded-xl p-4 ${caseDetail.aiSeverity === "critical" ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                    <span className="text-sm font-semibold text-on-surface">AI Clinical Assessment</span>
                    <span className={`ml-auto text-lg font-bold ${caseDetail.aiScore >= 80 ? "text-red-600" : caseDetail.aiScore >= 50 ? "text-amber-600" : "text-green-600"}`}>{caseDetail.aiScore}/100</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{caseDetail.aiSuggestion}</p>
                </div>

                {/* Vitals */}
                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-3">Vital Signs</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Blood Pressure", value: caseDetail.vitals.bp, unit: "mmHg", warn: parseInt(caseDetail.vitals.bp.split("/")[0]) > 140 },
                      { label: "Heart Rate", value: caseDetail.vitals.hr, unit: "bpm", warn: caseDetail.vitals.hr > 100 },
                      { label: "Temperature", value: caseDetail.vitals.temp, unit: "", warn: parseFloat(caseDetail.vitals.temp) > 38 },
                      { label: "SpO₂", value: caseDetail.vitals.spo2, unit: "", warn: parseInt(caseDetail.vitals.spo2) < 95 },
                    ].map(v => (
                      <div key={v.label} className={`rounded-lg p-3 ${v.warn ? "bg-red-50 border border-red-200" : "bg-surface-container-lowest border border-outline-variant"}`}>
                        <div className="text-[10px] text-on-surface-variant uppercase">{v.label}</div>
                        <div className={`text-lg font-bold ${v.warn ? "text-red-600" : "text-on-surface"}`}>{v.value} <span className="text-xs font-normal text-on-surface-variant">{v.unit}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Presenting Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseDetail.symptoms.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                {/* History & Medications */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Medical History</h4>
                    {caseDetail.history.map(h => (
                      <div key={h} className="text-xs text-on-surface-variant py-1">{h}</div>
                    ))}
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Current Medications</h4>
                    {caseDetail.medications.length > 0 ? caseDetail.medications.map(m => (
                      <div key={m} className="text-xs text-on-surface-variant py-1">{m}</div>
                    )) : <div className="text-xs text-on-surface-variant">None</div>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Accept & Assign</button>
                  <button className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Order Tests</button>
                  <button className="px-4 py-2.5 bg-error text-on-error rounded-xl text-sm font-medium hover:opacity-90 transition-all">Escalate</button>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Schedule Follow-up</button>
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Add Notes</button>
                </div>

                <div className="text-[10px] text-on-surface-variant text-center pt-2 border-t border-outline-variant">AI suggestions are advisory only. Clinical judgment takes precedence. HIPAA-compliant.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Insights Tab */}
      {tab === "ai_insights" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
              <h2 className="text-lg font-bold">AI Triage Intelligence Report</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">92%</div><div className="text-xs opacity-70">AI Accuracy Rate</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">3.2 min</div><div className="text-xs opacity-70">Avg Triage Time</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-2xl font-bold">12</div><div className="text-xs opacity-70">Cases Today</div></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
              <h3 className="font-semibold text-on-surface mb-3">Severity Distribution Today</h3>
              {["critical", "high", "medium", "low"].map(sev => {
                const count = incomingCases.filter(c => c.aiSeverity === sev).length;
                const pct = Math.round((count / incomingCases.length) * 100);
                const cfg = severityConfig[sev];
                return (
                  <div key={sev} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={`font-medium ${cfg.color}`}>{cfg.label}</span>
                      <span className="text-on-surface-variant">{count} cases ({pct}%)</span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-2"><div className={`h-2 rounded-full ${sev === "critical" ? "bg-red-500" : sev === "high" ? "bg-orange-500" : sev === "medium" ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
              <h3 className="font-semibold text-on-surface mb-3">Common Presentations</h3>
              {[
                { condition: "Cardiovascular", count: 2, trend: "up" },
                { condition: "Infectious Disease", count: 2, trend: "stable" },
                { condition: "Musculoskeletal", count: 1, trend: "down" },
                { condition: "Gastrointestinal", count: 1, trend: "stable" },
                { condition: "Dermatological", count: 1, trend: "down" },
                { condition: "ENT", count: 1, trend: "stable" },
              ].map(p => (
                <div key={p.condition} className="flex items-center justify-between py-2 border-b border-outline-variant last:border-0">
                  <span className="text-sm text-on-surface">{p.condition}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-on-surface">{p.count}</span>
                    <span className={`text-xs ${p.trend === "up" ? "text-red-500" : p.trend === "down" ? "text-green-500" : "text-gray-400"}`}>{p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "→"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <span className="font-semibold text-amber-800">AI Alert</span>
            </div>
            <p className="text-sm text-amber-700">Increased cardiovascular presentations detected today (2 cases with AI scores &gt;80). Consider alerting cardiology team for standby.</p>
          </div>
        </div>
      )}

      {/* Protocols Tab */}
      {tab === "protocols" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Quick Reference Protocols</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { name: "Chest Pain Protocol", category: "Cardiology", steps: ["12-lead ECG within 10 min", "Troponin I/T stat", "Aspirin 300mg if no contraindication", "Vitals q15 min", "Cardiology consult if STEMI"], color: "red" },
              { name: "Febrile Illness Protocol", category: "Infectious Disease", steps: ["Blood cultures x2", "Malaria RDT + blood film", "CBC, CRP, blood glucose", "IV access + fluid bolus if tachycardic", "Empiric antimalarials if RDT+"], color: "orange" },
              { name: "Stroke Protocol", category: "Neurology", steps: ["FAST assessment", "CT head within 25 min", "Blood glucose stat", "BP management per protocol", "Thrombolysis window assessment"], color: "purple" },
              { name: "Respiratory Distress", category: "Pulmonology", steps: ["SpO₂ monitoring + O₂ if <94%", "Chest X-ray stat", "ABG if SpO₂ <90%", "Nebulized bronchodilator", "Assess for intubation need"], color: "blue" },
            ].map(p => (
              <div key={p.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-3 h-3 rounded-full bg-${p.color}-500`} />
                  <h3 className="font-bold text-on-surface text-sm">{p.name}</h3>
                  <span className="text-xs text-on-surface-variant ml-auto">{p.category}</span>
                </div>
                <ol className="space-y-2">
                  {p.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-xs text-on-surface-variant">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Recent Triage Decisions</h2>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">Patient</th><th className="text-left px-4 py-3 font-medium">AI Severity</th><th className="text-left px-4 py-3 font-medium">Doctor Decision</th><th className="text-left px-4 py-3 font-medium">Outcome</th><th className="text-left px-4 py-3 font-medium">Date</th></tr></thead>
              <tbody>
                {[
                  { patient: "Grace Obi", aiSeverity: "high", decision: "Admitted", outcome: "Treated & discharged", date: "Jun 27" },
                  { patient: "Tunde Bakare", aiSeverity: "medium", decision: "Outpatient", outcome: "Follow-up scheduled", date: "Jun 27" },
                  { patient: "Mary Adebisi", aiSeverity: "critical", decision: "ICU Transfer", outcome: "Stabilized", date: "Jun 26" },
                  { patient: "Peter Agu", aiSeverity: "low", decision: "Home + Rx", outcome: "Resolved", date: "Jun 26" },
                  { patient: "Halima Sani", aiSeverity: "high", decision: "Admitted", outcome: "Ongoing treatment", date: "Jun 25" },
                ].map((h, i) => {
                  const sev = severityConfig[h.aiSeverity];
                  return (
                    <tr key={i} className="border-t border-outline-variant hover:bg-surface-container-low/50">
                      <td className="px-4 py-3 text-sm font-medium text-on-surface">{h.patient}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sev.bg} ${sev.color}`}>{sev.label}</span></td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{h.decision}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{h.outcome}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">{h.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
