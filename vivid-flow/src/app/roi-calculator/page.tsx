'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { sectorNames } from '@/data/sectors'
import {
  Calculator,
  Clock,
  Phone,
  PoundSterling,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Shield,
  Users,
  Send,
  CheckCircle,
  Loader2,
} from 'lucide-react'

// Research-backed data aligned with assessment calculations
// Sources: Simply Business 2024, Checkatrade, Paperclip research, QuickBooks 2025

// Average turnover by sector (2024 UK data)
const sectorTurnover: Record<string, number> = {
  'Accountancy': 85000,
  'Legal & Solicitors': 120000,
  'Electrical Contractors': 75000,
  'Plumbing & Heating': 84000,
  'Construction & Main Contractors': 110000,
  'Landscaping Contractors': 60000,
  'Restaurants': 250000,
  'Veterinary Practices': 350000,
  'Roofing Contractors': 57000,
  'Painting & Decorating': 55000,
}

// Constants for calculations
const ADMIN_REDUCTION_PERCENT = 0.40 // 40% admin time reduction is realistic
const HOURLY_RATE = 30 // Opportunity cost per hour
const CALL_CONVERSION_RATE = 0.12 // 12% of missed calls convert when answered

const formatGBP = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)

function useAnimatedCounter(target: number, duration: number = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) { setValue(0); return }
    const startTime = Date.now()
    let frameId: number
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration])
  return value
}

interface ROIInputs {
  sector: string
  employees: number
  adminHoursPerWeek: number
  missedCallsPerMonth: number
  avgJobValue: number
  monthlyRevenue: number
}

interface ROIResults {
  annualHoursSaved: number
  revenueRecovered: number
  totalAnnualSavings: number
  monthlySavingsEquivalent: number
}

interface LeadData {
  name: string
  phone: string
  email: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<ROIInputs>({
    sector: sectorNames[0],
    employees: 5,
    adminHoursPerWeek: 15,
    missedCallsPerMonth: 20,
    avgJobValue: 500,
    monthlyRevenue: 0,
  })

