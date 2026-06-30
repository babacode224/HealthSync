"use client";

import { useState } from "react";

type Tab = "overview" | "fund" | "transactions" | "insurance";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  category: string;
  description: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
}

const transactions: Transaction[] = [
  { id: "TXN-4501", type: "credit", category: "Wallet Top-up", description: "Bank Transfer — GTBank ****4821", amount: "₦50,000", date: "June 27, 2026 — 09:30 AM", status: "completed", reference: "REF-GT827391" },
  { id: "TXN-4500", type: "debit", category: "Consultation", description: "Dr. Sarah Jenkins — Follow-up Visit", amount: "₦8,500", date: "June 26, 2026 — 02:15 PM", status: "completed" },
  { id: "TXN-4499", type: "debit", category: "Prescription", description: "Metformin HCl 1000mg × 60 tabs", amount: "₦3,400", date: "June 26, 2026 — 02:30 PM", status: "completed" },
  { id: "TXN-4498", type: "debit", category: "Lab Test", description: "Comprehensive Metabolic Panel (CMP)", amount: "₦12,500", date: "June 25, 2026 — 10:00 AM", status: "completed" },
  { id: "TXN-4497", type: "credit", category: "Insurance Refund", description: "AXA Mansard — Lab test reimbursement", amount: "₦8,750", date: "June 24, 2026 — 04:20 PM", status: "completed" },
  { id: "TXN-4496", type: "debit", category: "Telehealth", description: "Dr. Michael Obi — Video Consultation", amount: "₦5,000", date: "June 23, 2026 — 11:00 AM", status: "completed" },
  { id: "TXN-4495", type: "credit", category: "Wallet Top-up", description: "Card Payment — Visa ****7823", amount: "₦25,000", date: "June 22, 2026 — 08:45 AM", status: "completed" },
  { id: "TXN-4494", type: "debit", category: "Marketplace", description: "Blood Pressure Monitor — Omron M3", amount: "₦18,900", date: "June 21, 2026 — 03:30 PM", status: "completed" },
  { id: "TXN-4493", type: "debit", category: "Prescription", description: "Amlodipine 5mg × 30 tabs", amount: "₦1,850", date: "June 20, 2026 — 01:15 PM", status: "completed" },
  { id: "TXN-4492", type: "debit", category: "Consultation", description: "Dr. Amara Obi — Initial Visit", amount: "₦15,000", date: "June 18, 2026 — 09:00 AM", status: "pending" },
];

const insuranceClaims = [
  { id: "CLM-201", service: "Lab — Comprehensive Metabolic Panel", date: "June 25, 2026", amount: "₦12,500", covered: "₦8,750", status: "approved", paidDate: "June 24, 2026" },
  { id: "CLM-200", service: "Consultation — Dr. Sarah Jenkins", date: "June 19, 2026", amount: "₦8,500", covered: "₦6,000", status: "approved", paidDate: "June 22, 2026" },
  { id: "CLM-199", service: "Prescription — Metformin + Amlodipine", date: "June 15, 2026", amount: "₦5,250", covered: "₦3,675", status: "approved", paidDate: "June 18, 2026" },
  { id: "CLM-198", service: "Telehealth — Dr. Michael Obi", date: "June 10, 2026", amount: "₦5,000", covered: "—", status: "denied", paidDate: undefined },
  { id: "CLM-197", service: "Lab — HbA1c + Lipid Panel", date: "June 5, 2026", amount: "₦9,800", covered: "₦9,800", status: "processing", paidDate: undefined },
];

const categoryColors: Record<string, string> = {
  "Wallet Top-up": "bg-secondary-container/30 text-secondary",
  "Insurance Refund": "bg-secondary-container/30 text-secondary",
  "Consultation": "bg-primary/10 text-primary",
  "Prescription": "bg-tertiary-fixed/30 text-tertiary",
  "Lab Test": "bg-primary/10 text-primary",
  "Telehealth": "bg-primary/10 text-primary",
  "Marketplace": "bg-surface-container-high text-on-surface-variant",
};

const claimStatusColors: Record<string, string> = {
  approved: "bg-secondary-container/30 text-secondary",
  denied: "bg-error-container/50 text-error",
  processing: "bg-tertiary-fixed/30 text-tertiary",
};

