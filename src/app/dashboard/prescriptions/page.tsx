"use client";

import { useState } from "react";

const prescriptions = [
  { id: "RX-20261", name: "Amlodipine 5mg", doctor: "Dr. Adebayo Okonkwo", pharmacy: "MedPlus Pharmacy, Lekki", dosage: "1 tablet daily", frequency: "Once daily — morning", startDate: "Mar 15, 2026", endDate: "Sep 15, 2026", refillsLeft: 3, refillsTotal: 6, status: "active", category: "Cardiovascular", lastFilled: "Jun 1, 2026", nextRefill: "Jul 1, 2026", instructions: "Take with or without food. Avoid grapefruit juice. Monitor blood pressure weekly.", sideEffects: "Dizziness, swelling in ankles, flushing" },
  { id: "RX-20258", name: "Metformin 500mg", doctor: "Dr. Adebayo Okonkwo", pharmacy: "MedPlus Pharmacy, Lekki", dosage: "1 tablet twice daily", frequency: "Twice daily — with meals", startDate: "Jan 10, 2026", endDate: "Jan 10, 2027", refillsLeft: 5, refillsTotal: 12, status: "active", category: "Diabetes", lastFilled: "Jun 10, 2026", nextRefill: "Jul 10, 2026", instructions: "Take with meals to reduce stomach upset. Stay hydrated. Monitor blood sugar regularly.", sideEffects: "Nausea, diarrhea, stomach pain" },
  { id: "RX-20245", name: "Omeprazole 20mg", doctor: "Dr. Chioma Nwosu", pharmacy: "HealthFirst Pharmacy, VI", dosage: "1 capsule daily", frequency: "Once daily — 30 min before breakfast", startDate: "May 1, 2026", endDate: "Jul 31, 2026", refillsLeft: 1, refillsTotal: 3, status: "active", category: "Gastrointestinal", lastFilled: "Jun 1, 2026", nextRefill: "Jul 1, 2026", instructions: "Take on empty stomach, 30 minutes before eating. Do not crush or chew capsule.", sideEffects: "Headache, abdominal pain, nausea" },
  { id: "RX-20230", name: "Vitamin D3 1000IU", doctor: "Dr. Adebayo Okonkwo", pharmacy: "MedPlus Pharmacy, Lekki", dosage: "1 tablet daily", frequency: "Once daily", startDate: "Feb 20, 2026", endDate: "Aug 20, 2026", refillsLeft: 2, refillsTotal: 6, status: "active", category: "Supplements", lastFilled: "May 20, 2026", nextRefill: "Jun 30, 2026", instructions: "Take with a meal containing fat for better absorption.", sideEffects: "Rare at recommended doses" },
  { id: "RX-20198", name: "Amoxicillin 500mg", doctor: "Dr. Chioma Nwosu", pharmacy: "HealthFirst Pharmacy, VI", dosage: "1 capsule 3 times daily", frequency: "Three times daily — every 8 hours", startDate: "May 20, 2026", endDate: "May 30, 2026", refillsLeft: 0, refillsTotal: 0, status: "completed", category: "Antibiotic", lastFilled: "May 20, 2026", nextRefill: "—", instructions: "Complete the full course. Take with or without food. Space doses evenly.", sideEffects: "Diarrhea, rash, nausea" },
  { id: "RX-20180", name: "Ibuprofen 400mg", doctor: "Dr. Adebayo Okonkwo", pharmacy: "MedPlus Pharmacy, Lekki", dosage: "1 tablet as needed", frequency: "As needed — max 3 per day", startDate: "Apr 5, 2026", endDate: "May 5, 2026", refillsLeft: 0, refillsTotal: 1, status: "expired", category: "Pain Relief", lastFilled: "Apr 5, 2026", nextRefill: "—", instructions: "Take with food. Do not exceed 3 tablets in 24 hours. Not for long-term use.", sideEffects: "Stomach upset, heartburn, dizziness" },
];

