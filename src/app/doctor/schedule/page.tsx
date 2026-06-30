"use client";

import { useState } from "react";

type View = "week" | "availability" | "requests";

interface TimeSlot {
  id: string;
  time: string;
  patient: string | null;
  type: "appointment" | "telehealth" | "blocked" | "available";
  reason?: string;
  status?: "confirmed" | "pending" | "completed";
}

interface DaySchedule {
  date: string;
  dayName: string;
  dayNum: number;
  isToday: boolean;
  slots: TimeSlot[];
}

interface BookingRequest {
  id: string;
  patient: string;
  age: number;
  sex: string;
  requestedDate: string;
  requestedTime: string;
  type: "in-person" | "telehealth";
  reason: string;
  insurance: string;
  urgency: "routine" | "urgent" | "follow-up";
  submittedAt: string;
}

const weekSchedule: DaySchedule[] = [
  {
    date: "June 27, 2026", dayName: "Fri", dayNum: 27, isToday: true,
    slots: [
      { id: "s1", time: "08:00 AM", patient: "Emeka Nwosu", type: "appointment", reason: "Heart Failure Follow-up", status: "confirmed" },
      { id: "s2", time: "08:30 AM", patient: "Chioma Okafor", type: "telehealth", reason: "Asthma Review", status: "confirmed" },
      { id: "s3", time: "09:00 AM", patient: null, type: "available" },
      { id: "s4", time: "09:30 AM", patient: "Adebayo Oluwatobi", type: "appointment", reason: "Diabetes Check", status: "pending" },
      { id: "s5", time: "10:00 AM", patient: null, type: "available" },
      { id: "s6", time: "10:30 AM", patient: null, type: "available" },
      { id: "s7", time: "11:00 AM", patient: "Fatima Bello", type: "appointment", reason: "RA Assessment", status: "confirmed" },
      { id: "s8", time: "11:30 AM", patient: null, type: "blocked", reason: "Lunch Break" },
      { id: "s9", time: "12:00 PM", patient: null, type: "blocked", reason: "Lunch Break" },
      { id: "s10", time: "12:30 PM", patient: null, type: "available" },
      { id: "s11", time: "01:00 PM", patient: "Oluwaseun Adeyemi", type: "telehealth", reason: "PUD Follow-up", status: "confirmed" },
      { id: "s12", time: "01:30 PM", patient: null, type: "available" },
      { id: "s13", time: "02:00 PM", patient: "Amina Yusuf", type: "appointment", reason: "Migraine Check", status: "confirmed" },
      { id: "s14", time: "02:30 PM", patient: null, type: "available" },
      { id: "s15", time: "03:00 PM", patient: null, type: "blocked", reason: "Admin / Documentation" },
      { id: "s16", time: "03:30 PM", patient: null, type: "blocked", reason: "Admin / Documentation" },
    ],
  },
  {
    date: "June 28, 2026", dayName: "Sat", dayNum: 28, isToday: false,
    slots: [
      { id: "s17", time: "09:00 AM", patient: "Kalu Eze", type: "telehealth", reason: "Follow-up Consultation", status: "confirmed" },
      { id: "s18", time: "09:30 AM", patient: null, type: "available" },
      { id: "s19", time: "10:00 AM", patient: "Grace Okonkwo", type: "appointment", reason: "Prenatal Visit", status: "confirmed" },
      { id: "s20", time: "10:30 AM", patient: null, type: "available" },
      { id: "s21", time: "11:00 AM", patient: null, type: "blocked", reason: "Off Duty" },
    ],
  },
  {
    date: "June 29, 2026", dayName: "Sun", dayNum: 29, isToday: false,
    slots: [
      { id: "s22", time: "All Day", patient: null, type: "blocked", reason: "Day Off" },
    ],
  },
  {
    date: "June 30, 2026", dayName: "Mon", dayNum: 30, isToday: false,
    slots: [
      { id: "s23", time: "08:00 AM", patient: "Emeka Nwosu", type: "appointment", reason: "Weight Recheck — Furosemide adjustment", status: "confirmed" },
      { id: "s24", time: "08:30 AM", patient: null, type: "available" },
      { id: "s25", time: "09:00 AM", patient: null, type: "available" },
      { id: "s26", time: "09:30 AM", patient: "Ibrahim Musa", type: "telehealth", reason: "New Patient Intake", status: "pending" },
      { id: "s27", time: "10:00 AM", patient: null, type: "available" },
      { id: "s28", time: "10:30 AM", patient: "Blessing Udo", type: "appointment", reason: "Thyroid Follow-up", status: "confirmed" },
      { id: "s29", time: "11:00 AM", patient: null, type: "available" },
      { id: "s30", time: "11:30 AM", patient: null, type: "blocked", reason: "Lunch Break" },
      { id: "s31", time: "12:00 PM", patient: null, type: "blocked", reason: "Lunch Break" },
      { id: "s32", time: "12:30 PM", patient: null, type: "available" },
      { id: "s33", time: "01:00 PM", patient: null, type: "available" },
      { id: "s34", time: "01:30 PM", patient: "Adebayo Oluwatobi", type: "appointment", reason: "Lab Review — HbA1c results", status: "confirmed" },
      { id: "s35", time: "02:00 PM", patient: null, type: "available" },
    ],
  },
  {
    date: "July 1, 2026", dayName: "Tue", dayNum: 1, isToday: false,
    slots: [
      { id: "s36", time: "08:00 AM", patient: null, type: "available" },
      { id: "s37", time: "08:30 AM", patient: "Ngozi Ibe", type: "appointment", reason: "Annual Physical", status: "confirmed" },
      { id: "s38", time: "09:00 AM", patient: null, type: "available" },
      { id: "s39", time: "09:30 AM", patient: null, type: "available" },
      { id: "s40", time: "10:00 AM", patient: "Tunde Bakare", type: "telehealth", reason: "Anxiety Management", status: "pending" },
      { id: "s41", time: "10:30 AM", patient: null, type: "available" },
    ],
  },
];

