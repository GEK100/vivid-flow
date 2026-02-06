'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface InterSectionCTAProps {
  badge: string
  title: string
  description: string
  buttonText: string
  buttonHref: string
  variant?: 'light' | 'dark'
}

export default function InterSectionCTA({
  badge,
  title,
  description,
  buttonText,
  buttonHref,
  variant = 'light',
}: InterSectionCTAProps) {
  const isLight = variant === 'light'

  return (
    <section className={`py-12 lg:py-16 ${isLight ? 'bg-indigo-50/50' : 'bg-slate-900'}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${
              isLight ? 'text-indigo-600' : 'text-indigo-400'
            }`}>
              {badge}
            </span>
            <h3 className={`text-xl lg:text-2xl font-display font-bold mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {title}
            </h3>
            <p className={`text-sm lg:text-base max-w-lg ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {description}
            </p>
          </div>
          <motion.a
            href={buttonHref}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`
              inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0
              ${isLight
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
                : 'bg-white text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
