"use client";

import { useState } from "react";

const appointments = [
  { id: "LAP-001", patient: "Chioma Eze", patientId: "HSP-1204", age: 34, sex: "F", type: "Blood Draw", tests: ["CBC", "Lipid Panel", "HbA1c"], doctor: "Dr. Adebayo Ogundimu", status: "checked_in", time: "09:00 AM", date: "2026-06-27", phlebotomist: "Ngozi Udo", priority: "routine", notes: "Fasting required — confirmed fasting since 10 PM", source: "scheduled" },
  { id: "LAP-002", patient: "Emeka Nwosu", patientId: "HSP-0847", age: 42, sex: "M", type: "Blood Draw", tests: ["BMP", "Cardiac Enzymes", "BNP"], doctor: "Dr. Chukwuma Eze", status: "in_progress", time: "09:15 AM", date: "2026-06-27", phlebotomist: "Ngozi Udo", priority: "urgent", notes: "Heart failure monitoring — handle with care, difficult veins", source: "scheduled" },
  { id: "LAP-003", patient: "Adebayo Oluwatobi", patientId: "HSP-1156", age: 28, sex: "M", type: "Urine Collection", tests: ["Urinalysis", "Urine Culture"], doctor: "Dr. Funke Adeyemi", status: "waiting", time: "09:30 AM", date: "2026-06-27", phlebotomist: "Unassigned", priority: "routine", notes: "Mid-stream clean catch required", source: "walk_in" },
  { id: "LAP-004", patient: "Fatima Bello", patientId: "HSP-0932", age: 55, sex: "F", type: "Blood Draw", tests: ["Thyroid Panel", "Vitamin D", "Iron Studies"], doctor: "Dr. Ngozi Eze", status: "scheduled", time: "10:00 AM", date: "2026-06-27", phlebotomist: "Kemi Balogun", priority: "routine", notes: "", source: "scheduled" },
  { id: "LAP-005", patient: "Ibrahim Musa", patientId: "HSP-1378", age: 67, sex: "M", type: "Blood Draw", tests: ["PSA", "Renal Panel", "Electrolytes"], doctor: "Dr. Adebayo Ogundimu", status: "scheduled", time: "10:30 AM", date: "2026-06-27", phlebotomist: "Ngozi Udo", priority: "routine", notes: "Elderly patient — use butterfly needle", source: "scheduled" },
  { id: "LAP-006", patient: "Grace Obi", patientId: "HSP-1089", age: 31, sex: "F", type: "Blood Draw", tests: ["Pregnancy Panel", "Blood Group", "Rubella IgG"], doctor: "Dr. Funke Adeyemi", status: "waiting", time: "—", date: "2026-06-27", phlebotomist: "Unassigned", priority: "routine", notes: "Walk-in prenatal screening", source: "walk_in" },
  { id: "LAP-007", patient: "Olumide Akinwale", patientId: "HSP-0765", age: 48, sex: "M", type: "Blood Draw", tests: ["STAT Troponin", "D-Dimer"], doctor: "Dr. Chukwuma Eze", status: "checked_in", time: "—", date: "2026-06-27", phlebotomist: "Kemi Balogun", priority: "stat", notes: "STAT — ER referral, chest pain presentation", source: "walk_in" },
  { id: "LAP-008", patient: "Blessing Okoro", patientId: "HSP-1445", age: 22, sex: "F", type: "Swab Collection", tests: ["Throat Culture", "Rapid Strep"], doctor: "Dr. Adebayo Ogundimu", status: "completed", time: "08:30 AM", date: "2026-06-27", phlebotomist: "Ngozi Udo", priority: "routine", notes: "Sore throat x 3 days", source: "scheduled" },
  { id: "LAP-009", patient: "Yusuf Abdullahi", patientId: "HSP-1290", age: 39, sex: "M", type: "Blood Draw", tests: ["FBS", "Lipid Panel"], doctor: "Dr. Ngozi Eze", status: "completed", time: "08:00 AM", date: "2026-06-27", phlebotomist: "Kemi Balogun", priority: "routine", notes: "Fasting confirmed", source: "scheduled" },
];

