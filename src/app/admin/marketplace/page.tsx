"use client";

import { useState } from "react";

const vendors = [
  { id: "VND-001", name: "MedEquip Nigeria Ltd", category: "Medical Equipment", status: "verified", products: 24, revenue: 4250000, rating: 4.8, joinDate: "2025-08-15", contact: "sales@medequip.ng", logo: "ME" },
  { id: "VND-002", name: "PharmaCare Supplies", category: "Pharmaceuticals", status: "verified", products: 67, revenue: 8120000, rating: 4.6, joinDate: "2025-06-22", contact: "info@pharmacare.ng", logo: "PC" },
  { id: "VND-003", name: "LabTech Solutions", category: "Lab Supplies", status: "pending", products: 12, revenue: 0, rating: 0, joinDate: "2026-06-20", contact: "hello@labtech.ng", logo: "LT" },
  { id: "VND-004", name: "AfriHealth Devices", category: "Medical Devices", status: "verified", products: 31, revenue: 3890000, rating: 4.3, joinDate: "2025-11-03", contact: "support@afrihealth.ng", logo: "AH" },
  { id: "VND-005", name: "NutriWell Africa", category: "Supplements", status: "suspended", products: 8, revenue: 1240000, rating: 3.2, joinDate: "2025-09-10", contact: "admin@nutriwell.ng", logo: "NW" },
  { id: "VND-006", name: "SurgTool Pro", category: "Surgical Instruments", status: "pending", products: 5, revenue: 0, rating: 0, joinDate: "2026-06-25", contact: "info@surgtool.ng", logo: "SP" },
];

const listings = [
  { id: "LST-001", name: "Digital Blood Pressure Monitor", vendor: "MedEquip Nigeria Ltd", category: "Medical Equipment", price: 45000, status: "approved", stock: 142, sold: 89, rating: 4.7, image: "BP", flagged: false },
  { id: "LST-002", name: "Portable Pulse Oximeter", vendor: "MedEquip Nigeria Ltd", category: "Medical Devices", price: 28000, status: "approved", stock: 230, sold: 156, rating: 4.9, image: "PO", flagged: false },
  { id: "LST-003", name: "Amoxicillin 500mg (100 Caps)", vendor: "PharmaCare Supplies", category: "Pharmaceuticals", price: 12500, status: "approved", stock: 500, sold: 423, rating: 4.5, image: "AM", flagged: false },
  { id: "LST-004", name: "Surgical Gloves (Box of 100)", vendor: "PharmaCare Supplies", category: "Consumables", price: 8500, status: "approved", stock: 890, sold: 712, rating: 4.4, image: "SG", flagged: false },
  { id: "LST-005", name: "Premium Multivitamin Complex", vendor: "NutriWell Africa", category: "Supplements", price: 15000, status: "suspended", stock: 45, sold: 12, rating: 2.8, image: "MV", flagged: true },
  { id: "LST-006", name: "Lab Centrifuge Mini", vendor: "LabTech Solutions", category: "Lab Equipment", price: 185000, status: "pending", stock: 8, sold: 0, rating: 0, image: "LC", flagged: false },
  { id: "LST-007", name: "Infrared Thermometer Pro", vendor: "AfriHealth Devices", category: "Medical Devices", price: 18500, status: "approved", stock: 310, sold: 267, rating: 4.6, image: "IT", flagged: false },
  { id: "LST-008", name: "Wound Care Dressing Kit", vendor: "AfriHealth Devices", category: "Consumables", price: 6500, status: "pending", stock: 200, sold: 0, rating: 0, image: "WC", flagged: false },
  { id: "LST-009", name: "Herbal Immune Booster", vendor: "NutriWell Africa", category: "Supplements", price: 9800, status: "rejected", stock: 0, sold: 0, rating: 0, image: "HI", flagged: true },
  { id: "LST-010", name: "Stainless Steel Scalpel Set", vendor: "SurgTool Pro", category: "Surgical Instruments", price: 42000, status: "pending", stock: 15, sold: 0, rating: 0, image: "SS", flagged: false },
];

