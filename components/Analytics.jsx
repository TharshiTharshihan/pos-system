"use client";
import React from "react";
import { motion } from "framer-motion";

const metrics = [
  { value: "2.4M", label: "Page Views" },
  { value: "156K", label: "Unique Visitors" },
  { value: "4.2min", label: "Avg Session" },
  { value: "68%", label: "Return Rate" },
  { value: "89", label: "NPS Score" },
  { value: "3.2K", label: "Daily Active" },
];

export default function Analytics() {
  return (
    <section
      id="analytics"
      className="py-20 px-4 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Advanced Analytics
        </h2>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                },
              }}
              className="bg-white/3 border border-white/10 rounded-2xl p-4 text-center
                     hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-[#00ffcc] mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6 hover:bg-white/5 transition-all relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
              <h3 className="text-xl font-semibold">📈 Monthly Trends</h3>
              <div className="flex gap-2">
                {["2024", "2023", "2022"].map((year, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      i === 0
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-64 md:h-72 flex items-end justify-around gap-2 md:gap-3 px-2 md:px-4 overflow-x-auto">
              {[
                { height: 60, value: 120, label: "Jan" },
                { height: 80, value: 180, label: "Feb" },
                { height: 45, value: 90, label: "Mar" },
                { height: 70, value: 140, label: "Apr" },
                { height: 90, value: 200, label: "May" },
                { height: 65, value: 130, label: "Jun" },
                { height: 75, value: 150, label: "Jul" },
                { height: 85, value: 170, label: "Aug" },
              ].map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-cyan-400 to-cyan-300 cursor-pointer hover:scale-y-105 transition-transform relative group"
                    style={{ height: `${bar.height}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {bar.value}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Analytics */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6 hover:bg-white/5 transition-all relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
              <h3 className="text-xl font-semibold">📊 Growth Analytics</h3>
              <div className="flex gap-2">
                {["Week", "Month", "Year"].map((period, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      i === 0
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    {period}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <svg
                className="w-full h-64 md:h-72 min-w-full"
                viewBox="0 0 500 300"
                style={{
                  filter: "drop-shadow(0 0 1px rgba(0, 255, 204, 0.1))",
                }}
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#00ffcc", stopOpacity: 0.5 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00ffcc", stopOpacity: 0 }}
                    />
                  </linearGradient>
                </defs>
                {[50, 100, 150, 200, 250].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="500"
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M 0,200 L 62,180 L 125,150 L 187,170 L 250,120 L 312,140 L 375,100 L 437,130 L 500,110 L 500,300 L 0,300 Z"
                  fill="url(#gradient)"
                />
                <path
                  d="M 0,200 L 62,180 L 125,150 L 187,170 L 250,120 L 312,140 L 375,100 L 437,130 L 500,110"
                  stroke="#00ffcc"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(0, 255, 204, 0.5))",
                  }}
                />
                {[0, 62, 125, 187, 250, 312, 375, 437, 500].map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={[200, 180, 150, 170, 120, 140, 100, 130, 110][i]}
                    r="4"
                    fill="#00ffcc"
                    stroke="#0a0e27"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6 hover:bg-white/5 transition-all relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
              <h3 className="text-xl font-semibold">
                🌍 Geographic Distribution
              </h3>
              <div className="flex gap-2">
                {["Global", "US", "EU"].map((region, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      i === 0
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-64 md:h-72 flex items-end justify-around gap-2 md:gap-4 px-2 md:px-4 overflow-x-auto">
              {[
                {
                  height: 85,
                  value: "42%",
                  label: "USA",
                  gradient: "from-red-500 to-orange-500",
                },
                {
                  height: 65,
                  value: "28%",
                  label: "EU",
                  gradient: "from-teal-500 to-green-600",
                },
                {
                  height: 45,
                  value: "18%",
                  label: "Asia",
                  gradient: "from-blue-500 to-lime-400",
                },
                {
                  height: 25,
                  value: "12%",
                  label: "Other",
                  gradient: "from-pink-500 to-red-600",
                },
              ].map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div
                    className={`w-full rounded-t-lg bg-gradient-to-t ${bar.gradient} cursor-pointer hover:scale-y-105 transition-transform relative`}
                    style={{ height: `${bar.height}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.value}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Analytics */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6 hover:bg-white/5 transition-all relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
              <h3 className="text-xl font-semibold">📱 Device Analytics</h3>
              <div className="flex gap-2">
                {["This Month", "Last Month", "YTD"].map((period, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      i === 0
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    {period}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <svg
                className="w-full h-64 md:h-72 min-w-full"
                viewBox="0 0 500 300"
              >
                {[60, 120, 180, 240].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="500"
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M 0,180 L 71,160 L 142,140 L 214,120 L 285,100 L 357,90 L 428,80 L 500,70"
                  stroke="#ff6b6b"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))",
                  }}
                />
                <path
                  d="M 0,220 L 71,210 L 142,200 L 214,190 L 285,185 L 357,180 L 428,175 L 500,170"
                  stroke="#00ffcc"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(0, 255, 204, 0.5))",
                  }}
                />
                {[0, 71, 142, 214, 285, 357, 428, 500].map((x, i) => (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={[180, 160, 140, 120, 100, 90, 80, 70][i]}
                      r="4"
                      fill="#ff6b6b"
                    />
                    <circle
                      cx={x}
                      cy={[220, 210, 200, 190, 185, 180, 175, 170][i]}
                      r="4"
                      fill="#00ffcc"
                    />
                  </g>
                ))}
                <text x="20" y="50" fill="#ff6b6b" fontSize="12">
                  Mobile
                </text>
                <text x="20" y="35" fill="#00ffcc" fontSize="12">
                  Desktop
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