export default function WalletPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [fundMethod, setFundMethod] = useState<string | null>(null);

  const balance = "₦74,850";
  const totalSpent = "₦65,150";
  const totalFunded = "₦75,000";
  const pendingClaims = insuranceClaims.filter((c) => c.status === "processing").length;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "fund", label: "Fund Wallet" },
    { key: "transactions", label: "Transactions" },
    { key: "insurance", label: "Insurance Claims" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Health Wallet</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Manage payments, top-ups, and insurance claims</p>
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-on-primary">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-on-primary/70 font-medium">Available Balance</div>
            <div className="text-4xl font-bold mt-1">{balance}</div>
            <div className="flex items-center gap-4 mt-3 text-sm text-on-primary/80">
              <span>Total Funded: {totalFunded}</span>
              <span>·</span>
              <span>Total Spent: {totalSpent}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab("fund")} className="px-4 py-2 rounded-xl bg-on-primary text-primary text-sm font-bold hover:opacity-90 transition-all">
              + Fund Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "This Month Spent", value: "₦29,400", color: "text-primary", bg: "bg-primary/10" },
              { label: "Pending Payments", value: "₦15,000", color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
              { label: "Insurance Saved", value: "₦18,425", color: "text-secondary", bg: "bg-secondary-container/20" },
              { label: "Pending Claims", value: pendingClaims.toString(), color: "text-tertiary", bg: "bg-tertiary-fixed/20" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-on-surface-variant font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Spending breakdown */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Spending Breakdown (June 2026)</h3>
            <div className="space-y-3">
              {[
                { category: "Consultations", amount: "₦28,500", pct: 44, color: "bg-primary" },
                { category: "Lab Tests", amount: "₦22,300", pct: 34, color: "bg-secondary" },
                { category: "Prescriptions", amount: "₦5,250", pct: 8, color: "bg-tertiary" },
                { category: "Marketplace", amount: "₦18,900", pct: 29, color: "bg-outline" },
                { category: "Telehealth", amount: "₦5,000", pct: 8, color: "bg-primary/60" },
              ].map((item) => (
                <div key={item.category} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant w-28 shrink-0">{item.category}</span>
                  <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-xs font-bold text-on-surface w-20 text-right shrink-0">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Recent Transactions</h3>
              <button onClick={() => setTab("transactions")} className="text-xs text-primary font-medium hover:underline">View All</button>
            </div>
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-secondary-container/30 text-secondary" : "bg-primary/10 text-primary"}`}>
                  {tx.type === "credit" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-on-surface">{tx.description}</div>
                  <div className="text-[10px] text-on-surface-variant">{tx.date}</div>
                </div>
                <div className={`text-sm font-bold ${tx.type === "credit" ? "text-secondary" : "text-on-surface"}`}>
                  {tx.type === "credit" ? "+" : "−"}{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fund Wallet */}
      {tab === "fund" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-4">Select Funding Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: "bank", label: "Bank Transfer", desc: "Transfer from your bank account", icon: "🏦" },
                { key: "card", label: "Debit/Credit Card", desc: "Visa, Mastercard, Verve", icon: "💳" },
                { key: "ussd", label: "USSD", desc: "Pay using USSD code", icon: "📱" },
              ].map((m) => (
                <button key={m.key} onClick={() => setFundMethod(m.key)} className={`p-4 rounded-xl border-2 text-left transition-all ${fundMethod === m.key ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary/50"}`}>
                  <div className="text-2xl mb-2">{m.icon}</div>
                  <div className="text-sm font-bold text-on-surface">{m.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {fundMethod && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-on-surface">
                {fundMethod === "bank" ? "Bank Transfer" : fundMethod === "card" ? "Card Payment" : "USSD Payment"}
              </h3>

              {fundMethod === "bank" && (
                <div className="space-y-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
                    <div className="text-xs text-on-surface-variant">Transfer to this account:</div>
                    <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Bank</span><span className="font-bold text-on-surface">HealthSync Microfinance Bank</span></div>
                    <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Account Number</span><span className="font-bold text-on-surface font-mono">801 234 5678</span></div>
                    <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Account Name</span><span className="font-bold text-on-surface">Adebayo Oluwatobi / HealthSync</span></div>
                  </div>
                  <div className="text-xs text-on-surface-variant">Your wallet will be credited automatically within 1–5 minutes of transfer confirmation.</div>
                </div>
              )}

              {fundMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-on-surface-variant">Amount (₦)</label>
                    <input type="text" defaultValue="10,000" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="flex gap-2">
                    {["₦5,000", "₦10,000", "₦25,000", "₦50,000"].map((amt) => (
                      <button key={amt} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">{amt}</button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-on-surface-variant">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-on-surface-variant">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-on-surface-variant">CVV</label>
                      <input type="text" placeholder="***" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all">Pay ₦10,000</button>
                  <div className="flex items-center gap-2 justify-center text-[10px] text-on-surface-variant">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    Secured by Paystack · PCI DSS Compliant
                  </div>
                </div>
              )}

              {fundMethod === "ussd" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-on-surface-variant">Amount (₦)</label>
                    <input type="text" defaultValue="10,000" className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-on-surface-variant">Select Bank</label>
                    <select className="w-full mt-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>GTBank — *737#</option>
                      <option>First Bank — *894#</option>
                      <option>UBA — *919#</option>
                      <option>Access Bank — *901#</option>
                      <option>Zenith Bank — *966#</option>
                    </select>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                    <div className="text-xs text-on-surface-variant mb-1">Dial from your registered phone:</div>
                    <div className="text-xl font-bold text-primary font-mono">*737*50*10000#</div>
                    <div className="text-xs text-on-surface-variant mt-2">Follow the prompts to complete payment. Your wallet will be credited automatically.</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Transactions */}
      {tab === "transactions" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {["All", "Top-ups", "Consultations", "Prescriptions", "Lab Tests", "Marketplace"].map((f) => (
              <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${f === "All" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-secondary-container/30 text-secondary" : "bg-primary/10 text-primary"}`}>
                  {tx.type === "credit" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-on-surface">{tx.description}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${categoryColors[tx.category] || "bg-surface-container-high text-on-surface-variant"}`}>{tx.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-on-surface-variant">
                    <span>{tx.date}</span>
                    <span>·</span>
                    <span>{tx.id}</span>
                    {tx.reference && <><span>·</span><span>{tx.reference}</span></>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-bold ${tx.type === "credit" ? "text-secondary" : "text-on-surface"}`}>
                    {tx.type === "credit" ? "+" : "−"}{tx.amount}
                  </div>
                  <div className={`text-[10px] font-medium ${tx.status === "completed" ? "text-secondary" : tx.status === "pending" ? "text-tertiary" : "text-error"}`}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance Claims */}
      {tab === "insurance" && (
        <div className="space-y-4">
          {/* Insurance card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-on-surface-variant font-medium">Insurance Provider</div>
                <div className="text-lg font-bold text-on-surface mt-0.5">AXA Mansard Health</div>
                <div className="text-xs text-on-surface-variant mt-1">Plan: Gold Plus · Policy #AXM-NG-2026-44821</div>
                <div className="text-xs text-on-surface-variant">Valid until: December 31, 2026</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-on-surface-variant">Total Saved</div>
                <div className="text-xl font-bold text-secondary">₦18,425</div>
              </div>
            </div>
          </div>

          {/* Claims list */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Claims History</h3>
            </div>
            {insuranceClaims.map((claim) => (
              <div key={claim.id} className="px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-on-surface">{claim.service}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${claimStatusColors[claim.status]}`}>{claim.status.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                      <span>{claim.id}</span>
                      <span>·</span>
                      <span>Service Date: {claim.date}</span>
                      {claim.paidDate && <><span>·</span><span>Paid: {claim.paidDate}</span></>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-on-surface-variant">Billed: {claim.amount}</div>
                    <div className={`text-sm font-bold ${claim.status === "denied" ? "text-error" : "text-secondary"}`}>
                      Covered: {claim.covered}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            Claims are automatically filed when you pay for covered services. Processing takes 3–5 business days.
          </div>
        </div>
      )}
    </div>
  );
}
