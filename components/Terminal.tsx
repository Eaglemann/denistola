"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const commands = [
  { command: "whoami", output: "Denis Tola" },
  { command: "cat about.txt", output: "Software Engineer based in Berlin." },
  {
    command: "ls skills/",
    output: "Python  Typescript  FastAPI  Next.js  Spark  Airflow  AWS  ...",
  },
];

export default function Terminal() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentCommand < commands.length) {
      const command = commands[currentCommand];
      let index = 0;
      setIsTyping(true);
      setShowOutput(false);
      setDisplayText("");

      const typeCommand = () => {
        if (index < command.command.length) {
          setDisplayText(command.command.slice(0, index + 1));
          index++;
          setTimeout(typeCommand, 80 + Math.random() * 40);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setShowOutput(true);
            if (currentCommand < commands.length - 1) {
              setTimeout(() => {
                setCurrentCommand((prev) => prev + 1);
              }, 2000);
            }
          }, 500);
        }
      };

      setTimeout(typeCommand, 1000);
    }
  }, [currentCommand]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="font-mono text-sm"
    >
      <div className="space-y-2">
        {commands.slice(0, currentCommand).map((cmd, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center">
              <span className="terminal-green">denis@portfolio</span>
              <span className="terminal-text">:</span>
              <span className="terminal-blue">~</span>
              <span className="terminal-text">$ {cmd.command}</span>
            </div>
            <div className="terminal-text pl-4">{cmd.output}</div>
          </div>
        ))}

        {currentCommand < commands.length && (
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="terminal-green">denis@portfolio</span>
              <span className="terminal-text">:</span>
              <span className="terminal-blue">~</span>
              <span className="terminal-text">$ {displayText}</span>
              {showCursor && !showOutput && (
                <span className="terminal-green animate-pulse">▊</span>
              )}
            </div>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="terminal-text pl-4"
              >
                {commands[currentCommand].output}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
