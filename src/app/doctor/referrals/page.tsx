"use client";

import { useState } from "react";

type Tab = "outgoing" | "incoming" | "create";
type ReferralStatus = "sent" | "accepted" | "scheduled" | "completed" | "declined";
type Urgency = "routine" | "urgent" | "emergency";

interface Referral {
  id: string;
  patient: string;
  patientId: string;
  age: number;
  sex: string;
  direction: "outgoing" | "incoming";
  specialty: string;
  referredTo?: string;
  referredFrom?: string;
  facility: string;
  urgency: Urgency;
  status: ReferralStatus;
  reason: string;
  diagnosis: string;
  notes: string;
  sentDate: string;
  appointmentDate?: string;
}

const referrals: Referral[] = [
  { id: "REF-1201", patient: "Emeka Nwosu", patientId: "HS-PAT-004", age: 71, sex: "Male", direction: "outgoing", specialty: "Cardiology", referredTo: "Dr. Chukwuma Eze", facility: "Lagos University Teaching Hospital", urgency: "urgent", status: "accepted", reason: "Worsening heart failure — EF declined to 35%, needs advanced cardiac evaluation", diagnosis: "Heart Failure (NYHA Class III), Atrial Fibrillation", notes: "Patient on max tolerated Furosemide 80mg BD. Consider CRT evaluation. Recent echo and BNP results attached.", sentDate: "June 26, 2026", appointmentDate: "June 30, 2026" },
  { id: "REF-1200", patient: "Fatima Bello", patientId: "HS-PAT-003", age: 62, sex: "Female", direction: "outgoing", specialty: "Rheumatology", referredTo: "Dr. Amaka Nwankwo", facility: "National Hospital Abuja", urgency: "routine", status: "sent", reason: "RA flare-up unresponsive to current DMARD therapy — consider biologic escalation", diagnosis: "Rheumatoid Arthritis, Osteoporosis", notes: "Failed Methotrexate + Sulfasalazine combo. DAS28 score 5.8. X-rays show progressive joint erosion.", sentDate: "June 27, 2026" },
  { id: "REF-1199", patient: "Adebayo Oluwatobi", patientId: "HS-PAT-001", age: 54, sex: "Male", direction: "outgoing", specialty: "Ophthalmology", referredTo: "Dr. Bisi Oladele", facility: "Eye Foundation Hospital", urgency: "routine", status: "scheduled", reason: "Annual diabetic retinopathy screening — last exam 14 months ago", diagnosis: "Type 2 Diabetes Mellitus", notes: "HbA1c 7.8%. On Metformin 1000mg BD + Glimepiride 2mg. No visual complaints but overdue for screening.", sentDate: "June 24, 2026", appointmentDate: "July 3, 2026" },
  { id: "REF-1198", patient: "Tunde Ogundimu", patientId: "HS-PAT-008", age: 58, sex: "Male", direction: "outgoing", specialty: "Nephrology", referredTo: "Dr. Folake Adeniyi", facility: "Lagos University Teaching Hospital", urgency: "routine", status: "completed", reason: "eGFR trending down — 52 → 45 over 6 months, needs nephrology assessment", diagnosis: "CKD Stage 3a, Hypertension", notes: "Completed nephrology consultation. Recommendation: reduce NSAID use, start ACE inhibitor, recheck in 3 months.", sentDate: "June 10, 2026", appointmentDate: "June 18, 2026" },
  { id: "REF-1197", patient: "Ngozi Eze", patientId: "HS-PAT-009", age: 38, sex: "Female", direction: "incoming", specialty: "Internal Medicine", referredFrom: "Dr. Kunle Abiodun", facility: "General Hospital Ikeja", urgency: "urgent", status: "accepted", reason: "Recurrent UTIs (4th episode in 6 months) — needs workup for underlying cause", diagnosis: "Recurrent UTI, ? Structural anomaly", notes: "Urine culture positive for E. coli (resistant to Ciprofloxacin). Renal USS requested.", sentDate: "June 25, 2026", appointmentDate: "June 28, 2026" },
  { id: "REF-1196", patient: "Ibrahim Musa", patientId: "HS-PAT-010", age: 66, sex: "Male", direction: "incoming", specialty: "Internal Medicine", referredFrom: "Dr. Yemi Olatunde", facility: "Federal Medical Centre Abeokuta", urgency: "routine", status: "sent", reason: "Elevated PSA (8.2 ng/mL) — needs further evaluation and urology referral coordination", diagnosis: "Elevated PSA, BPH", notes: "Digital rectal exam: enlarged prostate, no nodules. Family history of prostate cancer (father).", sentDate: "June 26, 2026" },
];

