'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Calculator, ClipboardCheck, CheckCircle, Loader2 } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website-footer-cta' }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-5" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 mb-8">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-white/80">
              Free initial audit, no obligation
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Not sure where to start?{' '}
            <br className="hidden sm:block" />
            <span className="text-indigo-400">Try a free tool.</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Use our free tools to see how AI could help your business, or
            drop us an email and we'll get back to you within 24 hours.
          </p>

          {/* CTA Buttons - Mirror the Free Tools */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="/roi-calculator"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-indigo-900/50 w-full sm:w-auto"
            >
              <Calculator className="w-5 h-5" />
              Calculate My Savings
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/assessment"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-slate-700 hover:border-slate-600 px-8 py-4 rounded-xl text-base font-semibold transition-all w-full sm:w-auto"
            >
              <ClipboardCheck className="w-5 h-5" />
              AI Readiness Quiz
            </motion.a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2">
              <span>UK-Based Support</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2">
              <span>No Long-Term Contracts</span>
            </div>
          </div>
        </motion.div>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Prefer email?
              </h3>
              <p className="text-slate-400 text-sm">
                Drop us your email with a brief description of your business and
                we'll get back to you within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3">
              {status === 'success' ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium w-full justify-center py-3">
                  <CheckCircle className="w-5 h-5" />
                  Thanks! We'll be in touch soon.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors text-sm whitespace-nowrap disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Get in Touch'
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
