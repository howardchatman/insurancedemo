"use client";

import { useState } from "react";
import {
  X,
  Car,
  Home,
  Heart,
  Briefcase,
  Layers,
  User,
  Users,
  UserPlus,
  Building,
  DollarSign,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";

interface InsuranceQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizAnswer {
  questionId: number;
  answer: string;
  value: string;
}

interface Recommendation {
  name: string;
  type: string;
  description: string;
  monthlyEstimate: string;
  features: string[];
  priority: "primary" | "secondary";
}

const questions = [
  {
    id: 1,
    question: "What do you need to protect?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      { label: "My Vehicle", value: "auto", icon: Car },
      { label: "My Home", value: "home", icon: Home },
      { label: "My Family", value: "life", icon: Heart },
      { label: "My Business", value: "business", icon: Briefcase },
    ],
  },
  {
    id: 2,
    question: "How many people are in your household?",
    subtitle: "Including yourself",
    multiSelect: false,
    options: [
      { label: "Just Me", value: "1", icon: User },
      { label: "2 People", value: "2", icon: Users },
      { label: "3-4 People", value: "3-4", icon: UserPlus },
      { label: "5+ People", value: "5+", icon: Users },
    ],
  },
  {
    id: 3,
    question: "Do you own or rent your home?",
    subtitle: "This helps us recommend the right coverage",
    multiSelect: false,
    options: [
      { label: "I Own", value: "own", icon: Home },
      { label: "I Rent", value: "rent", icon: Building },
      { label: "Living with Family", value: "family", icon: Users },
    ],
  },
  {
    id: 4,
    question: "What's most important to you?",
    subtitle: "Choose your top priority",
    multiSelect: false,
    options: [
      { label: "Lowest Price", value: "price", icon: DollarSign },
      { label: "Best Coverage", value: "coverage", icon: Shield },
      { label: "Fast Claims", value: "claims", icon: Zap },
      { label: "24/7 Support", value: "support", icon: Clock },
    ],
  },
  {
    id: 5,
    question: "Have you had insurance claims in the past 3 years?",
    subtitle: "This won't affect your eligibility",
    multiSelect: false,
    options: [
      { label: "No Claims", value: "no", icon: CheckCircle },
      { label: "1-2 Claims", value: "few", icon: AlertCircle },
      { label: "3+ Claims", value: "many", icon: AlertCircle },
    ],
  },
  {
    id: 6,
    question: "What's your estimated monthly budget for insurance?",
    subtitle: "We'll find options that fit",
    multiSelect: false,
    options: [
      { label: "$50 - $100", value: "50-100", icon: DollarSign },
      { label: "$100 - $200", value: "100-200", icon: DollarSign },
      { label: "$200 - $300", value: "200-300", icon: DollarSign },
      { label: "$300+", value: "300+", icon: DollarSign },
    ],
  },
];

