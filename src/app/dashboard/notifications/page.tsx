"use client";

import { useState } from "react";

type Tab = "all" | "appointments" | "prescriptions" | "lab" | "billing" | "system";
type NotifType = "appointment" | "prescription" | "lab_result" | "billing" | "system" | "emergency";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionHref?: string;
  priority?: "normal" | "urgent" | "critical";
  metadata?: Record<string, string>;
}

const initialNotifications: Notification[] = [
  {
    id: "n-001", type: "emergency", title: "Critical Lab Result Alert", priority: "critical",
    message: "Your Lipid Panel results show critically elevated LDL cholesterol (245 mg/dL). Dr. Ogundimu has been notified and recommends an urgent follow-up consultation.",
    time: "10 minutes ago", read: false, actionLabel: "Book Urgent Appointment",
    metadata: { provider: "LifeBridge Lab", testId: "LAB-2024-006" },
  },
  {
    id: "n-002", type: "appointment", title: "Appointment Reminder", priority: "normal",
    message: "Your telehealth consultation with Dr. Chinwe Okafor is scheduled for tomorrow at 10:00 AM. Please ensure your camera and microphone are working.",
    time: "1 hour ago", read: false, actionLabel: "Join Waiting Room",
    metadata: { provider: "Dr. Chinwe Okafor", date: "June 24, 2024", type: "Telehealth" },
  },
  {
    id: "n-003", type: "prescription", title: "Prescription Ready for Pickup", priority: "normal",
    message: "Your prescription from Dr. Ogundimu is ready for pickup at MedPlus Pharmacy, Victoria Island branch. Order #RX-2024-0892.",
    time: "2 hours ago", read: false, actionLabel: "View Prescription",
    metadata: { pharmacy: "MedPlus Pharmacy", orderId: "RX-2024-0892" },
  },
  {
    id: "n-004", type: "billing", title: "Payment Confirmed", priority: "normal",
    message: "Your payment of ₦15,000 for consultation with Dr. Adebayo Ogundimu has been processed successfully. Receipt #PAY-9823741.",
    time: "3 hours ago", read: false, actionLabel: "View Receipt",
    metadata: { amount: "₦15,000", ref: "PAY-9823741" },
  },
  {
    id: "n-005", type: "lab_result", title: "Lab Results Available", priority: "normal",
    message: "Your Complete Blood Count (CBC) results from PathCare Diagnostics are now available. All values are within normal range.",
    time: "5 hours ago", read: true, actionLabel: "View Results",
    metadata: { lab: "PathCare Diagnostics", testId: "LAB-2024-002" },
  },
  {
    id: "n-006", type: "billing", title: "Insurance Claim Approved", priority: "normal",
    message: "Your insurance claim CLM-2024-001 for ₦15,000 has been approved by Leadway Health HMO. ₦12,000 has been credited to your Health Wallet.",
    time: "Yesterday", read: true, actionLabel: "View Claim",
    metadata: { insurer: "Leadway Health HMO", claimId: "CLM-2024-001" },
  },
  {
    id: "n-007", type: "appointment", title: "Appointment Completed", priority: "normal",
    message: "Your consultation with Dr. Chinwe Okafor on June 10 has been completed. Please take a moment to rate your experience.",
    time: "Jun 10", read: true, actionLabel: "Rate Experience",
    metadata: { provider: "Dr. Chinwe Okafor", date: "June 10, 2024" },
  },
  {
    id: "n-008", type: "prescription", title: "Medication Refill Reminder", priority: "urgent",
    message: "Your Metformin 500mg prescription will run out in 3 days. Would you like to request a refill from MedPlus Pharmacy?",
    time: "Jun 9", read: true, actionLabel: "Request Refill",
    metadata: { medication: "Metformin 500mg", pharmacy: "MedPlus Pharmacy" },
  },
  {
    id: "n-009", type: "system", title: "Profile Update Required", priority: "normal",
    message: "Please update your emergency contact information to ensure we can reach your designated contacts in case of an emergency.",
    time: "Jun 8", read: true, actionLabel: "Update Profile",
  },
  {
    id: "n-010", type: "billing", title: "Invoice Overdue", priority: "urgent",
    message: "Invoice INV-2024-005 for ₦25,000 (Dental Checkup with Dr. Folake Bamisaye) is overdue. Please make payment to avoid service interruption.",
    time: "Jun 7", read: true, actionLabel: "Pay Now",
    metadata: { amount: "₦25,000", invoiceId: "INV-2024-005" },
  },
  {
    id: "n-011", type: "system", title: "Welcome to HealthSync AI", priority: "normal",
    message: "Your account has been set up successfully. Complete your health profile to get personalized recommendations from our AI-powered triage system.",
    time: "Jun 1", read: true, actionLabel: "Complete Profile",
  },
  {
    id: "n-012", type: "lab_result", title: "Lab Test Scheduled", priority: "normal",
    message: "Your Lipid Panel test has been scheduled at LifeBridge Lab for June 15, 2024 at 8:00 AM. Please fast for 12 hours before the test.",
    time: "Jun 1", read: true,
    metadata: { lab: "LifeBridge Lab", date: "June 15, 2024" },
  },
];

