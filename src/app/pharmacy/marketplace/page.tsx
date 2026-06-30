"use client";

import { useState } from "react";

const products = [
  { id: "PMK-001", name: "Amoxicillin 500mg (Box of 100)", vendor: "GlaxoSmithKline", category: "Medications", price: 12500, rating: 4.8, reviews: 412, image: "💊", inStock: true, description: "Broad-spectrum antibiotic capsules. NAFDAC Reg. No. A4-0912. Shelf life 24 months.", nafdac: "A4-0912", featured: true },
  { id: "PMK-002", name: "Metformin 850mg (Box of 60)", vendor: "Sanofi", category: "Medications", price: 8200, rating: 4.7, reviews: 298, image: "💊", inStock: true, description: "Oral antidiabetic medication for Type 2 diabetes management. NAFDAC approved.", nafdac: "A4-1145", featured: false },
  { id: "PMK-003", name: "Digital Pill Counter & Tray", vendor: "Rx Count", category: "Dispensing", price: 45000, rating: 4.9, reviews: 67, image: "⚖️", inStock: true, description: "Electronic counting tray with anti-static surface. Counts up to 999 pills per batch.", featured: true },
  { id: "PMK-004", name: "Amber Prescription Vials (500 ct)", vendor: "HealthPack Nigeria", category: "Packaging", price: 18000, rating: 4.5, reviews: 189, image: "🧴", inStock: true, description: "Child-resistant amber vials with snap caps. Multiple sizes: 20DR, 30DR, 40DR, 60DR.", featured: false },
  { id: "PMK-005", name: "Pharmacy Refrigerator — 350L", vendor: "Haier Biomedical", category: "Equipment", price: 680000, rating: 4.8, reviews: 23, image: "❄️", inStock: true, description: "Medical-grade pharmacy refrigerator. 2-8°C range with digital temp logging and alarm system.", featured: true },
  { id: "PMK-006", name: "Lisinopril 10mg (Box of 100)", vendor: "AstraZeneca", category: "Medications", price: 9800, rating: 4.6, reviews: 267, image: "💊", inStock: false, description: "ACE inhibitor for hypertension management. NAFDAC registered.", nafdac: "A4-0834", featured: false },
  { id: "PMK-007", name: "Dispensing Labels (Roll of 1000)", vendor: "Label King", category: "Packaging", price: 6500, rating: 4.4, reviews: 345, image: "🏷️", inStock: true, description: "Pre-printed prescription labels with patient info fields, dosage instructions, and warning icons.", featured: false },
  { id: "PMK-008", name: "Mortar & Pestle Set — Porcelain", vendor: "Cole-Parmer", category: "Dispensing", price: 15000, rating: 4.7, reviews: 89, image: "⚗️", inStock: true, description: "Professional-grade porcelain mortar and pestle for compounding. 200mL capacity.", featured: false },
  { id: "PMK-009", name: "Drug Interaction Database (Annual)", vendor: "HealthSync Digital", category: "Software", price: 120000, rating: 4.9, reviews: 56, image: "💻", inStock: true, description: "AI-powered drug interaction checker with real-time alerts. Covers 25,000+ drug combinations. NAFDAC integrated.", featured: false },
  { id: "PMK-010", name: "Insulin Storage Box — Portable", vendor: "MedCool", category: "Equipment", price: 35000, rating: 4.6, reviews: 134, image: "🧊", inStock: true, description: "Battery-powered insulin cooler maintaining 2-8°C for 72 hours. TSA-approved for travel.", featured: false },
];

const orders = [
  { id: "PO-7821", date: "Jun 27, 2026", items: 8, total: 245000, status: "delivered" },
  { id: "PO-7809", date: "Jun 20, 2026", items: 3, total: 680000, status: "shipped" },
  { id: "PO-7795", date: "Jun 12, 2026", items: 12, total: 156000, status: "delivered" },
  { id: "PO-7780", date: "May 30, 2026", items: 5, total: 92500, status: "delivered" },
  { id: "PO-7768", date: "May 22, 2026", items: 2, total: 55000, status: "delivered" },
];

const categories = [...new Set(products.map(p => p.category))];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-100" },
  shipped: { label: "Shipped", color: "text-blue-700", bg: "bg-blue-100" },
  processing: { label: "Processing", color: "text-amber-700", bg: "bg-amber-100" },
};

type Tab = "browse" | "orders" | "suppliers";

