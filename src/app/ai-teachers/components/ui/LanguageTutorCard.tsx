"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { MessageSquare, Code, ArrowRight } from 'lucide-react';
import { cn } from '../../../../../libs/utils';

export interface TutorLanguage {
  id: string;
  name: string;
  logo: string;
  color: string;
  description: string;
}

interface LanguageTutorCardProps {
  language: TutorLanguage;
  index: number;
}

const LanguageTutorCard: React.FC<LanguageTutorCardProps> = ({ language, index }) => {
  const router = useRouter();
  
  const handleSelectTutor = () => {
    router.push(`/ai-tech-chat/${language.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl"
    >
      {/* Background Glow Effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-xl",
          `bg-${language.color}-500`
        )}
      />

      {/* Card Content */}
      <div className="relative border border-gray-800 rounded-xl p-6 bg-[#131520] group-hover:bg-[#191c2a] transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Logo and Title Area */}
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            `bg-${language.color}-500/10 text-${language.color}-400 border border-transparent`
          )}>
            <img
              src={language.logo}
              alt={language.name}
              className="w-7 h-7 object-contain "
            />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{language.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Code className="w-3.5 h-3.5" />
              <span>{language.name} Tutor</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {language.description}
        </p>

        {/* Shimmer Effect Line */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent translate-y-32 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Action Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleSelectTutor}
            className={cn(
              "w-full py-2.5 px-4 rounded-lg flex items-center justify-between text-sm font-medium transition-all duration-300",
              `text-${language.color}-400 hover:text-white bg-${language.color}-500/10 hover:bg-${language.color}-500 group-hover:shadow-lg`,
              `group-hover:shadow-${language.color}-500/20`
            )}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Start Learning
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageTutorCard;
