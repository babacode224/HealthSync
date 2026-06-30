"use client";

import Link from "next/link";

const stats = [
  { label: "Pending Orders", value: "12", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
  { label: "Completed Orders", value: "142", change: "+12%", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-secondary bg-secondary-container/30" },
  { label: "Total Revenue", value: "₦850,000", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-primary bg-primary-fixed" },
  { label: "Average Rating", value: "4.8/5", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
];

const queue = [
  { patient: "Chidi Okoro", medication: "Amoxicillin 500mg", received: "10:15 AM", status: "ready", avatar: "CO" },
  { patient: "Amina Abubakar", medication: "Metformin 850mg", received: "10:28 AM", status: "preparing", avatar: "AA" },
  { patient: "Emeka Madu", medication: "Lisinopril 10mg", received: "10:45 AM", status: "preparing", avatar: "EM" },
  { patient: "Sisi Adeymi", medication: "Ventolin Inhaler", received: "11:02 AM", status: "preparing", avatar: "SA" },
  { patient: "Fatima Williams", medication: "Paracetamol 500mg", received: "11:05 AM", status: "preparing", avatar: "FW" },
];

const incomingRx = [
  { id: "RX-49230", doctor: "Dr. Sarah Cole", patient: "Tunde Edun" },
  { id: "RX-49229", doctor: "Dr. James Ng", patient: "Mercy Johnson" },
  { id: "RX-49228", doctor: "Dr. Linda Baji", patient: "Obi Cubana" },
];

export default function PharmacyDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">HealthSync Pharmacy Hub</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Welcome back. You have 12 orders awaiting fulfillment today.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          New Prescription
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
        {/* Queue */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Queue: Next 5 Orders</h3>
            <Link href="/pharmacy/orders" className="text-xs font-semibold text-primary hover:underline">View All Queued</Link>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Patient</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Medication</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Time Received</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Action</span>
            </div>
            {queue.map((item, i) => (
              <div key={i} className={`grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-5 py-3 hover:bg-surface-container-low transition-colors ${i < queue.length - 1 ? "border-b border-outline-variant" : ""}`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-[10px] font-bold shrink-0">{item.avatar}</div>
                  <span className="text-sm font-medium text-on-surface">{item.patient}</span>
                </div>
                <div className="text-sm text-on-surface-variant">{item.medication}</div>
                <div className="text-sm text-on-surface-variant">{item.received}</div>
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.status === "ready" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                    {item.status === "ready" ? "Ready" : "Preparing"}
                  </span>
                </div>
                <div>
                  <button className="text-xs font-semibold text-primary hover:underline">
                    {item.status === "ready" ? "Dispense" : "Prepare"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Rx */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">Incoming Digital Rx</h3>
            <Link href="/pharmacy/prescriptions" className="text-xs font-semibold text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {incomingRx.map((rx) => (
              <div key={rx.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-primary">{rx.id}</div>
                    <div className="text-sm font-semibold text-on-surface mt-0.5">{rx.doctor}</div>
                    <div className="text-xs text-on-surface-variant">Patient: {rx.patient}</div>
                  </div>
                  <button className="text-xs font-semibold text-primary border border-primary px-3 py-1 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                    Review
                  </button>
                </div>
              </div>
            ))}
            <Link href="/pharmacy/triage" className="block text-center text-xs font-semibold text-primary hover:underline py-2">
              Open Clinical Triage
            </Link>
          </div>
        </div>
      </div>

      {/* Supply Chain AI */}
      <div className="bg-primary rounded-2xl p-6 text-on-primary">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg mb-1">Supply Chain AI</h3>
            <p className="text-sm text-on-primary/80 max-w-lg">
              HealthSync is analyzing current malaria medication trends in your area. Consider restocking Artemether/Lumefantrine before the anticipated surge.
            </p>
          </div>
          <button className="bg-on-primary text-primary font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all shrink-0">
            Analyze Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
