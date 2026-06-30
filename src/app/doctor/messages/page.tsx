"use client";

import { useState } from "react";

interface Thread {
  id: string;
  patient: string;
  patientId: string;
  initials: string;
  age: number;
  sex: string;
  conditions: string[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  hasAttachment: boolean;
  priority: "normal" | "urgent";
}

interface Message {
  id: string;
  sender: "doctor" | "patient" | "system";
  text: string;
  time: string;
  attachment?: { name: string; type: string };
}

const threads: Thread[] = [
  { id: "t1", patient: "Emeka Nwosu", patientId: "HS-PAT-004", initials: "EN", age: 71, sex: "Male", conditions: ["Heart Failure", "AFib", "CKD Stage 3"], lastMessage: "Doctor, I've been experiencing increased shortness of breath since yesterday evening. Should I adjust my Furosemide?", lastMessageTime: "10:38 AM", unread: 2, hasAttachment: false, priority: "urgent" },
  { id: "t2", patient: "Adebayo Oluwatobi", patientId: "HS-PAT-001", initials: "AO", age: 54, sex: "Male", conditions: ["Type 2 Diabetes", "Hypertension"], lastMessage: "Here are my blood glucose readings for the past week as requested.", lastMessageTime: "9:45 AM", unread: 1, hasAttachment: true, priority: "normal" },
  { id: "t3", patient: "Chioma Okafor", patientId: "HS-PAT-002", initials: "CO", age: 29, sex: "Female", conditions: ["Asthma"], lastMessage: "Thank you for the updated prescription, Doctor. I'll start it tonight.", lastMessageTime: "Yesterday", unread: 0, hasAttachment: false, priority: "normal" },
  { id: "t4", patient: "Fatima Bello", patientId: "HS-PAT-003", initials: "FB", age: 62, sex: "Female", conditions: ["Rheumatoid Arthritis", "Osteoporosis"], lastMessage: "My joint pain has improved significantly with the new medication. The swelling in my hands has gone down.", lastMessageTime: "Yesterday", unread: 0, hasAttachment: false, priority: "normal" },
  { id: "t5", patient: "Amina Yusuf", patientId: "HS-PAT-005", initials: "AY", age: 34, sex: "Female", conditions: ["Migraine"], lastMessage: "I had another episode last night. The Sumatriptan helped but took longer to work this time.", lastMessageTime: "Jun 25", unread: 0, hasAttachment: false, priority: "normal" },
  { id: "t6", patient: "Oluwaseun Adeyemi", patientId: "HS-PAT-006", initials: "OA", age: 41, sex: "Male", conditions: ["Peptic Ulcer Disease"], lastMessage: "Completed the H. pylori eradication therapy. When should I come in for the follow-up test?", lastMessageTime: "Jun 24", unread: 0, hasAttachment: false, priority: "normal" },
];

const messagesByThread: Record<string, Message[]> = {
  t1: [
    { id: "m1", sender: "system", text: "Conversation started — Patient: Emeka Nwosu (HS-PAT-004)", time: "June 25, 2026 — 2:00 PM" },
    { id: "m2", sender: "doctor", text: "Good afternoon, Mr. Nwosu. I've reviewed your latest echocardiogram results. Your ejection fraction has improved slightly to 38%. Let's continue with the current medication regimen.", time: "June 25, 2026 — 2:05 PM" },
    { id: "m3", sender: "patient", text: "Thank you, Doctor. That's encouraging news. I've been taking all medications as prescribed and monitoring my weight daily.", time: "June 25, 2026 — 2:30 PM" },
    { id: "m4", sender: "doctor", text: "Excellent. Please continue to weigh yourself each morning and report if you gain more than 1kg in a day or 2kg in a week. Also keep monitoring your blood pressure.", time: "June 25, 2026 — 2:45 PM" },
    { id: "m5", sender: "patient", text: "Will do, Doctor. My weight has been stable at 78kg for the past week.", time: "June 26, 2026 — 8:00 AM" },
    { id: "m6", sender: "patient", text: "Doctor, I've been experiencing increased shortness of breath since yesterday evening. Should I adjust my Furosemide?", time: "June 27, 2026 — 10:38 AM" },
  ],
  t2: [
    { id: "m7", sender: "system", text: "Conversation started — Patient: Adebayo Oluwatobi (HS-PAT-001)", time: "June 24, 2026 — 10:00 AM" },
    { id: "m8", sender: "doctor", text: "Hello Mr. Oluwatobi, I'd like to review your recent blood glucose readings before our next appointment. Could you share your log from the past 7 days?", time: "June 24, 2026 — 10:05 AM" },
    { id: "m9", sender: "patient", text: "Of course, Doctor. Let me compile them and send them over.", time: "June 24, 2026 — 10:30 AM" },
    { id: "m10", sender: "patient", text: "Here are my blood glucose readings for the past week as requested.", time: "June 27, 2026 — 9:45 AM", attachment: { name: "glucose_log_june2026.pdf", type: "PDF" } },
  ],
};

const quickReplies = [
  "Thank you for the update. I'll review and get back to you shortly.",
  "Please come in for an urgent appointment today.",
  "Continue with your current medication and monitor symptoms.",
  "I've sent a new prescription to your pharmacy.",
  "Please share your latest vitals readings.",
  "Let's schedule a telehealth follow-up to discuss this.",
];

export default function DoctorMessagesPage() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [messageText, setMessageText] = useState("");

