"use client";

import { useState } from "react";

type Tab = "personal" | "emergency" | "insurance" | "settings";

export default function PatientProfilePage() {
  const [tab, setTab] = useState<Tab>("personal");
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Amara",
    lastName: "Okafor",
    email: "amara.okafor@gmail.com",
    phone: "+234 801 234 5678",
    dob: "1992-03-15",
    gender: "Female",
    bloodType: "O+",
    genotype: "AA",
    height: "168 cm",
    weight: "65 kg",
    address: "12 Admiralty Way, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    maritalStatus: "Single",
  });

  const emergencyContacts = [
    { name: "Chidi Okafor", relationship: "Brother", phone: "+234 802 345 6789", email: "chidi.okafor@gmail.com", primary: true },
    { name: "Ngozi Eze", relationship: "Mother", phone: "+234 803 456 7890", email: "ngozi.eze@gmail.com", primary: false },
  ];

  const insurance = {
    provider: "HMO HealthGuard Nigeria",
    planName: "Premium Care Plus",
    policyNumber: "HGN-2024-0892341",
    groupNumber: "GRP-CORP-445",
    memberId: "MEM-AO-892341",
    effectiveDate: "Jan 1, 2026",
    expiryDate: "Dec 31, 2026",
    status: "Active",
    coverageType: "Individual + Family",
    copay: "₦2,500",
    deductible: "₦50,000 / year",
    maxCoverage: "₦5,000,000 / year",
  };

  const conditions = ["Hypertension (Managed)", "Mild Asthma"];
  const allergies = ["Penicillin", "Sulfonamides", "Latex"];
  const surgeries = ["Appendectomy (2018)"];

  const tabs: { key: Tab; label: string }[] = [
    { key: "personal", label: "Personal Info" },
    { key: "emergency", label: "Emergency Contacts" },
    { key: "insurance", label: "Insurance" },
    { key: "settings", label: "Account Settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">My Profile</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage your personal health information and preferences</p>
        </div>
        {tab === "personal" && (
          <button onClick={() => setEditing(!editing)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${editing ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"}`}>
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30">AO</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{profile.firstName} {profile.lastName}</h2>
            <p className="text-white/70 text-sm">{profile.email} · {profile.phone}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">Blood: {profile.bloodType}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">Genotype: {profile.genotype}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-400 text-green-900">Verified Patient</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/50 uppercase">Member Since</div>
            <div className="text-sm font-medium text-white">Jan 2024</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setEditing(false); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {tab === "personal" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <h3 className="font-semibold text-on-surface flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              Basic Information
            </h3>
            {[
              { label: "First Name", field: "firstName" },
              { label: "Last Name", field: "lastName" },
              { label: "Date of Birth", field: "dob" },
              { label: "Gender", field: "gender" },
              { label: "Marital Status", field: "maritalStatus" },
            ].map(item => (
              <div key={item.field}>
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">{item.label}</label>
                {editing ? (
                  <input type={item.field === "dob" ? "date" : "text"} value={profile[item.field as keyof typeof profile]} onChange={e => setProfile(prev => ({ ...prev, [item.field]: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                ) : (
                  <div className="text-sm font-medium text-on-surface">{item.field === "dob" ? new Date(profile.dob).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }) : profile[item.field as keyof typeof profile]}</div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
              <h3 className="font-semibold text-on-surface flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                Health Vitals
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Blood Type", value: profile.bloodType },
                  { label: "Genotype", value: profile.genotype },
                  { label: "Height", value: profile.height },
                  { label: "Weight", value: profile.weight },
                ].map(item => (
                  <div key={item.label} className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">{item.label}</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-4">
              <h3 className="font-semibold text-on-surface flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                Medical History
              </h3>
              <div>
                <div className="text-xs font-medium text-on-surface-variant uppercase mb-2">Known Conditions</div>
                <div className="flex flex-wrap gap-1.5">
                  {conditions.map(c => <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{c}</span>)}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-on-surface-variant uppercase mb-2">Allergies</div>
                <div className="flex flex-wrap gap-1.5">
                  {allergies.map(a => <span key={a} className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">{a}</span>)}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-on-surface-variant uppercase mb-2">Past Surgeries</div>
                <div className="flex flex-wrap gap-1.5">
                  {surgeries.map(s => <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">{s}</span>)}
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-4">
              <h3 className="font-semibold text-on-surface flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                Address
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <input type="text" value={profile.address} onChange={e => setProfile(prev => ({ ...prev, address: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={profile.city} onChange={e => setProfile(prev => ({ ...prev, city: e.target.value }))} className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    <input type="text" value={profile.state} onChange={e => setProfile(prev => ({ ...prev, state: e.target.value }))} className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-on-surface">{profile.address}</div>
                  <div className="text-sm text-on-surface-variant">{profile.city}, {profile.state}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      {tab === "emergency" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <span className="text-sm font-medium text-red-700">These contacts will be notified in case of a medical emergency via the Emergency SOS feature.</span>
            </div>
          </div>

          {emergencyContacts.map((c, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">{c.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface">{c.name}</h3>
                      {c.primary && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">Primary</span>}
                    </div>
                    <p className="text-sm text-on-surface-variant">{c.relationship}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg> {c.phone}</span>
                      <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg> {c.email}</span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-all">Edit</button>
              </div>
            </div>
          ))}

          <button className="w-full py-3 rounded-2xl border-2 border-dashed border-outline-variant text-sm font-medium text-on-surface-variant hover:border-primary hover:text-primary transition-all">+ Add Emergency Contact</button>
        </div>
      )}

      {/* Insurance */}
      {tab === "insurance" && (
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <div className="bg-gradient-to-r from-secondary to-green-700 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60 uppercase font-medium">Insurance Provider</div>
                  <h3 className="text-white font-bold text-lg mt-1">{insurance.provider}</h3>
                  <p className="text-white/70 text-sm">{insurance.planName}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-400 text-green-900">{insurance.status}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Policy Number", value: insurance.policyNumber },
                  { label: "Group Number", value: insurance.groupNumber },
                  { label: "Member ID", value: insurance.memberId },
                  { label: "Effective Date", value: insurance.effectiveDate },
                  { label: "Expiry Date", value: insurance.expiryDate },
                  { label: "Coverage Type", value: insurance.coverageType },
                  { label: "Copay", value: insurance.copay },
                  { label: "Annual Deductible", value: insurance.deductible },
                  { label: "Max Coverage", value: insurance.maxCoverage },
                ].map(item => (
                  <div key={item.label} className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">{item.label}</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="text-xs text-green-700">Your insurance is active and verified. Coverage details are shared with your healthcare providers during appointments.</span>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings */}
      {tab === "settings" && (
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <h3 className="font-semibold text-on-surface">Notification Preferences</h3>
            {[
              { label: "Appointment Reminders", desc: "Get notified 24 hours and 1 hour before appointments", enabled: true },
              { label: "Medication Reminders", desc: "Daily reminders to take your prescribed medications", enabled: true },
              { label: "Lab Results", desc: "Instant notification when lab results are available", enabled: true },
              { label: "Health Tips & Articles", desc: "Weekly personalized health education content", enabled: false },
              { label: "Promotional Offers", desc: "Discounts on marketplace products and services", enabled: false },
            ].map(n => (
              <div key={n.label} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-on-surface">{n.label}</div>
                  <div className="text-xs text-on-surface-variant">{n.desc}</div>
                </div>
                <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-all ${n.enabled ? "bg-primary" : "bg-surface-container"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${n.enabled ? "right-0.5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <h3 className="font-semibold text-on-surface">Privacy & Security</h3>
            <div className="space-y-4">
              {[
                { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", action: "Enable" },
                { label: "Download My Data", desc: "Export all your health records in PDF format", action: "Download" },
                { label: "Data Sharing Permissions", desc: "Control which providers can access your records", action: "Manage" },
                { label: "Change Password", desc: "Update your account password", action: "Change" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-medium text-on-surface">{item.label}</div>
                    <div className="text-xs text-on-surface-variant">{item.desc}</div>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-primary border border-primary/30 hover:bg-primary/5 transition-all">{item.action}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <h3 className="font-semibold text-on-surface">Language & Display</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant uppercase mb-1.5">Language</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>English</option>
                  <option>Yoruba</option>
                  <option>Igbo</option>
                  <option>Hausa</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant uppercase mb-1.5">Time Zone</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>WAT (UTC+1) — West Africa Time</option>
                  <option>GMT (UTC+0)</option>
                  <option>EAT (UTC+3) — East Africa Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
            <p className="text-xs text-red-600 mt-1">These actions are irreversible. Please proceed with caution.</p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-xl text-xs font-medium text-red-700 border border-red-300 hover:bg-red-100 transition-all">Deactivate Account</button>
              <button className="px-4 py-2 rounded-xl text-xs font-medium text-red-700 border border-red-300 hover:bg-red-100 transition-all">Delete All Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
