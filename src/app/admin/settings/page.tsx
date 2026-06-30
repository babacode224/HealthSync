"use client";

import { useState } from "react";

type Tab = "audit" | "roles" | "features" | "compliance";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  ip: string;
  severity: "info" | "warning" | "critical";
}

const auditLog: AuditEntry[] = [
  { id: "AU-001", timestamp: "June 27, 2026 — 10:42 AM", user: "Dr. Sarah Jenkins", role: "Doctor", action: "Accessed patient record", resource: "Patient: Emeka Nwosu (HS-PAT-004)", ip: "102.89.45.112", severity: "info" },
  { id: "AU-002", timestamp: "June 27, 2026 — 10:38 AM", user: "Admin Panel", role: "System", action: "User role updated", resource: "User: Dr. Amara Obi → role changed to Senior Consultant", ip: "System", severity: "warning" },
  { id: "AU-003", timestamp: "June 27, 2026 — 10:15 AM", user: "Pharm. Chidi Okoro", role: "Pharmacist", action: "Dispensed controlled substance", resource: "Diazepam 5mg × 30 tabs → Patient: Fatima Bello", ip: "102.89.45.118", severity: "critical" },
  { id: "AU-004", timestamp: "June 27, 2026 — 09:55 AM", user: "Lab Tech. David Akinwale", role: "Lab Tech", action: "Released lab results", resource: "HbA1c results for Adebayo Oluwatobi", ip: "102.89.45.120", severity: "info" },
  { id: "AU-005", timestamp: "June 27, 2026 — 09:30 AM", user: "Dr. Sarah Jenkins", role: "Doctor", action: "Created e-prescription", resource: "Metformin 1000mg BD → Patient: Adebayo Oluwatobi", ip: "102.89.45.112", severity: "info" },
  { id: "AU-006", timestamp: "June 27, 2026 — 09:12 AM", user: "System", role: "System", action: "Failed login attempt (3rd)", resource: "Email: unknown@mail.com — Account locked", ip: "41.203.67.89", severity: "critical" },
  { id: "AU-007", timestamp: "June 27, 2026 — 08:45 AM", user: "Admin: Bola Adeyemi", role: "Admin", action: "Exported patient data", resource: "Bulk export: 150 records (anonymized research dataset)", ip: "102.89.45.100", severity: "warning" },
  { id: "AU-008", timestamp: "June 27, 2026 — 08:30 AM", user: "Dr. Michael Obi", role: "Doctor", action: "Logged in", resource: "Session started — 2FA verified", ip: "102.89.45.115", severity: "info" },
  { id: "AU-009", timestamp: "June 26, 2026 — 06:15 PM", user: "System", role: "System", action: "Automated backup completed", resource: "Database backup: 2.4 GB — stored to encrypted cloud", ip: "System", severity: "info" },
  { id: "AU-010", timestamp: "June 26, 2026 — 05:45 PM", user: "Pharm. Chidi Okoro", role: "Pharmacist", action: "Updated inventory", resource: "Paracetamol 500mg — restocked +500 units", ip: "102.89.45.118", severity: "info" },
];

const roles = [
  { name: "Super Admin", users: 2, permissions: "Full system access, user management, audit logs, compliance", color: "bg-error/10 text-error" },
  { name: "Admin", users: 3, permissions: "User management, analytics, verification, settings (no audit export)", color: "bg-tertiary-fixed/30 text-tertiary" },
  { name: "Doctor", users: 48, permissions: "Patient records, prescriptions, telehealth, appointments, schedule", color: "bg-primary/10 text-primary" },
  { name: "Pharmacist", users: 12, permissions: "Dispensing, inventory, orders, drug interaction checks", color: "bg-secondary-container/30 text-secondary" },
  { name: "Lab Technician", users: 8, permissions: "Sample processing, result entry, equipment management", color: "bg-primary/10 text-primary" },
  { name: "Nurse", users: 22, permissions: "Vitals entry, patient triage, appointment check-in, notes", color: "bg-secondary-container/30 text-secondary" },
  { name: "Patient", users: 18201, permissions: "Own records, appointments, billing, triage, messaging", color: "bg-surface-container-high text-on-surface-variant" },
];

const features = [
  { name: "AI Symptom Triage", enabled: true, desc: "AI-powered symptom assessment for patients" },
  { name: "Telehealth Consultations", enabled: true, desc: "Video consultations between doctors and patients" },
  { name: "E-Prescriptions", enabled: true, desc: "Digital prescription writing and pharmacy routing" },
  { name: "Health Marketplace", enabled: true, desc: "Medical supplies and wellness product store" },
  { name: "Patient Messaging", enabled: true, desc: "Secure messaging between patients and providers" },
  { name: "Automated Lab Alerts", enabled: true, desc: "Critical lab value notifications to doctors" },
  { name: "Health Wallet", enabled: true, desc: "Digital wallet for healthcare payments" },
  { name: "Provider Loans", enabled: false, desc: "Equipment and practice financing for providers" },
  { name: "AI Clinical Notes", enabled: false, desc: "AI-generated consultation summaries (Beta)" },
  { name: "Cross-Facility Referrals", enabled: false, desc: "Inter-hospital patient referral system (Coming Soon)" },
];

