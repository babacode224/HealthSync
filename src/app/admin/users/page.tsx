"use client";

import { useState } from "react";

type Role = "patient" | "doctor" | "pharmacist" | "lab_tech" | "admin";
type Status = "active" | "suspended" | "pending";

type User = {
  id: string; name: string; email: string; avatar: string; avatarBg: string;
  role: Role; status: Status; joined: string; lastActive: string; location: string;
};

const users: User[] = [
  { id: "USR-001", name: "Adaeze Okafor", email: "adaeze.o@email.com", avatar: "AO", avatarBg: "bg-primary", role: "patient", status: "active", joined: "Jan 15, 2026", lastActive: "Today", location: "Lagos" },
  { id: "USR-002", name: "Dr. Sarah Jenkins", email: "sarah.j@healthsync.ng", avatar: "SJ", avatarBg: "bg-secondary", role: "doctor", status: "active", joined: "Nov 3, 2025", lastActive: "Today", location: "Abuja" },
  { id: "USR-003", name: "Bayo Yusuf", email: "bayo.y@email.com", avatar: "BY", avatarBg: "bg-tertiary", role: "patient", status: "active", joined: "Mar 22, 2026", lastActive: "Yesterday", location: "Lagos" },
  { id: "USR-004", name: "Dr. James Adeyemi", email: "james.a@healthsync.ng", avatar: "JA", avatarBg: "bg-primary", role: "doctor", status: "active", joined: "Oct 18, 2025", lastActive: "Today", location: "Port Harcourt" },
  { id: "USR-005", name: "Pharm. Chidinma Eze", email: "chidinma.e@rxcare.ng", avatar: "CE", avatarBg: "bg-secondary", role: "pharmacist", status: "active", joined: "Dec 1, 2025", lastActive: "Today", location: "Lagos" },
  { id: "USR-006", name: "Emeka Madu", email: "emeka.m@email.com", avatar: "EM", avatarBg: "bg-tertiary", role: "patient", status: "suspended", joined: "Feb 10, 2026", lastActive: "Jun 15", location: "Enugu" },
  { id: "USR-007", name: "Fatima Bello", email: "fatima.b@email.com", avatar: "FB", avatarBg: "bg-primary", role: "patient", status: "pending", joined: "Jun 22, 2026", lastActive: "Never", location: "Kano" },
  { id: "USR-008", name: "Lab. Olumide Fash", email: "olumide.f@diaglab.ng", avatar: "OF", avatarBg: "bg-secondary", role: "lab_tech", status: "active", joined: "Jan 5, 2026", lastActive: "Today", location: "Lagos" },
  { id: "USR-009", name: "Dr. Linda Baji", email: "linda.b@healthsync.ng", avatar: "LB", avatarBg: "bg-tertiary", role: "doctor", status: "active", joined: "Sep 20, 2025", lastActive: "Today", location: "Ibadan" },
  { id: "USR-010", name: "Admin Kola Ajayi", email: "kola.a@healthsync.ng", avatar: "KA", avatarBg: "bg-primary", role: "admin", status: "active", joined: "Aug 1, 2025", lastActive: "Today", location: "Lagos" },
  { id: "USR-011", name: "Grace Okwu", email: "grace.o@email.com", avatar: "GO", avatarBg: "bg-secondary", role: "patient", status: "active", joined: "Apr 14, 2026", lastActive: "Jun 20", location: "Benin City" },
  { id: "USR-012", name: "Tunde Edun", email: "tunde.e@email.com", avatar: "TE", avatarBg: "bg-tertiary", role: "patient", status: "pending", joined: "Jun 23, 2026", lastActive: "Never", location: "Lagos" },
];

