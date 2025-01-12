"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Play, Columns2, ShareIcon } from "lucide-react"; // Assuming you're using these icons
import { SignedIn } from "@clerk/nextjs";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const [srcDoc, setSrcDoc] = useState("");
  const [blobUrl, setBlobUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const documentContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;

      setSrcDoc(documentContent);

      // Create Blob URL
      const blob = new Blob([documentContent], { type: "text/html" });
      setBlobUrl(URL.createObjectURL(blob));
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleClick = () => {
    setIsRunning(true);
    window.open(blobUrl, "_blank");
    setTimeout(() => setIsRunning(false), 500); // Reset after opening
  };

  

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-[#1e1e1e] text-white">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-[#181825] p-2 border-b border-[#3c3c3c]">

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Columns2 className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        

        <SignedIn>

          
          <div className="flex gap-2">
            {/* Motion Button */}
            <motion.button
              onClick={handleClick}
              disabled={isRunning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
              group relative inline-flex items-center gap-2.5 px-5 py-2.5
              disabled:cursor-not-allowed
              focus:outline-none 
            `}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

              <div className="relative flex items-center gap-2.5">
                {isRunning ? (
                  <>
                    <div className="relative">
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                      <div className="absolute inset-0 blur animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-white/90">Opening...</span>
                  </>
                ) : (
                  <>

                     

                    <div className="relative flex items-center justify-center w-4 h-4">
                      <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
                    </div>

                    <span className="text-sm font-medium text-white/90 group-hover:text-white">
                      View in Browser
                    </span>

                    

                  </>
                  
                )}
              </div>
            </motion.button>
          </div>
        </SignedIn>
      </div>

      {/* Iframe for Preview */}
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts allow-same-origin"
        frameBorder="0"
        className="w-full h-[600px] rounded-lg"
      />
    </div>
  );
};

export default Preview;
