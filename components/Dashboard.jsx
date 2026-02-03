"use client";
import React, { useEffect } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { BiSolidChart } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import { TbBolt } from "react-icons/tb";

export default function Dashboard() {
  useEffect(() => {
    // Draw mini charts
    const drawMiniChart = (canvasId, color) => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const points = [];
      for (let i = 0; i < 10; i++) {
        points.push(Math.random() * canvas.height);
      }

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      points.forEach((point, index) => {
        const x = (canvas.width / (points.length - 1)) * index;
        const y = point;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.stroke();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color + "40");
      gradient.addColorStop(1, color + "00");

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const timer = setTimeout(() => {
      drawMiniChart("miniChart1", "#00ffcc");
      drawMiniChart("miniChart2", "#ff0080");
      drawMiniChart("miniChart3", "#00ccff");
      drawMiniChart("miniChart4", "#ffcc00");
      drawMiniChart("miniChart5", "#ff6b6b");
      drawMiniChart("miniChart6", "#4ecdc4");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="dashboard"
      className="py-20 px-4 md:px-12 bg-gradient-to-b from-slate-900 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <BiSolidChart className="text-[#9c0dd0]" />,
              title: "Total Revenue",
              value: "$42,847",
              desc: "Monthly revenue increased by 23% compared to last month with strong performance across all channels.",
              id: "miniChart1",
              color: "#00ffcc",
            },
            {
              icon: <FaUsers className="text-[#000000]" />,
              title: "Active Users",
              value: "18.5K",
              desc: "Real-time analytics showing active users currently engaging with the platform.",
              id: "miniChart2",
              color: "#ff0080",
            },
            {
              icon: <TbTargetArrow className="text-[#ff0080]" />,
              title: "Conversion Rate",
              value: "94.3%",
              desc: "Customer satisfaction rate based on recent surveys and feedback analysis.",
              id: "miniChart3",
              color: "#00ccff",
            },
            {
              icon: <MdShowChart className="text-[#ff461d]" />,
              title: "Performance Score",
              value: "7,392",
              desc: "Overall system performance metrics showing optimal operation across all services.",
              id: "miniChart4",
              color: "#ffcc00",
            },
            {
              icon: <BiMoney className="text-[#eef077]" />,
              title: "Monthly Growth",
              value: "+28.5%",
              desc: "Consistent month-over-month growth in user acquisition and revenue generation.",
              id: "miniChart5",
              color: "#ff6b6b",
            },
            {
              icon: <TbBolt className="text-[#d240f0]" />,
              title: "System Uptime",
              value: "99.9%",
              desc: "Exceptional reliability with minimal downtime ensuring seamless user experience.",
              id: "miniChart6",
              color: "#4ecdc4",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/3 border border-white/10 rounded-3xl p-6 hover:bg-white/5 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: "linear-gradient(135deg, #00ffcc, #00ccff)",
                  }}
                >
                  {stat.icon}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.title}
                </div>
              </div>

              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>

              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {stat.desc}
              </p>

              <div className="h-12 rounded-lg overflow-hidden bg-white/5">
                <canvas id={stat.id} className="w-full h-full"></canvas>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
