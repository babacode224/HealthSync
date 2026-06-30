"use client";

import { useState } from "react";

const loanProducts = [
  { id: "LP-001", name: "Equipment Financing", description: "Purchase or upgrade medical equipment with flexible repayment terms.", maxAmount: 25000000, minAmount: 500000, rate: "12.5%", tenure: "12-60 months", icon: "🔬", features: ["No collateral up to ₦5M", "Same-day approval", "Equipment as security"] },
  { id: "LP-002", name: "Practice Expansion Loan", description: "Expand your clinic, open a new branch, or renovate your facility.", maxAmount: 50000000, minAmount: 2000000, rate: "14.0%", tenure: "24-84 months", icon: "🏥", features: ["Competitive rates", "Grace period available", "Flexible collateral"] },
  { id: "LP-003", name: "Working Capital", description: "Cover operational expenses — staff salaries, supplies, utilities.", maxAmount: 10000000, minAmount: 200000, rate: "15.5%", tenure: "3-24 months", icon: "💰", features: ["Quick disbursement", "Revolving credit option", "No usage restrictions"] },
  { id: "LP-004", name: "Emergency Fund", description: "Urgent cash for unexpected expenses or business continuity.", maxAmount: 5000000, minAmount: 100000, rate: "18.0%", tenure: "1-12 months", icon: "🚨", features: ["Approval in 2 hours", "Minimal documentation", "Direct to account"] },
];

const activeLoans = [
  { id: "LN-2024-001", product: "Equipment Financing", amount: 8500000, disbursed: "Jan 15, 2026", tenure: 36, monthlyPayment: 285000, totalPaid: 1710000, remaining: 6790000, nextDue: "Jul 15, 2026", status: "current", progress: 20, equipment: "Beckman AU5800 Chemistry Analyzer" },
  { id: "LN-2024-002", product: "Working Capital", amount: 3000000, disbursed: "Mar 1, 2026", tenure: 12, monthlyPayment: 280000, totalPaid: 1120000, remaining: 1880000, nextDue: "Jul 1, 2026", status: "current", progress: 37, equipment: null },
];

const repaymentHistory = [
  { date: "Jun 15, 2026", loan: "LN-2024-001", amount: 285000, principal: 195000, interest: 90000, status: "paid" },
  { date: "Jun 1, 2026", loan: "LN-2024-002", amount: 280000, principal: 228000, interest: 52000, status: "paid" },
  { date: "May 15, 2026", loan: "LN-2024-001", amount: 285000, principal: 193000, interest: 92000, status: "paid" },
  { date: "May 1, 2026", loan: "LN-2024-002", amount: 280000, principal: 225000, interest: 55000, status: "paid" },
  { date: "Apr 15, 2026", loan: "LN-2024-001", amount: 285000, principal: 191000, interest: 94000, status: "paid" },
  { date: "Apr 1, 2026", loan: "LN-2024-002", amount: 280000, principal: 222000, interest: 58000, status: "paid" },
];

type Tab = "products" | "active" | "calculator" | "history";

