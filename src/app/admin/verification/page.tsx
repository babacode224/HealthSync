"use client";

import { useState } from "react";

type VerifStatus = "pending" | "under_review" | "approved" | "rejected";
type ProviderType = "doctor" | "pharmacist" | "lab";

type Provider = {
  id: string; name: string; avatar: string; avatarBg: string; type: ProviderType;
  specialty: string; license: string; submittedAt: string; status: VerifStatus;
  institution: string; experience: string; documents: string[];
  location: string; phone: string; email: string;
};

const providers: Provider[] = [
  { id: "VRF-001", name: "Dr. Amaka Nwosu", avatar: "AN", avatarBg: "bg-primary", type: "doctor", specialty: "Cardiology", license: "MDCN-48291", submittedAt: "Jun 20, 2026", status: "pending", institution: "Lagos University Teaching Hospital", experience: "12 years", documents: ["Medical Degree (MBBS)", "MDCN License", "Specialist Certificate", "ID Card"], location: "Lagos", phone: "+234 801 234 5678", email: "amaka.n@hospital.ng" },
  { id: "VRF-002", name: "Dr. Chukwuma Obi", avatar: "CO", avatarBg: "bg-secondary", type: "doctor", specialty: "Pediatrics", license: "MDCN-55102", submittedAt: "Jun 19, 2026", status: "pending", institution: "National Hospital Abuja", experience: "8 years", documents: ["Medical Degree (MBBS)", "MDCN License", "Residency Certificate"], location: "Abuja", phone: "+234 802 345 6789", email: "chukwuma.o@national.ng" },
  { id: "VRF-003", name: "Pharm. Ngozi Ibe", avatar: "NI", avatarBg: "bg-tertiary", type: "pharmacist", specialty: "Clinical Pharmacy", license: "PCN-32847", submittedAt: "Jun 18, 2026", status: "under_review", institution: "MedPlus Pharmacy", experience: "6 years", documents: ["B.Pharm Degree", "PCN License", "Business Registration"], location: "Lagos", phone: "+234 803 456 7890", email: "ngozi.i@medplus.ng" },
  { id: "VRF-004", name: "Dr. Ibrahim Musa", avatar: "IM", avatarBg: "bg-primary", type: "doctor", specialty: "General Practice", license: "MDCN-41903", submittedAt: "Jun 15, 2026", status: "approved", institution: "Kano State Hospital", experience: "15 years", documents: ["Medical Degree (MBBS)", "MDCN License", "Fellowship Certificate", "ID Card"], location: "Kano", phone: "+234 804 567 8901", email: "ibrahim.m@kanohospital.ng" },
  { id: "VRF-005", name: "Lab. Folake Adeyemo", avatar: "FA", avatarBg: "bg-secondary", type: "lab", specialty: "Clinical Pathology", license: "MLSCN-28451", submittedAt: "Jun 14, 2026", status: "approved", institution: "DiagnostiCare Labs", experience: "10 years", documents: ["BMLS Degree", "MLSCN License", "Lab Accreditation"], location: "Ibadan", phone: "+234 805 678 9012", email: "folake.a@diagcare.ng" },
  { id: "VRF-006", name: "Dr. Oluwaseun Bami", avatar: "OB", avatarBg: "bg-tertiary", type: "doctor", specialty: "Dermatology", license: "MDCN-61204", submittedAt: "Jun 10, 2026", status: "rejected", institution: "Private Practice", experience: "3 years", documents: ["Medical Degree (MBBS)", "Expired MDCN License"], location: "Lagos", phone: "+234 806 789 0123", email: "seun.b@gmail.com" },
];

type Filter = "all" | VerifStatus;

