"use client"

import { useState } from "react"
import Image from "next/image"
import { Command, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
const faqItems = [
  {
    question: "What programming languages does the platform support?",
    answer: "Our editor supports all major programming languages, including Rust, Go, Swift, and more. Additionally, it offers specialized features for web development with an integrated HTML, CSS, and JavaScript editor.",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    question: "Can I share my code snippets with others?",
    answer: `Absolutely! You can share your snippets with the community and even sort them by language or specific categories like "Web Development" for easy discovery.`,
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    question: "Does the platform provide a live preview for web development?",
    answer: "Yes, our platform features a live preview option for web development code. See real-time updates both within the editor and in your browser.",
    image: "/placeholder.svg?height=200&width=300"
  }
]

 function ModernFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0f1d] to-[#231814] min-h-screen flex items-center justify-center px-6 py-12">
      <div className="relative max-w-3xl w-full mx-auto">
        {/* Top and Bottom Gradient Lines */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#3174f1] to-transparent" />
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#2e284e] to-transparent" />

        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#3174f1]/30 to-[#2e284e]/30 blur-3xl opacity-20" />

        {/* Card */}
        <div className="relative bg-[#0a0a0f]/80 border border-[#2e284e]/50 backdrop-blur-xl rounded-3xl p-10 shadow-lg">
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3174f1]/[0.05] to-[#2e284e]/[0.05] rounded-3xl pointer-events-none" />

          <div className="relative">
            {/* Icon Section */}
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#2e284e]/10 to-[#3174f1]/10 mb-6 ring-1 ring-[#2e284e]/50">
              <Command className="w-8 h-8 text-[#3174f1]" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>

            {/* Custom FAQ Items */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="rounded-xl overflow-hidden border border-[#2e284e]/50 bg-gradient-to-r from-[#3174f1]/10 to-[#2e284e]/10"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-white hover:text-[#3174f1] transition-colors duration-200"
                  >
                    <span className="text-left font-medium">{item.question}</span>
                    {openItem === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0" />
                    )}
                  </button>
                  {openItem === index && (
                    <div className="px-6 pb-4 pt-2">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="flex-1">
                          <p className="text-[#2e284e] mb-4">{item.answer}</p>
                          <button className="inline-flex items-center text-[#3174f1] hover:text-[#3174f1]/80 transition-colors duration-200">
                            Learn more <ArrowRight className="ml-2 w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-full md:w-auto">
                          <Image
                            src={item.image}
                            width={300}
                            height={200}
                            alt="FAQ illustration"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernFAQ;