  const [results, setResults] = useState<ROIResults | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({ name: '', phone: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const animatedHours = useAnimatedCounter(showResults ? (results?.annualHoursSaved ?? 0) : 0)
  const animatedRevenue = useAnimatedCounter(showResults ? (results?.revenueRecovered ?? 0) : 0)
  const animatedTotal = useAnimatedCounter(showResults ? (results?.totalAnnualSavings ?? 0) : 0)
  const animatedMonthly = useAnimatedCounter(showResults ? (results?.monthlySavingsEquivalent ?? 0) : 0)

  const calculate = useCallback(() => {
    // Get sector-specific turnover for reality check
    const baseTurnover = sectorTurnover[inputs.sector] || 66000

    // Scale turnover by team size (estimate based on employees)
    const employeeMultiplier = inputs.employees <= 1 ? 1 : Math.min(inputs.employees / 2, 15)
    const estimatedTurnover = inputs.monthlyRevenue > 0
      ? inputs.monthlyRevenue * 12
      : baseTurnover * employeeMultiplier

    // Calculate admin time savings (40% reduction is realistic)
    const annualHoursSaved = Math.round(inputs.adminHoursPerWeek * ADMIN_REDUCTION_PERCENT * 52)
    const adminSavings = annualHoursSaved * HOURLY_RATE

    // Calculate missed call revenue recovery
    // Only a portion of missed calls would convert, scaled by team capacity
    const capacityFactor = inputs.employees <= 1 ? 0.3 : (inputs.employees <= 5 ? 0.5 : 0.7)
    const callsRecoverable = Math.round(inputs.missedCallsPerMonth * CALL_CONVERSION_RATE * capacityFactor)
    const revenueRecovered = Math.round(callsRecoverable * inputs.avgJobValue * 12)

    // Calculate total potential savings
    let totalAnnualSavings = Math.round(adminSavings + revenueRecovered)

    // Reality check: Cap at realistic percentage of turnover
    // Solo: 12%, Small team: 15%, Medium+: 18%
    const maxPercent = inputs.employees <= 1 ? 0.12 : (inputs.employees <= 5 ? 0.15 : 0.18)
    const maxSavings = Math.round(estimatedTurnover * maxPercent)
    totalAnnualSavings = Math.min(totalAnnualSavings, maxSavings)

    // Round to nearest £500 for cleaner presentation
    totalAnnualSavings = Math.round(totalAnnualSavings / 500) * 500

    const monthlySavingsEquivalent = Math.round(totalAnnualSavings / 12)

    setResults({ annualHoursSaved, revenueRecovered: Math.min(revenueRecovered, totalAnnualSavings - adminSavings), totalAnnualSavings, monthlySavingsEquivalent })
    setShowResults(true)
  }, [inputs])

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          ...inputs,
          ...results,
          source: 'roi-calculator',
        }),
      })
    } catch {
      // Silently handle - form still shows success
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.a>

          {/* Header */}
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Free Tool
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              ROI Calculator
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Estimate how much time and money AI automation could save your business.
              Fill in your details below and see your potential savings.
            </p>
          </motion.div>

          {/* Calculator Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                Your Business Details
              </h2>

              <div className="space-y-6">
                {/* Sector */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Business Sector
                  </label>
                  <select
                    value={inputs.sector}
                    onChange={(e) => setInputs({ ...inputs, sector: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    {sectorNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Employees */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={inputs.employees}
                    onChange={(e) => setInputs({ ...inputs, employees: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Admin Hours */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Hours Spent on Admin per Week
                    </label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {inputs.adminHoursPerWeek}h
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={inputs.adminHoursPerWeek}
                    onChange={(e) => setInputs({ ...inputs, adminHoursPerWeek: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600 h-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1 hour</span>
                    <span>40 hours</span>
                  </div>
                </div>

                {/* Missed Calls */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Missed Calls per Month
                    </label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {inputs.missedCallsPerMonth}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={inputs.missedCallsPerMonth}
                    onChange={(e) => setInputs({ ...inputs, missedCallsPerMonth: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600 h-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0 calls</span>
                    <span>200 calls</span>
                  </div>
                </div>

                {/* Avg Job Value */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Average Job/Transaction Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                      &pound;
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={inputs.avgJobValue}
                      onChange={(e) => setInputs({ ...inputs, avgJobValue: parseInt(e.target.value) || 0 })}
                      className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Monthly Revenue <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                      &pound;
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={inputs.monthlyRevenue || ''}
                      onChange={(e) => setInputs({ ...inputs, monthlyRevenue: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={calculate}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Calculate My Potential Savings
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Results Panel */}
            <div className="space-y-8">
              <AnimatePresence>
                {showResults && results && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
                  >
                    <h2 className="text-xl font-display font-bold text-slate-900 mb-2">
                      Your Potential Savings
                    </h2>
                    <p className="text-sm text-slate-500 mb-8">
                      Based on your inputs and UK industry research, here is what AI automation could potentially save your business.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Total Annual Savings - Featured */}
                      <div className="col-span-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 opacity-80" />
                          <span className="text-sm font-medium opacity-80">Estimated Annual Potential</span>
                        </div>
                        <div className="text-4xl font-display font-bold">
                          {formatGBP(animatedTotal)}
                        </div>
                      </div>

                      {/* Hours Saved */}
                      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-700">Potential Hours Saved/Year</span>
                        </div>
                        <div className="text-2xl font-display font-bold text-slate-900">
                          {animatedHours}
                        </div>
                      </div>

                      {/* Revenue Recovered */}
                      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700">Potential Revenue Recovery</span>
                        </div>
                        <div className="text-2xl font-display font-bold text-slate-900">
                          {formatGBP(animatedRevenue)}
                        </div>
                      </div>

                      {/* Monthly Equivalent */}
                      <div className="col-span-2 bg-amber-50 rounded-2xl p-5 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <PoundSterling className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-medium text-amber-700">Potential Monthly Savings</span>
                        </div>
                        <div className="text-2xl font-display font-bold text-slate-900">
                          {formatGBP(animatedMonthly)}<span className="text-sm font-normal text-slate-500">/month</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-6 leading-relaxed">
                      Estimates based on UK industry research: 40% admin time reduction and 12% missed-call conversion rate.
                      Results are capped at realistic percentages of your estimated turnover. Actual savings may vary.
                      Book a free discovery call for a personalised assessment.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lead Capture Form */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
                  >
                    {!isSubmitted ? (
                      <>
                        <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                          Get Your Personalised Report
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                          Enter your details and we will send you a detailed breakdown with
                          specific recommendations for your sector.
                        </p>
                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                            <input
                              type="text"
                              required
                              value={leadData.name}
                              onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                              placeholder="Your full name"
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                            <input
                              type="tel"
                              required
                              value={leadData.phone}
                              onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                              placeholder="07xxx xxx xxx"
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                            <input
                              type="email"
                              required
                              value={leadData.email}
                              onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                              placeholder="you@business.co.uk"
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                            />
                          </div>
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white px-8 py-4 rounded-xl text-base font-semibold transition-colors"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Send My Report
                              </>
                            )}
                          </motion.button>
                          <p className="text-xs text-slate-400 text-center">
                            We respect your privacy. Your data will not be shared with third parties.
                          </p>
                        </form>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                          Thank You!
                        </h3>
                        <p className="text-sm text-slate-600 mb-6">
                          We will be in touch shortly with your personalised report.
                        </p>
                        <a
                          href="/#contact"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                          Book a Discovery Call
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div
            {...fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 mt-16"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>UK-Based Support</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <span>No Long-Term Contracts</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