  const totalUnread = threads.reduce((sum, t) => sum + t.unread, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Messages</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Secure messaging with patients · {totalUnread} unread</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ minHeight: "70vh" }}>
        {/* Thread list */}
        <div className={`lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col ${selectedThread ? "hidden lg:flex" : "flex"}`}>
          <div className="px-4 py-3 border-b border-outline-variant">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((t) => (
              <div key={t.id} onClick={() => setSelectedThread(t)} className={`flex items-start gap-3 px-4 py-3 border-b border-outline-variant last:border-0 cursor-pointer transition-colors ${selectedThread?.id === t.id ? "bg-primary/5" : "hover:bg-surface-container-low/50"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.priority === "urgent" ? "bg-error text-on-error" : "bg-primary text-on-primary"}`}>
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-on-surface">{t.patient}</span>
                      {t.priority === "urgent" && <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-error-container/50 text-error">URGENT</span>}
                    </div>
                    <span className="text-[10px] text-on-surface-variant shrink-0">{t.lastMessageTime}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5 truncate">{t.lastMessage}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {t.hasAttachment && (
                      <span className="flex items-center gap-0.5 text-[10px] text-on-surface-variant">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>
                        Attachment
                      </span>
                    )}
                    {t.unread > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">{t.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message view */}
        <div className={`lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col ${selectedThread ? "flex" : "hidden lg:flex"}`}>
          {!selectedThread ? (
            <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
              Select a conversation to view messages
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="px-5 py-3 border-b border-outline-variant bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedThread(null)} className="lg:hidden p-1 rounded-lg hover:bg-surface-container-low">
                    <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                  </button>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${selectedThread.priority === "urgent" ? "bg-error text-on-error" : "bg-primary text-on-primary"}`}>
                    {selectedThread.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">{selectedThread.patient}</span>
                      <span className="text-[10px] text-on-surface-variant">{selectedThread.patientId}</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant">{selectedThread.age} yrs · {selectedThread.sex} · {selectedThread.conditions.join(", ")}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="Start Telehealth">
                      <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="View Patient Record">
                      <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {(messagesByThread[selectedThread.id] || []).map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-end" : msg.sender === "system" ? "justify-center" : "justify-start"}`}>
                    {msg.sender === "system" ? (
                      <div className="text-[10px] text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">{msg.text}</div>
                    ) : (
                      <div className={`max-w-[75%] ${msg.sender === "doctor" ? "items-end" : "items-start"}`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm ${msg.sender === "doctor" ? "bg-primary text-on-primary rounded-br-md" : "bg-surface-container-high text-on-surface rounded-bl-md"}`}>
                          {msg.text}
                          {msg.attachment && (
                            <div className={`mt-2 flex items-center gap-2 px-3 py-2 rounded-lg ${msg.sender === "doctor" ? "bg-on-primary/10" : "bg-surface-container-low"}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>
                              <div>
                                <div className="text-xs font-medium">{msg.attachment.name}</div>
                                <div className="text-[10px] opacity-70">{msg.attachment.type}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`text-[10px] text-on-surface-variant mt-1 ${msg.sender === "doctor" ? "text-right" : ""}`}>{msg.time}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick replies */}
              {showQuickReplies && (
                <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-on-surface">Quick Replies</span>
                    <button onClick={() => setShowQuickReplies(false)} className="text-xs text-on-surface-variant hover:text-on-surface">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((qr, i) => (
                      <button key={i} onClick={() => { setMessageText(qr); setShowQuickReplies(false); }} className="px-3 py-1.5 rounded-full text-xs bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
                        {qr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compose */}
              <div className="px-5 py-3 border-t border-outline-variant">
                <div className="flex items-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors shrink-0" title="Attach file">
                    <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>
                  </button>
                  <button onClick={() => setShowQuickReplies(!showQuickReplies)} className="p-2 rounded-lg hover:bg-surface-container-low transition-colors shrink-0" title="Quick replies">
                    <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
                  </button>
                  <div className="flex-1">
                    <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={1} placeholder="Type your message..." className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                  </div>
                  <button className="p-2.5 rounded-xl bg-primary text-on-primary hover:opacity-90 transition-all shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-on-surface-variant">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  HIPAA-compliant · End-to-end encrypted · Messages are part of the patient medical record
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
