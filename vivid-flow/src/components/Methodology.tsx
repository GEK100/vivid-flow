'use client'

import { motion } from 'framer-motion'
import { Search, Wrench, Rocket, Headphones } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit & Discovery',
    description: 'We map your current processes to identify high-friction, low-value tasks suitable for automation.',
    timeframe: 'Week 1',
    details: [
      'Process mapping workshop',
      'Tool stack assessment',
      'ROI opportunity analysis'
    ]
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Build & Integration',
    description: 'We configure the AI agents and connect your software stack in a secure staging environment.',
    timeframe: 'Week 2-3',
    details: [
      'Custom workflow development',
      'API integrations',
      'Security & compliance setup'
    ]
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Train',
    description: 'We go live, train your team on how to interact with the system, and provide intensive monitoring.',
    timeframe: 'Week 4',
    details: [
      'Guided deployment',
      'Staff training sessions',
      '30-day active monitoring'
    ]
  },
  {
    number: '04',
    icon: Headphones,
    title: 'Optimise & Support',
    description: 'Ongoing refinement based on real usage data, plus dedicated support for any questions.',
    timeframe: 'Ongoing',
    details: [
      'Monthly performance reviews',
      'Continuous improvements',
      'Priority support access'
    ]
  },
]

export default function Methodology() {
  return (
    <section id="methodology" className="py-24 lg:py-32 bg-stone-50 grain relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Methodology
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
            The Implementation Process
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We don't disrupt your business. We layer intelligence on top of what already works.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 lg:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-md z-10" />

                {/* Content Card */}
                <div className={`lg:w-1/2 pl-20 lg:pl-0 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className={`bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow ${
                    i % 2 === 0 ? 'lg:ml-auto' : ''
                  } max-w-md`}>
                    {/* Step Header */}
                    <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className={i % 2 === 0 ? 'lg:text-right' : ''}>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          {step.timeframe}
                        </span>
                        <h3 className="text-xl font-display font-bold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-slate-600 text-sm mb-4 leading-relaxed ${
                      i % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className={`space-y-2 ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {step.details.map((detail, j) => (
                        <li
                          key={j}
                          className={`text-xs text-slate-500 flex items-center gap-2 ${
                            i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-indigo-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
