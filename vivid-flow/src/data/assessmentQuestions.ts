// Assessment questions with inverted scoring:
// Higher score = MORE opportunity for AI automation (more manual processes = higher potential)

export interface QuizOption {
  label: string
  value: string
  opportunityScore: number // 0-10, higher = more opportunity for improvement
  adminSavingsPercent?: number // Potential admin time reduction
  revenuePotential?: number // Potential annual revenue recovery in £
}

export interface QuizQuestion {
  id: string
  question: string
  helpText?: string
  options: QuizOption[]
  category: 'calls' | 'admin' | 'payments' | 'systems' | 'intent'
}

// Core questions asked to everyone (after sector selection)
export const coreQuestions: QuizQuestion[] = [
  {
    id: 'team-size',
    question: 'How many people work in your business?',
    category: 'systems',
    options: [
      { label: 'Just me', value: 'solo', opportunityScore: 6, adminSavingsPercent: 30 },
      { label: '2-5 employees', value: '2-5', opportunityScore: 8, adminSavingsPercent: 40 },
      { label: '6-20 employees', value: '6-20', opportunityScore: 9, adminSavingsPercent: 50 },
      { label: '20+ employees', value: '20+', opportunityScore: 7, adminSavingsPercent: 35 },
    ],
  },
  {
    id: 'call-handling',
    question: 'How do you currently handle incoming phone calls?',
    helpText: 'Think about what happens when you\'re busy with a client or on another job',
    category: 'calls',
    options: [
      { label: 'I answer them personally when I can', value: 'personal', opportunityScore: 7, revenuePotential: 35000 },
      { label: 'We have a receptionist or team member', value: 'receptionist', opportunityScore: 3, revenuePotential: 10000 },
      { label: 'They mostly go to voicemail', value: 'voicemail', opportunityScore: 9, revenuePotential: 65000 },
      { label: 'We miss most calls when busy', value: 'miss-most', opportunityScore: 10, revenuePotential: 85000 },
    ],
  },
  {
    id: 'customer-data',
    question: 'How do you manage customer/client information?',
    category: 'systems',
    options: [
      { label: 'CRM software (HubSpot, Pipedrive, etc.)', value: 'crm', opportunityScore: 2, adminSavingsPercent: 10 },
      { label: 'Spreadsheets (Excel/Google Sheets)', value: 'spreadsheets', opportunityScore: 6, adminSavingsPercent: 35 },
      { label: 'Paper notes, memory, or phone contacts', value: 'paper', opportunityScore: 10, adminSavingsPercent: 50 },
      { label: 'Mix of different tools and methods', value: 'mix', opportunityScore: 7, adminSavingsPercent: 40 },
    ],
  },
  {
    id: 'invoicing',
    question: 'How do you handle invoicing and getting paid?',
    category: 'payments',
    options: [
      { label: 'Accounting software (Xero, QuickBooks, FreeAgent)', value: 'accounting-software', opportunityScore: 3, adminSavingsPercent: 15 },
      { label: 'Manual invoices (Word, PDF, handwritten)', value: 'manual', opportunityScore: 10, adminSavingsPercent: 60 },
      { label: 'Mix of methods', value: 'mix', opportunityScore: 6, adminSavingsPercent: 35 },
      { label: 'Struggle to invoice on time / chase manually', value: 'struggle', opportunityScore: 9, adminSavingsPercent: 55, revenuePotential: 15000 },
    ],
  },
  {
    id: 'admin-hours',
    question: 'How many hours per week do you spend on admin tasks?',
    helpText: 'Including invoicing, quoting, scheduling, paperwork, emails',
    category: 'admin',
    options: [
      { label: 'Less than 5 hours', value: 'under-5', opportunityScore: 2, adminSavingsPercent: 15 },
      { label: '5-10 hours', value: '5-10', opportunityScore: 5, adminSavingsPercent: 30 },
      { label: '10-20 hours', value: '10-20', opportunityScore: 8, adminSavingsPercent: 45 },
      { label: '20+ hours (evenings and weekends)', value: '20+', opportunityScore: 10, adminSavingsPercent: 55 },
    ],
  },
  {
    id: 'biggest-frustration',
    question: 'What frustrates you most about running your business?',
    category: 'intent',
    options: [
      { label: 'Missing calls and losing potential work', value: 'missed-calls', opportunityScore: 9, revenuePotential: 50000 },
      { label: 'Chasing late payments and cash flow issues', value: 'late-payments', opportunityScore: 8, revenuePotential: 25000 },
      { label: 'Too much paperwork and evening admin', value: 'paperwork', opportunityScore: 9, adminSavingsPercent: 50 },
      { label: 'Not enough time for actual work or family', value: 'no-time', opportunityScore: 8, adminSavingsPercent: 40 },
    ],
  },
  {
    id: 'timeline',
    question: 'How quickly would you like to see improvements?',
    category: 'intent',
    options: [
      { label: 'As soon as possible - this is urgent', value: 'asap', opportunityScore: 10 },
      { label: 'Within the next month', value: 'month', opportunityScore: 8 },
      { label: 'Within 3 months', value: '3-months', opportunityScore: 5 },
      { label: 'Just exploring options for now', value: 'exploring', opportunityScore: 2 },
    ],
  },
]

