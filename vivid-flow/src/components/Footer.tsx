'use client'

import { Zap, Shield } from 'lucide-react'

const footerLinks = {
  solutions: [
    { name: 'AI Receptionist', href: '/#solutions' },
    { name: 'Data Dashboard', href: '/#solutions' },
    { name: 'Smart Invoicing', href: '/#solutions' },
    { name: 'CRM Integration', href: '/#solutions' },
    { name: 'Process Automation', href: '/#solutions' },
  ],
  sectors: [
    { name: 'Trades & Construction', href: '/#sectors' },
    { name: 'Professional Services', href: '/#sectors' },
    { name: 'Hospitality & Care', href: '/#sectors' },
  ],
  tools: [
    { name: 'ROI Calculator', href: '/roi-calculator' },
    { name: 'AI Opportunity Assessment', href: '/assessment' },
  ],
  company: [
    { name: 'Contact', href: '/#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white group-hover:bg-indigo-500 transition-colors">
                <Zap className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Vivid<span className="text-indigo-500">Flow</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Vivid Flow builds bespoke AI infrastructure for UK SMEs. We combine
              enterprise-grade automation with local business pragmatism.
            </p>

          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-4">Sectors</h4>
            <ul className="space-y-3">
              {footerLinks.sectors.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-4">Free Tools</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Vivid Flow. All rights reserved.
          </p>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full">
            <Shield className="w-3 h-3 text-slate-500" />
            <p className="text-xs text-slate-500">
              Vivid Flow is a trading name of Ictus Flow Ltd. Registered in England & Wales.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
