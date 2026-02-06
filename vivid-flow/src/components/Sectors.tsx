'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ChevronDown,
  AlertCircle,
  Lightbulb,
  TrendingUp
} from 'lucide-react'
import { sectors, sectorGroups } from '@/data/sectors'

export default function Sectors() {
  const [expandedSector, setExpandedSector] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleTabClick = useCallback((groupId: string) => {
    clearTimer()

    if (activeTab === groupId) {
      // Clicking same tab closes it
      setActiveTab(null)
      setExpandedSector(null)
      return
    }

    setActiveTab(groupId)
    setExpandedSector(null)

    // Auto-hide after 5 seconds
    timerRef.current = setTimeout(() => {
      setActiveTab(null)
      setExpandedSector(null)
    }, 5000)
  }, [activeTab, clearTimer])

  // Reset timer when user expands a sector card (they're engaged)
  const toggleSector = useCallback((title: string) => {
    clearTimer()
    setExpandedSector(prev => {
      const next = prev === title ? null : title
      // If they expanded a card, give them more time
      if (next) {
        timerRef.current = setTimeout(() => {
          setActiveTab(null)
          setExpandedSector(null)
        }, 15000) // 15s when reading details
      } else {
        // Collapsed the card, back to 5s
        timerRef.current = setTimeout(() => {
          setActiveTab(null)
          setExpandedSector(null)
        }, 5000)
      }
      return next
    })
  }, [clearTimer])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  const activeGroup = activeTab ? sectorGroups.find(g => g.id === activeTab) : null
  const filteredSectors = activeGroup
    ? sectors.filter(s => activeGroup.sectorTitles.includes(s.title))
    : []

  return (
    <section id="sectors" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-6">
            Built for{' '}
            <span className="text-indigo-600">your industry</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We've researched the specific pain points in each sector.
            Choose your industry to see how AI automation solves them.
          </p>
        </motion.div>

        {/* Large Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {sectorGroups.map((group) => {
            const isActive = activeTab === group.id
            return (
              <button
                key={group.id}
                onClick={() => handleTabClick(group.id)}
                className={`
                  relative text-left p-6 lg:p-8 rounded-2xl transition-all duration-300 border-2 group cursor-pointer
                  ${isActive
                    ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-600/20 scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                    }
                  `}>
                    <group.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}>
                      {group.label}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isActive ? 'text-indigo-100' : 'text-slate-500'
                    }`}>
                      {group.description}
                    </p>
                    <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                      isActive ? 'text-white/80' : 'text-indigo-600'
                    }`}>
                      {isActive ? 'Click to close' : `${group.sectorTitles.length} sectors`}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Sectors Grid - Only visible when a tab is active */}
        <AnimatePresence mode="wait">
          {activeTab && filteredSectors.length > 0 && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 md:gap-5 pt-2 pb-4">
                {filteredSectors.map((sector, i) => (
                  <motion.div
                    key={sector.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {/* Sector Card Header */}
                    <div
                      onClick={() => toggleSector(sector.title)}
                      className={`
                        relative p-5 lg:p-6 rounded-2xl cursor-pointer transition-all duration-300
                        border-2 hover:shadow-lg
                        ${expandedSector === sector.title
                          ? 'border-indigo-200 bg-white shadow-lg'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl ${sector.bgColor}`}>
                            <sector.icon className={`w-5 h-5 ${sector.color}`} />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-slate-900 text-base lg:text-lg">
                              {sector.title}
                            </h3>
                            <p className="text-slate-500 text-sm mt-0.5">{sector.tagline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden md:block text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                            {sector.stats}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedSector === sector.title ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedSector === sector.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            {/* Mobile stat */}
                            <div className="md:hidden mb-6">
                              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                                {sector.stats}
                              </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                              {/* Problems Column */}
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <AlertCircle className="w-5 h-5 text-red-500" />
                                  <h4 className="font-display font-bold text-slate-900">Common Issues</h4>
                                </div>
                                <div className="space-y-4">
                                  {sector.problems.map((problem, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="p-4 bg-red-50/50 rounded-xl border border-red-100"
                                    >
                                      <h5 className="font-semibold text-slate-900 text-sm mb-2">
                                        {problem.title}
                                      </h5>
                                      <p className="text-slate-600 text-sm leading-relaxed">
                                        {problem.description}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Solutions Column */}
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <Lightbulb className="w-5 h-5 text-emerald-500" />
                                  <h4 className="font-display font-bold text-slate-900">AI Solutions</h4>
                                </div>
                                <div className="space-y-4">
                                  {sector.solutions.map((solution, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100"
                                    >
                                      <h5 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        {solution.title}
                                      </h5>
                                      <p className="text-slate-600 text-sm leading-relaxed">
                                        {solution.description}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                              <p className="text-slate-600 text-sm">
                                Ready to solve these problems for your {sector.title.toLowerCase()} business?
                              </p>
                              <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                              >
                                Get a Free Assessment
                                <TrendingUp className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