const urgencyColors: Record<Urgency, string> = {
  routine: "bg-surface-container-high text-on-surface-variant",
  urgent: "bg-tertiary-fixed/30 text-tertiary",
  emergency: "bg-error-container/50 text-error",
};

const statusColors: Record<ReferralStatus, string> = {
  sent: "bg-tertiary-fixed/30 text-tertiary",
  accepted: "bg-primary/10 text-primary",
  scheduled: "bg-primary/10 text-primary",
  completed: "bg-secondary-container/30 text-secondary",
  declined: "bg-error-container/50 text-error",
};

export default function DoctorReferralsPage() {
  const [tab, setTab] = useState<Tab>("outgoing");
  const [selectedRef, setSelectedRef] = useState<Referral | null>(null);

  const outgoing = referrals.filter((r) => r.direction === "outgoing");
  const incoming = referrals.filter((r) => r.direction === "incoming");

  const stats = [
    { label: "Outgoing", value: outgoing.length, color: "text-primary", bg: "bg-primary/10" },
    { label: "Incoming", value: incoming.length, color: "text-secondary", bg: "bg-secondary-container/20" },
    { label: "Awaiting Response", value: referrals.filter((r) => r.status === "sent").length, color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
    { label: "Completed", value: referrals.filter((r) => r.status === "completed").length, color: "text-on-surface", bg: "bg-surface-container-high" },
  ];

  const displayList = tab === "outgoing" ? outgoing : incoming;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Referrals & Handoffs</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Specialist referrals, patient handoffs, and coordination</p>
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

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "outgoing" as Tab, label: `Outgoing (${outgoing.length})` },
          { key: "incoming" as Tab, label: `Incoming (${incoming.length})` },
          { key: "create" as Tab, label: "New Referral" },
        ]).map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedRef(null); }} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Referral List */}
      {(tab === "outgoing" || tab === "incoming") && !selectedRef && (
        <div className="space-y-3">
          {displayList.map((ref) => (
            <div key={ref.id} onClick={() => setSelectedRef(ref)} className={`bg-surface-container-lowest border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all ${ref.urgency === "emergency" ? "border-error/40" : ref.urgency === "urgent" ? "border-tertiary/30" : "border-outline-variant"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-on-surface">{ref.patient}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${urgencyColors[ref.urgency]}`}>{ref.urgency.toUpperCase()}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusColors[ref.status]}`}>{ref.status.toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-on-surface mt-1">
                    <span className="font-medium">{ref.specialty}</span>
                    <span className="text-on-surface-variant"> → {tab === "outgoing" ? ref.referredTo : ref.referredFrom}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1 line-clamp-2">{ref.reason}</div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
                    <span>{ref.id}</span>
                    <span>·</span>
                    <span>{ref.facility}</span>
                    <span>·</span>
                    <span>Sent: {ref.sentDate}</span>
                    {ref.appointmentDate && <><span>·</span><span className="font-medium text-primary">Appt: {ref.appointmentDate}</span></>}
                  </div>
                </div>
                <svg className="w-5 h-5 text-on-surface-variant shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Referral */}
      {tab === "create" && !selectedRef && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-5">
          <h3 className="text-lg font-bold text-on-surface">Create New Referral</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Patient</label>
              <select className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select patient...</option>
                <option>Adebayo Oluwatobi (HS-PAT-001)</option>
                <option>Chioma Okafor (HS-PAT-002)</option>
                <option>Fatima Bello (HS-PAT-003)</option>
                <option>Emeka Nwosu (HS-PAT-004)</option>
                <option>Amina Yusuf (HS-PAT-005)</option>
                <option>Oluwaseun Adeyemi (HS-PAT-006)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Specialty</label>
              <select className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select specialty...</option>
                <option>Cardiology</option>
                <option>Endocrinology</option>
                <option>Gastroenterology</option>
                <option>Nephrology</option>
                <option>Neurology</option>
                <option>Oncology</option>
                <option>Ophthalmology</option>
                <option>Orthopedics</option>
                <option>Pulmonology</option>
                <option>Rheumatology</option>
                <option>Urology</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Referring To (Doctor)</label>
              <input type="text" placeholder="Dr. name or search..." className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Facility</label>
              <input type="text" placeholder="Hospital or clinic name..." className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Urgency</label>
              <select className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Routine</option>
                <option>Urgent</option>
                <option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-on-surface-variant">Primary Diagnosis</label>
              <input type="text" placeholder="ICD-10 code or description..." className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface-variant">Reason for Referral</label>
            <textarea rows={3} placeholder="Describe the clinical reason for this referral..." className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface-variant">Clinical Notes & Handoff Information</label>
            <textarea rows={4} placeholder="Include relevant history, current medications, test results, and specific questions for the specialist..." className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>
            <div>
              <div className="text-xs font-bold text-primary">Attachments</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Recent lab results, imaging reports, and consultation notes will be automatically included with the referral.</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Send Referral</button>
            <button className="px-6 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Save as Draft</button>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedRef && (
        <div className="space-y-4">
          <button onClick={() => setSelectedRef(null)} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            Back to {selectedRef.direction === "outgoing" ? "Outgoing" : "Incoming"}
          </button>

          {/* Header */}
          <div className="bg-primary rounded-xl p-5 text-on-primary">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{selectedRef.patient}</h2>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${selectedRef.urgency === "urgent" ? "bg-tertiary-fixed text-tertiary" : selectedRef.urgency === "emergency" ? "bg-error text-on-error" : "bg-on-primary/20 text-on-primary"}`}>{selectedRef.urgency.toUpperCase()}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary">{selectedRef.status.toUpperCase()}</span>
                </div>
                <div className="text-sm text-on-primary/80 mt-0.5">{selectedRef.patientId} · {selectedRef.age} yrs · {selectedRef.sex}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{selectedRef.id}</div>
                <div className="text-xs text-on-primary/70">Sent: {selectedRef.sentDate}</div>
              </div>
            </div>
          </div>

          {/* Status timeline */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Referral Progress</h3>
            <div className="flex items-center">
              {(["sent", "accepted", "scheduled", "completed"] as ReferralStatus[]).map((step, i) => {
                const steps: ReferralStatus[] = ["sent", "accepted", "scheduled", "completed"];
                const current = steps.indexOf(selectedRef.status === "declined" ? "sent" : selectedRef.status);
                const done = i <= current;
                const isCurrent = i === current;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-initial">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? (selectedRef.status === "completed" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary") : "bg-surface-container-high text-on-surface-variant"} ${isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}`}>
                        {done && i < current ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span className={`text-[10px] mt-1 capitalize ${isCurrent ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{step}</span>
                    </div>
                    {i < 3 && (
                      <div className={`h-0.5 flex-1 mx-1 ${i < current ? (selectedRef.status === "completed" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Referral Details</h3>
              {[
                { label: "Specialty", value: selectedRef.specialty },
                { label: selectedRef.direction === "outgoing" ? "Referred To" : "Referred From", value: selectedRef.direction === "outgoing" ? selectedRef.referredTo! : selectedRef.referredFrom! },
                { label: "Facility", value: selectedRef.facility },
                { label: "Diagnosis", value: selectedRef.diagnosis },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs gap-2">
                  <span className="text-on-surface-variant shrink-0">{r.label}</span>
                  <span className="text-on-surface font-medium text-right">{r.value}</span>
                </div>
              ))}
              {selectedRef.appointmentDate && (
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Appointment</span>
                  <span className="text-primary font-bold">{selectedRef.appointmentDate}</span>
                </div>
              )}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Reason for Referral</h3>
              <p className="text-xs text-on-surface leading-relaxed">{selectedRef.reason}</p>
            </div>
          </div>

          {/* Clinical notes */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-2">Clinical Notes & Handoff</h3>
            <p className="text-xs text-on-surface leading-relaxed">{selectedRef.notes}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {selectedRef.direction === "incoming" && selectedRef.status === "sent" && (
              <>
                <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Accept Referral</button>
                <button className="px-4 py-2 rounded-xl border border-error/30 text-error text-sm font-medium hover:bg-error-container/20 transition-all">Decline</button>
              </>
            )}
            {selectedRef.status === "accepted" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Schedule Appointment</button>
            )}
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-all">Generate Referral Letter</button>
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-all">Message {selectedRef.direction === "outgoing" ? "Specialist" : "Referring Doctor"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
