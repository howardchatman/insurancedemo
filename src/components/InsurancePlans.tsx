"use client";

import { useState } from "react";
import { Shield, Car, Home, Heart, Briefcase, Check, ArrowRight, Star } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Auto Insurance",
    description: "Comprehensive coverage for your vehicles with accident forgiveness and roadside assistance.",
    icon: Car,
    startingPrice: 89,
    features: [
      "Collision & comprehensive coverage",
      "Liability protection",
      "Uninsured motorist coverage",
      "24/7 roadside assistance",
      "Accident forgiveness",
    ],
    tag: "Most Popular",
    tagColor: "bg-accent-500",
    color: "primary",
  },
  {
    id: 2,
    name: "Home Insurance",
    description: "Protect your home and belongings with our comprehensive homeowner coverage.",
    icon: Home,
    startingPrice: 125,
    features: [
      "Dwelling coverage",
      "Personal property protection",
      "Liability coverage",
      "Additional living expenses",
      "Natural disaster protection",
    ],
    tag: "Best Value",
    tagColor: "bg-trust-500",
    color: "trust",
  },
  {
    id: 3,
    name: "Life Insurance",
    description: "Secure your family's future with flexible term and whole life options.",
    icon: Heart,
    startingPrice: 45,
    features: [
      "Term life options (10-30 years)",
      "Whole life coverage available",
      "Living benefits included",
      "No medical exam options",
      "Guaranteed acceptance plans",
    ],
    tag: "Family Essential",
    tagColor: "bg-red-500",
    color: "accent",
  },
  {
    id: 4,
    name: "Business Insurance",
    description: "Complete protection for your business with customizable coverage options.",
    icon: Briefcase,
    startingPrice: 199,
    features: [
      "General liability coverage",
      "Professional liability (E&O)",
      "Commercial property",
      "Workers compensation",
      "Cyber liability protection",
    ],
    tag: "Enterprise",
    tagColor: "bg-primary-700",
    color: "primary",
  },
];

export default function InsurancePlans() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="plans" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-4">
            <Shield className="w-4 h-4 text-primary-700 mr-2" />
            <span className="text-primary-700 font-semibold text-sm">
              Comprehensive Coverage Options
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Insurance Plans for <span className="text-primary-700">Every Need</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our range of insurance products designed to protect what matters most to you and your family.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group premium-card relative"
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Tag */}
              <div className={`absolute top-4 right-4 ${plan.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {plan.tag}
              </div>

              <div className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <plan.icon className="w-7 h-7 text-primary-700" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-sm text-gray-500">Starting at</span>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">${plan.startingPrice}</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-trust-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-primary-800 hover:text-white transition-all flex items-center justify-center space-x-2 group-hover:bg-primary-800 group-hover:text-white">
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="mt-12 bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Star className="w-8 h-8 text-accent-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Bundle & Save Up to 25%</h3>
                <p className="text-white/80">Combine auto, home, and life insurance for maximum savings.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-400 transition-all flex items-center space-x-2">
              <span>Create Your Bundle</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
