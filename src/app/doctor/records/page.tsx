"use client";

import { useState } from "react";

const patients = [
  { id: "PT-001", name: "Adewale Okafor", age: 42, gender: "Male", blood: "O+", phone: "+234 812 345 6789", email: "a.okafor@email.com", insurance: "NHIS Active", lastVisit: "Jun 27, 2026", nextAppt: "Jul 4, 2026", conditions: ["Hypertension", "Type 2 Diabetes"], allergies: ["Penicillin"], medications: [{ name: "Amlodipine 10mg", freq: "Once daily" }, { name: "Metformin 500mg", freq: "Twice daily" }, { name: "Aspirin 75mg", freq: "Once daily" }], vitalsHistory: [{ date: "Jun 27", bp: "160/95", hr: 112, temp: "37.2°C", spo2: "94%", weight: "88kg" }, { date: "Jun 15", bp: "145/90", hr: 82, temp: "36.8°C", spo2: "97%", weight: "88kg" }, { date: "May 28", bp: "138/85", hr: 78, temp: "36.9°C", spo2: "98%", weight: "89kg" }], visits: [{ date: "Jun 27, 2026", reason: "Chest pain — acute presentation", doctor: "Dr. Sarah Jenkins", notes: "ECG showed ST changes. Troponin elevated. Referred to cardiology.", outcome: "Admitted" }, { date: "Jun 15, 2026", reason: "Routine follow-up — HTN/DM", doctor: "Dr. Sarah Jenkins", notes: "BP slightly elevated. HbA1c 7.2%. Adjusted medication.", outcome: "Follow-up in 2 weeks" }, { date: "May 28, 2026", reason: "Annual physical exam", doctor: "Dr. Adebayo Bakare", notes: "Overall stable. Weight management discussed. Lab work ordered.", outcome: "Labs scheduled" }], labResults: [{ test: "Troponin I", value: "0.45 ng/mL", ref: "<0.04", flag: "high", date: "Jun 27" }, { test: "HbA1c", value: "7.2%", ref: "4.0-5.6%", flag: "high", date: "Jun 15" }, { test: "Fasting Glucose", value: "142 mg/dL", ref: "70-100", flag: "high", date: "Jun 15" }, { test: "Total Cholesterol", value: "238 mg/dL", ref: "<200", flag: "high", date: "May 28" }, { test: "Creatinine", value: "1.0 mg/dL", ref: "0.7-1.3", flag: "normal", date: "May 28" }, { test: "eGFR", value: "82 mL/min", ref: ">60", flag: "normal", date: "May 28" }] },
  { id: "PT-002", name: "Ngozi Eze", age: 35, gender: "Female", blood: "A+", phone: "+234 803 456 7890", email: "n.eze@email.com", insurance: "NHIS Active", lastVisit: "Jun 27, 2026", nextAppt: "Jul 1, 2026", conditions: [], allergies: [], medications: [], vitalsHistory: [{ date: "Jun 27", bp: "110/70", hr: 98, temp: "39.8°C", spo2: "97%", weight: "65kg" }], visits: [{ date: "Jun 27, 2026", reason: "High fever, joint pain", doctor: "Dr. Adebayo Bakare", notes: "RDT positive for P. falciparum. Started on ACT.", outcome: "Outpatient treatment" }], labResults: [{ test: "Malaria RDT", value: "Positive (P.f)", ref: "Negative", flag: "high", date: "Jun 27" }, { test: "CBC - WBC", value: "11.2 K/µL", ref: "4.5-11.0", flag: "high", date: "Jun 27" }, { test: "Hemoglobin", value: "11.8 g/dL", ref: "12.0-16.0", flag: "low", date: "Jun 27" }] },
  { id: "PT-003", name: "Chidi Okonkwo", age: 28, gender: "Male", blood: "B+", phone: "+234 705 567 8901", email: "c.okonkwo@email.com", insurance: "Self-pay", lastVisit: "Jun 27, 2026", nextAppt: "Jun 30, 2026", conditions: ["Previous pneumonia"], allergies: [], medications: [], vitalsHistory: [{ date: "Jun 27", bp: "120/75", hr: 82, temp: "37.6°C", spo2: "96%", weight: "72kg" }], visits: [{ date: "Jun 27, 2026", reason: "Persistent cough, night sweats, weight loss", doctor: "Dr. Sarah Jenkins", notes: "TB screening ordered. Sputum collected. Isolation pending results.", outcome: "Awaiting results" }], labResults: [{ test: "Sputum AFB Smear", value: "Pending", ref: "Negative", flag: "pending", date: "Jun 27" }, { test: "Chest X-ray", value: "Upper lobe opacity", ref: "Normal", flag: "high", date: "Jun 27" }] },
  { id: "PT-004", name: "Fatima Bello", age: 55, gender: "Female", blood: "AB+", phone: "+234 816 678 9012", email: "f.bello@email.com", insurance: "Private - AXA Mansard", lastVisit: "Jun 27, 2026", nextAppt: "Jul 8, 2026", conditions: ["Obesity", "Gallstones"], allergies: ["Sulfonamides"], medications: [{ name: "Omeprazole 40mg", freq: "Once daily" }], vitalsHistory: [{ date: "Jun 27", bp: "135/85", hr: 76, temp: "37.0°C", spo2: "98%", weight: "95kg" }], visits: [{ date: "Jun 27, 2026", reason: "RUQ abdominal pain, nausea", doctor: "Dr. Sarah Jenkins", notes: "Biliary colic suspected. US ordered. Conservative management started.", outcome: "Outpatient + imaging" }], labResults: [{ test: "ALT", value: "52 U/L", ref: "7-56", flag: "normal", date: "Jun 27" }, { test: "ALP", value: "128 U/L", ref: "44-147", flag: "normal", date: "Jun 27" }, { test: "Bilirubin (Total)", value: "1.8 mg/dL", ref: "0.1-1.2", flag: "high", date: "Jun 27" }] },
  { id: "PT-005", name: "Aisha Mohammed", age: 62, gender: "Female", blood: "O-", phone: "+234 809 789 0123", email: "a.mohammed@email.com", insurance: "NHIS Active", lastVisit: "Jun 27, 2026", nextAppt: "Jun 29, 2026", conditions: ["Hypertension", "Hyperlipidemia"], allergies: ["ACE Inhibitors"], medications: [{ name: "Lisinopril 20mg", freq: "Once daily" }, { name: "Atorvastatin 40mg", freq: "Once daily" }], vitalsHistory: [{ date: "Jun 27", bp: "180/110", hr: 68, temp: "36.8°C", spo2: "97%", weight: "78kg" }, { date: "Jun 10", bp: "155/95", hr: 72, temp: "36.9°C", spo2: "98%", weight: "78kg" }], visits: [{ date: "Jun 27, 2026", reason: "Dizziness, blurred vision, unsteady gait", doctor: "Dr. Sarah Jenkins", notes: "BP 180/110. Neurological symptoms concerning for stroke. CT head ordered urgently.", outcome: "Admitted — observation" }], labResults: [{ test: "CT Head", value: "No acute intracranial pathology", ref: "Normal", flag: "normal", date: "Jun 27" }, { test: "Lipid Panel - LDL", value: "158 mg/dL", ref: "<100", flag: "high", date: "Jun 10" }] },
];

