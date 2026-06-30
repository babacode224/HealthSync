"use client";

import { useState } from "react";

type View = "stock" | "expiring" | "reorder" | "suppliers";

interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  batchNo: string;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
  expiryDate: string;
  daysToExpiry: number;
  supplier: string;
  location: string;
  status: "in-stock" | "low" | "critical" | "expired";
  lastRestocked: string;
}

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  location: string;
  drugs: number;
  rating: number;
  lastOrder: string;
  deliveryTime: string;
}

const drugs: Drug[] = [
  { id: "D001", name: "Amoxicillin 500mg", genericName: "Amoxicillin", category: "Antibiotics", batchNo: "BN-2026-0415", quantity: 850, reorderLevel: 200, unitPrice: 150, expiryDate: "Dec 2027", daysToExpiry: 548, supplier: "Emzor Pharma", location: "Shelf A-3", status: "in-stock", lastRestocked: "June 20, 2026" },
  { id: "D002", name: "Metformin 1000mg", genericName: "Metformin HCl", category: "Antidiabetics", batchNo: "BN-2026-0388", quantity: 420, reorderLevel: 150, unitPrice: 200, expiryDate: "Sep 2027", daysToExpiry: 456, supplier: "Fidson Healthcare", location: "Shelf B-1", status: "in-stock", lastRestocked: "June 15, 2026" },
  { id: "D003", name: "Lisinopril 10mg", genericName: "Lisinopril", category: "Antihypertensives", batchNo: "BN-2026-0290", quantity: 75, reorderLevel: 100, unitPrice: 350, expiryDate: "Mar 2027", daysToExpiry: 273, supplier: "May & Baker", location: "Shelf B-4", status: "low", lastRestocked: "May 28, 2026" },
  { id: "D004", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "GI / Antacids", batchNo: "BN-2026-0512", quantity: 620, reorderLevel: 200, unitPrice: 180, expiryDate: "Nov 2027", daysToExpiry: 517, supplier: "Swiss Pharma", location: "Shelf A-6", status: "in-stock", lastRestocked: "June 18, 2026" },
  { id: "D005", name: "Atorvastatin 20mg", genericName: "Atorvastatin", category: "Statins", batchNo: "BN-2025-1180", quantity: 30, reorderLevel: 80, unitPrice: 450, expiryDate: "Aug 2026", daysToExpiry: 62, supplier: "Emzor Pharma", location: "Shelf C-2", status: "critical", lastRestocked: "April 10, 2026" },
  { id: "D006", name: "Salbutamol Inhaler 100mcg", genericName: "Salbutamol", category: "Respiratory", batchNo: "BN-2026-0345", quantity: 55, reorderLevel: 50, unitPrice: 2500, expiryDate: "Jan 2028", daysToExpiry: 578, supplier: "GlaxoSmithKline", location: "Shelf D-1", status: "low", lastRestocked: "June 1, 2026" },
  { id: "D007", name: "Paracetamol 500mg", genericName: "Acetaminophen", category: "Analgesics", batchNo: "BN-2026-0601", quantity: 2400, reorderLevel: 500, unitPrice: 50, expiryDate: "Oct 2028", daysToExpiry: 851, supplier: "Emzor Pharma", location: "Shelf A-1", status: "in-stock", lastRestocked: "June 22, 2026" },
  { id: "D008", name: "Ciprofloxacin 500mg", genericName: "Ciprofloxacin", category: "Antibiotics", batchNo: "BN-2025-0988", quantity: 12, reorderLevel: 100, unitPrice: 280, expiryDate: "July 2026", daysToExpiry: 30, supplier: "Fidson Healthcare", location: "Shelf A-4", status: "critical", lastRestocked: "March 5, 2026" },
  { id: "D009", name: "Insulin Glargine 100IU/mL", genericName: "Insulin Glargine", category: "Antidiabetics", batchNo: "BN-2026-0420", quantity: 28, reorderLevel: 30, unitPrice: 8500, expiryDate: "Feb 2027", daysToExpiry: 245, supplier: "Sanofi", location: "Fridge F-1", status: "critical", lastRestocked: "June 5, 2026" },
  { id: "D010", name: "Artemether/Lumefantrine", genericName: "ACT Combo", category: "Antimalarials", batchNo: "BN-2026-0555", quantity: 380, reorderLevel: 200, unitPrice: 800, expiryDate: "May 2028", daysToExpiry: 700, supplier: "Swiss Pharma", location: "Shelf E-2", status: "in-stock", lastRestocked: "June 12, 2026" },
  { id: "D011", name: "Diazepam 5mg", genericName: "Diazepam", category: "CNS / Sedatives", batchNo: "BN-2025-0750", quantity: 0, reorderLevel: 40, unitPrice: 120, expiryDate: "Sep 2026", daysToExpiry: 92, supplier: "May & Baker", location: "Controlled C-1", status: "critical", lastRestocked: "Feb 15, 2026" },
  { id: "D012", name: "Losartan 50mg", genericName: "Losartan", category: "Antihypertensives", batchNo: "BN-2026-0480", quantity: 190, reorderLevel: 100, unitPrice: 300, expiryDate: "Apr 2028", daysToExpiry: 670, supplier: "Fidson Healthcare", location: "Shelf B-5", status: "in-stock", lastRestocked: "June 8, 2026" },
];

