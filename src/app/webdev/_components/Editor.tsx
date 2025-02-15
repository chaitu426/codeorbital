"use client";

import React from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";

interface EditorProps {
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
  className?: string;
}


const Editor: React.FC<EditorProps> = ({ language, value, onChange, className }) => {
  return (
    <div className={`h-full ${className} `}>
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
        }}
      />
    </div>
    
  );
};

export default Editor;
