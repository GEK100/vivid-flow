import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Vivid Flow',
  description: 'Cookie Policy for Vivid Flow (trading as Ictus Flow Ltd) - How we use cookies on our website.',
};

export default function CookiePolicy() {
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

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-xl text-indigo-400 font-semibold mb-2">Vivid Flow (trading as Ictus Flow Ltd)</p>
        <p className="text-slate-400 text-lg mb-8">Last updated: February 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10">

          {/* Introduction */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">Introduction</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This Cookie Policy explains how Vivid Flow, the trading name of Ictus Flow Ltd (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
              uses cookies and similar technologies when you visit our website. By continuing to use our website, you
              consent to the use of cookies in accordance with this policy.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We are committed to protecting your privacy and ensuring transparency about how we collect and use data.
              This policy should be read alongside our{' '}
              <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link> and{' '}
              <Link href="/terms-of-service" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link>.
            </p>
          </section>

          {/* What Are Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Cookies are small text files placed on your device (computer, tablet, or mobile phone) when you visit a
              website. They are widely used to make websites work more efficiently, provide a better user experience,
              and give website owners information about how their site is being used.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Cookies can be &quot;persistent&quot; (remaining on your device until deleted or until they expire) or &quot;session&quot;
              cookies (deleted when you close your browser).
            </p>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">How We Use Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Our website is built as a static site and currently uses minimal cookies. We use cookies for the following purposes:
            </p>

            <h3 className="text-lg font-semibold text-white mb-4">Essential Cookies</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as
              security and accessibility. You cannot opt out of these cookies as the website cannot function properly without them.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 pr-4 text-white font-semibold">Cookie</th>
                    <th className="py-3 pr-4 text-white font-semibold">Purpose</th>
                    <th className="py-3 text-white font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/10">
                    <td className="py-3 pr-4 font-mono text-sm">cookie_consent</td>
                    <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                    <td className="py-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Analytics Cookies (Optional)</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              In the future, we may implement analytics cookies to help us understand how visitors interact with our
              website. If we do, these cookies will only be set with your explicit consent, and this policy will be
              updated to reflect the specific cookies used.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Currently, we do not use any third-party analytics, advertising, or tracking cookies.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Our website may contain links to third-party websites or embed content from third-party services.
              These third parties may set their own cookies when you interact with their content.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              We do not control the cookies set by third parties and are not responsible for them. Please refer to
              the respective privacy policies of any third-party services you interact with.
            </p>
            <p className="text-slate-300 leading-relaxed">
              If we integrate additional third-party services in the future (such as appointment scheduling or
              analytics), we will update this policy accordingly.
            </p>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences
              in the following ways:
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings
              in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. The following links may be helpful:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Safari</a></li>
            </ul>
            <p className="text-slate-300 leading-relaxed mb-6">
              Please note that blocking all cookies may impact your experience on our website and limit the functionality
              we can provide.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">Do Not Track</h3>
            <p className="text-slate-300 leading-relaxed">
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do not want your
              online activity tracked. We respect DNT signals and do not track users who have enabled this feature.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">Changes to This Cookie Policy</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our
              business practices. Any changes will be posted on this page with an updated revision date.
            </p>
            <p className="text-slate-300 leading-relaxed">
              If we make significant changes to this policy, we will notify you by placing a prominent notice on our
              website or by sending you an email (if we have your contact details).
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-slate-300 mb-2"><strong className="text-white">Vivid Flow</strong> (trading as Ictus Flow Ltd)</p>
              <ul className="text-slate-300 space-y-1">
                <li>Email: <a href="mailto:privacy@vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">privacy@vividflow.co.uk</a></li>
                <li>Website: <a href="https://vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">vividflow.co.uk</a></li>
              </ul>
            </div>
            <p className="text-slate-400 text-sm italic">
              This Cookie Policy complies with the UK GDPR, the Data Protection Act 2018, and the Privacy and Electronic
              Communications Regulations 2003 (PECR).
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