export default function PharmacyMarketplacePage() {
  const [tab, setTab] = useState<Tab>("browse");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.vendor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const productDetail = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "browse", label: "Browse Catalog" },
    { key: "orders", label: `Purchase Orders (${orders.length})` },
    { key: "suppliers", label: "Preferred Suppliers" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Pharmacy Marketplace</h1>
        <p className="text-on-surface-variant text-sm mt-1">Medications, dispensing supplies, and pharmacy equipment</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedProduct(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="flex gap-6">
          <div className={`${productDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Search medications, supplies, or vendors..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>All ({products.length})</button>
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{c}</button>
              ))}
            </div>

            {!search && categoryFilter === "all" && !productDetail && (
              <div className="bg-gradient-to-r from-secondary to-green-700 rounded-2xl p-5 text-white">
                <div className="text-xs font-medium uppercase opacity-70 mb-1">Bulk Ordering Available</div>
                <h2 className="text-lg font-bold">Save Up to 30% on Bulk Orders</h2>
                <p className="text-sm opacity-70 mt-1">NAFDAC-verified medications and supplies with guaranteed cold-chain delivery.</p>
              </div>
            )}

            <div className={`grid ${productDetail ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-3`}>
              {filtered.map(p => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)} className={`text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedProduct === p.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{p.image}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-on-surface text-sm truncate">{p.name}</h3>
                      <div className="text-xs text-on-surface-variant">{p.vendor}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-bold text-primary">₦{p.price.toLocaleString()}</span>
                        <span className="text-xs text-amber-600">★ {p.rating}</span>
                        <span className="text-[10px] text-on-surface-variant">({p.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">{p.category}</span>
                        {!p.inStock && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700">Out of Stock</span>}
                        {p.nafdac && <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">NAFDAC</span>}
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
                      <span className="text-3xl">{productDetail.image}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">{productDetail.category}</span>
                      {productDetail.nafdac && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-400 text-green-900">NAFDAC {productDetail.nafdac}</span>}
                    </div>
                    <h3 className="text-on-primary font-bold text-lg mt-2">{productDetail.name}</h3>
                    <p className="text-on-primary/70 text-sm">{productDetail.vendor}</p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">₦{productDetail.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-500">{"★".repeat(Math.floor(productDetail.rating))}{"☆".repeat(5 - Math.floor(productDetail.rating))}</span>
                      <span className="text-sm font-medium text-on-surface">{productDetail.rating}</span>
                      <span className="text-xs text-on-surface-variant">({productDetail.reviews} reviews)</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${productDetail.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{productDetail.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Description</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{productDetail.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Category</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{productDetail.category}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Vendor</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">{productDetail.vendor}</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Delivery</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">1-3 business days</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Min. Order</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">1 unit</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span className="text-xs text-green-700">NAFDAC verified · Cold-chain delivery · Bulk discounts available · Returns within 30 days</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {productDetail.inStock ? (
                    <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add to Order</button>
                  ) : (
                    <button className="flex-1 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-medium cursor-not-allowed">Out of Stock</button>
                  )}
                  <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
                  </button>
                </div>
                {productDetail.inStock && (
                  <button className="w-full px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Request Bulk Quote</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
              <div className="text-xs text-on-surface-variant">Total Spend (MTD)</div>
              <div className="text-xl font-bold text-on-surface mt-1">₦1,228,500</div>
              <div className="text-[10px] text-green-600 mt-0.5">↓ 8% vs last month</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
              <div className="text-xs text-on-surface-variant">Orders This Month</div>
              <div className="text-xl font-bold text-on-surface mt-1">5</div>
              <div className="text-[10px] text-on-surface-variant mt-0.5">3 delivered, 1 shipped, 1 processing</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
              <div className="text-xs text-on-surface-variant">Avg. Delivery Time</div>
              <div className="text-xl font-bold text-on-surface mt-1">2.1 days</div>
              <div className="text-[10px] text-green-600 mt-0.5">↓ 0.3 days improvement</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">PO Number</th><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Items</th><th className="text-left px-4 py-3 font-medium">Total</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Action</th></tr></thead>
              <tbody>
                {orders.map(o => {
                  const st = statusConfig[o.status];
                  return (
                    <tr key={o.id} className="border-t border-outline-variant hover:bg-surface-container-low/50">
                      <td className="px-4 py-3 text-sm font-mono font-medium text-primary">{o.id}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{o.date}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{o.items} items</td>
                      <td className="px-4 py-3 text-sm font-medium text-on-surface">₦{o.total.toLocaleString()}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.color}`}>{st.label}</span></td>
                      <td className="px-4 py-3"><button className="text-xs text-primary font-medium hover:underline">View Details</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "suppliers" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { name: "GlaxoSmithKline Nigeria", type: "Pharmaceutical Manufacturer", rating: 4.9, orders: 45, products: 120, deliveryAvg: "1.8 days", avatar: "GS", verified: true },
            { name: "Sanofi West Africa", type: "Pharmaceutical Manufacturer", rating: 4.8, orders: 32, products: 85, deliveryAvg: "2.1 days", avatar: "SA", verified: true },
            { name: "HealthPack Nigeria", type: "Medical Packaging Supplier", rating: 4.6, orders: 18, products: 45, deliveryAvg: "1.5 days", avatar: "HP", verified: true },
            { name: "Haier Biomedical", type: "Medical Equipment", rating: 4.7, orders: 5, products: 30, deliveryAvg: "5.2 days", avatar: "HB", verified: true },
          ].map(s => (
            <div key={s.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">{s.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-on-surface">{s.name}</h3>
                    {s.verified && <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  </div>
                  <p className="text-xs text-on-surface-variant">{s.type}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                    <span className="text-amber-600">★ {s.rating}</span>
                    <span>{s.orders} orders</span>
                    <span>{s.products} products</span>
                    <span>Avg. {s.deliveryAvg}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium hover:opacity-90 transition-all">View Catalog</button>
                    <button className="px-3 py-1.5 bg-surface-container-low text-on-surface rounded-lg text-xs font-medium hover:bg-surface-container transition-all border border-outline-variant">Contact</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
