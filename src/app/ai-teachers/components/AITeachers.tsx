"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Rocket, Brain, Code2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import NavigationHeader from '@/components/NavigationHeader';
import LanguageTutorCard, { TutorLanguage } from './ui/LanguageTutorCard';

const tutors: TutorLanguage[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: 'yellow',
    description: 'Master JavaScript fundamentals, advanced concepts, and modern frameworks with interactive coding exercises and real-time feedback.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'blue',
    description: 'Learn TypeScript from basics to advanced type systems. Get hands-on practice with type annotations, interfaces, and generics.'
  },
  {
    id: 'python',
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'blue',
    description: 'Explore Python programming with lessons covering data structures, algorithms, and popular libraries like NumPy and Pandas.'
  },
  {
    id: 'java',
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: 'orange',
    description: 'Understand Java programming concepts including object-oriented design, inheritance, polymorphism, and enterprise applications.'
  },
  {
    id: 'go',
    name: 'Go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
    color: 'blue',
    description: 'Learn Go programming with a focus on concurrency, efficient memory management, and building robust web services and APIs.'
  },
  {
    id: 'rust',
    name: 'Rust',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    color: 'orange',
    description: 'Master Rust programming with lessons on memory safety, ownership, and building high-performance, reliable software systems.'
  },
  {
    id: 'cpp',
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    color: 'blue',
    description: 'Dive into C++ with in-depth lessons on object-oriented programming, memory management, and performance optimization.'
  },
  {
    id: 'csharp',
    name: 'C#',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    color: 'purple',
    description: 'Learn C# programming with practical exercises covering .NET framework, LINQ, and building modern applications.'
  },
  {
    id: 'ruby',
    name: 'Ruby',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    color: 'red',
    description: 'Explore Ruby programming with a focus on elegant syntax, object-oriented design, and Ruby on Rails web development.'
  },
  {
    id: 'swift',
    name: 'Swift',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    color: 'orange',
    description: 'Learn Swift programming for iOS and macOS development, covering UI design, app architecture, and Swift language features.'
  }
];

const AITeachers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#231814]">
      <NavigationHeader />
      
      <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-20">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-60 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
        </div>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
          >
            Learn with AI Teachers
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-8"
          >
            Select a programming language tutor for personalized, interactive learning with real-time code execution and feedback
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-6 py-2 h-auto"
            >
              Explore All Tutors
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600 px-6 py-2 h-auto"
            >
              How It Works
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#131520] border border-gray-800 rounded-xl p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Personalized Learning</h3>
            <p className="text-gray-400 text-sm">
              AI tutors adapt to your learning pace and style, providing customized explanations and exercises.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#131520] border border-gray-800 rounded-xl p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Interactive Coding</h3>
            <p className="text-gray-400 text-sm">
              Write and run code directly in the browser with real-time feedback and debugging assistance.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#131520] border border-gray-800 rounded-xl p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Project-Based Learning</h3>
            <p className="text-gray-400 text-sm">
              Build real projects with guidance from your AI tutor, applying concepts to practical scenarios.
            </p>
          </motion.div>
        </div>
        
        {/* AI Tutors Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Choose Your AI Tutor</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor, index) => (
              <LanguageTutorCard
                key={tutor.id}
                language={tutor}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITeachers;