const bookingRequests: BookingRequest[] = [
  { id: "br-1", patient: "Yemi Alade", age: 29, sex: "Female", requestedDate: "July 2, 2026", requestedTime: "10:00 AM", type: "in-person", reason: "Persistent lower back pain — 2 weeks duration", insurance: "Leadway Health HMO", urgency: "routine", submittedAt: "2 hours ago" },
  { id: "br-2", patient: "Chukwudi Eze", age: 55, sex: "Male", requestedDate: "June 30, 2026", requestedTime: "09:00 AM", type: "telehealth", reason: "Chest tightness on exertion, family history of CAD", insurance: "AXA Mansard", urgency: "urgent", submittedAt: "45 min ago" },
  { id: "br-3", patient: "Aisha Mohammed", age: 38, sex: "Female", requestedDate: "July 3, 2026", requestedTime: "02:00 PM", type: "in-person", reason: "Follow-up on thyroid medication adjustment", insurance: "Hygeia HMO", urgency: "follow-up", submittedAt: "5 hours ago" },
  { id: "br-4", patient: "Daniel Osei", age: 42, sex: "Male", requestedDate: "July 1, 2026", requestedTime: "11:00 AM", type: "telehealth", reason: "Skin rash on forearms — possible allergic dermatitis", insurance: "NHIS", urgency: "routine", submittedAt: "1 day ago" },
];

const availabilityDays = [
  { day: "Monday", enabled: true, start: "08:00 AM", end: "04:00 PM", slots: 14 },
  { day: "Tuesday", enabled: true, start: "08:00 AM", end: "04:00 PM", slots: 14 },
  { day: "Wednesday", enabled: true, start: "08:00 AM", end: "02:00 PM", slots: 10 },
  { day: "Thursday", enabled: true, start: "08:00 AM", end: "04:00 PM", slots: 14 },
  { day: "Friday", enabled: true, start: "08:00 AM", end: "04:00 PM", slots: 14 },
  { day: "Saturday", enabled: true, start: "09:00 AM", end: "12:00 PM", slots: 6 },
  { day: "Sunday", enabled: false, start: "", end: "", slots: 0 },
];

const urgencyColors: Record<string, string> = {
  routine: "bg-surface-container-high text-on-surface-variant",
  urgent: "bg-error-container/50 text-error",
  "follow-up": "bg-tertiary-fixed/30 text-tertiary",
};

