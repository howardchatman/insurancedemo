"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  Search,
  Bell,
  User,
  Settings,
  MessageSquare,
  Calendar,
  ArrowLeft,
  Eye,
  Clock,
  CheckCircle,
  ChevronRight,
  Star,
  TrendingUp,
  Mail,
  Phone,
  Menu,
  X,
  DollarSign,
  AlertCircle,
  Download,
  Car,
  Home,
  Heart,
  Gift,
  Share2,
  Copy,
  Check,
  Users,
  Sparkles,
} from "lucide-react";

// Mock policy data
const myPolicies = [
  {
    id: 1,
    name: "Auto Insurance",
    type: "auto",
    icon: Car,
    policyNumber: "AUTO-2024-78901",
    premium: 89,
    coverage: "Full Coverage",
    status: "active",
    renewalDate: "Mar 15, 2026",
    deductible: 500,
  },
  {
    id: 2,
    name: "Home Insurance",
    type: "home",
    icon: Home,
    policyNumber: "HOME-2024-45678",
    premium: 125,
    coverage: "Dwelling + Liability",
    status: "active",
    renewalDate: "Mar 15, 2026",
    deductible: 1000,
  },
  {
    id: 3,
    name: "Life Insurance",
    type: "life",
    icon: Heart,
    policyNumber: "LIFE-2024-12345",
    premium: 45,
    coverage: "$500K Term 20",
    status: "active",
    renewalDate: "Jun 01, 2026",
    deductible: 0,
  },
];

// Mock claims
const recentClaims = [
  { id: 1, type: "Auto", description: "Minor fender bender - parking lot", date: "Jan 10, 2026", status: "approved", amount: 1250 },
  { id: 2, type: "Home", description: "Water damage - burst pipe", date: "Dec 15, 2025", status: "processing", amount: 3500 },
];

// Mock upcoming renewals
const upcomingRenewals = [
  { id: 1, policy: "Auto + Home Bundle", date: "Mar 15, 2026", premium: 214, savings: 45 },
];

// Mock recent activity
const recentActivity = [
  { id: 1, type: "payment", message: "Payment processed for Auto Insurance", time: "2 days ago" },
  { id: 2, type: "document", message: "Policy documents updated", time: "5 days ago" },
  { id: 3, type: "claim", message: "Claim #CLM-001 approved", time: "1 week ago" },
  { id: 4, type: "message", message: "New message from your advisor", time: "2 weeks ago" },
];

