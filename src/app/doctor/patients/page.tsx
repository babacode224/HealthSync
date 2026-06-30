"use client";

import { useState } from "react";

type View = "list" | "detail";

interface Patient {
  id: string;
  name: string;
  age: number;
  sex: "Male" | "Female";
  phone: string;
  bloodType: string;
  genotype: string;
  insurance: string;
  conditions: string[];
  allergies: string[];
  lastVisit: string;
  nextAppointment: string | null;
  status: "active" | "follow-up" | "discharged" | "critical";
  visits: number;
  carePlan: string;
  medications: { name: string; dosage: string; frequency: string }[];
  vitals: { label: string; value: string; status: "normal" | "elevated" | "low" };
  history: { date: string; type: string; summary: string; provider: string }[];
}

const patients: Patient[] = [
  {
    id: "HS-PAT-001",
    name: "Adebayo Oluwatobi",
    age: 36,
    sex: "Male",
    phone: "+234 803 456 7890",
    bloodType: "O+",
    genotype: "AA",
    insurance: "Leadway Health HMO",
    conditions: ["Type 2 Diabetes", "Essential Hypertension"],
    allergies: ["Penicillin", "Sulfonamides"],
    lastVisit: "June 24, 2026",
    nextAppointment: "July 3, 2026 — 10:00 AM",
    status: "active",
    visits: 14,
    carePlan: "Diabetes management with quarterly HbA1c monitoring. BP control with Lisinopril 10mg. Lifestyle modification — diet and exercise counselling ongoing.",
    medications: [
      { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at night" },
    ],
    vitals: { label: "BP", value: "138/88 mmHg", status: "elevated" },
    history: [
      { date: "June 24, 2026", type: "Consultation", summary: "Follow-up for diabetes. HbA1c 7.2% (improved from 7.8%). BP 138/88 — adjusted medication.", provider: "Dr. Sarah Jenkins" },
      { date: "May 15, 2026", type: "Lab Review", summary: "Reviewed lipid panel. LDL 118 mg/dL, HDL 42. Started Atorvastatin 20mg.", provider: "Dr. Sarah Jenkins" },
      { date: "March 20, 2026", type: "Consultation", summary: "Initial diabetes/hypertension diagnosis. Started Metformin 500mg BD, Lisinopril 5mg.", provider: "Dr. Sarah Jenkins" },
    ],
  },
  {
    id: "HS-PAT-002",
    name: "Chioma Okafor",
    age: 28,
    sex: "Female",
    phone: "+234 805 234 5678",
    bloodType: "A+",
    genotype: "AS",
    insurance: "AXA Mansard",
    conditions: ["Asthma"],
    allergies: ["Aspirin"],
    lastVisit: "June 22, 2026",
    nextAppointment: "July 10, 2026 — 2:00 PM",
    status: "active",
    visits: 6,
    carePlan: "Mild persistent asthma. Low-dose ICS (Budesonide 200mcg) with SABA rescue. Peak flow monitoring at home.",
    medications: [
      { name: "Budesonide Inhaler", dosage: "200mcg", frequency: "Twice daily" },
      { name: "Salbutamol Inhaler", dosage: "100mcg", frequency: "As needed" },
    ],
    vitals: { label: "SpO2", value: "98%", status: "normal" },
    history: [
      { date: "June 22, 2026", type: "Follow-up", summary: "Asthma well controlled. No nocturnal symptoms. Peak flow 95% predicted.", provider: "Dr. Sarah Jenkins" },
      { date: "April 8, 2026", type: "Emergency", summary: "Acute exacerbation triggered by dust exposure. Nebulized, observed 4hrs, discharged stable.", provider: "Dr. Emeka Obi" },
    ],
  },
  {
    id: "HS-PAT-003",
    name: "Fatima Bello",
    age: 45,
    sex: "Female",
    phone: "+234 809 876 5432",
    bloodType: "B+",
    genotype: "AA",
    insurance: "NHIS",
    conditions: ["Rheumatoid Arthritis", "Osteoporosis"],
    allergies: [],
    lastVisit: "June 20, 2026",
    nextAppointment: null,
    status: "follow-up",
    visits: 22,
    carePlan: "RA managed with Methotrexate 15mg weekly + folic acid. Osteoporosis treatment with Alendronate. DEXA scan scheduled Q12M.",
    medications: [
      { name: "Methotrexate", dosage: "15mg", frequency: "Once weekly" },
      { name: "Folic Acid", dosage: "5mg", frequency: "Daily (except MTX day)" },
      { name: "Alendronate", dosage: "70mg", frequency: "Once weekly" },
      { name: "Calcium + Vit D", dosage: "600mg/400IU", frequency: "Twice daily" },
    ],
    vitals: { label: "ESR", value: "32 mm/hr", status: "elevated" },
    history: [
      { date: "June 20, 2026", type: "Lab Review", summary: "CBC and LFT normal. ESR mildly elevated at 32. DAS28 score 3.1 (low disease activity).", provider: "Dr. Sarah Jenkins" },
      { date: "March 5, 2026", type: "Consultation", summary: "Joint assessment — bilateral wrist tenderness. Adjusted MTX from 12.5mg to 15mg.", provider: "Dr. Sarah Jenkins" },
    ],
  },
  {
    id: "HS-PAT-004",
    name: "Emeka Nwosu",
    age: 62,
    sex: "Male",
    phone: "+234 803 111 2233",
    bloodType: "AB+",
    genotype: "AA",
    insurance: "Hygeia HMO",
    conditions: ["Heart Failure (NYHA II)", "Atrial Fibrillation", "CKD Stage 3a"],
    allergies: ["ACE Inhibitors"],
    lastVisit: "June 25, 2026",
    nextAppointment: "June 30, 2026 — 9:00 AM",
    status: "critical",
    visits: 31,
    carePlan: "Heart failure with reduced EF (35%). On guideline-directed medical therapy. Anticoagulation for AFib. Renal function monitoring Q3M. Fluid restriction 1.5L/day.",
    medications: [
      { name: "Sacubitril/Valsartan", dosage: "97/103mg", frequency: "Twice daily" },
      { name: "Bisoprolol", dosage: "5mg", frequency: "Once daily" },
      { name: "Spironolactone", dosage: "25mg", frequency: "Once daily" },
      { name: "Rivaroxaban", dosage: "15mg", frequency: "Once daily with food" },
      { name: "Furosemide", dosage: "40mg", frequency: "Once daily morning" },
    ],
    vitals: { label: "EF", value: "35%", status: "low" },
    history: [
      { date: "June 25, 2026", type: "Telehealth", summary: "Weight up 2kg in 3 days. Increased Furosemide from 20mg to 40mg. Recheck in 5 days.", provider: "Dr. Sarah Jenkins" },
      { date: "June 10, 2026", type: "Lab Review", summary: "eGFR 48 (stable). K+ 4.8. BNP 680 (up from 420). Echocardiogram ordered.", provider: "Dr. Sarah Jenkins" },
      { date: "May 2, 2026", type: "Consultation", summary: "Stable on current regimen. EF 35% on echo. Discussed ICD referral.", provider: "Dr. Sarah Jenkins" },
    ],
  },
  {
    id: "HS-PAT-005",
    name: "Amina Yusuf",
    age: 32,
    sex: "Female",
    phone: "+234 807 333 4455",
    bloodType: "O-",
    genotype: "AS",
    insurance: "Reliance HMO",
    conditions: ["Migraine with Aura"],
    allergies: ["Codeine"],
    lastVisit: "June 18, 2026",
    nextAppointment: null,
    status: "discharged",
    visits: 4,
    carePlan: "Migraine prophylaxis with Topiramate. Lifestyle triggers identified: stress, caffeine, irregular sleep. Headache diary maintained.",
    medications: [
      { name: "Topiramate", dosage: "50mg", frequency: "Once daily at night" },
      { name: "Sumatriptan", dosage: "50mg", frequency: "As needed for acute attack" },
    ],
    vitals: { label: "BP", value: "118/72 mmHg", status: "normal" },
    history: [
      { date: "June 18, 2026", type: "Follow-up", summary: "Migraine frequency reduced from 6/month to 1/month. No aura episodes in 8 weeks. Stable on current therapy.", provider: "Dr. Sarah Jenkins" },
    ],
  },
  {
    id: "HS-PAT-006",
    name: "Oluwaseun Adeyemi",
    age: 41,
    sex: "Male",
    phone: "+234 812 555 6677",
    bloodType: "A-",
    genotype: "AA",
    insurance: "None",
    conditions: ["Peptic Ulcer Disease", "H. Pylori (eradicated)"],
    allergies: [],
    lastVisit: "June 15, 2026",
    nextAppointment: "July 15, 2026 — 11:00 AM",
    status: "follow-up",
    visits: 8,
    carePlan: "PUD managed. H. pylori triple therapy completed — confirmatory UBT negative. Continue PPI for 4 more weeks then taper.",
    medications: [
      { name: "Esomeprazole", dosage: "40mg", frequency: "Once daily before breakfast" },
    ],
    vitals: { label: "BP", value: "124/78 mmHg", status: "normal" },
    history: [
      { date: "June 15, 2026", type: "Lab Review", summary: "Urea breath test negative — H. pylori eradicated. Continue PPI 4 weeks then reassess.", provider: "Dr. Sarah Jenkins" },
      { date: "May 1, 2026", type: "Consultation", summary: "Epigastric pain, positive CLO test. Started triple therapy (PPI + Amoxicillin + Clarithromycin).", provider: "Dr. Sarah Jenkins" },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "ACTIVE", color: "bg-secondary-container/30 text-secondary" },
  "follow-up": { label: "FOLLOW-UP", color: "bg-tertiary-fixed/30 text-tertiary" },
  discharged: { label: "DISCHARGED", color: "bg-surface-container-high text-on-surface-variant" },
  critical: { label: "CRITICAL", color: "bg-error-container/50 text-error" },
};

const filterOptions: { key: string; label: string }[] = [
  { key: "all", label: "All Patients" },
  { key: "active", label: "Active" },
  { key: "critical", label: "Critical" },
  { key: "follow-up", label: "Follow-up" },
  { key: "discharged", label: "Discharged" },
];

export default function PatientsPage() {
  const [view, setView] = useState<View>("list");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detailTab, setDetailTab] = useState<"overview" | "history" | "medications" | "care-plan">("overview");

  const filtered = patients.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase())) || p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openPatient = (p: Patient) => {
    setSelectedPatient(p);
    setDetailTab("overview");
    setView("detail");
  };

  const counts = {
    all: patients.length,
    active: patients.filter((p) => p.status === "active").length,
    critical: patients.filter((p) => p.status === "critical").length,
    "follow-up": patients.filter((p) => p.status === "follow-up").length,
    discharged: patients.filter((p) => p.status === "discharged").length,
  };

  if (view === "detail" && selectedPatient) {
    const p = selectedPatient;
    const sc = statusConfig[p.status];
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back */}
        <button onClick={() => setView("list")} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          Back to Patients
        </button>

        {/* Patient Header */}
        <div className="bg-primary rounded-xl p-5 text-on-primary">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-on-primary/20 flex items-center justify-center text-xl font-bold shrink-0">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold">{p.name}</h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-on-primary/20`}>{sc.label}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-on-primary/70 flex-wrap">
                <span>{p.id}</span>
                <span>{p.age}y, {p.sex}</span>
                <span>Blood: {p.bloodType}</span>
                <span>Genotype: {p.genotype}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-on-primary/60">
                <span>{p.phone}</span>
                <span>{p.insurance}</span>
                <span>{p.visits} visits</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="px-3 py-2 rounded-lg bg-on-primary/20 text-xs font-semibold hover:bg-on-primary/30 transition-all">Start Telehealth</button>
              <button className="px-3 py-2 rounded-lg bg-on-primary/20 text-xs font-semibold hover:bg-on-primary/30 transition-all">New Prescription</button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {p.allergies.length > 0 && (
          <div className="bg-error-container/20 border border-error/20 rounded-xl p-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-error shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
            <span className="text-sm font-semibold text-error">Allergies: {p.allergies.join(", ")}</span>
          </div>
        )}

        {/* Detail Tabs */}
        <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
          {(["overview", "history", "medications", "care-plan"] as const).map((t) => (
            <button key={t} onClick={() => setDetailTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${detailTab === t ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
              {t.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Overview */}
        {detailTab === "overview" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Active Conditions</h3>
              {p.conditions.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-on-surface">{c}</span>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Latest Vitals</h3>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${p.vitals.status === "normal" ? "bg-secondary-container/30 text-secondary" : p.vitals.status === "elevated" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-error-container/50 text-error"}`}>
                  {p.vitals.label}
                </div>
                <div>
                  <div className="text-lg font-bold text-on-surface">{p.vitals.value}</div>
                  <div className={`text-xs font-semibold capitalize ${p.vitals.status === "normal" ? "text-secondary" : p.vitals.status === "elevated" ? "text-tertiary" : "text-error"}`}>{p.vitals.status}</div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-on-surface">Upcoming Appointment</h3>
              {p.nextAppointment ? (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  <span className="text-sm text-on-surface font-medium">{p.nextAppointment}</span>
                </div>
              ) : (
                <div className="text-sm text-on-surface-variant">No upcoming appointment</div>
              )}
              <button className="text-xs font-semibold text-primary hover:underline">Schedule Follow-up</button>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-on-surface">Patient Info</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-on-surface-variant">Last Visit:</span> <span className="font-medium text-on-surface">{p.lastVisit}</span></div>
                <div><span className="text-on-surface-variant">Total Visits:</span> <span className="font-medium text-on-surface">{p.visits}</span></div>
                <div><span className="text-on-surface-variant">Insurance:</span> <span className="font-medium text-on-surface">{p.insurance}</span></div>
                <div><span className="text-on-surface-variant">Phone:</span> <span className="font-medium text-on-surface">{p.phone}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {detailTab === "history" && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Visit History</h3>
            </div>
            {p.history.map((h, i) => (
              <div key={i} className="px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${h.type === "Emergency" ? "bg-error-container/50 text-error" : h.type === "Telehealth" ? "bg-primary/10 text-primary" : "bg-secondary-container/30 text-secondary"}`}>
                    {h.type === "Emergency" ? "!" : h.type === "Telehealth" ? "TV" : h.type === "Lab Review" ? "LR" : "C"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface">{h.type}</span>
                      <span className="text-xs text-on-surface-variant">{h.date}</span>
                    </div>
                    <div className="text-xs text-on-surface-variant">{h.provider}</div>
                  </div>
                </div>
                <p className="text-sm text-on-surface ml-11">{h.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* Medications */}
        {detailTab === "medications" && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Current Medications ({p.medications.length})</h3>
              <button className="text-xs font-semibold text-primary hover:underline">+ New Prescription</button>
            </div>
            {p.medications.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-on-surface">{m.name}</div>
                  <div className="text-xs text-on-surface-variant">{m.dosage} — {m.frequency}</div>
                </div>
                <button className="text-xs text-primary font-medium hover:underline">Edit</button>
              </div>
            ))}
          </div>
        )}

        {/* Care Plan */}
        {detailTab === "care-plan" && (
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface">Care Plan</h3>
                <button className="text-xs font-semibold text-primary hover:underline">Edit Plan</button>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">{p.carePlan}</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Follow-up Actions</h3>
              <div className="space-y-2">
                {p.nextAppointment && (
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary" readOnly />
                    <span className="text-on-surface">Follow-up appointment: {p.nextAppointment}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary" readOnly />
                  <span className="text-on-surface">Review lab results when available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary" readOnly checked />
                  <span className="text-on-surface line-through text-on-surface-variant">Update medication list</span>
                </div>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline">+ Add Action Item</button>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
              <div>
                <div className="text-sm font-bold text-primary">AI Care Suggestion</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Based on recent vitals and lab trends, consider ordering an HbA1c and comprehensive metabolic panel at the next visit to reassess glycemic control and renal function.</div>
              </div>
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
          <h1 className="text-2xl font-bold text-on-surface">My Patients</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">{patients.length} patients in your care</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active", value: counts.active, color: "text-secondary" },
          { label: "Critical", value: counts.critical, color: "text-error" },
          { label: "Follow-up", value: counts["follow-up"], color: "text-tertiary" },
          { label: "Discharged", value: counts.discharged, color: "text-on-surface-variant" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, condition, or patient ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {filterOptions.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === f.key ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
            {f.label} ({counts[f.key as keyof typeof counts]})
          </button>
        ))}
      </div>

      {/* Patient List */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {filtered.map((p) => {
          const sc = statusConfig[p.status];
          return (
            <button key={p.id} onClick={() => openPatient(p)} className="w-full flex items-center gap-4 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors text-left">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${p.status === "critical" ? "bg-error/10 text-error" : "bg-primary/10 text-primary"}`}>
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-on-surface">{p.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.color}`}>{sc.label}</span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">{p.age}y, {p.sex} · {p.conditions.join(", ")}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Last visit: {p.lastVisit} · {p.insurance}</div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                {p.nextAppointment ? (
                  <div className="text-xs text-primary font-medium">Next: {p.nextAppointment.split(" — ")[0]}</div>
                ) : (
                  <div className="text-xs text-on-surface-variant">No upcoming</div>
                )}
                <div className="text-[10px] text-on-surface-variant mt-0.5">{p.visits} visits</div>
              </div>
              <svg className="w-4 h-4 text-on-surface-variant shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-on-surface-variant">No patients match your search.</div>
        )}
      </div>
    </div>
  );
}
