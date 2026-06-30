"use client";

import { useState } from "react";

const appointments = [
  { id: "PA-001", patient: "Adewale Okafor", age: 42, phone: "+234 812 345 6789", type: "Medication Review", time: "09:00 AM", duration: "30 min", pharmacist: "Pharm. Chioma Obi", status: "checked_in", priority: "high", notes: "Post-cardiac event. Review new cardiac medications for interactions and patient counseling.", medications: ["Aspirin 300mg", "Clopidogrel 75mg", "Atorvastatin 40mg"] },
  { id: "PA-002", patient: "Grace Obi", age: 67, phone: "+234 803 234 5678", type: "Vaccination", time: "09:30 AM", duration: "15 min", pharmacist: "Pharm. Yemi Alade", status: "in_progress", priority: "routine", notes: "Annual influenza vaccination. Check for egg allergy before administration.", medications: ["Influenza Vaccine 2026/27"] },
  { id: "PA-003", patient: "Tunde Bakare", age: 52, phone: "+234 705 345 6789", type: "Medication Review", time: "10:00 AM", duration: "30 min", pharmacist: "Pharm. Chioma Obi", status: "scheduled", priority: "routine", notes: "Quarterly diabetes medication review. Check HbA1c trends and medication adherence.", medications: ["Metformin 1000mg", "Glimepiride 2mg", "Empagliflozin 10mg"] },
  { id: "PA-004", patient: "Halima Sani", age: 38, phone: "+234 816 456 7890", type: "Health Screening", time: "10:30 AM", duration: "20 min", pharmacist: "Pharm. Hassan Musa", status: "scheduled", priority: "routine", notes: "Blood pressure and blood glucose screening. First-time patient.", medications: [] },
  { id: "PA-005", patient: "Emeka Nwosu", age: 8, phone: "+234 809 567 8901", type: "Vaccination", time: "11:00 AM", duration: "15 min", pharmacist: "Pharm. Yemi Alade", status: "scheduled", priority: "routine", notes: "Childhood immunization catch-up — Hepatitis B booster. Parent: Mrs. Nwosu.", medications: ["Hepatitis B Vaccine"] },
  { id: "PA-006", patient: "Fatima Bello", age: 55, phone: "+234 812 678 9012", type: "Medication Review", time: "11:30 AM", duration: "30 min", pharmacist: "Pharm. Chioma Obi", status: "scheduled", priority: "high", notes: "New Omeprazole dose increase from 20mg to 40mg. Verify prescriber rationale and counsel patient.", medications: ["Omeprazole 40mg", "Hyoscine 10mg"] },
  { id: "PA-007", patient: "Peter Agu", age: 45, phone: "+234 703 789 0123", type: "Chronic Disease Management", time: "01:00 PM", duration: "45 min", pharmacist: "Pharm. Chioma Obi", status: "scheduled", priority: "routine", notes: "Asthma management review. Assess inhaler technique and medication adherence.", medications: ["Budesonide/Formoterol 200/6 inhaler", "Salbutamol inhaler PRN"] },
  { id: "PA-008", patient: "Ngozi Eze", age: 35, phone: "+234 803 456 7890", type: "Follow-up", time: "01:30 PM", duration: "15 min", pharmacist: "Pharm. Yemi Alade", status: "scheduled", priority: "high", notes: "Post-malaria treatment follow-up. Verify ACT course completion and assess for residual symptoms.", medications: ["Artemether/Lumefantrine (completed)"] },
];

const walkIns = [
  { id: "WI-001", patient: "Blessing Adekunle", age: 29, type: "Quick Consultation", waitTime: "5 min", reason: "OTC pain relief advice" },
  { id: "WI-002", patient: "Yusuf Abdullahi", age: 60, type: "Prescription Drop-off", waitTime: "12 min", reason: "New prescription from Dr. Bakare" },
];

