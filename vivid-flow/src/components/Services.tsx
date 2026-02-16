'use client'

import { motion } from 'framer-motion'
import { Bot, PieChart, FileText, Database, CheckCircle, Workflow, Headphones } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 }
}

export default function Services() {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-stone-50 grain relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
            What AI Solutions Do Small Businesses Need?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We build robust, invisible systems that run your business while you focus on the work that pays. Here are the core AI solutions that help UK SMEs save time and grow.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">

          {/* Main Feature - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 row-span-1 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                  Autonomous Receptionist
                </h3>
                <p className="text-slate-600 max-w-lg leading-relaxed">
                  Our AI agents handle initial inquiries, qualify leads, and schedule
                  appointments 24/7. It's like having a full-time admin for a fraction of the cost.
                </p>
              </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tl from-indigo-50 to-transparent rounded-tl-[100px] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            <div className="absolute right-10 bottom-10 w-20 h-20 bg-indigo-100 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rotate-12" />
          </motion.div>

          {/* Tall Card - Data Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 row-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900 z-0" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-8">
                <PieChart className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Data Clarity Dashboard
              </h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                Stop guessing. We consolidate your fragmented spreadsheets into a
                single source of truth.
              </p>
              <ul className="space-y-3">
                {['Profit per Job', 'Lead Response Time', 'Staff Utilisation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500 blur-[100px] opacity-20" />
          </motion.div>

          {/* Standard Card - Smart Invoicing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all group"
          >
            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:rotate-6 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              Smart Invoicing
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Drafts invoices automatically when a job is marked complete.
              Chases payments politely but persistently.
            </p>
          </motion.div>

          {/* Standard Card - CRM Sync */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all group"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:rotate-6 transition-transform">
              <Database className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              CRM Sync
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No more copy-pasting. We sync your email, phone logs, and
              project management tools instantly.
            </p>
          </motion.div>
        </div>

        {/* Additional Services Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all group flex items-start gap-6"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:rotate-6 transition-transform">
              <Workflow className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                Process Automation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Turn your repetitive manual tasks into automated workflows. From
                document processing to email responses, we handle the tedious work.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all group flex items-start gap-6"
          >
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:rotate-6 transition-transform">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                Ongoing Support
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We don't just build and leave. Monthly check-ins, performance
                reviews, and continuous optimisation ensure your systems evolve with your business.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Comparison Table for AI Extraction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-xl font-display font-bold text-slate-900 mb-6 text-center">
            AI Solutions Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse bg-white rounded-2xl overflow-hidden border border-slate-200">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 font-semibold text-slate-900">Solution</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">What It Does</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">AI Voice Receptionist</td>
                  <td className="px-6 py-4 text-slate-600">Answers calls, qualifies leads, books appointments 24/7</td>
                  <td className="px-6 py-4 text-slate-600">Businesses missing calls during busy periods</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Smart Invoicing</td>
                  <td className="px-6 py-4 text-slate-600">Auto-generates invoices on job completion, chases payments</td>
                  <td className="px-6 py-4 text-slate-600">Trades and service businesses with late payments</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">CRM Sync</td>
                  <td className="px-6 py-4 text-slate-600">Syncs email, phone logs, and project tools automatically</td>
                  <td className="px-6 py-4 text-slate-600">Teams using multiple disconnected systems</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Data Dashboard</td>
                  <td className="px-6 py-4 text-slate-600">Consolidates spreadsheets into a single source of truth</td>
                  <td className="px-6 py-4 text-slate-600">Business owners wanting visibility into performance</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Process Automation</td>
                  <td className="px-6 py-4 text-slate-600">Automates repetitive tasks like document processing</td>
                  <td className="px-6 py-4 text-slate-600">Any business with manual, repetitive workflows</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