const timeSlots = [
  { time: "08:00 AM", capacity: 3, booked: 3 },
  { time: "08:30 AM", capacity: 3, booked: 2 },
  { time: "09:00 AM", capacity: 3, booked: 3 },
  { time: "09:30 AM", capacity: 3, booked: 1 },
  { time: "10:00 AM", capacity: 3, booked: 2 },
  { time: "10:30 AM", capacity: 3, booked: 1 },
  { time: "11:00 AM", capacity: 3, booked: 0 },
  { time: "11:30 AM", capacity: 3, booked: 0 },
  { time: "12:00 PM", capacity: 2, booked: 0 },
  { time: "01:00 PM", capacity: 3, booked: 0 },
  { time: "01:30 PM", capacity: 3, booked: 0 },
  { time: "02:00 PM", capacity: 3, booked: 0 },
  { time: "02:30 PM", capacity: 3, booked: 0 },
  { time: "03:00 PM", capacity: 3, booked: 0 },
  { time: "03:30 PM", capacity: 2, booked: 0 },
];

const phlebotomists = [
  { name: "Ngozi Udo", status: "active", assigned: 3, completed: 2, specialty: "Pediatric & Difficult Veins" },
  { name: "Kemi Balogun", status: "active", assigned: 2, completed: 1, specialty: "General Phlebotomy" },
  { name: "Tunde Olaiya", status: "on_break", assigned: 0, completed: 0, specialty: "General Phlebotomy" },
];

type Tab = "queue" | "calendar" | "walkins" | "staff";

