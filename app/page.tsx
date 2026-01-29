"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics";
import Reports from "../components/Reports";
import Contact from "../components/Contact";

export default function GraphPageDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Update active navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Update active navigation
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Message Sent! ✓";
    submitBtn.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";

    e.target.reset();

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "linear-gradient(135deg, #ff6b6b, #ff8e53)";
    }, 3000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white font-sans overflow-x-hidden">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero scrollToSection={scrollToSection} />
      <Dashboard />
      <Analytics />
      <Reports />
      <Contact handleFormSubmit={handleFormSubmit} />
    </div>
  );
}
