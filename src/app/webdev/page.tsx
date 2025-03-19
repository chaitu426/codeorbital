"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import useLocalStorage from "@/hooks/useLocalStorag";
import { RotateCcwIcon, ShareIcon } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import ShareSnippetDialog from "@/app/(root)/_components/ShareSnippetDialog";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Modal from "@/components/Modal";


// Dynamically import Editor and Preview with explicit typing
const Editor = dynamic(() => import("./_components/Editor"), { ssr: false });
const Preview = dynamic(() => import("./_components/preview"), { ssr: false });

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeOrbital Playground</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="wrapper">
    <h1>🚀 CodeOrbital</h1>
    <p>Craft. Code. Create.</p>
    <button onclick="updateText()">Click Me</button>
  </main>
  <script src="script.js"></script>
</body>
</html>`;

const DEFAULT_CSS = `body {
  font-family: 'Inter', sans-serif;
  text-align: center;
}`;

const DEFAULT_JS = `console.log('🚀 Welcome to CodeOrbital!');
function updateText() {
  document.querySelector('p').innerText = 'Keep building amazing things! 🚀';
}`;

function App() {
  const [activeFile, setActiveFile] = useState<"HTML" | "CSS" | "JS">("HTML");
  const [html, setHtml] = useLocalStorage("html", DEFAULT_HTML);
  const [css, setCss] = useLocalStorage("css", DEFAULT_CSS);
  const [js, setJs] = useLocalStorage("js", DEFAULT_JS);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const askai = async () => {
    setIsLoading(true);
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", systemInstruction: `You are an expert frontend developer with deep knowledge of HTML, CSS, and JavaScript. You specialize in writing clean, efficient, and maintainable code following best practices. Your goal is to analyze, correct, optimize, and enhance frontend code while ensuring modern performance standards and cross-browser compatibility.

      ### 🔍 Responsibilities:
      - Detect and fix syntax errors, logic issues, and inefficiencies in HTML, CSS, and JavaScript.
      - Optimize code for performance, maintainability, and best practices.
      - Ensure responsive and accessible design (ARIA, semantic HTML, etc.).
      - Improve JavaScript performance by reducing unnecessary computations and optimizing event handling.
      - Use modern CSS techniques (Flexbox, Grid, animations, variables).
      - Suggest best practices for file structuring, component design, and modularity.
      - Identify unused or redundant code and remove unnecessary elements.
      - Provide explanations for improvements, detailing **why** they enhance performance or readability.
      
      ### 📌 Response Format:
      1. **Code:** (Provide the optimized and improved version of the given code)
      2. **Explanations:** (Clearly explain what was changed and why)
      3. **Performance Metrics:** (If applicable, mention improvements in rendering, execution time, or resource usage)
      4. **Best Practices Applied:** (List applied best practices, such as avoiding unnecessary reflows, using CSS variables, etc.)
      5. **References:** (Include links to relevant documentation, such as MDN or Stack Overflow discussions)
      
      ### 🚀 Guidelines:
      - Prioritize clean and readable code with proper indentation and comments where necessary.
      - Ensure best performance using techniques like debouncing, lazy loading, and efficient DOM manipulation.
      - Minimize reflows and repaints by using optimized CSS techniques.
      - Provide real-world suggestions to improve maintainability.
      - Always validate changes against modern web standards and frameworks.
      
      ### ❌ Avoid:
      - Overcomplicating solutions or adding unnecessary libraries.
      - Returning incomplete or unclear explanations.
      - Using deprecated or outdated techniques.
      
      ### Example Improvements You Can Suggest:
      - Replace "var" with "let" or "const" in JavaScript.
      - Optimize CSS selectors for better performance.
      - Use semantic HTML instead of "div"-based structures.
      - Suggest using "flexbox" or "grid" for better layout handling.
      - Improve event listeners to avoid memory leaks.
      - Enhance accessibility using ARIA attributes.
      
      Your task is to **analyze the provided frontend code** and **return an improved version with explanations** following the above guidelines.
      ` });

    const prompt = `Here is my frontend code written in HTML, CSS, and JavaScript.  

- Please review the code for **errors, inefficiencies, and best practices**.
- If there are any mistakes, **correct them**.
- If the code is already correct, **optimize it for performance, maintainability, and readability**.
- Ensure **responsive design, accessibility (ARIA), and cross-browser compatibility**.
- Provide **clear explanations** for any changes you make.
- Suggest improvements in **layout (CSS Grid, Flexbox), JavaScript performance (event handling, async functions), and best practices**.

Here is the code:

**HTML:**  
${html},
**CSS:** 
${css},
**JavaScript:**
${js}

