import React from "react";
import clsx from "clsx";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  timestamp: Date | string;
}

// Define CodeProps properly
interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, role, timestamp }) => {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "flex gap-4 p-4 rounded-lg animate-fade-in",
        isUser ? "bg-blue-500/5 border border-blue-500/10" : "bg-[#1e1e2e]/50 border border-gray-800"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isUser ? "bg-blue-500 text-white" : "bg-purple-500/20 border border-purple-500/30 text-purple-300"
          )}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className={clsx("text-sm font-medium", isUser ? "text-blue-400" : "text-purple-400")}>
            {isUser ? "You" : "AI Tutor"}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="prose prose-sm prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code: ({ inline, className = "", children, ...props }: CodeProps) => {
                const match = /language-(\w+)/.exec(className || "");
                return inline ? (
                  <code className="px-1 py-0.5 rounded bg-gray-800 text-gray-200 text-xs" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="bg-gray-900 rounded-md my-4 overflow-hidden">
                    <div className="px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
                      <div className="text-xs text-gray-400">{match ? match[1] : "plaintext"}</div>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className={`${match ? `language-${match[1]}` : ""} text-xs`} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
              p: ({ children }) => {
                if (typeof children === "string") {
                  return <p className="mb-4 leading-relaxed">{children}</p>;
                }
                return <div className="mb-4 leading-relaxed">{children}</div>; // Prevents <p> wrapping <div>
              },
              
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-xl font-bold mb-4 mt-6 text-white">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-5 text-white">{children}</h2>,
              h3: ({ children }) => <h3 className="text-md font-bold mb-2 mt-4 text-white">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-1 mb-4 italic text-gray-400">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
