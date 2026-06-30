"use client";

import { useState } from "react";

const upcomingSessions = [
  { id: "TH-001", doctor: "Dr. Adebayo Ogundimu", specialty: "Internal Medicine", date: "2026-06-28", time: "10:00 AM", duration: "30 min", status: "confirmed", type: "Follow-up", reason: "Hypertension medication review", avatar: "AO" },
  { id: "TH-002", doctor: "Dr. Ngozi Eze", specialty: "Endocrinology", date: "2026-07-02", time: "2:30 PM", duration: "45 min", status: "confirmed", type: "Consultation", reason: "Diabetes management check-in", avatar: "NE" },
  { id: "TH-003", doctor: "Dr. Funke Adeyemi", specialty: "Dermatology", date: "2026-07-08", time: "11:00 AM", duration: "20 min", status: "pending", type: "New Consultation", reason: "Skin rash evaluation", avatar: "FA" },
];

const pastSessions = [
  { id: "TH-P01", doctor: "Dr. Adebayo Ogundimu", specialty: "Internal Medicine", date: "2026-06-14", time: "10:00 AM", duration: "32 min", status: "completed", type: "Follow-up", reason: "Blood pressure monitoring", summary: "BP readings improved. Continue current medication. Reduce salt intake. Follow up in 2 weeks.", prescriptions: ["Lisinopril 10mg - Continue daily", "Low-sodium diet recommendation"], avatar: "AO", rating: 5 },
  { id: "TH-P02", doctor: "Dr. Ngozi Eze", specialty: "Endocrinology", date: "2026-06-01", time: "3:00 PM", duration: "40 min", status: "completed", type: "Consultation", reason: "HbA1c results review", summary: "HbA1c improved from 8.2 to 7.4. Adjusted Metformin dosage. Added exercise plan. Lab work in 3 months.", prescriptions: ["Metformin 1000mg - Increased from 500mg", "Glucometer test strips (100)"], avatar: "NE", rating: 5 },
  { id: "TH-P03", doctor: "Dr. Chidi Okonkwo", specialty: "Cardiology", date: "2026-05-18", time: "9:30 AM", duration: "25 min", status: "completed", type: "Follow-up", reason: "ECG results discussion", summary: "ECG results normal. No arrhythmia detected. Continue current cardiac regimen. Annual echo recommended.", prescriptions: [], avatar: "CO", rating: 4 },
  { id: "TH-P04", doctor: "Dr. Adebayo Ogundimu", specialty: "Internal Medicine", date: "2026-05-01", time: "10:00 AM", duration: "28 min", status: "completed", type: "Follow-up", reason: "Routine check-up", summary: "Overall health stable. Weight slightly up — discussed lifestyle changes. All vitals within range.", prescriptions: ["Vitamin D3 1000IU - Daily supplement"], avatar: "AO", rating: 5 },
];

const preConsultationChecklist = [
  { id: 1, label: "Test your camera and microphone", completed: true },
  { id: 2, label: "Find a quiet, well-lit room", completed: true },
  { id: 3, label: "Have your current medications ready", completed: false },
  { id: 4, label: "Prepare a list of symptoms or questions", completed: false },
  { id: 5, label: "Have recent lab results or documents nearby", completed: true },
  { id: 6, label: "Ensure stable internet connection", completed: true },
];

type Tab = "upcoming" | "past" | "join";
type JoinState = "lobby" | "prechecks" | "incall";

