"use client";

import { useState } from "react";

type Tab = "profile" | "medical" | "emergency" | "security" | "data";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

interface Allergy {
  id: string;
  allergen: string;
  severity: "mild" | "moderate" | "severe";
  reaction: string;
}

interface Device {
  id: string;
  name: string;
  type: string;
  lastSync: string;
  connected: boolean;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [editingProfile, setEditingProfile] = useState(false);

  // Profile
  const [fullName, setFullName] = useState("Adebayo Oluwatobi");
  const [email, setEmail] = useState("canvateams591@gmail.com");
  const [phone, setPhone] = useState("+234 803 456 7890");
  const [dob, setDob] = useState("1990-03-15");
  const [sex, setSex] = useState("Male");
  const [bloodType, setBloodType] = useState("O+");
  const [genotype, setGenotype] = useState("AA");
  const [address, setAddress] = useState("24 Admiralty Way, Lekki Phase 1, Lagos");
  const [language, setLanguage] = useState("English");

  // Emergency Contacts
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: "ec-1", name: "Funke Oluwatobi", relationship: "Spouse", phone: "+234 805 123 4567", isPrimary: true },
    { id: "ec-2", name: "Dr. Emeka Obi", relationship: "Family Doctor", phone: "+234 801 987 6543", isPrimary: false },
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [ncName, setNcName] = useState("");
  const [ncRelation, setNcRelation] = useState("");
  const [ncPhone, setNcPhone] = useState("");

  // Medical
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: "a-1", allergen: "Penicillin", severity: "severe", reaction: "Anaphylaxis — throat swelling, difficulty breathing" },
    { id: "a-2", allergen: "Sulfonamides", severity: "moderate", reaction: "Skin rash, hives" },
    { id: "a-3", allergen: "Peanuts", severity: "mild", reaction: "Mild itching" },
  ]);
  const [conditions] = useState([
    { condition: "Type 2 Diabetes Mellitus", diagnosed: "March 2024", status: "Active", managing: "Metformin 1000mg BD" },
    { condition: "Essential Hypertension", diagnosed: "March 2024", status: "Active", managing: "Lisinopril 10mg OD" },
    { condition: "Dyslipidemia", diagnosed: "April 2024", status: "Monitoring", managing: "Atorvastatin 20mg OD" },
  ]);
  const [showAddAllergy, setShowAddAllergy] = useState(false);

  // Devices
  const [devices] = useState<Device[]>([
    { id: "d-1", name: "Apple Watch Series 9", type: "Smartwatch", lastSync: "2 min ago", connected: true },
    { id: "d-2", name: "Omron BP Monitor", type: "Blood Pressure", lastSync: "1 hour ago", connected: true },
    { id: "d-3", name: "Accu-Chek Guide", type: "Glucose Monitor", lastSync: "3 hours ago", connected: true },
    { id: "d-4", name: "Fitbit Charge 5", type: "Fitness Tracker", lastSync: "Never", connected: false },
  ]);

  // Security
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [sessions] = useState<Session[]>([
    { id: "s-1", device: "Chrome on Windows 11", location: "Lagos, Nigeria", lastActive: "Now", current: true },
    { id: "s-2", device: "Safari on iPhone 15", location: "Lagos, Nigeria", lastActive: "2 hours ago", current: false },
    { id: "s-3", device: "HealthSync iOS App", location: "Lagos, Nigeria", lastActive: "Yesterday", current: false },
  ]);

  const addContact = () => {
    if (ncName && ncRelation && ncPhone) {
      setContacts((c) => [...c, { id: `ec-${Date.now()}`, name: ncName, relationship: ncRelation, phone: ncPhone, isPrimary: false }]);
      setNcName(""); setNcRelation(""); setNcPhone("");
      setShowAddContact(false);
    }
  };

  const severityColors: Record<string, string> = {
    mild: "bg-tertiary-fixed/30 text-tertiary",
    moderate: "bg-tertiary-fixed/50 text-tertiary",
    severe: "bg-error-container/50 text-error",
  };

  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    { key: "profile", label: "Profile", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg> },
    { key: "medical", label: "Medical", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg> },
    { key: "emergency", label: "Emergency", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg> },
    { key: "security", label: "Security", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
    { key: "data", label: "Data & Privacy", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Settings</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Manage your profile, health data, and account security</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-surface-container-high rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === "profile" && (
        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary text-2xl font-bold shrink-0">AO</div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-on-surface">{fullName}</h2>
                <div className="text-xs text-on-surface-variant mt-0.5">Patient ID: HS-PAT-2024-00847</div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all">Change Photo</button>
                  <button onClick={() => setEditingProfile(!editingProfile)} className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all">
                    {editingProfile ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: fullName, setter: setFullName },
                { label: "Email", value: email, setter: setEmail },
                { label: "Phone", value: phone, setter: setPhone },
                { label: "Date of Birth", value: dob, setter: setDob, type: "date" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">{f.label}</label>
                  {editingProfile ? (
                    <input type={f.type || "text"} value={f.value} onChange={(e) => f.setter(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
                  ) : (
                    <div className="text-sm text-on-surface mt-1 font-medium">{f.value}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Biological Sex", value: sex, options: ["Male", "Female"], setter: setSex },
                { label: "Blood Type", value: bloodType, options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], setter: setBloodType },
                { label: "Genotype", value: genotype, options: ["AA", "AS", "SS", "AC", "SC"], setter: setGenotype },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">{f.label}</label>
                  {editingProfile ? (
                    <select value={f.value} onChange={(e) => f.setter(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                      {f.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <div className="text-sm text-on-surface mt-1 font-medium">{f.value}</div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Address</label>
              {editingProfile ? (
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
              ) : (
                <div className="text-sm text-on-surface mt-1 font-medium">{address}</div>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Preferred Language</label>
              {editingProfile ? (
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>English</option><option>Yoruba</option><option>Igbo</option><option>Hausa</option><option>Pidgin</option>
                </select>
              ) : (
                <div className="text-sm text-on-surface mt-1 font-medium">{language}</div>
              )}
            </div>
            {editingProfile && (
              <button onClick={() => setEditingProfile(false)} className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">Save Changes</button>
            )}
          </div>
        </div>
      )}

      {/* Medical Tab */}
      {tab === "medical" && (
        <div className="space-y-6">
          {/* Allergies */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Allergies & Sensitivities</h3>
              <button onClick={() => setShowAddAllergy(!showAddAllergy)} className="text-xs font-semibold text-primary hover:underline">+ Add</button>
            </div>
            {allergies.map((a) => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${severityColors[a.severity]}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-on-surface">{a.allergen}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${severityColors[a.severity]}`}>{a.severity.toUpperCase()}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{a.reaction}</div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              </div>
            ))}
            {showAddAllergy && (
              <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/50 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <input placeholder="Allergen" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                  <select className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Mild</option><option>Moderate</option><option>Severe</option>
                  </select>
                  <input placeholder="Reaction" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all">Save Allergy</button>
              </div>
            )}
          </div>

          {/* Conditions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Medical Conditions</h3>
            </div>
            {conditions.map((c, i) => (
              <div key={i} className="px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-on-surface">{c.condition}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.status === "Active" ? "bg-secondary-container/30 text-secondary" : "bg-tertiary-fixed/30 text-tertiary"}`}>{c.status}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <span>Diagnosed: {c.diagnosed}</span>
                  <span>Managing: {c.managing}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Connected Devices */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Connected Devices</h3>
              <button className="text-xs font-semibold text-primary hover:underline">+ Connect Device</button>
            </div>
            {devices.map((d) => (
              <div key={d.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${d.connected ? "bg-secondary-container/30 text-secondary" : "bg-surface-container-high text-on-surface-variant"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-on-surface">{d.name}</div>
                  <div className="text-xs text-on-surface-variant">{d.type} · Last sync: {d.lastSync}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.connected ? "bg-secondary-container/30 text-secondary" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {d.connected ? "CONNECTED" : "DISCONNECTED"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Tab */}
      {tab === "emergency" && (
        <div className="space-y-6">
          <div className="bg-error-container/20 border border-error/20 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
            <div>
              <div className="text-sm font-bold text-error">Emergency contacts are critical</div>
              <div className="text-xs text-error/80 mt-0.5">These contacts will be notified automatically via SOS and when critical lab values are detected.</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Emergency Contacts</h3>
              <button onClick={() => setShowAddContact(!showAddContact)} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add Contact
              </button>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error text-sm font-bold shrink-0">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">{c.name}</span>
                    {c.isPrimary && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-error-container/50 text-error">PRIMARY</span>}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{c.relationship} · {c.phone}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!c.isPrimary && <button className="text-xs text-primary font-medium hover:underline">Set Primary</button>}
                  <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                  </button>
                </div>
              </div>
            ))}
            {showAddContact && (
              <div className="px-5 py-4 border-t border-outline-variant bg-surface-container-low/50 space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">New Emergency Contact</h4>
                <div className="grid sm:grid-cols-3 gap-2">
                  <input value={ncName} onChange={(e) => setNcName(e.target.value)} placeholder="Full name" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input value={ncRelation} onChange={(e) => setNcRelation(e.target.value)} placeholder="Relationship" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input value={ncPhone} onChange={(e) => setNcPhone(e.target.value)} placeholder="Phone number" className="px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addContact} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Add Contact</button>
                  <button onClick={() => setShowAddContact(false)} className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all">Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Medical ID Card */}
          <div className="bg-gradient-to-br from-error to-error/80 rounded-xl p-5 text-on-error">
            <div className="text-xs text-on-error/60 uppercase tracking-wider mb-1">Medical ID</div>
            <div className="text-lg font-bold">{fullName}</div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div><span className="text-on-error/60">DOB:</span> <span>{dob}</span></div>
              <div><span className="text-on-error/60">Blood:</span> <span>{bloodType}</span></div>
              <div><span className="text-on-error/60">Genotype:</span> <span>{genotype}</span></div>
              <div><span className="text-on-error/60">Allergies:</span> <span>{allergies.map((a) => a.allergen).join(", ")}</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-on-error/20 text-xs">
              <div className="text-on-error/60">Emergency Contact</div>
              <div className="font-medium">{contacts[0]?.name} ({contacts[0]?.relationship}) · {contacts[0]?.phone}</div>
            </div>
            <button className="mt-3 px-4 py-1.5 rounded-lg bg-on-error/20 text-xs font-semibold hover:bg-on-error/30 transition-all">Share Medical ID</button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === "security" && (
        <div className="space-y-6">
          {/* Password */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface">Change Password</h3>
            <div className="space-y-3">
              <input type="password" placeholder="Current password" className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="password" placeholder="New password" className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="px-6 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Update Password</button>
          </div>

          {/* 2FA & Biometric */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Authentication</h3>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
              <div>
                <div className="text-sm font-semibold text-on-surface">Two-Factor Authentication (2FA)</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Add an extra layer of security via SMS or authenticator app</div>
              </div>
              <button onClick={() => setTwoFAEnabled(!twoFAEnabled)} className={`relative w-11 h-6 rounded-full transition-colors ${twoFAEnabled ? "bg-primary" : "bg-surface-container-high"}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-on-primary transition-transform ${twoFAEnabled ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-on-surface">Biometric Login</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Use fingerprint or face recognition to sign in</div>
              </div>
              <button onClick={() => setBiometricEnabled(!biometricEnabled)} className={`relative w-11 h-6 rounded-full transition-colors ${biometricEnabled ? "bg-primary" : "bg-surface-container-high"}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-on-primary transition-transform ${biometricEnabled ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Active Sessions</h3>
              <button className="text-xs font-semibold text-error hover:underline">Sign Out All Others</button>
            </div>
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.current ? "bg-secondary-container/30 text-secondary" : "bg-surface-container-high text-on-surface-variant"}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a9 9 0 0 1-9 9m0 0a9 9 0 0 1-9-9" /></svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-on-surface">{s.device}</span>
                    {s.current && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary">THIS DEVICE</span>}
                  </div>
                  <div className="text-xs text-on-surface-variant">{s.location} · {s.lastActive}</div>
                </div>
                {!s.current && <button className="text-xs text-error font-medium hover:underline">Sign Out</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data & Privacy Tab */}
      {tab === "data" && (
        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface">Data Export</h3>
            <p className="text-xs text-on-surface-variant">Under HIPAA, you have the right to access and download all your health data. Export includes medical records, appointment history, prescriptions, lab results, and billing information.</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Export All Data (PDF)
              </button>
              <button className="px-4 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Export as JSON</button>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Privacy Controls</h3>
            </div>
            {[
              { label: "Share data with insurance provider", desc: "Allow Leadway Health HMO to access your records for claims", enabled: true },
              { label: "Anonymous analytics", desc: "Contribute anonymized data to improve AI triage accuracy", enabled: true },
              { label: "Marketing communications", desc: "Receive health tips, offers, and wellness content", enabled: false },
              { label: "Third-party data sharing", desc: "Share health data with research institutions", enabled: false },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between px-5 py-3 border-b border-outline-variant last:border-0">
                <div>
                  <div className="text-sm font-medium text-on-surface">{p.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{p.desc}</div>
                </div>
                <button className={`relative w-10 h-5 rounded-full transition-colors ${p.enabled ? "bg-primary" : "bg-surface-container-high"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${p.enabled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-error-container/20 border border-error/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-error mb-2">Danger Zone</h3>
            <p className="text-xs text-on-surface-variant mb-3">Permanently delete your HealthSync account and all associated data. This action cannot be undone.</p>
            <button className="px-4 py-2 rounded-xl bg-error text-on-error text-sm font-bold hover:opacity-90 transition-all">Delete Account</button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            HIPAA-compliant data handling. All personal health information is encrypted at rest and in transit.
          </div>
        </div>
      )}
    </div>
  );
}
