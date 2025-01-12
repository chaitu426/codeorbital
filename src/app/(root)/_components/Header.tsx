import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles, Code, ChartNetwork } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <header
        className="flex items-center lg:justify-between justify-center 
        bg-[#0f0f14] p-6 mb-4 rounded-lg shadow-lg shadow-black/30 backdrop-blur-md"
      >
        {/* Logo Section */}
        <div className="hidden lg:flex items-center gap-8">
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

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {["Snippets", "Webdev"].map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 
                  hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700 
                  hover:border-blue-500/50 transition-all duration-300 shadow-md"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                  to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {index === 0 ? (
                  <Code2 className="w-4 h-4 group-hover:rotate-3 transition-transform" />
                ) : (
                  <Code className="w-4 h-4 group-hover:rotate-3 transition-transform" />
                )}
                <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  {item}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme and Language Selectors */}
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector />
          </div>

          {/* Pro Plan Button */}
          {!convexUser?.isPro && (
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 
                bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                hover:border-amber-500/40 transition-all duration-300 shadow-sm"
              title="Coming Soon"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}

          {/* Run Button */}
          <SignedIn>
            <RunButton />
          </SignedIn>

          {/* Profile Button */}
          <div className="pl-3 border-l border-gray-700">
            <HeaderProfileBtn />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
