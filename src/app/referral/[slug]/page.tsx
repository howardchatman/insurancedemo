"use client";

import { useParams } from "next/navigation";
import {
  Gift,
  Users,
  CheckCircle,
  ArrowRight,
  Shield,
  Phone,
  Clock,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ARIAChat from "@/components/ARIAChat";

export default function PersonalReferralPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Convert slug back to name (sarah-johnson -> Sarah Johnson)
  const referrerName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const howItWorks = [
    {
      icon: Shield,
      title: "Get Your Quote",
      description: "Answer a few quick questions to get a personalized insurance quote in minutes.",
    },
    {
      icon: Phone,
      title: "Talk to an Advisor",
      description: "Our licensed advisors will help you find the perfect coverage for your needs.",
    },
    {
      icon: Gift,
      title: "You Both Earn",
      description: `When you purchase a policy, both you and ${referrerName} receive $50!`,
    },
  ];

  const benefits = [
    "24/7 AI assistant - no more hold times",
    "Instant quotes in minutes, not days",
    "Easy online claims filing",
    "Competitive rates that save money",
    "Licensed advisors when you need them",
    "Bundle discounts up to 25%",
  ];

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-800 pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-accent-500 rounded-full mb-4 md:mb-6">
            <Gift className="w-3 h-3 md:w-4 md:h-4 text-white mr-1.5 md:mr-2" />
            <span className="text-white text-xs md:text-sm font-medium">Personal Invitation</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 px-2">
            <span className="text-accent-400">{referrerName}</span> Thinks You'll Love Us!
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Get a free quote today and you'll both earn <span className="font-bold text-accent-400">$50</span> when you purchase a policy.
          </p>

          {/* Trust Indicators - Stack on mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-xs sm:text-sm">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-accent-400 fill-accent-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/80 text-xs sm:text-sm">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/80 text-xs sm:text-sm">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-accent-400" />
              <span>10,000+ Clients</span>
            </div>
          </div>

          <a
            href="#quote"
            className="inline-flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-accent-500 text-white rounded-xl font-semibold text-sm md:text-lg hover:bg-accent-400 transition-all shadow-lg"
          >
            <span>Get My Free Quote</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>

          <p className="mt-3 md:mt-4 text-white/70 text-xs md:text-sm">
            Takes less than 2 minutes. No commitment required.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4">How It Works</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Getting covered is simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <step.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-700" />
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-500 text-white flex items-center justify-center mx-auto mb-3 md:mb-4 text-xs md:text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-600 px-4 md:px-0">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Why {referrerName} Recommends Us
              </h2>
              <div className="space-y-3 md:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-500 to-accent-400 rounded-xl md:rounded-2xl p-5 md:p-8 text-white">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center text-base md:text-xl font-bold flex-shrink-0">
                  {referrerName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base truncate">{referrerName}</p>
                  <p className="text-xs md:text-sm text-white/80">Chatman Insurance Client</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 italic">
                "I love my insurance experience with Chatman Insurance! The AI support is available 24/7 and claims are super fast."
              </p>
              <div className="bg-white/20 rounded-lg md:rounded-xl p-3 md:p-4">
                <p className="text-xs md:text-sm text-white/90">
                  <strong>Your reward:</strong> Get $50 when you purchase a policy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="py-10 md:py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-12 h-12 md:w-16 md:h-16 text-accent-400 mx-auto mb-4 md:mb-6" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6 md:mb-8 px-2">
            Join {referrerName} and thousands of happy customers. Get your free quote now!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <a
              href="/#quote"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-accent-500 text-white rounded-xl font-semibold text-sm md:text-lg hover:bg-accent-400 transition-all"
            >
              <span>Get My Free Quote</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="tel:+13464820150"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 md:px-8 md:py-4 bg-white/10 text-white rounded-xl font-semibold text-sm md:text-lg hover:bg-white/20 transition-all"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span>(346) 482-0150</span>
            </a>
          </div>
          <p className="mt-4 md:mt-6 text-white/60 text-xs md:text-sm">
            Referred by {referrerName} | $50 reward applied automatically
          </p>
        </div>
      </section>

      <Footer />
      <ARIAChat />
    </main>
  );
}
