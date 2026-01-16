"use client";

import { useState } from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  UserCheck,
  ClipboardCheck,
  CreditCard,
  PartyPopper,
  AlertCircle,
  Upload,
  MessageSquare,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface ClaimStatus {
  id: string;
  claimNumber: string;
  type: "auto" | "home" | "health" | "life";
  description: string;
  dateSubmitted: string;
  status: "submitted" | "review" | "adjuster" | "assessment" | "payment" | "resolved";
  estimatedAmount?: number;
  approvedAmount?: number;
  updates: ClaimUpdate[];
}

interface ClaimUpdate {
  id: string;
  status: string;
  message: string;
  date: string;
  isComplete: boolean;
}

interface ClaimsTrackerProps {
  claim: ClaimStatus;
}

const statusSteps = [
  { key: "submitted", label: "Claim Submitted", icon: FileText, description: "Your claim has been received" },
  { key: "review", label: "Under Review", icon: Clock, description: "Our team is reviewing your claim" },
  { key: "adjuster", label: "Adjuster Assigned", icon: UserCheck, description: "An adjuster is handling your case" },
  { key: "assessment", label: "Assessment Complete", icon: ClipboardCheck, description: "Damage assessment is finished" },
  { key: "payment", label: "Payment Processing", icon: CreditCard, description: "Your payment is being processed" },
  { key: "resolved", label: "Resolved", icon: PartyPopper, description: "Your claim is complete" },
];

const getStatusIndex = (status: string) => {
  return statusSteps.findIndex((s) => s.key === status);
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    auto: "Auto Insurance",
    home: "Home Insurance",
    health: "Health Insurance",
    life: "Life Insurance",
  };
  return labels[type] || type;
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    auto: "bg-blue-100 text-blue-700",
    home: "bg-green-100 text-green-700",
    health: "bg-purple-100 text-purple-700",
    life: "bg-pink-100 text-pink-700",
  };
  return colors[type] || "bg-gray-100 text-gray-700";
};

export default function ClaimsTracker({ claim }: ClaimsTrackerProps) {
  const [showUpdates, setShowUpdates] = useState(false);
  const currentStatusIndex = getStatusIndex(claim.status);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(claim.type)}`}>
              {getTypeLabel(claim.type)}
            </span>
            <h2 className="text-2xl font-bold mt-3">Claim #{claim.claimNumber}</h2>
            <p className="text-white/70 mt-1">{claim.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">Submitted</p>
            <p className="font-semibold">{new Date(claim.dateSubmitted).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Amount Info */}
        {(claim.estimatedAmount || claim.approvedAmount) && (
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/20">
            {claim.estimatedAmount && (
              <div>
                <p className="text-sm text-white/70">Estimated Amount</p>
                <p className="text-2xl font-bold">${claim.estimatedAmount.toLocaleString()}</p>
              </div>
            )}
            {claim.approvedAmount && (
              <div>
                <p className="text-sm text-white/70">Approved Amount</p>
                <p className="text-2xl font-bold text-accent-400">${claim.approvedAmount.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Claim Progress</h3>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div
            className="absolute left-6 top-0 w-0.5 bg-primary-600 transition-all duration-500"
            style={{ height: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const isComplete = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const Icon = step.icon;

              return (
                <div key={step.key} className="relative flex items-start pl-16">
                  {/* Icon */}
                  <div
                    className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isComplete
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    } ${isCurrent ? "ring-4 ring-primary-200" : ""}`}
                  >
                    {isComplete && index < currentStatusIndex ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${isComplete ? "text-gray-900" : "text-gray-400"}`}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span className="text-xs font-semibold px-3 py-1 bg-primary-100 text-primary-700 rounded-full animate-pulse">
                          Current Status
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${isComplete ? "text-gray-600" : "text-gray-400"}`}>
                      {step.description}
                    </p>

                    {/* Show update for this step if exists */}
                    {claim.updates.find((u) => u.status === step.key) && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {claim.updates.find((u) => u.status === step.key)?.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(claim.updates.find((u) => u.status === step.key)?.date || "").toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Updates Section */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowUpdates(!showUpdates)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900">All Updates ({claim.updates.length})</span>
          {showUpdates ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {showUpdates && (
          <div className="p-4 pt-0 space-y-3">
            {claim.updates.map((update) => (
              <div key={update.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  update.isComplete ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {update.isComplete ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{update.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(update.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Upload Documents</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Chat with AIVA</span>
          </button>
          <a
            href="tel:+13464820150"
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Call Claims Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
