'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import AuthorByline from './AuthorByline'

const faqs = [
  {
    question: 'What is AI automation for small businesses?',
    answer: 'AI automation for small businesses uses artificial intelligence to handle repetitive administrative tasks that would otherwise require manual effort. This includes answering phone calls, sending invoices, chasing payments, managing customer data, and processing documents. The goal is to free up business owners and staff to focus on revenue-generating work rather than admin.',
  },
  {
    question: 'What types of businesses benefit from AI automation?',
    answer: 'AI automation benefits most service-based businesses that deal with customer enquiries, scheduling, invoicing, and documentation. We work with trades and construction (electricians, plumbers, roofers), professional services (accountants, solicitors), and hospitality and care sectors (restaurants, veterinary practices). Any business spending significant time on repetitive admin tasks can benefit.',
  },
  {
    question: 'How long does it take to implement AI automation?',
    answer: 'Our standard implementation takes around four weeks. Week one involves an audit and discovery process to map your current workflows. Weeks two and three focus on building and integrating the AI systems. Week four is for launch, staff training, and initial monitoring. After that, we provide ongoing support and optimisation.',
  },
  {
    question: 'Is AI automation GDPR compliant?',
    answer: 'Yes. We are a UK-based company and all our solutions are designed to be fully GDPR compliant. Customer data is handled securely, and we ensure all AI systems meet UK data protection requirements. We can provide documentation of our compliance measures during the discovery process.',
  },
  {
    question: 'Do I need technical knowledge to use AI automation?',
    answer: 'No technical knowledge is required. Our systems are designed to work in the background without requiring you to manage them. We handle all the technical setup, integration with your existing tools, and ongoing maintenance. You simply use your business as normal while the AI handles the admin tasks.',
  },
  {
    question: 'What is an AI voice receptionist?',
    answer: 'An AI voice receptionist is an automated phone system that can answer calls, understand what callers need, qualify leads, book appointments, and take messages - 24 hours a day, 7 days a week. Unlike traditional voicemail, it has a natural conversation with callers and can handle common enquiries without human intervention.',
  },
  {
    question: 'How much does AI automation cost?',
    answer: 'Costs vary depending on the complexity of your requirements and which solutions you need. We offer a free initial audit with no obligation, where we assess your business processes and provide a clear quote. There are no long-term contracts - you can see exactly what you will be paying before committing.',
  },
  {
    question: 'How do I know if AI automation is right for my business?',
    answer: 'If you or your team spend significant time on repetitive tasks like answering calls, sending invoices, chasing payments, or entering data - AI automation could help. We offer a free AI Opportunity Assessment quiz on this website that takes two minutes and will show you where automation could save you time and money.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
            Frequently Asked Questions About AI Automation
          </h2>
          <p className="text-lg text-slate-600">
            Answers to the most common questions about AI automation for UK small businesses.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-base font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[3.75rem]">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-500 transition-colors"
          >
            Get in touch
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Author Attribution */}
        <AuthorByline />
      </div>
    </section>
  )
}
