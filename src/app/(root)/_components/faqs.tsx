"use client"
import { useState } from 'react'

import { faqsList } from '../_constants/faqs-list'
import { AccordionFAQItem } from './accordion-faq-item'

export function Faqs() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  return (
    <div className="bg-black bg-gradient-to-b from-black to-[#231916] py-[72px] text-white px-10 sm:py-24">
      <div className="container">
        <h2 className="mx-auto text-center text-5xl font-bold tracking-tighter sm:max-w-[648px] sm:text-6xl">
          Frequently asked question
        </h2>
        <div className="mx-auto mt-12 max-w-[648px]">
          {faqsList.map((faq) => (
            <AccordionFAQItem
              key={faq.id}
              fqaItem={faq}
              isOpen={openFaqId === faq.id}
              onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}