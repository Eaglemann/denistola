"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ToptalBadge from "@/components/ToptalBadge";

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
  const [showOutput, setShowOutput] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const showBadge = currentCommand === commands.length - 1 && showOutput;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 389px)");
    const updateIsNarrowMobile = () => setIsNarrowMobile(mediaQuery.matches);
    updateIsNarrowMobile();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsNarrowMobile);
      return () => mediaQuery.removeEventListener("change", updateIsNarrowMobile);
    }

    mediaQuery.addListener(updateIsNarrowMobile);
    return () => mediaQuery.removeListener(updateIsNarrowMobile);
  }, []);

  useEffect(() => {
    if (currentCommand < commands.length) {
      const command = commands[currentCommand];
      let index = 0;
      setShowOutput(false);
      setDisplayText("");
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      const typeCommand = () => {
        if (index < command.command.length) {
          setDisplayText(command.command.slice(0, index + 1));
          index++;
          const typingDelay = setTimeout(typeCommand, 80 + Math.random() * 40);
          timeouts.push(typingDelay);
        } else {
          const outputDelay = setTimeout(() => {
            setShowOutput(true);
            if (currentCommand < commands.length - 1) {
              const nextCommandDelay = setTimeout(() => {
                setCurrentCommand((prev) =>
                  Math.min(prev + 1, commands.length - 1)
                );
              }, 2000);
              timeouts.push(nextCommandDelay);
            }
          }, 500);
          timeouts.push(outputDelay);
        }
      };

      const initialDelay = setTimeout(typeCommand, 1000);
      timeouts.push(initialDelay);

      return () => {
        timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }
  }, [currentCommand]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="font-mono text-sm"
    >
      <div className="terminal-layout">
        <div className="space-y-2 terminal-command-pane">
          {commands.slice(0, currentCommand).map((cmd, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center terminal-command-row">
                <span className="terminal-green">denis@portfolio</span>
                <span className="terminal-text">:</span>
                <span className="terminal-blue">~</span>
                <span className="terminal-text">$ {cmd.command}</span>
              </div>
              <div className="terminal-text pl-4 terminal-command-output">
                {cmd.output}
              </div>
            </div>
          ))}

          {currentCommand < commands.length && (
            <div className="space-y-1">
              <div className="flex items-center terminal-command-row">
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
                  className="terminal-text pl-4 terminal-command-output"
                >
                  {commands[currentCommand].output}
                </motion.div>
              )}
            </div>
          )}
        </div>

        {showBadge && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="toptal-badge-terminal"
          >
            <ToptalBadge variant={isNarrowMobile ? "compact" : "hex"} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