export default function LabAppointmentsPage() {
  const [tab, setTab] = useState<Tab>("queue");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState<string | null>(null);

  const scheduled = appointments.filter(a => a.source === "scheduled");
  const walkIns = appointments.filter(a => a.source === "walk_in");
  const filtered = (tab === "walkins" ? walkIns : appointments).filter(a => statusFilter === "all" || a.status === statusFilter);
  const detail = selectedAppt ? appointments.find(a => a.id === selectedAppt) : null;

  const waiting = appointments.filter(a => a.status === "waiting" || a.status === "checked_in").length;
  const inProgress = appointments.filter(a => a.status === "in_progress").length;
  const completed = appointments.filter(a => a.status === "completed").length;
  const statOrders = appointments.filter(a => a.priority === "stat" && a.status !== "completed").length;

  const statusColor = (s: string) => {
    switch (s) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "checked_in": return "bg-cyan-100 text-cyan-800";
      case "waiting": return "bg-amber-100 text-amber-800";
      case "in_progress": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "stat": return "bg-red-600 text-white";
      case "urgent": return "bg-red-100 text-red-800";
      case "routine": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabel = (s: string) => s.replace(/_/g, " ");

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "queue", label: "Today's Queue", count: appointments.filter(a => a.status !== "completed").length },
    { key: "calendar", label: "Schedule" },
    { key: "walkins", label: "Walk-ins", count: walkIns.length },
    { key: "staff", label: "Phlebotomists" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Lab Appointments</h1>
        <p className="text-on-surface-variant text-sm mt-1">Sample collection scheduling, walk-in queue, and staff assignment</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-amber-600">{waiting}</div>
          <div className="text-sm text-on-surface-variant mt-1">Waiting / Checked In</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-purple-600">{inProgress}</div>
          <div className="text-sm text-on-surface-variant mt-1">In Progress</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-green-600">{completed}</div>
          <div className="text-sm text-on-surface-variant mt-1">Completed Today</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-red-600">{statOrders}</div>
          <div className="text-sm text-on-surface-variant mt-1">STAT Orders</div>
        </div>
      </div>

      {/* STAT Alert */}
      {statOrders > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <svg className="w-5 h-5 text-red-600 shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg>
          <span className="text-sm text-red-800"><span className="font-semibold">{statOrders} STAT order(s)</span> require immediate sample collection. Prioritize these patients.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedAppt(null); setStatusFilter("all"); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}{t.count !== undefined && ` (${t.count})`}
          </button>
        ))}
      </div>

      {/* Today's Queue Tab */}
      {tab === "queue" && (
        <div className="flex gap-6">
          <div className={`${detail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["all", "checked_in", "waiting", "in_progress", "scheduled", "completed"].map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${statusFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                    {f === "all" ? `All (${appointments.length})` : `${statusLabel(f)} (${appointments.filter(a => a.status === f).length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.sort((a, b) => {
                const po = { stat: 0, urgent: 1, routine: 2 };
                return (po[a.priority as keyof typeof po] ?? 2) - (po[b.priority as keyof typeof po] ?? 2);
              }).map(a => (
                <button key={a.id} onClick={() => setSelectedAppt(a.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedAppt === a.id ? "border-primary ring-1 ring-primary" : a.priority === "stat" ? "border-red-300" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${a.priority === "stat" ? "bg-red-600" : a.priority === "urgent" ? "bg-amber-600" : "bg-primary"}`}>
                      {a.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-on-surface text-sm">{a.patient}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${priorityColor(a.priority)}`}>{a.priority}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(a.status)}`}>{statusLabel(a.status)}</span>
                        {a.source === "walk_in" && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-orange-100 text-orange-800">Walk-in</span>}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{a.type} · {a.tests.join(", ")}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span>{a.time !== "—" ? a.time : "No time slot"}</span>
                        <span>{a.doctor}</span>
                        {a.phlebotomist !== "Unassigned" && <span>→ {a.phlebotomist}</span>}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {detail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className={`p-5 ${detail.priority === "stat" ? "bg-red-600" : "bg-primary"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{detail.patient}</h3>
                    <p className="text-white/70 text-sm mt-0.5">{detail.patientId} · {detail.age}y {detail.sex} · {detail.id}</p>
                  </div>
                  <button onClick={() => setSelectedAppt(null)} className="text-white/70 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${priorityColor(detail.priority)}`}>{detail.priority}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(detail.status)}`}>{statusLabel(detail.status)}</span>
                  {detail.source === "walk_in" && <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-orange-100 text-orange-800">Walk-in</span>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Collection Type</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.type}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Time Slot</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.time !== "—" ? detail.time : "Walk-in"}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Ordering Doctor</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.doctor}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Phlebotomist</div>
                    <div className={`font-medium mt-0.5 text-sm ${detail.phlebotomist === "Unassigned" ? "text-amber-600" : "text-on-surface"}`}>{detail.phlebotomist}</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Tests Ordered ({detail.tests.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.tests.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{t}</span>
                    ))}
                  </div>
                </div>

                {detail.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">Clinical Notes</h4>
                    <p className="text-sm text-amber-700">{detail.notes}</p>
                  </div>
                )}

                <div className="space-y-2">
                  {detail.status === "scheduled" && (
                    <button className="w-full px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Check In Patient</button>
                  )}
                  {(detail.status === "checked_in" || detail.status === "waiting") && (
                    <button className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Begin Collection</button>
                  )}
                  {detail.status === "in_progress" && (
                    <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Mark Collection Complete</button>
                  )}
                  {detail.phlebotomist === "Unassigned" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Assign Phlebotomist</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Print Collection Labels</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Reschedule Appointment</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar / Schedule Tab */}
      {tab === "calendar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-on-surface">June 27, 2026 — Friday</h2>
              <p className="text-sm text-on-surface-variant">{scheduled.length} scheduled, {walkIns.length} walk-ins · {timeSlots.reduce((s, t) => s + (t.capacity - t.booked), 0)} slots available</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm text-on-surface-variant hover:bg-surface-container-low">← Prev</button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-sm font-medium">Today</button>
              <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm text-on-surface-variant hover:bg-surface-container-low">Next →</button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase w-24">Time</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase w-24">Capacity</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Appointments</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase w-28">Availability</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(s => {
                  const slotAppts = scheduled.filter(a => a.time === s.time);
                  const available = s.capacity - s.booked;
                  return (
                    <tr key={s.time} className="border-b border-outline-variant last:border-0">
                      <td className="px-5 py-3 text-sm font-medium text-on-surface">{s.time}</td>
                      <td className="px-5 py-3 text-center text-sm text-on-surface-variant">{s.booked}/{s.capacity}</td>
                      <td className="px-5 py-3">
                        {slotAppts.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {slotAppts.map(a => (
                              <span key={a.id} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${a.priority === "urgent" ? "bg-red-100 text-red-800" : "bg-primary/10 text-primary"}`}>
                                {a.patient.split(" ")[0]} — {a.tests[0]}
                              </span>
                            ))}
                          </div>
                        ) : s.booked > 0 ? (
                          <span className="text-xs text-on-surface-variant italic">External bookings</span>
                        ) : (
                          <span className="text-xs text-on-surface-variant">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {available > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800">{available} open</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-800">Full</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Book New Appointment</button>
        </div>
      )}

      {/* Walk-ins Tab */}
      {tab === "walkins" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Walk-in Patients ({walkIns.length})</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Register Walk-in</button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <span className="text-sm text-blue-800">Walk-in patients are queued by priority, then arrival order. STAT orders always take precedence.</span>
            </div>
          </div>

          <div className="space-y-3">
            {walkIns.sort((a, b) => {
              const po = { stat: 0, urgent: 1, routine: 2 };
              return (po[a.priority as keyof typeof po] ?? 2) - (po[b.priority as keyof typeof po] ?? 2);
            }).map((a, i) => (
              <div key={a.id} className={`bg-surface-container-lowest rounded-xl border p-5 ${a.priority === "stat" ? "border-red-300" : "border-outline-variant"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${a.priority === "stat" ? "bg-red-600" : "bg-amber-600"}`}>{i + 1}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-on-surface">{a.patient}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${priorityColor(a.priority)}`}>{a.priority}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(a.status)}`}>{statusLabel(a.status)}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant mt-0.5">{a.patientId} · {a.age}y {a.sex} · {a.type}</p>
                      <p className="text-sm text-on-surface mt-1">{a.tests.join(", ")}</p>
                      {a.notes && <p className="text-xs text-amber-700 mt-1 italic">{a.notes}</p>}
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span>Ordered by: {a.doctor}</span>
                        <span>Assigned: {a.phlebotomist}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {a.status === "waiting" && <button className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-xs font-medium hover:opacity-90">Check In</button>}
                    {a.status === "checked_in" && <button className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:opacity-90">Collect</button>}
                    {a.phlebotomist === "Unassigned" && <button className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:opacity-90">Assign</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {tab === "staff" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Phlebotomy Staff</h2>
            <span className="text-sm text-on-surface-variant">{phlebotomists.filter(p => p.status === "active").length} of {phlebotomists.length} active</span>
          </div>

          <div className="space-y-3">
            {phlebotomists.map(p => (
              <div key={p.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${p.status === "active" ? "bg-green-600" : "bg-gray-400"}`}>
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-on-surface">{p.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${p.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{p.status.replace("_", " ")}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant mt-0.5">{p.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-on-surface">{p.assigned}</div>
                      <div className="text-xs text-on-surface-variant">Assigned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{p.completed}</div>
                      <div className="text-xs text-on-surface-variant">Completed</div>
                    </div>
                    <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-xl text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">View Schedule</button>
                  </div>
                </div>

                {p.assigned > 0 && (
                  <div className="mt-3 pt-3 border-t border-outline-variant">
                    <h4 className="text-xs font-semibold text-on-surface-variant mb-2">Current Assignments</h4>
                    <div className="flex flex-wrap gap-2">
                      {appointments.filter(a => a.phlebotomist === p.name && a.status !== "completed").map(a => (
                        <span key={a.id} className={`px-2 py-1 rounded-lg text-xs font-medium ${a.priority === "stat" ? "bg-red-100 text-red-800" : a.priority === "urgent" ? "bg-amber-100 text-amber-800" : "bg-surface-container-low text-on-surface-variant"}`}>
                          {a.patient.split(" ")[0]} — {a.tests[0]} ({statusLabel(a.status)})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
