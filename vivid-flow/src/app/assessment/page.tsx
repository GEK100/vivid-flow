'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { sectorNames } from '@/data/sectors'
import {
  coreQuestions,
  sectorQuestions,
  defaultSectorQuestions,
  calculateSavings,
  calculateOpportunityScore,
  getScoreCategory,
  QuizQuestion,
} from '@/data/assessmentQuestions'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Shield,
  Users,
  Send,
  Loader2,
  ClipboardCheck,
  Download,
  Clock,
  PoundSterling,
  TrendingUp,
} from 'lucide-react'
import AuthorByline from '@/components/AuthorByline'
import { generateReport } from '@/utils/generateReport'

type QuizPhase = 'sector' | 'quiz' | 'lead-capture' | 'results'

function ScoreGauge({ score, category }: { score: number; category: ReturnType<typeof getScoreCategory> }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const halfCircumference = circumference / 2

  return (
    <div className="relative w-64 h-36 mx-auto">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Background arc */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none" stroke="#e2e8f0" strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={halfCircumference}
          strokeLinecap="round"
          transform="rotate(180 100 100)"
        />
        {/* Score arc */}
        <motion.circle
          cx="100" cy="100" r={radius}
          fill="none" stroke={category.strokeColor} strokeWidth="14"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (halfCircumference * score / 100) }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          strokeLinecap="round"
          transform="rotate(180 100 100)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-display font-bold text-slate-900"
        >
          {score}
        </motion.span>
        <span className="text-xs text-slate-500">Opportunity Score</span>
      </div>
    </div>
  )
}