type Tab = "overview" | "visits" | "labs" | "medications";

export default function DoctorRecordsPage() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [recordTab, setRecordTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  const patient = selectedPatient ? patients.find(p => p.id === selectedPatient) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Patient Records</h1>
          <p className="text-on-surface-variant text-sm mt-1">Comprehensive medical records with AI-powered insights</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ New Patient</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Patient List */}
        <div className={`${patient ? "w-1/3" : "w-full"} space-y-4 transition-all`}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input type="text" placeholder="Search patients by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
          </div>

          <div className="space-y-2">
            {filteredPatients.map(p => (
              <button key={p.id} onClick={() => { setSelectedPatient(p.id); setRecordTab("overview"); }} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedPatient === p.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{p.name.split(" ").map(n => n[0]).join("")}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-on-surface text-sm truncate">{p.name}</h3>
                      <span className="text-[10px] font-mono text-on-surface-variant">{p.id}</span>
                    </div>
                    <div className="text-xs text-on-surface-variant">{p.age}y · {p.gender} · {p.blood}</div>
                    {p.conditions.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {p.conditions.map(c => (
                          <span key={c} className="px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary font-medium">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-on-surface-variant">Last visit</div>
                    <div className="text-xs font-medium text-on-surface">{p.lastVisit.split(", ")[0].replace("2026", "")}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Detail */}
        {patient && (
          <div className="w-2/3 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            {/* Header */}
            <div className="bg-primary p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">{patient.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{patient.name}</h3>
                    <p className="text-on-primary/70 text-sm">{patient.age}y · {patient.gender} · Blood Type: {patient.blood}</p>
                    <p className="text-on-primary/70 text-xs mt-0.5">{patient.id} · {patient.insurance}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPatient(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
              </div>
            </div>

            {/* Record Tabs */}
            <div className="flex gap-1 px-5 pt-4 border-b border-outline-variant">
              {([
                { key: "overview", label: "Overview" },
                { key: "visits", label: "Visits" },
                { key: "labs", label: "Lab Results" },
                { key: "medications", label: "Medications" },
              ] as { key: Tab; label: string }[]).map(t => (
                <button key={t.key} onClick={() => setRecordTab(t.key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${recordTab === t.key ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-5 max-h-[calc(100vh-320px)] overflow-y-auto space-y-4">
              {/* Overview */}
              {recordTab === "overview" && (
                <>
                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-container-low rounded-xl p-3">
                      <div className="text-[10px] text-on-surface-variant uppercase">Next Appointment</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5">{patient.nextAppt}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3">
                      <div className="text-[10px] text-on-surface-variant uppercase">Allergies</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5">{patient.allergies.length > 0 ? patient.allergies.join(", ") : "NKDA"}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3">
                      <div className="text-[10px] text-on-surface-variant uppercase">Active Conditions</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5">{patient.conditions.length > 0 ? patient.conditions.length : "None"}</div>
                    </div>
                  </div>

                  {/* Conditions */}
                  {patient.conditions.length > 0 && (
                    <div className="bg-surface-container-low rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-on-surface mb-2">Active Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map(c => (
                          <span key={c} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Latest Vitals */}
                  {patient.vitalsHistory.length > 0 && (
                    <div className="bg-surface-container-low rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-on-surface mb-3">Latest Vitals ({patient.vitalsHistory[0].date})</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Blood Pressure", value: patient.vitalsHistory[0].bp, warn: parseInt(patient.vitalsHistory[0].bp.split("/")[0]) > 140 },
                          { label: "Heart Rate", value: `${patient.vitalsHistory[0].hr} bpm`, warn: patient.vitalsHistory[0].hr > 100 },
                          { label: "Temperature", value: patient.vitalsHistory[0].temp, warn: parseFloat(patient.vitalsHistory[0].temp) > 38 },
                          { label: "SpO₂", value: patient.vitalsHistory[0].spo2, warn: parseInt(patient.vitalsHistory[0].spo2) < 95 },
                          { label: "Weight", value: patient.vitalsHistory[0].weight, warn: false },
                        ].map(v => (
                          <div key={v.label} className={`rounded-lg p-2.5 ${v.warn ? "bg-red-50 border border-red-200" : "bg-surface-container-lowest border border-outline-variant"}`}>
                            <div className="text-[10px] text-on-surface-variant">{v.label}</div>
                            <div className={`text-sm font-bold ${v.warn ? "text-red-600" : "text-on-surface"}`}>{v.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Lab Flags */}
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Flagged Lab Results</h4>
                    <div className="space-y-2">
                      {patient.labResults.filter(l => l.flag !== "normal").slice(0, 4).map(l => (
                        <div key={l.test} className={`flex items-center justify-between py-2 px-3 rounded-lg ${l.flag === "high" ? "bg-red-50" : l.flag === "low" ? "bg-amber-50" : "bg-blue-50"}`}>
                          <div>
                            <span className="text-sm font-medium text-on-surface">{l.test}</span>
                            <span className="text-xs text-on-surface-variant ml-2">Ref: {l.ref}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${l.flag === "high" ? "text-red-600" : l.flag === "low" ? "text-amber-600" : "text-blue-600"}`}>{l.value}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${l.flag === "high" ? "bg-red-200 text-red-800" : l.flag === "low" ? "bg-amber-200 text-amber-800" : "bg-blue-200 text-blue-800"}`}>{l.flag === "pending" ? "PENDING" : l.flag.toUpperCase()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Write Prescription</button>
                    <button className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Order Lab Tests</button>
                    <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Create Referral</button>
                    <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Schedule Visit</button>
                  </div>
                </>
              )}

              {/* Visits Tab */}
              {recordTab === "visits" && (
                <div className="space-y-3">
                  {patient.visits.map((v, i) => (
                    <div key={i} className="bg-surface-container-low rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-on-surface">{v.date}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{v.outcome}</span>
                        </div>
                        <span className="text-xs text-on-surface-variant">{v.doctor}</span>
                      </div>
                      <div className="text-sm font-medium text-on-surface">{v.reason}</div>
                      <p className="text-xs text-on-surface-variant mt-1">{v.notes}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Labs Tab */}
              {recordTab === "labs" && (
                <div className="bg-surface-container-low rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="bg-surface-container text-xs text-on-surface-variant"><th className="text-left px-4 py-2.5 font-medium">Test</th><th className="text-left px-4 py-2.5 font-medium">Result</th><th className="text-left px-4 py-2.5 font-medium">Reference</th><th className="text-left px-4 py-2.5 font-medium">Status</th><th className="text-left px-4 py-2.5 font-medium">Date</th></tr></thead>
                    <tbody>
                      {patient.labResults.map(l => (
                        <tr key={l.test} className="border-t border-outline-variant">
                          <td className="px-4 py-2.5 text-sm font-medium text-on-surface">{l.test}</td>
                          <td className={`px-4 py-2.5 text-sm font-bold ${l.flag === "high" ? "text-red-600" : l.flag === "low" ? "text-amber-600" : l.flag === "pending" ? "text-blue-600" : "text-green-600"}`}>{l.value}</td>
                          <td className="px-4 py-2.5 text-xs text-on-surface-variant">{l.ref}</td>
                          <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${l.flag === "high" ? "bg-red-100 text-red-700" : l.flag === "low" ? "bg-amber-100 text-amber-700" : l.flag === "pending" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{l.flag === "pending" ? "Pending" : l.flag === "normal" ? "Normal" : l.flag.charAt(0).toUpperCase() + l.flag.slice(1)}</span></td>
                          <td className="px-4 py-2.5 text-xs text-on-surface-variant">{l.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Medications Tab */}
              {recordTab === "medications" && (
                <div className="space-y-3">
                  {patient.medications.length > 0 ? patient.medications.map(m => (
                    <div key={m.name} className="flex items-center justify-between bg-surface-container-low rounded-xl p-4 border border-outline-variant">
                      <div>
                        <div className="text-sm font-medium text-on-surface">{m.name}</div>
                        <div className="text-xs text-on-surface-variant">{m.freq}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Active</span>
                    </div>
                  )) : (
                    <div className="bg-surface-container-low rounded-xl p-8 text-center">
                      <p className="text-sm text-on-surface-variant">No active medications</p>
                    </div>
                  )}
                  {patient.medications.length > 0 && (
                    <button className="w-full px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Prescription</button>
                  )}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-outline-variant text-[10px] text-on-surface-variant text-center">HIPAA-compliant medical records. Access logged for audit compliance.</div>
          </div>
        )}
      </div>
    </div>
  );
}
