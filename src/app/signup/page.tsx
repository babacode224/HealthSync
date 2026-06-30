"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { number: 1, label: "Account Info", sublabel: "Basics & Identity" },
  { number: 2, label: "Insurance", sublabel: "Coverage Details" },
  { number: 3, label: "Health Profile", sublabel: "Medical Concerns" },
];

export default function PatientSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    biologicalSex: "",
    phone: "",
    email: "",
    password: "",
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    noInsurance: false,
    conditions: [] as string[],
    allergies: "",
    medications: "",
  });

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
    } else {
      // TODO: wire up registration
    }
  };

  const conditionOptions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Heart Disease",
    "Arthritis",
    "Depression/Anxiety",
    "None of the above",
  ];

  const toggleCondition = (condition: string) => {
    const current = formData.conditions;
    if (condition === "None of the above") {
      updateField("conditions", current.includes(condition) ? [] : [condition]);
      return;
    }
    const filtered = current.filter((c) => c !== "None of the above");
    updateField(
      "conditions",
      filtered.includes(condition)
        ? filtered.filter((c) => c !== condition)
        : [...filtered, condition]
    );
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary" fill="currentColor">
            <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" />
          </svg>
          <span className="text-xl font-bold text-primary tracking-tight">HealthSync</span>
        </Link>
        <div className="flex items-center gap-1 text-xs font-semibold text-on-surface-variant tracking-wide">
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          HIPAA COMPLIANT
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-surface-container">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl grid md:grid-cols-[280px_1fr] gap-10">
          {/* Left sidebar */}
          <aside className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-on-surface mb-2">
                Let&apos;s get started
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Welcome to HealthSync. Please complete these steps to initialize
                your secure medical profile.
              </p>
            </div>

            {/* Step indicator */}
            <nav className="space-y-1">
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      step.number === currentStep
                        ? "bg-on-primary text-primary"
                        : step.number < currentStep
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {step.number < currentStep ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                        step.number === currentStep
                          ? "text-on-primary/70"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {step.sublabel}
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Trust badges */}
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <div className="text-xs font-bold uppercase tracking-wide">End-to-End<br />Encryption</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <div className="text-xs font-bold uppercase tracking-wide">ISO 27001<br />Certified</div>
              </div>
            </div>
          </aside>

          {/* Right form area */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 shadow-sm">
                {/* Step 1: Account Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateField("dateOfBirth", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Biological Sex
                        </label>
                        <select
                          value={formData.biologicalSex}
                          onChange={(e) => updateField("biologicalSex", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm appearance-none"
                          required
                        >
                          <option value="">Select Option</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Prefer not to say</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                          required
                        />
                      </div>
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
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Info banner */}
                    <div className="flex items-start gap-3 bg-primary-fixed/30 border border-primary-fixed-dim/20 rounded-lg p-4">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Your legal name and date of birth are required to match
                        your medical records securely.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Insurance */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface mb-1">Insurance Details</h3>
                      <p className="text-sm text-on-surface-variant">Add your insurance information for seamless billing.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                        Insurance Provider
                      </label>
                      <select
                        value={formData.insuranceProvider}
                        onChange={(e) => updateField("insuranceProvider", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm appearance-none"
                      >
                        <option value="">Select your provider</option>
                        <option value="nhis">NHIS (National Health Insurance)</option>
                        <option value="hygeia">Hygeia HMO</option>
                        <option value="leadway">Leadway Health</option>
                        <option value="axamansard">AXA Mansard</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Policy Number
                        </label>
                        <input
                          type="text"
                          value={formData.policyNumber}
                          onChange={(e) => updateField("policyNumber", e.target.value)}
                          placeholder="e.g. POL-12345678"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                          Group Number
                        </label>
                        <input
                          type="text"
                          value={formData.groupNumber}
                          onChange={(e) => updateField("groupNumber", e.target.value)}
                          placeholder="e.g. GRP-0000"
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.noInsurance}
                        onChange={(e) => updateField("noInsurance", e.target.checked)}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-on-surface">
                        I don&apos;t have insurance — skip this step
                      </span>
                    </label>

                    <div className="flex items-start gap-3 bg-secondary-container/20 border border-secondary/10 rounded-lg p-4">
                      <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Insurance is optional. You can always add it later from
                        your profile settings. HealthSync also offers healthcare
                        financing options.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Health Profile */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface mb-1">Health Profile</h3>
                      <p className="text-sm text-on-surface-variant">Help us personalize your care experience.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-3">
                        Existing Conditions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {conditionOptions.map((condition) => (
                          <button
                            key={condition}
                            type="button"
                            onClick={() => toggleCondition(condition)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                              formData.conditions.includes(condition)
                                ? "bg-primary text-on-primary border-primary"
                                : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                            }`}
                          >
                            {condition}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                        Known Allergies
                      </label>
                      <textarea
                        value={formData.allergies}
                        onChange={(e) => updateField("allergies", e.target.value)}
                        placeholder="e.g. Penicillin, Peanuts, Latex..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface tracking-wide uppercase mb-2">
                        Current Medications
                      </label>
                      <textarea
                        value={formData.medications}
                        onChange={(e) => updateField("medications", e.target.value)}
                        placeholder="e.g. Metformin 500mg, Lisinopril 10mg..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3 bg-primary-fixed/30 border border-primary-fixed-dim/20 rounded-lg p-4">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        This information helps our AI provide more accurate
                        triage assessments. All data is encrypted and only shared
                        with your authorized providers.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-6">
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
                  {currentStep === 3 ? "Create Account" : "Continue"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Help widget */}
      <div className="hidden sm:block fixed bottom-6 right-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm shrink-0">
            HC
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">Need help with registration?</p>
            <p className="text-xs text-on-surface-variant">Live coordinator available now</p>
          </div>
          <button className="text-primary text-sm font-bold hover:underline whitespace-nowrap ml-2">
            Chat Now
          </button>
        </div>
      </div>

      {/* Provider CTA */}
      <div className="text-center py-3 border-t border-outline-variant">
        <p className="text-sm text-on-surface-variant">
          Are you a healthcare provider?{" "}
          <Link href="/signup/provider" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-on-surface-variant">
          &copy; {new Date().getFullYear()} HealthSync AI. All Rights Reserved.
        </p>
        <div className="flex gap-4 text-xs text-on-surface-variant">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link href="/security" className="hover:text-primary">Security Overview</Link>
        </div>
      </footer>
    </div>
  );
}
