'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { sectorNames } from '@/data/sectors'
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
} from 'lucide-react'

interface QuizOption {
  label: string
  value: string
  score: number
}

interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
}

type QuizPhase = 'quiz' | 'lead-capture' | 'results'

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What sector is your business in?',
    options: sectorNames.map(name => ({ label: name, value: name.toLowerCase().replace(/\s+/g, '-'), score: 0 })),
  },
  {
    id: 2,
    question: 'How many people work in your business?',
    options: [
      { label: '1-5 employees', value: '1-5', score: 3 },
      { label: '6-20 employees', value: '6-20', score: 6 },
      { label: '21-50 employees', value: '21-50', score: 8 },
      { label: '50+ employees', value: '50+', score: 10 },
    ],
  },
  {
    id: 3,
    question: 'How do you currently handle incoming phone calls?',
    options: [
      { label: 'I answer them personally', value: 'personal', score: 4 },
      { label: 'We have a receptionist', value: 'receptionist', score: 7 },
      { label: 'They go to voicemail', value: 'voicemail', score: 3 },
      { label: 'We miss most of them', value: 'miss-most', score: 1 },
    ],
  },
  {
    id: 4,
    question: 'How do you manage customer/client information?',
    options: [
      { label: 'Spreadsheets (Excel/Google Sheets)', value: 'spreadsheets', score: 4 },
      { label: 'CRM software (HubSpot, Pipedrive, etc.)', value: 'crm', score: 8 },
      { label: 'Paper notes or memory', value: 'paper', score: 2 },
      { label: 'Mix of different tools', value: 'mix', score: 5 },
    ],
  },
  {
    id: 5,
    question: 'How do you handle invoicing and payments?',
    options: [
      { label: 'Manual invoices (Word, PDF, etc.)', value: 'manual', score: 2 },
      { label: 'Accounting software (Xero, QuickBooks, etc.)', value: 'accounting-software', score: 8 },
      { label: 'Mix of methods', value: 'mix', score: 5 },
      { label: 'No structured system', value: 'no-system', score: 1 },
    ],
  },
  {
    id: 6,
    question: 'How many hours per week do you spend on admin tasks?',
    options: [
      { label: 'Less than 5 hours', value: 'under-5', score: 8 },
      { label: '5-10 hours', value: '5-10', score: 6 },
      { label: '10-20 hours', value: '10-20', score: 4 },
      { label: '20+ hours', value: '20+', score: 2 },
    ],
  },
  {
    id: 7,
    question: 'What is your biggest operational frustration?',
    options: [
      { label: 'Missed calls and lost leads', value: 'missed-calls', score: 3 },
      { label: 'Late payments and cash flow', value: 'late-payments', score: 4 },
      { label: 'Manual paperwork and admin', value: 'paperwork', score: 3 },
      { label: 'Lack of data and visibility', value: 'no-data', score: 5 },
    ],
  },
  {
    id: 8,
    question: 'Have you tried any automation tools before?',
    options: [
      { label: 'No, never', value: 'no', score: 3 },
      { label: 'Yes, basic tools (Zapier, etc.)', value: 'basic', score: 6 },
      { label: 'Yes, we use several', value: 'several', score: 9 },
    ],
  },
  {
    id: 9,
    question: 'How quickly would you like to see improvements?',
    options: [
      { label: 'As soon as possible', value: 'asap', score: 10 },
      { label: 'Within a month', value: 'month', score: 8 },
      { label: 'Within 3 months', value: '3-months', score: 5 },
      { label: 'Just exploring for now', value: 'exploring', score: 2 },
    ],
  },
  {
    id: 10,
    question: 'What is your monthly budget for business tools and software?',
    options: [
      { label: 'Under \u00A3100', value: 'under-100', score: 3 },
      { label: '\u00A3100-500', value: '100-500', score: 6 },
      { label: '\u00A3500-1,000', value: '500-1000', score: 8 },
      { label: 'Over \u00A31,000', value: 'over-1000', score: 10 },
    ],
  },
]

const MAX_SCORE = questions.reduce((sum, q) => {
  const maxOption = Math.max(...q.options.map(o => o.score))
  return sum + maxOption
}, 0)

