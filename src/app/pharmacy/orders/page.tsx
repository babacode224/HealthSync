"use client";

import { useState } from "react";

type OrderStatus = "new" | "processing" | "ready" | "dispensed" | "cancelled";

type Order = {
  id: string; patient: string; avatar: string; avatarBg: string; doctor: string;
  medications: { name: string; dosage: string; qty: number; price: number }[];
  status: OrderStatus; receivedAt: string; priority: "normal" | "urgent";
  prescriptionId: string; insurance: string | null; notes: string;
  source: "healthsync" | "api";
};

const orders: Order[] = [
  { id: "ORD-5001", patient: "Chidi Okoro", avatar: "CO", avatarBg: "bg-primary", doctor: "Dr. Sarah Jenkins", medications: [{ name: "Amoxicillin", dosage: "500mg x 21 caps", qty: 1, price: 4500 }, { name: "Ibuprofen", dosage: "400mg x 10 tabs", qty: 1, price: 1200 }], status: "new", receivedAt: "10:15 AM", priority: "normal", prescriptionId: "RX-49230", insurance: "HMO Premier", notes: "", source: "healthsync" },
  { id: "ORD-5002", patient: "Amina Abubakar", avatar: "AA", avatarBg: "bg-secondary", doctor: "Dr. James Adeyemi", medications: [{ name: "Metformin", dosage: "850mg x 60 tabs", qty: 1, price: 3200 }], status: "new", receivedAt: "10:28 AM", priority: "normal", prescriptionId: "RX-49229", insurance: null, notes: "Patient prefers generic brand", source: "healthsync" },
  { id: "ORD-5003", patient: "Emeka Madu", avatar: "EM", avatarBg: "bg-tertiary", doctor: "Dr. Linda Baji", medications: [{ name: "Lisinopril", dosage: "10mg x 30 tabs", qty: 1, price: 2800 }, { name: "Amlodipine", dosage: "5mg x 30 tabs", qty: 1, price: 2200 }], status: "processing", receivedAt: "10:45 AM", priority: "urgent", prescriptionId: "RX-49228", insurance: "NHIS", notes: "BP critically elevated — dispense ASAP", source: "healthsync" },
  { id: "ORD-5004", patient: "Fatima Williams", avatar: "FW", avatarBg: "bg-primary", doctor: "Dr. Olu Fashola", medications: [{ name: "Ventolin Inhaler", dosage: "100mcg x 1", qty: 2, price: 5500 }], status: "processing", receivedAt: "11:02 AM", priority: "normal", prescriptionId: "RX-49227", insurance: "HMO Premier", notes: "", source: "api" },
  { id: "ORD-5005", patient: "Tunde Edun", avatar: "TE", avatarBg: "bg-secondary", doctor: "Dr. Sarah Jenkins", medications: [{ name: "Omeprazole", dosage: "20mg x 14 caps", qty: 1, price: 1800 }], status: "ready", receivedAt: "09:30 AM", priority: "normal", prescriptionId: "RX-49226", insurance: null, notes: "", source: "healthsync" },
  { id: "ORD-5006", patient: "Grace Okwu", avatar: "GO", avatarBg: "bg-tertiary", doctor: "Dr. Chidinma Eze", medications: [{ name: "Prenatal Vitamins", dosage: "x 30 tabs", qty: 1, price: 3500 }, { name: "Folic Acid", dosage: "5mg x 30 tabs", qty: 1, price: 800 }, { name: "Iron Supplement", dosage: "200mg x 30 tabs", qty: 1, price: 1500 }], status: "ready", receivedAt: "09:15 AM", priority: "normal", prescriptionId: "RX-49225", insurance: "NHIS", notes: "Prenatal visit — 28 weeks", source: "healthsync" },
  { id: "ORD-5007", patient: "Kola Ajayi", avatar: "KA", avatarBg: "bg-primary", doctor: "Dr. James Adeyemi", medications: [{ name: "Metformin", dosage: "500mg x 60 tabs", qty: 1, price: 2400 }, { name: "Glimepiride", dosage: "2mg x 30 tabs", qty: 1, price: 3600 }], status: "dispensed", receivedAt: "08:45 AM", priority: "normal", prescriptionId: "RX-49224", insurance: "HMO Premier", notes: "", source: "api" },
  { id: "ORD-5008", patient: "Mercy Johnson", avatar: "MJ", avatarBg: "bg-secondary", doctor: "Dr. Linda Baji", medications: [{ name: "Ciprofloxacin", dosage: "500mg x 14 tabs", qty: 1, price: 3800 }], status: "dispensed", receivedAt: "08:20 AM", priority: "normal", prescriptionId: "RX-49223", insurance: null, notes: "", source: "healthsync" },
];