// Sector-specific questions based on research
export const sectorQuestions: Record<string, QuizQuestion[]> = {
  'Accountancy': [
    {
      id: 'document-chasing',
      question: 'How much time do you spend chasing clients for documents?',
      helpText: 'Bank statements, receipts, invoices, etc.',
      category: 'admin',
      options: [
        { label: 'Rarely an issue - clients are organised', value: 'organised', opportunityScore: 2, adminSavingsPercent: 10 },
        { label: 'Some chasing required for most clients', value: 'some', opportunityScore: 6, adminSavingsPercent: 35 },
        { label: 'Constant battle - my biggest headache', value: 'constant', opportunityScore: 10, adminSavingsPercent: 55 },
      ],
    },
    {
      id: 'self-assessment',
      question: 'How stressful is January self-assessment season?',
      category: 'admin',
      options: [
        { label: 'Manageable - we plan ahead', value: 'manageable', opportunityScore: 3 },
        { label: 'Very busy but we cope', value: 'busy', opportunityScore: 6 },
        { label: 'Extremely stressful - working all hours', value: 'stressful', opportunityScore: 9, adminSavingsPercent: 40 },
        { label: 'Nightmare - affects my health', value: 'nightmare', opportunityScore: 10, adminSavingsPercent: 50 },
      ],
    },
  ],
  'Legal & Solicitors': [
    {
      id: 'time-recording',
      question: 'How do you handle time recording?',
      category: 'admin',
      options: [
        { label: 'Automated time tracking tools', value: 'automated', opportunityScore: 2, adminSavingsPercent: 10 },
        { label: 'Manual entry at end of day', value: 'manual-daily', opportunityScore: 7, adminSavingsPercent: 35 },
        { label: 'Reconstruct from memory weekly', value: 'memory', opportunityScore: 10, adminSavingsPercent: 50, revenuePotential: 30000 },
      ],
    },
    {
      id: 'email-overload',
      question: 'How many emails do you receive daily?',
      category: 'admin',
      options: [
        { label: 'Under 50 - manageable', value: 'under-50', opportunityScore: 3 },
        { label: '50-100 - challenging', value: '50-100', opportunityScore: 6, adminSavingsPercent: 25 },
        { label: '100+ - overwhelming', value: 'over-100', opportunityScore: 10, adminSavingsPercent: 40 },
      ],
    },
  ],
  'Electrical Contractors': [
    {
      id: 'certification',
      question: 'How do you handle electrical certificates and compliance?',
      category: 'admin',
      options: [
        { label: 'Digital system - quick and easy', value: 'digital', opportunityScore: 2, adminSavingsPercent: 10 },
        { label: 'Paper forms - takes time but manageable', value: 'paper', opportunityScore: 7, adminSavingsPercent: 40 },
        { label: 'Huge burden - evenings spent on paperwork', value: 'burden', opportunityScore: 10, adminSavingsPercent: 55 },
      ],
    },
    {
      id: 'part-p',
      question: 'How confident are you with Part P notifications?',
      category: 'systems',
      options: [
        { label: 'Very confident - never miss one', value: 'confident', opportunityScore: 3 },
        { label: 'Sometimes unsure what needs notifying', value: 'unsure', opportunityScore: 7 },
        { label: 'Worried I might miss something', value: 'worried', opportunityScore: 9 },
      ],
    },
  ],
  'Plumbing & Heating': [
    {
      id: 'emergency-calls',
      question: 'How do you handle out-of-hours emergency calls?',
      category: 'calls',
      options: [
        { label: 'Dedicated on-call system', value: 'system', opportunityScore: 3, revenuePotential: 15000 },
        { label: 'I answer when I can', value: 'personal', opportunityScore: 7, revenuePotential: 35000 },
        { label: 'Miss most of them - phone off after hours', value: 'miss', opportunityScore: 10, revenuePotential: 60000 },
      ],
    },
    {
      id: 'gas-safe',
      question: 'How do you track Gas Safe certificate renewals?',
      category: 'systems',
      options: [
        { label: 'Automated reminders in software', value: 'automated', opportunityScore: 2 },
        { label: 'Spreadsheet or diary reminders', value: 'manual', opportunityScore: 6 },
        { label: 'Rely on memory or customer requests', value: 'memory', opportunityScore: 10 },
      ],
    },
  ],
  'Construction & Main Contractors': [
    {
      id: 'payment-terms',
      question: 'How long does it typically take to get paid?',
      category: 'payments',
      options: [
        { label: 'Within 14 days usually', value: '14-days', opportunityScore: 2, revenuePotential: 5000 },
        { label: '30-45 days on average', value: '30-45', opportunityScore: 6, revenuePotential: 20000 },
        { label: '60+ days - constant chasing', value: '60+', opportunityScore: 10, revenuePotential: 45000 },
      ],
    },
    {
      id: 'subcontractor-comms',
      question: 'How do you coordinate with subcontractors?',
      category: 'systems',
      options: [
        { label: 'Project management software', value: 'software', opportunityScore: 3 },
        { label: 'WhatsApp groups and phone calls', value: 'whatsapp', opportunityScore: 6 },
        { label: 'Lots of chasing - often no-shows', value: 'chasing', opportunityScore: 10, adminSavingsPercent: 30 },
      ],
    },
  ],
  'Landscaping Contractors': [
    {
      id: 'weather-scheduling',
      question: 'How do you handle weather disruptions?',
      category: 'admin',
      options: [
        { label: 'Software helps reschedule automatically', value: 'software', opportunityScore: 2, adminSavingsPercent: 10 },
        { label: 'Manual rescheduling - time consuming', value: 'manual', opportunityScore: 7, adminSavingsPercent: 35 },
        { label: 'Chaos - calling customers one by one', value: 'chaos', opportunityScore: 10, adminSavingsPercent: 50 },
      ],
    },
  ],
  'Restaurants': [
    {
      id: 'no-shows',
      question: 'How big a problem are reservation no-shows?',
      category: 'payments',
      options: [
        { label: 'Rare - we take deposits', value: 'deposits', opportunityScore: 3, revenuePotential: 5000 },
        { label: 'Occasional issue', value: 'occasional', opportunityScore: 6, revenuePotential: 15000 },
        { label: 'Major problem - costs us significantly', value: 'major', opportunityScore: 10, revenuePotential: 40000 },
      ],
    },
    {
      id: 'phone-during-service',
      question: 'Who answers the phone during busy service?',
      category: 'calls',
      options: [
        { label: 'Dedicated front of house staff', value: 'dedicated', opportunityScore: 3, revenuePotential: 10000 },
        { label: 'Whoever is free - often missed', value: 'whoever', opportunityScore: 8, revenuePotential: 45000 },
        { label: 'Goes unanswered during service', value: 'unanswered', opportunityScore: 10, revenuePotential: 70000 },
      ],
    },
  ],
  'Veterinary Practices': [
    {
      id: 'clinical-notes',
      question: 'How do you handle clinical documentation?',
      category: 'admin',
      options: [
        { label: 'Voice-to-text or quick templates', value: 'efficient', opportunityScore: 3, adminSavingsPercent: 15 },
        { label: 'Type up during appointments', value: 'during', opportunityScore: 6, adminSavingsPercent: 30 },
        { label: 'Catching up after hours', value: 'after-hours', opportunityScore: 10, adminSavingsPercent: 50 },
      ],
    },
    {
      id: 'insurance-claims',
      question: 'How painful is insurance claim processing?',
      category: 'admin',
      options: [
        { label: 'Streamlined process', value: 'streamlined', opportunityScore: 2, adminSavingsPercent: 10 },
        { label: 'Time-consuming but manageable', value: 'manageable', opportunityScore: 6, adminSavingsPercent: 30 },
        { label: 'Nightmare - different portals, lots of errors', value: 'nightmare', opportunityScore: 10, adminSavingsPercent: 50 },
      ],
    },
  ],
  'Roofing Contractors': [
    {
      id: 'storm-calls',
      question: 'How do you handle call surges after storms?',
      category: 'calls',
      options: [
        { label: 'Answering service or extra staff', value: 'prepared', opportunityScore: 4, revenuePotential: 20000 },
        { label: 'Try to answer as many as possible', value: 'try', opportunityScore: 7, revenuePotential: 45000 },
        { label: 'Miss most - overwhelmed', value: 'overwhelmed', opportunityScore: 10, revenuePotential: 80000 },
      ],
    },
  ],
  'Painting & Decorating': [
    {
      id: 'quoting-time',
      question: 'How long do you spend on quotes that don\'t convert?',
      category: 'admin',
      options: [
        { label: 'Quick estimates first, detailed only if serious', value: 'efficient', opportunityScore: 3, adminSavingsPercent: 15 },
        { label: 'Visit every enquiry, detailed quote each time', value: 'detailed', opportunityScore: 8, adminSavingsPercent: 40 },
        { label: 'Hours per quote, most don\'t convert', value: 'hours', opportunityScore: 10, adminSavingsPercent: 55 },
      ],
    },
  ],
}