function getScoreCategory(score: number) {
  if (score >= 80) return { label: 'Ready to Transform', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', stroke: '#059669' }
  if (score >= 60) return { label: 'Strong Candidate', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', stroke: '#4f46e5' }
  if (score >= 40) return { label: 'Good Foundation', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', stroke: '#d97706' }
  return { label: 'Early Stage', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', stroke: '#64748b' }
}

function generateRecommendations(answers: Record<number, string>): string[] {
  const recs: string[] = []

  if (answers[3] === 'miss-most' || answers[3] === 'voicemail') {
    recs.push('An AI Voice Receptionist could capture the leads you are currently missing. Businesses typically recover thousands in annual revenue by never missing a call again.')
  }

  if (answers[4] === 'paper' || answers[4] === 'spreadsheets') {
    recs.push('Centralising your customer data with CRM integration would give you instant visibility into every client interaction and reduce manual data entry significantly.')
  }

  if (answers[5] === 'manual' || answers[5] === 'no-system') {
    recs.push('Automated invoicing could eliminate hours of evening admin and significantly reduce late payments. Voice-to-invoice tools let you create invoices on the go.')
  }

  if (answers[6] === '10-20' || answers[6] === '20+') {
    recs.push('With over 10 hours weekly on admin, process automation could free up significant time for revenue-generating work. This is typically the highest-impact area to automate first.')
  }

  if (answers[7] === 'missed-calls') {
    recs.push('Your biggest frustration aligns perfectly with our AI Voice Receptionist - the highest-impact quick win for most service businesses.')
  } else if (answers[7] === 'late-payments') {
    recs.push('Automated payment chasing with graduated reminders could dramatically improve your cash flow and save hours of manual follow-up each week.')
  }

  if (recs.length < 3) {
    recs.push('A free discovery call would help us identify the highest-impact automation opportunity specific to your business and sector.')
  }

  return recs.slice(0, 4)
}

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
          fill="none" stroke={category.stroke} strokeWidth="14"
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
        <span className="text-xs text-slate-500">out of 100</span>
      </div>
    </div>
  )
}

export default function AssessmentPage() {
  const [phase, setPhase] = useState<QuizPhase>('quiz')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const progress = ((currentStep + 1) / totalQuestions) * 100

  useEffect(() => {
    if (answers[currentQuestion.id] !== undefined) {
      setSelectedOption(answers[currentQuestion.id])
    } else {
      setSelectedOption(null)
    }
  }, [currentStep, answers, currentQuestion.id])

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption }
    setAnswers(newAnswers)

    if (currentStep < totalQuestions - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate score
      let rawScore = 0
      questions.forEach(q => {
        const answer = newAnswers[q.id]
        const option = q.options.find(o => o.value === answer)
        if (option) rawScore += option.score
      })
      const normalizedScore = Math.round((rawScore / MAX_SCORE) * 100)
      setScore(normalizedScore)
      setRecommendations(generateRecommendations(newAnswers))
      setPhase('lead-capture')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          answers,
          score,
          source: 'ai-readiness-assessment',
        }),
      })
    } catch {
      // Silently handle
    }

    setIsSubmitting(false)
    setPhase('results')
  }

  const category = getScoreCategory(score)

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
              AI Readiness Assessment
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Answer 10 quick questions to find out how ready your business is for AI automation.
            </p>
          </motion.div>

          {/* Quiz Phase */}
          {phase === 'quiz' && (
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
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-slate-900 mb-8">
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3">
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
                  disabled={currentStep === 0}
                  className={`
                    inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all
                    ${currentStep === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
                    }
                  `}
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
                  Enter your details below to see your personalised AI readiness score
                  and recommendations.
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
                  Your AI Readiness Score
                </h2>

                <ScoreGauge score={score} category={category} />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${category.bg} ${category.border} border mt-4`}
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
                  {score >= 80
                    ? 'Your business is well-positioned to benefit significantly from AI automation. You have the foundation in place for rapid implementation.'
                    : score >= 60
                    ? 'Your business shows strong potential for AI automation. A few targeted improvements could unlock significant efficiency gains.'
                    : score >= 40
                    ? 'You have a good foundation to build on. Starting with one or two key automations would create immediate value.'
                    : 'You are at the early stages of your automation journey. There is significant opportunity to transform your operations with the right approach.'
                  }
                </motion.p>
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
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
