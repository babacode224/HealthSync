"use client";

import { useState } from "react";

const emergencyContacts = [
  { id: 1, name: "Dr. Adebayo Ogundimu", relation: "Primary Doctor", phone: "+234 801 234 5678", type: "doctor" },
  { id: 2, name: "Chioma Okafor", relation: "Wife", phone: "+234 803 456 7890", type: "family" },
  { id: 3, name: "Emeka Okafor Sr.", relation: "Father", phone: "+234 805 678 9012", type: "family" },
  { id: 4, name: "National Emergency", relation: "NEMA Hotline", phone: "112", type: "service" },
  { id: 5, name: "Poison Control", relation: "NAFDAC Emergency", phone: "+234 800 162 3322", type: "service" },
];

const nearbyFacilities = [
  { id: 1, name: "Lagos University Teaching Hospital", type: "hospital", distance: "2.3 km", rating: 4.6, emergency: true, address: "Idi-Araba, Surulere, Lagos", phone: "+234 1 584 1491", waitTime: "~15 min", open: true },
  { id: 2, name: "Reddington Hospital", type: "hospital", distance: "3.1 km", rating: 4.8, emergency: true, address: "12 Idowu Martins St, Victoria Island", phone: "+234 1 271 2530", waitTime: "~8 min", open: true },
  { id: 3, name: "St. Nicholas Hospital", type: "hospital", distance: "4.5 km", rating: 4.5, emergency: true, address: "57 Campbell St, Lagos Island", phone: "+234 1 263 5071", waitTime: "~20 min", open: true },
  { id: 4, name: "MedPlus Pharmacy", type: "pharmacy", distance: "0.8 km", rating: 4.4, emergency: false, address: "25 Allen Avenue, Ikeja", phone: "+234 1 794 7842", waitTime: null, open: true },
  { id: 5, name: "HealthPlus Pharmacy", type: "pharmacy", distance: "1.2 km", rating: 4.7, emergency: false, address: "The Palms Shopping Mall, Lekki", phone: "+234 1 279 2800", waitTime: null, open: true },
  { id: 6, name: "Evercare Hospital", type: "hospital", distance: "5.8 km", rating: 4.9, emergency: true, address: "1 Admiralty Way, Lekki Phase 1", phone: "+234 1 291 1000", waitTime: "~12 min", open: true },
];

const firstAidGuides = [
  { id: 1, title: "Heart Attack", icon: "❤️", severity: "critical", steps: ["Call 112 immediately", "Have person sit or lie down", "Give aspirin (if not allergic)", "Begin CPR if unconscious", "Use AED if available"] },
  { id: 2, title: "Choking", icon: "🫁", severity: "critical", steps: ["Ask 'Are you choking?'", "Stand behind the person", "Give 5 back blows between shoulder blades", "Give 5 abdominal thrusts (Heimlich)", "Repeat until object is expelled"] },
  { id: 3, title: "Severe Bleeding", icon: "🩸", severity: "high", steps: ["Apply direct pressure with clean cloth", "Keep pressure steady for 15 minutes", "Elevate the wound above the heart", "Apply tourniquet if bleeding won't stop", "Call emergency services"] },
  { id: 4, title: "Burns", icon: "🔥", severity: "high", steps: ["Cool burn under running water 10-20 min", "Remove clothing/jewelry near burn", "Cover with clean, non-stick dressing", "Do NOT apply ice, butter, or ointments", "Seek medical care for large/deep burns"] },
  { id: 5, title: "Seizure", icon: "⚡", severity: "high", steps: ["Clear area of dangerous objects", "Place person on their side", "Do NOT restrain or put anything in mouth", "Time the seizure", "Call 112 if seizure lasts > 5 minutes"] },
  { id: 6, title: "Allergic Reaction", icon: "💉", severity: "critical", steps: ["Use epinephrine auto-injector if available", "Call 112 immediately", "Help person lie down with legs elevated", "Loosen tight clothing", "Monitor breathing, begin CPR if needed"] },
  { id: 7, title: "Fracture / Broken Bone", icon: "🦴", severity: "medium", steps: ["Immobilize the injured area", "Apply ice wrapped in cloth", "Do NOT try to realign the bone", "Control any bleeding with gentle pressure", "Seek immediate medical attention"] },
  { id: 8, title: "Snake Bite", icon: "🐍", severity: "critical", steps: ["Move away from the snake", "Keep the person calm and still", "Remove jewelry near the bite", "Do NOT suck out venom or apply tourniquet", "Get to hospital immediately with snake description"] },
];

