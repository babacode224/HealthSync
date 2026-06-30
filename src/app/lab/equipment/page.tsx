"use client";

import { useState } from "react";

const equipment = [
  { id: "EQP-001", name: "Beckman AU5800 Chemistry Analyzer", category: "Chemistry", status: "operational", location: "Lab A - Bay 1", serial: "BA5800-NG-2847", lastCalibration: "2026-06-25", nextCalibration: "2026-07-25", uptime: 99.2, testsRun: 12450, purchaseDate: "2024-03-15", warranty: "2027-03-15", manufacturer: "Beckman Coulter" },
  { id: "EQP-002", name: "Sysmex XN-1000 Hematology Analyzer", category: "Hematology", status: "operational", location: "Lab A - Bay 2", serial: "SXN1K-NG-1093", lastCalibration: "2026-06-20", nextCalibration: "2026-07-20", uptime: 98.7, testsRun: 9870, purchaseDate: "2024-06-10", warranty: "2027-06-10", manufacturer: "Sysmex Corporation" },
  { id: "EQP-003", name: "Abbott i2000SR Immunoassay", category: "Immunology", status: "maintenance", location: "Lab B - Bay 1", serial: "AI2K-NG-5521", lastCalibration: "2026-06-10", nextCalibration: "2026-07-10", uptime: 94.1, testsRun: 7230, purchaseDate: "2024-01-22", warranty: "2027-01-22", manufacturer: "Abbott Diagnostics" },
  { id: "EQP-004", name: "BioMérieux VITEK 2 Compact", category: "Microbiology", status: "operational", location: "Lab B - Bay 2", serial: "BV2C-NG-3318", lastCalibration: "2026-06-22", nextCalibration: "2026-07-22", uptime: 97.8, testsRun: 4560, purchaseDate: "2024-09-05", warranty: "2027-09-05", manufacturer: "BioMérieux" },
  { id: "EQP-005", name: "Roche cobas e411 Analyzer", category: "Immunology", status: "calibration_due", location: "Lab A - Bay 3", serial: "RCE4-NG-7742", lastCalibration: "2026-05-28", nextCalibration: "2026-06-28", uptime: 96.5, testsRun: 6890, purchaseDate: "2023-11-18", warranty: "2026-11-18", manufacturer: "Roche Diagnostics" },
  { id: "EQP-006", name: "Thermo Scientific Centrifuge", category: "General", status: "operational", location: "Lab A - Bay 4", serial: "TSC-NG-2201", lastCalibration: "2026-06-15", nextCalibration: "2026-09-15", uptime: 99.8, testsRun: 18200, purchaseDate: "2023-07-20", warranty: "2026-07-20", manufacturer: "Thermo Fisher" },
  { id: "EQP-007", name: "Leica RM2255 Microtome", category: "Histology", status: "out_of_service", location: "Lab C - Bay 1", serial: "LRM-NG-0894", lastCalibration: "2026-04-10", nextCalibration: "2026-07-10", uptime: 0, testsRun: 3210, purchaseDate: "2024-02-28", warranty: "2027-02-28", manufacturer: "Leica Biosystems" },
  { id: "EQP-008", name: "BD BACTEC FX40 Blood Culture", category: "Microbiology", status: "operational", location: "Lab B - Bay 3", serial: "BFX40-NG-6653", lastCalibration: "2026-06-18", nextCalibration: "2026-07-18", uptime: 98.9, testsRun: 2870, purchaseDate: "2025-01-10", warranty: "2028-01-10", manufacturer: "Becton Dickinson" },
];