type Filter = "all" | "new" | "processing" | "ready" | "dispensed";

export default function PharmacyOrdersPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderData, setOrderData] = useState(orders);
  const [fulfillStep, setFulfillStep] = useState(0);

  const filtered = filter === "all" ? orderData : orderData.filter((o) => o.status === filter);

  const statusStyle = (s: OrderStatus) => {
    switch (s) {
      case "new": return "bg-primary-fixed text-primary";
      case "processing": return "bg-tertiary-fixed/30 text-tertiary";
      case "ready": return "bg-secondary-container/50 text-secondary";
      case "dispensed": return "bg-surface-container-high text-on-surface-variant";
      case "cancelled": return "bg-error-container/50 text-error";
    }
  };

  const statusLabel = (s: OrderStatus) => s.charAt(0).toUpperCase() + s.slice(1);

  const advanceStatus = (id: string) => {
    setOrderData((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const next: Record<OrderStatus, OrderStatus> = { new: "processing", processing: "ready", ready: "dispensed", dispensed: "dispensed", cancelled: "cancelled" };
      return { ...o, status: next[o.status] };
    }));
    setFulfillStep(0);
  };

  const actionLabel = (s: OrderStatus) => {
    switch (s) {
      case "new": return "Start Processing";
      case "processing": return "Mark as Ready";
      case "ready": return "Confirm Dispensed";
      default: return "";
    }
  };

  const counts = { new: orderData.filter((o) => o.status === "new").length, processing: orderData.filter((o) => o.status === "processing").length, ready: orderData.filter((o) => o.status === "ready").length, dispensed: orderData.filter((o) => o.status === "dispensed").length };

  const orderTotal = (o: Order) => o.medications.reduce((sum, m) => sum + m.price * m.qty, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Order Fulfillment</h1>
        <p className="text-sm text-on-surface-variant mt-0.5">Manage incoming prescriptions and dispense medications</p>
      </div>

      {/* Pipeline stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "New Orders", value: counts.new, color: "text-primary bg-primary-fixed", filter: "new" as Filter },
          { label: "Processing", value: counts.processing, color: "text-tertiary bg-tertiary-fixed/30", filter: "processing" as Filter },
          { label: "Ready for Pickup", value: counts.ready, color: "text-secondary bg-secondary-container/30", filter: "ready" as Filter },
          { label: "Dispensed Today", value: counts.dispensed, color: "text-on-surface-variant bg-surface-container-high", filter: "dispensed" as Filter },
        ].map((s) => (
          <button key={s.label} onClick={() => setFilter(s.filter === filter ? "all" : s.filter)} className={`text-left bg-surface-container-lowest border rounded-xl p-4 hover:shadow-sm transition-all ${s.filter === filter ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
            <div className="text-2xl font-bold text-on-surface">{s.value}</div>
            <div className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(["all", "new", "processing", "ready", "dispensed"] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap transition-all ${filter === f ? "bg-primary text-on-primary border-primary" : "text-on-surface-variant border-outline-variant"}`}>
            {f === "all" ? "All Orders" : statusLabel(f)} {f !== "all" && `(${counts[f]})`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Order list */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.length === 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
              <p className="text-sm text-on-surface-variant">No orders in this category</p>
            </div>
          )}
          {filtered.map((order) => (
            <button key={order.id} onClick={() => { setSelectedOrder(order); setFulfillStep(0); }} className={`w-full text-left bg-surface-container-lowest border rounded-xl p-4 hover:shadow-sm transition-all ${selectedOrder?.id === order.id ? "border-primary ring-1 ring-primary" : order.priority === "urgent" ? "border-error" : "border-outline-variant"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${order.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{order.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-on-surface">{order.patient}</span>
                    {order.priority === "urgent" && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-error text-on-error uppercase">Urgent</span>}
                    {order.source === "api" && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-primary uppercase">API</span>}
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle(order.status)}`}>{statusLabel(order.status)}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{order.medications.map((m) => m.name).join(", ")}</div>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-outline">
                    <span>{order.id}</span>
                    <span>•</span>
                    <span>{order.prescriptionId}</span>
                    <span>•</span>
                    <span>{order.receivedAt}</span>
                    <span>•</span>
                    <span className="font-semibold text-on-surface">₦{orderTotal(order).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-20">
              {/* Header */}
              <div className="bg-primary p-4 text-on-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-semibold opacity-80">{selectedOrder.id}</div>
                    <div className="text-lg font-bold mt-0.5">{selectedOrder.patient}</div>
                    <div className="text-xs opacity-80 mt-0.5">{selectedOrder.doctor} • {selectedOrder.prescriptionId}</div>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-1 rounded hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20`}>{statusLabel(selectedOrder.status)}</span>
                  {selectedOrder.insurance && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{selectedOrder.insurance}</span>}
                  {selectedOrder.source === "api" && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">Via API</span>}
                </div>
              </div>

              {/* Progress steps */}
              <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
                <div className="flex items-center gap-1">
                  {["Received", "Processing", "Ready", "Dispensed"].map((step, i) => {
                    const statusIndex = { new: 0, processing: 1, ready: 2, dispensed: 3, cancelled: -1 }[selectedOrder.status];
                    const done = i <= statusIndex;
                    return (
                      <div key={step} className="flex items-center gap-1 flex-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${done ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-outline"}`}>
                          {done ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> : i + 1}
                        </div>
                        {i < 3 && <div className={`flex-1 h-0.5 ${i < statusIndex ? "bg-secondary" : "bg-surface-container-high"}`} />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {["Received", "Processing", "Ready", "Dispensed"].map((step) => (
                    <span key={step} className="text-[8px] text-on-surface-variant font-medium">{step}</span>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div className="p-4 border-b border-outline-variant">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Medications</h4>
                <div className="space-y-2">
                  {selectedOrder.medications.map((med, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-lg">
                      <div>
                        <div className="text-sm font-semibold text-on-surface">{med.name}</div>
                        <div className="text-xs text-on-surface-variant">{med.dosage} × {med.qty}</div>
                      </div>
                      <div className="text-sm font-bold text-on-surface">₦{(med.price * med.qty).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-2 border-t border-outline-variant">
                  <span className="text-sm font-bold text-on-surface">Total</span>
                  <span className="text-sm font-bold text-primary">₦{orderTotal(selectedOrder).toLocaleString()}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="px-4 py-3 border-b border-outline-variant">
                  <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Notes</h4>
                  <p className="text-xs text-on-surface">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Fulfillment steps for processing */}
              {selectedOrder.status === "processing" && (
                <div className="px-4 py-3 border-b border-outline-variant">
                  <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Fulfillment Checklist</h4>
                  <div className="space-y-2">
                    {["Verify prescription authenticity", "Check stock availability", "Prepare medication", "Double-check dosage & label"].map((step, i) => (
                      <button key={step} onClick={() => setFulfillStep(Math.max(fulfillStep, i + 1))} className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-all ${i < fulfillStep ? "bg-secondary-container/30" : "bg-surface-container-low"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < fulfillStep ? "bg-secondary text-on-secondary" : "border border-outline"}`}>
                          {i < fulfillStep && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                        </div>
                        <span className={`text-xs ${i < fulfillStep ? "text-secondary font-semibold line-through" : "text-on-surface"}`}>{step}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedOrder.status !== "dispensed" && selectedOrder.status !== "cancelled" && (
                <div className="p-4 space-y-2">
                  <button onClick={() => { advanceStatus(selectedOrder.id); setSelectedOrder({ ...selectedOrder, status: ({ new: "processing", processing: "ready", ready: "dispensed", dispensed: "dispensed", cancelled: "cancelled" } as const)[selectedOrder.status] }); }} className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    {actionLabel(selectedOrder.status)}
                  </button>
                  {selectedOrder.status === "ready" && (
                    <div className="flex items-center gap-2 p-2.5 bg-primary-fixed/30 rounded-lg">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
                      <span className="text-[10px] text-primary font-medium">Patient has been notified via SMS</span>
                    </div>
                  )}
                  <button className="w-full py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:border-error hover:text-error transition-all">Cancel Order</button>
                </div>
              )}

              {selectedOrder.status === "dispensed" && (
                <div className="p-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    <span className="text-xs text-secondary font-semibold">Order dispensed successfully</span>
                  </div>
                  <button className="w-full mt-2 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:text-primary hover:border-primary transition-all">Print Receipt</button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
              </div>
              <p className="text-sm font-semibold text-on-surface">Select an Order</p>
              <p className="text-xs text-on-surface-variant mt-1">Click any order to view details and manage fulfillment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
