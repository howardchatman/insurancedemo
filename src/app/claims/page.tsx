"use client";

import { useState } from "react";
import { Search, Shield, FileSearch, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaimsTracker, { ClaimStatus } from "@/components/ClaimsTracker";
import ARIAChat from "@/components/ARIAChat";

// Mock claims data for demo
const mockClaims: ClaimStatus[] = [
  {
    id: "1",
    claimNumber: "CLM-2025-001234",
    type: "auto",
    description: "Vehicle collision damage - front bumper and headlight",
    dateSubmitted: "2025-01-10T10:30:00Z",
    status: "assessment",
    estimatedAmount: 4500,
    approvedAmount: 4200,
    updates: [
      { id: "1", status: "submitted", message: "Claim submitted successfully. Reference number assigned.", date: "2025-01-10T10:30:00Z", isComplete: true },
      { id: "2", status: "review", message: "Your claim is being reviewed by our team.", date: "2025-01-10T14:00:00Z", isComplete: true },
      { id: "3", status: "adjuster", message: "Adjuster John Smith has been assigned to your claim. Contact: (346) 555-0123", date: "2025-01-11T09:15:00Z", isComplete: true },
      { id: "4", status: "assessment", message: "Vehicle inspection completed. Damage assessment report filed.", date: "2025-01-12T16:45:00Z", isComplete: true },
    ],
  },
  {
    id: "2",
    claimNumber: "CLM-2025-001189",
    type: "home",
    description: "Water damage from burst pipe in basement",
    dateSubmitted: "2025-01-05T08:00:00Z",
    status: "payment",
    estimatedAmount: 12000,
    approvedAmount: 11500,
    updates: [
      { id: "1", status: "submitted", message: "Claim submitted successfully.", date: "2025-01-05T08:00:00Z", isComplete: true },
      { id: "2", status: "review", message: "Claim under review.", date: "2025-01-05T11:00:00Z", isComplete: true },
      { id: "3", status: "adjuster", message: "Adjuster Sarah Johnson assigned.", date: "2025-01-06T10:00:00Z", isComplete: true },
      { id: "4", status: "assessment", message: "Property inspection complete. Remediation approved.", date: "2025-01-08T14:00:00Z", isComplete: true },
      { id: "5", status: "payment", message: "Payment of $11,500 approved and processing.", date: "2025-01-12T09:00:00Z", isComplete: true },
    ],
  },
  {
    id: "3",
    claimNumber: "CLM-2025-001298",
    type: "auto",
    description: "Windshield replacement - rock chip damage",
    dateSubmitted: "2025-01-14T15:20:00Z",
    status: "resolved",
    estimatedAmount: 450,
    approvedAmount: 450,
    updates: [
      { id: "1", status: "submitted", message: "Claim submitted.", date: "2025-01-14T15:20:00Z", isComplete: true },
      { id: "2", status: "review", message: "Fast-track review initiated for glass claim.", date: "2025-01-14T15:45:00Z", isComplete: true },
      { id: "3", status: "adjuster", message: "Auto-approved under glass coverage.", date: "2025-01-14T16:00:00Z", isComplete: true },
      { id: "4", status: "assessment", message: "Safelite partner selected for replacement.", date: "2025-01-14T16:15:00Z", isComplete: true },
      { id: "5", status: "payment", message: "Direct payment to Safelite processed.", date: "2025-01-15T10:00:00Z", isComplete: true },
      { id: "6", status: "resolved", message: "Windshield replaced successfully. Claim closed.", date: "2025-01-15T14:30:00Z", isComplete: true },
    ],
  },
];

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [foundClaim, setFoundClaim] = useState<ClaimStatus | null>(null);
  const [showDemoMode, setShowDemoMode] = useState(true);
  const [searchError, setSearchError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");

    // Demo mode - show mock data
    const claim = mockClaims.find(
      (c) => c.claimNumber.toLowerCase() === searchQuery.toLowerCase()
    );

    if (claim) {
      setFoundClaim(claim);
      setShowDemoMode(false);
    } else {
      setSearchError("Claim not found. Please check the claim number and try again.");
    }
  };

  const handleDemoSelect = (claim: ClaimStatus) => {
    setFoundClaim(claim);
    setShowDemoMode(false);
    setSearchQuery(claim.claimNumber);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-accent-400 mr-2" />
            <span className="text-white/90 text-sm font-medium">Track Your Claim Like an Amazon Package</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Claims Status Tracker
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Real-time updates on your insurance claim. No more calling to ask "where's my claim?"
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-2xl max-w-xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                  Claim Number
                </label>
                <div className="relative">
                  <FileSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="CLM-2025-001234"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {searchError && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{searchError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
              >
                <Search className="w-5 h-5" />
                <span>Track My Claim</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results or Demo Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {foundClaim && !showDemoMode ? (
            <>
              <button
                onClick={() => {
                  setFoundClaim(null);
                  setShowDemoMode(true);
                  setSearchQuery("");
                }}
                className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
              >
                <span>← Back to search</span>
              </button>
              <ClaimsTracker claim={foundClaim} />
            </>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Claims</h2>
                <p className="text-gray-600">
                  Click on any claim below to see how the tracker works
                </p>
              </div>

              <div className="space-y-4">
                {mockClaims.map((claim) => (
                  <button
                    key={claim.id}
                    onClick={() => handleDemoSelect(claim)}
                    className="w-full p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          claim.status === "resolved"
                            ? "bg-green-100 text-green-600"
                            : "bg-primary-100 text-primary-600"
                        }`}>
                          {claim.status === "resolved" ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <FileSearch className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{claim.claimNumber}</p>
                          <p className="text-sm text-gray-500">{claim.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            claim.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : claim.status === "payment"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {claim.status === "resolved" ? "Completed" : claim.status === "payment" ? "Payment Processing" : "In Progress"}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            {claim.approvedAmount ? `$${claim.approvedAmount.toLocaleString()}` : "Pending"}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-100">
                <h3 className="font-semibold text-primary-900 mb-2">Need to file a new claim?</h3>
                <p className="text-primary-700 mb-4">
                  Our AI assistant AIVA can help you start a claim in minutes, 24/7.
                </p>
                <a
                  href="tel:+13464820150"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  <span>File a Claim Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ARIAChat />
    </main>
  );
}
