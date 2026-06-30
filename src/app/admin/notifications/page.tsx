"use client";

import { useState } from "react";

const notifications = [
  { id: "NTF-001", title: "System Maintenance Scheduled", message: "HealthSync will undergo scheduled maintenance on July 1, 2026 from 2:00 AM to 4:00 AM WAT. All services will be temporarily unavailable.", type: "system", audience: "all", channel: ["email", "push", "sms"], status: "sent", sentAt: "2026-06-27 08:00", deliveryRate: 98.4, openRate: 72.1, createdBy: "Admin System" },
  { id: "NTF-002", title: "New NAFDAC Compliance Update", message: "Updated NAFDAC compliance requirements for lab equipment calibration have been published. All lab managers must review and acknowledge by July 15, 2026.", type: "compliance", audience: "providers", channel: ["email", "push"], status: "sent", sentAt: "2026-06-26 10:30", deliveryRate: 100, openRate: 65.3, createdBy: "Aisha Mohammed" },
  { id: "NTF-003", title: "Pharmacy Inventory Alert: Low Stock", message: "12 medications have fallen below minimum stock levels. Immediate reorder required for: Metformin 500mg, Amoxicillin 250mg, Lisinopril 10mg.", type: "alert", audience: "pharmacy", channel: ["email", "push"], status: "sent", sentAt: "2026-06-27 06:00", deliveryRate: 100, openRate: 89.2, createdBy: "Auto-Alert System" },
  { id: "NTF-004", title: "Platform Update: Telehealth Improvements", message: "We've upgraded our telehealth infrastructure with better video quality, reduced latency, and improved mobile support. Try your next consultation to experience the difference!", type: "announcement", audience: "all", channel: ["email", "push"], status: "scheduled", sentAt: "2026-06-28 09:00", deliveryRate: 0, openRate: 0, createdBy: "Chidi Okonkwo" },
  { id: "NTF-005", title: "Insurance Claim Processing Delay", message: "AXA Mansard insurance claims submitted between June 20-24 are experiencing processing delays. Expected resolution by June 30. Affected patients have been notified individually.", type: "alert", audience: "patients", channel: ["email", "sms"], status: "sent", sentAt: "2026-06-25 14:00", deliveryRate: 96.8, openRate: 58.7, createdBy: "Aisha Mohammed" },
  { id: "NTF-006", title: "Welcome: New Vendor Onboarding", message: "Welcome to the HealthSync Marketplace! Your vendor application has been approved. Please complete your profile and upload your product listings to get started.", type: "onboarding", audience: "vendors", channel: ["email"], status: "sent", sentAt: "2026-06-26 11:00", deliveryRate: 100, openRate: 100, createdBy: "Auto-Alert System" },
  { id: "NTF-007", title: "Critical: Server Performance Degradation", message: "We are investigating reports of slow page load times and API timeouts. Engineering team is actively working on resolution. Updates will follow.", type: "incident", audience: "all", channel: ["email", "push", "sms"], status: "sent", sentAt: "2026-06-24 16:45", deliveryRate: 99.1, openRate: 84.6, createdBy: "Admin System" },
  { id: "NTF-008", title: "Monthly Health Tips Newsletter", message: "June edition: Managing hypertension during the rainy season, importance of regular check-ups, and 5 foods that boost your immune system.", type: "newsletter", audience: "patients", channel: ["email"], status: "draft", sentAt: "", deliveryRate: 0, openRate: 0, createdBy: "Content Team" },
];

const alertRules = [
  { id: "RUL-001", name: "Low Inventory Alert", trigger: "Stock falls below minimum threshold", audience: "Pharmacy Staff", channels: ["email", "push"], enabled: true, lastTriggered: "2026-06-27 06:00", triggerCount: 14 },
  { id: "RUL-002", name: "STAT Order Notification", trigger: "New STAT lab order created", audience: "Lab Technicians", channels: ["push", "sms"], enabled: true, lastTriggered: "2026-06-27 09:12", triggerCount: 47 },
  { id: "RUL-003", name: "Appointment Reminder", trigger: "24 hours before scheduled appointment", audience: "Patients", channels: ["sms", "push"], enabled: true, lastTriggered: "2026-06-27 00:00", triggerCount: 1230 },
  { id: "RUL-004", name: "Failed Login Attempts", trigger: "3+ failed login attempts on an account", audience: "Security Team", channels: ["email", "push"], enabled: true, lastTriggered: "2026-06-25 08:20", triggerCount: 8 },
  { id: "RUL-005", name: "Equipment Calibration Due", trigger: "Calibration due within 7 days", audience: "Lab Managers", channels: ["email"], enabled: true, lastTriggered: "2026-06-21 08:00", triggerCount: 6 },
  { id: "RUL-006", name: "Insurance Claim Denied", trigger: "Insurance claim denied by provider", audience: "Billing Team, Patient", channels: ["email", "push"], enabled: true, lastTriggered: "2026-06-26 14:30", triggerCount: 23 },
  { id: "RUL-007", name: "New Provider Registration", trigger: "New provider completes registration", audience: "Admin Team", channels: ["email"], enabled: true, lastTriggered: "2026-06-25 11:00", triggerCount: 34 },
  { id: "RUL-008", name: "Weekly Analytics Summary", trigger: "Every Monday at 8:00 AM", audience: "Admin Team", channels: ["email"], enabled: false, lastTriggered: "2026-06-23 08:00", triggerCount: 52 },
];

