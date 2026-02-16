'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator, ClipboardCheck, Clock, Shield, Zap, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-white border-b border-slate-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-violet-100 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              AI Automation for UK Small Businesses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
          >
            We automate admin{' '}
            <br className="hidden sm:block" />
            so you can{' '}
            <span className="gradient-text">grow your business</span>
          </motion.h1>

          {/* Extractable definition for AI citation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            <strong>AI automation for small businesses</strong> uses artificial intelligence to handle repetitive administrative tasks like answering calls, sending invoices, and managing customer data.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base lg:text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            From missed calls to late invoices, we replace the manual work
            that costs UK trades, professional services, and hospitality
            businesses hours every week.
          </motion.p>

          {/* Primary CTAs - Free Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <a
              href="/roi-calculator"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/20 hover:-translate-y-0.5 active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              Calculate My Savings
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              <ClipboardCheck className="w-5 h-5" />
              Am I Ready for AI?
            </a>
          </motion.div>

          {/* Secondary link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/#solutions"
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors underline underline-offset-4"
            >
              or see what we build
            </a>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-slate-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span className="text-2xl lg:text-3xl font-display font-bold text-slate-900">15+</span>
                </div>
                <p className="text-xs text-slate-500">Up to 15 hours saved per week, per client</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span className="text-2xl lg:text-3xl font-display font-bold text-slate-900">10+</span>
                </div>
                <p className="text-xs text-slate-500">Industry sectors supported</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span className="text-2xl lg:text-3xl font-display font-bold text-slate-900">100%</span>
                </div>
                <p className="text-xs text-slate-500">GDPR compliant, UK-based</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span className="text-2xl lg:text-3xl font-display font-bold text-slate-900">Free</span>
                </div>
                <p className="text-xs text-slate-500">Initial audit, no obligation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
