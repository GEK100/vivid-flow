'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, Calculator, ClipboardCheck, Sparkles } from 'lucide-react'

const navLinks = [
  { name: 'What We Do', href: '/#solutions' },
  { name: 'Industries', href: '/#sectors' },
  { name: 'How It Works', href: '/#methodology' },
  { name: 'Contact', href: '/#contact' },
]

const toolLinks = [
  { name: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
  { name: 'Readiness Quiz', href: '/assessment', icon: ClipboardCheck },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
                <div className="absolute inset-0 rounded-xl bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Zap className="absolute w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
              </div>
              <span className="text-xl font-display font-bold text-slate-900">
                Vivid<span className="text-indigo-600">Flow</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 animated-underline transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side: Free Tools + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Free Tool Buttons - Prominent */}
              {toolLinks.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition-all"
                >
                  <tool.icon className="w-3.5 h-3.5" />
                  {tool.name}
                </a>
              ))}

              {/* Divider */}
              <div className="w-px h-6 bg-slate-200 mx-1" />

              {/* Main CTA */}
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden"
          >
            <div className="bg-white border-b border-slate-200 shadow-xl">
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-slate-600 hover:text-slate-900 py-2 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}

                {/* Free Tools - Prominent on Mobile */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                      Free Tools
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {toolLinks.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        <tool.icon className="w-4 h-4" />
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-semibold mt-4"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
