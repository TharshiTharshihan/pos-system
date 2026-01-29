"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Navigation({
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-3 bg-slate-950/98" : "py-5 bg-slate-950/95"}`}
      style={{
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00ffcc 0%, #00ccff 100%)",
              boxShadow: "0 0 20px rgba(0, 255, 204, 0.3)",
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 13h2v8H3zm4-8h2v13H7zm4-2h2v15h-2zm4 4h2v11h-2zm4-2h2v13h-2z"
                fill="rgb(10, 14, 39)"
              />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Graph Page
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-base transition-all duration-300 relative pb-2 cursor-pointer ${
                activeSection === link.id
                  ? "text-cyan-400"
                  : "text-white hover:text-orange-400"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #00ffcc, #00ccff)",
                    boxShadow: "0 0 15px rgba(0, 255, 204, 0.6)",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Search Icon */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.google.com/search"
            target="_blank"
            rel="noopener"
            className="text-white hover:scale-110 transition-transform"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-slate-950/98 backdrop-blur-lg border-b border-white/10 flex flex-col z-40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-6 py-4 text-left border-l-4 transition-all ${
                activeSection === link.id
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                  : "border-transparent text-white hover:border-orange-500 hover:bg-orange-500/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
