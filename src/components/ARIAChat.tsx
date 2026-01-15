"use client";

import { useState, useEffect, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  PhoneOff,
  Calendar,
  Shield,
  Sparkles,
  Bot,
  User,
  Minimize2,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  Volume2,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
  options?: string[];
  plans?: typeof mockPlans;
  calendar?: boolean;
  callStarted?: boolean;
}

// Mock insurance plans
const mockPlans = [
  {
    id: 1,
    name: "Auto Essential",
    type: "Auto Insurance",
    monthlyPremium: 89,
    coverage: "Liability + Collision",
    tag: "Most Popular",
  },
  {
    id: 2,
    name: "Home Guardian",
    type: "Home Insurance",
    monthlyPremium: 125,
    coverage: "Full Coverage",
    tag: "Best Value",
  },
  {
    id: 3,
    name: "Life Secure 20",
    type: "Life Insurance",
    monthlyPremium: 45,
    coverage: "$500K Term",
    tag: "Family Essential",
  },
];

// Mock available consultation times
const mockTimes = [
  { date: "Tomorrow", slots: ["10:00 AM", "2:00 PM", "4:30 PM"] },
  { date: "Wednesday", slots: ["9:00 AM", "11:30 AM", "3:00 PM"] },
  { date: "Thursday", slots: ["10:00 AM", "1:00 PM", "5:00 PM"] },
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "Hi! I'm ARIA, your AI insurance assistant. I'm here 24/7 to help you find the perfect coverage for your needs. How can I assist you today?",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    options: [
      "Get an insurance quote",
      "Learn about coverage options",
      "Schedule a consultation",
      "File a claim",
    ],
  },
];

