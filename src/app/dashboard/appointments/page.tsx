"use client";

import { useState } from "react";

const specialties = ["All", "General Practice", "Cardiology", "Dermatology", "Pediatrics", "Neurology", "Orthopedics", "Psychiatry", "OB/GYN"];

const doctors = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", hospital: "St. Mary's Medical Center", rating: 4.9, reviews: 127, fee: "₦15,000", avatar: "SC", avatarBg: "bg-primary", available: true, nextSlot: "Today, 2:30 PM", types: ["In-Person", "Telemedicine"] },
  { id: 2, name: "Dr. Michael Obi", specialty: "Dermatology", hospital: "Lagos University Teaching Hospital", rating: 4.7, reviews: 89, fee: "₦12,000", avatar: "MO", avatarBg: "bg-secondary", available: true, nextSlot: "Tomorrow, 10:00 AM", types: ["In-Person", "Telemedicine"] },
  { id: 3, name: "Dr. Amara Eze", specialty: "General Practice", hospital: "HealthPlus Clinic, Ikeja", rating: 4.8, reviews: 203, fee: "₦8,000", avatar: "AE", avatarBg: "bg-tertiary", available: true, nextSlot: "Today, 4:00 PM", types: ["In-Person"] },
  { id: 4, name: "Dr. Leke Taiwo", specialty: "Pediatrics", hospital: "Children's Specialist Hospital", rating: 4.9, reviews: 156, fee: "₦10,000", avatar: "LT", avatarBg: "bg-primary", available: false, nextSlot: "Mon, Jun 30", types: ["In-Person", "Telemedicine"] },
  { id: 5, name: "Dr. Fatima Bello", specialty: "Neurology", hospital: "National Hospital, Abuja", rating: 4.6, reviews: 64, fee: "₦20,000", avatar: "FB", avatarBg: "bg-secondary", available: true, nextSlot: "Thu, Jun 26, 9:00 AM", types: ["Telemedicine"] },
  { id: 6, name: "Dr. Chidi Nwankwo", specialty: "Orthopedics", hospital: "Reddington Hospital", rating: 4.8, reviews: 112, fee: "₦18,000", avatar: "CN", avatarBg: "bg-tertiary", available: true, nextSlot: "Tomorrow, 11:30 AM", types: ["In-Person"] },
];

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: false },
];

const weekDays = [
  { day: "Mon", date: "23", month: "Jun", full: "Mon, Jun 23" },
  { day: "Tue", date: "24", month: "Jun", full: "Tue, Jun 24" },
  { day: "Wed", date: "25", month: "Jun", full: "Wed, Jun 25" },
  { day: "Thu", date: "26", month: "Jun", full: "Thu, Jun 26" },
  { day: "Fri", date: "27", month: "Jun", full: "Fri, Jun 27" },
  { day: "Sat", date: "28", month: "Jun", full: "Sat, Jun 28" },
  { day: "Sun", date: "29", month: "Jun", full: "Sun, Jun 29" },
];

type Step = "browse" | "schedule" | "confirm" | "success";

