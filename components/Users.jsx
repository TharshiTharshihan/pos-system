"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Shield,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "admin",
    status: "active",
    joined: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "user",
    status: "active",
    joined: "Feb 3, 2026",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    role: "user",
    status: "active",
    joined: "Feb 10, 2026",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    role: "admin",
    status: "inactive",
    joined: "Dec 22, 2025",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@email.com",
    role: "user",
    status: "active",
    joined: "Jan 28, 2026",
  },
  {
    id: 6,
    name: "Daniel Kim",
    email: "daniel.kim@email.com",
    role: "user",
    status: "active",
    joined: "Feb 18, 2026",
  },
];

const roleColors = {
  admin: {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
  },
  user: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    dot: "bg-cyan-400",
  },
};

const statusColors = {
  active: { dot: "bg-emerald-400", shadow: "shadow-emerald-400/50" },
  inactive: { dot: "bg-slate-500", shadow: "shadow-slate-500/50" },
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {mockUsers.length} total users •{" "}
            {mockUsers.filter((u) => u.status === "active").length} active
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="search"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
        />
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredUsers.map((user, index) => {
          const role = roleColors[user.role] || roleColors.user;
          const status = statusColors[user.status] || statusColors.active;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 relative group"
            >
              {/* Top accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${user.role === "admin"
                    ? "from-violet-500 to-fuchsia-500"
                    : "from-cyan-500 to-blue-500"
                  }`}
              />

              {/* Actions Menu */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === user.id ? null : user.id)
                  }
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {activeMenu === user.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-8 w-36 glass-card rounded-xl py-1.5 z-10"
                  >
                    {[
                      { icon: Eye, label: "View", color: "text-slate-300" },
                      { icon: Pencil, label: "Edit", color: "text-slate-300" },
                      { icon: Trash2, label: "Delete", color: "text-rose-400" },
                    ].map((action) => (
                      <button
                        key={action.label}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${action.color} hover:bg-white/5 transition-all duration-150`}
                      >
                        <action.icon className="w-3.5 h-3.5" />
                        {action.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Avatar + Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${user.role === "admin"
                      ? "from-violet-500 to-fuchsia-600"
                      : "from-cyan-400 to-blue-500"
                    } flex items-center justify-center text-lg font-bold text-white shadow-lg flex-shrink-0`}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white truncate">
                      {user.name}
                    </h3>
                    <span
                      className={`w-2 h-2 rounded-full ${status.dot} shadow-lg ${status.shadow} flex-shrink-0`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${role.bg} ${role.text} border ${role.border}`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Joined {user.joined}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Search className="w-7 h-7 text-slate-500" />
          </div>
          <p className="text-slate-400 font-medium">No users found</p>
          <p className="text-slate-500 text-sm mt-1">
            Try adjusting your search criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}