const sidebarItems = [
  { name: "Dashboard", icon: Shield, active: true },
  { name: "My Policies", icon: FileText, count: 3 },
  { name: "Claims", icon: AlertCircle, count: 2 },
  { name: "Documents", icon: Download, count: 8 },
  { name: "Messages", icon: MessageSquare, count: 1 },
  { name: "Notifications", icon: Bell, count: 3 },
  { name: "Profile", icon: User },
  { name: "Settings", icon: Settings },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  const totalPremium = myPolicies.reduce((sum, p) => sum + p.premium, 0);

  // Client info - in production this would come from auth/user profile
  const clientName = "Sarah Johnson";
  const clientSlug = clientName.toLowerCase().replace(/\s+/g, '-'); // "sarah-johnson"
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://insurancedemo.chatmaninc.com";
  const personalReferralLink = `${baseUrl}/referral/${clientSlug}`;

  // Referral stats - in production these would come from API
  const referralStats = {
    totalReferrals: 3,
    pendingRewards: 1,
    totalEarned: 100,
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(personalReferralLink);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareMessage = `I love my insurance experience with Chatman Insurance! They have 24/7 AI support and super fast claims. Get a free quote and we both earn $50: ${personalReferralLink}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="hidden sm:block h-6 w-px bg-gray-200" />
            <h1 className="text-lg md:text-xl font-bold text-gray-900">Client Portal</h1>
            <span className="hidden sm:inline px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Demo</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="hidden sm:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-700 rounded-full text-white text-xs flex items-center justify-center">1</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white font-semibold">
                SJ
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-gray-900 text-sm">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 lg:w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:min-h-[calc(100vh-73px)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h2 className="font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Card */}
            <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-xl p-4 mb-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-white/80">Member since 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                <span>Premium Account</span>
              </div>
            </div>

            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-colors ${
                  item.active
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.count && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.active ? "bg-primary-200 text-primary-800" : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
                <p className="text-white/80 text-sm md:text-base">You have 3 active policies and 1 upcoming renewal</p>
              </div>
              <Link
                href="#quote"
                className="px-4 md:px-6 py-2 md:py-3 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-400 transition-all text-center text-sm md:text-base"
              >
                Get New Quote
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-500">Active Policies</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalPremium)}</p>
                  <p className="text-sm text-gray-500">Monthly Total</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-trust-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-trust-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-500">Open Claims</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">$540</p>
                  <p className="text-sm text-gray-500">Annual Savings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* My Policies */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">My Policies</h2>
                  <button className="text-primary-700 text-sm font-medium hover:text-primary-800 flex items-center">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {myPolicies.map((policy) => (
                  <div key={policy.id} className="p-3 md:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <policy.icon className="w-6 h-6 text-primary-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{policy.name}</h3>
                            <p className="text-xs text-gray-500">Policy #{policy.policyNumber}</p>
                          </div>
                          <span className="px-2 py-1 bg-trust-100 text-trust-700 text-xs font-medium rounded-full flex-shrink-0">
                            Active
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 md:mt-3 gap-2">
                          <div>
                            <p className="text-base md:text-lg font-bold text-primary-700">{formatPrice(policy.premium)}/mo</p>
                            <p className="text-xs text-gray-500">{policy.coverage}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors">
                              View Details
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors">
                              File Claim
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Renewals */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Upcoming Renewals</h2>
                </div>
                <div className="p-4">
                  {upcomingRenewals.map((renewal) => (
                    <div key={renewal.id} className="bg-accent-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-gray-900">{renewal.policy}</p>
                        <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                          Due Soon
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Renewal Date</span>
                        <span className="font-medium text-gray-900">{renewal.date}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Monthly Premium</span>
                        <span className="font-bold text-primary-700">{formatPrice(renewal.premium)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm bg-trust-100 rounded-lg p-2">
                        <span className="text-trust-700">Bundle Savings</span>
                        <span className="font-semibold text-trust-700">{formatPrice(renewal.savings)}/mo</span>
                      </div>
                      <button className="w-full mt-3 py-2 bg-primary-700 text-white rounded-lg font-medium text-sm hover:bg-primary-800 transition-colors">
                        Renew Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Claims */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Recent Claims</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{claim.type} Claim</p>
                          <p className="text-xs text-gray-500">{claim.description}</p>
                        </div>
                        {claim.status === "approved" ? (
                          <span className="px-2 py-1 bg-trust-100 text-trust-700 text-xs font-medium rounded-full flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Processing
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{claim.date}</span>
                        <span className="font-semibold text-gray-900">{formatPrice(claim.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "payment" ? "bg-green-100" :
                          activity.type === "document" ? "bg-blue-100" :
                          activity.type === "claim" ? "bg-trust-100" :
                          "bg-primary-100"
                        }`}>
                          {activity.type === "payment" && <DollarSign className="w-4 h-4 text-green-600" />}
                          {activity.type === "document" && <FileText className="w-4 h-4 text-blue-600" />}
                          {activity.type === "claim" && <CheckCircle className="w-4 h-4 text-trust-600" />}
                          {activity.type === "message" && <MessageSquare className="w-4 h-4 text-primary-700" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Advisor Card */}
          <div className="mt-4 md:mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white text-lg md:text-xl font-bold flex-shrink-0">
                  MC
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base">Your Advisor: Michael Carter</p>
                  <p className="text-xs md:text-sm text-gray-500">Licensed Insurance Advisor</p>
                  <div className="flex items-center space-x-3 md:space-x-4 mt-1 md:mt-2">
                    <a href="tel:+18327707998" className="flex items-center text-xs md:text-sm text-primary-700 hover:text-primary-800">
                      <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="hidden sm:inline">(832) 770-7998</span>
                      <span className="sm:hidden">Call</span>
                    </a>
                    <a href="mailto:michael@chatmaninsurance.com" className="flex items-center text-xs md:text-sm text-primary-700 hover:text-primary-800">
                      <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors text-sm md:text-base">
                Schedule a Call
              </button>
            </div>
          </div>

          {/* Share & Earn Section */}
          <div className="mt-4 md:mt-6 bg-gradient-to-r from-accent-500 to-accent-400 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              {/* Header */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-white">Share & Earn $50</h2>
                  <p className="text-xs md:text-sm text-white/90 mt-1">
                    Share your link and earn $50 for every friend who gets a policy!
                  </p>
                </div>
              </div>

              {/* Referral Stats - Mobile optimized */}
              <div className="grid grid-cols-3 gap-2 mt-4 bg-white/20 rounded-xl p-3">
                <div className="text-center">
                  <div className="flex items-center justify-center text-white">
                    <Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="text-lg md:text-xl font-bold">{referralStats.totalReferrals}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/80">Referrals</p>
                </div>
                <div className="text-center border-x border-white/30">
                  <div className="flex items-center justify-center text-white">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="text-lg md:text-xl font-bold">{referralStats.pendingRewards}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/80">Pending</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-white">
                    <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="text-lg md:text-xl font-bold">{referralStats.totalEarned}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/80">Earned</p>
                </div>
              </div>

              {/* Personal Referral Link */}
              <div className="mt-4">
                <p className="text-xs text-white/80 mb-2">Your Personal Referral Link:</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 min-w-0 bg-white/20 rounded-xl px-3 md:px-4 py-3 text-white font-mono text-xs md:text-sm truncate overflow-hidden">
                    {personalReferralLink}
                  </div>
                  <button
                    onClick={copyReferralLink}
                    className={`p-2.5 md:p-3 rounded-xl transition-all flex-shrink-0 ${
                      referralCopied
                        ? "bg-green-500 text-white"
                        : "bg-white text-accent-600 hover:bg-white/90"
                    }`}
                  >
                    {referralCopied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {referralCopied && (
                  <p className="text-sm text-white font-medium mt-2">Link copied!</p>
                )}
              </div>

              {/* Share Buttons - Grid on mobile */}
              <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <a
                  href={`sms:?body=${encodeURIComponent(shareMessage)}`}
                  className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-white text-accent-600 rounded-lg text-xs md:text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Text</span>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent("Check out my insurance company - we both get $50!")}&body=${encodeURIComponent(shareMessage)}`}
                  className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-white/20 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(personalReferralLink)}&quote=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-white/20 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <Link
                  href="/referral"
                  className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-primary-800 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-primary-900 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  <span>Full Program</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
