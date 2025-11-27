"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bootMessages = [
  { text: "DENIS TOLA SYSTEM v2.4.1", delay: 0, type: "header" },
  {
    text: "Copyright (c) 2025 Denis Tola. All rights reserved.",
    delay: 300,
    type: "info",
  },
  { text: "", delay: 500, type: "spacer" },
  { text: "Loading system modules...", delay: 600, type: "loading" },
  { text: "[OK] Portfolio Service", delay: 900, type: "success" },
  { text: "[OK] GitHub Integration", delay: 1100, type: "success" },
  { text: "[OK] Contact Manager", delay: 1300, type: "success" },
  { text: "[OK] Terminal Interface", delay: 1500, type: "success" },
  { text: "", delay: 1700, type: "spacer" },
  { text: "System Status: ONLINE", delay: 1800, type: "status" },
  { text: "Location: Berlin, Germany", delay: 1900, type: "info" },
  { text: "Mode: Interactive Terminal", delay: 2000, type: "info" },
  { text: "", delay: 2100, type: "spacer" },
  { text: "Welcome to Denis Tola's Portfolio", delay: 2200, type: "welcome" },
  { text: "Type 'help' for available commands", delay: 2400, type: "hint" },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    bootMessages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setVisibleMessages(index + 1);
      }, message.delay);
      timeouts.push(timeout);
    });

    // Mark boot sequence as complete
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 1000);
    }, 3000);
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "header":
        return "terminal-cyan font-bold text-lg";
      case "success":
        return "terminal-green";
      case "loading":
        return "terminal-blue";
      case "status":
        return "terminal-cyan font-semibold";
      case "welcome":
        return "terminal-text font-semibold";
      case "hint":
        return "terminal-text opacity-80 italic";
      case "spacer":
        return "";
      default:
        return "terminal-text";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl">
        <div className="space-y-1">
          {bootMessages.slice(0, visibleMessages).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`boot-text ${getMessageStyle(message.type)}`}
            >
              {message.text || "\u00A0"}
            </motion.div>
          ))}

          {/* Blinking cursor at the end */}
          {visibleMessages >= bootMessages.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block terminal-green"
            >
              <span className="cursor">▊</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
