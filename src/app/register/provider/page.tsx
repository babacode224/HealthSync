"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { number: 1, label: "Provider Type", sublabel: "Choose Your Role" },
  { number: 2, label: "Personal Info", sublabel: "Name & Contact" },
  { number: 3, label: "Credentials", sublabel: "License & Practice" },
  { number: 4, label: "Verification", sublabel: "Confirm & Submit" },
];

const providerTypes = [
  { key: "doctor", label: "Doctor / Physician", icon: "👨‍⚕️", desc: "General practitioners, specialists, surgeons", license: "MDCN License", examples: "GP, Cardiologist, Pediatrician, Surgeon" },
  { key: "pharmacist", label: "Pharmacist", icon: "💊", desc: "Community pharmacies, hospital pharmacists", license: "PCN License", examples: "Community Pharmacy, Hospital Pharmacy, Clinical Pharmacist" },
  { key: "lab", label: "Lab Technologist", icon: "🔬", desc: "Medical laboratory scientists, pathologists", license: "MLSCN License", examples: "Medical Lab Scientist, Pathologist, Histotechnologist" },
  { key: "nurse", label: "Nurse / Midwife", icon: "🏥", desc: "Registered nurses, nurse practitioners, midwives", license: "NMCN License", examples: "RN, Nurse Practitioner, Certified Midwife" },
];

const specialties = [
  "General Practice", "Internal Medicine", "Pediatrics", "Obstetrics & Gynecology", "Surgery", "Cardiology",
  "Dermatology", "Neurology", "Ophthalmology", "Orthopedics", "Psychiatry", "Radiology",
  "Anesthesiology", "Emergency Medicine", "Family Medicine", "Endocrinology",
];

