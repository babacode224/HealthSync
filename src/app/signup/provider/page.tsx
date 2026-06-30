"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { number: 1, label: "Identity Verification", sublabel: "KYC & Documents" },
  { number: 2, label: "Medical License", sublabel: "Professional Credentials" },
  { number: 3, label: "Clinical Specialty", sublabel: "Area of Practice" },
  { number: 4, label: "Practice Details", sublabel: "Location & Availability" },
];

const specialties = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
];

export default function ProviderSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idType: "",
    licenseNumber: "",
    licenseAuthority: "",
    licenseExpiry: "",
    specialty: "",
    subSpecialty: "",
    yearsExperience: "",
    practiceName: "",
    practiceAddress: "",
    city: "",
    state: "",
    consultationFee: "",
    availableDays: [] as string[],
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    const current = formData.availableDays;
    updateField(
      "availableDays",
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day]
    );
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) nextStep();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="py-3 px-6 flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary" fill="currentColor">
              <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" />
            </svg>
            <span className="text-xl font-bold text-primary tracking-tight">HealthSync</span>
          </Link>
          <span className="text-on-surface-variant text-sm hidden sm:inline">|</span>
          <span className="text-sm font-medium text-on-surface-variant hidden sm:inline">Provider Enrollment</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors hidden sm:flex items-center gap-1"
          >
            Save & Exit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 border-r border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-on-surface">Onboarding</h2>
            <p className="text-xs text-on-surface-variant">
              Step {currentStep} of {steps.length}
            </p>
          </div>

          <nav className="space-y-1 flex-1">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left ${
                  step.number === currentStep
                    ? "bg-primary text-on-primary"
                    : step.number < currentStep
                      ? "text-primary hover:bg-surface-container-low cursor-pointer"
                      : "text-on-surface-variant cursor-default"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    step.number === currentStep
                      ? "bg-on-primary text-primary"
                      : step.number < currentStep
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {step.number < currentStep ? (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{step.label}</div>
                  <div
                    className={`text-xs ${
                      step.number === currentStep ? "text-on-primary/70" : "text-on-surface-variant"
                    }`}
                  >
                    {step.sublabel}
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Security badge */}
          <div className="mt-auto bg-primary rounded-xl p-5 text-on-primary">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <h3 className="font-bold text-sm">Encrypted & Secure</h3>
            </div>
            <p className="text-xs text-on-primary/80 leading-relaxed">
              Your data is protected by HIPAA-compliant end-to-end encryption protocols.
            </p>
          </div>
        </aside>

        {/* Form area */}
        <div className="flex-1 p-6 md:p-10 overflow-auto">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">Verify your identity</h3>
                  <p className="text-sm text-on-surface-variant">
                    To ensure clinical safety, we verify the identity of every provider on HealthSync.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-surface-container-low rounded-2xl p-6 text-center border border-outline-variant hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-on-surface mb-1">Capture ID</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Use your webcam or mobile device to take a photo of your government ID.
                    </p>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-6 text-center border border-outline-variant hover:border-secondary hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-on-surface mb-1">Liveness Check</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      A brief 3D face scan to match your face with your identification documents.
                    </p>
                  </div>
                </div>

                <div className="space-y-5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Dr. Adebayo Richardson"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="dr.richardson@clinic.com"
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                      ID Document Type
                    </label>
                    <select
                      value={formData.idType}
                      onChange={(e) => updateField("idType", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm appearance-none"
                    >
                      <option value="">Select document type</option>
                      <option value="national_id">National ID Card</option>
                      <option value="passport">International Passport</option>
                      <option value="drivers_license">Driver&apos;s License</option>
                      <option value="voters_card">Voter&apos;s Card</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical License */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">Medical License</h3>
                  <p className="text-sm text-on-surface-variant">
                    Provide your professional license details for verification by our compliance team.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Medical License Number
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => updateField("licenseNumber", e.target.value)}
                    placeholder="e.g. MDCN/RN/12345"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Issuing Authority
                  </label>
                  <select
                    value={formData.licenseAuthority}
                    onChange={(e) => updateField("licenseAuthority", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm appearance-none"
                  >
                    <option value="">Select issuing body</option>
                    <option value="mdcn">Medical and Dental Council of Nigeria (MDCN)</option>
                    <option value="nmcn">Nursing and Midwifery Council of Nigeria</option>
                    <option value="pcn">Pharmacists Council of Nigeria</option>
                    <option value="mlscn">Medical Laboratory Science Council</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    License Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => updateField("licenseExpiry", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div className="flex items-start gap-3 bg-tertiary-fixed/30 border border-tertiary-fixed-dim/20 rounded-lg p-4">
                  <svg className="w-5 h-5 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Your license will be verified against the MDCN registry. This typically takes 1-2 business days.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Specialty */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">Clinical Specialty</h3>
                  <p className="text-sm text-on-surface-variant">
                    Select your primary specialty so patients can find you through our AI matching engine.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-3">
                    Primary Specialty
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {specialties.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => updateField("specialty", spec)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all text-left ${
                          formData.specialty === spec
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Sub-Specialty (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subSpecialty}
                    onChange={(e) => updateField("subSpecialty", e.target.value)}
                    placeholder="e.g. Interventional Cardiology"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={formData.yearsExperience}
                    onChange={(e) => updateField("yearsExperience", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm appearance-none"
                  >
                    <option value="">Select range</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-20">11-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Practice Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">Practice Details</h3>
                  <p className="text-sm text-on-surface-variant">
                    Tell us about your practice so patients in your area can find you.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Practice / Hospital Name
                  </label>
                  <input
                    type="text"
                    value={formData.practiceName}
                    onChange={(e) => updateField("practiceName", e.target.value)}
                    placeholder="e.g. St. Mary's Medical Center"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Practice Address
                  </label>
                  <input
                    type="text"
                    value={formData.practiceAddress}
                    onChange={(e) => updateField("practiceAddress", e.target.value)}
                    placeholder="Street address"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="e.g. Lagos"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      placeholder="e.g. Lagos State"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                    Consultation Fee (NGN)
                  </label>
                  <input
                    type="text"
                    value={formData.consultationFee}
                    onChange={(e) => updateField("consultationFee", e.target.value)}
                    placeholder="e.g. 15,000"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-3">
                    Available Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          formData.availableDays.includes(day)
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-outline-variant">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors px-4 py-2 rounded-lg hover:bg-surface-container-low"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="bg-primary text-on-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 active:scale-[0.99] transition-all shadow-sm text-sm tracking-wide flex items-center gap-2"
              >
                {currentStep === 4 ? "Submit for Review" : "Continue"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 px-6 border-t border-outline-variant flex justify-between items-center text-xs text-on-surface-variant">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          System Status: Healthy
        </div>
        <p>&copy; {new Date().getFullYear()} HealthSync AI. All Rights Reserved. Clinical Portal v2.4.0</p>
      </footer>
    </div>
  );
}
