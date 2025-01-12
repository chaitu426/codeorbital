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
import { jsPDF } from "jspdf";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isMemoryMapOpen, setIsMemoryMapOpen] = useState(false);
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
        .map((line: string | any[], idx: number) => {
          return `Line ${idx + 1}: ${line.length} bytes`; // Line size in bytes
        })
        .join("\n")}\n\nTime Complexity: ${timeComplexity}\nSpace Complexity: ${spaceComplexity}`;
      
  
      // Update the memory map content
      setMemoryMapContent(memoryMap);
      setIsMemoryMapOpen(true);
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
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r ${
                editorContent.trim() === ""
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
        </div>
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
