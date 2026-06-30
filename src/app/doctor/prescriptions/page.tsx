"use client";

import { useState } from "react";

type Medication = { name: string; dosage: string; frequency: string; duration: string; route: string; instructions: string };
type Prescription = { id: string; patient: string; avatar: string; avatarBg: string; date: string; medications: Medication[]; status: "active" | "completed" | "cancelled"; diagnosis: string };

const recentPrescriptions: Prescription[] = [
  { id: "RX-49301", patient: "Adaeze Okafor", avatar: "AO", avatarBg: "bg-primary", date: "Jun 23, 2026", medications: [{ name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", route: "Oral", instructions: "Take in the morning with water" }], status: "active", diagnosis: "Essential Hypertension" },
  { id: "RX-49298", patient: "Bayo Yusuf", avatar: "BY", avatarBg: "bg-secondary", date: "Jun 22, 2026", medications: [{ name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days", route: "Oral", instructions: "Take with meals" }, { name: "Glimepiride", dosage: "2mg", frequency: "Once daily", duration: "90 days", route: "Oral", instructions: "Take before breakfast" }], status: "active", diagnosis: "Type 2 Diabetes Mellitus" },
  { id: "RX-49285", patient: "Chioma Eze", avatar: "CE", avatarBg: "bg-tertiary", date: "Jun 20, 2026", medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days", route: "Oral", instructions: "Complete full course" }], status: "completed", diagnosis: "Acute Bacterial Sinusitis" },
  { id: "RX-49270", patient: "Marcus Johnson", avatar: "MJ", avatarBg: "bg-primary", date: "Jun 18, 2026", medications: [{ name: "Ibuprofen", dosage: "400mg", frequency: "Three times daily", duration: "5 days", route: "Oral", instructions: "Take with food. Do not exceed 1200mg/day." }], status: "completed", diagnosis: "Acute Lower Back Pain" },
  { id: "RX-49260", patient: "Fatima Bello", avatar: "FB", avatarBg: "bg-secondary", date: "Jun 16, 2026", medications: [{ name: "Sumatriptan", dosage: "50mg", frequency: "As needed", duration: "30 days", route: "Oral", instructions: "Take at onset of migraine. Max 2 tablets in 24 hours." }], status: "active", diagnosis: "Migraine with Aura" },
];

const drugInteractions = [
  { drugs: ["Lisinopril", "Potassium"], severity: "high" as const, message: "Risk of hyperkalemia. Monitor serum potassium levels closely." },
  { drugs: ["Metformin", "Contrast Dye"], severity: "high" as const, message: "Discontinue metformin 48 hours before contrast procedures." },
  { drugs: ["Ibuprofen", "Aspirin"], severity: "moderate" as const, message: "NSAIDs may reduce the cardioprotective effects of low-dose aspirin." },
  { drugs: ["Amoxicillin", "Warfarin"], severity: "moderate" as const, message: "May enhance the anticoagulant effect. Monitor INR more frequently." },
  { drugs: ["Sumatriptan", "SSRI"], severity: "high" as const, message: "Risk of serotonin syndrome. Use with extreme caution." },
];

const frequencies = ["Once daily", "Twice daily", "Three times daily", "Four times daily", "Every 8 hours", "Every 12 hours", "As needed", "At bedtime"];
const routes = ["Oral", "Topical", "Intravenous", "Intramuscular", "Subcutaneous", "Inhalation", "Rectal", "Sublingual"];
const durations = ["3 days", "5 days", "7 days", "10 days", "14 days", "21 days", "30 days", "60 days", "90 days", "Ongoing"];

const patients = [
  { name: "Adaeze Okafor", id: "PT-10234", avatar: "AO", avatarBg: "bg-primary" },
  { name: "Bayo Yusuf", id: "PT-10189", avatar: "BY", avatarBg: "bg-secondary" },
  { name: "Chioma Eze", id: "PT-10301", avatar: "CE", avatarBg: "bg-tertiary" },
  { name: "Marcus Johnson", id: "PT-10156", avatar: "MJ", avatarBg: "bg-primary" },
  { name: "Fatima Bello", id: "PT-10278", avatar: "FB", avatarBg: "bg-secondary" },
];

type View = "list" | "new" | "preview";

export default function PrescriptionsPage() {
  const [view, setView] = useState<View>("list");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState<Medication[]>([{ name: "", dosage: "", frequency: "Once daily", duration: "7 days", route: "Oral", instructions: "" }]);
  const [showInteractions, setShowInteractions] = useState(false);
  const [viewingRx, setViewingRx] = useState<Prescription | null>(null);

  const addMedication = () => setMedications([...medications, { name: "", dosage: "", frequency: "Once daily", duration: "7 days", route: "Oral", instructions: "" }]);
  const removeMedication = (i: number) => setMedications(medications.filter((_, idx) => idx !== i));
  const updateMed = (i: number, field: keyof Medication, value: string) => setMedications(medications.map((m, idx) => idx === i ? { ...m, [field]: value } : m));

  const activeInteractions = drugInteractions.filter((di) => medications.some((m) => di.drugs.some((d) => m.name.toLowerCase().includes(d.toLowerCase()))));

  const checkInteractions = () => {
    setShowInteractions(true);
    setTimeout(() => setShowInteractions(false), 8000);
  };

  const patient = patients.find((p) => p.name === selectedPatient);

  // View prescription detail
  if (viewingRx) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => setViewingRx(null)} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back
        </button>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-on-primary">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                  <span className="text-sm font-bold">{viewingRx.id}</span>
                </div>
                <h2 className="text-xl font-bold">Digital Prescription</h2>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${viewingRx.status === "active" ? "bg-on-primary/20 text-on-primary" : viewingRx.status === "completed" ? "bg-secondary text-on-secondary" : "bg-error text-on-error"}`}>
                {viewingRx.status.charAt(0).toUpperCase() + viewingRx.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Patient + Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Patient</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-8 h-8 rounded-full ${viewingRx.avatarBg} flex items-center justify-center text-white text-[10px] font-bold`}>{viewingRx.avatar}</div>
                  <span className="text-sm font-semibold text-on-surface">{viewingRx.patient}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Date Issued</span>
                <div className="text-sm font-semibold text-on-surface mt-1">{viewingRx.date}</div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Diagnosis</span>
              <div className="text-sm font-semibold text-on-surface mt-1">{viewingRx.diagnosis}</div>
            </div>

            {/* Medications */}
            <div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Medications</span>
              <div className="space-y-3 mt-2">
                {viewingRx.medications.map((med, i) => (
                  <div key={i} className="bg-surface-container-low rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                      <h4 className="text-sm font-bold text-on-surface">{med.name} {med.dosage}</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-on-surface-variant">Frequency:</span><div className="font-medium text-on-surface">{med.frequency}</div></div>
                      <div><span className="text-on-surface-variant">Duration:</span><div className="font-medium text-on-surface">{med.duration}</div></div>
                      <div><span className="text-on-surface-variant">Route:</span><div className="font-medium text-on-surface">{med.route}</div></div>
                    </div>
                    {med.instructions && <p className="text-xs text-on-surface-variant mt-2 italic">{med.instructions}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Digital signature */}
            <div className="border-t border-outline-variant pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">SJ</div>
                <div>
                  <div className="text-sm font-bold text-on-surface">Dr. Sarah Jenkins</div>
                  <div className="text-xs text-on-surface-variant">General Practitioner • MDCN License #MD-28451</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-outline">
                <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                Digitally signed • Verified by HealthSync AI • Tamper-proof
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface-variant hover:border-primary transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12.75h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" /></svg>
            Print
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
            Send to Pharmacy
          </button>
        </div>
      </div>
    );
  }

  // New prescription form
  if (view === "new") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back
        </button>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-on-surface">Issue New Prescription</h2>
          <button onClick={checkInteractions} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-tertiary text-tertiary text-xs font-bold hover:bg-tertiary-fixed/30 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
            Check Interactions
          </button>
        </div>

        {/* AI Interaction Alert */}
        {showInteractions && activeInteractions.length > 0 && (
          <div className="space-y-2">
            {activeInteractions.map((interaction, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg p-4 border ${interaction.severity === "high" ? "bg-error-container/50 border-error/30" : "bg-tertiary-fixed/30 border-tertiary-fixed-dim/30"}`}>
                <svg className={`w-5 h-5 shrink-0 mt-0.5 ${interaction.severity === "high" ? "text-error" : "text-tertiary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                <div>
                  <div className={`text-xs font-bold ${interaction.severity === "high" ? "text-error" : "text-tertiary"}`}>
                    {interaction.severity === "high" ? "HIGH RISK" : "MODERATE"}: {interaction.drugs.join(" + ")}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{interaction.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {showInteractions && activeInteractions.length === 0 && (
          <div className="flex items-center gap-3 rounded-lg p-4 border border-secondary/30 bg-secondary-container/30">
            <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <p className="text-xs text-on-surface-variant"><strong className="text-secondary">No interactions detected.</strong> AI analysis complete — the prescribed medications are safe to use together.</p>
          </div>
        )}

        {/* Patient */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-3">Patient Information</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Select Patient</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                <option value="">Choose a patient...</option>
                {patients.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.id})</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Diagnosis / Condition</label>
              <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g., Essential Hypertension" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
          </div>
          {patient && (
            <div className="flex items-center gap-3 mt-3 p-3 bg-primary-fixed/30 rounded-lg">
              <div className={`w-10 h-10 rounded-full ${patient.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>{patient.avatar}</div>
              <div>
                <div className="text-sm font-semibold text-on-surface">{patient.name}</div>
                <div className="text-xs text-on-surface-variant">{patient.id} • No known drug allergies</div>
              </div>
            </div>
          )}
        </div>

        {/* Medications */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-on-surface">Medications</h3>
            <button onClick={addMedication} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Add Medication
            </button>
          </div>

          <div className="space-y-4">
            {medications.map((med, i) => (
              <div key={i} className="border border-outline-variant rounded-lg p-4 relative">
                {medications.length > 1 && (
                  <button onClick={() => removeMedication(i)} className="absolute top-2 right-2 p-1 rounded hover:bg-error-container/50 transition-colors" title="Remove">
                    <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Medication {i + 1}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Drug Name</label>
                    <input value={med.name} onChange={(e) => updateMed(i, "name", e.target.value)} placeholder="e.g., Lisinopril" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Dosage</label>
                    <input value={med.dosage} onChange={(e) => updateMed(i, "dosage", e.target.value)} placeholder="e.g., 10mg" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Frequency</label>
                    <select value={med.frequency} onChange={(e) => updateMed(i, "frequency", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                      {frequencies.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Duration</label>
                    <select value={med.duration} onChange={(e) => updateMed(i, "duration", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                      {durations.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Route</label>
                    <select value={med.route} onChange={(e) => updateMed(i, "route", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                      {routes.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Special Instructions</label>
                    <input value={med.instructions} onChange={(e) => updateMed(i, "instructions", e.target.value)} placeholder="e.g., Take with food" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-3">Additional Notes</h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes for the pharmacist or patient..." rows={3} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
        </div>

        {/* Actions */}
        <div className="flex items-start gap-3 bg-primary-fixed/50 border border-primary-fixed-dim/30 rounded-lg p-4">
          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            This prescription will be digitally signed with your MDCN credentials and sent securely to the patient&apos;s preferred pharmacy. It complies with Nigerian pharmaceutical regulations.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => setView("list")} className="px-6 py-3 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface-variant hover:border-primary transition-all">
            Cancel
          </button>
          <button className="px-5 py-3 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface hover:border-primary transition-all">
            Save as Draft
          </button>
          <button onClick={() => setView("list")} className="px-8 py-3 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
            Sign & Send to Pharmacy
          </button>
        </div>
      </div>
    );
  }

  // Prescription list
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Prescriptions</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Manage and issue digital prescriptions.</p>
        </div>
        <button onClick={() => setView("new")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm self-start">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          New Prescription
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active", value: "12", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>, color: "text-primary bg-primary-fixed" },
          { label: "This Month", value: "47", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>, color: "text-secondary bg-secondary-container/30" },
          { label: "Pending Refills", value: "5", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
          { label: "Interactions Flagged", value: "2", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>, color: "text-error bg-error-container/50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className="text-xl font-bold text-on-surface">{stat.value}</div>
                <div className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription table */}
      <div>
        <h3 className="text-sm font-bold text-on-surface mb-3">Recent Prescriptions</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="hidden lg:grid grid-cols-6 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Rx ID</span>
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Patient</span>
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Diagnosis</span>
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Medications</span>
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
            <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Action</span>
          </div>
          {recentPrescriptions.map((rx, i) => (
            <div key={rx.id} className={`grid lg:grid-cols-6 gap-2 lg:gap-0 items-center px-5 py-3.5 hover:bg-surface-container-low transition-colors cursor-pointer ${i < recentPrescriptions.length - 1 ? "border-b border-outline-variant" : ""}`} onClick={() => setViewingRx(rx)}>
              <div>
                <span className="text-sm font-bold text-primary">{rx.id}</span>
                <span className="text-[10px] text-on-surface-variant block lg:mt-0.5">{rx.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${rx.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{rx.avatar}</div>
                <span className="text-sm text-on-surface">{rx.patient}</span>
              </div>
              <div className="text-sm text-on-surface-variant truncate">{rx.diagnosis}</div>
              <div className="text-sm text-on-surface">
                {rx.medications.map((m) => m.name).join(", ")}
                <span className="text-[10px] text-on-surface-variant block">{rx.medications.length} item{rx.medications.length > 1 ? "s" : ""}</span>
              </div>
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${rx.status === "active" ? "bg-secondary-container/50 text-secondary" : rx.status === "completed" ? "bg-surface-container-high text-on-surface-variant" : "bg-error-container text-error"}`}>
                  {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" title="View" onClick={(e) => { e.stopPropagation(); setViewingRx(rx); }}>
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                </button>
                <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" title="Refill" onClick={(e) => e.stopPropagation()}>
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