export default function AdminVerificationPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Provider | null>(null);

  const filtered = filter === "all" ? providers : providers.filter((p) => p.status === filter);

  const statusStyle = (s: VerifStatus) => ({ pending: "bg-tertiary-fixed/30 text-tertiary", under_review: "bg-primary-fixed text-primary", approved: "bg-secondary-container/50 text-secondary", rejected: "bg-error-container/50 text-error" }[s]);
  const statusLabel = (s: VerifStatus) => ({ pending: "Pending", under_review: "Under Review", approved: "Approved", rejected: "Rejected" }[s]);
  const typeLabel = (t: ProviderType) => ({ doctor: "Doctor", pharmacist: "Pharmacist", lab: "Lab Technician" }[t]);
  const typeStyle = (t: ProviderType) => ({ doctor: "bg-secondary-container/50 text-secondary", pharmacist: "bg-tertiary-fixed/30 text-tertiary", lab: "bg-surface-container-high text-on-surface-variant" }[t]);

  const counts = { all: providers.length, pending: providers.filter((p) => p.status === "pending").length, under_review: providers.filter((p) => p.status === "under_review").length, approved: providers.filter((p) => p.status === "approved").length, rejected: providers.filter((p) => p.status === "rejected").length };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Provider Verification</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Review and verify healthcare provider credentials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {([["all", "Total Applications"], ["pending", "Pending Review"], ["under_review", "Under Review"], ["approved", "Approved"], ["rejected", "Rejected"]] as [Filter, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key === filter ? "all" : key)} className={`text-left bg-surface-container-lowest border rounded-xl p-3 hover:shadow-sm transition-all ${key === filter ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
            <div className="text-xl font-bold text-on-surface">{counts[key]}</div>
            <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">{label}</div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Applications list */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.map((provider) => (
            <button key={provider.id} onClick={() => setSelected(provider)} className={`w-full text-left bg-surface-container-lowest border rounded-xl p-4 hover:shadow-sm transition-all ${selected?.id === provider.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${provider.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{provider.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-on-surface">{provider.name}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${typeStyle(provider.type)}`}>{typeLabel(provider.type)}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle(provider.status)}`}>{statusLabel(provider.status)}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{provider.specialty} • {provider.institution}</div>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-outline">
                    <span>{provider.id}</span>
                    <span>•</span>
                    <span>License: {provider.license}</span>
                    <span>•</span>
                    <span>Submitted {provider.submittedAt}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-20">
              <div className="bg-primary p-5 text-on-primary text-center">
                <div className={`w-16 h-16 rounded-full ${selected.avatarBg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-2 ring-4 ring-white/30`}>{selected.avatar}</div>
                <div className="text-lg font-bold">{selected.name}</div>
                <div className="text-xs opacity-80">{selected.specialty}</div>
                <div className="flex gap-2 justify-center mt-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{typeLabel(selected.type)}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{statusLabel(selected.status)}</span>
                </div>
              </div>

              <div className="p-4 space-y-3 text-sm border-b border-outline-variant">
                <div className="flex justify-between"><span className="text-on-surface-variant">License No.</span><span className="font-mono font-medium text-on-surface">{selected.license}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Institution</span><span className="font-medium text-on-surface text-right max-w-[60%]">{selected.institution}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Experience</span><span className="font-medium text-on-surface">{selected.experience}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Location</span><span className="font-medium text-on-surface">{selected.location}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Phone</span><span className="font-medium text-on-surface">{selected.phone}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Email</span><span className="font-medium text-on-surface text-right truncate max-w-[60%]">{selected.email}</span></div>
              </div>

              {/* Documents */}
              <div className="p-4 border-b border-outline-variant">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Submitted Documents</h4>
                <div className="space-y-1.5">
                  {selected.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                        <span className="text-xs text-on-surface">{doc}</span>
                      </div>
                      <button className="text-[10px] font-bold text-primary hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Verification */}
              {selected.status !== "rejected" && (
                <div className="px-4 py-3 border-b border-outline-variant">
                  <div className="flex items-center gap-2 p-2.5 bg-primary-fixed/30 rounded-lg">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                    <span className="text-[10px] text-primary font-medium">AI Verification: License number {selected.license} verified against MDCN/PCN/MLSCN registry</span>
                  </div>
                </div>
              )}

              {selected.status === "rejected" && (
                <div className="px-4 py-3 border-b border-outline-variant">
                  <div className="flex items-center gap-2 p-2.5 bg-error-container/20 rounded-lg">
                    <svg className="w-4 h-4 text-error shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                    <span className="text-[10px] text-error font-medium">Rejection reason: Expired MDCN license. Provider must renew before reapplying.</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 space-y-2">
                {(selected.status === "pending" || selected.status === "under_review") && (
                  <>
                    <button className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      Approve Provider
                    </button>
                    <button className="w-full py-2 rounded-lg border border-error text-error text-xs font-bold hover:bg-error hover:text-on-error transition-all">Reject Application</button>
                    {selected.status === "pending" && <button className="w-full py-2 rounded-lg border border-outline-variant text-xs font-semibold text-primary hover:border-primary transition-all">Move to Review</button>}
                  </>
                )}
                {selected.status === "approved" && (
                  <div className="flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    <span className="text-xs text-secondary font-semibold">Provider verified and active on platform</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              </div>
              <p className="text-sm font-semibold text-on-surface">Select an Application</p>
              <p className="text-xs text-on-surface-variant mt-1">Click any provider to review their credentials</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
