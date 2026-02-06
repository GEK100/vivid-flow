import {
  Calculator,
  Scale,
  Zap,
  Droplets,
  Building2,
  Trees,
  UtensilsCrossed,
  Stethoscope,
  Home,
  Paintbrush,
  HardHat,
  Briefcase,
  Heart,
} from 'lucide-react'

export interface Problem {
  title: string
  description: string
}

export interface Solution {
  title: string
  description: string
}

export interface Sector {
  icon: React.ElementType
  title: string
  tagline: string
  color: string
  bgColor: string
  problems: Problem[]
  solutions: Solution[]
  stats: string
}

export interface SectorGroup {
  id: string
  label: string
  description: string
  icon: React.ElementType
  sectorTitles: string[]
}

export const sectorGroups: SectorGroup[] = [
  {
    id: 'trades',
    label: 'Trades & Construction',
    description: 'Electricians, plumbers, roofers, builders, landscapers, decorators',
    icon: HardHat,
    sectorTitles: [
      'Electrical Contractors',
      'Plumbing & Heating',
      'Construction & Main Contractors',
      'Landscaping Contractors',
      'Roofing Contractors',
      'Painting & Decorating',
    ],
  },
  {
    id: 'professional',
    label: 'Professional Services',
    description: 'Accountants, solicitors, and legal practices',
    icon: Briefcase,
    sectorTitles: ['Accountancy', 'Legal & Solicitors'],
  },
  {
    id: 'hospitality',
    label: 'Hospitality & Care',
    description: 'Restaurants, veterinary practices, and care providers',
    icon: Heart,
    sectorTitles: ['Restaurants', 'Veterinary Practices'],
  },
]