const refillHistory = [
  { rxId: "RX-20261", name: "Amlodipine 5mg", date: "Jun 1, 2026", pharmacy: "MedPlus Pharmacy", cost: 4500, status: "picked_up" },
  { rxId: "RX-20258", name: "Metformin 500mg", date: "Jun 10, 2026", pharmacy: "MedPlus Pharmacy", cost: 3200, status: "picked_up" },
  { rxId: "RX-20245", name: "Omeprazole 20mg", date: "Jun 1, 2026", pharmacy: "HealthFirst Pharmacy", cost: 5800, status: "picked_up" },
  { rxId: "RX-20230", name: "Vitamin D3 1000IU", date: "May 20, 2026", pharmacy: "MedPlus Pharmacy", cost: 2500, status: "picked_up" },
  { rxId: "RX-20261", name: "Amlodipine 5mg", date: "May 1, 2026", pharmacy: "MedPlus Pharmacy", cost: 4500, status: "picked_up" },
  { rxId: "RX-20258", name: "Metformin 500mg", date: "May 10, 2026", pharmacy: "MedPlus Pharmacy", cost: 3200, status: "picked_up" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "text-green-700", bg: "bg-green-100" },
  completed: { label: "Completed", color: "text-blue-700", bg: "bg-blue-100" },
  expired: { label: "Expired", color: "text-red-700", bg: "bg-red-100" },
  pending_refill: { label: "Pending Refill", color: "text-amber-700", bg: "bg-amber-100" },
};

type Tab = "active" | "history" | "reminders";

