"use client";

import { useState } from "react";

type Integration = {
  id: string; name: string; type: "pos" | "erp" | "inventory" | "custom";
  status: "connected" | "pending" | "error"; lastSync: string; ordersToday: number;
  endpoint: string;
};

const integrations: Integration[] = [
  { id: "INT-001", name: "RxPOS Pro", type: "pos", status: "connected", lastSync: "2 min ago", ordersToday: 14, endpoint: "https://api.rxpospro.ng/v2" },
  { id: "INT-002", name: "PharmERP Suite", type: "erp", status: "connected", lastSync: "5 min ago", ordersToday: 8, endpoint: "https://pharmerp.com/api/v1" },
  { id: "INT-003", name: "MedStock Inventory", type: "inventory", status: "error", lastSync: "3 hours ago", ordersToday: 0, endpoint: "https://medstock.ng/api" },
];

const apiLogs = [
  { time: "10:42 AM", method: "POST", endpoint: "/orders", source: "RxPOS Pro", status: 201, duration: "124ms" },
  { time: "10:38 AM", method: "GET", endpoint: "/inventory/check", source: "PharmERP Suite", status: 200, duration: "89ms" },
  { time: "10:35 AM", method: "POST", endpoint: "/prescriptions/verify", source: "RxPOS Pro", status: 200, duration: "203ms" },
  { time: "10:30 AM", method: "PUT", endpoint: "/orders/ORD-4998/status", source: "RxPOS Pro", status: 200, duration: "67ms" },
  { time: "10:22 AM", method: "POST", endpoint: "/orders", source: "PharmERP Suite", status: 201, duration: "156ms" },
  { time: "10:15 AM", method: "GET", endpoint: "/inventory/sync", source: "MedStock Inventory", status: 500, duration: "2340ms" },
  { time: "10:10 AM", method: "POST", endpoint: "/orders", source: "RxPOS Pro", status: 201, duration: "98ms" },
];

const webhookEvents = [
  { event: "order.created", description: "New prescription order received" },
  { event: "order.status_changed", description: "Order status updated (processing → ready → dispensed)" },
  { event: "inventory.low_stock", description: "Medication stock below threshold" },
  { event: "prescription.verified", description: "Prescription verified by HealthSync AI" },
  { event: "payment.received", description: "Payment confirmed for an order" },
];

type Tab = "integrations" | "docs" | "logs" | "webhooks";

