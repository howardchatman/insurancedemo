"use client";

import { useState, useEffect } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

interface CallButtonProps {
  variant?: "default" | "compact";
}

export default function CallButton({ variant = "default" }: CallButtonProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [retellClient, setRetellClient] = useState<RetellWebClient | null>(null);

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

  const startCall = async () => {
    if (!retellClient) return;

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
    } catch (err) {
      console.error("Error starting call:", err);
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (retellClient) {
      retellClient.stopCall();
    }
    setIsCallActive(false);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={isCallActive ? endCall : startCall}
        disabled={isConnecting}
        className={`p-3 rounded-full transition-all ${
          isCallActive
            ? "bg-red-500 text-white hover:bg-red-600"
            : isConnecting
            ? "bg-yellow-500 text-white"
            : "bg-primary-700 text-white hover:bg-primary-800"
        }`}
      >
        {isCallActive ? (
          <PhoneOff className="w-5 h-5" />
        ) : isConnecting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Phone className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={isCallActive ? endCall : startCall}
      disabled={isConnecting}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isCallActive
          ? "bg-red-500 text-white hover:bg-red-600"
          : isConnecting
          ? "bg-yellow-500 text-white"
          : "bg-primary-700 text-white hover:bg-primary-800"
      }`}
    >
      {isCallActive ? (
        <>
          <PhoneOff className="w-4 h-4" />
          <span>End Call</span>
        </>
      ) : isConnecting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Phone className="w-4 h-4" />
          <span>Talk to ARIA</span>
        </>
      )}
    </button>
  );
}