// Fallback for sectors not specifically mapped
export const defaultSectorQuestions: QuizQuestion[] = [
  {
    id: 'booking-system',
    question: 'How do customers book appointments with you?',
    category: 'systems',
    options: [
      { label: 'Online booking system', value: 'online', opportunityScore: 2 },
      { label: 'Phone calls only', value: 'phone', opportunityScore: 7, revenuePotential: 30000 },
      { label: 'Mix - but mostly phone', value: 'mix', opportunityScore: 5, revenuePotential: 15000 },
    ],
  },
]

// Calculate potential savings based on answers
export function calculateSavings(answers: Record<string, string>, questions: QuizQuestion[]): {
  adminHoursSaved: number
  annualRevenuePotential: number
  adminReductionPercent: number
} {
  let totalAdminPercent = 0
  let adminQuestionCount = 0
  let totalRevenue = 0

  // Get admin hours from the answer
  const adminHoursAnswer = answers['admin-hours']
  let weeklyAdminHours = 5 // default
  if (adminHoursAnswer === '5-10') weeklyAdminHours = 7.5
  if (adminHoursAnswer === '10-20') weeklyAdminHours = 15
  if (adminHoursAnswer === '20+') weeklyAdminHours = 25

  questions.forEach(q => {
    const answer = answers[q.id]
    const option = q.options.find(o => o.value === answer)
    if (option) {
      if (option.adminSavingsPercent) {
        totalAdminPercent += option.adminSavingsPercent
        adminQuestionCount++
      }
      if (option.revenuePotential) {
        totalRevenue += option.revenuePotential
      }
    }
  })

  const avgAdminReduction = adminQuestionCount > 0 ? Math.round(totalAdminPercent / adminQuestionCount) : 30
  const hoursSaved = Math.round((weeklyAdminHours * avgAdminReduction / 100) * 10) / 10

  return {
    adminHoursSaved: hoursSaved,
    annualRevenuePotential: totalRevenue,
    adminReductionPercent: avgAdminReduction,
  }
}

