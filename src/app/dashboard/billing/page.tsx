"use client";

import { useState } from "react";

type Tab = "overview" | "invoices" | "insurance" | "payments" | "wallet";
type InvoiceStatus = "paid" | "pending" | "overdue" | "partially_paid";
type ClaimStatus = "submitted" | "processing" | "approved" | "denied" | "appealed";

interface Invoice {
  id: string;
  date: string;
  service: string;
  provider: string;
  amount: number;
  paid: number;
  status: InvoiceStatus;
  items: { description: string; qty: number; price: number }[];
}

interface Claim {
  id: string;
  invoiceId: string;
  provider: string;
  service: string;
  date: string;
  amount: number;
  covered: number;
  status: ClaimStatus;
  insurer: string;
  policyNo: string;
  reason?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "wallet" | "paystack";
  label: string;
  detail: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  method: string;
  ref: string;
}

const invoices: Invoice[] = [
  { id: "INV-2024-001", date: "2024-06-20", service: "General Consultation", provider: "Dr. Adebayo Ogundimu", amount: 15000, paid: 15000, status: "paid", items: [{ description: "Consultation Fee", qty: 1, price: 12000 }, { description: "Prescription Review", qty: 1, price: 3000 }] },
  { id: "INV-2024-002", date: "2024-06-18", service: "Complete Blood Count", provider: "PathCare Diagnostics", amount: 8500, paid: 0, status: "pending", items: [{ description: "CBC Test", qty: 1, price: 6500 }, { description: "Sample Collection", qty: 1, price: 2000 }] },
  { id: "INV-2024-003", date: "2024-06-10", service: "Telehealth Session", provider: "Dr. Chinwe Okafor", amount: 10000, paid: 10000, status: "paid", items: [{ description: "Video Consultation (30 min)", qty: 1, price: 10000 }] },
  { id: "INV-2024-004", date: "2024-05-28", service: "Prescription Fulfillment", provider: "MedPlus Pharmacy", amount: 22500, paid: 12000, status: "partially_paid", items: [{ description: "Metformin 500mg (30 tabs)", qty: 1, price: 4500 }, { description: "Lisinopril 10mg (30 tabs)", qty: 1, price: 6000 }, { description: "Atorvastatin 20mg (30 tabs)", qty: 1, price: 8000 }, { description: "Dispensing Fee", qty: 1, price: 4000 }] },
  { id: "INV-2024-005", date: "2024-05-15", service: "Dental Checkup", provider: "Dr. Folake Bamisaye", amount: 25000, paid: 0, status: "overdue", items: [{ description: "Dental Examination", qty: 1, price: 15000 }, { description: "Dental X-Ray", qty: 2, price: 5000 }] },
  { id: "INV-2024-006", date: "2024-05-05", service: "Lipid Panel", provider: "LifeBridge Lab", amount: 12000, paid: 12000, status: "paid", items: [{ description: "Lipid Panel Test", qty: 1, price: 10000 }, { description: "Sample Collection", qty: 1, price: 2000 }] },
];

const claims: Claim[] = [
  { id: "CLM-2024-001", invoiceId: "INV-2024-001", provider: "Dr. Adebayo Ogundimu", service: "General Consultation", date: "2024-06-20", amount: 15000, covered: 12000, status: "approved", insurer: "Leadway Health HMO", policyNo: "LH-98234-NG" },
  { id: "CLM-2024-002", invoiceId: "INV-2024-002", provider: "PathCare Diagnostics", service: "Complete Blood Count", date: "2024-06-18", amount: 8500, covered: 0, status: "processing", insurer: "Leadway Health HMO", policyNo: "LH-98234-NG" },
  { id: "CLM-2024-003", invoiceId: "INV-2024-003", provider: "Dr. Chinwe Okafor", service: "Telehealth Session", date: "2024-06-10", amount: 10000, covered: 7500, status: "approved", insurer: "Leadway Health HMO", policyNo: "LH-98234-NG" },
  { id: "CLM-2024-004", invoiceId: "INV-2024-005", provider: "Dr. Folake Bamisaye", service: "Dental Checkup", date: "2024-05-15", amount: 25000, covered: 0, status: "denied", insurer: "Leadway Health HMO", policyNo: "LH-98234-NG", reason: "Dental services not covered under current plan. Consider upgrading to Premium Plus for dental coverage." },
  { id: "CLM-2024-005", invoiceId: "INV-2024-004", provider: "MedPlus Pharmacy", service: "Prescription Fulfillment", date: "2024-05-28", amount: 22500, covered: 18000, status: "submitted", insurer: "Leadway Health HMO", policyNo: "LH-98234-NG" },
];

