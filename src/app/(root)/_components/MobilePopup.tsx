"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Laptop2,
  Code2,
  Sparkles,
  Users,
  TerminalSquare,
  PlayCircle,
} from "lucide-react";

export default function MobilePopup() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileDevice = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      userAgent
    );
    setIsMobile(isMobileDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Welcome to CodeOrbital 🚀
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Your all-in-one browser-based platform for coding, building, and
          learning — optimized for desktops.
        </p>

        {/* Embedded YouTube Video */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-lg border border-white/10 aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/OUC6Ic_WvSE?controls=0&modestbranding=1&rel=0&autoplay=1&mute=1&loop=1&playlist=OUC6Ic_WvSE"
            title="CodeOrbital Demo"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <Feature
          icon={<Code2 className="text-blue-400 w-6 h-6" />}
          title="Live Code Execution"
          description="Write and preview HTML, CSS, and JS in real time — no setup needed."
        />
        <Feature
          icon={<TerminalSquare className="text-green-400 w-6 h-6" />}
          title="Developer Playground"
          description="Run React, Node, and more inside your browser — powered by containers."
        />
        <Feature
          icon={<Sparkles className="text-purple-400 w-6 h-6" />}
          title="AI Teacher Assistant"
          description="Get real-time help from an AI tutor while writing code or debugging."
        />
        <Feature
          icon={<Users className="text-pink-400 w-6 h-6" />}
          title="Community Snippets"
          description="Explore and share useful code snippets — organized by tags and languages."
        />
        <Feature
          icon={<Laptop2 className="text-yellow-400 w-6 h-6" />}
          title="Responsive Editor"
          description="Build with confidence in an editor that mimics VS Code, with folder/file support."
        />
        <Feature
          icon={<PlayCircle className="text-cyan-400 w-6 h-6" />}
          title="Instant Preview"
          description="Preview web apps as you build them — no waiting, just feedback."
        />
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Unlock the full CodeOrbital experience on desktop
        </h2>
        <p className="mt-3 text-white/70 text-lg">
          For real-time terminals, AI feedback, and modern web development — we
          recommend switching to a larger screen.
        </p>
        <button className="mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all">
          Open on Desktop 💻
        </button>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#111213] border border-white/10 p-6 rounded-xl shadow-lg text-left hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-3 mb-3 font-semibold text-white">
        {icon}
        {title}
      </div>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
}

