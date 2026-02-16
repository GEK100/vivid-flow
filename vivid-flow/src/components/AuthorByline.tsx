'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'

interface AuthorBylineProps {
  variant?: 'light' | 'dark'
}

export default function AuthorByline({ variant = 'light' }: AuthorBylineProps) {
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} pt-8 mt-12`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-slate-700' : 'bg-indigo-100'} flex items-center justify-center flex-shrink-0`}>
          <User className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Written by Gareth Kerr
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
            Founder, Vivid Flow
          </p>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'} mt-2 leading-relaxed max-w-md`}>
            With a background in construction and a passion for problem-solving, Gareth founded Vivid Flow to help UK small businesses save time through practical AI automation.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
