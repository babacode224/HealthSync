"use client";

import { useState } from "react";

const quickSymptoms = ["Headache", "Fever", "Cough", "Fatigue", "Nausea", "Dizziness", "Chest Pain", "Shortness of Breath"];

const bodyRegions = [
  "Head", "Neck", "Chest", "Upper Back", "Lower Back",
  "Left Arm", "Right Arm", "Abdomen", "Left Leg", "Right Leg",
];

const possibleConditions = [
  { name: "Common Cold", match: 65, description: "Viral infection of the upper respiratory tract. Usually resolves with rest and hydration." },
  { name: "Seasonal Flu", match: 20, description: "Infectious respiratory illness. Consider testing if symptoms persist." },
  { name: "Allergic Rhinitis", match: 15, description: "Nasal inflammation triggered by allergens. Consider allergy testing if recurring." },
];

export default function TriagePage() {
  const [step, setStep] = useState<"input" | "results">("input");
  const [symptoms, setSymptoms] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState(5);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const handleStartAssessment = () => {
    setStep("results");
  };

  if (step === "results") {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Disclaimer banner */}
        <div className="bg-tertiary-fixed/30 border border-tertiary-fixed-dim/30 rounded-lg px-4 py-2.5 flex items-center gap-2 text-xs text-on-surface-variant">
          <svg className="w-4 h-4 text-tertiary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span>
            <strong>Disclaimer:</strong> Not a medical diagnosis. Consult a professional for clinical advice.
          </span>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary tracking-wide uppercase mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            ANALYSIS COMPLETE
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Assessment Results</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Based on your reported symptoms ({selectedChips.length > 0 ? selectedChips.join(", ") : "Cough, Fatigue, Mild Fever"}), HealthSync AI has analyzed potential matches within the clinical database.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left — Urgency + Conditions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Urgency card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
              <div className="text-[11px] font-bold text-tertiary tracking-wider uppercase mb-2">CURRENT PRIORITY</div>
              <h2 className="text-xl font-bold text-on-surface mb-1">Medium Urgency</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                GP Visit Recommended within 48 hours.<br />
                Monitor for escalation of fever.
              </p>
              <div className="flex gap-2 mt-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-fixed text-primary">Self-Isolation: Optional</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-container/30 text-secondary">Activity: Low</span>
              </div>
            </div>

            {/* Connect with provider */}
            <div className="bg-primary rounded-2xl p-6 text-on-primary">
              <h3 className="font-bold mb-1">Connect with a Local Provider</h3>
              <p className="text-sm text-on-primary/80 mb-4">
                We&apos;ve identified 4 available clinics near you that specialize in respiratory care. Get a confirmed diagnosis today.
              </p>
              <div className="flex gap-3">
                <button className="bg-on-primary text-primary font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all">
                  Find a Provider
                </button>
                <button className="border border-on-primary/30 text-on-primary font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-on-primary/10 transition-all">
                  Save to Records
                </button>
              </div>
            </div>
          </div>

          {/* Right — Possible conditions */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-on-surface mb-3">Possible Conditions</h3>
            <div className="space-y-3">
              {possibleConditions.map((condition) => (
                <div
                  key={condition.name}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <h4 className="text-sm font-semibold text-on-surface">{condition.name}</h4>
                    <span className="text-sm font-bold text-primary">{condition.match}% Match</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{condition.description}</p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${condition.match}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <h4 className="font-bold text-on-surface">Monitoring Vitals</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Log your temperature every 4 hours to track progress. If it exceeds 38.5°C, contact a doctor.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              <h4 className="font-bold text-on-surface">Suggested Care</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              OTC pain relief and increased fluids. Use our Pharmacy Marketplace for home delivery.
            </p>
          </div>
        </div>

        {/* Back button */}
        <div>
          <button
            onClick={() => setStep("input")}
            className="text-sm font-semibold text-on-surface-variant hover:text-on-surface flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container-low transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">How are you feeling today?</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Help our AI understand your condition by describing your symptoms and identifying affected areas on the body diagram.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left — Symptom input */}
        <div className="lg:col-span-3 space-y-6">
          {/* Describe symptoms */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              <h3 className="font-bold text-on-surface">Describe your symptoms</h3>
            </div>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g. I have a sharp pain in my lower back that started this morning..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {quickSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleChip(symptom)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedChips.includes(symptom)
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Severity */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                <h3 className="font-bold text-on-surface">Pain Severity</h3>
              </div>
              <span className="text-2xl font-bold text-primary">{painLevel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #006E29 0%, #006E29 30%, #F59E0B 50%, #EF4444 100%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-on-surface-variant">
              <span>1 - Mild</span>
              <span>5 - Moderate</span>
              <span>10 - Severe</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartAssessment}
              className="bg-primary text-on-primary font-bold px-8 py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm text-sm flex items-center gap-2"
            >
              Start AI Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="text-sm font-semibold text-on-surface-variant hover:text-on-surface px-4 py-3 rounded-xl hover:bg-surface-container-low transition-all">
              Cancel
            </button>
          </div>
        </div>

        {/* Right — Body Map */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-on-surface">Body Map</h3>
              <div className="flex bg-surface-container-high rounded-lg overflow-hidden">
                <button className="px-3 py-1 text-xs font-semibold bg-primary text-on-primary">Front</button>
                <button className="px-3 py-1 text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">Back</button>
              </div>
            </div>

            {/* Simplified body region selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {bodyRegions.map((region) => (
                <button
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    selectedRegions.includes(region)
                      ? "bg-error/10 text-error border-error/30"
                      : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            <div className="border-t border-outline-variant pt-3">
              <h4 className="text-xs font-bold text-on-surface mb-1.5">Selected Regions:</h4>
              {selectedRegions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegions.map((region) => (
                    <span
                      key={region}
                      className="text-xs bg-error/10 text-error font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      {region}
                      <button onClick={() => toggleRegion(region)} className="hover:text-error/70">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant italic">No regions selected yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
