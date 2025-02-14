"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import useLocalStorage from "@/hooks/useLocalStorag";
import { ShareIcon } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import ShareSnippetDialog from "@/app/(root)/_components/ShareSnippetDialog"; // Import the dialog
import { motion } from "framer-motion";

// Dynamically import Editor and Preview with explicit typing
const Editor = dynamic(() => import("./_components/Editor"), { ssr: false }) as React.ComponentType<{
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
}>;

const Preview = dynamic(() => import("./_components/preview"), { ssr: false }) as React.ComponentType<{
  html: string;
  css: string;
  js: string;
}>;

const DEFAULT_HTML = 
  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>CodeOrbital Playground</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main class="wrapper">\n    <h1>🚀 CodeOrbital</h1>\n    <p>Craft. Code. Create.</p>\n    <button onclick="updateText()">Click Me</button>\n  </main>\n  <script src="script.js"></script>\n</body>\n</html>';

const DEFAULT_CSS = 
  "*, *::before, *::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: 'Inter', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background: #111827;\n  color: #f9fafb;\n  text-align: center;\n}\n\n.wrapper {\n  padding: 2rem;\n  border-radius: 12px;\n  background: #1f2937;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n}\n\nh1 {\n  font-size: 2rem;\n  font-weight: 600;\n}\n\np {\n  margin-top: 0.5rem;\n  font-size: 1.2rem;\n  color: #9ca3af;\n}\n\nbutton {\n  margin-top: 1.5rem;\n  padding: 10px 20px;\n  font-size: 1rem;\n  font-weight: 500;\n  color: #111827;\n  background: #facc15;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n\nbutton:hover {\n  background: #eab308;\n}";

const DEFAULT_JS = 
  "console.log('🚀 Welcome to CodeOrbital!');\n\nfunction updateText() {\n  const message = document.querySelector('p');\n  message.innerText = 'Keep building amazing things! 🚀';\n  message.style.color = '#facc15';\n}";


function App() {
  const [activeFile, setActiveFile] = useState<"HTML" | "CSS" | "JS">("HTML");
  const [html, setHtml] = useLocalStorage("html", DEFAULT_HTML);
  const [css, setCss] = useLocalStorage("css", DEFAULT_CSS);
  const [js, setJs] = useLocalStorage("js", DEFAULT_JS);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); // State for share dialog

  // Determine the active file's content
  const getFileContent = () => {
    switch (activeFile) {
      case "HTML":
        return { language: "html" as const, value: html, setValue: setHtml };
      case "CSS":
        return { language: "css" as const, value: css, setValue: setCss };
      case "JS":
        return { language: "javascript" as const, value: js, setValue: setJs };
      default:
        return { language: "html" as const, value: html, setValue: setHtml };
    }
  };

  const { language, value, setValue } = getFileContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#231814] text-white flex flex-col">
      {/* Header */}
      <NavigationHeader />

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 grid grid-cols-2 gap-4">
        {/* Code Editor Section */}
        <div className="flex flex-col rounded-lg overflow-hidden shadow-md bg-[#1e1e1e]">
          {/* File Tabs with Share Button */}
          <div className="flex items-center justify-between bg-[#11121a] border-b border-[#3c3c3c] p-2">
            <div className="flex">
              {["HTML", "CSS", "JS"].map((file) => (
                <button
                  key={file}
                  onClick={() => setActiveFile(file as "HTML" | "CSS" | "JS")}
                  className={`px-4 py-2 text-sm ${activeFile === file
                      ? "bg-[#0d1117] text-blue-400"
                      : "text-gray-400"
                    } hover:bg-[#1e1e1e]`}
                >
                  {file}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)} // Open the share dialog
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-4 text-white" />
              <span className="text-sm font-medium text-white">Share</span>
            </motion.button>
          </div>

          {/* Active File Editor */}
          <div className="flex-1">
            <Editor
              language={language}
              value={value}
              onChange={setValue} // Correctly set the value for the editor

            />
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white">
          <Preview html={html} css={css} js={js} />
        </div>
      </main>

      {/* Share Snippet Dialog */}
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default App;
