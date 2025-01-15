"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon, MapIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import Modal from "@/components/Modal";
import { jsPDF } from "jspdf"; // Adjust the import path as necessary
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"; //
// import chalk from "chalk";
//import prompt from "prompt-sync";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-pulse text-center">
      <div className="text-lg font-bold text-gray-400 mb-2">Processing...</div>
      <div className="flex space-x-2">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
      </div>
    </div>
  </div>
);
function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isMemoryMapOpen, setIsMemoryMapOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [aiResponse, setAiResponse] = useState(""); // To store AI suggestions

  const [memoryMapContent, setMemoryMapContent] = useState("");
  const [editorContent, setEditorContent] = useState(""); // Track editor content
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) {
      editor.setValue(newCode);
      setEditorContent(newCode); // Initialize content state
    }
  }, [language, editor]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) {
      editor.setValue(defaultCode);
      setEditorContent(defaultCode); // Reset content state
      localStorage.removeItem(`editor-code-${language}`);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value); // Update content state
      localStorage.setItem(`editor-code-${language}`, value);
    }
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleMemoryMapConversion = () => {
    if (editor) {
      const currentCode = editor.getValue();
      const lines = currentCode.split("\n");

      // Variables to store time and space complexities
      let timeComplexity = 'O(1)'; // Default time complexity
      let spaceComplexity = 'O(1)'; // Default space complexity

      // Enhanced Time Complexity Analysis
      if (currentCode.includes('.map') || currentCode.includes('.filter') || currentCode.includes('.reduce')) {
        timeComplexity = 'O(n)'; // Methods like map/filter/reduce are O(n)
        spaceComplexity = 'O(n)'; // Space for new arrays
      }

      // Check for for/while loops and analyze nested loops
      const loopMatches = currentCode.match(/(for|while)\s*\(/g); // Detect loops
      if (loopMatches && loopMatches.length > 1) {
        timeComplexity = 'O(n^2)'; // Nested loops = O(n^2)
      } else if (loopMatches && loopMatches.length === 1) {
        timeComplexity = 'O(n)'; // Single loop = O(n)
      }

      // Check for sorting operations which are usually O(n log n)
      if (currentCode.includes('.sort')) {
        timeComplexity = 'O(n log n)'; // Sort operations
      }

      // Basic recursive function detection for space complexity (stack space)
      if (currentCode.includes('function') && currentCode.includes('return') && currentCode.includes('call')) {
        spaceComplexity = 'O(n)'; // Recursive functions use stack space
      }

      // Detecting asynchronous functions and their impact on space complexity
      if (currentCode.includes('async') || currentCode.includes('await')) {
        // Asynchronous code can be treated as O(1) for space unless complex structures are used
        spaceComplexity = 'O(1)';
      }

      // Dummy memory map based on code analysis
      const memoryMap = `Memory Map for the current code:\n${lines
        .map((line: string | string[], idx: number) => {
          return `Line ${idx + 1}: ${line.length} bytes`; // Line size in bytes
        })
        .join("\n")}\n\nTime Complexity: ${timeComplexity}\nSpace Complexity: ${spaceComplexity}`;


      // Update the memory map content
      setMemoryMapContent(memoryMap);
      setIsMemoryMapOpen(true);
    }
  };


  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; // Replace with your actual API key securely

  async function runChat(prompt: string): Promise<string> {
    try {
      if (!prompt.trim()) {
        throw new Error("The input prompt is empty. Please provide valid code or text.");
      }

      // Initialize the Generative AI instance
      const genAI = new GoogleGenerativeAI(API_KEY);

      // Load the specified generative model
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      // Define the context for the AI response
      const context = `
        You are an extremely intelligent and experienced software engineer with the ability to analyze, optimize, and solve any coding problems. Your task is to review the provided code carefully. If the code is incorrect or incomplete, you will correct or complete it, ensuring it works perfectly. If the code is already functional, you will suggest improvements for better execution, optimization, or maintainability. Always provide insightful feedback and ensure the solution is efficient and follows best practices also give all spcifications af code such as time and space complexcity and other matrics of code in code format.

      `;
      const fullPrompt = `${context} ${prompt}`;

      // Configure generation settings
      const generationConfig = {
        temperature: 0.7,
        topK: 1,
        topP: 0.9,
        maxOutputTokens: 2048,
      };

      // Define safety settings
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      // Start the chat with the AI model
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [], // No conversation history required for suggestions
      });

      // Send the prompt to the AI model and get the result
      const result = await chat.sendMessage(fullPrompt);

      // Return the AI response text
      return result.response.text();
    } catch (error) {
      console.error("Error during AI suggestion generation:", error);
      throw new Error("Unable to process the input. Please check your network or API configuration.");
    }
  }


  const handleGetSuggestions = async () => {

    const currentCode = editor.getValue();
    const editorContent = currentCode; // Replace with actual editor content

    try {
      setIsLoading(true); // Start loading
      const response = await runChat(editorContent);
      setAiResponse(response);
      setIsLoading(false); // Stop loading
      // You can display this suggestion in the UI or handle it as needed
    } catch (error) {
      alert("Failed to fetch AI suggestions. Please try again.");
    }
  };



  const openShareDialog = () => {
    if (editorContent.trim() === "") {
      alert("The editor is empty. Please add some code before sharing.");
      return;
    }
    setIsShareDialogOpen(true);
  };

  const downloadMemoryMapAsPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Courier", "normal");
    doc.setFontSize(12);
    doc.text(memoryMapContent, 10, 10);
    doc.save("memory-map.pdf");
  };

  useEffect(() => {
    // Simulate loading for initial state (could be an actual API call)
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds or when data is ready
    }, 2000); // Adjust time as needed
    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);
  const onClickHandler = async () => {
    setIsLoading(true); // Start loading state
    await handleGetSuggestions(); // Execute the passed function
    setIsLoading(false); // Stop loading state once the function is complete
  };






  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">Write and execute your code</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>



            {/* Memory Map Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMemoryMapConversion}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Convert to Memory Map"
            >
              <MapIcon className="size-4 text-gray-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openShareDialog}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r ${editorContent.trim() === ""
                ? "from-gray-500 to-gray-600 cursor-not-allowed opacity-50"
                : "from-blue-500 to-blue-600 opacity-90 hover:opacity-100"
                } transition-opacity`}
              disabled={editorContent.trim() === ""}
            >
              <ShareIcon className="size-4 text-white" />
              <span className="text-sm font-medium text-white">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Editor */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
              }}
            />
          )}

          {!clerk.loaded && <EditorPanelSkeleton />}
          {/* AI Suggestions Button */}
          {/* AI Suggestions Button */}
          <motion.button
            onClick={onClickHandler}
            className="flex items-center justify-center p-2 mt-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-md transition-all duration-300"
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

        </div>
        {/* AI Suggestions Modal */}
        {aiResponse && (
          <Modal onClose={() => setAiResponse("")}>
            <div className="w-full max-w-3xl overflow-y-auto max-h-[80vh]">
              <h2 className="text-lg font-bold mb-4">AI Suggestions</h2>
              <div className="space-y-4">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  aiResponse.split("```").map((block, index) => {
                    if (index % 2 !== 0) {
                      // Render code block
                      return (
                        <SyntaxHighlighter
                          key={index}
                          language={language} // Dynamic language support
                          style={dracula}
                          className="rounded-lg border border-gray-600"
                        >
                          {block.trim()}
                        </SyntaxHighlighter>
                      );
                    }
                    // Render text block
                    return (
                      <p key={index} className="text-sm text-gray-300 leading-relaxed">
                        {block.trim()}
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          </Modal>
        )}


      </div>

      {/* Memory Map Modal */}
      {isMemoryMapOpen && (
        <Modal onClose={() => setIsMemoryMapOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Memory Map</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto max-h-96">
            {memoryMapContent}
          </pre>
          <button
            onClick={downloadMemoryMapAsPDF}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download as PDF
          </button>
        </Modal>
      )}

      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </div>
  );
}

export default EditorPanel;
