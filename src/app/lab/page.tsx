"use client";

import Link from "next/link";

const stats = [
  { label: "Pending Tests", value: "18", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
  { label: "Completed (MTD)", value: "95", change: "90% Target", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-secondary bg-secondary-container/30" },
  { label: "Total Revenue", value: "₦420K", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, color: "text-primary bg-primary-fixed" },
  { label: "Average Rating", value: "4.5/5", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, color: "text-tertiary bg-tertiary-fixed/30" },
];

const pendingTests = [
  { patient: "Chidi Okafur", test: "Full Blood Panel", tat: 85, priority: "urgent", avatar: "CO" },
  { patient: "Amara Eze", test: "ECG Interpretation", tat: 50, priority: "normal", avatar: "AE" },
  { patient: "Bayo Yusuf", test: "Lipid Profile", tat: 30, priority: "routine", avatar: "BY" },
];

const aiReferrals = [
  { id: "#9323", summary: "Triage: High priority — elevated white blood cell count, fever >48 hrs. Urgent CBC recommended.", time: "12 min ago" },
  { id: "#9324", summary: "Triage: Routine follow-up — cholesterol management. Lipid panel requested.", time: "45 min ago" },
];

export default function LabDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-primary rounded-2xl p-6 text-on-primary">
        <h1 className="text-xl font-bold">Welcome back, Lab Team</h1>
        <p className="text-sm text-on-primary/80 mt-1">
          Precision diagnostic insights ready for review. You have 8 urgent tests pending validation today.
        </p>
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
        {/* Pending Analysis Queue */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Queue: Pending Analysis</h3>
              <p className="text-xs text-on-surface-variant">Review and sign off on active diagnostics.</p>
            </div>
            <Link href="/lab/tests" className="text-xs font-semibold text-primary hover:underline">View All</Link>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Patient</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Test Type</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">TAT Status</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Priority</span>
              <span className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Action</span>
            </div>
            {pendingTests.map((test, i) => (
              <div key={i} className={`grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-5 py-3 hover:bg-surface-container-low transition-colors ${i < pendingTests.length - 1 ? "border-b border-outline-variant" : ""}`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-[10px] font-bold shrink-0">{test.avatar}</div>
                  <span className="text-sm font-medium text-on-surface">{test.patient}</span>
                </div>
                <div className="text-sm text-on-surface-variant">{test.test}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden max-w-20">
                    <div className={`h-full rounded-full ${test.tat > 70 ? "bg-error" : test.tat > 40 ? "bg-tertiary" : "bg-secondary"}`} style={{ width: `${test.tat}%` }} />
                  </div>
                  <span className="text-xs text-on-surface-variant">{test.tat}%</span>
                </div>
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    test.priority === "urgent" ? "bg-error-container text-error" :
                    test.priority === "normal" ? "bg-primary-fixed text-primary" :
                    "bg-surface-container-high text-on-surface-variant"
                  }`}>
                    {test.priority.charAt(0).toUpperCase() + test.priority.slice(1)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-surface-container-low transition-colors" title="View">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-container-low transition-colors" title="Upload Results">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Referrals */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">AI Referrals</h3>
            <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center text-on-error text-[10px] font-bold">2</div>
          </div>
          <div className="space-y-3">
            {aiReferrals.map((ref) => (
              <div key={ref.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-primary">Patient {ref.id}</span>
                  <span className="text-[10px] text-outline">{ref.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{ref.summary}</p>
                <button className="mt-3 text-xs font-semibold text-primary hover:underline">Accept & Process</button>
              </div>
            ))}
          </div>

          {/* Processing Speed */}
          <div className="mt-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h4 className="text-sm font-bold text-on-surface mb-3">Processing Speed</h4>
            <div className="flex items-end gap-1 h-20">
              {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 5 ? "var(--color-primary)" : "var(--color-primary-fixed)" }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-bold text-primary">Peak Performance: Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
