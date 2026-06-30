"use client";

import { useState } from "react";

const products = [
  { id: "MKT-001", name: "Littmann Classic III Stethoscope", vendor: "3M Health Care", category: "Diagnostic", price: 85000, rating: 4.8, reviews: 234, image: "🩺", inStock: true, description: "Premium acoustic stethoscope with dual-sided chestpiece. Ideal for general practice.", featured: true },
  { id: "MKT-002", name: "Omron HEM-7156 BP Monitor", vendor: "Omron Healthcare", category: "Monitoring", price: 42000, rating: 4.7, reviews: 189, image: "💓", inStock: true, description: "Automatic upper arm blood pressure monitor with IntelliSense technology. Clinically validated.", featured: true },
  { id: "MKT-003", name: "Accu-Chek Active Glucometer Kit", vendor: "Roche Diabetes", category: "Diagnostic", price: 18500, rating: 4.6, reviews: 312, image: "🩸", inStock: true, description: "Blood glucose monitoring system with easy-to-use test strips. 5-second results.", featured: false },
  { id: "MKT-004", name: "Welch Allyn Pocket Otoscope", vendor: "Hillrom", category: "Diagnostic", price: 65000, rating: 4.9, reviews: 87, image: "👂", inStock: true, description: "Fiber optic pocket otoscope with halogen illumination. Includes specula set.", featured: false },
  { id: "MKT-005", name: "Surgical Gloves (Box of 100)", vendor: "Medline Industries", category: "PPE", price: 8500, rating: 4.5, reviews: 456, image: "🧤", inStock: true, description: "Powder-free nitrile examination gloves. NAFDAC approved. Multiple sizes available.", featured: false },
  { id: "MKT-006", name: "Pulse Oximeter — Fingertip", vendor: "Masimo", category: "Monitoring", price: 32000, rating: 4.7, reviews: 198, image: "📊", inStock: false, description: "Medical-grade pulse oximeter with plethysmograph waveform display. SpO₂ and pulse rate.", featured: false },
  { id: "MKT-007", name: "Disposable Face Masks (Box of 50)", vendor: "Kimberly-Clark", category: "PPE", price: 4500, rating: 4.3, reviews: 678, image: "😷", inStock: true, description: "3-ply surgical face masks with ear loops. Bacterial filtration efficiency >98%.", featured: false },
  { id: "MKT-008", name: "Digital Infrared Thermometer", vendor: "Braun ThermoScan", category: "Diagnostic", price: 25000, rating: 4.6, reviews: 145, image: "🌡️", inStock: true, description: "Non-contact infrared forehead thermometer. 1-second reading. Memory for 32 readings.", featured: true },
  { id: "MKT-009", name: "Examination Table — Hydraulic", vendor: "Clinton Industries", category: "Furniture", price: 450000, rating: 4.8, reviews: 34, image: "🛏️", inStock: true, description: "Height-adjustable hydraulic exam table with padded cushion. Weight capacity 230kg.", featured: false },
  { id: "MKT-010", name: "EMR Software License (Annual)", vendor: "HealthSync Digital", category: "Software", price: 180000, rating: 4.9, reviews: 67, image: "💻", inStock: true, description: "Full-featured electronic medical records system. HIPAA compliant. Cloud-based with offline mode.", featured: false },
];

const orders = [
  { id: "ORD-3401", date: "Jun 25, 2026", items: 3, total: 135500, status: "delivered" },
  { id: "ORD-3392", date: "Jun 18, 2026", items: 1, total: 450000, status: "shipped" },
  { id: "ORD-3380", date: "Jun 10, 2026", items: 5, total: 58000, status: "delivered" },
  { id: "ORD-3365", date: "May 28, 2026", items: 2, total: 107000, status: "delivered" },
];

const categories = [...new Set(products.map(p => p.category))];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-100" },
  shipped: { label: "Shipped", color: "text-blue-700", bg: "bg-blue-100" },
  processing: { label: "Processing", color: "text-amber-700", bg: "bg-amber-100" },
};

type Tab = "browse" | "orders" | "saved";

export default function DoctorMarketplacePage() {
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
  const featured = products.filter(p => p.featured);

  const tabs: { key: Tab; label: string }[] = [
    { key: "browse", label: "Browse Products" },
    { key: "orders", label: `Orders (${orders.length})` },
    { key: "saved", label: "Saved Items" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Medical Marketplace</h1>
        <p className="text-on-surface-variant text-sm mt-1">Equipment, supplies, and software for your practice</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedProduct(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Browse Tab */}
      {tab === "browse" && (
        <div className="flex gap-6">
          <div className={`${productDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Search products or vendors..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>All ({products.length})</button>
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{c}</button>
              ))}
            </div>

            {/* Featured Banner (only when no filter/search) */}
            {!search && categoryFilter === "all" && !productDetail && (
              <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-5 text-white">
                <div className="text-xs font-medium uppercase opacity-70 mb-1">Featured This Week</div>
                <h2 className="text-lg font-bold">New Arrivals for Your Practice</h2>
                <p className="text-sm opacity-70 mt-1">{featured.length} top-rated products handpicked for healthcare professionals.</p>
              </div>
            )}

            {/* Product Grid */}
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

          {/* Product Detail */}
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
                    <div className="text-[10px] text-on-surface-variant uppercase">Delivery</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">2-5 business days</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="text-[10px] text-on-surface-variant uppercase">Warranty</div>
                    <div className="text-sm font-medium text-on-surface mt-0.5">12 months</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span className="text-xs text-green-700">NAFDAC verified · Bulk pricing available · Eligible for equipment loan financing</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {productDetail.inStock ? (
                    <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Add to Cart</button>
                  ) : (
                    <button className="flex-1 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-medium cursor-not-allowed">Out of Stock</button>
                  )}
                  <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
                  </button>
                </div>
                {productDetail.inStock && (
                  <button className="w-full px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Buy Now — ₦{productDetail.price.toLocaleString()}</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Order History</h2>
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

      {/* Saved Tab */}
      {tab === "saved" && (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-outline mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
          <h3 className="font-semibold text-on-surface">No saved items</h3>
          <p className="text-sm text-on-surface-variant mt-1">Bookmark products to save them for later.</p>
          <button onClick={() => setTab("browse")} className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Browse Products</button>
        </div>
      )}
    </div>
  );
}