type RoleFilter = "all" | Role;

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const roleLabel = (r: Role) => ({ patient: "Patient", doctor: "Doctor", pharmacist: "Pharmacist", lab_tech: "Lab Tech", admin: "Admin" }[r]);
  const roleStyle = (r: Role) => ({ patient: "bg-primary-fixed text-primary", doctor: "bg-secondary-container/50 text-secondary", pharmacist: "bg-tertiary-fixed/30 text-tertiary", lab_tech: "bg-surface-container-high text-on-surface-variant", admin: "bg-error-container/50 text-error" }[r]);
  const statusStyle = (s: Status) => ({ active: "bg-secondary-container/50 text-secondary", suspended: "bg-error-container/50 text-error", pending: "bg-tertiary-fixed/30 text-tertiary" }[s]);

  const counts = { all: users.length, patient: users.filter((u) => u.role === "patient").length, doctor: users.filter((u) => u.role === "doctor").length, pharmacist: users.filter((u) => u.role === "pharmacist").length, lab_tech: users.filter((u) => u.role === "lab_tech").length, admin: users.filter((u) => u.role === "admin").length };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">User Management</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">{users.length} registered users across all roles</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {([["all", "Total"], ["patient", "Patients"], ["doctor", "Doctors"], ["pharmacist", "Pharmacists"], ["lab_tech", "Lab Techs"], ["admin", "Admins"]] as [RoleFilter, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setRoleFilter(key === roleFilter ? "all" : key)} className={`text-left bg-surface-container-lowest border rounded-xl p-3 hover:shadow-sm transition-all ${key === roleFilter ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
            <div className="text-xl font-bold text-on-surface">{counts[key]}</div>
            <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wide">{label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* User table */}
        <div className="lg:col-span-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 px-4 py-2.5 border-b border-outline-variant bg-surface-container-low">
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase col-span-2">User</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Role</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Status</span>
              <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">Last Active</span>
            </div>
            {filtered.length === 0 && <div className="p-6 text-center text-sm text-on-surface-variant">No users match your search</div>}
            {filtered.map((user, i) => (
              <div key={user.id} onClick={() => setSelectedUser(user)} className={`grid sm:grid-cols-5 gap-1 sm:gap-0 items-center px-4 py-3 cursor-pointer hover:bg-surface-container-low transition-colors ${i < filtered.length - 1 ? "border-b border-outline-variant" : ""} ${selectedUser?.id === user.id ? "bg-primary-fixed/20" : ""}`}>
                <div className="flex items-center gap-2.5 col-span-2">
                  <div className={`w-9 h-9 rounded-full ${user.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{user.avatar}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-on-surface truncate">{user.name}</div>
                    <div className="text-[10px] text-on-surface-variant truncate">{user.email}</div>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit ${roleStyle(user.role)}`}>{roleLabel(user.role)}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit capitalize ${statusStyle(user.status)}`}>{user.status}</span>
                <span className="text-xs text-on-surface-variant">{user.lastActive}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selectedUser ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden sticky top-20">
              <div className="bg-primary p-5 text-on-primary text-center">
                <div className={`w-16 h-16 rounded-full ${selectedUser.avatarBg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-2 ring-4 ring-white/30`}>{selectedUser.avatar}</div>
                <div className="text-lg font-bold">{selectedUser.name}</div>
                <div className="text-xs opacity-80">{selectedUser.email}</div>
                <div className="flex gap-2 justify-center mt-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20">{roleLabel(selectedUser.role)}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 capitalize">{selectedUser.status}</span>
                </div>
              </div>
              <div className="p-4 space-y-3 text-sm border-b border-outline-variant">
                <div className="flex justify-between"><span className="text-on-surface-variant">User ID</span><span className="font-mono font-medium text-on-surface">{selectedUser.id}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Location</span><span className="font-medium text-on-surface">{selectedUser.location}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Joined</span><span className="font-medium text-on-surface">{selectedUser.joined}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Last Active</span><span className="font-medium text-on-surface">{selectedUser.lastActive}</span></div>
              </div>
              <div className="p-4 space-y-2">
                {selectedUser.status === "pending" && <button className="w-full py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-all">Approve Account</button>}
                {selectedUser.status === "suspended" && <button className="w-full py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-all">Reactivate Account</button>}
                {selectedUser.status === "active" && <button className="w-full py-2 rounded-lg border border-outline-variant text-xs font-semibold text-tertiary hover:border-tertiary transition-all">Suspend Account</button>}
                <button className="w-full py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:text-primary hover:border-primary transition-all">Reset Password</button>
                {selectedUser.role !== "admin" && <button className="w-full py-2 rounded-lg border border-outline-variant text-xs font-semibold text-error hover:border-error transition-all">Delete Account</button>}
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <p className="text-sm font-semibold text-on-surface">Select a User</p>
              <p className="text-xs text-on-surface-variant mt-1">Click any user to view details and manage their account</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
