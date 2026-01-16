"use client";

import { useState, useEffect } from "react";
import {
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
  X,
  Gift,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface ReferralToolsProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  agentCode?: string;
}

export default function ReferralTools({
  isOpen,
  onClose,
  agentName = "Chatman Insurance",
  agentCode = "CHATMAN",
}: ReferralToolsProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "qr" | "social">("link");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 12,
    pendingRewards: 3,
    totalEarned: 150,
  });

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
    default: `I found an amazing insurance agency with 24/7 AI support! Get a free quote: ${referralLink}`,
    sms: `Hey! Check out Chatman Insurance - they have AI that answers instantly, no hold times. Get a free quote here: ${referralLink}`,
    email: {
      subject: "Check out this insurance agency - they have 24/7 AI support!",
      body: `Hi!\n\nI wanted to share Chatman Insurance with you. They have an AI assistant that can help you get quotes instantly, file claims 24/7, and answer any questions.\n\nNo more waiting on hold!\n\nGet your free quote here: ${referralLink}\n\nTrust me, it's worth checking out!`,
    },
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-400 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Share & Earn Rewards
          </h2>
          <p className="text-white/90 text-sm">
            Refer friends & family to earn $50 for each new policy!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-primary-700">
              <Users className="w-4 h-4" />
              <span className="text-xl font-bold">{referralStats.totalReferrals}</span>
            </div>
            <p className="text-xs text-gray-500">Total Referrals</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-accent-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-xl font-bold">{referralStats.pendingRewards}</span>
            </div>
            <p className="text-xs text-gray-500">Pending Rewards</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xl font-bold">${referralStats.totalEarned}</span>
            </div>
            <p className="text-xs text-gray-500">Total Earned</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("link")}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === "link"
                ? "text-primary-700 border-b-2 border-primary-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Share Link</span>
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === "qr"
                ? "text-primary-700 border-b-2 border-primary-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === "social"
                ? "text-primary-700 border-b-2 border-primary-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Share Link Tab */}
          {activeTab === "link" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Copy your personal referral link and share it anywhere!
              </p>

              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 truncate border border-gray-200">
                  {referralLink}
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`p-3 rounded-xl transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-primary-700 text-white hover:bg-primary-800"
                  }`}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-sm text-green-600 text-center font-medium">
                  Link copied to clipboard!
                </p>
              )}

              <div className="bg-primary-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-primary-800">
                  <strong>Pro Tip:</strong> Share your link in group texts, family chats, or post it on your social media to reach more people!
                </p>
              </div>
            </div>
          )}

          {/* QR Code Tab */}
          {activeTab === "qr" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Let people scan this QR code to visit your referral link instantly!
              </p>

              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-100">
                  {/* QR Code using Google Charts API */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}&bgcolor=ffffff&color=102a43`}
                    alt="Referral QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Scan with any phone camera to open
              </p>

              <div className="flex justify-center space-x-3">
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(referralLink)}&bgcolor=ffffff&color=102a43&format=png`}
                  download="chatman-referral-qr.png"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <span>Download QR</span>
                </a>
              </div>

              <div className="bg-accent-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-accent-800">
                  <strong>Use it for:</strong> Business cards, flyers, email signatures, or display at events!
                </p>
              </div>
            </div>
          )}

          {/* Social Share Tab */}
          {activeTab === "social" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Share directly to your favorite platforms!
              </p>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white transition-all ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              <div className="bg-green-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-green-800">
                  <strong>Remember:</strong> Every friend who gets a policy means $50 in your pocket! There's no limit to how many referrals you can make.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 text-center">
            Questions about the referral program?{" "}
            <a href="tel:+13464820150" className="text-primary-700 font-medium hover:underline">
              Call us at (346) 482-0150
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
