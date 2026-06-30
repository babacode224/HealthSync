"use client";

import { useState, useEffect, useRef } from "react";

type View = "lobby" | "call" | "summary";
type CallTab = "vitals" | "notes" | "history" | "prescribe";

interface WaitingPatient {
  id: string;
  name: string;
  initials: string;
  age: number;
  sex: string;
  reason: string;
  waitTime: string;
  priority: "normal" | "urgent";
  appointmentTime: string;
  insuranceStatus: string;
}

interface VitalSign {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "elevated" | "low" | "critical";
  trend?: "up" | "down" | "stable";
}

const waitingPatients: WaitingPatient[] = [
  { id: "p-1", name: "Adebayo Oluwatobi", initials: "AO", age: 34, sex: "M", reason: "Follow-up: Diabetes management", waitTime: "2 min", priority: "normal", appointmentTime: "10:00 AM", insuranceStatus: "Verified" },
  { id: "p-2", name: "Chioma Eze", initials: "CE", age: 28, sex: "F", reason: "New: Persistent migraines", waitTime: "8 min", priority: "urgent", appointmentTime: "10:30 AM", insuranceStatus: "Verified" },
  { id: "p-3", name: "Ibrahim Musa", initials: "IM", age: 52, sex: "M", reason: "Follow-up: Hypertension check", waitTime: "0 min", priority: "normal", appointmentTime: "11:00 AM", insuranceStatus: "Pending" },
  { id: "p-4", name: "Fatima Yusuf", initials: "FY", age: 41, sex: "F", reason: "New: Joint pain & stiffness", waitTime: "—", priority: "normal", appointmentTime: "11:30 AM", insuranceStatus: "Verified" },
];

const patientVitals: VitalSign[] = [
  { label: "Blood Pressure", value: "138/88", unit: "mmHg", status: "elevated", trend: "up" },
  { label: "Heart Rate", value: "78", unit: "bpm", status: "normal", trend: "stable" },
  { label: "Temperature", value: "36.8", unit: "°C", status: "normal", trend: "stable" },
  { label: "SpO2", value: "97", unit: "%", status: "normal", trend: "stable" },
  { label: "Blood Glucose", value: "142", unit: "mg/dL", status: "elevated", trend: "up" },
  { label: "Weight", value: "82.5", unit: "kg", status: "normal", trend: "up" },
];

const patientHistory = [
  { date: "2024-05-15", type: "Consultation", provider: "Dr. Ogundimu", notes: "HbA1c at 7.2%, adjusted Metformin to 1000mg BD. Advised dietary changes." },
  { date: "2024-04-10", type: "Lab Result", provider: "PathCare Lab", notes: "CBC normal. Lipid panel: LDL 145mg/dL (elevated). Fasting glucose 128mg/dL." },
  { date: "2024-03-01", type: "Consultation", provider: "Dr. Ogundimu", notes: "Initial diabetes diagnosis. Started Metformin 500mg BD. Referred to dietitian." },
];

const statusColor: Record<string, string> = {
  normal: "text-secondary",
  elevated: "text-tertiary",
  low: "text-primary",
  critical: "text-error",
};

const statusBg: Record<string, string> = {
  normal: "bg-secondary-container/30",
  elevated: "bg-tertiary-fixed/30",
  low: "bg-primary-fixed",
  critical: "bg-error-container/50",
};

