"use client";

import { useState } from "react";

type ApptStatus = "confirmed" | "pending" | "completed" | "cancelled";
type ApptType = "in-person" | "telemedicine";

type Appointment = { id: string; patient: string; avatar: string; avatarBg: string; time: string; endTime: string; type: ApptType; status: ApptStatus; reason: string; date: string };

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const appointments: Appointment[] = [
  { id: "APT-301", patient: "Adaeze Okafor", avatar: "AO", avatarBg: "bg-primary", time: "09:00", endTime: "09:30", type: "in-person", status: "confirmed", reason: "Blood pressure follow-up", date: "Mon" },
  { id: "APT-302", patient: "Bayo Yusuf", avatar: "BY", avatarBg: "bg-secondary", time: "10:00", endTime: "10:30", type: "telemedicine", status: "confirmed", reason: "Diabetes management review", date: "Mon" },
  { id: "APT-303", patient: "Chioma Eze", avatar: "CE", avatarBg: "bg-tertiary", time: "11:00", endTime: "11:30", type: "in-person", status: "pending", reason: "Skin rash evaluation", date: "Mon" },
  { id: "APT-304", patient: "Marcus Johnson", avatar: "MJ", avatarBg: "bg-primary", time: "14:00", endTime: "14:30", type: "in-person", status: "confirmed", reason: "Back pain follow-up", date: "Mon" },
  { id: "APT-305", patient: "Fatima Bello", avatar: "FB", avatarBg: "bg-secondary", time: "09:30", endTime: "10:00", type: "telemedicine", status: "confirmed", reason: "Migraine medication review", date: "Tue" },
  { id: "APT-306", patient: "David Adekunle", avatar: "DA", avatarBg: "bg-tertiary", time: "11:00", endTime: "11:30", type: "in-person", status: "pending", reason: "Annual physical", date: "Tue" },
  { id: "APT-307", patient: "Grace Okonkwo", avatar: "GO", avatarBg: "bg-primary", time: "14:00", endTime: "14:45", type: "in-person", status: "confirmed", reason: "Prenatal check-up", date: "Wed" },
  { id: "APT-308", patient: "Ibrahim Musa", avatar: "IM", avatarBg: "bg-secondary", time: "10:00", endTime: "10:30", type: "telemedicine", status: "confirmed", reason: "Asthma management", date: "Wed" },
  { id: "APT-309", patient: "Ngozi Ibe", avatar: "NI", avatarBg: "bg-tertiary", time: "15:00", endTime: "15:30", type: "in-person", status: "pending", reason: "Post-surgery follow-up", date: "Thu" },
  { id: "APT-310", patient: "Samuel Okeke", avatar: "SO", avatarBg: "bg-primary", time: "09:00", endTime: "09:30", type: "in-person", status: "confirmed", reason: "Chronic fatigue evaluation", date: "Fri" },
];

const triageQueue = [
  { patient: "Uju Nnamdi", avatar: "UN", avatarBg: "bg-error", priority: "urgent", reason: "Chest pain, shortness of breath", waitTime: "5 min", ai: "Possible angina — immediate ECG recommended" },
  { patient: "Emeka Obi", avatar: "EO", avatarBg: "bg-tertiary", priority: "high", reason: "High fever (39.5°C), 3 days", waitTime: "12 min", ai: "Possible infection — blood work recommended" },
  { patient: "Aisha Yusuf", avatar: "AY", avatarBg: "bg-secondary", priority: "moderate", reason: "Persistent headache, blurred vision", waitTime: "20 min", ai: "Possible migraine or hypertensive crisis — check BP" },
];

type View = "calendar" | "list";
type Filter = "all" | "confirmed" | "pending";

const availableDays = [true, true, true, true, true, false, false]; // Mon-Fri

