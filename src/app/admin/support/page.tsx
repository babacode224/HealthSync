"use client";

import { useState } from "react";

const tickets = [
  { id: "TKT-001", subject: "Unable to access lab results", user: "Chioma Eze", userType: "patient", email: "chioma.eze@email.com", priority: "high", status: "open", category: "Technical", created: "2026-06-27 09:15", updated: "2026-06-27 09:15", assignee: "Unassigned", description: "Patient reports that lab results from June 25th are not appearing in her health records. She has been waiting for CBC and lipid panel results. Doctor confirmed results were uploaded.", responses: [] },
  { id: "TKT-002", subject: "Billing discrepancy on invoice #INV-4521", user: "Emeka Nwosu", userType: "patient", email: "emeka.n@email.com", priority: "medium", status: "in_progress", category: "Billing", created: "2026-06-26 14:30", updated: "2026-06-27 08:45", assignee: "Aisha Mohammed", description: "Patient was charged ₦45,000 for a consultation that should have been covered by AXA Mansard insurance. Requesting refund or insurance claim adjustment.", responses: [{ from: "Aisha Mohammed", date: "2026-06-27 08:45", text: "Investigating with billing team. Insurance claim was submitted with incorrect policy number. Correcting now." }] },
  { id: "TKT-003", subject: "Pharmacy inventory sync not updating", user: "Dr. Funke Adeyemi", userType: "provider", email: "f.adeyemi@healthsync.ng", priority: "critical", status: "open", category: "Technical", created: "2026-06-27 07:30", updated: "2026-06-27 07:30", assignee: "Unassigned", description: "Pharmacy inventory counts are not syncing between the dispensing module and inventory management. Several medications show incorrect stock levels, which could lead to dispensing errors.", responses: [] },
  { id: "TKT-004", subject: "Request for API access documentation", user: "LabTech Solutions", userType: "vendor", email: "dev@labtech.ng", priority: "low", status: "in_progress", category: "Integration", created: "2026-06-25 11:00", updated: "2026-06-26 16:20", assignee: "Chidi Okonkwo", description: "Vendor requesting API documentation and sandbox credentials for equipment integration. They want to connect their LIMS system with HealthSync.", responses: [{ from: "Chidi Okonkwo", date: "2026-06-26 16:20", text: "API docs shared via email. Sandbox credentials being provisioned — will be ready by June 28." }] },
  { id: "TKT-005", subject: "Telehealth video quality issues", user: "Adewale Okafor", userType: "patient", email: "a.okafor@email.com", priority: "medium", status: "resolved", category: "Technical", created: "2026-06-24 15:45", updated: "2026-06-25 10:30", assignee: "Aisha Mohammed", description: "Patient experienced frequent video freezing and audio drops during telehealth consultation with Dr. Ogundimu on June 24th.", responses: [{ from: "Aisha Mohammed", date: "2026-06-24 17:00", text: "Thank you for reporting. We've identified a server load issue during peak hours." }, { from: "Aisha Mohammed", date: "2026-06-25 10:30", text: "Server capacity has been increased. We've also optimized the video codec. Please try your next session and let us know if issues persist." }] },
  { id: "TKT-006", subject: "NAFDAC compliance report export failing", user: "Dr. Adebayo Bakare", userType: "provider", email: "a.bakare@healthsync.ng", priority: "high", status: "in_progress", category: "Technical", created: "2026-06-26 09:00", updated: "2026-06-27 07:15", assignee: "Chidi Okonkwo", description: "Lab compliance report PDF export fails with a timeout error for reports spanning more than 3 months. Need this for upcoming NAFDAC audit.", responses: [{ from: "Chidi Okonkwo", date: "2026-06-27 07:15", text: "Identified the issue — large date ranges cause memory overflow in the PDF generator. Working on a paginated export solution. ETA: June 28." }] },
  { id: "TKT-007", subject: "Account locked after password reset", user: "Fatima Bello", userType: "patient", email: "f.bello@email.com", priority: "high", status: "resolved", category: "Account", created: "2026-06-25 08:20", updated: "2026-06-25 09:45", assignee: "Aisha Mohammed", description: "Patient's account was locked after 3 failed password reset attempts. Cannot access appointments or medication reminders.", responses: [{ from: "Aisha Mohammed", date: "2026-06-25 09:00", text: "Account has been unlocked. Sending a new password reset link to your registered email." }, { from: "Aisha Mohammed", date: "2026-06-25 09:45", text: "Patient confirmed access restored. Closing ticket." }] },
  { id: "TKT-008", subject: "Feature request: Medication reminder notifications", user: "Blessing Okafor", userType: "patient", email: "b.okafor@email.com", priority: "low", status: "open", category: "Feature Request", created: "2026-06-26 20:10", updated: "2026-06-26 20:10", assignee: "Unassigned", description: "Patient requests push notification reminders for medication schedules. Currently only available via SMS which she sometimes misses.", responses: [] },
];