export default function ProviderRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    providerType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    licenseExpiry: "",
    specialty: "",
    yearsExperience: "",
    practiceName: "",
    practiceAddress: "",
    city: "",
    state: "",
    bio: "",
    agreeTerms: false,
    agreeHipaa: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedProvider = providerTypes.find(p => p.key === formData.providerType);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.providerType;
      case 2: return formData.firstName && formData.lastName && formData.email && formData.phone && formData.password && formData.password === formData.confirmPassword;
      case 3: return formData.licenseNumber && formData.specialty && formData.practiceName && formData.city && formData.state;
      case 4: return formData.agreeTerms && formData.agreeHipaa;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="py-5 px-6 border-b border-outline-variant">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" /></svg>
            <div>
              <div className="text-lg font-bold text-primary tracking-tight">HealthSync AI</div>
              <div className="text-[9px] font-medium text-on-surface-variant tracking-widest uppercase">Provider Registration</div>
            </div>
          </Link>
          <Link href="/login" className="text-sm text-primary font-medium hover:underline">Already have an account? Sign in</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentStep > step.number ? "bg-secondary text-on-secondary" : currentStep === step.number ? "bg-primary text-on-primary shadow-md" : "bg-surface-container-low text-on-surface-variant border border-outline-variant"}`}>
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  ) : step.number}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-semibold ${currentStep >= step.number ? "text-on-surface" : "text-on-surface-variant"}`}>{step.label}</div>
                  <div className="text-[10px] text-on-surface-variant">{step.sublabel}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mt-[-20px] rounded ${currentStep > step.number ? "bg-secondary" : "bg-outline-variant"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Provider Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface">What type of provider are you?</h2>
              <p className="text-sm text-on-surface-variant mt-1">Select your healthcare role to get started with the right portal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providerTypes.map(p => (
                <button key={p.key} onClick={() => updateField("providerType", p.key)} className={`text-left p-5 rounded-2xl border-2 transition-all hover:shadow-md ${formData.providerType === p.key ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-outline-variant bg-surface-container-lowest"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <h3 className="font-semibold text-on-surface">{p.label}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">{p.desc}</p>
                      <div className="mt-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">{p.license} Required</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-1.5">{p.examples}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Personal Info */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Personal Information</h2>
              <p className="text-sm text-on-surface-variant mt-1">Your contact details for your {selectedProvider?.label} account.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">First Name</label>
                  <input type="text" value={formData.firstName} onChange={e => updateField("firstName", e.target.value)} placeholder="Adebayo" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={e => updateField("lastName", e.target.value)} placeholder="Okonkwo" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Email Address</label>
                <input type="email" value={formData.email} onChange={e => updateField("email", e.target.value)} placeholder="dr.okonkwo@clinic.com" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <div className="px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-sm text-on-surface-variant font-medium">+234</div>
                  <input type="tel" value={formData.phone} onChange={e => updateField("phone", e.target.value)} placeholder="801 234 5678" className="flex-1 px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">Password</label>
                  <input type="password" value={formData.password} onChange={e => updateField("password", e.target.value)} placeholder="Min. 8 characters" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">Confirm Password</label>
                  <input type="password" value={formData.confirmPassword} onChange={e => updateField("confirmPassword", e.target.value)} placeholder="Re-enter password" className={`w-full px-4 py-3 rounded-xl border bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-error" : "border-outline-variant"}`} required />
                </div>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-error">Passwords do not match</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Credentials */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Professional Credentials</h2>
              <p className="text-sm text-on-surface-variant mt-1">Your license and practice details for verification.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                  <span className="text-xs text-blue-700 font-medium">Your {selectedProvider?.license} will be verified by our admin team within 24-48 hours.</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">{selectedProvider?.license} Number</label>
                  <input type="text" value={formData.licenseNumber} onChange={e => updateField("licenseNumber", e.target.value)} placeholder="e.g. MDCN/2024/12345" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">License Expiry Date</label>
                  <input type="date" value={formData.licenseExpiry} onChange={e => updateField("licenseExpiry", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">Specialty</label>
                  <select value={formData.specialty} onChange={e => updateField("specialty", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option value="">Select specialty...</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">Years of Experience</label>
                  <select value={formData.yearsExperience} onChange={e => updateField("yearsExperience", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option value="">Select...</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-20">11-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Practice / Hospital Name</label>
                <input type="text" value={formData.practiceName} onChange={e => updateField("practiceName", e.target.value)} placeholder="e.g. Lagos University Teaching Hospital" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Practice Address</label>
                <input type="text" value={formData.practiceAddress} onChange={e => updateField("practiceAddress", e.target.value)} placeholder="Street address" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">City</label>
                  <input type="text" value={formData.city} onChange={e => updateField("city", e.target.value)} placeholder="Lagos" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">State</label>
                  <select value={formData.state} onChange={e => updateField("state", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option value="">Select state...</option>
                    {["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Professional Bio (Optional)</label>
                <textarea value={formData.bio} onChange={e => updateField("bio", e.target.value)} placeholder="Brief description of your practice and expertise..." rows={3} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verification */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Review & Submit</h2>
              <p className="text-sm text-on-surface-variant mt-1">Please review your information before submitting.</p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedProvider?.icon}</span>
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{formData.firstName} {formData.lastName}</h3>
                    <p className="text-on-primary/70 text-sm">{selectedProvider?.label} · {formData.specialty || "General"}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Email", value: formData.email },
                    { label: "Phone", value: `+234 ${formData.phone}` },
                    { label: "License", value: formData.licenseNumber },
                    { label: "Experience", value: formData.yearsExperience ? `${formData.yearsExperience} years` : "—" },
                    { label: "Practice", value: formData.practiceName },
                    { label: "Location", value: `${formData.city}, ${formData.state}` },
                  ].map(item => (
                    <div key={item.label} className="bg-surface-container-low rounded-xl p-3">
                      <div className="text-[10px] text-on-surface-variant uppercase">{item.label}</div>
                      <div className="text-sm font-medium text-on-surface mt-0.5 truncate">{item.value || "—"}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-amber-800 mb-2">Verification Process</h4>
                  <div className="space-y-2 text-xs text-amber-700">
                    <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[10px] font-bold">1</span> Submit your application</div>
                    <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[10px] font-bold">2</span> Admin verifies your {selectedProvider?.license} (24-48 hours)</div>
                    <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[10px] font-bold">3</span> Receive approval email with portal access</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <button type="button" onClick={() => updateField("agreeTerms", !formData.agreeTerms)} className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${formData.agreeTerms ? "bg-primary border-primary" : "border-outline-variant"}`}>
                      {formData.agreeTerms && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                    </button>
                    <span className="text-sm text-on-surface-variant">I agree to the HealthSync <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Provider Agreement</span></span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <button type="button" onClick={() => updateField("agreeHipaa", !formData.agreeHipaa)} className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${formData.agreeHipaa ? "bg-primary border-primary" : "border-outline-variant"}`}>
                      {formData.agreeHipaa && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                    </button>
                    <span className="text-sm text-on-surface-variant">I acknowledge my obligation to comply with <span className="text-primary font-medium">HIPAA</span> and <span className="text-primary font-medium">NDPR</span> data protection requirements</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-low border border-outline-variant transition-all">Back</button>
          ) : (
            <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-low border border-outline-variant transition-all">Cancel</Link>
          )}
          {currentStep < 4 ? (
            <button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!canProceed()} className="px-8 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
          ) : (
            <button disabled={!canProceed()} onClick={() => { window.location.href = "/login"; }} className="px-8 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed">Submit Application</button>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          <span className="text-[10px] text-on-surface-variant">All data encrypted · HIPAA compliant · NDPR certified · Admin-verified providers only</span>
        </div>
      </main>
    </div>
  );
}
