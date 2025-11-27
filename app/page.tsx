"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Mail,
  Terminal as TerminalIcon,
  Cpu,
  Linkedin,
} from "lucide-react";
import BootSequence from "@/components/BootSequence";
import Terminal from "@/components/Terminal";
import GitHubStats from "@/components/GitHubStats";

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);
  const [systemLoaded, setSystemLoaded] = useState(false);

  const handleBootComplete = () => {
    setShowBoot(false);
    setTimeout(() => setSystemLoaded(true), 500);
  };

  return (
    <div className="crt-screen">
      <AnimatePresence>
        {showBoot && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!showBoot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center p-6"
        >
          <div className="w-full max-w-5xl">
            {/* Main Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                bounce: 0.1,
              }}
              className="premium-terminal mb-8"
            >
              <div className="terminal-header">
                <div className="terminal-button close hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="terminal-button minimize hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="terminal-button maximize hover:bg-green-600 transition-colors cursor-pointer"></div>
                <div className="flex items-center gap-2 ml-4">
                  <TerminalIcon size={14} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    denis@portfolio:~
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Cpu size={14} className="text-green-500" />
                  <span className="text-xs text-green-500">ONLINE</span>
                </div>
              </div>

              <div className="p-8">
                <Terminal />
              </div>
            </motion.div>

            {/* Main Dashboard Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* System Status Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="premium-terminal system-variant"
              >
                <div className="terminal-header">
                  <div className="terminal-button close"></div>
                  <div className="terminal-button minimize"></div>
                  <div className="terminal-button maximize"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    system --info
                  </span>
                  <div className="ml-auto">
                    <span className="text-xs text-blue-400">v2.4.1</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="terminal-text text-base font-semibold mb-4">
                      <span className="terminal-blue">$</span>{" "}
                      <span className="terminal-cyan">whoami</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="terminal-blue">User:</span>
                        <span className="terminal-text">Denis Tola</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="terminal-blue">Role:</span>
                        <span className="terminal-text">Software Engineer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="terminal-blue">Location:</span>
                        <span className="terminal-text">Berlin, Germany</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="terminal-blue">Status:</span>
                        <span className="terminal-green">Available</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-600">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="terminal-green text-xs">●</span>
                          <span className="terminal-text text-xs">
                            Python & Typescript
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="terminal-green text-xs">●</span>
                          <span className="terminal-text text-xs">
                            Backend & Data Engineering
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="terminal-green text-xs">●</span>
                          <span className="terminal-text text-xs">
                            DevOps & AWS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-600">
                      <div className="space-y-2">
                        <a
                          href="mailto:denis.tola22@gmail.com"
                          className="flex items-center gap-2 terminal-text hover:terminal-green-glow transition-all duration-200"
                        >
                          <Mail size={12} />
                          <span className="text-xs">
                            denis.tola22@gmail.com
                          </span>
                        </a>
                        <a
                          href="https://github.com/eaglemann"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 terminal-text hover:terminal-green-glow transition-all duration-200"
                        >
                          <Github size={12} />
                          <span className="text-xs">github.com/eaglemann</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/eaglemann"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 terminal-text hover:terminal-green-glow transition-all duration-200"
                        >
                          <Linkedin size={12} />
                          <span className="text-xs">
                            linkedin.com/in/eaglemann
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GitHub Stats Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="premium-terminal github-variant"
              >
                <div className="terminal-header">
                  <div className="terminal-button close"></div>
                  <div className="terminal-button minimize"></div>
                  <div className="terminal-button maximize"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    git --remote-info
                  </span>
                  <div className="ml-auto">
                    <Github size={14} className="text-gray-400" />
                  </div>
                </div>

                <div className="p-6">
                  <GitHubStats />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
