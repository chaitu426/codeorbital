import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";

const getInitialState = () => {
  // if we're on the server, return default values
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // if we're on the client, return values from local storage bc localStorage is a browser API.
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        let userInput = "";

        // Simple heuristic to check if input is likely required
        const requiresInput =
          code.includes("cin") ||          // C++
          code.includes("scanf") ||        // C
          code.includes("fmt.Scan") ||     // Go
          code.includes("input") ||        // Python
          code.includes("readLine") ||     // Kotlin, JavaScript (Node.js), Swift
          code.includes("next") ||         // Java (Scanner)
          code.includes("gets") ||         // Ruby
          code.includes("read_line") ||    // Rust, Haskell
          code.includes("fgets") ||        // PHP
          code.includes("Console.ReadLine") ||  // C#
          code.includes("read -p") ||       // Bash
          code.includes("<STDIN>") ||       // Perl
          code.includes("scala.io.StdIn.readLine") || // Scala
          code.includes("stdin.readLineSync") || // Dart
          code.includes("readline") ||      // Julia, Node.js
          code.includes("io.read") ||       // Lua
          code.includes("IO.gets") ||       // Elixir
          code.includes("io:get_line");     // Erlang


        if (requiresInput) {
          userInput = prompt("Enter the input values for your code (separate by spaces if multiple):") || "";
        }

        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
            stdin: userInput, // Include user input in the execution request
          }),
        });

        const data = await response.json();

        if (data.message) {
          set({ error: data.message, executionResult: { code, output: "", error: data.message } });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }

        const output = data.run.output;

        set({
          output: output.trim(),
          error: null,
          executionResult: { code, output: output.trim(), error: null },
        });

      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },


  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
