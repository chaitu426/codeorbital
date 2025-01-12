import Link from 'next/link'
import {  Instagram, Linkedin, Github } from 'lucide-react'

const socialLinks = [
  
  
  { icon: Instagram, href: 'https://www.instagram.com/chaitanyaabhade?igsh=MTVkMXFyc2N6Z3h4dQ==' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/chaitanya-abhade-b23080321/' },
  { icon: Github, href: 'https://github.com/chaitu426' },
]

export function Footer() {
  return (
    <footer className='bg-[#231814]'>
      <div className="max-w-full mx-auto px-8 py-6">
        <div className="relative">
          {/* Top and Bottom Gradient Lines */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#3174f1]/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#2e284e]/50 to-transparent" />

          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3174f1]/30 to-[#2e284e]/30 blur-3xl opacity-20" />

          {/* Footer Content */}
          <div className="relative bg-[#0a0a0f]/80 border border-[#2e284e]/50 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white text-sm">
                © 2025 CodeOrbital . All rights reserved.
              </div>
              <nav className="flex gap-4">
                <Link href="#" className="text-white hover:text-[#3174f1] transition-colors duration-200 text-sm">
                  Terms
                </Link>
                <Link href="#" className="text-white hover:text-[#3174f1] transition-colors duration-200 text-sm">
                  Privacy
                </Link>
                <Link href="#" className="text-white hover:text-[#3174f1] transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </nav>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href }) => (
                  <Link key={href} href={href} className="text-white hover:text-[#3174f1] transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
