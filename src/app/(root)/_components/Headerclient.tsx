"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Sparkles, Code, ChartNetwork, Menu, X } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

export default function HeaderClient({ convexUser }: { convexUser: any }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative z-10">
            <header className="flex items-center justify-between bg-[#0f0f14] p-4 md:p-6 mb-4 rounded-lg shadow-lg shadow-black/30 backdrop-blur-md">
                {/* Left Section */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/" className="flex items-center gap-3 group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
                        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] p-3 rounded-2xl ring-1 ring-gray-800 group-hover:ring-blue-400 transition-all duration-500">
                            <ChartNetwork className="size-6 text-blue-400 group-hover:text-purple-400 transform group-hover:rotate-12 transition-transform duration-500" />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="block text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-500">
                                CodeOrbital
                            </span>
                            <span className="block text-xs md:text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                                Interactive Code Editor
                            </span>
                        </div>
                    </Link>

                    

                    <nav className="hidden sm:flex items-center gap-2">
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

                



                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden p-2 rounded-md text-gray-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-full left-0 w-full bg-[#0f0f14] shadow-lg rounded-lg p-4 flex flex-col gap-4 md:hidden"
                        >
                            {["Snippets", "Webdev"].map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${item.toLowerCase()}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-md"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {index === 0 ? <Code2 className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                                    <span className="text-sm font-medium">{item}</span>
                                </Link>
                            ))}

                            {/* Theme & Language Selectors */}
                            <div className="flex flex-col gap-4 border-t border-gray-700 pt-4">
                                <ThemeSelector />
                                <LanguageSelector />
                            </div>

                            {/* Pro & Run Button */}
                            {!convexUser?.isPro && (
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-sm"
                                    title="Coming Soon"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                                    <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                                        Pro
                                    </span>
                                </Link>
                            )}

                            <SignedIn>
                                <RunButton />
                            </SignedIn>

                            {/* Profile Button */}
                            <div className="border-t border-gray-700 pt-4">
                                <HeaderProfileBtn />
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeSelector />
                    <LanguageSelector />
                    {!convexUser?.isPro && (
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-sm"
                            title="Coming Soon"
                        >
                            <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                            <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                                Pro
                            </span>
                        </Link>
                    )}
                    <SignedIn>
                        <RunButton />
                    </SignedIn>
                    <div className="pl-3 border-l border-gray-700">
                        <HeaderProfileBtn />
                    </div>
                </div>
            </header>
        </div>
    );
}