const flaggedItems = [
  { id: "FLG-001", listingId: "LST-005", name: "Premium Multivitamin Complex", vendor: "NutriWell Africa", reason: "Misleading health claims", reports: 8, date: "2026-06-22", severity: "high", details: "Product listing contains unverified claims about curing diseases. NAFDAC registration not confirmed." },
  { id: "FLG-002", listingId: "LST-009", name: "Herbal Immune Booster", vendor: "NutriWell Africa", reason: "Unregistered product", reports: 12, date: "2026-06-18", severity: "critical", details: "Product lacks NAFDAC registration number. Contains unverified ingredients. Multiple customer complaints about adverse effects." },
  { id: "FLG-003", listingId: "LST-003", name: "Amoxicillin 500mg (100 Caps)", vendor: "PharmaCare Supplies", reason: "Price discrepancy", reports: 3, date: "2026-06-25", severity: "low", details: "Price is significantly below market average. May indicate counterfeit product or pricing error." },
  { id: "FLG-004", listingId: "LST-007", name: "Infrared Thermometer Pro", vendor: "AfriHealth Devices", reason: "Accuracy complaints", reports: 5, date: "2026-06-24", severity: "medium", details: "Multiple users report inconsistent readings. Vendor has been notified and is investigating." },
];

const categories = [
  { name: "Medical Equipment", count: 24, revenue: 4250000 },
  { name: "Pharmaceuticals", count: 67, revenue: 8120000 },
  { name: "Medical Devices", count: 31, revenue: 3890000 },
  { name: "Lab Supplies", count: 12, revenue: 920000 },
  { name: "Consumables", count: 45, revenue: 2340000 },
  { name: "Supplements", count: 8, revenue: 1240000 },
  { name: "Surgical Instruments", count: 5, revenue: 680000 },
];

type Tab = "listings" | "vendors" | "flagged" | "categories";

