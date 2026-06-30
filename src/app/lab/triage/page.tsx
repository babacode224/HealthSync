"use client";

import { useState } from "react";

type Tab = "queue" | "tracking" | "rejected";
type SampleStatus = "pending" | "collected" | "in-transit" | "processing" | "complete";
type Priority = "routine" | "urgent" | "stat";

interface Sample {
  id: string;
  sampleId: string;
  patient: string;
  patientId: string;
  age: number;
  sex: string;
  test: string;
  testType: string;
  sampleType: string;
  doctor: string;
  priority: Priority;
  status: SampleStatus;
  orderedAt: string;
  collectedAt?: string;
  receivedAt?: string;
  notes?: string;
}

const samples: Sample[] = [
  { id: "ORD-3201", sampleId: "SMP-90421", patient: "Adebayo Oluwatobi", patientId: "HS-PAT-001", age: 54, sex: "Male", test: "Complete Blood Count (CBC)", testType: "Hematology", sampleType: "Whole Blood (EDTA)", doctor: "Dr. Sarah Jenkins", priority: "routine", status: "pending", orderedAt: "June 27, 2026 — 10:30 AM" },
  { id: "ORD-3202", sampleId: "SMP-90422", patient: "Fatima Bello", patientId: "HS-PAT-003", age: 62, sex: "Female", test: "Erythrocyte Sedimentation Rate", testType: "Hematology", sampleType: "Whole Blood (EDTA)", doctor: "Dr. Michael Obi", priority: "urgent", status: "pending", orderedAt: "June 27, 2026 — 10:15 AM", notes: "RA flare-up — monitor inflammation markers" },
  { id: "ORD-3203", sampleId: "SMP-90423", patient: "Emeka Nwosu", patientId: "HS-PAT-004", age: 71, sex: "Male", test: "Troponin I (High Sensitivity)", testType: "Cardiac", sampleType: "Serum (SST)", doctor: "Dr. Sarah Jenkins", priority: "stat", status: "pending", orderedAt: "June 27, 2026 — 10:05 AM", notes: "Chest pain presentation — STAT processing required" },
  { id: "ORD-3198", sampleId: "SMP-90418", patient: "Chioma Okafor", patientId: "HS-PAT-002", age: 29, sex: "Female", test: "Lipid Panel", testType: "Chemistry", sampleType: "Serum (SST)", doctor: "Dr. Amara Obi", priority: "routine", status: "collected", orderedAt: "June 27, 2026 — 09:45 AM", collectedAt: "June 27, 2026 — 10:10 AM" },
  { id: "ORD-3197", sampleId: "SMP-90417", patient: "Amina Yusuf", patientId: "HS-PAT-005", age: 34, sex: "Female", test: "Thyroid Function (TSH, T3, T4)", testType: "Endocrine", sampleType: "Serum (SST)", doctor: "Dr. Michael Obi", priority: "routine", status: "collected", orderedAt: "June 27, 2026 — 09:30 AM", collectedAt: "June 27, 2026 — 09:55 AM" },
  { id: "ORD-3195", sampleId: "SMP-90415", patient: "Oluwaseun Adeyemi", patientId: "HS-PAT-006", age: 41, sex: "Male", test: "H. pylori Antibody", testType: "Immunology", sampleType: "Serum (SST)", doctor: "Dr. Sarah Jenkins", priority: "urgent", status: "in-transit", orderedAt: "June 27, 2026 — 09:00 AM", collectedAt: "June 27, 2026 — 09:20 AM", receivedAt: "June 27, 2026 — 09:45 AM" },
  { id: "ORD-3193", sampleId: "SMP-90413", patient: "Bola Adeyemi", patientId: "HS-PAT-007", age: 47, sex: "Female", test: "HbA1c", testType: "Chemistry", sampleType: "Whole Blood (EDTA)", doctor: "Dr. Amara Obi", priority: "routine", status: "processing", orderedAt: "June 27, 2026 — 08:30 AM", collectedAt: "June 27, 2026 — 08:50 AM", receivedAt: "June 27, 2026 — 09:15 AM" },
  { id: "ORD-3191", sampleId: "SMP-90411", patient: "Tunde Ogundimu", patientId: "HS-PAT-008", age: 58, sex: "Male", test: "Comprehensive Metabolic Panel", testType: "Chemistry", sampleType: "Serum (SST)", doctor: "Dr. Sarah Jenkins", priority: "routine", status: "processing", orderedAt: "June 27, 2026 — 08:00 AM", collectedAt: "June 27, 2026 — 08:20 AM", receivedAt: "June 27, 2026 — 08:45 AM" },
  { id: "ORD-3189", sampleId: "SMP-90409", patient: "Ngozi Eze", patientId: "HS-PAT-009", age: 38, sex: "Female", test: "Urinalysis + Culture", testType: "Microbiology", sampleType: "Midstream Urine", doctor: "Dr. Michael Obi", priority: "urgent", status: "complete", orderedAt: "June 27, 2026 — 07:30 AM", collectedAt: "June 27, 2026 — 07:45 AM", receivedAt: "June 27, 2026 — 08:10 AM" },
  { id: "ORD-3187", sampleId: "SMP-90407", patient: "Ibrahim Musa", patientId: "HS-PAT-010", age: 66, sex: "Male", test: "Prostate Specific Antigen (PSA)", testType: "Tumor Markers", sampleType: "Serum (SST)", doctor: "Dr. Amara Obi", priority: "routine", status: "complete", orderedAt: "June 27, 2026 — 07:00 AM", collectedAt: "June 27, 2026 — 07:20 AM", receivedAt: "June 27, 2026 — 07:40 AM" },
];