const deliveryStats = {
  totalSent: 14520,
  delivered: 14280,
  opened: 9845,
  clicked: 3210,
  failed: 240,
  channels: { email: { sent: 8200, delivered: 8050, rate: 98.2 }, sms: { sent: 3120, delivered: 3040, rate: 97.4 }, push: { sent: 3200, delivered: 3190, rate: 99.7 } },
};

type Tab = "broadcasts" | "rules" | "compose" | "analytics";

export default function NotificationsPage() {
  const [tab, setTab] = useState<Tab>("broadcasts");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedNotif, setSelectedNotif] = useState<string | null>(null);

  const filtered = statusFilter === "all" ? notifications : notifications.filter(n => n.status === statusFilter);
  const detail = selectedNotif ? notifications.find(n => n.id === selectedNotif) : null;

  const typeColor = (t: string) => {
    switch (t) {
      case "system": return "bg-blue-100 text-blue-800";
      case "alert": case "incident": return "bg-red-100 text-red-800";
      case "compliance": return "bg-purple-100 text-purple-800";
      case "announcement": return "bg-green-100 text-green-800";
      case "onboarding": return "bg-cyan-100 text-cyan-800";
      case "newsletter": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "sent": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const channelIcon = (c: string) => {
    switch (c) {
      case "email": return "✉";
      case "sms": return "💬";
      case "push": return "🔔";
      default: return "📨";
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "broadcasts", label: "Broadcasts" },
    { key: "rules", label: "Alert Rules" },
    { key: "compose", label: "Compose" },
    { key: "analytics", label: "Delivery Analytics" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Notifications Center</h1>
        <p className="text-on-surface-variant text-sm mt-1">Broadcast messages, alert rules, and delivery analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-primary">{deliveryStats.totalSent.toLocaleString()}</div>
          <div className="text-sm text-on-surface-variant mt-1">Total Sent (30d)</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-green-600">{Math.round((deliveryStats.delivered / deliveryStats.totalSent) * 100)}%</div>
          <div className="text-sm text-on-surface-variant mt-1">Delivery Rate</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-blue-600">{Math.round((deliveryStats.opened / deliveryStats.delivered) * 100)}%</div>
          <div className="text-sm text-on-surface-variant mt-1">Open Rate</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-red-600">{deliveryStats.failed}</div>
          <div className="text-sm text-on-surface-variant mt-1">Failed Deliveries</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedNotif(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Broadcasts Tab */}
      {tab === "broadcasts" && (
        <div className="flex gap-6">
          <div className={`${detail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["all", "sent", "scheduled", "draft"].map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${statusFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                    {f === "all" ? `All (${notifications.length})` : `${f} (${notifications.filter(n => n.status === f).length})`}
                  </button>
                ))}
              </div>
              <button onClick={() => setTab("compose")} className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ New Broadcast</button>
            </div>

            <div className="space-y-3">
              {filtered.map(n => (
                <button key={n.id} onClick={() => setSelectedNotif(n.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedNotif === n.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-on-surface text-sm truncate">{n.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${typeColor(n.type)}`}>{n.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(n.status)}`}>{n.status}</span>
                        <span className="text-[10px] text-on-surface-variant capitalize">→ {n.audience}</span>
                        <span className="text-[10px] text-on-surface-variant">{n.channel.map(c => channelIcon(c)).join(" ")}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2">{n.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span>{n.sentAt || "Not sent"}</span>
                        {n.deliveryRate > 0 && <span>Delivered: {n.deliveryRate}%</span>}
                        {n.openRate > 0 && <span>Opened: {n.openRate}%</span>}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {detail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{detail.title}</h3>
                    <p className="text-on-primary/70 text-sm mt-0.5">{detail.id} · {detail.createdBy}</p>
                  </div>
                  <button onClick={() => setSelectedNotif(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${typeColor(detail.type)}`}>{detail.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(detail.status)}`}>{detail.status}</span>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Message</h4>
                  <p className="text-sm text-on-surface-variant">{detail.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Audience</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm capitalize">{detail.audience}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Channels</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.channel.map(c => channelIcon(c) + " " + c).join(", ")}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">{detail.status === "scheduled" ? "Scheduled For" : "Sent At"}</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.sentAt || "—"}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-xs text-on-surface-variant">Created By</div>
                    <div className="font-medium text-on-surface mt-0.5 text-sm">{detail.createdBy}</div>
                  </div>
                </div>

                {detail.deliveryRate > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-3">Delivery Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1"><span>Delivery Rate</span><span>{detail.deliveryRate}%</span></div>
                        <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${detail.deliveryRate}%` }} /></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1"><span>Open Rate</span><span>{detail.openRate}%</span></div>
                        <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${detail.openRate}%` }} /></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {detail.status === "draft" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Send Now</button>
                      <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Schedule</button>
                    </div>
                  )}
                  {detail.status === "scheduled" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Cancel Scheduled Send</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Duplicate & Edit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alert Rules Tab */}
      {tab === "rules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Automated Alert Rules</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ New Rule</button>
          </div>

          <div className="space-y-3">
            {alertRules.map(r => (
              <div key={r.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface">{r.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${r.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{r.enabled ? "Active" : "Disabled"}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">{r.trigger}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                      <span>Audience: {r.audience}</span>
                      <span>Channels: {r.channels.map(c => channelIcon(c)).join(" ")}</span>
                      <span>Triggered {r.triggerCount}x</span>
                      <span>Last: {r.lastTriggered}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`w-12 h-6 rounded-full transition-all ${r.enabled ? "bg-green-500" : "bg-gray-300"}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${r.enabled ? "translate-x-6" : "translate-x-0.5"}`} />
                    </button>
                    <button className="text-xs text-primary font-medium hover:underline ml-2">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compose Tab */}
      {tab === "compose" && (
        <div className="max-w-2xl space-y-5">
          <h2 className="text-lg font-semibold text-on-surface">Compose Broadcast</h2>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-on-surface block mb-1.5">Notification Title</label>
              <input type="text" placeholder="Enter notification title..." className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="text-sm font-medium text-on-surface block mb-1.5">Message</label>
              <textarea placeholder="Type your message..." className="w-full px-4 py-3 rounded-xl border border-outline-variant text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none" rows={5} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-on-surface block mb-1.5">Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface">
                  <option>Announcement</option>
                  <option>Alert</option>
                  <option>System</option>
                  <option>Compliance</option>
                  <option>Newsletter</option>
                  <option>Incident</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface block mb-1.5">Audience</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface">
                  <option>All Users</option>
                  <option>Patients Only</option>
                  <option>Providers Only</option>
                  <option>Pharmacy Staff</option>
                  <option>Lab Staff</option>
                  <option>Vendors</option>
                  <option>Admin Team</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-on-surface block mb-2">Delivery Channels</label>
              <div className="flex gap-4">
                {["Email", "Push Notification", "SMS"].map(ch => (
                  <label key={ch} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={ch !== "SMS"} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                    <span className="text-sm text-on-surface">{ch}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-on-surface block mb-1.5">Schedule</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="schedule" defaultChecked className="w-4 h-4 text-primary focus:ring-primary" />
                  <span className="text-sm text-on-surface">Send Immediately</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="schedule" className="w-4 h-4 text-primary focus:ring-primary" />
                  <span className="text-sm text-on-surface">Schedule for Later</span>
                </label>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
                <span className="text-sm text-amber-800 font-medium">Broadcast messages are sent to all users in the selected audience. Review carefully before sending.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Send Broadcast</button>
              <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Save as Draft</button>
              <button className="px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Preview</button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Analytics Tab */}
      {tab === "analytics" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Delivery Analytics (Last 30 Days)</h2>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Delivery Funnel</h3>
            <div className="space-y-4">
              {[
                { label: "Total Sent", value: deliveryStats.totalSent, pct: 100, color: "bg-primary" },
                { label: "Delivered", value: deliveryStats.delivered, pct: Math.round((deliveryStats.delivered / deliveryStats.totalSent) * 100), color: "bg-green-500" },
                { label: "Opened", value: deliveryStats.opened, pct: Math.round((deliveryStats.opened / deliveryStats.totalSent) * 100), color: "bg-blue-500" },
                { label: "Clicked", value: deliveryStats.clicked, pct: Math.round((deliveryStats.clicked / deliveryStats.totalSent) * 100), color: "bg-purple-500" },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-on-surface font-medium">{s.label}</span>
                    <span className="text-on-surface-variant">{s.value.toLocaleString()} ({s.pct}%)</span>
                  </div>
                  <div className="w-full h-4 bg-surface-container-low rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Channel Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(deliveryStats.channels).map(([channel, data]) => (
                <div key={channel} className="bg-surface-container-low rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{channelIcon(channel)}</div>
                  <h4 className="text-sm font-semibold text-on-surface capitalize">{channel}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-on-surface-variant">Sent: <span className="font-medium text-on-surface">{data.sent.toLocaleString()}</span></div>
                    <div className="text-xs text-on-surface-variant">Delivered: <span className="font-medium text-on-surface">{data.delivered.toLocaleString()}</span></div>
                    <div className="mt-2">
                      <span className={`text-sm font-bold ${data.rate >= 98 ? "text-green-600" : data.rate >= 95 ? "text-amber-600" : "text-red-600"}`}>{data.rate}%</span>
                      <div className="text-[10px] text-on-surface-variant">delivery rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Export Report (PDF)</button>
            <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Download CSV</button>
          </div>
        </div>
      )}
    </div>
  );
}
