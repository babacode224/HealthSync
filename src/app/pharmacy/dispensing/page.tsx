"use client";

import { useState } from "react";

type Tab = "queue" | "in-progress" | "completed";
type DispenseStatus = "pending" | "verifying" | "preparing" | "checking" | "ready" | "dispensed";
type InsuranceStatus = "verified" | "pending" | "denied" | "cash";

interface Prescription {
  id: string;
  patient: string;
  patientId: string;
  age: number;
  sex: string;
  doctor: string;
  medication: string;
  dosage: string;
  quantity: string;
  frequency: string;
  duration: string;
  type: "regular" | "controlled";
  insurance: InsuranceStatus;
  insuranceProvider?: string;
  copay?: string;
  status: DispenseStatus;
  receivedAt: string;
  interactions: string[];
  allergies: string[];
  notes?: string;
}

const prescriptions: Prescription[] = [
  { id: "RX-8901", patient: "Adebayo Oluwatobi", patientId: "HS-PAT-001", age: 54, sex: "Male", doctor: "Dr. Sarah Jenkins", medication: "Metformin HCl", dosage: "1000mg", quantity: "60 tablets", frequency: "Twice daily", duration: "30 days", type: "regular", insurance: "verified", insuranceProvider: "NHIS", copay: "₦850", status: "pending", receivedAt: "June 27, 2026 — 10:45 AM", interactions: [], allergies: ["Penicillin"] },
  { id: "RX-8902", patient: "Emeka Nwosu", patientId: "HS-PAT-004", age: 71, sex: "Male", doctor: "Dr. Sarah Jenkins", medication: "Furosemide", dosage: "40mg", quantity: "30 tablets", frequency: "Once daily (morning)", duration: "30 days", type: "regular", insurance: "verified", insuranceProvider: "AXA Mansard", copay: "₦450", status: "pending", receivedAt: "June 27, 2026 — 10:30 AM", interactions: ["Digoxin — monitor potassium levels"], allergies: [], notes: "Heart failure patient — monitor weight and electrolytes" },
  { id: "RX-8903", patient: "Fatima Bello", patientId: "HS-PAT-003", age: 62, sex: "Female", doctor: "Dr. Michael Obi", medication: "Diazepam", dosage: "5mg", quantity: "30 tablets", frequency: "As needed (max 3/day)", duration: "10 days", type: "controlled", insurance: "denied", copay: "₦3,200 (full)", status: "pending", receivedAt: "June 27, 2026 — 10:15 AM", interactions: [], allergies: ["Sulfonamides"], notes: "Schedule IV controlled substance — requires logbook entry" },
  { id: "RX-8899", patient: "Chioma Okafor", patientId: "HS-PAT-002", age: 29, sex: "Female", doctor: "Dr. Amara Obi", medication: "Montelukast Sodium", dosage: "10mg", quantity: "30 tablets", frequency: "Once daily (evening)", duration: "30 days", type: "regular", insurance: "verified", insuranceProvider: "Leadway Health", copay: "₦600", status: "verifying", receivedAt: "June 27, 2026 — 09:50 AM", interactions: [], allergies: [] },
  { id: "RX-8898", patient: "Amina Yusuf", patientId: "HS-PAT-005", age: 34, sex: "Female", doctor: "Dr. Michael Obi", medication: "Sumatriptan", dosage: "50mg", quantity: "12 tablets", frequency: "As needed for migraine", duration: "PRN", type: "regular", insurance: "cash", copay: "₦4,800", status: "preparing", receivedAt: "June 27, 2026 — 09:30 AM", interactions: ["SSRIs — serotonin syndrome risk"], allergies: [], notes: "Patient counselling: max 2 doses in 24hrs" },
  { id: "RX-8896", patient: "Oluwaseun Adeyemi", patientId: "HS-PAT-006", age: 41, sex: "Male", doctor: "Dr. Sarah Jenkins", medication: "Omeprazole", dosage: "20mg", quantity: "28 capsules", frequency: "Once daily (before breakfast)", duration: "28 days", type: "regular", insurance: "verified", insuranceProvider: "NHIS", copay: "₦350", status: "checking", receivedAt: "June 27, 2026 — 09:00 AM", interactions: [], allergies: [] },
  { id: "RX-8894", patient: "Bola Adeyemi", patientId: "HS-PAT-007", age: 47, sex: "Female", doctor: "Dr. Amara Obi", medication: "Amlodipine Besylate", dosage: "5mg", quantity: "30 tablets", frequency: "Once daily", duration: "30 days", type: "regular", insurance: "verified", insuranceProvider: "NHIS", copay: "₦500", status: "ready", receivedAt: "June 27, 2026 — 08:30 AM", interactions: [], allergies: [] },
  { id: "RX-8892", patient: "Tunde Ogundimu", patientId: "HS-PAT-008", age: 58, sex: "Male", doctor: "Dr. Sarah Jenkins", medication: "Atorvastatin", dosage: "20mg", quantity: "30 tablets", frequency: "Once daily (bedtime)", duration: "30 days", type: "regular", insurance: "verified", insuranceProvider: "AXA Mansard", copay: "₦700", status: "dispensed", receivedAt: "June 27, 2026 — 08:00 AM", interactions: [], allergies: [] },
  { id: "RX-8890", patient: "Ngozi Eze", patientId: "HS-PAT-009", age: 38, sex: "Female", doctor: "Dr. Michael Obi", medication: "Nitrofurantoin", dosage: "100mg", quantity: "14 capsules", frequency: "Twice daily with food", duration: "7 days", type: "regular", insurance: "pending", copay: "—", status: "dispensed", receivedAt: "June 27, 2026 — 07:30 AM", interactions: [], allergies: [], notes: "UTI treatment — complete full course" },
];

