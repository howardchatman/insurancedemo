"use client";

import { useState } from "react";
import { Shield, Car, Home, Heart, Briefcase, ChevronDown, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import InsuranceQuiz from "./InsuranceQuiz";

export default function Hero() {
  const [selectedType, setSelectedType] = useState<"personal" | "business">("personal");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80"
          alt="Professional family"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/80 to-primary-900/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-accent-400 mr-2" />
            <span className="text-white/90 text-sm font-medium">Trusted by 50,000+ Clients Nationwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Protect What
            <span className="block text-accent-400">Matters Most</span>
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-xl">
            Comprehensive insurance solutions tailored to your life. Get personalized coverage with exceptional service, available 24/7.
          </p>

          {/* Insurance Type Selector */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSelectedType("personal")}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === "personal"
                    ? "bg-primary-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setSelectedType("business")}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === "business"
                    ? "bg-primary-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Business
              </button>
            </div>

            {selectedType === "personal" ? (
              <>
                {/* Personal Insurance Options */}
                <p className="text-sm text-gray-500 mb-4">Select the type of coverage you need:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: Car, label: "Auto", desc: "Vehicle coverage" },
                    { icon: Home, label: "Home", desc: "Property protection" },
                    { icon: Heart, label: "Life", desc: "Family security" },
                    { icon: Shield, label: "Health", desc: "Medical coverage" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:border-primary-200 border-2 border-transparent transition-all group"
                    >
                      <item.icon className="w-8 h-8 text-primary-700 mb-2 group-hover:text-primary-800" />
                      <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="flex-1 py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-accent-500/25 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Find My Coverage</span>
                  </button>
                  <a
                    href="#quote"
                    className="flex-1 py-4 bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-900/25 transition-all"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Business Insurance Options */}
                <p className="text-sm text-gray-500 mb-4">Protect your business with comprehensive coverage:</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Briefcase, label: "General Liability", desc: "Core protection" },
                    { icon: Shield, label: "Professional Liability", desc: "E&O coverage" },
                    { icon: Home, label: "Commercial Property", desc: "Asset protection" },
                    { icon: Car, label: "Commercial Auto", desc: "Fleet coverage" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:border-primary-200 border-2 border-transparent transition-all group"
                    >
                      <item.icon className="w-8 h-8 text-primary-700 mr-3 group-hover:text-primary-800" />
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 text-sm block">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="flex-1 py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-accent-500/25 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Find My Coverage</span>
                  </button>
                  <a
                    href="#contact"
                    className="flex-1 py-4 bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-900/25 transition-all"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Trust Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-white">A+</div>
              <div className="text-white/70">AM Best Rating</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div>
              <div className="text-3xl font-bold text-white">$2.5B</div>
              <div className="text-white/70">Claims Paid</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-white/70">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Quiz Modal */}
      <InsuranceQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </section>
  );
}