const paymentMethods: PaymentMethod[] = [
  { id: "pm-1", type: "card", label: "Visa Debit", detail: "•••• •••• •••• 4521", isDefault: true },
  { id: "pm-2", type: "bank", label: "GTBank", detail: "Savings •••• 7832", isDefault: false },
  { id: "pm-3", type: "paystack", label: "Paystack", detail: "canvateams591@gmail.com", isDefault: false },
  { id: "pm-4", type: "wallet", label: "Health Wallet", detail: "Balance: ₦45,200.00", isDefault: false },
];

const transactions: Transaction[] = [
  { id: "TXN-001", date: "2024-06-20", description: "Consultation — Dr. Ogundimu", amount: 15000, type: "debit", method: "Visa •••• 4521", ref: "PAY-9823741" },
  { id: "TXN-002", date: "2024-06-18", description: "Insurance Reimbursement", amount: 12000, type: "credit", method: "Health Wallet", ref: "RMB-4521893" },
  { id: "TXN-003", date: "2024-06-10", description: "Telehealth — Dr. Okafor", amount: 10000, type: "debit", method: "Visa •••• 4521", ref: "PAY-7643210" },
  { id: "TXN-004", date: "2024-06-05", description: "Wallet Top-up", amount: 50000, type: "credit", method: "GTBank •••• 7832", ref: "TOP-3219876" },
  { id: "TXN-005", date: "2024-05-28", description: "Prescription — MedPlus", amount: 12000, type: "debit", method: "Health Wallet", ref: "PAY-5432178" },
  { id: "TXN-006", date: "2024-05-20", description: "Insurance Reimbursement", amount: 7500, type: "credit", method: "Health Wallet", ref: "RMB-8765432" },
  { id: "TXN-007", date: "2024-05-15", description: "Dental — Dr. Bamisaye", amount: 25000, type: "debit", method: "Visa •••• 4521", ref: "PAY-1234567" },
];

const statusColors: Record<InvoiceStatus, string> = {
  paid: "bg-secondary-container/30 text-secondary",
  pending: "bg-tertiary-fixed/30 text-tertiary",
  overdue: "bg-error-container/50 text-error",
  partially_paid: "bg-primary-fixed text-primary",
};