export const sectors: Sector[] = [
  {
    icon: Calculator,
    title: 'Accountancy',
    tagline: 'Reclaim your evenings from admin chaos',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    stats: '77% cite document chasing as #1 challenge',
    problems: [
      {
        title: 'Document Chasing Hell',
        description: '77% of accountants say chasing clients for information is their biggest challenge. Jobs held up for weeks, strained relationships, and low-value work eating into professional time.'
      },
      {
        title: 'January Self Assessment Nightmare',
        description: '55% of UK accountants report burnout. 25% of tax returns started and finished in January alone. Extreme stress, quality suffers, and staff leave the profession.'
      },
      {
        title: 'Poor Quality Bookkeeping',
        description: 'Hours spent correcting errors from client bookkeepers. Scope creep with extra work not covered by fees. VAT errors leading to penalties.'
      },
      {
        title: 'HMRC Service Delays',
        description: 'Agent authorisation codes taking 10+ days. Replies to letters arriving years late. Hours wasted on hold affecting deadlines.'
      }
    ],
    solutions: [
      {
        title: 'Intelligent Document Collection Agent',
        description: 'AI sends personalised, escalating reminders via email/SMS/WhatsApp. Validates document types, auto-chases at intervals, and flags non-responders for human escalation.'
      },
      {
        title: 'Self Assessment Preparation Agent',
        description: 'Proactive client outreach from September. Pre-populated draft returns using historical data. Priority scoring to identify which clients need attention.'
      },
      {
        title: 'AI Voice Receptionist',
        description: '24/7 call answering with intelligent qualification. Appointment booking, FAQ handling, and warm handoff. Captures 2-4 new clients per month typically missed.'
      },
      {
        title: 'Automated Credit Control',
        description: 'Intelligent payment reminder sequences. Automatic reconciliation with accounting software. Early warning flags for payment pattern changes.'
      }
    ]
  },
  {
    icon: Scale,
    title: 'Legal & Solicitors',
    tagline: 'Reduce complaints, recover billable hours',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    stats: '92% of UK lawyers report stress or burnout',
    problems: [
      {
        title: 'Time Recording Frustration',
        description: 'Lawyers achieve only 30-37% utilization rates, spending less than 3 hours daily on billable work. Time recording is "the bane of your life."'
      },
      {
        title: 'Email Overload',
        description: '100-120 emails received daily. Critical information slips through the cracks. Delayed responses lead to frustrated clients and missed deadlines.'
      },
      {
        title: 'Poor Client Communication',
        description: '24% of Legal Ombudsman complaints relate to poor communication. 23% about delay and failure to progress. Leading cause of complaints industry-wide.'
      },
      {
        title: 'Missed Calls and Lost Business',
        description: '1 in 5 new enquiries go unanswered. 67% of clients choose the first attorney who answers. 80% of calls going to voicemail never leave a message.'
      }
    ],
    solutions: [
      {
        title: 'AI Legal Receptionist',
        description: '24/7 AI voice agent answering calls. Intelligent qualification and triage. Captures matter details, books consultations, and provides warm handoff.'
      },
      {
        title: 'Intelligent Time Capture',
        description: 'AI monitors calls, emails, and document work. Automatically categorizes by matter, generates narrative descriptions. Could recover 15-25% of currently unbilled time.'
      },
      {
        title: 'Client Communication Automation',
        description: 'Automated matter status updates at key milestones. AI chatbot for routine queries 24/7. Proactive communication triggers and sentiment analysis.'
      },
      {
        title: 'Instant Client Onboarding',
        description: 'Digital ID verification with biometric matching. Automated conflict checking. 80% reduction in due diligence time reported.'
      }
    ]
  },
  {
    icon: Zap,
    title: 'Electrical Contractors',
    tagline: 'Stop the paperwork, capture every call',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    stats: '72% worry about losing work to missed calls',
    problems: [
      {
        title: 'Certification and Paperwork Burden',
        description: 'Electricians report 20-30% of their week consumed by admin. 8-page certification forms under BS7671. Evenings and weekends lost to paperwork.'
      },
      {
        title: 'Missed Calls While Working',
        description: '72% of electricians worry about losing work from missed calls. 70% of callers do not leave voicemails. Annual revenue loss estimated at £50,000-100,000.'
      },
      {
        title: 'Late Payment Epidemic',
        description: '81% of tradespeople currently owe money, chasing an average of £6,210. 32% report anxiety from chasing payments. Time away from paid work.'
      },
      {
        title: 'Part P Compliance Anxiety',
        description: 'Local authority prosecution up to £5,000 for non-notified work. Insurance invalidation risk. Complex notification requirements.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Answers within 2 rings, 24/7. Captures job details, provides ballpark quotes for standard work. Books appointments and sends SMS confirmations.'
      },
      {
        title: 'Voice-to-Certificate Agent',
        description: 'Voice notes from electricians auto-generate BS7671 compliant certificates. Pre-populates test results, integrates with scheme provider portals.'
      },
      {
        title: 'Intelligent Payment Chase Agent',
        description: 'Automated, graduated reminders via email/SMS/WhatsApp. Late payment interest calculation. Escalation triggers for County Court claims.'
      },
      {
        title: 'Compliance Guardian System',
        description: 'Job classification for notifiable work. Deadline tracking for building control. Certificate completion verification before job marked complete.'
      }
    ]
  },
  {
    icon: Droplets,
    title: 'Plumbing & Heating',
    tagline: 'Never miss an emergency call again',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    stats: '\u00A350,000+ lost annually to missed calls',
    problems: [
      {
        title: 'Missed Calls While Under Sinks',
        description: '78% of customers choose the first company that responds. Missing 150 calls monthly equals approximately \u00A311,475 in lost revenue. Emergencies cannot wait.'
      },
      {
        title: 'Invoicing and Payment Chasing',
        description: '62% of British plumbers face late payments. Average monthly bad debt of \u00A31,062. "2 hours every night catching up on invoices instead of with family."'
      },
      {
        title: 'Emergency Call-Out Burnout',
        description: 'Plumbing emergencies do not stick to 9-to-5. Late nights, early mornings, weekends, and holidays. Stress described as "an understatement."'
      },
      {
        title: 'Gas Safe Certificate Tracking',
        description: '\u00A36,000 fine PER APPLIANCE for non-compliance. Potential prison sentence. No grace period for expired certificates.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: '24/7 call answering. Qualifies leads (emergency vs routine), captures job details. Provides availability windows and sends instant confirmations.'
      },
      {
        title: 'AI Emergency Triage System',
        description: 'Assesses genuine emergency vs can-wait. Provides self-help guidance, quotes call-out rates, takes payment upfront for qualified emergencies.'
      },
      {
        title: 'WhatsApp Invoice Assistant',
        description: 'Voice notes converted to draft invoices. Auto-populates customer details and pricing. Automated payment reminder sequences.'
      },
      {
        title: 'Gas Safe Compliance Tracker',
        description: 'Database of all certificates with graduated reminders. Auto-generates renewal booking links. Landlord portfolio tracking.'
      }
    ]
  },
  {
    icon: Building2,
    title: 'Construction & Main Contractors',
    tagline: 'Get paid faster, coordinate smarter',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    stats: '\u00A330 million owed in unpaid invoices industry-wide',
    problems: [
      {
        title: 'Payment Chasing Crisis',
        description: '30% of construction businesses spend 7+ hours weekly chasing late payments. Average payment time is 45 days vs 23 days in other sectors. 50,000 UK businesses close yearly due to late payments.'
      },
      {
        title: 'Missed Calls and Lead Leakage',
        description: '27% of calls go unanswered. Less than 3% leave voicemails. Estimated \u00A345,000-250,000 annual lost revenue from missed calls.'
      },
      {
        title: 'Subcontractor No-Shows',
        description: '87% of projects face delays or cost overruns. One non-performing subcontractor can derail an entire job. Domino effect through all following trades.'
      },
      {
        title: 'Quoting Time Drain',
        description: 'Traditional takeoff can take 2-3 days to a week. Average manual estimate takes 8 hours. 80% of quote time wasted on estimates that never convert.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Answers within 2 rings, qualifies leads, provides ballpark quotes, and books appointments. WhatsApp/SMS bot for missed call follow-up.'
      },
      {
        title: 'Automated Payment Chasing Agent',
        description: 'Monitors due dates, sends graduated reminder sequences. Predictive cash flow dashboard forecasting 30-60 days ahead.'
      },
      {
        title: 'Subcontractor Communication Hub',
        description: 'Automated attendance confirmation 48/24/2 hours before work. Automatically seeks backup if no response. Trade coordination optimization.'
      },
      {
        title: 'AI Quote Generator',
        description: 'Upload drawings/photos for AI takeoff in minutes. Dynamic pricing engine with real-time material costs. Voice-to-quote capability.'
      }
    ]
  },
  {
    icon: Trees,
    title: 'Landscaping Contractors',
    tagline: 'Weather-proof your schedule and income',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    stats: '70% of landscaping businesses fail within 18 months',
    problems: [
      {
        title: 'Missed Calls = Missed Revenue',
        description: 'One contractor reported 187 missed calls in a single day. 70% of callers will not leave voicemail - they call the next company. Estimated \u00A378,000-156,000 annual loss.'
      },
      {
        title: 'Evening Paperwork Nightmare',
        description: 'Logging onto admin at 10:30-11pm. Family time sacrificed for invoicing and quotes. Burnout leading to business failure.'
      },
      {
        title: 'Invoicing and Payment Chasing',
        description: '64% of clients delay payment beyond 60 days. One contractor spent 1.5 hours admin chasing a \u00A3180 job. 10-15% annual revenue loss from unpaid invoices.'
      },
      {
        title: 'Weather Rescheduling Chaos',
        description: 'Rain brings work to standstill. Rescheduling cascades through entire schedule. Customer-by-customer notification is a "huge pain."'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Answers within 2 rings, captures project scope and timeline. Provides ballpark estimates, books appointments, sends SMS confirmations.'
      },
      {
        title: 'Voice-to-Invoice System',
        description: 'Dictate job completion details via mobile or WhatsApp. AI generates draft invoices, requires one-tap approval. Eliminates 2+ hours evening admin.'
      },
      {
        title: 'Automated Payment Collection',
        description: 'Graduated reminder sequences: friendly to firm to final notice. Includes instant payment links. Automatic handoff to collection at 30 days.'
      },
      {
        title: 'Weather-Intelligent Scheduling',
        description: 'Monitors forecasts, pre-emptively reschedules affected jobs. Batch SMS/email notifications. Optimizes routes when shuffling jobs.'
      }
    ]
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    tagline: 'Fill every table, answer every call',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    stats: '\u00A316 billion lost annually to no-shows',
    problems: [
      {
        title: 'Missed Phone Calls',
        description: '65% of calls missed by hospitality venues. 43% of restaurant phone calls go unanswered, costing up to \u00A3230,000 annually. 71% of calls are revenue-related.'
      },
      {
        title: 'Staff Shortages Crisis',
        description: '132,000 vacancies - 48% above pre-pandemic levels. 86% say labour shortages are worse than during COVID. 52% average turnover rate.'
      },
      {
        title: 'Reservation No-Shows',
        description: 'Estimated \u00A316 billion annual cost to UK hospitality. Just 6 no-shows in a 40-seat restaurant can make the difference between profit and loss.'
      },
      {
        title: 'Allergen Compliance Fear',
        description: 'Fatal incidents from miscommunication about allergens. Owen died from buttermilk in chicken despite informing staff. Criminal prosecution risk.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Answers every call 24/7. Handles reservations, checks live availability. Qualifies large party enquiries and sends instant confirmation.'
      },
      {
        title: 'Intelligent No-Show Prevention',
        description: 'Multi-channel reminder sequences. AI prediction model for high-risk bookings. Automated deposit collection and waitlist management.'
      },
      {
        title: 'AI Allergen Compliance Guardian',
        description: 'Digital allergen matrix for every menu item. AI checks every ticket for allergen flags. Voice confirmation from chef before sensitive dishes leave kitchen.'
      },
      {
        title: 'Direct Ordering Channel',
        description: 'AI-powered ordering chatbot for WhatsApp/Instagram. Intelligent upselling. Escape 25-35% delivery platform commissions.'
      }
    ]
  },
  {
    icon: Stethoscope,
    title: 'Veterinary Practices',
    tagline: 'Reduce admin, protect your wellbeing',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    stats: 'Suicide rates 3-4x higher than general population',
    problems: [
      {
        title: 'Receptionist Phone Overload',
        description: '"The exact numbers were frightening" - UK practice owner on missed calls. Lost clients, frustrated existing clients, and overwhelmed receptionists.'
      },
      {
        title: 'Clinical Documentation Consuming Evenings',
        description: '60.3% cite poor work-life balance as main reason for wanting to leave. Multiple unpaid hours daily on charts. Contributes to burnout crisis.'
      },
      {
        title: 'Insurance Claims Nightmare',
        description: 'Different portals for each insurer. Incomplete claims cause delays. Practices now charging \u00A310-50 admin fees per claim.'
      },
      {
        title: 'Client Non-Payment Crisis',
        description: '90% of vets have performed unpaid work. Industry bad debt estimated at \u00A3265-530 million annually. Average \u00A3676/month per practice.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Answers within 2 rings, 24/7. Handles bookings, prescription refills, and basic triage. Routes emergencies to on-call vet.'
      },
      {
        title: 'AI Veterinary Scribe',
        description: 'Records consultations, generates SOAP notes automatically. Voice-to-text with veterinary terminology. 70-80% documentation time reduction target.'
      },
      {
        title: 'Insurance Claims Automation',
        description: 'Auto-extracts clinical data, pre-populates claim forms. Validates completeness before submission. Tracks status across portals.'
      },
      {
        title: 'Intelligent Payment Management',
        description: 'Pre-appointment cost estimates. Real-time payment plan setup. Automated graduated reminders with instant payment links.'
      }
    ]
  },
  {
    icon: Home,
    title: 'Roofing Contractors',
    tagline: 'Capture storm damage leads, get paid on time',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    stats: '45% experience late payments damaging cash flow',
    problems: [
      {
        title: 'Missed Calls = Lost Revenue',
        description: '27% of leads call outside business hours. Missing one call can mean losing a \u00A3100,000+ commercial job. First responder advantage lost.'
      },
      {
        title: 'Cash Flow Crisis from Late Payments',
        description: '45% experienced payment delays. 39% not paid within 45 days. Construction accounts for 17% of insolvencies despite being 8% of economy.'
      },
      {
        title: 'Weather Scheduling Chaos',
        description: '"Every day starts with a plan, and by mid-morning, weather shifts." Domino effect through schedule. Angry customers leave negative reviews.'
      },
      {
        title: 'Labour Crisis',
        description: '61% of commercial contractors say labour shortage is biggest concern. 45% struggle to hire qualified staff. Fewer than 50% of apprentices complete training.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: '24/7 answering. Qualifies leads, provides ballpark quotes, books appointments. Escalates emergencies with context.'
      },
      {
        title: 'Automated Payment Collection',
        description: 'Graduated reminder sequences integrated with Xero/QuickBooks. Outbound AI reminder calls. Staged payment collection for larger jobs.'
      },
      {
        title: 'Weather-Intelligent Scheduling',
        description: 'Real-time weather integration. Auto-reschedules when thresholds forecast. Proactive customer notifications.'
      },
      {
        title: 'Storm Response Surge System',
        description: 'Monitors weather alerts, activates emergency protocols. AI handles surge call volume. Triages by severity, books with deposits.'
      }
    ]
  },
  {
    icon: Paintbrush,
    title: 'Painting & Decorating',
    tagline: 'Quote faster, collect payment easier',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    stats: '20-25% of leads lost to missed calls',
    problems: [
      {
        title: 'Evening/Weekend Admin Trap',
        description: '"We just do not stop - quoting, admin, consultancy, washing tools, packing the van." Family time sacrificed. Burnout leading decorators to leave the trade.'
      },
      {
        title: 'Missed Calls = Lost Revenue',
        description: '60% struggle to answer phone while at work. 20-25% of work lost by missing calls. At \u00A3500-2,000 per job, equals \u00A378,000-312,000 annual loss.'
      },
      {
        title: 'Chasing Late Payments',
        description: '62% of invoices paid late. UK average 18 days late. Cash flow crises forcing delays on material purchases.'
      },
      {
        title: 'Quote-to-Nowhere Time Drain',
        description: '"Burning petrol money and time on quotes you never win." 1-2 hours per quote. Often 70%+ never convert.'
      }
    ],
    solutions: [
      {
        title: 'AI Voice Receptionist',
        description: 'Captures job details, room sizes, and timeline. Provides ballpark estimates for standard jobs. Books callbacks in decorator calendar.'
      },
      {
        title: 'Voice-to-Invoice Agent',
        description: 'Dictate job completion via WhatsApp. AI generates draft invoice in accounting software. One-tap approval eliminates 2+ hours evening admin.'
      },
      {
        title: 'Automated Payment Collection',
        description: 'Graduated SMS, email, WhatsApp reminders. Includes instant payment links. Escalates to formal letter templates with statutory interest.'
      },
      {
        title: 'Pre-Qualification System',
        description: 'AI chatbot gathers room dimensions, surface conditions, budget range. Generates preliminary estimates. Only visit serious prospects.'
      }
    ]
  }
]

export const sectorNames = sectors.map(s => s.title)
