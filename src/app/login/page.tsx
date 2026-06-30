"use client";

import { useState } from "react";
import Link from "next/link";

const roles = [
  { key: "patient", label: "Patient", href: "/dashboard", icon: "🧑‍⚕️", desc: "Access your health records & appointments" },
  { key: "doctor", label: "Doctor", href: "/doctor", icon: "👨‍⚕️", desc: "Clinical portal & patient management" },
  { key: "pharmacy", label: "Pharmacist", href: "/pharmacy", icon: "💊", desc: "Dispensing & inventory management" },
  { key: "lab", label: "Lab Tech", href: "/lab", icon: "🔬", desc: "Diagnostics & test results" },
  { key: "admin", label: "Admin", href: "/admin", icon: "🛡️", desc: "Platform administration" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRole = roles.find(r => r.key === role)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = selectedRole.href;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full border-2 border-white/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-white/10" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" /></svg>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">HealthSync AI</div>
              <div className="text-xs font-medium text-white/60 tracking-widest uppercase">Calculated Calm</div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white leading-tight">Your Health,<br />Powered by AI.</h2>
            <p className="text-white/70 text-lg max-w-md">Clinical-grade AI triage, telehealth consultations, and a complete healthcare ecosystem — all in one platform.</p>
            <div className="space-y-4">
              {[
                { icon: "🛡️", text: "HIPAA & NDPR Compliant" },
                { icon: "🤖", text: "AI-Powered Triage with 99.2% Accuracy" },
                { icon: "🌍", text: "500+ Healthcare Providers Across Africa" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-white/80 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["AO", "CK", "BN"].map((a, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold text-white">{a}</div>
              ))}
            </div>
            <span className="text-white/60 text-sm">Join 12,000+ users already on HealthSync</span>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center">
            <svg viewBox="0 0 24 24" className="w-9 h-9 text-primary" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-1 11h-4v4h-2v-4H7v-2h4V8h2v4h4v2z" /></svg>
            <div className="text-xl font-bold text-primary">HealthSync AI</div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-on-surface">Welcome back</h1>
            <p className="text-on-surface-variant text-sm mt-1">Sign in to access your healthcare portal</p>
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">Sign in as</label>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {roles.map(r => (
                <button key={r.key} onClick={() => setRole(r.key)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${role === r.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"}`}>
                  <span>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1.5">{selectedRole.desc}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-on-surface">Password</label>
                <Link href="/login" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 pr-12 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant">
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setRememberMe(!rememberMe)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${rememberMe ? "bg-primary border-primary" : "border-outline-variant"}`}>
                {rememberMe && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
              </button>
              <span className="text-sm text-on-surface-variant">Remember me for 30 days</span>
            </div>

            <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Signing in...
                </>
              ) : (
                `Sign In as ${selectedRole.label}`
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-surface text-on-surface-variant">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.913 1.183-4.962 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up as Patient</Link>
            {" · "}
            <Link href="/register/provider" className="text-primary font-semibold hover:underline">Join as Provider</Link>
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            <span className="text-[10px] text-on-surface-variant">256-bit encryption · HIPAA compliant · NDPR certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