const rejectedSamples = [
  { id: "SMP-90410", patient: "Kemi Afolabi", test: "Blood Culture", reason: "Hemolyzed specimen", rejectedBy: "Tech. David Akinwale", rejectedAt: "June 27, 2026 — 08:30 AM", action: "Recollection requested" },
  { id: "SMP-90405", patient: "Yusuf Abdullahi", test: "Coagulation Panel (PT/INR)", reason: "Underfilled tube — insufficient volume", rejectedBy: "Tech. Funmi Adebisi", rejectedAt: "June 26, 2026 — 04:15 PM", action: "Recollection requested" },
  { id: "SMP-90399", patient: "Grace Nwogu", test: "Fasting Blood Glucose", reason: "Patient not fasting (ate 2 hrs prior)", rejectedBy: "Tech. David Akinwale", rejectedAt: "June 26, 2026 — 10:00 AM", action: "Rescheduled for June 28" },
];

const statusSteps: { key: SampleStatus; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "collected", label: "Collected" },
  { key: "in-transit", label: "In Transit" },
  { key: "processing", label: "Processing" },
  { key: "complete", label: "Complete" },
];

const priorityColors: Record<Priority, string> = {
  routine: "bg-surface-container-high text-on-surface-variant",
  urgent: "bg-tertiary-fixed/30 text-tertiary",
  stat: "bg-error-container/50 text-error",
};

const statusColors: Record<SampleStatus, string> = {
  pending: "bg-tertiary-fixed/30 text-tertiary",
  collected: "bg-primary/10 text-primary",
  "in-transit": "bg-tertiary-fixed/30 text-tertiary",
  processing: "bg-primary/10 text-primary",
  complete: "bg-secondary-container/30 text-secondary",
};