const pharmacists = [
  { name: "Pharm. Chioma Obi", status: "available", appointments: 4, specialties: ["Medication Review", "Chronic Disease"], avatar: "CO" },
  { name: "Pharm. Yemi Alade", status: "with_patient", appointments: 3, specialties: ["Vaccinations", "Follow-up"], avatar: "YA" },
  { name: "Pharm. Hassan Musa", status: "available", appointments: 1, specialties: ["Health Screening", "Blood Pressure"], avatar: "HM" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  checked_in: { label: "Checked In", color: "text-blue-700", bg: "bg-blue-100" },
  in_progress: { label: "In Progress", color: "text-purple-700", bg: "bg-purple-100" },
  scheduled: { label: "Scheduled", color: "text-gray-700", bg: "bg-gray-100" },
  completed: { label: "Completed", color: "text-green-700", bg: "bg-green-100" },
  no_show: { label: "No Show", color: "text-red-700", bg: "bg-red-100" },
};

type Tab = "today" | "schedule" | "walk_ins" | "pharmacists";

export default function PharmacyAppointmentsPage() {
  const [tab, setTab] = useState<Tab>("today");
  const [selectedAppt, setSelectedAppt] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");

  const types = [...new Set(appointments.map(a => a.type))];
  const filtered = typeFilter === "all" ? appointments : appointments.filter(a => a.type === typeFilter);
  const apptDetail = selectedAppt ? appointments.find(a => a.id === selectedAppt) : null;

  const stats = {
    total: appointments.length,
    checkedIn: appointments.filter(a => a.status === "checked_in").length + appointments.filter(a => a.status === "in_progress").length,
    remaining: appointments.filter(a => a.status === "scheduled").length,
    walkIns: walkIns.length,
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "today", label: "Today's Queue" },
    { key: "schedule", label: "Weekly Schedule" },
    { key: "walk_ins", label: `Walk-ins (${walkIns.length})` },
    { key: "pharmacists", label: "Pharmacists" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Pharmacy Appointments</h1>
          <p className="text-on-surface-variant text-sm mt-1">Patient consultations, vaccinations, and health screenings</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Book Appointment</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Today", value: stats.total, icon: "📅", color: "text-primary" },
          { label: "Active/Checked In", value: stats.checkedIn, icon: "✅", color: "text-green-600" },
          { label: "Remaining", value: stats.remaining, icon: "⏳", color: "text-blue-600" },
          { label: "Walk-ins Waiting", value: stats.walkIns, icon: "🚶", color: "text-amber-600" },
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
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedAppt(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Today's Queue */}
      {tab === "today" && (
        <div className="flex gap-6">
          <div className={`${apptDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setTypeFilter("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${typeFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>All ({appointments.length})</button>
              {types.map(t => (
                <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${typeFilter === t ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{t}</button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(a => {
                const st = statusConfig[a.status];
                return (
                  <button key={a.id} onClick={() => setSelectedAppt(a.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedAppt === a.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-primary">{a.time}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.color}`}>{st.label}</span>
                          {a.priority === "high" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700">Priority</span>}
                          <span className="text-[10px] text-on-surface-variant">{a.duration}</span>
                        </div>
                        <h3 className="font-semibold text-on-surface text-sm mt-1">{a.patient} <span className="font-normal text-on-surface-variant">({a.age}y)</span></h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-medium">{a.type}</span>
                          <span className="text-xs text-on-surface-variant">{a.pharmacist}</span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Appointment Detail */}
          {apptDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/70">{apptDetail.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">{apptDetail.type}</span>
                    </div>
                    <h3 className="text-on-primary font-bold text-lg mt-1">{apptDetail.patient}</h3>
                    <p className="text-on-primary/70 text-sm">{apptDetail.age}y · {apptDetail.time} · {apptDetail.duration}</p>
                  </div>
                  <button onClick={() => setSelectedAppt(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Pharmacist</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{apptDetail.pharmacist}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Contact</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{apptDetail.phone}</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Appointment Notes</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{apptDetail.notes}</p>
                </div>

                {apptDetail.medications.length > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Medications to Review</h4>
                    <div className="space-y-2">
                      {apptDetail.medications.map(m => (
                        <div key={m} className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant">
                          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5" /></svg>
                          <span className="text-sm text-on-surface">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {apptDetail.status === "scheduled" && <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Check In</button>}
                  {apptDetail.status === "checked_in" && <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Start Consultation</button>}
                  {apptDetail.status === "in_progress" && <button className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Complete</button>}
                  <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Reschedule</button>
                  {apptDetail.status === "scheduled" && <button className="px-4 py-2.5 bg-error/10 text-error rounded-xl text-sm font-medium hover:bg-error/20 transition-all">No Show</button>}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">View Patient Profile</button>
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Add Notes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Weekly Schedule */}
      {tab === "schedule" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Week of June 28 – July 4, 2026</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-surface-container-low text-on-surface-variant rounded-lg text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">← Prev</button>
              <button className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium">Today</button>
              <button className="px-3 py-1.5 bg-surface-container-low text-on-surface-variant rounded-lg text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">Next →</button>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <div className="grid grid-cols-7">
              {["Sat 28", "Sun 29", "Mon 30", "Tue 1", "Wed 2", "Thu 3", "Fri 4"].map((day, i) => (
                <div key={day} className={`border-r border-outline-variant last:border-r-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <div className={`px-3 py-2 border-b border-outline-variant text-center ${i === 0 ? "bg-primary/10" : "bg-surface-container-low"}`}>
                    <div className={`text-xs font-semibold ${i === 0 ? "text-primary" : "text-on-surface"}`}>{day}</div>
                  </div>
                  <div className="p-2 space-y-1 min-h-[200px]">
                    {i === 0 && (
                      <>
                        <div className="p-1.5 rounded bg-blue-50 border-l-2 border-blue-500">
                          <div className="text-[9px] font-bold text-blue-700">09:00</div>
                          <div className="text-[9px] text-blue-600">Okafor - Med Review</div>
                        </div>
                        <div className="p-1.5 rounded bg-green-50 border-l-2 border-green-500">
                          <div className="text-[9px] font-bold text-green-700">09:30</div>
                          <div className="text-[9px] text-green-600">Obi - Vaccination</div>
                        </div>
                        <div className="p-1.5 rounded bg-blue-50 border-l-2 border-blue-500">
                          <div className="text-[9px] font-bold text-blue-700">10:00</div>
                          <div className="text-[9px] text-blue-600">Bakare - Med Review</div>
                        </div>
                        <div className="p-1.5 rounded bg-purple-50 border-l-2 border-purple-500">
                          <div className="text-[9px] font-bold text-purple-700">10:30</div>
                          <div className="text-[9px] text-purple-600">Sani - Screening</div>
                        </div>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <div className="p-1.5 rounded bg-blue-50 border-l-2 border-blue-500">
                          <div className="text-[9px] font-bold text-blue-700">09:00</div>
                          <div className="text-[9px] text-blue-600">Yusuf - Med Review</div>
                        </div>
                        <div className="p-1.5 rounded bg-green-50 border-l-2 border-green-500">
                          <div className="text-[9px] font-bold text-green-700">10:00</div>
                          <div className="text-[9px] text-green-600">Adeyemi - Vaccination</div>
                        </div>
                      </>
                    )}
                    {i === 4 && (
                      <div className="p-1.5 rounded bg-orange-50 border-l-2 border-orange-500">
                        <div className="text-[9px] font-bold text-orange-700">11:00</div>
                        <div className="text-[9px] text-orange-600">Eze - Follow-up</div>
                      </div>
                    )}
                    {[1, 3, 5, 6].includes(i) && (
                      <div className="text-[9px] text-on-surface-variant text-center pt-8">No appointments</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Walk-ins */}
      {tab === "walk_ins" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Walk-in Patients</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Register Walk-in</button>
          </div>

          {walkIns.length > 0 ? (
            <div className="space-y-3">
              {walkIns.map((w, i) => (
                <div key={w.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">{i + 1}</div>
                      <div>
                        <h3 className="font-semibold text-on-surface">{w.patient} <span className="text-on-surface-variant font-normal">({w.age}y)</span></h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-medium">{w.type}</span>
                          <span className="text-xs text-on-surface-variant">{w.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-amber-600">Waiting {w.waitTime}</div>
                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium hover:opacity-90 transition-all">Attend</button>
                        <button className="px-3 py-1.5 bg-surface-container-low text-on-surface rounded-lg text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">Assign</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-12 text-center">
              <p className="text-sm text-on-surface-variant">No walk-in patients waiting.</p>
            </div>
          )}
        </div>
      )}

      {/* Pharmacists */}
      {tab === "pharmacists" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Pharmacist Availability</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {pharmacists.map(p => (
              <div key={p.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{p.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-on-surface text-sm">{p.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.status === "available" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>{p.status === "available" ? "Available" : "With Patient"}</span>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant">Today&apos;s appointments</span>
                    <span className="font-medium text-on-surface">{p.appointments}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.specialties.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{s}</span>
                  ))}
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">Assign Patient</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
