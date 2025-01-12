"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { LogoTicker } from "./logo-ticker";
import { ProductShowcase } from "./product-showcase";
import { Faqs } from "./faqs";
import { CallToAction } from "./call-to-action";
import { Play } from "lucide-react"; // Replace with your preferred icons

export default function ToggleContent() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="mt-6 text-center">
      <motion.button
        onClick={() => setShowContent(!showContent)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group relative inline-flex items-center gap-2.5 px-5 py-2.5
          focus:outline-none
        `}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

        <div className="relative flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-4 h-4">
            <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
          </div>
          <span className="text-sm font-medium text-white/90 group-hover:text-white">
            {showContent ? "Hide Content" : "How to Use"}
          </span>
        </div>
      </motion.button>

      {/* Conditionally render additional components */}
      {showContent && (
        <div className="mt-4">
          <LogoTicker />
          <ProductShowcase />
          <Faqs />
          <CallToAction />
        </div>
      )}
    </div>
  );
}
