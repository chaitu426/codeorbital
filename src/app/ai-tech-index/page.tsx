"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { 
  Code, 
  ChevronRight, 
  BookOpen, 
  Puzzle, 
  Users, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ai-teachers/components/ui/button';
import NavigationHeader from '@/components/NavigationHeader';

const Index: React.FC = () => {
  const router = useRouter();
  
  const featuredLanguages = [
    { id: 'javascript', name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { id: 'typescript', name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { id: 'python', name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { id: 'java', name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { id: 'rust', name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#231814]">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-full h-full bg-mesh-pattern opacity-20" />
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-60 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
            >
              <BookOpen className="w-4 h-4" />
              AI-Powered Learning
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-6 leading-tight"
            >
              Master Coding with AI Teachers
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-8"
            >
              Learn programming languages through interactive AI-driven conversations and real-time coding practice
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                onClick={() => router.push('/ai-teachers')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-8 py-6 h-12"
              >
                Explore AI Teachers
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600 px-8 py-6 h-12"
              >
                How It Works
              </Button>
            </motion.div>
          </div>
          
          {/* Featured Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />
              <span className="text-sm text-gray-500">Featured Languages</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {featuredLanguages.map((lang, index) => (
                <motion.div
                  key={lang.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#131520] border border-gray-800 p-3 flex items-center justify-center hover:bg-[#1a1d2a] hover:border-gray-700 transition-colors">
                    <img
                      src={lang.logo}
                      alt={lang.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs text-gray-400">{lang.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-4">
              A New Way to Learn Programming
            </h2>
            <p className="text-gray-400">
              Experience the future of coding education with AI tutors that adapt to your learning style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#131520] border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Learn through dynamic conversations with AI tutors that understand your questions and provide personalized explanations.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <ul className="space-y-2">
                  {['Personalized curriculum', 'Adaptive teaching', 'Immediate feedback'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#131520] border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Live Code Environment</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Practice coding in a fully-integrated development environment with real-time execution and syntax highlighting.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <ul className="space-y-2">
                  {['Run code in-browser', 'Syntax highlighting', 'Code debugging'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#131520] border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 flex items-center justify-center mb-4">
                <Puzzle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Project-Based Learning</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Build real-world projects with guidance from AI tutors, helping you apply concepts to practical scenarios.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <ul className="space-y-2">
                  {['Hands-on projects', 'Real-world applications', 'Portfolio building'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button
              onClick={() => router.push('/ai-teachers')}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/5"
            >
              Explore All Features
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#131520]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to start your coding journey?
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Choose from our library of AI tutors and begin learning at your own pace, with personalized guidance every step of the way.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    onClick={() => router.push('/ai-teachers')}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-8"
                  >
                    Get Started Now
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-700 bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800/50 hover:border-gray-600 px-8"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