export default function LabTriagePage() {
  const [tab, setTab] = useState<Tab>("queue");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  const pending = samples.filter((s) => s.status === "pending");
  const collected = samples.filter((s) => s.status === "collected");
  const inTransit = samples.filter((s) => s.status === "in-transit");
  const processing = samples.filter((s) => s.status === "processing");
  const complete = samples.filter((s) => s.status === "complete");
  const statCount = samples.filter((s) => s.priority === "stat").length;

  const filteredSamples = statusFilter === "all" ? samples : samples.filter((s) => s.status === statusFilter);

  const stats = [
    { label: "Pending Collection", value: pending.length, color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
    { label: "In Progress", value: collected.length + inTransit.length + processing.length, color: "text-primary", bg: "bg-primary/10" },
    { label: "STAT Orders", value: statCount, color: "text-error", bg: "bg-error-container/30" },
    { label: "Completed Today", value: complete.length, color: "text-secondary", bg: "bg-secondary-container/20" },
  ];

  const stepIndex = (s: SampleStatus) => statusSteps.findIndex((st) => st.key === s);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Sample Triage & Tracking</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Collection queue, sample tracking, and rejection management</p>
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

      {/* STAT alert */}
      {statCount > 0 && (
        <div className="bg-error-container/30 border border-error/20 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          <div>
            <div className="text-sm font-bold text-error">{statCount} STAT order{statCount > 1 ? "s" : ""} requiring immediate processing</div>
            <div className="text-xs text-on-surface-variant mt-0.5">STAT samples must be collected within 15 minutes and processed immediately upon receipt.</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "queue" as Tab, label: `Collection Queue (${pending.length})` },
          { key: "tracking" as Tab, label: `Sample Tracking (${samples.length})` },
          { key: "rejected" as Tab, label: `Rejected (${rejectedSamples.length})` },
        ]).map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedSample(null); }} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Collection Queue */}
      {tab === "queue" && !selectedSample && (
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">No samples pending collection.</div>
          ) : (
            pending.sort((a, b) => {
              const prio: Record<Priority, number> = { stat: 0, urgent: 1, routine: 2 };
              return prio[a.priority] - prio[b.priority];
            }).map((s) => (
              <div key={s.id} onClick={() => setSelectedSample(s)} className={`bg-surface-container-lowest border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all ${s.priority === "stat" ? "border-error/40" : "border-outline-variant"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-on-surface">{s.patient}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityColors[s.priority]}`}>{s.priority.toUpperCase()}</span>
                      <span className="text-[10px] text-on-surface-variant">{s.patientId}</span>
                    </div>
                    <div className="text-sm text-on-surface mt-1">{s.test}</div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant flex-wrap">
                      <span>{s.sampleType}</span>
                      <span>·</span>
                      <span>{s.doctor}</span>
                      <span>·</span>
                      <span>Ordered: {s.orderedAt}</span>
                    </div>
                    {s.notes && (
                      <div className="mt-2 text-xs text-tertiary bg-tertiary-fixed/10 px-3 py-1.5 rounded-lg">{s.notes}</div>
                    )}
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all shrink-0">
                    Collect Sample
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sample Tracking */}
      {tab === "tracking" && !selectedSample && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "collected", "in-transit", "processing", "complete"].map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${statusFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                {f === "all" ? `All (${samples.length})` : `${f.replace("-", " ")} (${samples.filter((s) => s.status === f).length})`}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              <div className="col-span-2">Sample ID</div>
              <div className="col-span-2">Patient</div>
              <div className="col-span-3">Test</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-4">Progress</div>
            </div>
            {filteredSamples.map((s) => (
              <div key={s.id} onClick={() => setSelectedSample(s)} className="grid grid-cols-12 gap-2 items-center px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 cursor-pointer transition-colors">
                <div className="col-span-2">
                  <div className="text-xs font-bold text-on-surface">{s.sampleId}</div>
                  <div className="text-[10px] text-on-surface-variant">{s.id}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-medium text-on-surface">{s.patient}</div>
                  <div className="text-[10px] text-on-surface-variant">{s.age}{s.sex[0]} · {s.patientId}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-xs text-on-surface">{s.test}</div>
                  <div className="text-[10px] text-on-surface-variant">{s.sampleType}</div>
                </div>
                <div className="col-span-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityColors[s.priority]}`}>{s.priority.toUpperCase()}</span>
                </div>
                <div className="col-span-4">
                  <div className="flex items-center gap-1">
                    {statusSteps.map((step, i) => (
                      <div key={step.key} className="flex items-center flex-1">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${i <= stepIndex(s.status) ? (s.status === "complete" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                        {i < statusSteps.length - 1 && (
                          <div className={`h-0.5 flex-1 ${i < stepIndex(s.status) ? (s.status === "complete" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-0.5">
                    {statusSteps.map((step, i) => (
                      <span key={step.key} className={`text-[8px] ${i === stepIndex(s.status) ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>
                        {step.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Samples */}
      {tab === "rejected" && !selectedSample && (
        <div className="space-y-3">
          {rejectedSamples.map((r) => (
            <div key={r.id} className="bg-surface-container-lowest border border-error/20 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">{r.patient}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error-container/50 text-error">REJECTED</span>
                  </div>
                  <div className="text-sm text-on-surface mt-1">{r.test}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Sample: {r.id}</div>

                  <div className="mt-3 bg-error-container/10 border border-error/10 rounded-lg p-3">
                    <div className="text-xs font-bold text-error">Rejection Reason</div>
                    <div className="text-xs text-on-surface mt-1">{r.reason}</div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
                    <span>Rejected by: {r.rejectedBy}</span>
                    <span>·</span>
                    <span>{r.rejectedAt}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>
                    <span className="text-xs font-medium text-tertiary">{r.action}</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all shrink-0">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sample Detail Panel */}
      {selectedSample && (
        <div className="space-y-4">
          <button onClick={() => setSelectedSample(null)} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            Back to {tab === "queue" ? "Queue" : "Tracking"}
          </button>

          {/* Blue header */}
          <div className="bg-primary rounded-xl p-5 text-on-primary">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{selectedSample.patient}</h2>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${selectedSample.priority === "stat" ? "bg-error text-on-error" : selectedSample.priority === "urgent" ? "bg-tertiary-fixed text-tertiary" : "bg-on-primary/20 text-on-primary"}`}>{selectedSample.priority.toUpperCase()}</span>
                </div>
                <div className="text-sm text-on-primary/80 mt-0.5">{selectedSample.patientId} · {selectedSample.age} yrs · {selectedSample.sex}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{selectedSample.sampleId}</div>
                <div className="text-xs text-on-primary/70">{selectedSample.id}</div>
              </div>
            </div>
          </div>

          {/* Progress stepper */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Sample Progress</h3>
            <div className="flex items-center gap-0">
              {statusSteps.map((step, i) => {
                const current = stepIndex(selectedSample.status);
                const done = i <= current;
                const isCurrent = i === current;
                return (
                  <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? (selectedSample.status === "complete" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary") : "bg-surface-container-high text-on-surface-variant"} ${isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}`}>
                        {done && i < current ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span className={`text-[10px] mt-1 ${isCurrent ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>{step.label}</span>
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 ${i < current ? (selectedSample.status === "complete" ? "bg-secondary" : "bg-primary") : "bg-outline-variant/40"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Test Information</h3>
              {[
                { label: "Test Name", value: selectedSample.test },
                { label: "Test Type", value: selectedSample.testType },
                { label: "Sample Type", value: selectedSample.sampleType },
                { label: "Ordering Physician", value: selectedSample.doctor },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">{r.label}</span>
                  <span className="text-on-surface font-medium text-right">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Timeline</h3>
              {[
                { label: "Ordered", value: selectedSample.orderedAt },
                { label: "Collected", value: selectedSample.collectedAt || "—" },
                { label: "Received at Lab", value: selectedSample.receivedAt || "—" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">{r.label}</span>
                  <span className="text-on-surface font-medium text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedSample.notes && (
            <div className="bg-tertiary-fixed/10 border border-tertiary/20 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-4 h-4 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <div>
                <div className="text-xs font-bold text-tertiary">Clinical Notes</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{selectedSample.notes}</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {selectedSample.status === "pending" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Mark as Collected</button>
            )}
            {selectedSample.status === "collected" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Mark In Transit</button>
            )}
            {selectedSample.status === "in-transit" && (
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Receive at Lab</button>
            )}
            {selectedSample.status === "processing" && (
              <button className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all">Enter Results</button>
            )}
            <button className="px-4 py-2 rounded-xl border border-error/30 text-error text-sm font-medium hover:bg-error-container/20 transition-all">Reject Sample</button>
            <button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-all">Print Label</button>
          </div>
        </div>
      )}
    </div>
  );
}
