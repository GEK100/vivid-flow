import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vivid Flow',
  description: 'Privacy Policy for Ictus Flow Ltd - How we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-xl text-indigo-400 font-semibold mb-2">Vivid Flow (trading as Ictus Flow Ltd)</p>
        <p className="text-slate-400 text-lg mb-8">Last updated: December 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">1. Who We Are</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vivid Flow, the trading name of Ictus Flow Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), is an AI consultancy
              helping UK small businesses work smarter through intelligent automation, bespoke workflows, training
              and advice. We are committed to protecting your privacy and handling your personal data transparently.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <p className="text-slate-300 mb-2"><strong className="text-white">Company Details:</strong></p>
              <ul className="text-slate-300 space-y-1">
                <li>Trading Name: Vivid Flow</li>
                <li>Registered Company: Ictus Flow Ltd</li>
                <li>Email: <a href="mailto:privacy@vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">privacy@vividflow.co.uk</a></li>
                <li>Website: <a href="https://vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">vividflow.co.uk</a></li>
                <li>ICO Registration Number: 00012435532</li>
              </ul>
            </div>
            <p className="text-slate-300 leading-relaxed">
              This policy applies to our website, our applications (including the Ictus construction management app),
              and our consultancy services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">2. What Information We Collect</h2>

            <h3 className="text-lg font-semibold text-white mb-2">Website Visitors</h3>
            <p className="text-slate-300 leading-relaxed mb-4">When you visit our website, we may collect:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Information you provide through contact forms (name, email, company, message)</li>
              <li>Technical information such as IP address, browser type, and pages visited (if analytics are enabled)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">Clients &amp; Prospects</h3>
            <p className="text-slate-300 leading-relaxed mb-4">When you enquire about or engage our consultancy services, we collect:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Contact details (name, email, phone number, company name, job title)</li>
              <li>Business information relevant to the services you&apos;re interested in</li>
              <li>Correspondence between us</li>
              <li>Billing and payment information (for invoicing purposes)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">App Users</h3>
            <p className="text-slate-300 leading-relaxed mb-4">If you use our applications (such as the Ictus blocker management app), we collect:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Account information (name, email, phone number, company, job title)</li>
              <li>Content you create (blockers, comments, project information)</li>
              <li>Photos and documents you upload</li>
              <li>Location data (only if you explicitly enable this feature)</li>
              <li>Usage data (how you interact with the app, for improvement purposes)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">3. How We Use Your Information</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 pr-4 text-white font-semibold">Purpose</th>
                    <th className="py-3 pr-4 text-white font-semibold">Data Used</th>
                    <th className="py-3 text-white font-semibold">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Providing our services</td>
                    <td className="py-3 pr-4">Account data, usage data</td>
                    <td className="py-3">Contract</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Responding to enquiries</td>
                    <td className="py-3 pr-4">Contact form data</td>
                    <td className="py-3">Legitimate interest</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Billing and invoicing</td>
                    <td className="py-3 pr-4">Billing information</td>
                    <td className="py-3">Contract / Legal</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Improving our services</td>
                    <td className="py-3 pr-4">Usage data, feedback</td>
                    <td className="py-3">Legitimate interest</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Location-based features</td>
                    <td className="py-3 pr-4">GPS coordinates</td>
                    <td className="py-3">Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Marketing (if opted in)</td>
                    <td className="py-3 pr-4">Email address</td>
                    <td className="py-3">Consent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">4. Who We Share Your Data With</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We use trusted third-party services to help us deliver our services. These service providers
              (&quot;processors&quot;) only process your data on our instructions and are bound by data protection agreements.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 pr-4 text-white font-semibold">Service</th>
                    <th className="py-3 pr-4 text-white font-semibold">Purpose</th>
                    <th className="py-3 text-white font-semibold">Data Location</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Supabase</td>
                    <td className="py-3 pr-4">Database &amp; authentication</td>
                    <td className="py-3">UK (London)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Vercel</td>
                    <td className="py-3 pr-4">Website &amp; app hosting</td>
                    <td className="py-3">UK (London)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">We may also share your data:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>With other users of our apps where necessary for the service (e.g., project team members can see project-related information)</li>
              <li>If required by law or to protect our legal rights</li>
            </ul>
            <p className="text-indigo-400 font-semibold">We never sell your personal data to third parties.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">5. International Data Transfers</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Your data is primarily stored in the United Kingdom. Where we use service providers based outside
              the UK (such as US-based cloud providers), we ensure appropriate safeguards are in place:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Standard Contractual Clauses approved by the UK ICO</li>
              <li>Data Processing Agreements with all processors</li>
              <li>UK/EU data region selection where available</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">6. How Long We Keep Your Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 pr-4 text-white font-semibold">Data Type</th>
                    <th className="py-3 text-white font-semibold">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Client contracts &amp; invoices</td>
                    <td className="py-3">7 years after completion (HMRC requirements)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">App user accounts</td>
                    <td className="py-3">Duration of account + 90 days after deletion</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Contact form enquiries</td>
                    <td className="py-3">2 years or until no longer needed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4">Location data</td>
                    <td className="py-3">6 months</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Construction evidence (claims)</td>
                    <td className="py-3">12 years (legal limitation period)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">7. Your Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Under UK GDPR, you have the following rights regarding your personal data:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Access</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can request a copy of all personal data we hold about you. For app users, you can download
                  your data directly from the app settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Rectification</h3>
                <p className="text-slate-300 leading-relaxed">
                  If any information we hold about you is inaccurate, you can ask us to correct it. App users
                  can update their profile directly in the app.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Erasure</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can ask us to delete your personal data. App users can delete their account from the app
                  settings. Note: Some data may need to be retained for legal or contractual reasons.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Restrict Processing</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can ask us to limit how we use your data in certain circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Data Portability</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can request your data in a structured, machine-readable format. App users can export their
                  data as JSON from the app.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Object</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can object to processing based on legitimate interests. We will stop processing unless we
                  have compelling grounds to continue.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Right to Withdraw Consent</h3>
                <p className="text-slate-300 leading-relaxed">
                  Where we process data based on your consent (e.g., location data, marketing), you can withdraw
                  consent at any time. This won&apos;t affect the lawfulness of processing before withdrawal.
                </p>
              </div>
            </div>

            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mt-6">
              <p className="text-slate-300">
                <strong className="text-white">To exercise any of these rights, contact us at:</strong>{' '}
                <a href="mailto:privacy@vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">privacy@vividflow.co.uk</a>
              </p>
              <p className="text-slate-400 mt-2">We will respond to your request within one month.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">8. How We Keep Your Data Safe</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We take the security of your data seriously and implement appropriate technical and organisational measures:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Encryption at rest and in transit (TLS 1.2+, AES-256)</li>
              <li>Secure password hashing</li>
              <li>Role-based access controls</li>
              <li>Regular security reviews</li>
              <li>UK-based data storage where possible</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">9. Cookies</h2>
            <p className="text-slate-300 leading-relaxed">
              Our website uses essential cookies that are necessary for the website to function. These do not
              require consent. We also use analytics cookies to understand how visitors use our website. These
              are only set with your consent, which you can manage using our cookie banner.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Our services are designed for business use and are not intended for children under 18. We do not
              knowingly collect personal data from children.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any significant changes
              by email or through our website. The &quot;Last updated&quot; date at the top of this policy indicates when
              it was last revised.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">12. How to Complain</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any concerns about how we handle your personal data, please contact us first and we
              will do our best to resolve the issue.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO),
              the UK&apos;s data protection regulator:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <ul className="text-slate-300 space-y-1">
                <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">ico.org.uk</a></li>
                <li>Phone: 0303 123 1113</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
