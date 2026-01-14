"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, Eye } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const mockUser: GitHubUser = {
          login: "denistola",
          public_repos: 34,
          followers: 5,
          following: 8,
          created_at: "2014-09-23T00:00:00Z",
        };

        const mockRepos: Repository[] = [
          {
            id: 1,
            name: "Time-Travel-Crypto-Trading-Engine",
            description:
              "A platform that ingests live crypto trades and allows you to revert the database to any second in the past to backtest strategies, and serves live signals.",
            html_url: "https://github.com/Eaglemann/Time-Travel-Crypto-Trading-Engine",
            stargazers_count: 1,
            forks_count: 0,
            watchers_count: 0,
            language: "Python",
            updated_at: "2026-01-01T00:00:00Z",
          },
          {
            id: 2,
            name: "Git-Message-AI-Commit ",
            description:
              "A CLI tool that uses a local Ollama instance to generate Conventional Commits messages from your staged changes.",
            html_url:
              "https://github.com/Eaglemann/Git-Message-AI-Commit ",
            stargazers_count: 1,
            forks_count: 0,
            watchers_count: 0,
            language: "Typescript",
            updated_at: "2024-01-08T00:00:00Z",
          },
          {
            id: 3,
            name: "Schema-Sense-CSVtoSQL",
            description: "Instantly transform raw CSV data into production-ready MySQL schemas with AI-powered insights.",
            html_url:
              "https://github.com/Eaglemann/Schema-Sense-CSVtoSQL",
            stargazers_count: 1,
            forks_count: 0,
            watchers_count: 0,
            language: "Python",
            updated_at: "2024-01-15T00:00:00Z",
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setUser(mockUser);
        setRepos(mockRepos);
        setLoading(false);
      } catch (err) {
        setError("Failed to load GitHub data");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      React: "#61dafb",
    };
    return colors[language] || "#8b949e";
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="terminal-green">$ git status</div>
        <div className="terminal-text">Fetching repository data...</div>
        <div className="flex items-center gap-2">
          <span className="cursor animate-pulse">▊</span>
          <span className="terminal-cyan">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="terminal-green">$ git status</div>
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="terminal-text text-base font-semibold">
        <span className="terminal-blue">$</span>{" "}
        <span className="terminal-cyan">git --stats</span>
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4 text-xs mb-4"
        >
          <div className="flex justify-between">
            <span className="terminal-blue">Repositories:</span>
            <span className="terminal-text">{user.public_repos}</span>
          </div>
          <div className="flex justify-between">
            <span className="terminal-blue">Followers:</span>
            <span className="terminal-text">{user.followers}</span>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {repos.slice(0, 3).map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2">
              <GitBranch size={12} className="terminal-green" />
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-blue hover:terminal-green-glow transition-colors text-sm"
              >
                {repo.name}
              </a>
            </div>

            <div className="text-xs terminal-text opacity-80 pl-4">
              {repo.description}
            </div>

            <div className="flex items-center gap-4 text-xs pl-4">
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="terminal-text">{repo.language}</span>
              </div>

              <div className="flex items-center gap-1">
                <Star size={10} className="terminal-yellow" />
                <span className="terminal-text">{repo.stargazers_count}</span>
              </div>

              <div className="flex items-center gap-1">
                <GitFork size={10} className="terminal-cyan" />
                <span className="terminal-text">{repo.forks_count}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-600">
        <div className="flex items-center gap-2 text-xs">
          <span className="terminal-green animate-pulse">●</span>
          <span className="terminal-cyan">Last updated: 2 hours ago</span>
        </div>
      </div>
    </div>
  );
}
