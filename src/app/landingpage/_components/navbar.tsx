
import { ChartNetwork } from 'lucide-react';
import { navLinks } from '../../(root)/_constants/nav-links'

import Link from 'next/link';

export function Navbar() {
  return (
    <div className="bg-[#0a0f1d] px-7">
      <div className="container justify-between  sm:flex">
        <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-4 group relative">
            {/* Glow effect */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-lg opacity-0 
                group-hover:opacity-100 transition-opacity duration-700 blur-lg"
            />
            {/* Logo */}
            <div
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] p-3 rounded-2xl ring-1
              ring-gray-800 group-hover:ring-blue-400 transition-all duration-500"
            >
              <ChartNetwork
                className="size-6 text-blue-400 group-hover:text-purple-400 
                transform group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
            {/* Title and Subtitle */}
            <div className="flex flex-col">
              <span
                className="block text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent 
                bg-clip-text group-hover:scale-105 transition-transform duration-500"
              >
                CodeOrbital
              </span>
              <span
                className="block text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors"
              >
                Interactive Code Editor
              </span>
            </div>
          </Link>
        </div>
        <nav className="bg-bl hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-opacity-60 transition hover:text-opacity-100"
            >
              {link.title}
            </a>
          ))}
          <button className="rounded-lg text-black bg-white px-4 py-2">
            Get for free
          </button>
        </nav>
      </div>
    </div>
  )
}