export default function InsuranceQuiz({ isOpen, onClose }: InsuranceQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else {
      setSelectedOptions([value]);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer: selectedOptions.join(", "),
      value: selectedOptions.join(","),
    };

    setAnswers((prev) => [...prev.filter((a) => a.questionId !== currentQuestion.id), newAnswer]);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOptions([]);
    } else {
      // Quiz complete - show lead capture
      setShowLeadCapture(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      const prevAnswer = answers.find((a) => a.questionId === questions[currentStep - 1].id);
      setSelectedOptions(prevAnswer ? prevAnswer.value.split(",") : []);
    }
  };

  const generateRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];
    const protectionNeeds = answers.find((a) => a.questionId === 1)?.value.split(",") || [];
    const householdSize = answers.find((a) => a.questionId === 2)?.value || "1";
    const homeOwnership = answers.find((a) => a.questionId === 3)?.value || "rent";
    const priority = answers.find((a) => a.questionId === 4)?.value || "coverage";
    const claimsHistory = answers.find((a) => a.questionId === 5)?.value || "no";
    const budget = answers.find((a) => a.questionId === 6)?.value || "100-200";

    // Auto Insurance
    if (protectionNeeds.includes("auto")) {
      recs.push({
        name: priority === "price" ? "Auto Essential" : "Auto Premium",
        type: "Auto Insurance",
        description: priority === "price"
          ? "Affordable liability coverage to keep you legal and protected on the road."
          : "Comprehensive coverage with collision, uninsured motorist, and roadside assistance.",
        monthlyEstimate: priority === "price" ? "$89" : "$145",
        features: priority === "price"
          ? ["Liability Coverage", "Uninsured Motorist", "24/7 Claims Support"]
          : ["Full Coverage", "Rental Car Reimbursement", "Zero Deductible Glass", "Roadside Assistance"],
        priority: protectionNeeds.length === 1 ? "primary" : "secondary",
      });
    }

    // Home/Renters Insurance
    if (protectionNeeds.includes("home") || homeOwnership === "rent") {
      if (homeOwnership === "own") {
        recs.push({
          name: "Home Guardian",
          type: "Home Insurance",
          description: "Protect your biggest investment with comprehensive dwelling and liability coverage.",
          monthlyEstimate: budget === "300+" ? "$185" : "$125",
          features: ["Dwelling Coverage", "Personal Property", "Liability Protection", "Additional Living Expenses"],
          priority: "primary",
        });
      } else if (homeOwnership === "rent") {
        recs.push({
          name: "Renters Shield",
          type: "Renters Insurance",
          description: "Affordable protection for your belongings and personal liability.",
          monthlyEstimate: "$25",
          features: ["Personal Property", "Liability Coverage", "Temporary Housing", "Theft Protection"],
          priority: protectionNeeds.includes("home") ? "primary" : "secondary",
        });
      }
    }

    // Life Insurance
    if (protectionNeeds.includes("life") || (householdSize !== "1" && parseInt(householdSize) >= 2)) {
      const isFamily = householdSize === "3-4" || householdSize === "5+";
      recs.push({
        name: isFamily ? "Family Protector" : "Life Secure",
        type: "Life Insurance",
        description: isFamily
          ? "Comprehensive term life coverage to protect your family's future and financial security."
          : "Affordable term life insurance to protect your loved ones.",
        monthlyEstimate: isFamily ? "$75" : "$45",
        features: isFamily
          ? ["$500K-$1M Coverage", "Level Premiums", "Convertible Policy", "Child Rider Available"]
          : ["$250K-$500K Coverage", "No Medical Exam Options", "Fixed Rates", "Quick Approval"],
        priority: isFamily ? "primary" : "secondary",
      });
    }

    // Business Insurance
    if (protectionNeeds.includes("business")) {
      recs.push({
        name: "Business Shield",
        type: "Business Insurance",
        description: "Comprehensive commercial coverage to protect your livelihood and assets.",
        monthlyEstimate: "$199",
        features: ["General Liability", "Professional Liability", "Commercial Property", "Workers Comp Available"],
        priority: "primary",
      });
    }

    // Bundle recommendation if multiple needs
    if (protectionNeeds.length >= 2) {
      recs.unshift({
        name: "Smart Bundle",
        type: "Bundle & Save 25%",
        description: "Combine your policies for maximum savings and simplified coverage management.",
        monthlyEstimate: budget === "50-100" ? "$149" : budget === "100-200" ? "$225" : "$325",
        features: ["Multi-Policy Discount", "Single Deductible Option", "One Bill", "Priority Claims"],
        priority: "primary",
      });
    }

    // Sort by priority
    return recs.sort((a, b) => (a.priority === "primary" ? -1 : 1));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate recommendations
      const recs = generateRecommendations();
      setRecommendations(recs);

      // Save lead to database
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          source: "quiz",
          preferredContact: "phone",
          message: `Quiz Answers: ${answers.map((a) => `Q${a.questionId}: ${a.answer}`).join(" | ")}`,
          insuranceType: answers.find((a) => a.questionId === 1)?.answer || "general",
        }),
      });

      // Save quiz results
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          answers: answers,
          recommendations: recs.map((r) => r.name),
        }),
      });

      if (response.ok) {
        setShowLeadCapture(false);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOptions([]);
    setShowLeadCapture(false);
    setShowResults(false);
    setLeadData({ name: "", email: "", phone: "" });
    setRecommendations([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetQuiz} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={resetQuiz}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        {!showLeadCapture && !showResults && (
          <div className="h-2 bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Quiz Questions */}
        {!showLeadCapture && !showResults && (
          <div className="p-8">
            <div className="text-center mb-8">
              <span className="text-sm font-medium text-primary-600 mb-2 block">
                Question {currentStep + 1} of {questions.length}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentQuestion.question}
              </h2>
              <p className="text-gray-500">{currentQuestion.subtitle}</p>
            </div>

            {/* Options Grid */}
            <div className={`grid gap-4 mb-8 ${currentQuestion.options.length <= 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOptions.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      isSelected
                        ? "border-primary-600 bg-primary-50 shadow-lg"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        isSelected ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`font-medium ${isSelected ? "text-primary-700" : "text-gray-700"}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={selectedOptions.length === 0}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all ${
                  selectedOptions.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg"
                }`}
              >
                <span>{currentStep === questions.length - 1 ? "See My Results" : "Continue"}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Lead Capture */}
        {showLeadCapture && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Personalized Plan is Ready!
              </h2>
              <p className="text-gray-500">
                Enter your details to see your custom insurance recommendations
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    placeholder="(346) 482-0150"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Your Plan...</span>
                  </span>
                ) : (
                  "See My Recommendations"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your information is secure and will never be shared.
              </p>
            </form>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="p-8 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hi {leadData.name.split(" ")[0]}, Here's Your Custom Plan!
              </h2>
              <p className="text-gray-500">
                Based on your answers, we recommend these coverage options
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 ${
                    rec.priority === "primary"
                      ? "border-primary-200 bg-primary-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        rec.priority === "primary"
                          ? "bg-primary-100 text-primary-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {rec.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{rec.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <p className="text-2xl font-bold text-primary-700">{rec.monthlyEstimate}<span className="text-sm font-normal">/mo</span></p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.features.map((feature, i) => (
                      <span key={i} className="flex items-center text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#quote"
                onClick={resetQuiz}
                className="flex-1 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all"
              >
                Get My Full Quote
              </a>
              <a
                href="tel:+13464820150"
                className="flex-1 py-4 bg-white border-2 border-primary-600 text-primary-700 rounded-xl font-semibold text-center hover:bg-primary-50 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Talk to AIVA Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