export default function PatientPrescriptionsPage() {
  const [tab, setTab] = useState<Tab>("active");
  const [selectedRx, setSelectedRx] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = prescriptions.filter(p => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const rxDetail = selectedRx ? prescriptions.find(p => p.id === selectedRx) : null;
  const activeCount = prescriptions.filter(p => p.status === "active").length;
  const dueSoon = prescriptions.filter(p => p.status === "active" && p.refillsLeft <= 1).length;

  const tabs: { key: Tab; label: string }[] = [
    { key: "active", label: `My Prescriptions (${prescriptions.length})` },
    { key: "history", label: "Refill History" },
    { key: "reminders", label: "Medication Reminders" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">My Prescriptions</h1>
        <p className="text-on-surface-variant text-sm mt-1">View medications, request refills, and track your prescriptions</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center"><svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg></div>
            <div>
              <div className="text-xl font-bold text-on-surface">{activeCount}</div>
              <div className="text-xs text-on-surface-variant">Active Medications</div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg></div>
            <div>
              <div className="text-xl font-bold text-on-surface">{dueSoon}</div>
              <div className="text-xs text-on-surface-variant">Refills Due Soon</div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>
            <div>
              <div className="text-xl font-bold text-on-surface">₦16,000</div>
              <div className="text-xs text-on-surface-variant">Monthly Medication Cost</div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg></div>
            <div>
              <div className="text-xl font-bold text-on-surface">2</div>
              <div className="text-xs text-on-surface-variant">Prescribing Doctors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedRx(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="flex gap-6">
          <div className={`${rxDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex gap-2 flex-wrap">
              {["all", "active", "completed", "expired"].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${statusFilter === s ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {s === "all" ? `All (${prescriptions.length})` : `${s} (${prescriptions.filter(p => p.status === s).length})`}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(rx => {
                const st = statusConfig[rx.status];
                return (
                  <button key={rx.id} onClick={() => setSelectedRx(rx.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedRx === rx.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">💊</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-on-surface">{rx.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.color}`}>{st.label}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5">{rx.dosage} · {rx.frequency}</p>
                          <p className="text-xs text-on-surface-variant">{rx.doctor} · {rx.pharmacy}</p>
                          {rx.status === "active" && (
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${((rx.refillsTotal - rx.refillsLeft) / rx.refillsTotal) * 100}%` }} />
                              </div>
                              <span className="text-[10px] text-on-surface-variant">{rx.refillsLeft}/{rx.refillsTotal} refills left</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-on-surface-variant font-mono">{rx.id}</div>
                        {rx.status === "active" && rx.refillsLeft <= 1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 mt-1 inline-block">Low Refills</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {rxDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusConfig[rxDetail.status].bg} ${statusConfig[rxDetail.status].color}`}>{statusConfig[rxDetail.status].label}</span>
                    <h3 className="text-on-primary font-bold text-lg mt-2">{rxDetail.name}</h3>
                    <p className="text-on-primary/70 text-sm">{rxDetail.dosage} · {rxDetail.category}</p>
                    <p className="text-on-primary/70 text-xs font-mono mt-1">{rxDetail.id}</p>
                  </div>
                  <button onClick={() => setSelectedRx(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Prescribing Doctor</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.doctor}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Pharmacy</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.pharmacy}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Frequency</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.frequency}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Duration</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.startDate} — {rxDetail.endDate}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Last Filled</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.lastFilled}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Next Refill</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{rxDetail.nextRefill}</div>
                  </div>
                </div>

                {rxDetail.status === "active" && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-on-surface">Refills Remaining</h4>
                      <span className="text-sm font-bold text-primary">{rxDetail.refillsLeft} of {rxDetail.refillsTotal}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${rxDetail.refillsLeft <= 1 ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${(rxDetail.refillsLeft / rxDetail.refillsTotal) * 100}%` }} />
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">Instructions</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">{rxDetail.instructions}</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Possible Side Effects</h4>
                  <p className="text-xs text-amber-700">{rxDetail.sideEffects}</p>
                </div>

                <div className="flex gap-2">
                  {rxDetail.status === "active" && rxDetail.refillsLeft > 0 ? (
                    <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Request Refill</button>
                  ) : rxDetail.status === "active" ? (
                    <button className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Contact Doctor for Renewal</button>
                  ) : (
                    <button className="flex-1 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-medium cursor-not-allowed">No Refills Available</button>
                  )}
                  <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "history" && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">Rx ID</th><th className="text-left px-4 py-3 font-medium">Medication</th><th className="text-left px-4 py-3 font-medium">Date Filled</th><th className="text-left px-4 py-3 font-medium">Pharmacy</th><th className="text-left px-4 py-3 font-medium">Cost</th><th className="text-left px-4 py-3 font-medium">Status</th></tr></thead>
            <tbody>
              {refillHistory.map((r, i) => (
                <tr key={i} className="border-t border-outline-variant hover:bg-surface-container-low/50">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-primary">{r.rxId}</td>
                  <td className="px-4 py-3 text-sm text-on-surface">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-on-surface-variant">{r.date}</td>
                  <td className="px-4 py-3 text-sm text-on-surface-variant">{r.pharmacy}</td>
                  <td className="px-4 py-3 text-sm font-medium text-on-surface">₦{r.cost.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Picked Up</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reminders" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-5 text-white">
            <h2 className="text-lg font-bold">AI Medication Reminders</h2>
            <p className="text-sm opacity-70 mt-1">Never miss a dose. Get smart reminders based on your prescription schedule.</p>
          </div>
          <div className="space-y-3">
            {prescriptions.filter(p => p.status === "active").map(rx => (
              <div key={rx.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">💊</div>
                    <div>
                      <h3 className="font-semibold text-on-surface text-sm">{rx.name}</h3>
                      <p className="text-xs text-on-surface-variant">{rx.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-medium text-on-surface">Reminder Active</div>
                      <div className="text-[10px] text-on-surface-variant">{rx.frequency.includes("morning") ? "8:00 AM daily" : rx.frequency.includes("Twice") ? "8:00 AM, 8:00 PM" : rx.frequency.includes("Three") ? "8:00 AM, 2:00 PM, 10:00 PM" : "9:00 AM daily"}</div>
                    </div>
                    <div className="w-10 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="text-xs text-green-700">HIPAA compliant · All medication data encrypted · Reminders via push notification and SMS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