const maintenanceLogs = [
  { id: "MNT-001", equipmentId: "EQP-003", equipment: "Abbott i2000SR", type: "Preventive", date: "2026-06-26", technician: "Oluwaseun Bakare", status: "in_progress", description: "Scheduled quarterly maintenance — reagent line flush, probe alignment, and software update.", cost: 185000 },
  { id: "MNT-002", equipmentId: "EQP-007", equipment: "Leica RM2255", type: "Corrective", date: "2026-06-24", technician: "External — Leica Service", status: "awaiting_parts", description: "Blade holder assembly failure. Replacement part ordered from Germany. ETA: 5 business days.", cost: 420000 },
  { id: "MNT-003", equipmentId: "EQP-005", equipment: "Roche cobas e411", type: "Calibration", date: "2026-06-27", technician: "Adaobi Nnamdi", status: "scheduled", description: "Monthly calibration due. Full calibration with QC verification required.", cost: 45000 },
  { id: "MNT-004", equipmentId: "EQP-001", equipment: "Beckman AU5800", type: "Preventive", date: "2026-06-20", technician: "Oluwaseun Bakare", status: "completed", description: "Lamp replacement, cuvette wash station cleaning, water line inspection.", cost: 95000 },
  { id: "MNT-005", equipmentId: "EQP-002", equipment: "Sysmex XN-1000", type: "Calibration", date: "2026-06-20", technician: "Adaobi Nnamdi", status: "completed", description: "Monthly calibration with 3-level QC. All parameters within acceptable range.", cost: 35000 },
  { id: "MNT-006", equipmentId: "EQP-006", equipment: "Thermo Centrifuge", type: "Preventive", date: "2026-06-15", technician: "Oluwaseun Bakare", status: "completed", description: "Rotor inspection, speed verification, timer calibration. All within spec.", cost: 28000 },
];

const calibrationSchedule = [
  { equipment: "Roche cobas e411", dueDate: "2026-06-28", status: "overdue", priority: "high" },
  { equipment: "Abbott i2000SR", dueDate: "2026-07-10", status: "upcoming", priority: "medium" },
  { equipment: "Leica RM2255", dueDate: "2026-07-10", status: "upcoming", priority: "low" },
  { equipment: "BD BACTEC FX40", dueDate: "2026-07-18", status: "upcoming", priority: "medium" },
  { equipment: "Sysmex XN-1000", dueDate: "2026-07-20", status: "upcoming", priority: "medium" },
  { equipment: "BioMérieux VITEK 2", dueDate: "2026-07-22", status: "upcoming", priority: "medium" },
  { equipment: "Beckman AU5800", dueDate: "2026-07-25", status: "upcoming", priority: "medium" },
  { equipment: "Thermo Centrifuge", dueDate: "2026-09-15", status: "upcoming", priority: "low" },
];

type Tab = "inventory" | "maintenance" | "calibration" | "compliance";

