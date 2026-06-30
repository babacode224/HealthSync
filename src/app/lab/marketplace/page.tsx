"use client";

import { useState } from "react";

const products = [
  { id: "LMK-001", name: "Complete Blood Count Reagent Kit", vendor: "Sysmex Corporation", category: "Reagents", price: 95000, rating: 4.9, reviews: 178, image: "🧪", inStock: true, description: "Hematology analyzer reagent pack for Sysmex XN-series. 1000-test capacity. NAFDAC compliant.", featured: true },
  { id: "LMK-002", name: "Rapid Malaria Test Kit (Box of 50)", vendor: "SD Biosensor", category: "Test Kits", price: 22500, rating: 4.7, reviews: 456, image: "🦟", inStock: true, description: "Pf/Pan antigen rapid diagnostic test. WHO prequalified. Results in 15 minutes.", featured: true },
  { id: "LMK-003", name: "Centrifuge — 24-Place Digital", vendor: "Eppendorf", category: "Equipment", price: 850000, rating: 4.8, reviews: 34, image: "⚙️", inStock: true, description: "High-speed microcentrifuge with 24-place rotor. Max 15,000 RPM. Digital speed and timer control.", featured: true },
  { id: "LMK-004", name: "Glucose Test Strips (500 ct)", vendor: "Roche Diagnostics", category: "Test Kits", price: 45000, rating: 4.6, reviews: 289, image: "📏", inStock: true, description: "Accu-Chek compatible glucose test strips. Requires 0.6µL sample. 5-second results.", featured: false },
  { id: "LMK-005", name: "Microscope Slides (Box of 72)", vendor: "Corning", category: "Consumables", price: 8500, rating: 4.5, reviews: 523, image: "🔬", inStock: true, description: "Pre-cleaned frosted-end glass microscope slides. 75×25mm. Ground edges for safety.", featured: false },
  { id: "LMK-006", name: "Automated Chemistry Analyzer", vendor: "Roche Cobas", category: "Equipment", price: 4500000, rating: 4.9, reviews: 12, image: "🖥️", inStock: false, description: "Fully automated clinical chemistry system. 800 tests/hour throughput. 60+ assay menu.", featured: false },
  { id: "LMK-007", name: "Pipette Set — Variable Volume", vendor: "Gilson", category: "Equipment", price: 125000, rating: 4.8, reviews: 98, image: "💉", inStock: true, description: "Set of 3 micropipettes: P20 (2-20µL), P200 (20-200µL), P1000 (100-1000µL). Autoclavable.", featured: false },
  { id: "LMK-008", name: "COVID-19 Antigen Test (Box of 25)", vendor: "Abbott", category: "Test Kits", price: 37500, rating: 4.7, reviews: 312, image: "🧫", inStock: true, description: "BinaxNOW rapid antigen test for SARS-CoV-2. Nasal swab collection. 15-minute results.", featured: false },
  { id: "LMK-009", name: "Lab Information System (Annual)", vendor: "HealthSync Digital", category: "Software", price: 250000, rating: 4.9, reviews: 43, image: "💻", inStock: true, description: "Cloud-based LIS with HL7 integration, automated reporting, and quality control dashboards.", featured: false },
  { id: "LMK-010", name: "Calibration Standards Kit", vendor: "Bio-Rad", category: "Reagents", price: 68000, rating: 4.8, reviews: 67, image: "📐", inStock: true, description: "Multi-analyte calibration kit for clinical chemistry analyzers. 12 parameters. Traceable to NIST.", featured: false },
];

const orders = [
  { id: "LO-4521", date: "Jun 26, 2026", items: 4, total: 312500, status: "delivered" },
  { id: "LO-4508", date: "Jun 19, 2026", items: 1, total: 850000, status: "shipped" },
  { id: "LO-4495", date: "Jun 8, 2026", items: 8, total: 178000, status: "delivered" },
  { id: "LO-4482", date: "May 25, 2026", items: 2, total: 163000, status: "delivered" },
];

const categories = [...new Set(products.map(p => p.category))];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-100" },
  shipped: { label: "Shipped", color: "text-blue-700", bg: "bg-blue-100" },
  processing: { label: "Processing", color: "text-amber-700", bg: "bg-amber-100" },
};

type Tab = "browse" | "orders" | "suppliers";

export default function LabMarketplacePage() {
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
    { key: "orders", label: `Lab Orders (${orders.length})` },
    { key: "suppliers", label: "Verified Suppliers" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Lab Marketplace</h1>
        <p className="text-on-surface-variant text-sm mt-1">Reagents, testing kits, lab equipment, and diagnostic software</p>
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
              <input type="text" placeholder="Search reagents, kits, or equipment..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>All ({products.length})</button>
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{c}</button>
              ))}
            </div>

            {!search && categoryFilter === "all" && !productDetail && (
              <div className="bg-gradient-to-r from-tertiary to-amber-700 rounded-2xl p-5 text-white">
                <div className="text-xs font-medium uppercase opacity-70 mb-1">Quality Assurance</div>
                <h2 className="text-lg font-bold">ISO 15189 Certified Supplies</h2>
                <p className="text-sm opacity-70 mt-1">All reagents and kits verified for clinical diagnostic use with traceability documentation.</p>
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
                      {productDetail.featured && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-amber-900">Featured</span>}
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
                    <div className="text-[10px] text-on-surface-variant uppercase">Lead Time</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">3-7 business days</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Certification</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">ISO 15189</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span className="text-xs text-blue-700">NAFDAC verified · ISO certified · Lot traceability · Cold-chain where required</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {productDetail.inStock ? (
                    <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add to Order</button>
                  ) : (
                    <button className="flex-1 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-medium cursor-not-allowed">Out of Stock — Request ETA</button>
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
              <div className="text-xl font-bold text-on-surface mt-1">₦1,503,500</div>
              <div className="text-[10px] text-amber-600 mt-0.5">↑ 12% vs last month</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
              <div className="text-xs text-on-surface-variant">Orders This Month</div>
              <div className="text-xl font-bold text-on-surface mt-1">4</div>
              <div className="text-[10px] text-on-surface-variant mt-0.5">2 delivered, 1 shipped, 1 processing</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4">
              <div className="text-xs text-on-surface-variant">Quality Score</div>
              <div className="text-xl font-bold text-on-surface mt-1">99.2%</div>
              <div className="text-[10px] text-green-600 mt-0.5">All lots passed QC</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-container-low text-xs text-on-surface-variant"><th className="text-left px-4 py-3 font-medium">Order ID</th><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Items</th><th className="text-left px-4 py-3 font-medium">Total</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Action</th></tr></thead>
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
            { name: "Sysmex Corporation", type: "Hematology & Diagnostics", rating: 4.9, orders: 28, products: 65, deliveryAvg: "4.5 days", avatar: "SY", verified: true },
            { name: "Roche Diagnostics", type: "Clinical Chemistry & Immunoassay", rating: 4.8, orders: 35, products: 110, deliveryAvg: "3.8 days", avatar: "RD", verified: true },
            { name: "Bio-Rad Laboratories", type: "Quality Control & Calibration", rating: 4.8, orders: 15, products: 40, deliveryAvg: "5.1 days", avatar: "BR", verified: true },
            { name: "SD Biosensor", type: "Rapid Diagnostic Tests", rating: 4.7, orders: 22, products: 35, deliveryAvg: "2.5 days", avatar: "SD", verified: true },
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
