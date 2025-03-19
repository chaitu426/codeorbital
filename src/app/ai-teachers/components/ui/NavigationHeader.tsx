"use client"
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight,
  Laptop,
  BookOpen,
  MessageSquare,
  Github
} from 'lucide-react';
import { cn } from '../../../../../libs/utils';
import { Button } from './button';

const NavigationHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Teachers', path: '/ai-teachers' },
    { name: 'Resources', path: '/resources' },
    { name: 'Community', path: '/community' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "bg-[#0a0f1d]/80 py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg transition-transform group-hover:scale-110 duration-300">
            <Laptop className="w-5 h-5 text-white absolute transform transition-all duration-500 group-hover:scale-0 group-hover:opacity-0" />
            <BookOpen className="w-5 h-5 text-white absolute transform scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            CodeOrbital
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 text-sm rounded-lg transition-all duration-200",
                location.pathname === link.path
                  ? "text-blue-400 bg-blue-500/10 font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700 hover:bg-white/5 hover:text-white hover:border-gray-600">
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium transition-all"
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-300 rounded-lg"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0f1d]/95 backdrop-blur-md border-t border-gray-800 animate-fade-in">
          <div className="py-3 px-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-all duration-200",
                  location.pathname === link.path
                    ? "text-blue-400 bg-blue-500/10 font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-800 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-gray-300 border-gray-700 hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
