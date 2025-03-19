"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  SendHorizonal,
  ChevronLeft,
  Book,
  Lightbulb,
  RefreshCw,
  Info,
  Clock,
  ChevronDown,
  CheckCircle2,
  ChevronUp,
  Bot,
  ChevronRight,
  User,
  Code,
  Rocket,
  BookOpen,
  GraduationCap,
  FileCode,
  Star,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Separator } from './ui/separator';
import { toast } from './ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import ChatMessage, { ChatMessageProps } from './ui/ChatMessage';
import { TutorLanguage } from './ui/LanguageTutorCard';
import { generateGeminiResponse } from '../services/geminiService';
import { start } from 'repl';
import { Input } from './ui/input';

const tutorData: Record<string, TutorLanguage> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: 'yellow',
    description: 'Master JavaScript with interactive lessons and exercises.'
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'blue',
    description: 'Learn TypeScript from basics to advanced type systems.'
  },
  python: {
    id: 'python',
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'blue',
    description: 'Explore Python programming with hands-on exercises.'
  },
  java: {
    id: 'java',
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: 'orange',
    description: 'Understand Java programming concepts with practical examples.'
  },
  go: {
    id: 'go',
    name: 'Go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
    color: 'blue',
    description: 'Learn Go programming with interactive exercises.'
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    color: 'orange',
    description: 'Master Rust programming with hands-on exercises.'
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    color: 'blue',
    description: 'Dive into C++ with practical coding examples.'
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    color: 'purple',
    description: 'Learn C# programming with interactive lessons.'
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    color: 'red',
    description: 'Explore Ruby programming with hands-on exercises.'
  },
  swift: {
    id: 'swift',
    name: 'Swift',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    color: 'orange',
    description: 'Learn Swift programming with interactive lessons.'
  }
};

const conversationStarters = [
  { title: "Explain basic syntax", prompt: "Can you explain the basic syntax in {language}? Include variables, data types, and simple operations." },
  { title: "Control flow concepts", prompt: "How do I use control flow (if/else, loops, switches) in {language}?" },
  { title: "Functions & methods", prompt: "How do I create and use functions in {language}? What are the best practices?" },
  { title: "Data structures", prompt: "Explain the common data structures in {language} and when to use each one." },
  { title: "Object-oriented programming", prompt: "Explain object-oriented programming concepts in {language} with examples." },
  { title: "Error handling", prompt: "What are the best practices for error handling in {language}?" },
  { title: "Advanced topics", prompt: "Tell me about advanced features in {language} like asynchronous programming, generators, etc." },
  { title: "Build a project", prompt: "Help me build a simple todo list application in {language}" }
];

const learningPaths = {
  javascript: [
    {
      title: "Fundamentals",
      topics: [
        "Basic syntax and data types",
        "Variables and constants",
        "Operators and expressions",
        "Control flow: if, else, switch",
        "Loops: for, while, do-while",
        "Functions and scope"
      ]
    },
    {
      title: "Intermediate Concepts",
      topics: [
        "Arrays and array methods",
        "Objects and object methods",
        "DOM manipulation",
        "Event handling",
        "Error handling with try/catch",
        "ES6+ features"
      ]
    },
    {
      title: "Advanced Topics",
      topics: [
        "Asynchronous programming",
        "Promises and async/await",
        "Closures and higher-order functions",
        "Object-oriented patterns",
        "Functional programming concepts",
        "Performance optimization"
      ]
    }
  ],
  default: [
    {
      title: "Fundamentals",
      topics: [
        "Basic syntax and data types",
        "Variables and operations",
        "Control flow structures",
        "Loops and iterations",
        "Functions and parameters",
        "Basic error handling"
      ]
    },
    {
      title: "Intermediate Concepts",
      topics: [
        "Data structures",
        "Object-oriented programming",
        "File I/O operations",
        "Error handling and exceptions",
        "Modules and packages",
        "Standard libraries"
      ]
    },
    {
      title: "Advanced Topics",
      topics: [
        "Concurrency and parallelism",
        "Memory management",
        "Design patterns",
        "Testing and debugging",
        "Performance optimization",
        "Advanced language features"
      ]
    }
  ]
};

const getLearningPath = (languageId: string) => {
  return learningPaths[languageId as keyof typeof learningPaths] || learningPaths.default;
};

interface ChatHistoryItem {
  id: string;
  language: string;
  preview: string;
  timestamp: Date;
  messages: ChatMessageProps[];
}

