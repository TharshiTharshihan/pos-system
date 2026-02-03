"use client";
import React from "react";
import {
  FaBriefcase,
  FaMobileAlt,
  FaGlobeAmericas,
  FaRocket,
  FaBolt,
  FaDatabase,
} from "react-icons/fa";

export default function Reports() {
  return (
    <section
      id="reports"
      className="py-20 px-4 md:px-12 relative"
      style={{
        background:
          "linear-gradient(135deg, #1a0033 0%, #2d1b69 50%, #0f1329 100%), linear-gradient(90deg, transparent 49%, rgba(0, 255, 204, 0.05) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(0, 255, 204, 0.05) 50%, transparent 51%)",
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #1a0033 0%, #2d1b69 50%, #0f1329 100%), linear-gradient(90deg, transparent 49%, rgba(0, 255, 204, 0.05) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(0, 255, 204, 0.05) 50%, transparent 51%)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className=" text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Reports & Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
          {[
            {
              icon: <FaBriefcase className="text-3xl text-[#00ffcc]" />,
              title: "Business Intelligence",
              value: "98.5%",
              desc: "Accuracy in predictive analytics and business forecasting models.",
            },
            {
              icon: <FaMobileAlt className="text-3xl text-[#00ffcc]" />,
              title: "Mobile Analytics",
              value: "2.4M",
              desc: "Mobile app downloads and active user engagement metrics.",
            },
            {
              icon: <FaGlobeAmericas className="text-3xl text-[#00ffcc]" />,
              title: "Global Reach",
              value: "150+",
              desc: "Countries actively using our analytics platform worldwide.",
            },
            {
              icon: <FaRocket className="text-3xl text-[#00ffcc]" />,
              title: "Performance Index",
              value: "847",
              desc: "Comprehensive performance scoring across all platform metrics.",
            },
            {
              icon: <FaBolt className="text-3xl text-[#00ffcc]" />,
              title: "Response Time",
              value: "0.2s",
              desc: "Average API response time ensuring optimal user experience.",
            },
            {
              icon: <FaDatabase className="text-3xl text-[#00ffcc]" />,
              title: "Data Processing",
              value: "12TB",
              desc: "Daily data volume processed through our analytics pipeline.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/3 border border-white/10 rounded-3xl p-6 text-center hover:bg-[#00ffcc0d] hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <div className="text-3xl font-bold text-cyan-400 mb-3">
                {card.value}
              </div>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
