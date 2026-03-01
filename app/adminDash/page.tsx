"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/userSlice";
import Users from "../../components/Users";
import Products from "../../components/Products";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Kanban,
  Inbox,
  Users as UsersIcon,
  ShoppingBag,
  LogIn,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Package,
  Menu,
  X,
} from "lucide-react";

// Stat card counter animation hook
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon: Icon,
  gradient,
  delay,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}) {
  const animatedValue = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
    >
      {/* Gradient accent top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      {/* Glow on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient} blur-3xl`}
        style={{ opacity: 0.05 }}
      />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            {title === "Revenue" ? `$${animatedValue.toLocaleString()}` : animatedValue.toLocaleString()}
          </p>
        </div>
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4 text-sm relative z-10">
        <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
        <span className="text-emerald-400 font-medium">+12.5%</span>
        <span className="text-slate-500 ml-2">from last month</span>
      </div>
    </motion.div>
  );
}

// Sidebar nav items configuration
const navItems = [
  { label: "Dashboard", tab: "dashboard", icon: LayoutDashboard },
  { label: "Kanban", tab: "kanban", icon: Kanban, badge: "Pro" },
  { label: "Inbox", tab: "inbox", icon: Inbox, count: 3 },
  { label: "Users", tab: "users", icon: UsersIcon },
  { label: "Products", tab: "products", icon: ShoppingBag },
  { label: "Sign In", tab: "signin", icon: LogIn },
];

function Page() {
  const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const tab = searchParams.get("tab") || "dashboard";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        dispatch(logout());
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userName = currentUser?.name || "Admin";
  const userEmail = currentUser?.email || "admin@pos.com";
  const userRole = currentUser?.role || "admin";

  // Show loading/redirect screen when not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20 animate-pulse">
            <LogOut className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-slate-400 text-sm font-medium">Redirecting to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ========== TOP NAVBAR ========== */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((p) => !p)}
                className="sm:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Package className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  PoS
                </span>
              </div>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setOpenProfile((p) => !p)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-lg">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-slate-300">
                    {userName}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-14 w-64 glass-card rounded-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">
                          {userName}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {userEmail}
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 text-violet-300 border border-violet-500/20">
                          {userRole.toUpperCase()}
                        </span>
                      </div>
                      <div className="p-2">
                        {["Dashboard", "Settings", "Earnings"].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            {item}
                          </a>
                        ))}
                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            setOpen(true);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-rose-400 rounded-xl hover:bg-rose-500/10 transition-all duration-200"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== MOBILE BACKDROP ========== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform duration-300 ease-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 glass-sidebar`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-4 pt-20 pb-6 custom-scrollbar overflow-y-auto">
          {/* Nav Section Label */}
          <p className="px-3 mb-3 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
            Menu
          </p>

          {/* Nav Items */}
          <ul className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const isActive = tab === item.tab;
              return (
                <li key={item.tab}>
                  <a
                    href={`/adminDash?tab=${item.tab}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${isActive
                        ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors duration-200 ${isActive
                        ? "text-cyan-400"
                        : "text-slate-500 group-hover:text-white"
                        }`}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gradient-to-r from-amber-600/30 to-orange-600/30 text-amber-400 border border-amber-500/20">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {item.count}
                      </span>
                    )}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Sidebar Footer: User Info + Logout */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/20">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              </div>
              {isLoggedIn && (
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ========== LOGOUT MODAL ========== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm mx-4 glass-card rounded-3xl overflow-hidden"
            >
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/20">
                  <LogOut className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sign Out?
                </h3>
                <p className="text-sm text-slate-400 mb-8">
                  Are you sure you want to sign out of your account?
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-5 py-3 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex-1 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25 transition-all duration-200"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== MAIN CONTENT ========== */}
      <div className="sm:ml-64 pt-[73px] min-h-screen">
        <AnimatePresence mode="wait">
          {/* Dashboard Overview */}
          {(tab === "dashboard" || (!tab)) && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8"
            >
              {/* Welcome Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10">
                  <p className="text-slate-400 text-sm font-medium">
                    Welcome back,
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold mt-1 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    {userName} 👋
                  </h1>
                  <p className="text-slate-400 mt-2 max-w-lg">
                    Here&apos;s what&apos;s happening with your store today. Stay on top of
                    your business metrics.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isLoggedIn
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isLoggedIn ? "bg-emerald-400" : "bg-rose-400"
                          }`}
                      />
                      {isLoggedIn ? "Online" : "Offline"}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={2847}
                  icon={UsersIcon}
                  gradient="from-cyan-400 to-blue-500"
                  delay={0.1}
                />
                <StatCard
                  title="Products"
                  value={456}
                  icon={ShoppingBag}
                  gradient="from-violet-400 to-purple-600"
                  delay={0.2}
                />
                <StatCard
                  title="Revenue"
                  value={52380}
                  icon={DollarSign}
                  gradient="from-emerald-400 to-teal-500"
                  delay={0.3}
                />
                <StatCard
                  title="Orders"
                  value={1294}
                  icon={Package}
                  gradient="from-amber-400 to-orange-500"
                  delay={0.4}
                />
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 glass-card rounded-3xl p-8"
              >
                <h2 className="text-lg font-bold text-white mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      action: "New user registered",
                      user: "Sarah Johnson",
                      time: "2 min ago",
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      action: "Product added",
                      user: "iPhone 16 Pro",
                      time: "15 min ago",
                      color: "from-violet-400 to-purple-500",
                    },
                    {
                      action: "Order completed",
                      user: "Order #1294",
                      time: "1 hour ago",
                      color: "from-emerald-400 to-teal-500",
                    },
                    {
                      action: "Payment received",
                      user: "$849.00",
                      time: "3 hours ago",
                      color: "from-amber-400 to-orange-500",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {item.action}
                        </p>
                        <p className="text-xs text-slate-500">{item.user}</p>
                      </div>
                      <span className="text-xs text-slate-500 flex-shrink-0">
                        {item.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Users Tab */}
          {tab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8"
            >
              <Users />
            </motion.div>
          )}

          {/* Products Tab */}
          {tab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8"
            >
              <Products />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Page;
