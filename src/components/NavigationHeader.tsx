import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import {  ChartNetwork, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150 shadow-md shadow-black/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group relative">
              {/* Glow effect */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-lg opacity-0 
                group-hover:opacity-100 transition-opacity duration-700 blur-lg"
              />
              {/* Logo */}
              <div
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] p-3 rounded-2xl ring-1
              ring-gray-800 group-hover:ring-blue-400 transition-all duration-500"
              >
                <ChartNetwork
                  className="size-6 text-blue-400 group-hover:text-purple-400 
                transform group-hover:rotate-12 transition-transform duration-500"
                />
              </div>
              {/* Title and Subtitle */}
              <div className="flex flex-col">
                <span
                  className="block text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent 
                bg-clip-text group-hover:scale-105 transition-transform duration-500"
                >
                  CodeOrbital
                </span>
                <span
                  className="block text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors"
                >
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Navigation Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-md"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
            <Link
              href="/"
              className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-md"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium group-hover:text-white transition-colors">
                Editor
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Pro Button with Tooltip */}
            <SignedOut>
              <div className="relative group">
                <div
                  className="absolute -top-8 left-0 px-3 py-1 text-xs bg-gray-800 text-gray-100 rounded-md shadow-lg opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"
                >
                  Coming soon with new features
                </div>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 
                  bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/50 
                  transition-all duration-300 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  <span className="text-sm font-medium text-amber-400/90 group-hover:text-amber-300">
                    Pro
                  </span>
                </Link>
              </div>
            </SignedOut>

            {/* Profile Button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
