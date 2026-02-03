"use client";
import React from "react";
import Link from "next/link";

export default function Hero({ scrollToSection }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 px-4 md:px-12 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(45deg, transparent 30%, rgba(0, 255, 204, 0.1) 50%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255, 0, 128, 0.1) 50%, transparent 70%)",
          animation: "bgShift 20s ease-in-out infinite",
        }}
      ></div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          {
            w: 300,
            h: 300,
            top: "10%",
            left: "-150px",
            rotate: -45,
            delay: "0s",
          },
          {
            w: 200,
            h: 200,
            top: "60%",
            right: "-100px",
            rotate: 0,
            delay: "0s",
            borderColor: "rgba(255, 0, 128, 0.3)",
          },
          {
            w: 150,
            h: 150,
            bottom: "20%",
            left: "10%",
            rotate: 30,
            delay: "0s",
          },
          {
            w: 250,
            h: 250,
            top: "15%",
            right: "5%",
            rotate: 45,
            delay: "0s",
          },
          {
            w: 180,
            h: 180,
            top: "55%",
            right: "12%",
            rotate: -30,
            delay: "0s",
          },
          {
            w: 120,
            h: 120,
            bottom: "15%",
            right: "8%",
            rotate: 20,
            delay: "0s",
          },
        ].map((shape, i) => (
          <div
            key={i}
            className="absolute border-2"
            style={{
              width: shape.w,
              height: shape.h,
              top: shape.top,
              bottom: shape.bottom,
              left: shape.left,
              right: shape.right,
              borderColor: shape.borderColor || "rgba(0, 255, 204, 0.3)",
              transform: `rotate(${shape.rotate}deg)`,
              animation: `float ${15 + i * 2}s ease-in-out infinite`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Data Analytics
            <br />
            Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md">
            Transform your data into actionable insights with our cutting-edge
            analytics platform. Real-time monitoring, intelligent predictions,
            and beautiful visualizations.
          </p>
          <button
            onClick={() => scrollToSection("dashboard")}
            className="px-10 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
            }}
            suppressHydrationWarning
          >
            {" "}
            <Link href="/register"> Get Started</Link>
          </button>
        </div>

        {/* Visual */}
        <div className="relative h-96 hidden md:block">
          <div className="relative w-full h-full perspective">
            {[
              {
                w: 60,
                h: 250,
                left: "20%",
                bgGradient: "from-cyan-400 to-blue-400",
                fillHeight: "45%",
                delay: "0s",
              },
              {
                w: 80,
                h: 320,
                left: "35%",
                bgGradient: "from-pink-500 to-rose-500",
                fillHeight: "60%",
                delay: "0.5s",
              },
              {
                w: 90,
                h: 280,
                right: "25%",
                bgGradient: "from-blue-400 to-cyan-400",
                fillHeight: "35%",
                delay: "1s",
              },
              {
                w: 70,
                h: 200,
                right: "10%",
                bgGradient: "from-red-500 to-orange-500",
                fillHeight: "50%",
                delay: "1.5s",
              },
            ].map((building, i) => (
              <div
                key={i}
                className="absolute bottom-0 rounded-lg overflow-hidden border border-cyan-400/20"
                style={{
                  width: building.w,
                  height: building.h,
                  left: building.left,
                  right: building.right,
                  background:
                    "linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)",
                  boxShadow:
                    "0 0 20px rgba(0, 255, 204, 0.1), inset 0 0 20px rgba(0, 255, 204, 0.05)",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, rgb(0, 255, 204) 100%)`,
                    height: building.fillHeight,
                    animation: "pulse 3s ease-in-out infinite",
                    animationDelay: building.delay,
                  }}
                ></div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255, 255, 255, 0.05) 8px, rgba(255, 255, 255, 0.05) 10px)",
                    opacity: 0.8,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bgShift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate)); }
          50% { transform: translateY(-20px) rotate(var(--rotate)); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
        }
        @keyframes slideUp {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