export default function MarketplacePage() {
  const [tab, setTab] = useState<Tab>("listings");
  const [listingFilter, setListingFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const filteredListings = listingFilter === "all" ? listings : listings.filter(l => l.status === listingFilter);
  const filteredVendors = vendorFilter === "all" ? vendors : vendors.filter(v => v.status === vendorFilter);
  const detail = selectedListing ? listings.find(l => l.id === selectedListing) : null;
  const vendorDetail = selectedVendor ? vendors.find(v => v.id === selectedVendor) : null;

  const totalRevenue = vendors.reduce((s, v) => s + v.revenue, 0);
  const totalProducts = listings.length;
  const pendingApprovals = listings.filter(l => l.status === "pending").length;
  const flaggedCount = flaggedItems.length;

  const statusColor = (s: string) => {
    switch (s) {
      case "approved": case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-amber-100 text-amber-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "rejected": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const severityColor = (s: string) => {
    switch (s) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const fmt = (n: number) => "₦" + n.toLocaleString();

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "listings", label: "Product Listings", count: totalProducts },
    { key: "vendors", label: "Vendors", count: vendors.length },
    { key: "flagged", label: "Flagged Items", count: flaggedCount },
    { key: "categories", label: "Categories" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Marketplace Management</h1>
        <p className="text-on-surface-variant text-sm mt-1">Product listings, vendor management, and marketplace oversight</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-primary">{fmt(totalRevenue)}</div>
          <div className="text-sm text-on-surface-variant mt-1">Total Revenue</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-on-surface">{totalProducts}</div>
          <div className="text-sm text-on-surface-variant mt-1">Total Listings</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-amber-600">{pendingApprovals}</div>
          <div className="text-sm text-on-surface-variant mt-1">Pending Approval</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-red-600">{flaggedCount}</div>
          <div className="text-sm text-on-surface-variant mt-1">Flagged Items</div>
        </div>
      </div>

      {/* Alert */}
      {pendingApprovals > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <svg className="w-5 h-5 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
          <div className="text-sm text-amber-800"><span className="font-semibold">{pendingApprovals} listings</span> and <span className="font-semibold">{vendors.filter(v => v.status === "pending").length} vendors</span> are awaiting review and approval.</div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedListing(null); setSelectedVendor(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}{t.count !== undefined && ` (${t.count})`}
          </button>
        ))}
      </div>

      {/* Product Listings Tab */}
      {tab === "listings" && (
        <div className="flex gap-6">
          <div className={`${detail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["all", "approved", "pending", "suspended", "rejected"].map(f => (
                  <button key={f} onClick={() => setListingFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${listingFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{f === "all" ? `All (${listings.length})` : `${f} (${listings.filter(l => l.status === f).length})`}</button>
                ))}
              </div>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Listing</button>
            </div>

            <div className="space-y-3">
              {filteredListings.map(l => (
                <button key={l.id} onClick={() => { setSelectedListing(l.id); setSelectedVendor(null); }} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedListing === l.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{l.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-on-surface text-sm truncate">{l.name}</h3>
                        {l.flagged && <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" /></svg>}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{l.vendor} · {l.category}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-bold text-primary">{fmt(l.price)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(l.status)}`}>{l.status}</span>
                        {l.rating > 0 && <span className="text-xs text-on-surface-variant flex items-center gap-1"><svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>{l.rating}</span>}
                        <span className="text-xs text-on-surface-variant">{l.sold} sold</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Listing Detail Panel */}
          {detail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{detail.name}</h3>
                    <p className="text-on-primary/70 text-sm mt-0.5">{detail.id} · {detail.vendor}</p>
                  </div>
                  <button onClick={() => setSelectedListing(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(detail.status)}`}>{detail.status}</span>
                  {detail.flagged && <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-red-100 text-red-800">Flagged</span>}
                  <span className="text-xs text-on-surface-variant">{detail.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-primary">{fmt(detail.price)}</div>
                    <div className="text-xs text-on-surface-variant">Price</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{detail.stock}</div>
                    <div className="text-xs text-on-surface-variant">In Stock</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{detail.sold}</div>
                    <div className="text-xs text-on-surface-variant">Units Sold</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{detail.rating > 0 ? detail.rating : "N/A"}</div>
                    <div className="text-xs text-on-surface-variant">Rating</div>
                  </div>
                </div>

                {detail.sold > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">Revenue Generated</h4>
                    <div className="text-xl font-bold text-primary">{fmt(detail.price * detail.sold)}</div>
                    <div className="text-xs text-on-surface-variant mt-1">Platform commission (8%): {fmt(Math.round(detail.price * detail.sold * 0.08))}</div>
                  </div>
                )}

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Vendor Information</h4>
                  <p className="text-sm text-on-surface-variant">{detail.vendor}</p>
                  {(() => { const v = vendors.find(v => v.name === detail.vendor); return v ? <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(v.status)}`}>{v.status}</span> : null; })()}
                </div>

                <div className="space-y-2">
                  {detail.status === "pending" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Approve Listing</button>
                      <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Reject Listing</button>
                    </div>
                  )}
                  {detail.status === "approved" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Suspend Listing</button>
                  )}
                  {detail.status === "suspended" && (
                    <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Reinstate Listing</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Edit Listing Details</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">View Price History</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vendors Tab */}
      {tab === "vendors" && (
        <div className="flex gap-6">
          <div className={`${vendorDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["all", "verified", "pending", "suspended"].map(f => (
                  <button key={f} onClick={() => setVendorFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${vendorFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{f === "all" ? `All (${vendors.length})` : `${f} (${vendors.filter(v => v.status === f).length})`}</button>
                ))}
              </div>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Vendor</button>
            </div>

            <div className="space-y-3">
              {filteredVendors.map(v => (
                <button key={v.id} onClick={() => { setSelectedVendor(v.id); setSelectedListing(null); }} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedVendor === v.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{v.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-on-surface text-sm">{v.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(v.status)}`}>{v.status}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{v.category} · {v.products} products</p>
                      <div className="flex items-center gap-4 mt-2">
                        {v.revenue > 0 && <span className="text-sm font-semibold text-primary">{fmt(v.revenue)}</span>}
                        {v.rating > 0 && <span className="text-xs text-on-surface-variant flex items-center gap-1"><svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>{v.rating}</span>}
                        <span className="text-xs text-on-surface-variant">Since {v.joinDate}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vendor Detail Panel */}
          {vendorDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-on-primary font-bold">{vendorDetail.logo}</div>
                    <div>
                      <h3 className="text-on-primary font-bold text-lg">{vendorDetail.name}</h3>
                      <p className="text-on-primary/70 text-sm">{vendorDetail.id} · {vendorDetail.category}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedVendor(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(vendorDetail.status)}`}>{vendorDetail.status}</span>
                  <span className="text-xs text-on-surface-variant">Joined {vendorDetail.joinDate}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{vendorDetail.products}</div>
                    <div className="text-xs text-on-surface-variant">Products</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-primary">{vendorDetail.revenue > 0 ? fmt(vendorDetail.revenue) : "—"}</div>
                    <div className="text-xs text-on-surface-variant">Revenue</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{vendorDetail.rating > 0 ? vendorDetail.rating : "N/A"}</div>
                    <div className="text-xs text-on-surface-variant">Rating</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Contact Information</h4>
                  <p className="text-sm text-on-surface-variant">{vendorDetail.contact}</p>
                </div>

                {vendorDetail.status === "verified" && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      <span className="text-sm font-semibold text-green-800">Verified Vendor</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Business registration, NAFDAC licenses, and product certifications verified.</p>
                  </div>
                )}

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-3">Top Products</h4>
                  <div className="space-y-2">
                    {listings.filter(l => l.vendor === vendorDetail.name).slice(0, 3).map(l => (
                      <div key={l.id} className="flex items-center justify-between text-sm">
                        <span className="text-on-surface-variant truncate">{l.name}</span>
                        <span className="text-on-surface font-medium shrink-0 ml-2">{fmt(l.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {vendorDetail.status === "pending" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Verify Vendor</button>
                      <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Reject Application</button>
                    </div>
                  )}
                  {vendorDetail.status === "verified" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Suspend Vendor</button>
                  )}
                  {vendorDetail.status === "suspended" && (
                    <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Reinstate Vendor</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">View All Products</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Message Vendor</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Flagged Items Tab */}
      {tab === "flagged" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
            <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" /></svg>
            <div className="text-sm text-red-800"><span className="font-semibold">{flaggedCount} items</span> require immediate review. Items with critical severity should be addressed within 24 hours.</div>
          </div>

          <div className="space-y-3">
            {flaggedItems.map(f => (
              <div key={f.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-on-surface">{f.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${severityColor(f.severity)}`}>{f.severity}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">{f.vendor} · {f.listingId}</p>
                    <div className="mt-3 bg-surface-container-low rounded-lg p-3">
                      <div className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Reason: {f.reason}</div>
                      <p className="text-sm text-on-surface">{f.details}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant">
                      <span>{f.reports} reports</span>
                      <span>Flagged: {f.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Remove Listing</button>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Suspend</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Dismiss Flag</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Contact Vendor</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {tab === "categories" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Product Categories</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Category</button>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Category</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Listings</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Revenue</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Share</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.sort((a, b) => b.revenue - a.revenue).map((c, i) => {
                  const totalCatRev = categories.reduce((s, x) => s + x.revenue, 0);
                  const share = Math.round((c.revenue / totalCatRev) * 100);
                  return (
                    <tr key={c.name} className={i % 2 === 0 ? "" : "bg-surface-container-low/50"}>
                      <td className="px-5 py-4">
                        <span className="font-medium text-on-surface text-sm">{c.name}</span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-sm text-on-surface-variant">{c.count}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-on-surface">{fmt(c.revenue)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-surface-container-low rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${share}%` }} />
                          </div>
                          <span className="text-xs text-on-surface-variant w-8 text-right">{share}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button className="text-xs text-primary font-medium hover:underline">Edit</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Category Revenue Distribution</h3>
            <div className="space-y-3">
              {categories.sort((a, b) => b.revenue - a.revenue).map(c => {
                const totalCatRev = categories.reduce((s, x) => s + x.revenue, 0);
                const pct = Math.round((c.revenue / totalCatRev) * 100);
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-sm text-on-surface-variant w-40 truncate">{c.name}</span>
                    <div className="flex-1 h-6 bg-surface-container-low rounded-lg overflow-hidden">
                      <div className="h-full bg-primary/80 rounded-lg flex items-center px-2" style={{ width: `${Math.max(pct, 8)}%` }}>
                        <span className="text-[10px] font-bold text-white whitespace-nowrap">{fmt(c.revenue)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant w-10 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