const emergencyHistory = [
  { id: 1, date: "2026-05-14", type: "SOS Activated", location: "Victoria Island, Lagos", responder: "LASEMA", outcome: "Resolved - Chest pain (non-cardiac)", duration: "23 min" },
  { id: 2, date: "2026-03-02", type: "Emergency Call", location: "Home Address", responder: "Dr. Adebayo Ogundimu", outcome: "Resolved - Severe allergic reaction", duration: "45 min" },
  { id: 3, date: "2025-11-18", type: "Hospital Visit", location: "Reddington Hospital", responder: "ER Team", outcome: "Admitted - Asthma exacerbation", duration: "4 hrs" },
];

type Tab = "sos" | "contacts" | "nearby" | "firstaid" | "medid" | "history";

export default function EmergencyPage() {
  const [tab, setTab] = useState<Tab>("sos");
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

  const filteredFacilities = facilityFilter === "all" ? nearbyFacilities : nearbyFacilities.filter(f => f.type === facilityFilter);

  const startSOS = () => {
    setSosCountdown(5);
    const interval = setInterval(() => {
      setSosCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setSosActive(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    setSosCountdown(null);
    setSosActive(false);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "sos", label: "SOS" },
    { key: "contacts", label: "Contacts" },
    { key: "nearby", label: "Nearby" },
    { key: "firstaid", label: "First Aid" },
    { key: "medid", label: "Medical ID" },
    { key: "history", label: "History" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Emergency Services</h1>
        <p className="text-on-surface-variant text-sm mt-1">SOS activation, emergency contacts, and first aid guides</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* SOS Tab */}
      {tab === "sos" && (
        <div className="space-y-6">
          <div className={`rounded-2xl p-8 text-center ${sosActive ? "bg-red-600" : sosCountdown !== null ? "bg-amber-500" : "bg-surface-container-lowest border border-outline-variant"}`}>
            {!sosActive && sosCountdown === null && (
              <>
                <div className="w-32 h-32 mx-auto rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-700 active:scale-95 transition-all shadow-lg" onClick={startSOS}>
                  <span className="text-white text-2xl font-black">SOS</span>
                </div>
                <h2 className="text-xl font-bold text-on-surface mt-6">Emergency SOS</h2>
                <p className="text-on-surface-variant text-sm mt-2 max-w-md mx-auto">Press and hold the SOS button to alert emergency services. Your location, medical ID, and emergency contacts will be shared automatically.</p>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-on-surface-variant">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                  Location sharing enabled
                </div>
              </>
            )}

            {sosCountdown !== null && (
              <>
                <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-5xl font-black">{sosCountdown}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-6">Activating SOS...</h2>
                <p className="text-white/80 text-sm mt-2">Emergency services will be contacted in {sosCountdown} seconds</p>
                <button onClick={cancelSOS} className="mt-6 px-8 py-3 bg-white text-amber-600 rounded-xl font-bold hover:opacity-90 transition-all">Cancel</button>
              </>
            )}

            {sosActive && (
              <>
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">SOS Active</h2>
                <p className="text-white/80 text-sm mt-2">Emergency services have been notified. Help is on the way.</p>
                <div className="mt-4 space-y-2 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-2 text-white/90 text-sm"><svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> Location shared with LASEMA</div>
                  <div className="flex items-center gap-2 text-white/90 text-sm"><svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> Medical ID sent to responders</div>
                  <div className="flex items-center gap-2 text-white/90 text-sm"><svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> Emergency contacts notified</div>
                  <div className="flex items-center gap-2 text-white/90 text-sm"><svg className="w-4 h-4 text-yellow-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg> Nearest ambulance dispatched (ETA: 8 min)</div>
                </div>
                <button onClick={cancelSOS} className="mt-6 px-8 py-3 bg-white text-red-600 rounded-xl font-bold hover:opacity-90 transition-all">Deactivate SOS</button>
              </>
            )}
          </div>

          {!sosActive && sosCountdown === null && (
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" /></svg>
                </div>
                <h3 className="font-semibold text-on-surface text-sm">Call 112</h3>
                <p className="text-xs text-on-surface-variant mt-1">National Emergency Line</p>
              </button>
              <button className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                </div>
                <h3 className="font-semibold text-on-surface text-sm">Share Location</h3>
                <p className="text-xs text-on-surface-variant mt-1">Send live GPS to contacts</p>
              </button>
              <button className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
                </div>
                <h3 className="font-semibold text-on-surface text-sm">Text Emergency</h3>
                <p className="text-xs text-on-surface-variant mt-1">SMS when you can't call</p>
              </button>
              <button className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                </div>
                <h3 className="font-semibold text-on-surface text-sm">Safety Tips</h3>
                <p className="text-xs text-on-surface-variant mt-1">Stay safe in emergencies</p>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Emergency Contacts Tab */}
      {tab === "contacts" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Emergency Contacts</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Contact</button>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map(c => (
              <div key={c.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${c.type === "doctor" ? "bg-primary" : c.type === "family" ? "bg-green-600" : "bg-red-600"}`}>
                      {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-on-surface text-sm">{c.name}</h3>
                      <p className="text-xs text-on-surface-variant">{c.relation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant hidden sm:block">{c.phone}</span>
                    <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-all">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L5.963 3.102A1.125 1.125 0 0 0 4.872 2.25H3.5A2.25 2.25 0 0 0 1.25 4.5v2.25Z" /></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-all">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <span className="text-sm font-semibold text-blue-800">Emergency contacts are automatically notified during SOS activation</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">Your medical ID and live location are shared with all listed contacts when SOS is triggered.</p>
          </div>
        </div>
      )}

      {/* Nearby Facilities Tab */}
      {tab === "nearby" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["all", "hospital", "pharmacy"].map(f => (
                <button key={f} onClick={() => setFacilityFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${facilityFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {f === "all" ? `All (${nearbyFacilities.length})` : `${f}s (${nearbyFacilities.filter(n => n.type === f).length})`}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-on-surface-variant">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
              Based on current location
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl h-48 flex items-center justify-center border border-outline-variant">
            <div className="text-center text-on-surface-variant">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
              <p className="text-sm font-medium">Map View</p>
              <p className="text-xs">Interactive map showing nearby facilities</p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredFacilities.map(f => (
              <div key={f.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface text-sm">{f.name}</h3>
                      {f.emergency && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-red-100 text-red-800">ER</span>}
                      {f.open && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-green-100 text-green-800">Open</span>}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">{f.address}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-semibold text-primary">{f.distance}</span>
                      <span className="text-xs text-on-surface-variant flex items-center gap-1">
                        <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {f.rating}
                      </span>
                      {f.waitTime && <span className="text-xs text-on-surface-variant">Wait: {f.waitTime}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-all">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L5.963 3.102A1.125 1.125 0 0 0 4.872 2.25H3.5A2.25 2.25 0 0 0 1.25 4.5v2.25Z" /></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-all">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* First Aid Tab */}
      {tab === "firstaid" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <svg className="w-5 h-5 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
            <p className="text-sm text-amber-800">First aid guides are for reference only. Always call emergency services (112) for serious medical emergencies.</p>
          </div>

          {selectedGuide === null ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {firstAidGuides.map(g => (
                <button key={g.id} onClick={() => setSelectedGuide(g.id)} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all text-left">
                  <div className="text-3xl mb-2">{g.icon}</div>
                  <h3 className="font-semibold text-on-surface text-sm">{g.title}</h3>
                  <span className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${g.severity === "critical" ? "bg-red-100 text-red-800" : g.severity === "high" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>{g.severity}</span>
                </button>
              ))}
            </div>
          ) : (
            (() => {
              const guide = firstAidGuides.find(g => g.id === selectedGuide)!;
              return (
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
                  <div className="bg-primary p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{guide.icon}</span>
                        <div>
                          <h3 className="text-on-primary font-bold text-lg">{guide.title}</h3>
                          <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${guide.severity === "critical" ? "bg-red-400/30 text-white" : "bg-amber-400/30 text-white"}`}>{guide.severity} severity</span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedGuide(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <h4 className="font-semibold text-on-surface">Step-by-Step Instructions</h4>
                    <div className="space-y-3">
                      {guide.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{i + 1}</div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-on-surface">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                      <p className="text-sm text-red-800 font-semibold">Always call 112 for emergencies. These steps are supplementary guidance while waiting for professional help.</p>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* Medical ID Tab */}
      {tab === "medid" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" /></svg>
                <span className="font-bold text-sm">HealthSync Medical ID</span>
              </div>
              <span className="text-xs opacity-70">HSP-2024-0847</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">Adewale Okafor</div>
                <div className="text-sm opacity-80">Male · 42 years · Blood Type: O+</div>
              </div>
              <div className="h-px bg-white/20" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs opacity-60 uppercase">Allergies</div>
                  <div className="font-medium">Penicillin, Sulfa drugs</div>
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase">Conditions</div>
                  <div className="font-medium">Hypertension, Type 2 Diabetes</div>
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase">Current Medications</div>
                  <div className="font-medium">Metformin 1000mg, Lisinopril 10mg</div>
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase">Emergency Contact</div>
                  <div className="font-medium">Chioma Okafor (Wife)</div>
                  <div className="text-xs opacity-80">+234 803 456 7890</div>
                </div>
              </div>
              <div className="h-px bg-white/20" />
              <div className="text-sm">
                <div className="text-xs opacity-60 uppercase">Primary Doctor</div>
                <div className="font-medium">Dr. Adebayo Ogundimu · +234 801 234 5678</div>
              </div>
              <div className="text-sm">
                <div className="text-xs opacity-60 uppercase">Insurance</div>
                <div className="font-medium">AXA Mansard Gold Plus · AXM-2024-0847</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <button className="px-4 py-3 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
              Share Medical ID
            </button>
            <button className="px-4 py-3 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
              Edit Information
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
              <span className="text-sm font-semibold text-green-800">HIPAA Compliant</span>
            </div>
            <p className="text-xs text-green-700 mt-1">Your Medical ID is encrypted and only shared with authorized emergency responders and your designated contacts.</p>
          </div>
        </div>
      )}

      {/* Emergency History Tab */}
      {tab === "history" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Emergency History</h2>
          <div className="space-y-3">
            {emergencyHistory.map(h => (
              <div key={h.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${h.type === "SOS Activated" ? "bg-red-100 text-red-800" : h.type === "Emergency Call" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>{h.type}</span>
                      <span className="text-xs text-on-surface-variant">{h.date}</span>
                    </div>
                    <p className="text-sm font-medium text-on-surface mt-2">{h.outcome}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>{h.location}</span>
                      <span>Responder: {h.responder}</span>
                      <span>Duration: {h.duration}</span>
                    </div>
                  </div>
                  <button className="text-xs text-primary font-medium hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {emergencyHistory.length > 0 && (
            <button className="w-full px-4 py-3 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Export Emergency History (PDF)</button>
          )}
        </div>
      )}
    </div>
  );
}
