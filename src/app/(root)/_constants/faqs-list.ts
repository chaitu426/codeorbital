export interface FaqItem {
    id: string
    question: string
    answer: string
  }
  
  export const faqsList: FaqItem[] = [
    {
      id: '1',
      question:  'What programming languages does the platform support?',
      answer:
        'Our editor supports all major programming languages, including Rust, Go, Swift, and more. Additionally, it offers specialized features for web development with an integrated HTML, CSS, and JavaScript editor.',
    },
    {
      id: '2',
      question: 'Can I share my code snippets with others?',
      answer:
        'Absolutely! You can share your snippets with the community and even sort them by language or specific categories like "Web Development" for easy discovery.',
    },
    {
      id: '3',
      question: 'Does the platform provide a live preview for web development?',
      answer:
        'Yes, our platform features a live preview option for web development code. See real-time updates both within the editor and in your browser.',
    },
    {
      id: '4',
      question: 'Can I customize the look and feel of the editor?',
      answer:
        'Yes, the editor includes theming options that let you create and share custom themes to suit your style and enhance productivity.',
    },
  ]