const complianceChecks = [
  { name: "Data Encryption (AES-256)", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "HIPAA Access Controls", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "Audit Trail Integrity", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "Automated Backups (Daily)", status: "pass", lastChecked: "June 27, 2026 — 6:15 AM" },
  { name: "2FA Enforcement (Providers)", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "Session Timeout (30 min)", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "PHI Data Masking (Logs)", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "Password Policy (Min 12 chars)", status: "warning", lastChecked: "June 27, 2026 — 6:00 AM" },
  { name: "Vulnerability Scan", status: "pass", lastChecked: "June 25, 2026 — 2:00 AM" },
  { name: "SSL/TLS Certificate", status: "pass", lastChecked: "June 27, 2026 — 6:00 AM" },
];

const severityColors: Record<string, string> = {
  info: "bg-surface-container-high text-on-surface-variant",
  warning: "bg-tertiary-fixed/30 text-tertiary",
  critical: "bg-error-container/50 text-error",
};

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("audit");
  const [auditFilter, setAuditFilter] = useState("all");

  const filteredAudit = auditFilter === "all" ? auditLog : auditLog.filter((a) => a.severity === auditFilter);

  const tabs: { key: Tab; label: string }[] = [
    { key: "audit", label: "Audit Log" },
    { key: "roles", label: "Roles & Permissions" },
    { key: "features", label: "Feature Toggles" },
    { key: "compliance", label: "Compliance" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">System Settings</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Audit trail, access control, and compliance management</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Audit Log */}
      {tab === "audit" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["all", "info", "warning", "critical"].map((f) => (
                <button key={f} onClick={() => setAuditFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${auditFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                  {f === "all" ? `All (${auditLog.length})` : `${f} (${auditLog.filter((a) => a.severity === f).length})`}
                </button>
              ))}
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Export Audit
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {filteredAudit.map((a) => (
              <div key={a.id} className="flex items-start gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.severity === "critical" ? "bg-error" : a.severity === "warning" ? "bg-tertiary" : "bg-outline-variant"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-on-surface">{a.action}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${severityColors[a.severity]}`}>{a.severity.toUpperCase()}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{a.resource}</div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-on-surface-variant">
                    <span>{a.user} ({a.role})</span>
                    <span>IP: {a.ip}</span>
                    <span>{a.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roles & Permissions */}
      {tab === "roles" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface">System Roles ({roles.length})</h3>
            <button className="text-xs font-semibold text-primary hover:underline">+ Create Custom Role</button>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {roles.map((r) => (
              <div key={r.name} className="flex items-center gap-4 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${r.color}`}>
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">{r.name}</span>
                    <span className="text-xs text-on-surface-variant">({r.users.toLocaleString()} users)</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{r.permissions}</div>
                </div>
                <button className="text-xs text-primary font-medium hover:underline shrink-0">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Toggles */}
      {tab === "features" && (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            <div className="text-xs text-on-surface-variant">Feature toggles control platform-wide functionality. Disabling a feature hides it from all users. Changes take effect immediately.</div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {features.map((f) => (
              <div key={f.name} className="flex items-center justify-between px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-on-surface">{f.name}</span>
                    {!f.enabled && f.desc.includes("Beta") && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed/30 text-tertiary">BETA</span>}
                    {!f.enabled && f.desc.includes("Coming") && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">COMING SOON</span>}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{f.desc}</div>
                </div>
                <button className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${f.enabled ? "bg-primary" : "bg-surface-container-high"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-on-primary transition-transform ${f.enabled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance */}
      {tab === "compliance" && (
        <div className="space-y-4">
          {/* Compliance Score */}
          <div className="bg-secondary-container/20 border border-secondary/20 rounded-xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-xl font-bold shrink-0">
              {complianceChecks.filter((c) => c.status === "pass").length}/{complianceChecks.length}
            </div>
            <div>
              <div className="text-lg font-bold text-on-surface">HIPAA Compliance Score: {Math.round((complianceChecks.filter((c) => c.status === "pass").length / complianceChecks.length) * 100)}%</div>
              <div className="text-xs text-on-surface-variant mt-0.5">Last full audit: June 27, 2026 at 6:00 AM · Next scheduled: June 28, 2026</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Security & Compliance Checks</h3>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all">Run Full Audit</button>
            </div>
            {complianceChecks.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.status === "pass" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                  {c.status === "pass" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-on-surface">{c.name}</div>
                  <div className="text-xs text-on-surface-variant">{c.lastChecked}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "pass" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                  {c.status === "pass" ? "PASS" : "WARNING"}
                </span>
              </div>
            ))}
          </div>

          {/* Export */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-on-surface">Compliance Reports</h3>
            <p className="text-xs text-on-surface-variant">Generate and export HIPAA compliance reports for regulatory submissions and internal audits.</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Export HIPAA Report (PDF)
              </button>
              <button className="px-4 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Export Audit Log (CSV)</button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            All audit data is immutable and encrypted. Records are retained for 7 years per HIPAA requirements.
          </div>
        </div>
      )}
    </div>
  );
}