const claimColors: Record<ClaimStatus, string> = {
  submitted: "bg-primary-fixed text-primary",
  processing: "bg-tertiary-fixed/30 text-tertiary",
  approved: "bg-secondary-container/30 text-secondary",
  denied: "bg-error-container/50 text-error",
  appealed: "bg-tertiary-fixed/30 text-tertiary",
};

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function BillingPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [walletTopup, setWalletTopup] = useState(false);

  const totalOwed = invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + (i.amount - i.paid), 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paid, 0);
  const insuranceCovered = claims.filter((c) => c.status === "approved").reduce((s, c) => s + c.covered, 0);
  const pendingClaims = claims.filter((c) => c.status === "submitted" || c.status === "processing").length;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "invoices", label: "Invoices" },
    { key: "insurance", label: "Insurance" },
    { key: "payments", label: "Payment Methods" },
    { key: "wallet", label: "Health Wallet" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Billing & Insurance</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Manage payments, invoices, and insurance claims</p>
        </div>
        <button
          onClick={() => setTab("invoices")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Pay Now
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-surface-container-high rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedInvoice(null); setSelectedClaim(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("invoices")}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-error-container/50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                </div>
              </div>
              <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">Outstanding</div>
              <div className="text-xl font-bold text-error mt-0.5">{fmt(totalOwed)}</div>
              <div className="text-[10px] text-on-surface-variant mt-1">{invoices.filter((i) => i.status !== "paid").length} unpaid invoices</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("invoices")}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary-container/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
              </div>
              <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">Total Paid</div>
              <div className="text-xl font-bold text-secondary mt-0.5">{fmt(totalPaid)}</div>
              <div className="text-[10px] text-on-surface-variant mt-1">This year</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("insurance")}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                </div>
              </div>
              <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">Insurance Covered</div>
              <div className="text-xl font-bold text-primary mt-0.5">{fmt(insuranceCovered)}</div>
              <div className="text-[10px] text-on-surface-variant mt-1">{pendingClaims} claims pending</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all" onClick={() => setTab("wallet")}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>
                </div>
              </div>
              <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">Health Wallet</div>
              <div className="text-xl font-bold text-tertiary mt-0.5">₦45,200</div>
              <div className="text-[10px] text-on-surface-variant mt-1">Available balance</div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Recent Invoices</h3>
              <button onClick={() => setTab("invoices")} className="text-xs font-semibold text-primary hover:underline">View All</button>
            </div>
            {invoices.slice(0, 4).map((inv) => (
              <div
                key={inv.id}
                onClick={() => { setTab("invoices"); setSelectedInvoice(inv); }}
                className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-on-surface truncate">{inv.service}</div>
                  <div className="text-xs text-on-surface-variant">{inv.provider} · {inv.date}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-on-surface">{fmt(inv.amount)}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[inv.status]}`}>
                    {inv.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Recent Transactions</h3>
              <button onClick={() => setTab("wallet")} className="text-xs font-semibold text-primary hover:underline">View All</button>
            </div>
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-secondary-container/30 text-secondary" : "bg-error-container/50 text-error"}`}>
                  {tx.type === "credit" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-on-surface truncate">{tx.description}</div>
                  <div className="text-xs text-on-surface-variant">{tx.method} · {tx.date}</div>
                </div>
                <span className={`text-sm font-bold ${tx.type === "credit" ? "text-secondary" : "text-on-surface"}`}>
                  {tx.type === "credit" ? "+" : "-"}{fmt(tx.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* Insurance Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-on-surface">Leadway Health HMO</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary">ACTIVE</span>
                </div>
                <div className="text-xs text-on-surface-variant">Policy: LH-98234-NG · Standard Plan · Expires: Dec 31, 2024</div>
                <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-outline-variant">
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase">Annual Limit</div>
                    <div className="text-sm font-bold text-on-surface">₦500,000</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase">Used</div>
                    <div className="text-sm font-bold text-primary">₦19,500</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase">Remaining</div>
                    <div className="text-sm font-bold text-secondary">₦480,500</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: "3.9%" }} />
                  </div>
                  <div className="text-[10px] text-on-surface-variant mt-1">3.9% of annual limit used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {tab === "invoices" && (
        <div className="flex gap-6">
          <div className={`${selectedInvoice ? "hidden lg:block lg:w-1/2" : "w-full"} space-y-3`}>
            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "pending", "overdue", "partially_paid", "paid"] as const).map((f) => {
                const count = f === "all" ? invoices.length : invoices.filter((i) => i.status === f).length;
                return (
                  <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low transition-all">
                    {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())} ({count})
                  </button>
                );
              })}
            </div>
            {invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className={`bg-surface-container-lowest border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all ${selectedInvoice?.id === inv.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-sm font-bold text-on-surface">{inv.service}</div>
                    <div className="text-xs text-on-surface-variant">{inv.provider}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColors[inv.status]}`}>
                    {inv.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-on-surface-variant">{inv.id} · {inv.date}</div>
                  <div className="text-sm font-bold text-on-surface">{fmt(inv.amount)}</div>
                </div>
                {inv.status === "partially_paid" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-on-surface-variant mb-1">
                      <span>Paid: {fmt(inv.paid)}</span>
                      <span>Remaining: {fmt(inv.amount - inv.paid)}</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${(inv.paid / inv.amount) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Invoice Detail */}
          {selectedInvoice && (
            <div className={`${selectedInvoice ? "w-full lg:w-1/2" : "hidden"}`}>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-4">
                <div className="bg-primary p-5 text-on-primary">
                  <button onClick={() => setSelectedInvoice(null)} className="lg:hidden text-on-primary/80 text-xs mb-2 flex items-center gap-1 hover:text-on-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                    Back
                  </button>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-bold">{selectedInvoice.id}</div>
                      <div className="text-sm text-on-primary/80">{selectedInvoice.service}</div>
                      <div className="text-xs text-on-primary/60 mt-1">{selectedInvoice.provider}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{fmt(selectedInvoice.amount)}</div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-on-primary/20">
                        {selectedInvoice.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-on-surface-variant">Date:</span> <span className="font-medium text-on-surface">{selectedInvoice.date}</span></div>
                    <div><span className="text-on-surface-variant">Due:</span> <span className="font-medium text-on-surface">{selectedInvoice.date}</span></div>
                    <div><span className="text-on-surface-variant">Paid:</span> <span className="font-medium text-secondary">{fmt(selectedInvoice.paid)}</span></div>
                    <div><span className="text-on-surface-variant">Balance:</span> <span className="font-medium text-error">{fmt(selectedInvoice.amount - selectedInvoice.paid)}</span></div>
                  </div>

                  {/* Line Items */}
                  <div>
                    <h4 className="text-xs font-bold text-on-surface mb-2 uppercase tracking-wide">Items</h4>
                    <div className="border border-outline-variant rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 px-3 py-2 bg-surface-container-low text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        <span className="col-span-7">Description</span>
                        <span className="col-span-2 text-center">Qty</span>
                        <span className="col-span-3 text-right">Amount</span>
                      </div>
                      {selectedInvoice.items.map((item, i) => (
                        <div key={i} className="grid grid-cols-12 px-3 py-2 border-t border-outline-variant text-xs">
                          <span className="col-span-7 text-on-surface">{item.description}</span>
                          <span className="col-span-2 text-center text-on-surface-variant">{item.qty}</span>
                          <span className="col-span-3 text-right font-medium text-on-surface">{fmt(item.price)}</span>
                        </div>
                      ))}
                      <div className="grid grid-cols-12 px-3 py-2 border-t border-outline-variant bg-surface-container-low text-xs font-bold">
                        <span className="col-span-9 text-on-surface">Total</span>
                        <span className="col-span-3 text-right text-primary">{fmt(selectedInvoice.amount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {selectedInvoice.status !== "paid" && (
                      <button className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">
                        Pay {fmt(selectedInvoice.amount - selectedInvoice.paid)}
                      </button>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
                        Download PDF
                      </button>
                      <button className="flex-1 py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
                        File Claim
                      </button>
                    </div>
                    {selectedInvoice.status === "overdue" && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container/30 border border-error/20">
                        <svg className="w-4 h-4 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                        <div className="text-xs text-error">This invoice is overdue. Please make payment to avoid service interruption.</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-outline-variant">
                    <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                      HIPAA-compliant billing. Payment data encrypted end-to-end.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Insurance Tab */}
      {tab === "insurance" && (
        <div className="flex gap-6">
          <div className={`${selectedClaim ? "hidden lg:block lg:w-1/2" : "w-full"} space-y-4`}>
            {/* Insurance Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-on-primary">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-on-primary/60 uppercase tracking-wider">Health Insurance</div>
                  <div className="text-lg font-bold mt-0.5">Leadway Health HMO</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-on-primary/20">ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-on-primary/60">Policy No:</span> <span className="font-medium">LH-98234-NG</span></div>
                <div><span className="text-on-primary/60">Plan:</span> <span className="font-medium">Standard</span></div>
                <div><span className="text-on-primary/60">Member:</span> <span className="font-medium">Adebayo Oluwatobi</span></div>
                <div><span className="text-on-primary/60">Expires:</span> <span className="font-medium">Dec 31, 2024</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-on-primary/20">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-on-primary/60">Annual Limit Usage</span>
                  <span className="font-medium">₦19,500 / ₦500,000</span>
                </div>
                <div className="w-full bg-on-primary/20 rounded-full h-2">
                  <div className="h-2 rounded-full bg-on-primary transition-all" style={{ width: "3.9%" }} />
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
              <h4 className="text-xs font-bold text-on-surface mb-3 uppercase tracking-wide">Coverage</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Consultations", covered: true },
                  { label: "Lab Tests", covered: true },
                  { label: "Prescriptions", covered: true },
                  { label: "Telehealth", covered: true },
                  { label: "Dental", covered: false },
                  { label: "Vision", covered: false },
                  { label: "Maternity", covered: true },
                  { label: "Emergency", covered: true },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-xs">
                    {c.covered ? (
                      <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-error shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    )}
                    <span className={c.covered ? "text-on-surface" : "text-on-surface-variant line-through"}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Claims List */}
            <h3 className="text-sm font-bold text-on-surface">Claims History</h3>
            {claims.map((cl) => (
              <div
                key={cl.id}
                onClick={() => setSelectedClaim(cl)}
                className={`bg-surface-container-lowest border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all ${selectedClaim?.id === cl.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="text-sm font-semibold text-on-surface">{cl.service}</div>
                    <div className="text-xs text-on-surface-variant">{cl.provider} · {cl.date}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${claimColors[cl.status]}`}>
                    {cl.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-on-surface-variant">{cl.id} · Ref: {cl.invoiceId}</div>
                  <div className="text-sm font-bold text-on-surface">{fmt(cl.amount)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Claim Detail */}
          {selectedClaim && (
            <div className={`${selectedClaim ? "w-full lg:w-1/2" : "hidden"}`}>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-4">
                <div className="bg-primary p-5 text-on-primary">
                  <button onClick={() => setSelectedClaim(null)} className="lg:hidden text-on-primary/80 text-xs mb-2 flex items-center gap-1 hover:text-on-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                    Back
                  </button>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-bold">{selectedClaim.id}</div>
                      <div className="text-sm text-on-primary/80">{selectedClaim.service}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-on-primary/20`}>
                      {selectedClaim.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Claim Progress */}
                  <div>
                    <h4 className="text-xs font-bold text-on-surface mb-3 uppercase tracking-wide">Claim Progress</h4>
                    <div className="flex items-center gap-1">
                      {["Submitted", "Processing", "Decision"].map((step, i) => {
                        const stepMap: Record<string, number> = { submitted: 0, processing: 1, approved: 2, denied: 2, appealed: 1 };
                        const current = stepMap[selectedClaim.status] ?? 0;
                        const done = i <= current;
                        const isDenied = i === 2 && selectedClaim.status === "denied";
                        return (
                          <div key={step} className="flex-1 flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDenied ? "bg-error text-on-error" : done ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                              {isDenied ? "✕" : done ? "✓" : i + 1}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-1">{isDenied ? "Denied" : step}</span>
                            {i < 2 && <div className={`w-full h-0.5 mt-1 ${i < current ? "bg-primary" : "bg-surface-container-high"}`} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-on-surface-variant">Provider:</span> <span className="font-medium text-on-surface">{selectedClaim.provider}</span></div>
                    <div><span className="text-on-surface-variant">Date:</span> <span className="font-medium text-on-surface">{selectedClaim.date}</span></div>
                    <div><span className="text-on-surface-variant">Invoice:</span> <span className="font-medium text-primary">{selectedClaim.invoiceId}</span></div>
                    <div><span className="text-on-surface-variant">Insurer:</span> <span className="font-medium text-on-surface">{selectedClaim.insurer}</span></div>
                    <div><span className="text-on-surface-variant">Claimed:</span> <span className="font-bold text-on-surface">{fmt(selectedClaim.amount)}</span></div>
                    <div><span className="text-on-surface-variant">Covered:</span> <span className="font-bold text-secondary">{fmt(selectedClaim.covered)}</span></div>
                  </div>

                  {selectedClaim.status === "denied" && selectedClaim.reason && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container/30 border border-error/20">
                      <svg className="w-4 h-4 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                      <div>
                        <div className="text-xs font-bold text-error mb-0.5">Reason for Denial</div>
                        <div className="text-xs text-error/80">{selectedClaim.reason}</div>
                      </div>
                    </div>
                  )}

                  {selectedClaim.status === "approved" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary-container/20 border border-secondary/20">
                      <svg className="w-4 h-4 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      <div className="text-xs text-secondary">Claim approved. {fmt(selectedClaim.covered)} has been credited to your Health Wallet.</div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {selectedClaim.status === "denied" && (
                      <button className="w-full py-2.5 rounded-xl bg-tertiary text-on-tertiary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">
                        File Appeal
                      </button>
                    )}
                    <button className="w-full py-2 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
                      Download Claim Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Methods Tab */}
      {tab === "payments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface">Saved Payment Methods</h3>
            <button
              onClick={() => setShowAddPayment(!showAddPayment)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Add Method
            </button>
          </div>

          {paymentMethods.map((pm) => (
            <div key={pm.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pm.type === "card" ? "bg-primary-fixed text-primary" : pm.type === "bank" ? "bg-secondary-container/30 text-secondary" : pm.type === "paystack" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-surface-container-high text-on-surface-variant"}`}>
                {pm.type === "card" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>}
                {pm.type === "bank" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>}
                {pm.type === "paystack" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>}
                {pm.type === "wallet" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-on-surface">{pm.label}</span>
                  {pm.isDefault && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">DEFAULT</span>}
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">{pm.detail}</div>
              </div>
              <div className="flex items-center gap-2">
                {!pm.isDefault && (
                  <button className="text-xs text-primary font-medium hover:underline">Set Default</button>
                )}
                <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                </button>
              </div>
            </div>
          ))}

          {/* Add Payment Form */}
          {showAddPayment && (
            <div className="bg-surface-container-lowest border border-primary rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-on-surface">Add Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: "card", label: "Debit/Credit Card" },
                  { type: "bank", label: "Bank Account" },
                  { type: "paystack", label: "Paystack" },
                  { type: "wallet", label: "Mobile Money" },
                ].map((opt) => (
                  <button key={opt.type} className="p-3 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:border-primary hover:bg-primary-fixed/50 transition-all text-center">
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Card Number / Account Number" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Expiry (MM/YY)" className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="CVV" className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">Save Method</button>
                <button onClick={() => setShowAddPayment(false)} className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Cancel</button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                Secured with Paystack. PCI DSS compliant. We never store your full card details.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Health Wallet Tab */}
      {tab === "wallet" && (
        <div className="space-y-4">
          {/* Wallet Balance */}
          <div className="bg-gradient-to-br from-tertiary to-tertiary/80 rounded-xl p-6 text-on-tertiary">
            <div className="text-xs text-on-tertiary/60 uppercase tracking-wider">Health Wallet Balance</div>
            <div className="text-3xl font-bold mt-1">₦45,200.00</div>
            <div className="text-xs text-on-tertiary/70 mt-1">Insurance reimbursements and prepaid funds</div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setWalletTopup(!walletTopup)}
                className="px-4 py-2 rounded-lg bg-on-tertiary/20 text-sm font-semibold hover:bg-on-tertiary/30 transition-all"
              >
                Top Up
              </button>
              <button className="px-4 py-2 rounded-lg bg-on-tertiary/20 text-sm font-semibold hover:bg-on-tertiary/30 transition-all">
                Withdraw
              </button>
            </div>
          </div>

          {/* Top-up Form */}
          {walletTopup && (
            <div className="bg-surface-container-lowest border border-tertiary rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-on-surface">Top Up Wallet</h4>
              <div className="flex gap-2">
                {[5000, 10000, 25000, 50000].map((amt) => (
                  <button key={amt} className="flex-1 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface hover:border-tertiary hover:bg-tertiary-fixed/30 transition-all">
                    {fmt(amt)}
                  </button>
                ))}
              </div>
              <input type="number" placeholder="Or enter custom amount" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-tertiary" />
              <select className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary">
                <option>Visa •••• 4521 (Default)</option>
                <option>GTBank •••• 7832</option>
                <option>Paystack</option>
              </select>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-tertiary text-on-tertiary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all">Proceed to Pay</button>
                <button onClick={() => setWalletTopup(false)} className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">Cancel</button>
              </div>
            </div>
          )}

          {/* Auto-pay Settings */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-on-surface">Auto-Pay from Wallet</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Automatically pay invoices using wallet balance</p>
              </div>
              <button className="relative w-11 h-6 rounded-full bg-primary transition-colors">
                <span className="absolute left-5 top-0.5 w-5 h-5 rounded-full bg-on-primary transition-transform" />
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-sm font-bold text-on-surface">Transaction History</h3>
            </div>
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-secondary-container/30 text-secondary" : "bg-error-container/50 text-error"}`}>
                  {tx.type === "credit" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-on-surface truncate">{tx.description}</div>
                  <div className="text-xs text-on-surface-variant">{tx.method} · Ref: {tx.ref}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-bold ${tx.type === "credit" ? "text-secondary" : "text-on-surface"}`}>
                    {tx.type === "credit" ? "+" : "-"}{fmt(tx.amount)}
                  </div>
                  <div className="text-[10px] text-on-surface-variant">{tx.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