const TutorChat: React.FC = () => {
  const { languageId } = useParams<{ languageId: string }>();
  const [tutor, setTutor] = useState<TutorLanguage | null>(null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStartingNewChat, setIsStartingNewChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState('');
  const [fullResponse, setFullResponse] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    if (languageId) {
      setTutor(tutorData[languageId]);
      loadChatHistory(languageId);
      loadAllChatHistory();
    }
  }, [languageId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  useEffect(() => {
    if (languageId && messages.length > 0) {
      saveChatHistory(languageId, messages);
    }
  }, [messages, languageId]);


  




  useEffect(() => {
    if (!isTypingComplete && fullResponse) {
      const intervalId = setInterval(() => {
        if (currentMessageIndex < fullResponse.length) {
          setTypingText(fullResponse.substring(0, currentMessageIndex + 10));
          setCurrentMessageIndex(prev => prev + 10);
        } else {
          setIsTypingComplete(true);
          setTypingText('');

          const aiMessage: ChatMessageProps = {
            content: fullResponse,
            role: 'assistant',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);
        }
      }, 1000 / typingSpeed);

      return () => clearInterval(intervalId);
    }
  }, [fullResponse, currentMessageIndex, isTypingComplete]);


  

  const loadChatHistory = (languageId: string) => {
    try {
      const savedChat = localStorage.getItem(`chat_history_${languageId}`);

      if (savedChat) {
        const parsedChat = JSON.parse(savedChat);

        const restoredMessages = parsedChat.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));

        setMessages(restoredMessages);
        sonnerToast.success('Chat history loaded');
      } else {
        const welcomeMessage: ChatMessageProps = {
          content: `Welcome to the ${tutorData[languageId].name} learning session! I'm your AI tutor specialized in ${tutorData[languageId].name} programming. How can I help you today?`,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      sonnerToast.error('Failed to load chat history');

      const welcomeMessage: ChatMessageProps = {
        content: `Welcome to the ${tutorData[languageId].name} learning session! I'm your AI tutor specialized in ${tutorData[languageId].name} programming. How can I help you today?`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const loadAllChatHistory = () => {
    const history: ChatHistoryItem[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_history_')) {
        try {
          const languageId = key.replace('chat_history_', '');
          const storedChat = localStorage.getItem(key);

          if (storedChat) {
            const parsedChat = JSON.parse(storedChat);

            const lastUserMessage = [...parsedChat].reverse().find((msg: any) => msg.role === 'user');
            const firstAssistantMessage = parsedChat.find((msg: any) => msg.role === 'assistant');

            const chatItem: ChatHistoryItem = {
              id: languageId,
              language: tutorData[languageId]?.name || languageId,
              preview: lastUserMessage?.content.substring(0, 50) + '...' || 'New conversation',
              timestamp: new Date(parsedChat[parsedChat.length - 1]?.timestamp || new Date()),
              messages: parsedChat.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
              }))
            };

            history.push(chatItem);
          }
        } catch (error) {
          console.error('Error loading chat history item:', error);
        }
      }
    }

    history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setChatHistory(history);
  };

  const saveChatHistory = (languageId: string, chatMessages: ChatMessageProps[]) => {
    try {
      localStorage.setItem(`chat_history_${languageId}`, JSON.stringify(chatMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
      sonnerToast.error('Failed to save chat history');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || !tutor) return;

    const userMessage: ChatMessageProps = {
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setIsTyping(true);
    setIsTypingComplete(false);
    setCurrentMessageIndex(0);
    setTypingText('');

    try {
      const response = await generateGeminiResponse([...messages, userMessage], tutor.name);
      setFullResponse(response);

    } catch (error) {
      console.error('Error getting AI response:', error);
      sonnerToast.error('Failed to get AI response', {
        description: 'Please try again later.',
      });
      setIsTyping(false);
      setIsTypingComplete(true);
    }
  };

  const startNewChat = () => {
    setIsStartingNewChat(true);

    setTimeout(() => {
      if (tutor) {
        const welcomeMessage: ChatMessageProps = {
          content: `Welcome to a new ${tutor.name} learning session! How can I help you today?`,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        setIsStartingNewChat(false);
        sonnerToast.success('Started a new chat session');
      }
    }, 500);
  };

  const handleStarterPrompt = (prompt: string) => {
    const formattedPrompt = prompt.replace('{language}', tutor?.name || '');
    setInputMessage(formattedPrompt);
  };

  const loadPreviousChat = (chatItem: ChatHistoryItem) => {
    if (chatItem.id === languageId) {
      setMessages(chatItem.messages);
      setShowChatHistory(false);
      sonnerToast.success('Previous chat loaded');
    } else {
      window.location.href = `/tutor/${chatItem.id}`;
    }
  };

  

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d]">
        <div className="animate-pulse text-gray-400">Loading tutor...</div>
      </div>
    );
  }

  const learningPath = getLearningPath(languageId || 'default');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#1a1a2e]">
      <header className="fixed top-0 left-0 right-0 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/ai-teachers"
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 p-1.5 flex items-center justify-center">
                <img
                  src={tutor.logo}
                  alt={tutor.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-medium text-white">{tutor.name} Tutor</h1>
                <p className="text-xs text-gray-400">AI-powered learning</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowChatHistory(!showChatHistory)}
            >
              <Clock className="w-4 h-4 mr-1" />
              History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={startNewChat}
              disabled={isStartingNewChat}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isStartingNewChat ? 'animate-spin' : ''}`} />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      {showChatHistory && (
        <div className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4" onClick={() => setShowChatHistory(false)}>
          <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-medium text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Chat History
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => setShowChatHistory(false)}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {chatHistory.length > 0 ? (
                <div className="space-y-2">
                  {chatHistory.map((chat) => (
                    <button
                      key={`${chat.id}-${chat.timestamp.getTime()}`}
                      className="w-full text-left p-3 rounded-lg bg-[#252538] hover:bg-[#2d2d45] border border-gray-800 transition-colors"
                      onClick={() => loadPreviousChat(chat)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={tutorData[chat.id]?.logo}
                          alt={chat.language}
                          className="w-5 h-5"
                        />
                        <span className="text-sm font-medium text-white">{chat.language}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {chat.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{chat.preview}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No previous chats found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pt-16 pb-20 min-h-screen flex">
        <div className="flex-1 flex flex-col h-[calc(100vh-96px)]">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <div className="border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4">
                <TabsList className="bg-transparent border-b-0 p-0 h-12">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-12">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="learn" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-12">
                    Learn
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col pt-4 m-0 overflow-hidden">
              <div className="max-w-4xl mx-auto w-full px-4 flex-1 flex flex-col overflow-hidden">
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 pb-4">
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      content={msg.content}
                      role={msg.role}
                      timestamp={msg.timestamp}
                    />
                  ))}

                  {!isTypingComplete && typingText && (
                    <div className="flex gap-4 p-4 rounded-lg bg-[#1e1e2e]/50 border border-gray-800">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                          <Bot className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-purple-400">
                            AI Tutor
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="prose prose-sm prose-invert max-w-none">
                          <div className="text-sm text-gray-300 leading-relaxed">
                            {typingText}
                            <span className="animate-pulse">|</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isTyping && !typingText && (
                    <div className="flex gap-4 p-4 rounded-lg bg-[#1e1e2e]/50 border border-gray-800 animate-pulse">
                      <div>
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                          <Bot className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0f1d] py-4 z-50">
                  <div className="relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={`Ask something about ${tutor.name}...`}
                      className="w-full p-4 pr-12 rounded-xl bg-[#131520] border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-200 placeholder:text-gray-500 min-h-[100px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="absolute right-4 bottom-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!inputMessage.trim()}
                    >
                      <SendHorizonal className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

              </div>
            </TabsContent>

            <TabsContent value="learn" className=" m-0 pt-4 overflow-auto">
              <div className="max-w-4xl mx-auto w-full px-4 pb-8">
                <div className="bg-gradient-to-r from-[#131520] to-[#151b2e] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                  <div className="p-6 border-b border-gray-800 bg-[#0c101e]/80">
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                      {tutor.name} Learning Path
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Follow this structured learning path to master {tutor.name} programming from basics to advanced concepts.
                      Each section builds on the previous one to help you progress systematically.
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-8">
                      {learningPath.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="relative">
                          {sectionIndex < learningPath.length - 1 && (
                            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
                          )}

                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/20">
                              {sectionIndex + 1}
                            </div>
                            <h3 className="text-lg font-bold text-white">
                              {section.title}
                            </h3>
                          </div>

                          <div className="ml-16 grid gap-3 sm:grid-cols-2">
                            {section.topics.map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="bg-[#1a1f2e] hover:bg-[#232838] border border-gray-800 rounded-lg p-4 transition-all duration-200 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5"
                              >
                                <div className="flex items-start gap-3 mb-2">
                                  <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-medium">
                                    {topicIndex + 1}
                                  </div>
                                  <div className="flex-1">
                                    <button
                                      className="text-left text-gray-200 hover:text-white text-sm font-medium group"
                                      onClick={() => {
                                        setInputMessage(`Explain ${topic} in ${tutor.name}`);
                                        document.querySelector('[value="chat"]')?.dispatchEvent(
                                          new MouseEvent('click', { bubbles: true })
                                        );
                                      }}
                                    >
                                      {topic}
                                      <span className="text-blue-400 group-hover:ml-1 transition-all duration-200">→</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-3">
                                  <button
                                    className="text-left text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1 hover:bg-blue-500/10 p-1.5 rounded-md transition-colors"
                                    onClick={() => {
                                      setInputMessage(`Explain ${topic} in ${tutor.name} with simple examples`);
                                      document.querySelector('[value="chat"]')?.dispatchEvent(
                                        new MouseEvent('click', { bubbles: true })
                                      );
                                    }}
                                  >
                                    <Code className="w-3.5 h-3.5" />
                                    Examples
                                  </button>
                                  <button
                                    className="text-left text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1 hover:bg-blue-500/10 p-1.5 rounded-md transition-colors"
                                    onClick={() => {
                                      setInputMessage(`Give me a practice exercise about ${topic} in ${tutor.name}`);
                                      document.querySelector('[value="chat"]')?.dispatchEvent(
                                        new MouseEvent('click', { bubbles: true })
                                      );
                                    }}
                                  >
                                    <FileCode className="w-3.5 h-3.5" />
                                    Practice
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-green-500/20">
                            <Rocket className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white">
                            Projects to Build
                          </h3>
                        </div>

                        <div className="ml-16">
                          <p className="text-sm text-gray-400 mb-4">
                            Apply what you've learned by building these projects with guidance from your AI tutor.
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#1e2333] border border-gray-800 hover:border-green-500/30 rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-green-500/10 group">
                              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                              <button
                                className="p-4 text-left w-full h-full"
                                onClick={() => {
                                  setInputMessage(`Help me build a todo list application in ${tutor.name}. Let's start with the basic structure.`);
                                  document.querySelector('[value="chat"]')?.dispatchEvent(
                                    new MouseEvent('click', { bubbles: true })
                                  );
                                }}
                              >
                                <h4 className="font-medium text-white mb-1 group-hover:text-green-400 transition-colors flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Todo List App
                                </h4>
                                <p className="text-xs text-gray-400">Build a todo application with add, delete, and complete functionality</p>
                              </button>
                            </div>

                            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#1e2333] border border-gray-800 hover:border-blue-500/30 rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group">
                              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                              <button
                                className="p-4 text-left w-full h-full"
                                onClick={() => {
                                  setInputMessage(`Help me build a calculator in ${tutor.name}. Let's start with the basic structure.`);
                                  document.querySelector('[value="chat"]')?.dispatchEvent(
                                    new MouseEvent('click', { bubbles: true })
                                  );
                                }}
                              >
                                <h4 className="font-medium text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                  <Zap className="w-4 h-4" />
                                  Calculator
                                </h4>
                                <p className="text-xs text-gray-400">Create a calculator with basic arithmetic operations</p>
                              </button>
                            </div>

                            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#1e2333] border border-gray-800 hover:border-purple-500/30 rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 group">
                              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                              <button
                                className="p-4 text-left w-full h-full"
                                onClick={() => {
                                  setInputMessage(`Help me build a weather app in ${tutor.name} that fetches data from an API.`);
                                  document.querySelector('[value="chat"]')?.dispatchEvent(
                                    new MouseEvent('click', { bubbles: true })
                                  );
                                }}
                              >
                                <h4 className="font-medium text-white mb-1 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                                  <Info className="w-4 h-4" />
                                  Weather App
                                </h4>
                                <p className="text-xs text-gray-400">Build an app that fetches and displays weather data</p>
                              </button>
                            </div>

                            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#1e2333] border border-gray-800 hover:border-yellow-500/30 rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/10 group">
                              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                              <button
                                className="p-4 text-left w-full h-full"
                                onClick={() => {
                                  setInputMessage(`Help me build a quiz application in ${tutor.name}.`);
                                  document.querySelector('[value="chat"]')?.dispatchEvent(
                                    new MouseEvent('click', { bubbles: true })
                                  );
                                }}
                              >
                                <h4 className="font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                                  <Star className="w-4 h-4" />
                                  Quiz App
                                </h4>
                                <p className="text-xs text-gray-400">Create an interactive quiz with scoring system</p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className=" sticky hidden lg:block w-64 max-h-screen p-4 border-l border-gray-800">
          <div className="sticky top-20">
            <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Conversation Starters
            </h3>
            <div className="space-y-2">
              {conversationStarters.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterPrompt(starter.prompt)}
                  className="w-full p-2 text-left text-xs text-gray-400 hover:text-white bg-[#1a1a2e] hover:bg-[#252538] rounded-lg border border-gray-800 transition-colors"
                >
                  {starter.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorChat;
