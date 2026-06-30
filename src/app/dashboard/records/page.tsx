"use client";

import { useState } from "react";

type Tab = "overview" | "labs" | "visits" | "documents" | "vitals";

const vitalHistory = [
  { date: "Jun 23", bp: "120/80", hr: 72, temp: 36.6, spo2: 98, weight: 74 },
  { date: "Jun 16", bp: "118/78", hr: 70, temp: 36.5, spo2: 99, weight: 74.2 },
  { date: "Jun 9", bp: "122/82", hr: 75, temp: 36.7, spo2: 97, weight: 74.5 },
  { date: "Jun 2", bp: "125/84", hr: 78, temp: 36.6, spo2: 98, weight: 75 },
  { date: "May 26", bp: "130/88", hr: 80, temp: 36.8, spo2: 97, weight: 75.3 },
  { date: "May 19", bp: "128/85", hr: 76, temp: 36.5, spo2: 98, weight: 75.1 },
];

const labResults = [
  { id: "LAB-4821", test: "Complete Blood Count (CBC)", date: "Jun 20, 2026", status: "normal" as const, doctor: "Dr. Sarah Chen", results: [
    { name: "WBC", value: "6.2", unit: "x10⁹/L", range: "4.0–11.0", status: "normal" as const },
    { name: "RBC", value: "4.8", unit: "x10¹²/L", range: "4.5–5.5", status: "normal" as const },
    { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5–17.5", status: "normal" as const },
    { name: "Hematocrit", value: "42", unit: "%", range: "38–50", status: "normal" as const },
    { name: "Platelets", value: "245", unit: "x10⁹/L", range: "150–400", status: "normal" as const },
  ]},
  { id: "LAB-4798", test: "Lipid Panel", date: "Jun 15, 2026", status: "attention" as const, doctor: "Dr. Michael Obi", results: [
    { name: "Total Cholesterol", value: "215", unit: "mg/dL", range: "<200", status: "high" as const },
    { name: "LDL", value: "138", unit: "mg/dL", range: "<100", status: "high" as const },
    { name: "HDL", value: "52", unit: "mg/dL", range: ">40", status: "normal" as const },
    { name: "Triglycerides", value: "125", unit: "mg/dL", range: "<150", status: "normal" as const },
  ]},
  { id: "LAB-4755", test: "Fasting Blood Glucose", date: "Jun 8, 2026", status: "normal" as const, doctor: "Dr. Amara Eze", results: [
    { name: "Glucose (Fasting)", value: "92", unit: "mg/dL", range: "70–100", status: "normal" as const },
    { name: "HbA1c", value: "5.4", unit: "%", range: "<5.7", status: "normal" as const },
  ]},
  { id: "LAB-4710", test: "Thyroid Function", date: "May 28, 2026", status: "normal" as const, doctor: "Dr. Sarah Chen", results: [
    { name: "TSH", value: "2.1", unit: "mIU/L", range: "0.4–4.0", status: "normal" as const },
    { name: "Free T4", value: "1.2", unit: "ng/dL", range: "0.8–1.8", status: "normal" as const },
  ]},
];

const visits = [
  { date: "Jun 20, 2026", doctor: "Dr. Sarah Chen", specialty: "Cardiology", type: "In-Person", reason: "Routine cardiac check-up and ECG review", notes: "ECG normal sinus rhythm. BP slightly elevated — continue monitoring. Follow-up in 4 weeks.", avatar: "SC", avatarBg: "bg-primary" },
  { date: "Jun 15, 2026", doctor: "Dr. Michael Obi", specialty: "Dermatology", type: "Telemedicine", reason: "Skin rash evaluation on left forearm", notes: "Diagnosed as contact dermatitis. Prescribed hydrocortisone cream. Advised to switch laundry detergent.", avatar: "MO", avatarBg: "bg-secondary" },
  { date: "Jun 8, 2026", doctor: "Dr. Amara Eze", specialty: "General Practice", type: "In-Person", reason: "Annual wellness examination", notes: "Overall health good. Blood glucose normal. Lipid panel shows elevated LDL — dietary changes recommended. Renewed blood pressure medication for 3 months.", avatar: "AE", avatarBg: "bg-tertiary" },
  { date: "May 20, 2026", doctor: "Dr. Chidi Nwankwo", specialty: "Orthopedics", type: "In-Person", reason: "Follow-up on lower back pain", notes: "X-ray shows significant improvement. Continue physiotherapy 3x/week. Next review in 6 weeks.", avatar: "CN", avatarBg: "bg-secondary" },
];

const documents = [
  { name: "Annual Wellness Report 2026", type: "PDF", size: "2.4 MB", date: "Jun 8, 2026", category: "Reports" },
  { name: "ECG Recording — Jun 20", type: "PDF", size: "1.1 MB", date: "Jun 20, 2026", category: "Diagnostics" },
  { name: "Lipid Panel Results", type: "PDF", size: "340 KB", date: "Jun 15, 2026", category: "Lab Results" },
  { name: "Prescription — Lisinopril Renewal", type: "PDF", size: "125 KB", date: "Jun 8, 2026", category: "Prescriptions" },
  { name: "X-Ray Lumbar Spine", type: "DICOM", size: "8.7 MB", date: "May 20, 2026", category: "Imaging" },
  { name: "Insurance Pre-Authorization", type: "PDF", size: "450 KB", date: "May 15, 2026", category: "Insurance" },
];

const statusColor = (s: string) => s === "normal" ? "text-secondary" : s === "high" ? "text-error" : s === "low" ? "text-tertiary" : "text-on-surface-variant";
const statusBg = (s: string) => s === "normal" ? "bg-secondary-container/50 text-secondary" : "bg-error-container/50 text-error";

export default function HealthRecordsPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "labs", label: "Lab Results" },
    { id: "visits", label: "Visit History" },
    { id: "documents", label: "Documents" },
    { id: "vitals", label: "Vitals Tracker" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Health Records</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Your complete medical history in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm font-semibold text-on-surface hover:border-primary transition-all self-start">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
          Upload Document
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${tab === t.id ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-6">
          {/* Health summary cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", statusColor: "text-secondary", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>, color: "text-error bg-error-container/30" },
              { label: "Heart Rate", value: "72", unit: "bpm", status: "Normal", statusColor: "text-secondary", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h4.5l1.5-6 3 12 1.5-6h4.5" /></svg>, color: "text-primary bg-primary-fixed" },
              { label: "Blood Glucose", value: "92", unit: "mg/dL", status: "Normal", statusColor: "text-secondary", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>, color: "text-secondary bg-secondary-container/30" },
              { label: "BMI", value: "24.2", unit: "kg/m²", status: "Healthy", statusColor: "text-secondary", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
            ].map((card) => (
              <div key={card.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>{card.icon}</div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{card.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-on-surface">{card.value}</span>
                  <span className="text-xs text-on-surface-variant">{card.unit}</span>
                </div>
                <span className={`text-[10px] font-bold ${card.statusColor}`}>{card.status}</span>
              </div>
            ))}
          </div>

          {/* Recent labs + upcoming */}
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold text-on-surface mb-3">Recent Lab Results</h3>
              <div className="space-y-2">
                {labResults.slice(0, 3).map((lab) => (
                  <div key={lab.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:border-primary hover:shadow-sm transition-all cursor-pointer" onClick={() => { setTab("labs"); setExpandedLab(lab.id); }}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lab.status === "normal" ? "bg-secondary-container/30 text-secondary" : "bg-error-container/30 text-error"}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-on-surface">{lab.test}</h4>
                      <p className="text-xs text-on-surface-variant">{lab.doctor} • {lab.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusBg(lab.status)}`}>
                      {lab.status === "normal" ? "Normal" : "Needs Attention"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-on-surface mb-3">Allergies & Conditions</h3>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Known Allergies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-error-container/50 text-error">Penicillin</span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-tertiary-fixed/30 text-tertiary">Shellfish</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Active Conditions</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-fixed text-primary">Essential Hypertension</span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant">Elevated LDL Cholesterol</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Blood Type</span>
                  <div className="text-lg font-bold text-on-surface mt-1">O+</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Active Medications</span>
                  <div className="space-y-1.5 mt-2">
                    <div className="text-xs text-on-surface"><strong>Lisinopril 10mg</strong> — Once daily</div>
                    <div className="text-xs text-on-surface"><strong>Vitamin D3 5000 IU</strong> — Once daily</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lab Results */}
      {tab === "labs" && (
        <div className="space-y-3">
          {labResults.map((lab) => (
            <div key={lab.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-sm transition-all">
              <button onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)} className="w-full flex items-center gap-4 p-4 text-left">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${lab.status === "normal" ? "bg-secondary-container/30 text-secondary" : "bg-error-container/30 text-error"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-on-surface">{lab.test}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBg(lab.status)}`}>
                      {lab.status === "normal" ? "Normal" : "Attention"}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{lab.id} • {lab.doctor} • {lab.date}</p>
                </div>
                <svg className={`w-5 h-5 text-on-surface-variant transition-transform ${expandedLab === lab.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </button>
              {expandedLab === lab.id && (
                <div className="border-t border-outline-variant">
                  <div className="hidden sm:grid grid-cols-5 px-5 py-2 bg-surface-container-low">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Test</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Result</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unit</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Reference</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status</span>
                  </div>
                  {lab.results.map((r, i) => (
                    <div key={i} className={`grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-5 py-2.5 ${i < lab.results.length - 1 ? "border-b border-outline-variant" : ""}`}>
                      <span className="text-sm font-medium text-on-surface">{r.name}</span>
                      <span className={`text-sm font-bold ${statusColor(r.status)}`}>{r.value}</span>
                      <span className="text-sm text-on-surface-variant">{r.unit}</span>
                      <span className="text-sm text-on-surface-variant">{r.range}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${r.status === "normal" ? "bg-secondary-container/50 text-secondary" : "bg-error-container/50 text-error"}`}>
                        {r.status === "normal" ? "Normal" : r.status === "high" ? "High" : "Low"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Visit History */}
      {tab === "visits" && (
        <div className="space-y-4">
          {visits.map((visit, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 rounded-full ${visit.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>{visit.avatar}</div>
                  {i < visits.length - 1 && <div className="w-0.5 h-8 bg-outline-variant mt-2" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-on-surface">{visit.doctor}</h3>
                    <span className="text-xs text-on-surface-variant">•</span>
                    <span className="text-xs text-on-surface-variant">{visit.specialty}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${visit.type === "Telemedicine" ? "bg-primary-fixed text-primary" : "bg-surface-container-high text-on-surface-variant"}`}>{visit.type}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">{visit.date}</p>
                  <p className="text-sm text-on-surface font-medium mb-2">{visit.reason}</p>
                  <div className="bg-surface-container-low rounded-lg p-3">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Clinical Notes</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{visit.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Documents */}
      {tab === "documents" && (
        <div className="space-y-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">Document</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Category</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Date</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Action</span>
            </div>
            {documents.map((doc, i) => (
              <div key={i} className={`grid sm:grid-cols-5 gap-2 sm:gap-0 items-center px-5 py-3.5 hover:bg-surface-container-low transition-colors ${i < documents.length - 1 ? "border-b border-outline-variant" : ""}`}>
                <div className="col-span-2 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${doc.type === "DICOM" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-error-container/30 text-error"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-on-surface">{doc.name}</h4>
                    <p className="text-[10px] text-on-surface-variant">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant">{doc.category}</span>
                <span className="text-xs text-on-surface-variant">{doc.date}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" title="View">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" title="Download">
                    <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vitals Tracker */}
      {tab === "vitals" && (
        <div className="space-y-6">
          {/* Trend chart */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Blood Pressure Trend (6 weeks)</h3>
            <div className="flex items-end gap-3 h-40">
              {vitalHistory.map((v, i) => {
                const systolic = parseInt(v.bp.split("/")[0]);
                const diastolic = parseInt(v.bp.split("/")[1]);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end h-32">
                      <div className="flex-1 rounded-t bg-primary" style={{ height: `${(systolic / 160) * 100}%` }} title={`Systolic: ${systolic}`} />
                      <div className="flex-1 rounded-t bg-secondary" style={{ height: `${(diastolic / 160) * 100}%` }} title={`Diastolic: ${diastolic}`} />
                    </div>
                    <span className="text-[9px] text-on-surface-variant font-medium">{v.date}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-6 mt-3 justify-center">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant"><div className="w-3 h-3 rounded bg-primary" /> Systolic</div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant"><div className="w-3 h-3 rounded bg-secondary" /> Diastolic</div>
            </div>
          </div>

          {/* Vitals table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-6 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Date</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Blood Pressure</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Heart Rate</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Temperature</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">SpO₂</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Weight</span>
            </div>
            {vitalHistory.map((v, i) => (
              <div key={i} className={`grid sm:grid-cols-6 gap-1 sm:gap-0 items-center px-5 py-3 ${i < vitalHistory.length - 1 ? "border-b border-outline-variant" : ""}`}>
                <span className="text-sm font-medium text-on-surface">{v.date}</span>
                <span className={`text-sm font-semibold ${parseInt(v.bp.split("/")[0]) > 125 ? "text-error" : "text-on-surface"}`}>{v.bp} <span className="text-[10px] text-on-surface-variant">mmHg</span></span>
                <span className="text-sm text-on-surface">{v.hr} <span className="text-[10px] text-on-surface-variant">bpm</span></span>
                <span className="text-sm text-on-surface">{v.temp} <span className="text-[10px] text-on-surface-variant">°C</span></span>
                <span className="text-sm text-on-surface">{v.spo2}<span className="text-[10px] text-on-surface-variant">%</span></span>
                <span className="text-sm text-on-surface">{v.weight} <span className="text-[10px] text-on-surface-variant">kg</span></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