const typeConfig: Record<NotifType, { label: string; color: string; icon: React.ReactNode }> = {
  appointment: {
    label: "Appointment", color: "bg-primary-fixed text-primary",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  },
  prescription: {
    label: "Prescription", color: "bg-secondary-container/30 text-secondary",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>,
  },
  lab_result: {
    label: "Lab Result", color: "bg-tertiary-fixed/30 text-tertiary",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  },
  billing: {
    label: "Billing", color: "bg-surface-container-high text-on-surface-variant",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>,
  },
  system: {
    label: "System", color: "bg-surface-container-high text-on-surface-variant",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  },
  emergency: {
    label: "Emergency", color: "bg-error-container/50 text-error",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>,
  },
};

const tabFilter: Record<Tab, NotifType[]> = {
  all: ["appointment", "prescription", "lab_result", "billing", "system", "emergency"],
  appointments: ["appointment"],
  prescriptions: ["prescription"],
  lab: ["lab_result"],
  billing: ["billing"],
  system: ["system", "emergency"],
};

interface PrefSetting {
  key: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const defaultPrefs: PrefSetting[] = [
  { key: "appointments", label: "Appointment Reminders", description: "Upcoming appointment alerts and schedule changes", email: true, push: true, sms: true },
  { key: "prescriptions", label: "Prescription Alerts", description: "Refill reminders, pickup notifications, and medication changes", email: true, push: true, sms: false },
  { key: "lab_results", label: "Lab Results", description: "Test results availability and critical value alerts", email: true, push: true, sms: true },
  { key: "billing", label: "Billing & Payments", description: "Payment confirmations, invoice reminders, and insurance updates", email: true, push: true, sms: false },
  { key: "system", label: "System Updates", description: "Account security, platform updates, and maintenance notices", email: true, push: false, sms: false },
  { key: "marketing", label: "Health Tips & Offers", description: "Wellness tips, health articles, and promotional offers", email: false, push: false, sms: false },
];

export default function NotificationsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = notifications.filter((n) => tabFilter[tab].includes(n.type));
  const unreadFiltered = filtered.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => (tabFilter[tab].includes(n.type) ? { ...n, read: true } : n)));
  };

  const togglePref = (key: string, channel: "email" | "push" | "sms") => {
    setPrefs((prev) => prev.map((p) => (p.key === key ? { ...p, [channel]: !p[channel] } : p)));
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: notifications.filter((n) => !n.read).length },
    { key: "appointments", label: "Appointments", count: notifications.filter((n) => n.type === "appointment" && !n.read).length },
    { key: "prescriptions", label: "Prescriptions", count: notifications.filter((n) => n.type === "prescription" && !n.read).length },
    { key: "lab", label: "Lab Results", count: notifications.filter((n) => n.type === "lab_result" && !n.read).length },
    { key: "billing", label: "Billing", count: notifications.filter((n) => n.type === "billing" && !n.read).length },
    { key: "system", label: "System", count: notifications.filter((n) => (n.type === "system" || n.type === "emergency") && !n.read).length },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-on-surface">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-error text-on-error text-xs font-bold">{unreadCount}</span>
            )}
          </div>
          <p className="text-sm text-on-surface-variant mt-0.5">Stay updated on your healthcare activity</p>
        </div>
        <div className="flex gap-2 self-start">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${showPreferences ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface hover:bg-surface-container-low"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            Preferences
          </button>
          {unreadFiltered > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant bg-surface-container-low">
            <h3 className="text-sm font-bold text-on-surface">Notification Preferences</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Choose how you want to be notified for each category</p>
          </div>
          <div className="hidden sm:grid grid-cols-12 px-5 py-2 border-b border-outline-variant bg-surface-container-low">
            <span className="col-span-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Category</span>
            <span className="col-span-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">Email</span>
            <span className="col-span-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">Push</span>
            <span className="col-span-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">SMS</span>
          </div>
          {prefs.map((p) => (
            <div key={p.key} className="grid sm:grid-cols-12 gap-2 sm:gap-0 items-center px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
              <div className="sm:col-span-6">
                <div className="text-sm font-semibold text-on-surface">{p.label}</div>
                <div className="text-xs text-on-surface-variant">{p.description}</div>
              </div>
              <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                <span className="sm:hidden text-xs text-on-surface-variant">Email</span>
                <button
                  onClick={() => togglePref(p.key, "email")}
                  className={`relative w-10 h-5 rounded-full transition-colors ${p.email ? "bg-primary" : "bg-surface-container-high"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${p.email ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                <span className="sm:hidden text-xs text-on-surface-variant">Push</span>
                <button
                  onClick={() => togglePref(p.key, "push")}
                  className={`relative w-10 h-5 rounded-full transition-colors ${p.push ? "bg-primary" : "bg-surface-container-high"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${p.push ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                <span className="sm:hidden text-xs text-on-surface-variant">SMS</span>
                <button
                  onClick={() => togglePref(p.key, "sms")}
                  className={`relative w-10 h-5 rounded-full transition-colors ${p.sms ? "bg-primary" : "bg-surface-container-high"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${p.sms ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          ))}
          <div className="px-5 py-3 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              Critical alerts (emergency lab values) cannot be disabled
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Save Preferences</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-surface-container-high rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedNotif(null); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${tab === t.key ? "bg-on-primary/20 text-on-primary" : "bg-error text-on-error"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List + Detail */}
      <div className="flex gap-6">
        <div className={`${selectedNotif ? "hidden lg:block lg:w-1/2" : "w-full"} space-y-2`}>
          {filtered.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 text-center">
              <svg className="w-12 h-12 text-outline mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
              <div className="text-sm font-medium text-on-surface-variant">No notifications in this category</div>
            </div>
          ) : (
            filtered.map((n) => {
              const config = typeConfig[n.type];
              return (
                <div
                  key={n.id}
                  onClick={() => { setSelectedNotif(n); if (!n.read) markAsRead(n.id); }}
                  className={`bg-surface-container-lowest border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all ${selectedNotif?.id === n.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"} ${!n.read ? "border-l-4 border-l-primary" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-sm font-semibold truncate ${!n.read ? "text-on-surface" : "text-on-surface-variant"}`}>{n.title}</span>
                          {n.priority === "critical" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error text-on-error shrink-0">CRITICAL</span>
                          )}
                          {n.priority === "urgent" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed/50 text-tertiary shrink-0">URGENT</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!n.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                          <span className="text-[10px] text-outline">{n.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{n.message}</p>
                      {n.actionLabel && (
                        <button className="text-xs font-semibold text-primary mt-2 hover:underline">{n.actionLabel}</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        {selectedNotif && (
          <div className={`${selectedNotif ? "w-full lg:w-1/2" : "hidden"}`}>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-4">
              <div className={`p-5 ${selectedNotif.priority === "critical" ? "bg-error text-on-error" : "bg-primary text-on-primary"}`}>
                <button onClick={() => setSelectedNotif(null)} className="lg:hidden text-on-primary/80 text-xs mb-2 flex items-center gap-1 hover:text-on-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                  Back
                </button>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedNotif.priority === "critical" ? "bg-on-error/20" : "bg-on-primary/20"}`}>
                    {typeConfig[selectedNotif.type].icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{selectedNotif.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${selectedNotif.priority === "critical" ? "bg-on-error/20" : "bg-on-primary/20"}`}>
                        {typeConfig[selectedNotif.type].label.toUpperCase()}
                      </span>
                      {selectedNotif.priority && selectedNotif.priority !== "normal" && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedNotif.priority === "critical" ? "bg-on-error/30" : "bg-on-primary/30"}`}>
                          {selectedNotif.priority.toUpperCase()}
                        </span>
                      )}
                      <span className={`text-xs ${selectedNotif.priority === "critical" ? "text-on-error/70" : "text-on-primary/70"}`}>{selectedNotif.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-on-surface leading-relaxed">{selectedNotif.message}</p>

                {selectedNotif.metadata && (
                  <div className="bg-surface-container-low rounded-lg p-4 space-y-2">
                    <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide mb-2">Details</h4>
                    {Object.entries(selectedNotif.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-on-surface-variant capitalize">{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}:</span>
                        <span className="font-medium text-on-surface">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedNotif.priority === "critical" && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container/30 border border-error/20">
                    <svg className="w-4 h-4 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                    <div className="text-xs text-error">This is a critical health alert. Your healthcare provider has been automatically notified. Please seek medical attention promptly.</div>
                  </div>
                )}

                <div className="space-y-2">
                  {selectedNotif.actionLabel && (
                    <button className={`w-full py-2.5 rounded-xl text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all ${selectedNotif.priority === "critical" ? "bg-error text-on-error" : "bg-primary text-on-primary"}`}>
                      {selectedNotif.actionLabel}
                    </button>
                  )}
                  <div className="flex gap-2">
                    {!selectedNotif.read && (
                      <button
                        onClick={() => markAsRead(selectedNotif.id)}
                        className="flex-1 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button className="flex-1 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant">
                  <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    HIPAA-compliant notifications. Health data encrypted in transit.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