export default function AssessmentPage() {
  const [phase, setPhase] = useState<QuizPhase>('sector')
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Build questions based on selected sector
  const questions: QuizQuestion[] = useMemo(() => {
    if (!selectedSector) return []
    const sectorSpecific = sectorQuestions[selectedSector] || defaultSectorQuestions
    return [...coreQuestions, ...sectorSpecific]
  }, [selectedSector])

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? ((currentStep + 1) / totalQuestions) * 100 : 0

  // Calculate results
  const score = useMemo(() => calculateOpportunityScore(answers, questions), [answers, questions])
  const savings = useMemo(() => calculateSavings(answers, questions, selectedSector), [answers, questions, selectedSector])
  const category = useMemo(() => getScoreCategory(score), [score])

  // Generate recommendations based on answers
  const recommendations = useMemo(() => {
    const recs: string[] = []

    if (answers['call-handling'] === 'miss-most' || answers['call-handling'] === 'voicemail') {
      recs.push(`An AI Voice Receptionist could recover an estimated £${savings.annualRevenuePotential.toLocaleString()} annually by capturing calls you\'re currently missing. Most businesses see 2-4 new clients per month from previously missed calls.`)
    }

    if (answers['customer-data'] === 'paper' || answers['customer-data'] === 'spreadsheets') {
      recs.push('Centralising your customer data with CRM integration would give you instant visibility into every client interaction and reduce manual data entry by up to 70%.')
    }

    if (answers['invoicing'] === 'manual' || answers['invoicing'] === 'struggle') {
      recs.push(`Automated invoicing could eliminate ${Math.round(savings.adminHoursSaved * 0.4)} hours of admin per week and significantly reduce late payments. Voice-to-invoice tools let you create invoices on the go.`)
    }

    if (answers['admin-hours'] === '10-20' || answers['admin-hours'] === '20+') {
      recs.push(`With ${answers['admin-hours'] === '20+' ? '20+' : '10-20'} hours weekly on admin, you could save approximately ${savings.adminHoursSaved} hours per week. That\'s ${Math.round(savings.adminHoursSaved * 52)} hours per year back for revenue-generating work or family time.`)
    }

    if (answers['biggest-frustration'] === 'missed-calls') {
      recs.push('Your biggest frustration aligns perfectly with AI Voice Receptionist technology - typically the highest-impact quick win for service businesses.')
    } else if (answers['biggest-frustration'] === 'late-payments') {
      recs.push('Automated payment chasing with graduated reminders could dramatically improve your cash flow. Most businesses see a 40-60% reduction in overdue invoices.')
    }

    // Sector-specific
    if (answers['document-chasing'] === 'constant') {
      recs.push('An intelligent document collection agent could automate your client chasing with personalised, escalating reminders - potentially saving 5+ hours per week.')
    }

    if (answers['certification'] === 'burden') {
      recs.push('Voice-to-certificate technology could cut your certification time by 70%. Speak your test results and have compliant certificates generated automatically.')
    }

    if (recs.length < 3) {
      recs.push('A free discovery call would help us identify the highest-impact automation opportunity specific to your business and sector.')
    }

    return recs.slice(0, 4)
  }, [answers, savings])

  useEffect(() => {
    if (currentQuestion && answers[currentQuestion.id] !== undefined) {
      setSelectedOption(answers[currentQuestion.id])
    } else {
      setSelectedOption(null)
    }
  }, [currentStep, answers, currentQuestion])

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector)
    setPhase('quiz')
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption }
    setAnswers(newAnswers)

    if (currentStep < totalQuestions - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
    } else {
      setPhase('lead-capture')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
    } else {
      // Go back to sector selection
      setPhase('sector')
      setSelectedSector('')
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          answers,
          score,
          savings,
          sector: selectedSector,
          recommendations,
          source: 'ai-readiness-assessment',
        }),
      })

      const result = await response.json()
      console.log('API response:', result)
    } catch (error) {
      console.error('Submit error:', error)
    }

    setIsSubmitting(false)
    setPhase('results')
  }

  const handleDownloadPDF = () => {
    generateReport({
      name: leadData.name,
      email: leadData.email,
      score,
      category: {
        label: category.label,
        color: category.color,
      },
      recommendations,
      answers,
      savings,
    })
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <ClipboardCheck className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Free Assessment
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-3 tracking-tight">
              Am I Ready for AI Automation?
            </h1>
            {/* Extractable definition for AI citation */}
            <p className="text-base text-slate-600 leading-relaxed mb-2">
              <strong>An AI readiness assessment</strong> evaluates your business processes to identify automation opportunities and calculate potential savings.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {phase === 'sector'
                ? 'First, tell us what sector you\'re in so we can ask the right questions.'
                : 'Answer a few quick questions to discover your automation potential.'}
            </p>
          </motion.div>

          {/* Sector Selection Phase */}
          {phase === 'sector' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 text-center">
                What sector is your business in?
              </h2>
              <div className="grid gap-3">
                {sectorNames.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => handleSectorSelect(sector)}
                    className="w-full text-left p-4 rounded-xl border-2 border-slate-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-slate-700">{sector}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quiz Phase */}
          {phase === 'quiz' && currentQuestion && (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Question {currentStep + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs font-medium text-indigo-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
                >
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-slate-900 mb-2">
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.helpText && (
                    <p className="text-sm text-slate-500 mb-6">{currentQuestion.helpText}</p>
                  )}

                  <div className="space-y-3 mt-6">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedOption(option.value)}
                        className={`
                          w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                          ${selectedOption === option.value
                            ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${selectedOption === option.value
                              ? 'border-indigo-600 bg-indigo-600'
                              : 'border-slate-300'
                            }
                          `}>
                            {selectedOption === option.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            selectedOption === option.value ? 'text-indigo-900' : 'text-slate-700'
                          }`}>
                            {option.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handlePrevious}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
                <motion.button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  whileHover={selectedOption ? { scale: 1.02 } : {}}
                  whileTap={selectedOption ? { scale: 0.98 } : {}}
                  className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all
                    ${selectedOption
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }
                  `}
                >
                  {currentStep === totalQuestions - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </>
          )}

          {/* Lead Capture Phase */}
          {phase === 'lead-capture' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
                  Your Results Are Ready!
                </h2>
                <p className="text-sm text-slate-600">
                  Enter your details below to see your personalised AI opportunity score
                  and potential savings.
                </p>
              </div>

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
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-8 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-indigo-600/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      See My Results
                    </>
                  )}
                </motion.button>
                <p className="text-xs text-slate-400 text-center">
                  We respect your privacy. Your data will not be shared with third parties.
                </p>
              </form>
            </motion.div>
          )}

          {/* Results Phase */}
          {phase === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Score Card */}
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm text-center">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                  Your AI Opportunity Score
                </h2>

                <ScoreGauge score={score} category={category} />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${category.bgColor} ${category.borderColor} border mt-4`}
                >
                  <span className={`text-sm font-bold ${category.color}`}>
                    {category.label}
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm text-slate-600 mt-4 max-w-md mx-auto"
                >
                  {category.message}
                </motion.p>
              </div>

              {/* Savings Potential */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-10 border border-emerald-100">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Your Potential Savings
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="bg-white rounded-2xl p-5 border border-emerald-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-600">Admin Time Saved</span>
                    </div>
                    <p className="text-3xl font-display font-bold text-slate-900">
                      {savings.adminHoursSaved} <span className="text-lg font-normal text-slate-500">hrs/week</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      ~{Math.round(savings.adminHoursSaved * 52)} hours per year
                    </p>
                  </motion.div>
                  {savings.annualRevenuePotential > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="bg-white rounded-2xl p-5 border border-emerald-100"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <PoundSterling className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-600">Revenue Potential</span>
                      </div>
                      <p className="text-3xl font-display font-bold text-slate-900">
                        £{savings.annualRevenuePotential.toLocaleString()} <span className="text-lg font-normal text-slate-500">/year</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        From captured leads & reduced losses
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Your Personalised Recommendations
                </h3>
                <div className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + i * 0.2 }}
                      className="flex gap-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100"
                    >
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Download Report */}
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm text-center">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-3">
                  Download Your Report
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Save your personalised AI opportunity report as a PDF to share with your team.
                </p>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20"
                >
                  <Download className="w-4 h-4" />
                  Download PDF Report
                </button>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 lg:p-10 text-center text-white">
                <h3 className="text-xl font-display font-bold mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-sm text-white/80 mb-6 max-w-md mx-auto">
                  Book a free 15-minute discovery call. We will review your score together and
                  identify the highest-impact automation for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    Book a Discovery Call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/roi-calculator"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors"
                  >
                    Calculate Your ROI
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
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
              </div>

              {/* Author Attribution */}
              <AuthorByline />
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