const aiResponses: { [key: string]: { text: string; options?: string[]; plans?: typeof mockPlans; calendar?: boolean } } = {
  "get an insurance quote": {
    text: "I'd be happy to help you get a quote! What type of insurance are you looking for?",
    options: ["Auto Insurance", "Home Insurance", "Life Insurance", "Bundle Multiple"],
  },
  "learn about coverage options": {
    text: "Great question! We offer comprehensive coverage for all aspects of your life. Here are our most popular plans:",
    plans: mockPlans,
  },
  "schedule a consultation": {
    text: "I can schedule a free consultation with one of our licensed advisors. Here are the available times:",
    calendar: true,
  },
  "file a claim": {
    text: "I'm sorry to hear you need to file a claim. Don't worry, we'll make this process as smooth as possible. Would you like to file online or speak with a claims specialist?",
    options: ["File online", "Speak with specialist", "Check claim status"],
  },
  "auto insurance": {
    text: "Perfect! Our auto insurance offers comprehensive protection for your vehicles. We can save you up to 40% compared to your current rate. What would you like to know?",
    options: ["Get a quote", "Coverage details", "Bundle with home", "Talk to advisor"],
  },
  "home insurance": {
    text: "Our home insurance protects your biggest investment. We cover dwelling, personal property, liability, and more. What aspects interest you most?",
    options: ["Get a quote", "What's covered", "Replacement cost info", "Talk to advisor"],
  },
  "life insurance": {
    text: "Life insurance is the ultimate gift of security for your loved ones. We offer term and whole life options to fit your needs and budget.",
    options: ["Term vs Whole Life", "Get a quote", "No exam options", "Talk to advisor"],
  },
  "bundle multiple": {
    text: "Smart choice! Bundling can save you up to 25% on your premiums. Most clients bundle auto + home + life for maximum savings.",
    plans: mockPlans,
  },
  "get a quote": {
    text: "Excellent! I can provide an instant quote. Here are some popular coverage options based on typical needs:",
    plans: mockPlans,
  },
  default: {
    text: "I can help you with insurance quotes, coverage information, consultations, and claims. What would you like to explore?",
    options: ["Get a quote", "Coverage options", "Schedule consultation", "File a claim"],
  },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ARIAChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Retell state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [retellClient, setRetellClient] = useState<RetellWebClient | null>(null);

  // Initialize Retell SDK
  useEffect(() => {
    const client = new RetellWebClient();

    client.on("call_started", () => {
      setIsCallActive(true);
      setIsConnecting(false);
    });

    client.on("call_ended", () => {
      setIsCallActive(false);
      setIsConnecting(false);
    });

    client.on("error", () => {
      setIsCallActive(false);
      setIsConnecting(false);
    });

    setRetellClient(client);

    return () => {
      client.stopCall();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startCall = async () => {
    if (!retellClient) {
      const errorMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        text: "I'm sorry, the voice call system isn't ready yet. Please try again in a moment or use the chat instead!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    setIsConnecting(true);

    try {
      const response = await fetch("/api/retell/web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to start call");
      }

      await retellClient.startCall({
        accessToken: data.data.access_token,
      });

      const callMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        text: "Connected! I'm now listening. Tell me about your insurance needs, and I'll help you find the perfect coverage.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        callStarted: true,
      };
      setMessages((prev) => [...prev, callMessage]);
    } catch (err) {
      console.error("Error starting call:", err);
      setIsConnecting(false);

      const errorMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        text: "I couldn't start the voice call right now. Would you like to continue chatting instead?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: ["Yes, let's chat", "Try call again"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const endCall = () => {
    if (retellClient) {
      retellClient.stopCall();
    }
    setIsCallActive(false);

    const endMessage: Message = {
      id: messages.length + 1,
      sender: "ai",
      text: "Call ended. Thanks for chatting with me! Is there anything else I can help you with?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: ["Get a quote", "Coverage options", "Schedule consultation"],
    };
    setMessages((prev) => [...prev, endMessage]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    const lowerText = text.toLowerCase();

    // Check for special UI triggers
    let specialResponse: { text: string; options?: string[]; plans?: typeof mockPlans; calendar?: boolean } | null = null;

    if (lowerText.includes("coverage") || lowerText.includes("plans") || lowerText.includes("options")) {
      specialResponse = { text: "Here are some coverage options that might interest you:", plans: mockPlans };
    } else if (lowerText.includes("schedule") || lowerText.includes("consultation") || lowerText.includes("appointment")) {
      specialResponse = { text: "I'd be happy to schedule a consultation! Here are our available times:", calendar: true };
    }

    if (specialResponse) {
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: specialResponse.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: specialResponse.options,
        plans: specialResponse.plans,
        calendar: specialResponse.calendar,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
      return;
    }

    // Try Retell AI for dynamic responses
    try {
      const response = await fetch("/api/retell/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-10).map(m => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.response) {
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: "ai",
          text: data.data.response,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, aiMessage]);
        return;
      }
    } catch (error) {
      console.error("Retell chat error:", error);
    }

    // Fallback to rule-based responses
    let response = aiResponses.default;
    for (const key of Object.keys(aiResponses)) {
      if (lowerText.includes(key)) {
        response = aiResponses[key];
        break;
      }
    }

    const aiMessage: Message = {
      id: messages.length + 2,
      sender: "ai",
      text: response.text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: response.options,
      plans: response.plans,
      calendar: response.calendar,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleTimeSelect = (date: string, time: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: `${date} at ${time}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const confirmMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: `Perfect! I've scheduled your consultation for ${date} at ${time}. You'll receive a confirmation email shortly with details and a link to meet with your licensed advisor. Is there anything else I can help you with?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: ["Get a quote while I wait", "Coverage questions", "That's all, thanks!"],
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, confirmMessage]);
    }, 1500);
  };

  const handlePlanClick = (plan: typeof mockPlans[0]) => {
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: `Tell me more about ${plan.name}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const detailMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: `Great choice! ${plan.name} is our ${plan.tag.toLowerCase()} ${plan.type} plan. Starting at just ${formatPrice(plan.monthlyPremium)}/month, it includes ${plan.coverage}. This plan is perfect for those who want reliable coverage without breaking the bank. Would you like to get a personalized quote or speak with an advisor?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: ["Get personalized quote", "Compare plans", "Talk to advisor"],
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, detailMessage]);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    if (action === "call") {
      if (isCallActive) {
        endCall();
      } else {
        startCall();
      }
    } else if (action === "schedule") {
      handleSendMessage("Schedule a consultation");
    } else if (action === "quote") {
      handleSendMessage("Get an insurance quote");
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 ${
          isOpen
            ? "bg-gray-800 rotate-0"
            : "bg-gradient-to-br from-primary-700 to-primary-900"
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageSquare className="w-7 h-7 text-white" />
        )}
        {/* Pulse effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary-700 animate-ping opacity-25" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[calc(100vh-120px)] sm:max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80">Online 24/7</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-b flex-shrink-0">
            <button
              onClick={() => handleQuickAction("call")}
              disabled={isConnecting}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors border flex-1 sm:flex-none justify-center ${
                isCallActive
                  ? "bg-red-100 text-red-600 border-red-200 hover:bg-red-200"
                  : isConnecting
                  ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-primary-50 hover:text-primary-700"
              }`}
            >
              {isCallActive ? (
                <>
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </>
              ) : isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleQuickAction("schedule")}
              className="flex items-center space-x-1 px-3 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors border border-gray-200 flex-1 sm:flex-none justify-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Consult</span>
            </button>
            <button
              onClick={() => handleQuickAction("quote")}
              className="flex items-center space-x-1 px-3 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors border border-gray-200 flex-1 sm:flex-none justify-center"
            >
              <Shield className="w-4 h-4" />
              <span>Quote</span>
            </button>
          </div>

          {/* Active Call Indicator */}
          {isCallActive && (
            <div className="bg-trust-50 border-b border-trust-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-trust-600 animate-pulse" />
                <span className="text-sm font-medium text-trust-700">Voice call active - ARIA is listening</span>
              </div>
              <button
                onClick={endCall}
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-2xl rounded-tr-sm"
                        : "bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100"
                    } px-4 py-3`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === "user" ? "text-white/60" : "text-gray-400"
                      }`}
                    >
                      {message.time}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Plan Cards */}
                {message.sender === "ai" && message.plans && (
                  <div className="mt-3 ml-10 space-y-3">
                    {message.plans.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanClick(plan)}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{plan.name}</h4>
                            <p className="text-xs text-gray-500">{plan.type}</p>
                          </div>
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                            {plan.tag}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {plan.coverage}
                          </div>
                          <p className="text-primary-700 font-bold text-sm">{formatPrice(plan.monthlyPremium)}/mo</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calendar/Scheduling */}
                {message.sender === "ai" && message.calendar && (
                  <div className="mt-3 ml-10 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-5 h-5 text-primary-700" />
                      <span className="font-semibold text-gray-900">Available Times</span>
                    </div>
                    <div className="space-y-3">
                      {mockTimes.map((day) => (
                        <div key={day.date}>
                          <p className="text-xs font-medium text-gray-500 mb-1.5 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {day.date}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => handleTimeSelect(day.date, slot)}
                                className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-lg hover:bg-primary-100 transition-colors font-medium"
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call Started Indicator */}
                {message.sender === "ai" && message.callStarted && (
                  <div className="mt-2 ml-10 flex items-center space-x-2 text-trust-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Voice call connected</span>
                  </div>
                )}

                {/* Quick Reply Options */}
                {message.sender === "ai" && message.options && !message.plans && !message.calendar && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-10">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="px-3 py-1.5 bg-white border border-primary-200 text-primary-700 text-sm rounded-full hover:bg-primary-50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white border-t flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder="Type a message..."
                className="flex-1 min-w-0 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="p-3 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-xl hover:shadow-lg transition-all flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by ARIA • Available 24/7
            </p>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isOpen && isMinimized && (
        <div
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 bg-white rounded-2xl shadow-xl p-4 cursor-pointer hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">ARIA</h4>
              <p className="text-xs text-gray-500">Click to expand chat</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
