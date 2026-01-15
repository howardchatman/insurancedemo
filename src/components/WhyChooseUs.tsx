"use client";

import { Clock, Users, Award, HeartHandshake, Phone, MessageSquare, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Claims Support",
    description:
      "File and track claims anytime. Our AI-powered system and dedicated team are always available when you need us.",
    stat: "Always On",
  },
  {
    icon: Award,
    title: "A+ Rated Carrier",
    description:
      "Backed by AM Best A+ rated carriers, ensuring your claims are paid and your coverage is secure.",
    stat: "Top Rated",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description:
      "Every policy is tailored to your unique needs. Work with licensed advisors who understand your situation.",
    stat: "Custom Plans",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description:
      "Access to multiple carriers means we find you the best coverage at the most competitive prices.",
    stat: "Save 40%",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-accent-400">Chatman Insurance</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We combine cutting-edge technology with personalized service to deliver an exceptional insurance experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-accent-400 text-sm font-semibold mb-2">
                {feature.stat}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-accent-500/20 to-accent-400/20 backdrop-blur-sm border border-accent-500/30 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Protect What Matters?
              </h3>
              <p className="text-white/70 mb-6">
                Our AI assistant is available 24/7 to answer your questions, compare plans, and help you find the perfect coverage. Get started today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+18327707998"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us Now</span>
                </a>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-400 transition-all">
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat with ARIA</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-white mb-1">50K+</div>
                  <div className="text-white/60">Policies Issued</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-white mb-1">98%</div>
                  <div className="text-white/60">Claim Approval</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-white mb-1">$2.5B</div>
                  <div className="text-white/60">Claims Paid</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/60">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
