"use client";

import { useState } from "react";
import { Calculator, Shield, Check, Sparkles, DollarSign, ArrowRight } from "lucide-react";

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    insuranceType: "",
    age: "",
    zipCode: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.insuranceType && formData.age && formData.zipCode) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 2000);
    }
  };

  const resetForm = () => {
    setShowResult(false);
    setFormData({ insuranceType: "", age: "", zipCode: "" });
    setStep(1);
  };

  return (
    <section id="quote" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-accent-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent-600 mr-2" />
              <span className="text-accent-600 font-semibold text-sm">
                AI-Powered Quotes
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Get Your Personalized
              <span className="text-primary-700"> Quote in Seconds</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Our intelligent quoting system analyzes your needs and provides accurate, competitive rates instantly. No paperwork, no phone calls required.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Instant quotes powered by AI",
                "Compare rates from top carriers",
                "No personal information required to start",
                "Save up to 40% on your premiums",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-trust-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">2M+</div>
                <div className="text-gray-500">Quotes Generated</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-3xl font-bold text-gray-900">40%</div>
                <div className="text-gray-500">Avg. Savings</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-3xl font-bold text-gray-900">Free</div>
                <div className="text-gray-500">Always</div>
              </div>
            </div>
          </div>

          {/* Right - Quote Form */}
          <div>
            <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-3xl p-8 shadow-2xl">
              {!showResult ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Free Quote Calculator
                    </h3>
                    <p className="text-white/70">
                      Answer a few questions to get started
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Insurance Type */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">What type of insurance do you need?</label>
                      <select
                        value={formData.insuranceType}
                        onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-500 appearance-none"
                        required
                      >
                        <option value="" className="text-gray-900">Select insurance type</option>
                        <option value="auto" className="text-gray-900">Auto Insurance</option>
                        <option value="home" className="text-gray-900">Home Insurance</option>
                        <option value="life" className="text-gray-900">Life Insurance</option>
                        <option value="health" className="text-gray-900">Health Insurance</option>
                        <option value="business" className="text-gray-900">Business Insurance</option>
                        <option value="bundle" className="text-gray-900">Bundle (Multiple)</option>
                      </select>
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Your age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Enter your age"
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        required
                        min="18"
                        max="100"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="Enter your ZIP code"
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        required
                        maxLength={5}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-accent-400 to-accent-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-accent-500/25 transition-all flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Calculating...</span>
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5" />
                          <span>Get My Quote</span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-white/50 text-sm mt-4">
                    No commitment required. Your information is secure.
                  </p>
                </>
              ) : (
                /* Result View */
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl text-white/70 mb-2">
                    Your Estimated Monthly Premium
                  </h3>
                  <div className="text-5xl font-bold text-white mb-4">
                    $127
                  </div>
                  <div className="text-accent-400 font-medium mb-8">
                    Save $340/year with bundling
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">$98</div>
                        <div className="text-white/60 text-sm">Basic Plan</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent-400">$127</div>
                        <div className="text-white/60 text-sm">Recommended</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">$185</div>
                        <div className="text-white/60 text-sm">Premium</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-accent-400 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-4 flex items-center justify-center space-x-2">
                    <span>Complete My Application</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={resetForm}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Get another quote
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