export default function DoctorAppointmentsPage() {
  const [view, setView] = useState<View>("calendar");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState(availableDays);
  const [startHour, setStartHour] = useState("08:00");
  const [endHour, setEndHour] = useState("17:00");

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  const getApptsForSlot = (day: string, hour: string) => filtered.filter((a) => a.date === day && a.time === hour);

  const statusStyle = (s: ApptStatus) => {
    switch (s) {
      case "confirmed": return "bg-secondary-container/50 text-secondary";
      case "pending": return "bg-tertiary-fixed/30 text-tertiary";
      case "completed": return "bg-surface-container-high text-on-surface-variant";
      case "cancelled": return "bg-error-container/50 text-error";
    }
  };

  const todayAppts = appointments.filter((a) => a.date === "Mon");
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Appointment Manager</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Week of Jun 23 – Jun 29, 2026</p>
        </div>
        <div className="flex gap-2 self-start">
          <button onClick={() => setShowAvailability(!showAvailability)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface hover:border-primary transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            Availability
          </button>
        </div>
      </div>

      {/* Availability settings */}
      {showAvailability && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <h3 className="text-sm font-bold text-on-surface mb-3">Schedule Availability</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {weekDays.map((day, i) => (
              <button key={day} onClick={() => setAvailability((prev) => prev.map((v, idx) => idx === i ? !v : v))} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${availability[i] ? "bg-primary text-on-primary border-primary" : "bg-surface text-on-surface-variant border-outline-variant"}`}>
                {day}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Start Time</label>
              <select value={startHour} onChange={(e) => setStartHour(e.target.value)} className="block mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                {hours.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">End Time</label>
              <select value={endHour} onChange={(e) => setEndHour(e.target.value)} className="block mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                {hours.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
            <button className="mt-5 px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Save</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Appointments", value: todayAppts.length.toString(), color: "text-primary bg-primary-fixed", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg> },
          { label: "Confirmed", value: confirmedCount.toString(), color: "text-secondary bg-secondary-container/30", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
          { label: "Pending", value: pendingCount.toString(), color: "text-tertiary bg-tertiary-fixed/30", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
          { label: "Triage Queue", value: triageQueue.length.toString(), color: "text-error bg-error-container/50", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg> },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className="text-xl font-bold text-on-surface">{stat.value}</div>
                <div className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* View toggle + filter */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5">
              <button onClick={() => setView("calendar")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === "calendar" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>Calendar</button>
              <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === "list" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>List</button>
            </div>
            <div className="flex gap-1">
              {(["all", "confirmed", "pending"] as Filter[]).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${filter === f ? "bg-primary text-on-primary border-primary" : "text-on-surface-variant border-outline-variant"}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar view */}
          {view === "calendar" && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="grid grid-cols-6 border-b border-outline-variant">
                <div className="p-2" />
                {weekDays.slice(0, 5).map((day, i) => (
                  <div key={day} className={`p-2 text-center border-l border-outline-variant ${i === 0 ? "bg-primary-fixed/30" : ""}`}>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase">{day}</div>
                    <div className={`text-sm font-bold ${i === 0 ? "text-primary" : "text-on-surface"}`}>{23 + i}</div>
                  </div>
                ))}
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-6 border-b border-outline-variant last:border-0">
                    <div className="p-2 text-[10px] font-semibold text-on-surface-variant text-right pr-3">{hour}</div>
                    {weekDays.slice(0, 5).map((day, i) => {
                      const appts = getApptsForSlot(day, hour);
                      return (
                        <div key={day} className={`min-h-[48px] border-l border-outline-variant p-0.5 ${i === 0 ? "bg-primary-fixed/10" : ""}`}>
                          {appts.map((appt) => (
                            <button key={appt.id} onClick={() => setSelectedAppt(appt)} className={`w-full text-left rounded-md px-1.5 py-1 mb-0.5 text-[10px] leading-tight transition-all hover:opacity-80 ${appt.type === "telemedicine" ? "bg-primary/15 text-primary border-l-2 border-primary" : "bg-secondary/15 text-secondary border-l-2 border-secondary"}`}>
                              <div className="font-bold truncate">{appt.patient.split(" ")[0]}</div>
                              <div className="truncate opacity-70">{appt.time}</div>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* List view */}
          {view === "list" && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-6 px-4 py-2.5 border-b border-outline-variant bg-surface-container-low">
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Patient</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Time</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Day</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Type</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Action</span>
              </div>
              {filtered.map((appt, i) => (
                <div key={appt.id} className={`grid sm:grid-cols-6 gap-1 sm:gap-0 items-center px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer ${i < filtered.length - 1 ? "border-b border-outline-variant" : ""}`} onClick={() => setSelectedAppt(appt)}>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${appt.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{appt.avatar}</div>
                    <span className="text-sm font-medium text-on-surface truncate">{appt.patient}</span>
                  </div>
                  <span className="text-sm text-on-surface">{appt.time} – {appt.endTime}</span>
                  <span className="text-sm text-on-surface-variant">{appt.date}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${appt.type === "telemedicine" ? "bg-primary-fixed text-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                    {appt.type === "telemedicine" ? "Tele" : "In-Person"}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${statusStyle(appt.status)}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface-container transition-colors" title="View" onClick={(e) => { e.stopPropagation(); setSelectedAppt(appt); }}>
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected appointment detail */}
          {selectedAppt ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-on-surface">Appointment Details</h3>
                <button onClick={() => setSelectedAppt(null)} className="p-1 rounded hover:bg-surface-container-low transition-colors">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full ${selectedAppt.avatarBg} flex items-center justify-center text-white text-sm font-bold`}>{selectedAppt.avatar}</div>
                <div>
                  <div className="text-sm font-bold text-on-surface">{selectedAppt.patient}</div>
                  <div className="text-xs text-on-surface-variant">{selectedAppt.id}</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant">Date</span><span className="font-medium text-on-surface">{selectedAppt.date}, Jun {23 + weekDays.indexOf(selectedAppt.date)}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Time</span><span className="font-medium text-on-surface">{selectedAppt.time} – {selectedAppt.endTime}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Type</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedAppt.type === "telemedicine" ? "bg-primary-fixed text-primary" : "bg-surface-container-high text-on-surface-variant"}`}>{selectedAppt.type === "telemedicine" ? "Telemedicine" : "In-Person"}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Status</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyle(selectedAppt.status)}`}>{selectedAppt.status.charAt(0).toUpperCase() + selectedAppt.status.slice(1)}</span></div>
              </div>
              <div className="mt-4 p-3 bg-surface-container-low rounded-lg">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Reason</span>
                <p className="text-xs text-on-surface mt-1">{selectedAppt.reason}</p>
              </div>
              <div className="flex gap-2 mt-4">
                {selectedAppt.status === "pending" && (
                  <button className="flex-1 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-all">Confirm</button>
                )}
                {selectedAppt.type === "telemedicine" && (
                  <button className="flex-1 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    Start Call
                  </button>
                )}
                <button className="flex-1 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:border-error hover:text-error transition-all">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
              </div>
              <p className="text-xs text-on-surface-variant">Click an appointment to see details</p>
            </div>
          )}

          {/* Triage queue */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-on-surface">Priority Triage Queue</h3>
              <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center text-on-error text-[10px] font-bold">{triageQueue.length}</div>
            </div>
            <div className="space-y-2">
              {triageQueue.map((t, i) => (
                <div key={i} className={`bg-surface-container-lowest border rounded-xl p-4 hover:shadow-sm transition-all ${t.priority === "urgent" ? "border-error" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{t.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-on-surface">{t.patient}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${t.priority === "urgent" ? "bg-error text-on-error" : t.priority === "high" ? "bg-error-container/50 text-error" : "bg-tertiary-fixed/30 text-tertiary"}`}>{t.priority}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant">{t.reason}</p>
                      <div className="flex items-center gap-2 mt-2 p-2 bg-primary-fixed/30 rounded-md">
                        <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                        <span className="text-[10px] text-primary font-medium">{t.ai}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-outline">Waiting: {t.waitTime}</span>
                        <button className="text-[10px] font-bold text-primary hover:underline">Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