export default function TelehealthPage() {
  const [view, setView] = useState<View>("lobby");
  const [activePatient, setActivePatient] = useState<WaitingPatient | null>(null);
  const [callTab, setCallTab] = useState<CallTab>("vitals");
  const [elapsed, setElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [notes, setNotes] = useState("");
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string; time: string }[]>([
    { from: "system", text: "Call connected. Session is being recorded for medical records.", time: "10:00" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [rxDrug, setRxDrug] = useState("");
  const [rxDosage, setRxDosage] = useState("");
  const [rxFrequency, setRxFrequency] = useState("");
  const [rxDuration, setRxDuration] = useState("");
  const [rxNotes, setRxNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState<{ drug: string; dosage: string; frequency: string; duration: string }[]>([]);
  const [summaryDiagnosis, setSummaryDiagnosis] = useState("");
  const [summaryPlan, setSummaryPlan] = useState("");
  const [summaryFollowUp, setSummaryFollowUp] = useState("2 weeks");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (view === "call") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [view]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const startCall = (patient: WaitingPatient) => {
    setActivePatient(patient);
    setElapsed(0);
    setNotes("");
    setPrescriptions([]);
    setView("call");
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setView("summary");
  };

  const addPrescription = () => {
    if (rxDrug && rxDosage && rxFrequency && rxDuration) {
      setPrescriptions((p) => [...p, { drug: rxDrug, dosage: rxDosage, frequency: rxFrequency, duration: rxDuration }]);
      setRxDrug(""); setRxDosage(""); setRxFrequency(""); setRxDuration(""); setRxNotes("");
    }
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((m) => [...m, { from: "doctor", text: chatInput, time: formatTime(elapsed) }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((m) => [...m, { from: "patient", text: "Okay, doctor. Thank you for explaining.", time: formatTime(elapsed + 2) }]);
    }, 1500);
  };

  // LOBBY VIEW
  if (view === "lobby") {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Telehealth Console</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">Virtual consultation waiting room</p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Online
            </span>
            <span className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold">
              {waitingPatients.length} in queue
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Today's Sessions", value: "8", sub: "3 completed", color: "text-primary" },
            { label: "In Queue", value: String(waitingPatients.length), sub: "1 urgent", color: "text-tertiary" },
            { label: "Avg Duration", value: "18 min", sub: "↓ 2 min vs last week", color: "text-secondary" },
            { label: "Patient Rating", value: "4.9", sub: "Last 30 days", color: "text-tertiary" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
              <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">{s.label}</div>
              <div className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-on-surface-variant mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Waiting Room */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface">Waiting Room</h3>
            <span className="text-xs text-on-surface-variant">Sorted by appointment time</span>
          </div>
          {waitingPatients.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">{p.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface">{p.name}</span>
                  <span className="text-[10px] text-on-surface-variant">{p.age}{p.sex} </span>
                  {p.priority === "urgent" && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error text-on-error">URGENT</span>
                  )}
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">{p.reason}</div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-outline">
                  <span>Appt: {p.appointmentTime}</span>
                  <span>Wait: {p.waitTime}</span>
                  <span className={p.insuranceStatus === "Verified" ? "text-secondary" : "text-tertiary"}>Insurance: {p.insuranceStatus}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startCall(p)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  Start Call
                </button>
                <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment Check */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-3">System Check</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Camera", status: "Ready" },
              { label: "Microphone", status: "Ready" },
              { label: "Connection", status: "Strong (45 Mbps)" },
              { label: "Recording", status: "Enabled" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                <span className="text-on-surface font-medium">{c.label}:</span>
                <span className="text-on-surface-variant">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // CALL VIEW
  if (view === "call" && activePatient) {
    return (
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Call Header */}
        <div className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">{activePatient.initials}</div>
            <div>
              <span className="text-sm font-bold text-on-surface">{activePatient.name}</span>
              <span className="text-xs text-on-surface-variant ml-2">{activePatient.age}{activePatient.sex}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container/50 text-error text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              REC {formatTime(elapsed)}
            </div>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/30 text-secondary text-[10px] font-semibold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              E2E Encrypted
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Video Area */}
          <div className="flex-1 space-y-3">
            <div className="relative bg-on-surface rounded-xl overflow-hidden aspect-video">
              {/* Patient video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-surface-container-high/30 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-surface">{activePatient.initials}</span>
                  </div>
                  <div className="text-surface text-sm font-medium">{activePatient.name}</div>
                  <div className="text-surface/50 text-xs mt-1">Video Connected</div>
                </div>
              </div>
              {/* Doctor PiP */}
              <div className="absolute bottom-4 right-4 w-36 h-24 bg-surface-container-high rounded-lg border-2 border-surface overflow-hidden flex items-center justify-center">
                {isVideoOff ? (
                  <div className="text-center">
                    <svg className="w-6 h-6 text-on-surface-variant mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                    <span className="text-[10px] text-on-surface-variant">Camera Off</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold mx-auto">DO</div>
                    <span className="text-[10px] text-on-surface-variant mt-1">You</span>
                  </div>
                )}
              </div>
              {/* Screen share indicator */}
              {isScreenSharing && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a9 9 0 0 1-9 9m0 0a9 9 0 0 1-9-9" /></svg>
                  Sharing Screen
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3">
              <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full transition-all ${isMuted ? "bg-error text-on-error" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                {isMuted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 19 17.591 17.591 5.409 5.409 4 4m13.362 9.362A4.46 4.46 0 0 0 17.5 12V9.5M12 15.5A3.5 3.5 0 0 1 8.5 12v-1m7.5 0V7a3.5 3.5 0 0 0-7 0v1" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                )}
              </button>
              <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-3 rounded-full transition-all ${isVideoOff ? "bg-error text-on-error" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                {isVideoOff ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                )}
              </button>
              <button onClick={() => setIsScreenSharing(!isScreenSharing)} className={`p-3 rounded-full transition-all ${isScreenSharing ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a9 9 0 0 1-9 9m0 0a9 9 0 0 1-9-9" /></svg>
              </button>
              <div className="w-px h-8 bg-outline-variant mx-1" />
              <button onClick={endCall} className="flex items-center gap-2 px-5 py-3 rounded-full bg-error text-on-error font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15" /></svg>
                End Call
              </button>
            </div>

            {/* Chat */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-outline-variant">
                <h4 className="text-xs font-bold text-on-surface">In-Call Chat</h4>
              </div>
              <div className="h-28 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "doctor" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-1.5 rounded-lg text-xs ${m.from === "doctor" ? "bg-primary text-on-primary" : m.from === "system" ? "bg-surface-container-high text-on-surface-variant italic" : "bg-surface-container-high text-on-surface"}`}>
                      {m.text}
                      <span className={`block text-[10px] mt-0.5 ${m.from === "doctor" ? "text-on-primary/60" : "text-outline"}`}>{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 p-2 border-t border-outline-variant">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={sendChat} className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all">Send</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 shrink-0 space-y-3">
            {/* Sidebar Tabs */}
            <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5">
              {(["vitals", "notes", "history", "prescribe"] as CallTab[]).map((t) => (
                <button key={t} onClick={() => setCallTab(t)} className={`flex-1 px-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${callTab === t ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Vitals Tab */}
            {callTab === "vitals" && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">Patient Vitals</h4>
                {patientVitals.map((v) => (
                  <div key={v.label} className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{v.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${statusColor[v.status]}`}>{v.value}</span>
                      <span className="text-[10px] text-on-surface-variant">{v.unit}</span>
                      {v.trend === "up" && <svg className="w-3 h-3 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>}
                      {v.trend === "down" && <svg className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>}
                      {v.trend === "stable" && <svg className="w-3 h-3 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>}
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-outline-variant">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-tertiary-fixed/30">
                    <svg className="w-4 h-4 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                    <div className="text-[10px] text-tertiary"><span className="font-bold">AI Note:</span> BP and glucose trending upward since last visit. Consider medication adjustment.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {callTab === "notes" && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">Consultation Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type clinical notes here..."
                  rows={12}
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                <button className="w-full py-2 rounded-lg bg-surface-container-high text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
                  AI Auto-Summarize
                </button>
              </div>
            )}

            {/* History Tab */}
            {callTab === "history" && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">Patient History</h4>
                <div className="space-y-3">
                  {patientHistory.map((h, i) => (
                    <div key={i} className="border-l-2 border-primary pl-3 py-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-primary">{h.date}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-semibold">{h.type}</span>
                      </div>
                      <div className="text-[10px] text-on-surface-variant mb-0.5">{h.provider}</div>
                      <div className="text-xs text-on-surface">{h.notes}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-outline-variant">
                  <div className="text-xs text-on-surface-variant">
                    <span className="font-bold text-on-surface">Allergies:</span> Penicillin, Sulfonamides
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    <span className="font-bold text-on-surface">Current Meds:</span> Metformin 500mg BD, Lisinopril 10mg OD
                  </div>
                </div>
              </div>
            )}

            {/* Prescribe Tab */}
            {callTab === "prescribe" && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">E-Prescribe</h4>
                <div className="space-y-2">
                  <input value={rxDrug} onChange={(e) => setRxDrug(e.target.value)} placeholder="Drug name" className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={rxDosage} onChange={(e) => setRxDosage(e.target.value)} placeholder="Dosage (e.g. 500mg)" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                    <select value={rxFrequency} onChange={(e) => setRxFrequency(e.target.value)} className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Frequency</option>
                      <option>OD (Once daily)</option>
                      <option>BD (Twice daily)</option>
                      <option>TDS (Three times)</option>
                      <option>QDS (Four times)</option>
                      <option>PRN (As needed)</option>
                    </select>
                  </div>
                  <input value={rxDuration} onChange={(e) => setRxDuration(e.target.value)} placeholder="Duration (e.g. 30 days)" className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                  <textarea value={rxNotes} onChange={(e) => setRxNotes(e.target.value)} placeholder="Special instructions..." rows={2} className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                  <button onClick={addPrescription} className="w-full py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Add to Prescription</button>
                </div>
                {prescriptions.length > 0 && (
                  <div className="border-t border-outline-variant pt-2 space-y-1.5">
                    <h5 className="text-[10px] font-bold text-on-surface-variant uppercase">Queued ({prescriptions.length})</h5>
                    {prescriptions.map((rx, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low text-xs">
                        <div>
                          <span className="font-semibold text-on-surface">{rx.drug}</span>
                          <span className="text-on-surface-variant ml-1">{rx.dosage} · {rx.frequency} · {rx.duration}</span>
                        </div>
                        <button onClick={() => setPrescriptions((p) => p.filter((_, j) => j !== i))} className="text-error text-[10px] font-bold">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY VIEW
  if (view === "summary" && activePatient) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Call Completed</h1>
          <p className="text-sm text-on-surface-variant mt-1">Session with {activePatient.name} · Duration: {formatTime(elapsed)}</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-on-surface">Post-Call Summary</h3>

          <div>
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Diagnosis / Assessment</label>
            <textarea value={summaryDiagnosis} onChange={(e) => setSummaryDiagnosis(e.target.value)} placeholder="Enter diagnosis and clinical assessment..." rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Treatment Plan</label>
            <textarea value={summaryPlan} onChange={(e) => setSummaryPlan(e.target.value)} placeholder="Enter treatment plan and recommendations..." rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Follow-up</label>
            <select value={summaryFollowUp} onChange={(e) => setSummaryFollowUp(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>3 months</option>
              <option>As needed</option>
            </select>
          </div>

          {prescriptions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-2">Prescriptions Issued ({prescriptions.length})</h4>
              <div className="border border-outline-variant rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 px-3 py-2 bg-surface-container-low text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  <span>Drug</span><span>Dosage</span><span>Frequency</span><span>Duration</span>
                </div>
                {prescriptions.map((rx, i) => (
                  <div key={i} className="grid grid-cols-4 px-3 py-2 border-t border-outline-variant text-xs text-on-surface">
                    <span className="font-medium">{rx.drug}</span><span>{rx.dosage}</span><span>{rx.frequency}</span><span>{rx.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes && (
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1">Clinical Notes</h4>
              <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface whitespace-pre-wrap">{notes}</div>
            </div>
          )}

          <button className="w-full py-2 rounded-lg bg-surface-container-high text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
            AI Generate Summary
          </button>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">
            Save & Send to Patient
          </button>
          <button onClick={() => { setView("lobby"); setActivePatient(null); }} className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
            Return to Lobby
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-on-surface-variant justify-center">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          HIPAA-compliant recording saved. Accessible from Patient Records.
        </div>
      </div>
    );
  }

  return null;
}
