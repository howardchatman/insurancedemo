"use client";

import { useState, useEffect } from "react";
import { X, Shield, Phone, Mail, User, Sparkles } from "lucide-react";

interface LeadGatePopupProps {
  delaySeconds?: number;
}

export default function LeadGatePopup({ delaySeconds = 5 }: LeadGatePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Check if user has already submitted
    const hasSubmitted = localStorage.getItem("insurance_lead_captured");
    if (hasSubmitted) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "lead_gate",
          preferredContact: "phone",
        }),
      });

      // Always unlock the site and save to localStorage (for demo purposes)
      setIsSubmitted(true);
      localStorage.setItem("insurance_lead_captured", "true");
      localStorage.setItem("insurance_lead_name", formData.name);
      localStorage.setItem("insurance_lead_email", formData.email);

      if (!response.ok) {
        // Log the error but don't block the user
        const errorData = await response.json();
        console.error("API error:", errorData);
      }

      // Close popup after showing success
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (err) {
      console.error("Error submitting lead:", err);
      // Still unlock site even on network error for demo
      setIsSubmitted(true);
      localStorage.setItem("insurance_lead_captured", "true");
      localStorage.setItem("insurance_lead_name", formData.name);
      localStorage.setItem("insurance_lead_email", formData.email);

      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Don't save to localStorage - they'll see it again on next visit
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Get Your Free Quote
          </h2>
          <p className="text-white/80 text-sm">
            Unlock instant access to personalized insurance rates
          </p>
        </div>

        {/* Form or Success */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Welcome, {formData.name.split(" ")[0]}!
              </h3>
              <p className="text-gray-600">
                You now have full access to explore our coverage options.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(346) 482-0150"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-accent-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Unlocking Access...</span>
                  </span>
                ) : (
                  "Get Instant Access"
                )}
              </button>

              {/* Trust indicators */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Your information is secure and will never be shared.
                <br />
                By continuing, you agree to receive communications from us.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
