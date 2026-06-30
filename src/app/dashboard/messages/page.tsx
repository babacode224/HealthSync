"use client";

import { useState } from "react";

const conversations = [
  { id: 1, doctor: "Dr. Sarah Chen", specialty: "Cardiology", avatar: "SC", avatarBg: "bg-primary", lastMessage: "Your test results look good. Let's schedule a follow-up.", time: "2:30 PM", unread: 2, online: true },
  { id: 2, doctor: "Dr. Michael Obi", specialty: "Dermatology", avatar: "MO", avatarBg: "bg-secondary", lastMessage: "Please apply the cream twice daily and let me know if the rash persists.", time: "Yesterday", unread: 0, online: false },
  { id: 3, doctor: "Dr. Amara Eze", specialty: "General Practice", avatar: "AE", avatarBg: "bg-tertiary", lastMessage: "I've sent your prescription to HealthPlus Pharmacy.", time: "Jun 20", unread: 0, online: true },
  { id: 4, doctor: "Dr. Fatima Bello", specialty: "Neurology", avatar: "FB", avatarBg: "bg-secondary", lastMessage: "How are the headaches? Any improvement with the new medication?", time: "Jun 18", unread: 1, online: false },
  { id: 5, doctor: "Dr. Chidi Nwankwo", specialty: "Orthopedics", avatar: "CN", avatarBg: "bg-tertiary", lastMessage: "Your X-ray shows significant improvement. Keep up the exercises.", time: "Jun 15", unread: 0, online: false },
];

type Message = { id: number; sender: "patient" | "doctor"; text: string; time: string; type?: "text" | "file" | "image"; fileName?: string };