export default function EquipmentPage() {
  const [tab, setTab] = useState<Tab>("inventory");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [maintenanceFilter, setMaintenanceFilter] = useState("all");

  const filteredEquipment = statusFilter === "all" ? equipment : equipment.filter(e => e.status === statusFilter);
  const filteredMaintenance = maintenanceFilter === "all" ? maintenanceLogs : maintenanceLogs.filter(m => m.status === maintenanceFilter);
  const detail = selectedEquipment ? equipment.find(e => e.id === selectedEquipment) : null;

  const operational = equipment.filter(e => e.status === "operational").length;
  const inMaintenance = equipment.filter(e => e.status === "maintenance").length;
  const calibDue = equipment.filter(e => e.status === "calibration_due").length;
  const outOfService = equipment.filter(e => e.status === "out_of_service").length;

  const statusColor = (s: string) => {
    switch (s) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": case "in_progress": return "bg-amber-100 text-amber-800";
      case "calibration_due": case "scheduled": return "bg-blue-100 text-blue-800";
      case "out_of_service": return "bg-red-100 text-red-800";
      case "completed": return "bg-green-100 text-green-800";
      case "awaiting_parts": return "bg-purple-100 text-purple-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabel = (s: string) => s.replace(/_/g, " ");
  const fmt = (n: number) => "₦" + n.toLocaleString();

  const tabs: { key: Tab; label: string }[] = [
    { key: "inventory", label: "Equipment Inventory" },
    { key: "maintenance", label: "Maintenance Log" },
    { key: "calibration", label: "Calibration Schedule" },
    { key: "compliance", label: "NAFDAC Compliance" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Equipment Management</h1>
        <p className="text-on-surface-variant text-sm mt-1">Inventory, calibration, maintenance, and compliance tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-green-600">{operational}</div>
          <div className="text-sm text-on-surface-variant mt-1">Operational</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-amber-600">{inMaintenance}</div>
          <div className="text-sm text-on-surface-variant mt-1">In Maintenance</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-blue-600">{calibDue}</div>
          <div className="text-sm text-on-surface-variant mt-1">Calibration Due</div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4">
          <div className="text-2xl font-bold text-red-600">{outOfService}</div>
          <div className="text-sm text-on-surface-variant mt-1">Out of Service</div>
        </div>
      </div>

      {/* Alerts */}
      {(calibDue > 0 || outOfService > 0) && (
        <div className="space-y-2">
          {calibDue > 0 && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <svg className="w-5 h-5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg>
              <span className="text-sm text-blue-800"><span className="font-semibold">{calibDue} equipment</span> requires calibration. Schedule maintenance to maintain NAFDAC compliance.</span>
            </div>
          )}
          {outOfService > 0 && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              <span className="text-sm text-red-800"><span className="font-semibold">{outOfService} equipment</span> is out of service. Check maintenance log for repair status.</span>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedEquipment(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Equipment Inventory Tab */}
      {tab === "inventory" && (
        <div className="flex gap-6">
          <div className={`${detail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["all", "operational", "maintenance", "calibration_due", "out_of_service"].map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                    {f === "all" ? `All (${equipment.length})` : `${statusLabel(f)} (${equipment.filter(e => e.status === f).length})`}
                  </button>
                ))}
              </div>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ Add Equipment</button>
            </div>

            <div className="space-y-3">
              {filteredEquipment.map(e => (
                <button key={e.id} onClick={() => setSelectedEquipment(e.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedEquipment === e.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${e.status === "operational" ? "bg-green-100" : e.status === "out_of_service" ? "bg-red-100" : "bg-amber-100"}`}>
                      <svg className={`w-5 h-5 ${e.status === "operational" ? "text-green-600" : e.status === "out_of_service" ? "text-red-600" : "text-amber-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-on-surface text-sm">{e.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(e.status)}`}>{statusLabel(e.status)}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{e.category} · {e.location}</p>
                      <div className="flex items-center gap-4 mt-2">
                        {e.uptime > 0 && (
                          <span className="text-xs text-on-surface-variant">Uptime: <span className={`font-semibold ${e.uptime >= 98 ? "text-green-600" : e.uptime >= 95 ? "text-amber-600" : "text-red-600"}`}>{e.uptime}%</span></span>
                        )}
                        <span className="text-xs text-on-surface-variant">{e.testsRun.toLocaleString()} tests</span>
                        <span className="text-xs text-on-surface-variant">Cal: {e.lastCalibration}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {detail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-on-primary font-bold text-lg">{detail.name}</h3>
                    <p className="text-on-primary/70 text-sm mt-0.5">{detail.id} · {detail.serial}</p>
                  </div>
                  <button onClick={() => setSelectedEquipment(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor(detail.status)}`}>{statusLabel(detail.status)}</span>
                  <span className="text-xs text-on-surface-variant">{detail.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className={`text-lg font-bold ${detail.uptime >= 98 ? "text-green-600" : detail.uptime >= 95 ? "text-amber-600" : "text-red-600"}`}>{detail.uptime > 0 ? `${detail.uptime}%` : "—"}</div>
                    <div className="text-xs text-on-surface-variant">Uptime</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-on-surface">{detail.testsRun.toLocaleString()}</div>
                    <div className="text-xs text-on-surface-variant">Tests Run</div>
                  </div>
                </div>

                {detail.uptime > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                      <span>Uptime</span>
                      <span>{detail.uptime}%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${detail.uptime >= 98 ? "bg-green-500" : detail.uptime >= 95 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${detail.uptime}%` }} />
                    </div>
                  </div>
                )}

                <div className="bg-surface-container-low rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface">Equipment Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-on-surface-variant">Location:</span></div>
                    <div className="font-medium text-on-surface">{detail.location}</div>
                    <div><span className="text-on-surface-variant">Manufacturer:</span></div>
                    <div className="font-medium text-on-surface">{detail.manufacturer}</div>
                    <div><span className="text-on-surface-variant">Purchase Date:</span></div>
                    <div className="font-medium text-on-surface">{detail.purchaseDate}</div>
                    <div><span className="text-on-surface-variant">Warranty Until:</span></div>
                    <div className="font-medium text-on-surface">{detail.warranty}</div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface">Calibration</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-on-surface-variant">Last Calibration:</span></div>
                    <div className="font-medium text-on-surface">{detail.lastCalibration}</div>
                    <div><span className="text-on-surface-variant">Next Calibration:</span></div>
                    <div className={`font-medium ${detail.status === "calibration_due" ? "text-red-600" : "text-on-surface"}`}>{detail.nextCalibration}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {detail.status === "calibration_due" && (
                    <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Schedule Calibration</button>
                  )}
                  {detail.status === "operational" && (
                    <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Schedule Maintenance</button>
                  )}
                  {detail.status === "out_of_service" && (
                    <button className="w-full px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Create Repair Ticket</button>
                  )}
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">View Maintenance History</button>
                  <button className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Print Equipment Report</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Maintenance Log Tab */}
      {tab === "maintenance" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {["all", "in_progress", "scheduled", "awaiting_parts", "completed"].map(f => (
                <button key={f} onClick={() => setMaintenanceFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${maintenanceFilter === f ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                  {f === "all" ? `All (${maintenanceLogs.length})` : `${statusLabel(f)} (${maintenanceLogs.filter(m => m.status === f).length})`}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">+ New Work Order</button>
          </div>

          <div className="space-y-3">
            {filteredMaintenance.map(m => (
              <div key={m.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-on-surface text-sm">{m.equipment}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${m.type === "Corrective" ? "bg-red-100 text-red-800" : m.type === "Calibration" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>{m.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(m.status)}`}>{statusLabel(m.status)}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-2">{m.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant">
                      <span>{m.id}</span>
                      <span>Date: {m.date}</span>
                      <span>Tech: {m.technician}</span>
                      <span className="font-semibold text-on-surface">{fmt(m.cost)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Maintenance Cost Summary (This Quarter)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{fmt(maintenanceLogs.reduce((s, m) => s + m.cost, 0))}</div>
                <div className="text-xs text-on-surface-variant mt-1">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-on-surface">{maintenanceLogs.filter(m => m.status === "completed").length}</div>
                <div className="text-xs text-on-surface-variant mt-1">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-600">{maintenanceLogs.filter(m => m.status !== "completed").length}</div>
                <div className="text-xs text-on-surface-variant mt-1">Pending</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calibration Schedule Tab */}
      {tab === "calibration" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">Upcoming Calibrations</h2>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Export Schedule (PDF)</button>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Equipment</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Due Date</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Status</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Priority</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-on-surface-variant uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {calibrationSchedule.map((c, i) => (
                  <tr key={i} className={`border-b border-outline-variant last:border-0 ${c.status === "overdue" ? "bg-red-50/50" : ""}`}>
                    <td className="px-5 py-4 text-sm font-medium text-on-surface">{c.equipment}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{c.dueDate}</td>
                    <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(c.status)}`}>{c.status}</span></td>
                    <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${c.priority === "high" ? "bg-red-100 text-red-800" : c.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}`}>{c.priority}</span></td>
                    <td className="px-5 py-4 text-center"><button className="text-xs text-primary font-medium hover:underline">Schedule</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NAFDAC Compliance Tab */}
      {tab === "compliance" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
            <div>
              <span className="text-sm font-semibold text-green-800">NAFDAC Laboratory Compliance Status: Active</span>
              <p className="text-xs text-green-700 mt-0.5">License: NAFDAC/LAB/2025/0847 · Valid until December 31, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-4">Compliance Score</h3>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">92%</span>
                </div>
                <div className="text-sm text-on-surface-variant space-y-1">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> 6 fully compliant</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> 1 needs attention</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> 1 non-compliant</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-4">Audit Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant">Last Audit:</span><span className="font-medium text-on-surface">March 15, 2026</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Next Audit:</span><span className="font-medium text-on-surface">September 15, 2026</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Audit Result:</span><span className="font-medium text-green-600">Passed</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Findings:</span><span className="font-medium text-on-surface">2 minor</span></div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
            <div className="px-5 py-3 border-b border-outline-variant bg-surface-container-low">
              <h3 className="text-sm font-semibold text-on-surface">Equipment Compliance Checklist</h3>
            </div>
            <div className="divide-y divide-outline-variant">
              {equipment.map(e => {
                const isCompliant = e.status === "operational" && e.uptime >= 95;
                const needsAttention = e.status === "calibration_due" || e.status === "maintenance";
                return (
                  <div key={e.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCompliant ? "bg-green-100" : needsAttention ? "bg-amber-100" : "bg-red-100"}`}>
                        {isCompliant ? (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        ) : needsAttention ? (
                          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" /></svg>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-on-surface">{e.name}</span>
                        <span className="text-xs text-on-surface-variant ml-2">{e.serial}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${isCompliant ? "bg-green-100 text-green-800" : needsAttention ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>
                      {isCompliant ? "Compliant" : needsAttention ? "Attention" : "Non-Compliant"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all">Generate Compliance Report</button>
            <button className="px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant">Export for NAFDAC Audit (PDF)</button>
          </div>
        </div>
      )}
    </div>
  );
}
