"use client";
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Contact({ handleFormSubmit }) {
  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-8">Send us a Message</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffcc80] focus:bg-[#ffffff14] transition-all"
                  placeholder="Your name"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffcc80] focus:bg-[#ffffff14] transition-all"
                  placeholder="your@email.com"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffcc80] focus:bg-[#ffffff14] transition-all"
                  placeholder="Subject"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 font-medium mb-2">
                  Message
                </label>
                <textarea
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffcc80] focus:bg-[#ffffff14] transition-all resize-none"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  suppressHydrationWarning
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
                  boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                }}
                suppressHydrationWarning
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Contact Information
            </h3>

            {[
              {
                icon: <FaEnvelope className="text-3xl text-cyan-400" />,
                title: "Email Address",
                lines: ["hello@graphpage.com", "support@graphpage.com"],
                href: "mailto:hello@graphpage.com",
              },
              {
                icon: <FaPhone className="text-3xl text-cyan-400" />,
                title: "Phone Number",
                lines: ["+1 (555) 123-4567", "Available 24/7"],
                href: "tel:+15551234567",
              },
              {
                icon: <FaMapMarkerAlt className="text-3xl text-cyan-400" />,
                title: "Office Location",
                lines: [
                  "123 Data Drive, Suite 100",
                  "Analytics City, AC 12345",
                ],
                href: "https://maps.google.com/?q=123+Data+Drive+Suite+100+Analytics+City",
              },
              {
                icon: <FaClock className="text-3xl text-cyan-400" />,
                title: "Business Hours",
                lines: [
                  "Monday - Friday: 9:00 AM - 6:00 PM",
                  "Weekend: Emergency support only",
                ],
                href: null,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex gap-5 mb-6 p-5 rounded-2xl border transition-all cursor-pointer ${
                  item.href
                    ? "border-white/10 bg-white/3 hover:bg-white/5 hover:border-cyan-400/30 hover:translate-x-1"
                    : "border-white/10 bg-white/3"
                }`}
                onClick={() => item.href && window.open(item.href)}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-gray-400 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