give me the optimized code with explanations if there is no correction only give explanation and some css tips dont give full code.
output format:
HTML CODE
CSS CODE
JS CODE
EXPLANATIONs`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    setAiResponse(responseText);
    setIsLoading(false);
    setIsModalOpen(true);
  };

  const getFileContent: () => { language: "html" | "css" | "javascript"; value: string; setValue: (value: string) => void } = () => {
    switch (activeFile) {
      case "HTML": return { language: "html", value: html, setValue: setHtml };
      case "CSS": return { language: "css", value: css, setValue: setCss };
      case "JS": return { language: "javascript", value: js, setValue: setJs };
      default: return { language: "html", value: html, setValue: setHtml };
    }
  };

  const { language, value, setValue } = getFileContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#231814] text-white flex flex-col">
      <NavigationHeader />
      <main className="flex-1 container mx-auto p-4 grid grid-cols-2 gap-4 ">
        <div className="flex flex-col rounded-lg overflow-hidden shadow-md bg-[#1e1e1e]">
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

            <div className="flex items-center gap-2">


              <motion.button
                onClick={askai}
                className="flex items-center justify-center p-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md transition-all duration-300"
                aria-label="Get AI Suggestions"
              >
                {isLoading ? (
                  <RotateCcwIcon className="animate-spin text-white mr-1" size={16} />
                ) : (
                  <ShareIcon className="text-white mr-1" size={16} />
                )}
                <span className="text-white text-sm font-semibold">
                  {isLoading ? "Loading..." : "Ask AI"}
                </span>
              </motion.button>


              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
              >
                <ShareIcon className="size-4 text-white" />
                <span className="text-sm font-medium text-white">Share</span>
              </motion.button>
            </div>


          </div>



          <div className="flex-1">
            <Editor language={language} value={value} onChange={setValue} />
          </div>



        </div>


        <div className="rounded-lg overflow-hidden shadow-md bg-white">
          <Preview html={html} css={css} js={js} />
        </div>
      </main>

      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}

      {/* AI Response Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">AI Suggestions</h2>

            <div className="text-sm bg-gray-900 p-2 rounded-md overflow-auto text-white">
              {aiResponse && (
                <>
                  {/* Extract and display the introduction if available */}
                  {aiResponse.includes("Okay,") && (
                    <p className="mb-2">{aiResponse.split("\n\n")[0]}</p>
                  )}

                  {/* Extract and display HTML code */}
                  {aiResponse.includes("**HTML CODE**") && (
                    <>
                      <h3 className="mt-2 text-white">HTML Code</h3>
                      <pre className="bg-gray-800 p-2 rounded-md overflow-auto">
                        <code>
                          {
                            aiResponse.match(/(?<=\*\*HTML CODE\*\*\n\n)([\s\S]*?)(?=\n\n\*\*CSS CODE\*\*)/)?.[0] ||
                            "No HTML code provided."
                          }
                        </code>
                      </pre>
                    </>
                  )}

                  {/* Extract and display CSS code */}
                  {aiResponse.includes("**CSS CODE**") && (
                    <>
                      <h3 className="mt-2 text-white">CSS Code</h3>
                      <pre className="bg-gray-800 p-2 rounded-md overflow-auto">
                        <code>
                          {
                            aiResponse.match(/(?<=\*\*CSS CODE\*\*\n\n)([\s\S]*?)(?=\n\n\*\*JS CODE\*\*)/)?.[0] ||
                            "No CSS code provided."
                          }
                        </code>
                      </pre>
                    </>
                  )}

                  {/* Extract and display JavaScript code */}
                  {aiResponse.includes("**JS CODE**") && (
                    <>
                      <h3 className="mt-2 text-white">JavaScript Code</h3>
                      <pre className="bg-gray-800 p-2 rounded-md overflow-auto">
                        <code>
                          {
                            aiResponse.match(/(?<=\*\*JS CODE\*\*\n\n)([\s\S]*?)(?=\n\n\*\*EXPLANATIONS:\*\*)/)?.[0] ||
                            "No JavaScript code provided."
                          }
                        </code>
                      </pre>
                    </>
                  )}

                  {/* Extract and display explanations */}
                  {aiResponse.includes("**EXPLANATIONS:**") && (
                    <>
                      <h3 className="mt-2 text-white">Explanation</h3>
                      <p className="mt-1">
                        {
                          aiResponse.match(/(?<=\*\*EXPLANATIONS:\*\*\n\n)([\s\S]*)/)?.[0] ||
                          "No explanation provided."
                        }
                      </p>
                    </>
                  )}
                </>
              )}
            </div>


          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;