const chatMessages: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "patient", text: "Hi Dr. Chen, I've been feeling some chest tightness lately.", time: "2:10 PM" },
    { id: 2, sender: "doctor", text: "I'm sorry to hear that. Can you describe when it happens? Is it during physical activity or at rest?", time: "2:12 PM" },
    { id: 3, sender: "patient", text: "Mostly when I climb stairs or walk fast. It goes away after a few minutes of rest.", time: "2:15 PM" },
    { id: 4, sender: "doctor", text: "That's helpful information. Based on your recent ECG and these symptoms, I'd like to run a stress test. I'll also review your blood work from last week.", time: "2:18 PM" },
    { id: 5, sender: "doctor", text: "Your test results look good. Let's schedule a follow-up.", time: "2:30 PM" },
    { id: 6, sender: "doctor", text: "In the meantime, please continue taking your medication as prescribed and avoid strenuous exercise until we complete the stress test.", time: "2:31 PM" },
  ],
  2: [
    { id: 1, sender: "patient", text: "Dr. Obi, the rash on my arm has spread slightly.", time: "Yesterday, 10:00 AM" },
    { id: 2, sender: "patient", text: "I've attached a photo.", time: "Yesterday, 10:01 AM", type: "image", fileName: "rash_photo.jpg" },
    { id: 3, sender: "doctor", text: "Thank you for sharing that. It looks like contact dermatitis. Have you been exposed to any new soaps, detergents, or fabrics?", time: "Yesterday, 10:15 AM" },
    { id: 4, sender: "patient", text: "I did switch to a new laundry detergent last week.", time: "Yesterday, 10:20 AM" },
    { id: 5, sender: "doctor", text: "That's likely the cause. Please switch back to your previous detergent. I'm prescribing a hydrocortisone cream.", time: "Yesterday, 10:25 AM" },
    { id: 6, sender: "doctor", text: "Please apply the cream twice daily and let me know if the rash persists.", time: "Yesterday, 10:26 AM" },
  ],
  3: [
    { id: 1, sender: "patient", text: "Good morning Dr. Eze, I need a refill on my blood pressure medication.", time: "Jun 20, 9:00 AM" },
    { id: 2, sender: "doctor", text: "Good morning! I can see your prescription is due for renewal. How have you been feeling? Any dizziness or side effects?", time: "Jun 20, 9:05 AM" },
    { id: 3, sender: "patient", text: "No side effects. Feeling great actually. My home readings have been around 120/80.", time: "Jun 20, 9:10 AM" },
    { id: 4, sender: "doctor", text: "Excellent! Those are great numbers. I've renewed your prescription for 3 months.", time: "Jun 20, 9:15 AM" },
    { id: 5, sender: "doctor", text: "I've sent your prescription to HealthPlus Pharmacy.", time: "Jun 20, 9:16 AM" },
  ],
  4: [
    { id: 1, sender: "doctor", text: "Hello, this is Dr. Bello. I wanted to check in on the migraine medication we started two weeks ago.", time: "Jun 18, 3:00 PM" },
    { id: 2, sender: "patient", text: "Hi Dr. Bello. The frequency has reduced from 4 times a week to about twice.", time: "Jun 18, 3:05 PM" },
    { id: 3, sender: "doctor", text: "That's good progress! Are you experiencing any side effects like drowsiness or nausea?", time: "Jun 18, 3:08 PM" },
    { id: 4, sender: "patient", text: "Slight drowsiness in the morning but it wears off by noon.", time: "Jun 18, 3:12 PM" },
    { id: 5, sender: "doctor", text: "How are the headaches? Any improvement with the new medication?", time: "Jun 18, 3:15 PM" },
  ],
  5: [
    { id: 1, sender: "doctor", text: "Good news! I've reviewed your latest X-ray.", time: "Jun 15, 11:00 AM" },
    { id: 2, sender: "doctor", text: "Your X-ray shows significant improvement. Keep up the exercises.", time: "Jun 15, 11:01 AM" },
    { id: 3, sender: "patient", text: "That's great to hear! The physiotherapy has been really helping.", time: "Jun 15, 11:05 AM" },
    { id: 4, sender: "doctor", text: "Wonderful. Continue the exercises 3 times a week. We'll do another check in 6 weeks.", time: "Jun 15, 11:10 AM" },
  ],
};

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [showMobileList, setShowMobileList] = useState(true);
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callVideo, setCallVideo] = useState(true);

  const activeConvo = conversations.find((c) => c.id === activeChat);
  const activeMessages = activeChat ? messages[activeChat] || [] : [];

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    const msg: Message = { id: Date.now(), sender: "patient", text: newMessage, time: "Just now" };
    setMessages((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), msg] }));
    setNewMessage("");
  };

  const openChat = (id: number) => {
    setActiveChat(id);
    setShowMobileList(false);
  };

  // Video call overlay
  if (inCall && activeConvo) {
    return (
      <div className="fixed inset-0 z-50 bg-inverse-surface flex flex-col">
        {/* Video area */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Doctor video (main) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-28 h-28 rounded-full ${activeConvo.avatarBg} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4`}>
                {activeConvo.avatar}
              </div>
              <h2 className="text-xl font-bold text-inverse-on-surface">{activeConvo.doctor}</h2>
              <p className="text-sm text-inverse-on-surface/60 mt-1">{activeConvo.specialty}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm text-secondary font-medium">Connected • 03:42</span>
              </div>
            </div>
          </div>

          {/* Patient video (PiP) */}
          <div className="absolute bottom-4 right-4 w-32 h-44 sm:w-40 sm:h-52 rounded-2xl bg-surface-container-highest border-2 border-outline-variant overflow-hidden flex items-center justify-center">
            {callVideo ? (
              <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg">AO</div>
              </div>
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 text-outline mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                <p className="text-[10px] text-outline mt-1">Camera off</p>
              </div>
            )}
          </div>

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="text-xs font-medium text-white">Recording</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                End-to-End Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Call controls */}
        <div className="bg-black/40 backdrop-blur-md py-6 px-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCallMuted(!callMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${callMuted ? "bg-white text-inverse-surface" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              {callMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 19 17.591 17.591 5.409 5.409 4 4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 5.592-3.841M12 18.75V22.5m0-3.75a6 6 0 0 1-6-6v-1.5m0 0V6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5.25" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
              )}
            </button>
            <button
              onClick={() => setCallVideo(!callVideo)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${!callVideo ? "bg-white text-inverse-surface" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            </button>
            <button className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
            </button>
            <button className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" /></svg>
            </button>
            <button
              onClick={() => setInCall(false)}
              className="w-16 h-14 rounded-full bg-error text-on-error flex items-center justify-center hover:opacity-90 transition-all"
            >
              <svg className="w-7 h-7 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </button>
          </div>
          <p className="text-center text-xs text-white/50 mt-3">HIPAA-Compliant Telehealth Session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-0 h-[calc(100vh-120px)] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">

        {/* Conversation list */}
        <div className={`w-full sm:w-80 lg:w-96 border-r border-outline-variant flex flex-col shrink-0 ${!showMobileList && activeChat ? "hidden sm:flex" : "flex"}`}>
          <div className="p-4 border-b border-outline-variant">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-on-surface">Messages</h2>
              <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
              </button>
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => openChat(convo.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all hover:bg-surface-container-low ${activeChat === convo.id ? "bg-primary-fixed/50 border-r-2 border-primary" : ""}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-full ${convo.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                    {convo.avatar}
                  </div>
                  {convo.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-surface-container-lowest" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-sm font-semibold text-on-surface truncate ${convo.unread > 0 ? "font-bold" : ""}`}>{convo.doctor}</h3>
                    <span className="text-[10px] text-on-surface-variant whitespace-nowrap ml-2">{convo.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate mt-0.5">{convo.specialty}</p>
                  <p className={`text-xs truncate mt-0.5 ${convo.unread > 0 ? "text-on-surface font-medium" : "text-outline"}`}>{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {activeChat && activeConvo ? (
          <div className={`flex-1 flex flex-col ${showMobileList ? "hidden sm:flex" : "flex"}`}>
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-outline-variant flex items-center gap-3">
              <button onClick={() => setShowMobileList(true)} className="sm:hidden p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
                <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
              </button>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full ${activeConvo.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                  {activeConvo.avatar}
                </div>
                {activeConvo.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-surface-container-lowest" />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-on-surface">{activeConvo.doctor}</h3>
                <p className="text-xs text-on-surface-variant">{activeConvo.specialty} {activeConvo.online && <span className="text-secondary font-medium">• Online</span>}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="Voice Call">
                  <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                </button>
                <button onClick={() => setInCall(true)} className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="Video Call">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="More">
                  <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center">
                <span className="text-[10px] font-semibold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                  Today
                </span>
              </div>
              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] ${msg.sender === "patient" ? "order-1" : ""}`}>
                    {msg.type === "image" ? (
                      <div className={`rounded-2xl p-3 ${msg.sender === "patient" ? "bg-primary text-on-primary rounded-br-md" : "bg-surface-container-high text-on-surface rounded-bl-md"}`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75Z" /></svg>
                          <span className="text-xs font-medium">{msg.fileName}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === "patient" ? "text-on-primary/60" : "text-outline"}`}>{msg.time}</p>
                      </div>
                    ) : (
                      <div className={`rounded-2xl px-4 py-2.5 ${msg.sender === "patient" ? "bg-primary text-on-primary rounded-br-md" : "bg-surface-container-high text-on-surface rounded-bl-md"}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === "patient" ? "text-on-primary/60" : "text-outline"}`}>{msg.time}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* HIPAA notice */}
            <div className="px-4 pt-1">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-outline">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                End-to-end encrypted • HIPAA compliant
              </div>
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-outline-variant">
              <div className="flex items-end gap-2">
                <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors shrink-0">
                  <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  className={`p-2.5 rounded-xl transition-all shrink-0 ${newMessage.trim() ? "bg-primary text-on-primary hover:opacity-90" : "bg-surface-container-high text-outline"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden sm:flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-on-surface mb-1">Select a Conversation</h3>
              <p className="text-xs text-on-surface-variant">Choose a doctor from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