export default function AppointmentsPage() {
  const [step, setStep] = useState<Step>("browse");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDay, setSelectedDay] = useState(weekDays[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("In-Person");
  const [reason, setReason] = useState("");

  const filteredDoctors = doctors.filter((d) => {
    const matchesSpecialty = selectedSpecialty === "All" || d.specialty === selectedSpecialty;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const selectDoctor = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor);
    setStep("schedule");
  };

  const confirmBooking = () => setStep("success");

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Appointment Confirmed!</h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Your appointment with <strong>{selectedDoctor?.name}</strong> has been scheduled for{" "}
          <strong>{selectedDay.full} at {selectedTime}</strong>.
        </p>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full ${selectedDoctor?.avatarBg} flex items-center justify-center text-white text-sm font-bold`}>
              {selectedDoctor?.avatar}
            </div>
            <div>
              <div className="font-semibold text-on-surface">{selectedDoctor?.name}</div>
              <div className="text-xs text-on-surface-variant">{selectedDoctor?.specialty}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-on-surface-variant">Date</span><span className="font-medium text-on-surface">{selectedDay.full}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Time</span><span className="font-medium text-on-surface">{selectedTime}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Type</span><span className="font-medium text-on-surface">{appointmentType}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Fee</span><span className="font-medium text-on-surface">{selectedDoctor?.fee}</span></div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button onClick={() => { setStep("browse"); setSelectedDoctor(null); setSelectedTime(""); }} className="px-6 py-2.5 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface hover:border-primary transition-all">
            Book Another
          </button>
          <button onClick={() => setStep("browse")} className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-all">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (step === "confirm" && selectedDoctor) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => setStep("schedule")} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back
        </button>
        <h2 className="text-xl font-bold text-on-surface">Confirm Your Appointment</h2>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex items-center gap-4 pb-5 border-b border-outline-variant">
            <div className={`w-14 h-14 rounded-full ${selectedDoctor.avatarBg} flex items-center justify-center text-white font-bold`}>
              {selectedDoctor.avatar}
            </div>
            <div>
              <h3 className="font-bold text-on-surface">{selectedDoctor.name}</h3>
              <p className="text-sm text-on-surface-variant">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 py-5 border-b border-outline-variant text-sm">
            <div><span className="text-on-surface-variant">Date</span><div className="font-semibold text-on-surface mt-0.5">{selectedDay.full}</div></div>
            <div><span className="text-on-surface-variant">Time</span><div className="font-semibold text-on-surface mt-0.5">{selectedTime}</div></div>
            <div><span className="text-on-surface-variant">Type</span><div className="font-semibold text-on-surface mt-0.5">{appointmentType}</div></div>
            <div><span className="text-on-surface-variant">Consultation Fee</span><div className="font-semibold text-on-surface mt-0.5">{selectedDoctor.fee}</div></div>
          </div>
          <div className="pt-5">
            <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">Reason for Visit (Optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your symptoms or reason for the appointment..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 bg-primary-fixed/50 border border-primary-fixed-dim/30 rounded-lg p-4">
          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Your appointment details are encrypted and shared only with your healthcare provider. Cancellation is free up to 2 hours before the scheduled time.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => setStep("schedule")} className="px-6 py-3 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface-variant hover:border-primary transition-all">
            Back
          </button>
          <button onClick={confirmBooking} className="px-8 py-3 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm flex items-center gap-2">
            Confirm & Pay {selectedDoctor.fee}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>
    );
  }

  if (step === "schedule" && selectedDoctor) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => { setStep("browse"); setSelectedDoctor(null); }} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back to doctors
        </button>

        {/* Doctor info */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`w-14 h-14 rounded-full ${selectedDoctor.avatarBg} flex items-center justify-center text-white font-bold shrink-0`}>
            {selectedDoctor.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-on-surface">{selectedDoctor.name}</h2>
            <p className="text-sm text-on-surface-variant">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs font-semibold text-tertiary">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                {selectedDoctor.rating}
              </span>
              <span className="text-xs text-on-surface-variant">({selectedDoctor.reviews} reviews)</span>
              <span className="text-sm font-bold text-primary">{selectedDoctor.fee}</span>
            </div>
          </div>
        </div>

        {/* Appointment type */}
        <div>
          <h3 className="text-sm font-bold text-on-surface mb-3">Appointment Type</h3>
          <div className="flex gap-3">
            {selectedDoctor.types.map((type) => (
              <button
                key={type}
                onClick={() => setAppointmentType(type)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  appointmentType === type
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                }`}
              >
                {type === "In-Person" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                )}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Date picker */}
        <div>
          <h3 className="text-sm font-bold text-on-surface mb-3">Select Date</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weekDays.map((wd) => (
              <button
                key={wd.date}
                onClick={() => setSelectedDay(wd)}
                className={`flex flex-col items-center px-4 py-3 rounded-xl border transition-all shrink-0 min-w-[72px] ${
                  selectedDay.date === wd.date
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase">{wd.day}</span>
                <span className="text-lg font-bold">{wd.date}</span>
                <span className="text-[10px]">{wd.month}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <h3 className="text-sm font-bold text-on-surface mb-3">Available Slots — {selectedDay.full}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  selectedTime === slot.time
                    ? "bg-primary text-on-primary border-primary"
                    : slot.available
                      ? "bg-surface-container-lowest text-on-surface border-outline-variant hover:border-primary"
                      : "bg-surface-container-high text-outline border-transparent cursor-not-allowed line-through"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <div className="flex justify-end">
          <button
            onClick={() => selectedTime && setStep("confirm")}
            disabled={!selectedTime}
            className={`px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              selectedTime
                ? "bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] shadow-sm"
                : "bg-surface-container-high text-outline cursor-not-allowed"
            }`}
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>
    );
  }

  // Browse doctors
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Book an Appointment</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Find a doctor and schedule your visit.</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors by name or specialty..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Specialty tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              selectedSpecialty === spec
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => selectDoctor(doctor)}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full ${doctor.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {doctor.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{doctor.name}</h3>
                <p className="text-xs text-on-surface-variant">{doctor.specialty}</p>
                <p className="text-xs text-outline truncate">{doctor.hospital}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-tertiary">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                {doctor.rating}
              </span>
              <span className="text-xs text-on-surface-variant">({doctor.reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {doctor.types.map((t) => (
                <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">{t}</span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
              <div>
                <div className="text-xs text-on-surface-variant">Next available</div>
                <div className={`text-xs font-semibold ${doctor.available ? "text-secondary" : "text-on-surface-variant"}`}>{doctor.nextSlot}</div>
              </div>
              <div className="text-sm font-bold text-primary">{doctor.fee}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-on-surface-variant">No doctors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