const knowledgeBase = [
  { id: "KB-001", title: "How to reset your password", category: "Account", views: 1240, helpful: 89 },
  { id: "KB-002", title: "Understanding your billing statement", category: "Billing", views: 890, helpful: 76 },
  { id: "KB-003", title: "Setting up telehealth on your device", category: "Telehealth", views: 2100, helpful: 94 },
  { id: "KB-004", title: "How to view and download lab results", category: "Lab Results", views: 1560, helpful: 88 },
  { id: "KB-005", title: "Insurance claim submission guide", category: "Billing", views: 670, helpful: 72 },
  { id: "KB-006", title: "Booking and managing appointments", category: "Appointments", views: 1890, helpful: 91 },
  { id: "KB-007", title: "Marketplace vendor onboarding guide", category: "Marketplace", views: 340, helpful: 65 },
  { id: "KB-008", title: "HIPAA and data privacy FAQ", category: "Privacy", views: 920, helpful: 85 },
];

type Tab = "tickets" | "sla" | "knowledge";

export default function SupportPage() {
  const [tab, setTab] = useState<Tab>("tickets");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const filtered = tickets.filter(t => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  const detail = selectedTicket ? tickets.find(t => t.id === selectedTicket) : null;

  const openCount = tickets.filter(t => t.status === "open").length;
  const inProgressCount = tickets.filter(t => t.status === "in_progress").length;
  const resolvedCount = tickets.filter(t => t.status === "resolved").length;
  const criticalCount = tickets.filter(t => t.priority === "critical" && t.status !== "resolved").length;

  const avgResolutionTime = "4.2 hrs";
  const slaCompliance = 94;

  const priorityColor = (p: string) => {
    switch (p) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "open": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-amber-100 text-amber-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const userTypeColor = (t: string) => {
    switch (t) {
      case "patient": return "bg-primary/10 text-primary";
      case "provider": return "bg-green-100 text-green-800";
      case "vendor": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "tickets", label: "Support Tickets" },
    { key: "sla", label: "SLA Monitoring" },
    { key: "knowledge", label: "Knowledge Base" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Support & Tickets</h1>
        <p className="text-on-surface-variant text-sm mt-1">User complaints, ticket management, and knowledge base</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-blue-600">{openCount}</div>
          <div className="text-sm text-on-surface-variant mt-1">Open Tickets</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-amber-600">{inProgressCount}</div>
          <div className="text-sm text-on-surface-variant mt-1">In Progress</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-green-600">{resolvedCount}</div>
          <div className="text-sm text-on-surface-variant mt-1">Resolved (7d)</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-on-surface">{avgResolutionTime}</div>
          <div className="text-sm text-on-surface-variant mt-1">Avg Resolution</div>
        </div>
      </div>

      {/* Critical Alert */}
      {criticalCount > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg>
          <span className="text-sm text-red-800"><span className="font-semibold">{criticalCount} critical ticket(s)</span> require immediate attention. These may impact patient safety or system operations.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedTicket(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tickets Tab */}
      {tab === "tickets" && (
        <div className="flex gap-6">
          <div className={`${detail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-2 flex-wrap">
                {["all", "open", "in_progress", "resolved"].map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                    {f === "all" ? `All (${tickets.length})` : `${f.replace("_", " ")} (${tickets.filter(t => t.status === f).length})`}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-container-low text-on-surface-variant border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map(t => (
                <button key={t.id} onClick={() => setSelectedTicket(t.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedTicket === t.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${t.priority === "critical" ? "bg-red-600" : t.priority === "high" ? "bg-red-400" : t.priority === "medium" ? "bg-amber-500" : "bg-blue-400"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-on-surface text-sm truncate">{t.subject}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${priorityColor(t.priority)}`}>{t.priority}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(t.status)}`}>{t.status.replace("_", " ")}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${userTypeColor(t.userType)}`}>{t.userType}</span>
                        <span className="text-[10px] text-on-surface-variant">{t.category}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span>{t.user}</span>
                        <span>{t.id}</span>
                        <span>{t.created}</span>
                        {t.assignee !== "Unassigned" && <span>→ {t.assignee}</span>}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Detail */}
          {detail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{detail.subject}</h3>
                    <p className="text-on-primary/70 text-sm mt-0.5">{detail.id} · {detail.user}</p>
                  </div>
                  <button onClick={() => setSelectedTicket(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5 max-h-[600px] overflow-y-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${priorityColor(detail.priority)}`}>{detail.priority}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(detail.status)}`}>{detail.status.replace("_", " ")}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${userTypeColor(detail.userType)}`}>{detail.userType}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Category</div>
                    <div className="font-medium text-on-surface mt-0.5">{detail.category}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Assignee</div>
                    <div className="font-medium text-on-surface mt-0.5">{detail.assignee}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Created</div>
                    <div className="font-medium text-on-surface mt-0.5">{detail.created}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Last Updated</div>
                    <div className="font-medium text-on-surface mt-0.5">{detail.updated}</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Description</h4>
                  <p className="text-sm text-on-surface-variant">{detail.description}</p>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Contact</h4>
                  <p className="text-sm text-on-surface-variant">{detail.email}</p>
                </div>

                {detail.responses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface mb-3">Responses ({detail.responses.length})</h4>
                    <div className="space-y-3">
                      {detail.responses.map((r, i) => (
                        <div key={i} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-blue-800">{r.from}</span>
                            <span className="text-xs text-blue-600">{r.date}</span>
                          </div>
                          <p className="text-sm text-blue-900">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {detail.status !== "resolved" && (
                    <>
                      <textarea placeholder="Type your response..." className="w-full p-3 rounded-xl border border-outline-variant text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" rows={3} />
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Send Response</button>
                        <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Resolve</button>
                      </div>
                    </>
                  )}
                  {detail.assignee === "Unassigned" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Assign to Me</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Escalate Ticket</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SLA Monitoring Tab */}
      {tab === "sla" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-green-600">{slaCompliance}%</span>
              </div>
              <div className="text-sm font-medium text-on-surface">SLA Compliance</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Target: 95%</div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 text-center">
              <div className="text-2xl font-bold text-on-surface mb-1">1.2 hrs</div>
              <div className="text-sm font-medium text-on-surface">First Response</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Target: 2 hrs</div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 text-center">
              <div className="text-2xl font-bold text-on-surface mb-1">{avgResolutionTime}</div>
              <div className="text-sm font-medium text-on-surface">Avg Resolution</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Target: 8 hrs</div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 text-center">
              <div className="text-2xl font-bold text-on-surface mb-1">4.7/5</div>
              <div className="text-sm font-medium text-on-surface">Satisfaction</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Based on 156 ratings</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-4">SLA by Priority</h3>
            <div className="space-y-4">
              {[
                { priority: "Critical", target: "1 hour", actual: "0.8 hrs", compliance: 100, color: "bg-red-500" },
                { priority: "High", target: "4 hours", actual: "3.2 hrs", compliance: 92, color: "bg-amber-500" },
                { priority: "Medium", target: "8 hours", actual: "5.1 hrs", compliance: 96, color: "bg-blue-500" },
                { priority: "Low", target: "24 hours", actual: "12.4 hrs", compliance: 100, color: "bg-gray-400" },
              ].map(s => (
                <div key={s.priority} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-on-surface w-16">{s.priority}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                      <span>Target: {s.target}</span>
                      <span>Actual: {s.actual}</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.compliance}%` }} />
                    </div>
                  </div>
                  <span className={`text-sm font-bold w-12 text-right ${s.compliance >= 95 ? "text-green-600" : "text-amber-600"}`}>{s.compliance}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Agent Performance</h3>
            <div className="space-y-3">
              {[
                { name: "Aisha Mohammed", resolved: 34, avgTime: "3.8 hrs", satisfaction: 4.8, active: 2 },
                { name: "Chidi Okonkwo", resolved: 28, avgTime: "4.5 hrs", satisfaction: 4.6, active: 2 },
              ].map(a => (
                <div key={a.name} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">{a.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <span className="text-sm font-medium text-on-surface">{a.name}</span>
                      <span className="text-xs text-on-surface-variant ml-2">{a.active} active</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-on-surface-variant">
                    <span>{a.resolved} resolved</span>
                    <span>Avg: {a.avgTime}</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>{a.satisfaction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Export SLA Report (PDF)</button>
        </div>
      )}

      {/* Knowledge Base Tab */}
      {tab === "knowledge" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Knowledge Base Articles</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ New Article</button>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Article</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Category</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Views</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Helpful %</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeBase.sort((a, b) => b.views - a.views).map((kb, i) => (
                  <tr key={kb.id} className={`border-b border-outline-variant last:border-0 ${i % 2 === 0 ? "" : "bg-surface-container-low/50"}`}>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-primary hover:underline cursor-pointer">{kb.title}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-surface-container-low text-on-surface-variant">{kb.category}</span>
                    </td>
                    <td className="px-5 py-4 text-center text-sm text-on-surface-variant">{kb.views.toLocaleString()}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-sm font-medium ${kb.helpful >= 85 ? "text-green-600" : kb.helpful >= 70 ? "text-amber-600" : "text-red-600"}`}>{kb.helpful}%</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-xs text-primary font-medium hover:underline">Edit</button>
                        <button className="text-xs text-on-surface-variant font-medium hover:underline">Archive</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Article Performance</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary">{knowledgeBase.reduce((s, k) => s + k.views, 0).toLocaleString()}</div>
                <div className="text-xs text-on-surface-variant mt-1">Total Views (30d)</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{Math.round(knowledgeBase.reduce((s, k) => s + k.helpful, 0) / knowledgeBase.length)}%</div>
                <div className="text-xs text-on-surface-variant mt-1">Avg Helpful Rating</div>
              </div>
              <div>
                <div className="text-xl font-bold text-on-surface">{knowledgeBase.length}</div>
                <div className="text-xs text-on-surface-variant mt-1">Published Articles</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