const suppliers: Supplier[] = [
  { id: "S001", name: "Emzor Pharmaceutical", contact: "+234 801 234 5678", email: "orders@emzor.ng", location: "Lagos, Nigeria", drugs: 3, rating: 4.8, lastOrder: "June 22, 2026", deliveryTime: "2-3 days" },
  { id: "S002", name: "Fidson Healthcare", contact: "+234 802 345 6789", email: "supply@fidson.ng", location: "Lagos, Nigeria", drugs: 3, rating: 4.6, lastOrder: "June 15, 2026", deliveryTime: "2-4 days" },
  { id: "S003", name: "May & Baker Nigeria", contact: "+234 803 456 7890", email: "pharma@maybaker.ng", location: "Lagos, Nigeria", drugs: 2, rating: 4.5, lastOrder: "May 28, 2026", deliveryTime: "3-5 days" },
  { id: "S004", name: "Swiss Pharma Nigeria", contact: "+234 804 567 8901", email: "sales@swisspharma.ng", location: "Lagos, Nigeria", drugs: 2, rating: 4.7, lastOrder: "June 18, 2026", deliveryTime: "1-3 days" },
  { id: "S005", name: "GlaxoSmithKline Nigeria", contact: "+234 805 678 9012", email: "orders@gsk.ng", location: "Lagos, Nigeria", drugs: 1, rating: 4.9, lastOrder: "June 1, 2026", deliveryTime: "5-7 days" },
  { id: "S006", name: "Sanofi Nigeria", contact: "+234 806 789 0123", email: "supply@sanofi.ng", location: "Lagos, Nigeria", drugs: 1, rating: 4.8, lastOrder: "June 5, 2026", deliveryTime: "3-5 days" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  "in-stock": { label: "IN STOCK", color: "bg-secondary-container/30 text-secondary" },
  low: { label: "LOW STOCK", color: "bg-tertiary-fixed/30 text-tertiary" },
  critical: { label: "CRITICAL", color: "bg-error-container/50 text-error" },
  expired: { label: "EXPIRED", color: "bg-error text-on-error" },
};

export default function InventoryPage() {
  const [view, setView] = useState<View>("stock");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const categories = ["all", ...Array.from(new Set(drugs.map((d) => d.category)))];

  const filtered = drugs.filter((d) => {
    const matchesCat = catFilter === "all" || d.category === catFilter;
    const matchesSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.genericName.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const expiringSoon = drugs.filter((d) => d.daysToExpiry <= 90).sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const needsReorder = drugs.filter((d) => d.quantity <= d.reorderLevel).sort((a, b) => a.quantity / a.reorderLevel - b.quantity / b.reorderLevel);

  const stats = {
    total: drugs.length,
    inStock: drugs.filter((d) => d.status === "in-stock").length,
    low: drugs.filter((d) => d.status === "low").length,
    critical: drugs.filter((d) => d.status === "critical").length,
    totalValue: drugs.reduce((sum, d) => sum + d.quantity * d.unitPrice, 0),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Inventory</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Drug stock management and supplier tracking</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-xs text-on-surface-variant font-medium mt-0.5">Total Items</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{stats.inStock}</div>
          <div className="text-xs text-on-surface-variant font-medium mt-0.5">In Stock</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-error">{stats.low + stats.critical}</div>
          <div className="text-xs text-on-surface-variant font-medium mt-0.5">Need Attention</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-primary">₦{(stats.totalValue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-on-surface-variant font-medium mt-0.5">Stock Value</div>
        </div>
      </div>

      {/* Alerts */}
      {stats.critical > 0 && (
        <div className="bg-error-container/20 border border-error/20 rounded-xl p-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-error shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          <span className="text-sm font-semibold text-error">{stats.critical} items at critical stock level — immediate reorder required</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
        {([
          { key: "stock" as View, label: "All Stock" },
          { key: "expiring" as View, label: `Expiring Soon (${expiringSoon.length})` },
          { key: "reorder" as View, label: `Reorder (${needsReorder.length})` },
          { key: "suppliers" as View, label: "Suppliers" },
        ]).map((t) => (
          <button key={t.key} onClick={() => setView(t.key)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${view === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* All Stock */}
      {view === "stock" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search drugs by name or ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all capitalize ${catFilter === c ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-low"}`}>
                {c === "all" ? "All Categories" : c}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {filtered.map((d) => {
              const sc = statusConfig[d.status];
              const stockPercent = Math.min(100, (d.quantity / (d.reorderLevel * 3)) * 100);
              return (
                <button key={d.id} onClick={() => setSelectedDrug(selectedDrug?.id === d.id ? null : d)} className="w-full flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors text-left">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${d.status === "critical" ? "bg-error/10 text-error" : d.status === "low" ? "bg-tertiary-fixed/30 text-tertiary" : "bg-primary/10 text-primary"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface truncate">{d.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${sc.color}`}>{sc.label}</span>
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{d.category} · {d.location} · Batch: {d.batchNo}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 max-w-[120px] h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.status === "critical" ? "bg-error" : d.status === "low" ? "bg-tertiary" : "bg-secondary"}`} style={{ width: `${stockPercent}%` }} />
                      </div>
                      <span className="text-[10px] text-on-surface-variant">{d.quantity} units</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-sm font-bold text-on-surface">₦{d.unitPrice.toLocaleString()}</div>
                    <div className="text-[10px] text-on-surface-variant">Exp: {d.expiryDate}</div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-sm text-on-surface-variant">No drugs match your search.</div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedDrug && (
            <div className="bg-surface-container-lowest border border-primary/30 rounded-xl overflow-hidden">
              <div className="bg-primary px-5 py-3 text-on-primary">
                <h3 className="font-bold">{selectedDrug.name}</h3>
                <div className="text-xs text-on-primary/70">{selectedDrug.genericName} · {selectedDrug.id}</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div><span className="text-xs text-on-surface-variant block">Quantity</span><span className="font-bold text-on-surface">{selectedDrug.quantity} units</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Reorder Level</span><span className="font-bold text-on-surface">{selectedDrug.reorderLevel} units</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Unit Price</span><span className="font-bold text-on-surface">₦{selectedDrug.unitPrice.toLocaleString()}</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Batch Number</span><span className="font-bold text-on-surface">{selectedDrug.batchNo}</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Expiry Date</span><span className={`font-bold ${selectedDrug.daysToExpiry <= 90 ? "text-error" : "text-on-surface"}`}>{selectedDrug.expiryDate} ({selectedDrug.daysToExpiry}d)</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Supplier</span><span className="font-bold text-on-surface">{selectedDrug.supplier}</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Location</span><span className="font-bold text-on-surface">{selectedDrug.location}</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Last Restocked</span><span className="font-bold text-on-surface">{selectedDrug.lastRestocked}</span></div>
                  <div><span className="text-xs text-on-surface-variant block">Stock Value</span><span className="font-bold text-on-surface">₦{(selectedDrug.quantity * selectedDrug.unitPrice).toLocaleString()}</span></div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Reorder from Supplier</button>
                  <button className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all">Update Quantity</button>
                  <button className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-medium text-on-surface hover:bg-surface-container-low transition-all">Edit Details</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Expiring Soon */}
      {view === "expiring" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant">
            <h3 className="text-sm font-bold text-on-surface">Expiring Within 90 Days</h3>
          </div>
          {expiringSoon.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-on-surface-variant">No drugs expiring soon.</div>
          ) : expiringSoon.map((d) => (
            <div key={d.id} className="flex items-center gap-3 px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${d.daysToExpiry <= 30 ? "bg-error/10 text-error" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                {d.daysToExpiry}d
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-on-surface">{d.name}</div>
                <div className="text-xs text-on-surface-variant">Batch: {d.batchNo} · {d.quantity} units · {d.location}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-sm font-bold ${d.daysToExpiry <= 30 ? "text-error" : "text-tertiary"}`}>{d.expiryDate}</div>
                <div className="text-[10px] text-on-surface-variant">₦{(d.quantity * d.unitPrice).toLocaleString()} at risk</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reorder */}
      {view === "reorder" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Items Below Reorder Level ({needsReorder.length})</h3>
              <button className="text-xs font-semibold text-primary hover:underline">Generate Purchase Order</button>
            </div>
            {needsReorder.map((d) => {
              const deficit = d.reorderLevel - d.quantity;
              return (
                <div key={d.id} className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${d.quantity === 0 ? "bg-error text-on-error" : "bg-error/10 text-error"}`}>
                    {d.quantity === 0 ? "!!" : d.quantity}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-on-surface">{d.name}</div>
                    <div className="text-xs text-on-surface-variant">{d.supplier} · Reorder level: {d.reorderLevel} · Deficit: {deficit > 0 ? deficit : 0} units</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 max-w-[150px] h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full" style={{ width: `${Math.min(100, (d.quantity / d.reorderLevel) * 100)}%` }} />
                      </div>
                      <span className="text-[10px] text-error font-semibold">{Math.round((d.quantity / d.reorderLevel) * 100)}% of reorder level</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all shrink-0">Reorder</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Suppliers */}
      {view === "suppliers" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">Registered Suppliers ({suppliers.length})</h3>
              <button className="text-xs font-semibold text-primary hover:underline">+ Add Supplier</button>
            </div>
            {suppliers.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant last:border-0 hover:bg-surface-container-low/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-on-surface">{s.name}</div>
                  <div className="text-xs text-on-surface-variant">{s.location} · {s.drugs} drugs supplied · Delivery: {s.deliveryTime}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{s.contact} · {s.email}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-tertiary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <span className="text-sm font-bold text-on-surface">{s.rating}</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant mt-0.5">Last order: {s.lastOrder}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
