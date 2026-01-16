"use client";

import { useState } from "react";
import {
  Gift,
  Users,
  TrendingUp,
  Sparkles,
  Share2,
  Link,
  QrCode,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ARIAChat from "@/components/ARIAChat";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "qr" | "social">("link");

  const agentCode = "CHATMAN";
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://insurancedemo.chatmaninc.com";
  const referralLink = `${baseUrl}?ref=${agentCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareMessages = {
    sms: `Hey! Check out Chatman Insurance - they have AI that answers instantly, no hold times. Get a free quote here: ${referralLink}`,
    email: {
      subject: "Check out this insurance agency - they have 24/7 AI support!",
      body: `Hi!\n\nI wanted to share Chatman Insurance with you. They have an AI assistant that can help you get quotes instantly, file claims 24/7, and answer any questions.\n\nNo more waiting on hold!\n\nGet your free quote here: ${referralLink}\n\nTrust me, it's worth checking out!`,
    },
    default: `I found an amazing insurance agency with 24/7 AI support! Get a free quote: ${referralLink}`,
  };

  const socialLinks = [
    {
      name: "Text/SMS",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      href: `sms:?body=${encodeURIComponent(shareMessages.sms)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-blue-500 hover:bg-blue-600",
      href: `mailto:?subject=${encodeURIComponent(shareMessages.email.subject)}&body=${encodeURIComponent(shareMessages.email.body)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareMessages.default)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1A91DA]",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.default)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#095196]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    },
  ];

  const howItWorks = [
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Copy your unique referral link or QR code and share it with friends, family, and anyone who needs insurance.",
    },
    {
      icon: Users,
      title: "They Get a Quote",
      description: "When someone uses your link to get a quote, they're automatically connected to our team with your referral.",
    },
    {
      icon: DollarSign,
      title: "You Earn $50",
      description: "For every person who purchases a policy through your referral, you earn $50 cash - no limits!",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-500 via-accent-400 to-accent-500 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
            <Gift className="w-4 h-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">Referral Program</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Share & Earn <span className="text-primary-900">$50</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Know someone who needs insurance? Share Chatman Insurance and earn $50 for every policy they purchase. No limits!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white">$50</div>
              <div className="text-white/80 text-sm">Per Referral</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white">No</div>
              <div className="text-white/80 text-sm">Limits</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white">24hr</div>
              <div className="text-white/80 text-sm">Payout</div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Tools Section */}
      <section className="py-16 -mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("link")}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  activeTab === "link"
                    ? "text-primary-700 border-b-2 border-primary-700 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Link className="w-5 h-5" />
                <span>Share Link</span>
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  activeTab === "qr"
                    ? "text-primary-700 border-b-2 border-primary-700 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>QR Code</span>
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  activeTab === "social"
                    ? "text-primary-700 border-b-2 border-primary-700 bg-primary-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Share2 className="w-5 h-5" />
                <span>Social Share</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Share Link Tab */}
              {activeTab === "link" && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Personal Referral Link</h3>
                    <p className="text-gray-600">Copy and share this link anywhere!</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-100 rounded-xl px-4 py-4 text-gray-700 truncate border-2 border-gray-200 font-mono text-sm">
                      {referralLink}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className={`p-4 rounded-xl transition-all ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-primary-700 text-white hover:bg-primary-800"
                      }`}
                    >
                      {copied ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Copy className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {copied && (
                    <p className="text-center text-green-600 font-medium">
                      Link copied to clipboard!
                    </p>
                  )}
                </div>
              )}

              {/* QR Code Tab */}
              {activeTab === "qr" && (
                <div className="space-y-6 text-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan to Share</h3>
                    <p className="text-gray-600">Let people scan this QR code with their phone camera</p>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralLink)}&bgcolor=ffffff&color=102a43`}
                        alt="Referral QR Code"
                        className="w-64 h-64"
                      />
                    </div>
                  </div>

                  <a
                    href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(referralLink)}&bgcolor=ffffff&color=102a43&format=png`}
                    download="chatman-referral-qr.png"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors"
                  >
                    <span>Download QR Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <p className="text-sm text-gray-500">
                    Perfect for business cards, flyers, or email signatures!
                  </p>
                </div>
              )}

              {/* Social Share Tab */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Share on Social Media</h3>
                    <p className="text-gray-600">One click to share with your network!</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center space-x-2 px-4 py-4 rounded-xl text-white transition-all ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Earning rewards is simple. Share, they save, you earn!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-accent-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Share Chatman Insurance?
              </h2>
              <div className="space-y-4">
                {[
                  "24/7 AI assistant - no more hold times",
                  "Instant quotes in minutes, not days",
                  "Easy online claims filing",
                  "Competitive rates that save money",
                  "Licensed advisors when you need them",
                  "Bundle discounts up to 25%",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 text-white">
              <Heart className="w-12 h-12 text-accent-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Help Those You Care About</h3>
              <p className="text-white/80 mb-6">
                Your friends and family deserve great insurance coverage. By sharing Chatman Insurance, you're helping them protect what matters most - while earning rewards for yourself!
              </p>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/90">
                  <strong>Real example:</strong> Sarah referred 5 friends last month and earned $250! Her friends saved an average of $400/year on their premiums.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Sharing Today!
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            There's no limit to how much you can earn. The more you share, the more you make!
          </p>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-accent-600 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? "Link Copied!" : "Copy My Referral Link"}</span>
          </button>
        </div>
      </section>

      <Footer />
      <ARIAChat />
    </main>
  );
}