export default function SchedulePage() {
  const [view, setView] = useState<View>("week");
  const [selectedDay, setSelectedDay] = useState(0);

  const todayStats = {
    total: weekSchedule[0].slots.filter((s) => s.patient).length,
    available: weekSchedule[0].slots.filter((s) => s.type === "available").length,
    telehealth: weekSchedule[0].slots.filter((s) => s.type === "telehealth").length,
    pending: bookingRequests.length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Schedule</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Manage your calendar and availability</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Block Time
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Appointments", value: todayStats.total, color: "text-primary" },
          { label: "Available Slots", value: todayStats.available, color: "text-secondary" },
          { label: "Telehealth Sessions", value: todayStats.telehealth, color: "text-tertiary" },
          { label: "Pending Requests", value: todayStats.pending, color: "text-error" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "week" as View, label: "Weekly Calendar" },
          { key: "availability" as View, label: "Set Availability" },
          { key: "requests" as View, label: `Requests (${bookingRequests.length})` },
        ]).map((t) => (
          <button key={t.key} onClick={() => setView(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Weekly Calendar */}
      {view === "week" && (
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto">
            {weekSchedule.map((d, i) => (
              <button key={d.date} onClick={() => setSelectedDay(i)} className={`flex flex-col items-center px-4 py-2 rounded-xl min-w-[64px] transition-all ${selectedDay === i ? "bg-primary text-on-primary" : d.isToday ? "bg-primary/10 text-primary border border-primary/30" : "bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"}`}>
                <span className="text-xs font-medium">{d.dayName}</span>
                <span className="text-lg font-bold">{d.dayNum}</span>
                <span className="text-[10px]">{d.slots.filter((s) => s.patient).length} appts</span>
              </button>
            ))}
          </div>

          {/* Day View */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">{weekSchedule[selectedDay].date}</h3>
              {weekSchedule[selectedDay].isToday && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">TODAY</span>}
            </div>
            {weekSchedule[selectedDay].slots.map((slot) => (
              <div key={slot.id} className={`flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 transition-colors ${slot.type === "available" ? "hover:bg-secondary-container/10 cursor-pointer" : slot.type === "blocked" ? "bg-surface-container-low/30" : "hover:bg-surface-container-low/50"}`}>
                <div className="w-16 text-xs font-mono text-on-surface-variant shrink-0">{slot.time}</div>
                <div className={`w-1 h-8 rounded-full shrink-0 ${slot.type === "appointment" ? "bg-primary" : slot.type === "telehealth" ? "bg-secondary" : slot.type === "blocked" ? "bg-outline-variant" : "bg-secondary/30"}`} />
                {slot.patient ? (
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface">{slot.patient}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${slot.type === "telehealth" ? "bg-secondary-container/30 text-secondary" : "bg-primary/10 text-primary"}`}>
                        {slot.type === "telehealth" ? "TELEHEALTH" : "IN-PERSON"}
                      </span>
                      {slot.status === "pending" && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-tertiary-fixed/30 text-tertiary">PENDING</span>}
                    </div>
                    <div className="text-xs text-on-surface-variant">{slot.reason}</div>
                  </div>
                ) : slot.type === "blocked" ? (
                  <div className="flex-1">
                    <span className="text-sm text-on-surface-variant italic">{slot.reason}</span>
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="text-sm text-secondary font-medium">Available</span>
                  </div>
                )}
                {slot.patient && (
                  <div className="flex gap-1.5 shrink-0">
                    {slot.type === "telehealth" && (
                      <button className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary text-xs font-semibold hover:opacity-90 transition-all">Join</button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Set Availability */}
      {view === "availability" && (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            <div className="text-xs text-on-surface-variant">Set your weekly availability. Patients can only book during your available hours. Slot duration is 30 minutes.</div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Weekly Hours</h3>
            </div>
            {availabilityDays.map((d) => (
              <div key={d.day} className="flex items-center gap-4 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <button className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${d.enabled ? "bg-primary" : "bg-surface-container-high"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${d.enabled ? "left-5" : "left-0.5"}`} />
                </button>
                <div className="w-24 shrink-0">
                  <span className={`text-sm font-semibold ${d.enabled ? "text-on-surface" : "text-on-surface-variant"}`}>{d.day}</span>
                </div>
                {d.enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <select defaultValue={d.start} className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                      {["07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM"].map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <span className="text-xs text-on-surface-variant">to</span>
                    <select defaultValue={d.end} className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                      {["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"].map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <span className="text-xs text-on-surface-variant ml-2">{d.slots} slots</span>
                  </div>
                ) : (
                  <span className="text-xs text-on-surface-variant italic">Not available</span>
                )}
              </div>
            ))}
          </div>

          {/* Consultation Settings */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Consultation Settings</h3>
            </div>
            {[
              { label: "Slot Duration", value: "30 minutes", desc: "Default appointment length" },
              { label: "Buffer Between Appointments", value: "5 minutes", desc: "Break between back-to-back slots" },
              { label: "Max Patients Per Day", value: "16", desc: "Cap on daily appointments" },
              { label: "Allow Same-Day Booking", value: "Yes", desc: "Patients can book on the same day" },
              { label: "Telehealth Enabled", value: "Yes", desc: "Accept virtual consultations" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between px-5 py-3 border-b border-outline-variant last:border-0">
                <div>
                  <div className="text-sm font-medium text-on-surface">{s.label}</div>
                  <div className="text-xs text-on-surface-variant">{s.desc}</div>
                </div>
                <span className="text-sm font-semibold text-primary">{s.value}</span>
              </div>
            ))}
          </div>

          <button className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">Save Availability</button>
        </div>
      )}

      {/* Booking Requests */}
      {view === "requests" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Pending Booking Requests ({bookingRequests.length})</h3>
            </div>
            {bookingRequests.map((r) => (
              <div key={r.id} className="px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${r.urgency === "urgent" ? "bg-error/10 text-error" : "bg-primary/10 text-primary"}`}>
                      {r.patient.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-on-surface">{r.patient}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${urgencyColors[r.urgency]}`}>{r.urgency.toUpperCase()}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.type === "telehealth" ? "bg-secondary-container/30 text-secondary" : "bg-primary/10 text-primary"}`}>
                          {r.type === "telehealth" ? "TELEHEALTH" : "IN-PERSON"}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{r.age}y, {r.sex} · {r.insurance}</div>
                    </div>
                  </div>
                  <div className="text-xs text-on-surface-variant">{r.submittedAt}</div>
                </div>
                <div className="ml-13 pl-13">
                  <div className="text-sm text-on-surface">{r.reason}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                    Requested: {r.requestedDate} at {r.requestedTime}
                  </div>
                </div>
                <div className="flex gap-2 ml-13">
                  <button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Accept</button>
                  <button className="px-4 py-1.5 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all">Reschedule</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-error hover:bg-error-container/20 transition-all">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