export default function TelehealthPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [joinState, setJoinState] = useState<JoinState>("lobby");
  const [checklist, setChecklist] = useState(preConsultationChecklist);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const toggleCheckItem = (id: number) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const pastDetail = selectedSession ? pastSessions.find(s => s.id === selectedSession) : null;
  const nextSession = upcomingSessions[0];

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "upcoming", label: "Upcoming", count: upcomingSessions.length },
    { key: "past", label: "Past Sessions", count: pastSessions.length },
    { key: "join", label: "Join Session" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Telehealth</h1>
        <p className="text-on-surface-variant text-sm mt-1">Video consultations, session history, and pre-consultation preparation</p>
      </div>

      {/* Next Session Card */}
      {nextSession && tab !== "join" && (
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium opacity-70 uppercase">Next Consultation</div>
              <h2 className="text-lg font-bold mt-1">{nextSession.doctor}</h2>
              <p className="text-sm opacity-80">{nextSession.specialty} · {nextSession.type}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  {nextSession.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  {nextSession.time} · {nextSession.duration}
                </span>
              </div>
            </div>
            <button onClick={() => setTab("join")} className="px-5 py-3 bg-white text-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">
              Join Now
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedSession(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}{t.count !== undefined && ` (${t.count})`}
          </button>
        ))}
      </div>

      {/* Upcoming Tab */}
      {tab === "upcoming" && (
        <div className="space-y-3">
          {upcomingSessions.map(s => (
            <div key={s.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shrink-0">{s.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface">{s.doctor}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${s.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{s.status}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-0.5">{s.specialty} · {s.type}</p>
                    <p className="text-sm text-on-surface mt-1">{s.reason}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>{s.date}</span>
                      <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>{s.time}</span>
                      <span>{s.duration}</span>
                      <span>{s.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setTab("join")} className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Join</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Reschedule</button>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full px-4 py-3 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">
            + Book New Consultation
          </button>
        </div>
      )}

      {/* Past Sessions Tab */}
      {tab === "past" && (
        <div className="flex gap-6">
          <div className={`${pastDetail ? "w-1/2" : "w-full"} space-y-3 transition-all`}>
            {pastSessions.map(s => (
              <button key={s.id} onClick={() => setSelectedSession(s.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedSession === s.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{s.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface text-sm">{s.doctor}</h3>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < s.rating ? "text-amber-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">{s.specialty} · {s.type}</p>
                    <p className="text-xs text-on-surface-variant mt-1 truncate">{s.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                      <span>{s.date}</span>
                      <span>{s.duration}</span>
                      {s.prescriptions.length > 0 && <span className="text-primary font-medium">{s.prescriptions.length} prescription(s)</span>}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </div>
              </button>
            ))}
          </div>

          {/* Past Session Detail */}
          {pastDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-on-primary font-bold">{pastDetail.avatar}</div>
                    <div>
                      <h3 className="text-on-primary font-bold text-lg">{pastDetail.doctor}</h3>
                      <p className="text-on-primary/70 text-sm">{pastDetail.specialty} · {pastDetail.date}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSession(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-green-100 text-green-800">Completed</span>
                  <span className="text-xs text-on-surface-variant">{pastDetail.duration} · {pastDetail.time}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < pastDetail.rating ? "text-amber-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Consultation Summary</h4>
                  <p className="text-sm text-on-surface-variant">{pastDetail.summary}</p>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Reason for Visit</h4>
                  <p className="text-sm text-on-surface-variant">{pastDetail.reason}</p>
                </div>

                {pastDetail.prescriptions.length > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Prescriptions</h4>
                    <div className="space-y-2">
                      {pastDetail.prescriptions.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>
                          <span className="text-sm text-on-surface">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <button className="w-full px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Book Follow-up</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Download Summary (PDF)</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Message Doctor</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Join Session Tab */}
      {tab === "join" && (
        <div className="space-y-6">
          {joinState === "lobby" && (
            <>
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg">{nextSession.avatar}</div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface">{nextSession.doctor}</h2>
                    <p className="text-sm text-on-surface-variant">{nextSession.specialty} · {nextSession.type}</p>
                    <p className="text-sm text-on-surface mt-0.5">{nextSession.reason}</p>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-on-surface mb-3">Pre-Consultation Checklist</h3>
                <div className="space-y-2">
                  {checklist.map(c => (
                    <button key={c.id} onClick={() => toggleCheckItem(c.id)} className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-surface-container-low transition-all">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${c.completed ? "bg-primary border-primary" : "border-outline"}`}>
                        {c.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
                      </div>
                      <span className={`text-sm ${c.completed ? "text-on-surface" : "text-on-surface-variant"}`}>{c.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-xs text-on-surface-variant">
                  {checklist.filter(c => c.completed).length}/{checklist.length} items completed
                </div>
              </div>

              <button onClick={() => setJoinState("prechecks")} className="w-full px-6 py-3.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">
                Continue to Device Check
              </button>
            </>
          )}

          {joinState === "prechecks" && (
            <>
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
                <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">AO</span>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <button onClick={() => setCameraOn(!cameraOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? "bg-white/20 hover:bg-white/30" : "bg-red-600"}`}>
                      {cameraOn ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.546-.547.878-1.243.878-1.966V7.5a2.25 2.25 0 0 0-2.25-2.25h-9c-.723 0-1.42.332-1.966.878M2.25 2.25l19.5 19.5" /></svg>
                      )}
                    </button>
                    <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/20 hover:bg-white/30" : "bg-red-600"}`}>
                      {micOn ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" /></svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-on-surface mb-3">Device Check</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span className="text-sm text-on-surface">Camera</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{cameraOn ? "Working" : "Off"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span className="text-sm text-on-surface">Microphone</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{micOn ? "Working" : "Muted"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span className="text-sm text-on-surface">Internet Connection</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Strong (45 Mbps)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span className="text-sm text-on-surface">Speaker</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Working</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setJoinState("lobby")} className="px-6 py-3 bg-surface-container-low text-on-surface rounded-xl font-medium text-sm hover:bg-surface-container transition-all border border-outline-variant">Back</button>
                <button onClick={() => setJoinState("incall")} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">Join Consultation</button>
              </div>
            </>
          )}

          {joinState === "incall" && (
            <>
              <div className="bg-gray-900 rounded-2xl overflow-hidden relative" style={{ minHeight: "420px" }}>
                {/* Doctor Video (main) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl font-bold text-white">{nextSession.avatar}</span>
                    </div>
                    <p className="text-white font-semibold">{nextSession.doctor}</p>
                    <p className="text-white/60 text-sm">{nextSession.specialty}</p>
                    <p className="text-green-400 text-xs mt-2 animate-pulse">Connecting...</p>
                  </div>
                </div>

                {/* Self View (picture-in-picture) */}
                <div className="absolute bottom-4 right-4 w-36 h-28 bg-gray-800 rounded-xl border-2 border-white/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">AO</span>
                  </div>
                </div>

                {/* Call Duration */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 rounded-full text-white text-xs font-medium">
                  00:00
                </div>

                {/* HIPAA Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-900/70 rounded-full text-green-300 text-xs font-medium flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                  End-to-End Encrypted
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/20 hover:bg-white/30" : "bg-red-600"}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                  </button>
                  <button onClick={() => setCameraOn(!cameraOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? "bg-white/20 hover:bg-white/30" : "bg-red-600"}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
                  </button>
                  <button onClick={() => { setJoinState("lobby"); setTab("upcoming"); }} className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 0 0-2.67-1.85.996.996 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" /></svg>
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">HIPAA-Compliant Session</p>
                      <p className="text-xs text-on-surface-variant">This consultation is encrypted and recorded for medical records</p>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant">{nextSession.id}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