export default function PharmacyApiPage() {
  const [tab, setTab] = useState<Tab>("integrations");
  const [showAddModal, setShowAddModal] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const apiKey = "hs_live_pk_49f8a2c1e7b3d5f6a8c9e0b1d2f3a4c5";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">API Integration</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Connect your existing pharmacy software to HealthSync</p>
        </div>
        <button onClick={() => setShowAddModal(!showAddModal)} className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          New Integration
        </button>
      </div>

      {/* API Key */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-on-surface">Your API Key</h3>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary uppercase">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-surface-container-low rounded-lg font-mono text-xs text-on-surface select-all overflow-hidden">
            {apiKeyVisible ? apiKey : "hs_live_pk_••••••••••••••••••••••••••••"}
          </div>
          <button onClick={() => setApiKeyVisible(!apiKeyVisible)} className="p-2 rounded-lg border border-outline-variant hover:border-primary transition-all" title={apiKeyVisible ? "Hide" : "Show"}>
            <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{apiKeyVisible ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /> : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></>}</svg>
          </button>
          <button className="p-2 rounded-lg border border-outline-variant hover:border-primary transition-all" title="Copy">
            <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>
          </button>
        </div>
        <p className="text-[10px] text-on-surface-variant mt-2">Use this key to authenticate API requests from your pharmacy software. Keep it secure.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-lg p-0.5 w-fit">
        {(["integrations", "docs", "logs", "webhooks"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${tab === t ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Integrations tab */}
      {tab === "integrations" && (
        <div className="space-y-3">
          {integrations.map((intg) => (
            <div key={intg.id} className={`bg-surface-container-lowest border rounded-xl p-5 hover:shadow-sm transition-all ${intg.status === "error" ? "border-error" : "border-outline-variant"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${intg.status === "connected" ? "bg-secondary-container/30 text-secondary" : intg.status === "error" ? "bg-error-container/50 text-error" : "bg-tertiary-fixed/30 text-tertiary"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">{intg.name}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${intg.status === "connected" ? "bg-secondary-container/50 text-secondary" : intg.status === "error" ? "bg-error-container/50 text-error" : "bg-tertiary-fixed/30 text-tertiary"}`}>{intg.status}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant uppercase">{intg.type}</span>
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5 font-mono">{intg.endpoint}</div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-outline">
                      <span>Last sync: {intg.lastSync}</span>
                      <span>•</span>
                      <span>{intg.ordersToday} orders today</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {intg.status === "error" && (
                    <button className="px-3 py-1.5 rounded-lg bg-error text-on-error text-[10px] font-bold hover:opacity-90 transition-all">Retry</button>
                  )}
                  <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-[10px] font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition-all">Configure</button>
                </div>
              </div>
              {intg.status === "error" && (
                <div className="mt-3 p-2.5 bg-error-container/20 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4 text-error shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                  <span className="text-[10px] text-error font-medium">Connection timeout — inventory sync failed. Check endpoint availability.</span>
                </div>
              )}
            </div>
          ))}

          {/* Add modal */}
          {showAddModal && (
            <div className="bg-surface-container-lowest border border-primary rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-4">Add New Integration</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Integration Name</label>
                  <input type="text" placeholder="e.g. My POS System" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Type</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option>POS System</option>
                    <option>ERP Suite</option>
                    <option>Inventory Management</option>
                    <option>Custom Software</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">API Endpoint URL</label>
                  <input type="url" placeholder="https://your-system.com/api/v1" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Auth Type</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option>API Key (Header)</option>
                    <option>OAuth 2.0</option>
                    <option>Basic Auth</option>
                    <option>Bearer Token</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Auth Credential</label>
                  <input type="password" placeholder="••••••••••" className="w-full mt-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all">Test & Connect</button>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-all">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Docs tab */}
      {tab === "docs" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-5 border-b border-outline-variant">
            <h3 className="text-sm font-bold text-on-surface">HealthSync Pharmacy API</h3>
            <p className="text-xs text-on-surface-variant mt-1">RESTful API for integrating your pharmacy software with HealthSync. All endpoints require authentication via API key in the <code className="px-1 py-0.5 bg-surface-container-high rounded text-[10px] font-mono">X-API-Key</code> header.</p>
            <div className="mt-3 flex gap-2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">v2.1</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary">REST</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">JSON</span>
            </div>
          </div>
          {[
            { method: "GET", path: "/api/v2/orders", desc: "List all orders with optional status filter", params: "?status=new|processing|ready&limit=50" },
            { method: "POST", path: "/api/v2/orders", desc: "Create a new order from external prescription", params: "Body: { patient_id, medications[], prescription_id }" },
            { method: "GET", path: "/api/v2/orders/:id", desc: "Get order details by ID", params: "Returns full order with medications, status history" },
            { method: "PUT", path: "/api/v2/orders/:id/status", desc: "Update order status in fulfillment pipeline", params: "Body: { status: 'processing' | 'ready' | 'dispensed' }" },
            { method: "GET", path: "/api/v2/inventory", desc: "Check current medication stock levels", params: "?search=amoxicillin&category=antibiotics" },
            { method: "POST", path: "/api/v2/inventory/check", desc: "Batch check availability for multiple medications", params: "Body: { medications: [{ name, quantity }] }" },
            { method: "POST", path: "/api/v2/prescriptions/verify", desc: "Verify prescription with HealthSync AI", params: "Body: { prescription_id } → Returns verification status" },
            { method: "GET", path: "/api/v2/webhooks", desc: "List configured webhook endpoints", params: "" },
            { method: "POST", path: "/api/v2/webhooks", desc: "Register a new webhook endpoint", params: "Body: { url, events[] }" },
          ].map((ep, i) => (
            <div key={i} className="px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${ep.method === "GET" ? "bg-secondary-container/50 text-secondary" : ep.method === "POST" ? "bg-primary-fixed text-primary" : "bg-tertiary-fixed/30 text-tertiary"}`}>{ep.method}</span>
                <code className="text-xs font-mono font-semibold text-on-surface">{ep.path}</code>
              </div>
              <p className="text-xs text-on-surface-variant">{ep.desc}</p>
              {ep.params && <p className="text-[10px] text-outline font-mono mt-1">{ep.params}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Logs tab */}
      {tab === "logs" && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
            <h3 className="text-xs font-bold text-on-surface">Recent API Activity</h3>
            <span className="text-[10px] text-on-surface-variant">Last 24 hours</span>
          </div>
          <div className="hidden sm:grid grid-cols-6 px-5 py-2 border-b border-outline-variant bg-surface-container-low">
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Time</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Method</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">Endpoint</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Duration</span>
          </div>
          {apiLogs.map((log, i) => (
            <div key={i} className="grid sm:grid-cols-6 gap-1 sm:gap-0 items-center px-5 py-2.5 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
              <span className="text-xs text-on-surface-variant">{log.time}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded w-fit font-mono ${log.method === "GET" ? "bg-secondary-container/50 text-secondary" : log.method === "POST" ? "bg-primary-fixed text-primary" : "bg-tertiary-fixed/30 text-tertiary"}`}>{log.method}</span>
              <div className="col-span-2">
                <code className="text-xs font-mono text-on-surface">{log.endpoint}</code>
                <div className="text-[10px] text-outline">{log.source}</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${log.status < 300 ? "bg-secondary-container/50 text-secondary" : "bg-error-container/50 text-error"}`}>{log.status}</span>
              <span className={`text-xs ${parseInt(log.duration) > 1000 ? "text-error font-semibold" : "text-on-surface-variant"}`}>{log.duration}</span>
            </div>
          ))}
        </div>
      )}

      {/* Webhooks tab */}
      {tab === "webhooks" && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-sm font-bold text-on-surface mb-1">Webhook Configuration</h3>
            <p className="text-xs text-on-surface-variant mb-4">HealthSync will send POST requests to your endpoint when these events occur.</p>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Webhook URL</label>
              <div className="flex gap-2 mt-1">
                <input type="url" placeholder="https://your-system.com/webhooks/healthsync" className="flex-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono" />
                <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all whitespace-nowrap">Save URL</button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant">
              <h3 className="text-xs font-bold text-on-surface">Available Events</h3>
            </div>
            {webhookEvents.map((evt, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <code className="text-xs font-mono font-semibold text-primary bg-primary-fixed/30 px-2 py-0.5 rounded">{evt.event}</code>
                  <span className="text-xs text-on-surface-variant">{evt.description}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-container-high rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <h3 className="text-xs font-bold text-on-surface mb-2">Example Payload</h3>
            <pre className="text-[11px] font-mono text-on-surface-variant bg-surface-container-low rounded-lg p-4 overflow-x-auto">{`{
  "event": "order.created",
  "timestamp": "2026-06-23T10:42:00Z",
  "data": {
    "order_id": "ORD-5001",
    "patient_name": "Chidi Okoro",
    "prescription_id": "RX-49230",
    "medications": [
      { "name": "Amoxicillin", "dosage": "500mg", "quantity": 21 }
    ],
    "total": 5700,
    "currency": "NGN"
  }
}`}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