const dispenseSteps: { key: DispenseStatus; label: string }[] = [
  { key: "pending", label: "Received" },
  { key: "verifying", label: "Verify" },
  { key: "preparing", label: "Prepare" },
  { key: "checking", label: "Check" },
  { key: "ready", label: "Ready" },
  { key: "dispensed", label: "Dispensed" },
];

const insuranceColors: Record<InsuranceStatus, string> = {
  verified: "bg-secondary-container/30 text-secondary",
  pending: "bg-tertiary-fixed/30 text-tertiary",
  denied: "bg-error-container/50 text-error",
  cash: "bg-surface-container-high text-on-surface-variant",
};

export default function PharmacyDispensingPage() {
  const [tab, setTab] = useState<Tab>("queue");
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);

  const queue = prescriptions.filter((p) => ["pending", "verifying"].includes(p.status));
  const inProgress = prescriptions.filter((p) => ["preparing", "checking", "ready"].includes(p.status));
  const completed = prescriptions.filter((p) => p.status === "dispensed");
  const controlled = prescriptions.filter((p) => p.type === "controlled").length;

  const displayList = tab === "queue" ? queue : tab === "in-progress" ? inProgress : completed;

  const stats = [
    { label: "In Queue", value: queue.length, color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
    { label: "In Progress", value: inProgress.length, color: "text-primary", bg: "bg-primary/10" },
    { label: "Ready for Pickup", value: prescriptions.filter((p) => p.status === "ready").length, color: "text-secondary", bg: "bg-secondary-container/20" },
    { label: "Dispensed Today", value: completed.length, color: "text-on-surface", bg: "bg-surface-container-high" },
  ];

  const stepIndex = (s: DispenseStatus) => dispenseSteps.findIndex((st) => st.key === s);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Dispensing Queue</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Prescription verification, preparation, and dispensing workflow</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controlled substance alert */}
      {controlled > 0 && (
        <div className="bg-error-container/30 border border-error/20 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          <div>
            <div className="text-sm font-bold text-error">{controlled} controlled substance prescription{controlled > 1 ? "s" : ""} in queue</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Controlled substances require pharmacist verification, logbook entry, and patient ID confirmation before dispensing.</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "queue" as Tab, label: `Queue (${queue.length})` },
          { key: "in-progress" as Tab, label: `In Progress (${inProgress.length})` },
          { key: "completed" as Tab, label: `Completed (${completed.length})` },
        ]).map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedRx(null); }} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Prescription list */}
      {!selectedRx && (
        <div className="space-y-3">
          {displayList.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">No prescriptions in this category.</div>
          ) : (
            displayList.map((rx) => (
              <div key={rx.id} onClick={() => setSelectedRx(rx)} className={`bg-surface-container-lowest border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all ${rx.type === "controlled" ? "border-error/40" : "border-outline-variant"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-on-surface">{rx.patient}</span>
                      {rx.type === "controlled" && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error-container/50 text-error">CONTROLLED</span>}
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${insuranceColors[rx.insurance]}`}>
                        {rx.insurance === "verified" ? `${rx.insuranceProvider}` : rx.insurance === "cash" ? "CASH PAY" : rx.insurance === "denied" ? "DENIED" : "INS. PENDING"}
                      </span>
                    </div>
                    <div className="text-sm text-on-surface mt-1 font-medium">{rx.medication} {rx.dosage} — {rx.quantity}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{rx.frequency} · {rx.duration} · {rx.doctor}</div>

                    {rx.interactions.length > 0 && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                        <span className="text-xs text-error font-medium">Drug Interaction: {rx.interactions[0]}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
                      <span>{rx.id}</span>
                      <span>·</span>
                      <span>Received: {rx.receivedAt}</span>
                      {rx.copay && <><span>·</span><span className="font-medium">Copay: {rx.copay}</span></>}
                    </div>
                  </div>

                  {/* Mini stepper */}
                  <div className="shrink-0 flex flex-col items-center gap-0.5">
                    {dispenseSteps.map((step, i) => {
                      const current = stepIndex(rx.status);
                      const done = i <= current;
                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${done ? (rx.status === "dispensed" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                          {i < dispenseSteps.length - 1 && <div className={`w-0.5 h-2 ${i < current ? (rx.status === "dispensed" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Detail Panel */}
      {selectedRx && (
        <div className="space-y-4">
          <button onClick={() => setSelectedRx(null)} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            Back to {tab === "queue" ? "Queue" : tab === "in-progress" ? "In Progress" : "Completed"}
          </button>

          {/* Blue header */}
          <div className="bg-primary rounded-xl p-5 text-on-primary">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{selectedRx.medication} {selectedRx.dosage}</h2>
                  {selectedRx.type === "controlled" && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error text-on-error">CONTROLLED</span>}
                </div>
                <div className="text-sm text-on-primary/80 mt-0.5">{selectedRx.quantity} · {selectedRx.frequency}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{selectedRx.id}</div>
                <div className="text-xs text-on-primary/70">{selectedRx.receivedAt}</div>
              </div>
            </div>
          </div>

          {/* Dispensing stepper */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Dispensing Progress</h3>
            <div className="flex items-center">
              {dispenseSteps.map((step, i) => {
                const current = stepIndex(selectedRx.status);
                const done = i <= current;
                const isCurrent = i === current;
                return (
                  <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? (selectedRx.status === "dispensed" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary") : "bg-surface-container-high text-on-surface-variant"} ${isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}`}>
                        {done && i < current ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span className={`text-[10px] mt-1 ${isCurrent ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{step.label}</span>
                    </div>
                    {i < dispenseSteps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 ${i < current ? (selectedRx.status === "dispensed" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          {selectedRx.interactions.length > 0 && (
            <div className="bg-error-container/30 border border-error/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <div>
                <div className="text-xs font-bold text-error">Drug Interaction Alert</div>
                {selectedRx.interactions.map((int, i) => (
                  <div key={i} className="text-xs text-on-surface mt-1">{int}</div>
                ))}
              </div>
            </div>
          )}

          {selectedRx.allergies.length > 0 && (
            <div className="bg-tertiary-fixed/20 border border-tertiary/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <div>
                <div className="text-xs font-bold text-tertiary">Patient Allergies</div>
                <div className="text-xs text-on-surface mt-1">{selectedRx.allergies.join(", ")}</div>
              </div>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Patient Information</h3>
              {[
                { label: "Patient", value: selectedRx.patient },
                { label: "Patient ID", value: selectedRx.patientId },
                { label: "Age / Sex", value: `${selectedRx.age} yrs / ${selectedRx.sex}` },
                { label: "Prescribing Doctor", value: selectedRx.doctor },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">{r.label}</span>
                  <span className="text-on-surface font-medium">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Insurance & Payment</h3>
              {[
                { label: "Insurance Status", value: selectedRx.insurance.charAt(0).toUpperCase() + selectedRx.insurance.slice(1) },
                { label: "Provider", value: selectedRx.insuranceProvider || "N/A" },
                { label: "Patient Copay", value: selectedRx.copay || "—" },
                { label: "Prescription Type", value: selectedRx.type === "controlled" ? "Controlled Substance" : "Regular" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">{r.label}</span>
                  <span className="text-on-surface font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedRx.notes && (
            <div className="bg-tertiary-fixed/10 border border-tertiary/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-4 h-4 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <div>
                <div className="text-xs font-bold text-tertiary">Pharmacist Notes</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{selectedRx.notes}</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {selectedRx.status === "pending" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Begin Verification</button>
            )}
            {selectedRx.status === "verifying" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Approve & Prepare</button>
            )}
            {selectedRx.status === "preparing" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Send to Final Check</button>
            )}
            {selectedRx.status === "checking" && (
              <button className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all">Mark Ready for Pickup</button>
            )}
            {selectedRx.status === "ready" && (
              <button className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all">Confirm Dispensed</button>
            )}
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-all">Print Label</button>
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-all">Contact Doctor</button>
            {selectedRx.status !== "dispensed" && (
              <button className="px-4 py-2 rounded-xl border border-error/30 text-error text-sm font-medium hover:bg-error-container/20 transition-all">Reject Prescription</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