// Calculate opportunity score (0-100)
export function calculateOpportunityScore(answers: Record<string, string>, questions: QuizQuestion[]): number {
  let totalScore = 0
  let maxScore = 0

  questions.forEach(q => {
    const answer = answers[q.id]
    const option = q.options.find(o => o.value === answer)
    if (option) {
      totalScore += option.opportunityScore
    }
    // Max possible for this question
    maxScore += Math.max(...q.options.map(o => o.opportunityScore))
  })

  if (maxScore === 0) return 0
  return Math.round((totalScore / maxScore) * 100)
}

// Get category label and messaging based on score
export function getScoreCategory(score: number): {
  label: string
  headline: string
  message: string
  color: string
  bgColor: string
  borderColor: string
  strokeColor: string
} {
  if (score >= 75) {
    return {
      label: 'High Opportunity',
      headline: 'Significant automation potential identified',
      message: 'Your current processes have substantial room for improvement. AI automation could transform how you work, recover lost revenue, and give you back hours every week.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      strokeColor: '#059669',
    }
  }
  if (score >= 50) {
    return {
      label: 'Good Opportunity',
      headline: 'Clear opportunities for improvement',
      message: 'You have solid foundations but there are specific areas where automation could save you significant time and help capture more business.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      strokeColor: '#4f46e5',
    }
  }
  if (score >= 25) {
    return {
      label: 'Some Opportunity',
      headline: 'Targeted improvements possible',
      message: 'You\'re already fairly well organised, but there are still areas where AI could enhance your efficiency and client experience.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      strokeColor: '#d97706',
    }
  }
  return {
    label: 'Already Optimised',
    headline: 'You\'re ahead of the curve',
    message: 'Your business is already well-systematised. There may still be advanced AI capabilities that could give you a competitive edge.',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    strokeColor: '#64748b',
  }
}