export default function DoctorLoansPage() {
  const [tab, setTab] = useState<Tab>("products");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [calcAmount, setCalcAmount] = useState(5000000);
  const [calcTenure, setCalcTenure] = useState(24);
  const [calcRate, setCalcRate] = useState(12.5);

  const monthlyPayment = (calcAmount * (calcRate / 100 / 12) * Math.pow(1 + calcRate / 100 / 12, calcTenure)) / (Math.pow(1 + calcRate / 100 / 12, calcTenure) - 1);
  const totalPayment = monthlyPayment * calcTenure;
  const totalInterest = totalPayment - calcAmount;

  const productDetail = selectedProduct ? loanProducts.find(p => p.id === selectedProduct) : null;
  const loanDetail = selectedLoan ? activeLoans.find(l => l.id === selectedLoan) : null;

  const totalOutstanding = activeLoans.reduce((a, l) => a + l.remaining, 0);
  const totalMonthly = activeLoans.reduce((a, l) => a + l.monthlyPayment, 0);

  const tabs: { key: Tab; label: string }[] = [
    { key: "products", label: "Loan Products" },
    { key: "active", label: `Active Loans (${activeLoans.length})` },
    { key: "calculator", label: "Calculator" },
    { key: "history", label: "Repayment History" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Medical Practice Loans</h1>
          <p className="text-on-surface-variant text-sm mt-1">Financing solutions for healthcare professionals</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Apply for Loan</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Outstanding", value: `₦${(totalOutstanding / 1000000).toFixed(1)}M`, icon: "📊", color: "text-primary" },
          { label: "Monthly Commitment", value: `₦${(totalMonthly / 1000).toFixed(0)}K`, icon: "📅", color: "text-amber-600" },
          { label: "Active Loans", value: activeLoans.length, icon: "📋", color: "text-blue-600" },
          { label: "Credit Score", value: "782", icon: "⭐", color: "text-green-600" },
        ].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">{s.icon} {s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedProduct(null); setSelectedLoan(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <div className="flex gap-6">
          <div className={`${productDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className={`grid ${productDetail ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-4`}>
              {loanProducts.map(p => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)} className={`text-left bg-surface-container-lowest rounded-xl border p-5 hover:shadow-md transition-all ${selectedProduct === p.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <h3 className="font-bold text-on-surface">{p.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">{p.description}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs">
                        <span className="text-primary font-semibold">Up to ₦{(p.maxAmount / 1000000).toFixed(0)}M</span>
                        <span className="text-on-surface-variant">From {p.rate} p.a.</span>
                        <span className="text-on-surface-variant">{p.tenure}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {productDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{productDetail.icon}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white uppercase">{productDetail.id}</span>
                    </div>
                    <h3 className="text-on-primary font-bold text-lg mt-2">{productDetail.name}</h3>
                    <p className="text-on-primary/70 text-sm mt-1">{productDetail.description}</p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="text-[10px] text-on-surface-variant uppercase">Loan Range</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">₦{(productDetail.minAmount / 1000).toFixed(0)}K — ₦{(productDetail.maxAmount / 1000000).toFixed(0)}M</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="text-[10px] text-on-surface-variant uppercase">Interest Rate</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">{productDetail.rate} per annum</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="text-[10px] text-on-surface-variant uppercase">Tenure</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">{productDetail.tenure}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="text-[10px] text-on-surface-variant uppercase">Processing</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">1-3 business days</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Key Features</h4>
                  {productDetail.features.map(f => (
                    <div key={f} className="flex items-center gap-2 py-1.5">
                      <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      <span className="text-xs text-on-surface-variant">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-800 mb-1">Required Documents</h4>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Valid Medical License (MDCN)</li>
                    <li>• 6 months bank statements</li>
                    <li>• CAC registration (if applicable)</li>
                    <li>• Equipment proforma invoice (for equipment loans)</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Apply Now</button>
                  <button onClick={() => { setTab("calculator"); setCalcRate(parseFloat(productDetail.rate)); }} className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Calculate EMI</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Loans Tab */}
      {tab === "active" && (
        <div className="flex gap-6">
          <div className={`${loanDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            {activeLoans.map(l => (
              <button key={l.id} onClick={() => setSelectedLoan(l.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-5 hover:shadow-md transition-all ${selectedLoan === l.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-on-surface-variant">{l.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Current</span>
                    </div>
                    <h3 className="font-bold text-on-surface mt-1">{l.product}</h3>
                    {l.equipment && <p className="text-xs text-on-surface-variant mt-0.5">{l.equipment}</p>}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">₦{(l.amount / 1000000).toFixed(1)}M</div>
                    <div className="text-[10px] text-on-surface-variant">Original amount</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Repayment progress</span>
                    <span className="font-medium text-on-surface">{l.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-container-low rounded-full h-2"><div className="h-2 rounded-full bg-primary" style={{ width: `${l.progress}%` }} /></div>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                  <span>Monthly: ₦{(l.monthlyPayment / 1000).toFixed(0)}K</span>
                  <span>Remaining: ₦{(l.remaining / 1000000).toFixed(1)}M</span>
                  <span>Next due: {l.nextDue}</span>
                </div>
              </button>
            ))}
          </div>

          {loanDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-white/70">{loanDetail.id}</span>
                    <h3 className="text-on-primary font-bold text-lg mt-1">{loanDetail.product}</h3>
                    <p className="text-on-primary/70 text-sm">Disbursed: {loanDetail.disbursed}</p>
                  </div>
                  <button onClick={() => setSelectedLoan(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Loan Amount", value: `₦${(loanDetail.amount / 1000000).toFixed(1)}M` },
                    { label: "Monthly EMI", value: `₦${(loanDetail.monthlyPayment / 1000).toFixed(0)}K` },
                    { label: "Total Paid", value: `₦${(loanDetail.totalPaid / 1000000).toFixed(1)}M` },
                    { label: "Outstanding", value: `₦${(loanDetail.remaining / 1000000).toFixed(1)}M` },
                    { label: "Tenure", value: `${loanDetail.tenure} months` },
                    { label: "Next Payment", value: loanDetail.nextDue },
                  ].map(d => (
                    <div key={d.label} className="bg-surface-container-low rounded-xl p-3">
                      <div className="text-[10px] text-on-surface-variant uppercase">{d.label}</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5">{d.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Repayment Progress</h4>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-on-surface-variant">₦{(loanDetail.totalPaid / 1000000).toFixed(1)}M paid</span>
                    <span className="font-medium text-on-surface">{loanDetail.progress}% complete</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3"><div className="h-3 rounded-full bg-primary" style={{ width: `${loanDetail.progress}%` }} /></div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                    <span>{loanDetail.disbursed}</span>
                    <span>{loanDetail.tenure} months</span>
                  </div>
                </div>

                {loanDetail.equipment && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Financed Equipment</h4>
                    <p className="text-xs text-blue-700">{loanDetail.equipment}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Make Payment</button>
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Download Statement</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calculator Tab */}
      {tab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 space-y-5">
            <h2 className="text-lg font-semibold text-on-surface">EMI Calculator</h2>

            <div>
              <label className="text-sm font-medium text-on-surface">Loan Amount: ₦{calcAmount.toLocaleString()}</label>
              <input type="range" min={100000} max={50000000} step={100000} value={calcAmount} onChange={e => setCalcAmount(Number(e.target.value))} className="w-full mt-2 accent-primary" />
              <div className="flex justify-between text-[10px] text-on-surface-variant"><span>₦100K</span><span>₦50M</span></div>
            </div>

            <div>
              <label className="text-sm font-medium text-on-surface">Tenure: {calcTenure} months</label>
              <input type="range" min={1} max={84} step={1} value={calcTenure} onChange={e => setCalcTenure(Number(e.target.value))} className="w-full mt-2 accent-primary" />
              <div className="flex justify-between text-[10px] text-on-surface-variant"><span>1 month</span><span>84 months</span></div>
            </div>

            <div>
              <label className="text-sm font-medium text-on-surface">Interest Rate: {calcRate}% p.a.</label>
              <input type="range" min={8} max={25} step={0.5} value={calcRate} onChange={e => setCalcRate(Number(e.target.value))} className="w-full mt-2 accent-primary" />
              <div className="flex justify-between text-[10px] text-on-surface-variant"><span>8%</span><span>25%</span></div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {loanProducts.map(p => (
                <button key={p.id} onClick={() => setCalcRate(parseFloat(p.rate))} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${calcRate === parseFloat(p.rate) ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {p.name.split(" ")[0]} ({p.rate})
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white space-y-5">
            <h2 className="text-lg font-semibold">Repayment Summary</h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-xs opacity-70">Monthly EMI</div>
                <div className="text-3xl font-bold mt-1">₦{Math.round(monthlyPayment).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-xs opacity-70">Total Payment</div>
                  <div className="text-xl font-bold mt-1">₦{(totalPayment / 1000000).toFixed(2)}M</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-xs opacity-70">Total Interest</div>
                  <div className="text-xl font-bold mt-1">₦{(totalInterest / 1000000).toFixed(2)}M</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="opacity-70">Principal vs Interest</span>
                <span>{Math.round((calcAmount / totalPayment) * 100)}% / {Math.round((totalInterest / totalPayment) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 flex overflow-hidden">
                <div className="h-3 bg-white" style={{ width: `${(calcAmount / totalPayment) * 100}%` }} />
                <div className="h-3 bg-white/40" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[10px] opacity-70 mt-1"><span>Principal</span><span>Interest</span></div>
            </div>

            <button className="w-full px-4 py-3 bg-white text-primary rounded-xl text-sm font-bold hover:opacity-90 transition-all">Apply for This Amount</button>
          </div>
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Repayment History</h2>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Loan ID</th><th className="text-left px-4 py-3 font-medium">Amount</th><th className="text-left px-4 py-3 font-medium">Principal</th><th className="text-left px-4 py-3 font-medium">Interest</th><th className="text-left px-4 py-3 font-medium">Status</th></tr></thead>
              <tbody>
                {repaymentHistory.map((r, i) => (
                  <tr key={i} className="border-t border-outline-variant hover:bg-surface-container-low/50">
                    <td className="px-4 py-3 text-sm text-on-surface">{r.date}</td>
                    <td className="px-4 py-3 text-xs font-mono text-on-surface-variant">{r.loan}</td>
                    <td className="px-4 py-3 text-sm font-medium text-on-surface">₦{r.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">₦{r.principal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">₦{r.interest.toLocaleString()}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            <div>
              <span className="text-sm font-semibold text-green-800">Payment Record: Excellent</span>
              <p className="text-xs text-green-700">All payments made on time. This positively impacts your credit score and future loan eligibility.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
