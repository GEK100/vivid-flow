import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Vivid Flow',
  description: 'Terms of Service for Vivid Flow (trading as Ictus Flow Ltd) - AI consultancy and automation services.',
};

export default function TermsOfService() {
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

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-xl text-indigo-400 font-semibold mb-2">Vivid Flow (trading as Ictus Flow Ltd)</p>
        <p className="text-slate-400 text-lg mb-8">Last updated: February 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Vivid Flow website and services.
              Vivid Flow provides AI consultancy, automation solutions, and related services to small and medium-sized
              enterprises (&quot;SMEs&quot;).
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree
              to these Terms, you must not use our website or services.
            </p>
            <p className="text-slate-300 leading-relaxed">
              These Terms constitute a legally binding agreement between you and Vivid Flow. Please read them carefully.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">2. Definitions</h2>
            <p className="text-slate-300 leading-relaxed mb-4">In these Terms:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li><strong className="text-white">&quot;Vivid Flow&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;</strong> refers to Vivid Flow, the trading name of Ictus Flow Ltd, a company registered in England and Wales</li>
              <li><strong className="text-white">&quot;You&quot;, &quot;your&quot;</strong> refers to the individual or entity accessing our website or using our services</li>
              <li><strong className="text-white">&quot;Services&quot;</strong> refers to the AI consultancy, automation, and related services we provide</li>
              <li><strong className="text-white">&quot;Website&quot;</strong> refers to www.vividflow.co.uk and any associated subdomains</li>
              <li><strong className="text-white">&quot;Content&quot;</strong> refers to all text, images, software, code, and other materials available through our website or services</li>
              <li><strong className="text-white">&quot;Deliverables&quot;</strong> refers to any work product, reports, solutions, or materials we create for you as part of our services</li>
              <li><strong className="text-white">&quot;Free Tools&quot;</strong> refers to our ROI Calculator, AI Opportunity Assessment, and any other tools provided at no cost</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">3. Our Services</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vivid Flow provides AI consultancy and automation services to SMEs, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>AI strategy development and implementation planning</li>
              <li>Process automation and workflow optimisation</li>
              <li>Document processing and intelligent data extraction</li>
              <li>Custom AI solution development</li>
              <li>Training and knowledge transfer</li>
              <li>Ongoing support and maintenance</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              The specific scope, deliverables, timeline, and pricing for any engagement will be detailed in a separate
              Statement of Work or service agreement.
            </p>
          </section>

          {/* Section 4 - Free Tools */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">4. Free Tools and Calculators</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We provide free tools on our website, including an ROI Calculator and AI Opportunity Assessment. By using these tools,
              you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>All estimates, scores, and recommendations are provided for <strong className="text-white">informational purposes only</strong></li>
              <li>Results are based on the information you provide and general industry assumptions</li>
              <li>Estimates do not constitute a guarantee of actual savings, ROI, or outcomes</li>
              <li>Results should not be relied upon as financial, business, or professional advice</li>
              <li>Actual results from implementing AI automation may vary significantly based on your specific circumstances</li>
              <li>We recommend consulting with our team or other qualified professionals before making business decisions</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              These tools are provided &quot;as is&quot; without warranties of any kind. We are not liable for any decisions made
              or actions taken based on the output of these tools.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">5. Use of Our Website</h2>

            <h3 className="text-lg font-semibold text-white mb-2">5.1 Permitted Use</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorised access to our systems or networks</li>
              <li>Use automated tools to scrape, crawl, or extract data from our website without permission</li>
              <li>Transmit any malware, viruses, or other harmful code</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the website&apos;s operation</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">5.2 Account Registration</h3>
            <p className="text-slate-300 leading-relaxed">
              Some features of our website may require you to create an account. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities that occur under your account. You must
              notify us immediately of any unauthorised use.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">6. Intellectual Property</h2>

            <h3 className="text-lg font-semibold text-white mb-2">6.1 Our Intellectual Property</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              All content on our website, including text, graphics, logos, images, software, and the compilation thereof,
              is the property of Vivid Flow or its licensors and is protected by UK and international copyright, trademark,
              and other intellectual property laws.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              You may not reproduce, distribute, modify, or create derivative works from our content without our prior written consent.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">6.2 Deliverables</h3>
            <p className="text-slate-300 leading-relaxed mb-4">Unless otherwise agreed in writing:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Upon full payment, you will own all intellectual property rights in bespoke deliverables created specifically for you</li>
              <li>We retain ownership of any pre-existing intellectual property, methodologies, frameworks, and tools used in creating the deliverables</li>
              <li>We grant you a non-exclusive, perpetual licence to use any of our pre-existing materials incorporated into your deliverables for your internal business purposes</li>
              <li>We may retain copies of deliverables for our records and, with your consent, use anonymised case studies for marketing purposes</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">6.3 Third-Party AI Tools</h3>
            <p className="text-slate-300 leading-relaxed">
              Our services may involve the use of third-party AI platforms, APIs, and tools. Your use of such tools is
              subject to the respective third-party terms of service. We do not guarantee the availability, accuracy,
              or performance of third-party AI services.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">7. Client Responsibilities</h2>
            <p className="text-slate-300 leading-relaxed mb-4">When engaging our services, you agree to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Provide accurate, complete, and timely information required for service delivery</li>
              <li>Grant us necessary access to your systems, data, and personnel as required</li>
              <li>Ensure you have the right to share any data or content you provide to us</li>
              <li>Review and provide feedback on deliverables within agreed timeframes</li>
              <li>Make payments in accordance with agreed terms</li>
              <li>Comply with all applicable laws regarding the use of AI and automation</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">8. Data Protection</h2>

            <h3 className="text-lg font-semibold text-white mb-2">8.1 Our Commitment</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              We are committed to protecting your data and complying with the UK GDPR and Data Protection Act 2018.
              Our <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link> explains
              how we collect, use, and protect your personal data.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">8.2 Data Processing</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Where we process personal data on your behalf as part of our services, we will enter into a separate
              Data Processing Agreement that defines our respective obligations.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">8.3 AI and Data</h3>
            <p className="text-slate-300 leading-relaxed mb-4">When using AI tools as part of our services:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>We will inform you of any data that may be processed by third-party AI services</li>
              <li>We will implement appropriate safeguards to protect confidential information</li>
              <li>We will not use your confidential data to train AI models without your explicit consent</li>
              <li>You are responsible for ensuring you have appropriate consent or legal basis to process any personal data involved in our services</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">9. Confidentiality</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Both parties agree to keep confidential all non-public information disclosed during the engagement.
              This obligation does not apply to information that:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Is or becomes publicly available through no fault of the receiving party</li>
              <li>Was already known to the receiving party prior to disclosure</li>
              <li>Is independently developed without use of confidential information</li>
              <li>Is rightfully obtained from a third party without restriction</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Confidentiality obligations survive termination of these Terms for a period of three years.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">10. Limitation of Liability</h2>

            <h3 className="text-lg font-semibold text-white mb-2">10.1 Exclusions</h3>
            <p className="text-slate-300 leading-relaxed mb-4">To the maximum extent permitted by law, we exclude liability for:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from your use of third-party services or tools</li>
              <li>Damages resulting from circumstances beyond our reasonable control</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">10.2 Cap on Liability</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Our total liability for any claim arising from or related to our services shall not exceed the total fees
              paid by you for the specific services giving rise to the claim in the twelve months preceding the claim.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">10.3 Exceptions</h3>
            <p className="text-slate-300 leading-relaxed mb-4">Nothing in these Terms excludes or limits our liability for:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Death or personal injury caused by our negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any other liability that cannot be excluded by law</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">11. Warranties and Disclaimers</h2>

            <h3 className="text-lg font-semibold text-white mb-2">11.1 Our Warranties</h3>
            <p className="text-slate-300 leading-relaxed mb-4">We warrant that:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Our services will be performed with reasonable skill and care</li>
              <li>We have the right to provide the services and grant the licences described in these Terms</li>
              <li>Our employees and contractors are appropriately qualified and experienced</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">11.2 Disclaimers</h3>
            <p className="text-slate-300 leading-relaxed mb-4">Except as expressly stated:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Our website and services are provided &quot;as is&quot; without warranties of any kind</li>
              <li>We do not guarantee that AI solutions will achieve specific results or performance levels</li>
              <li>We do not warrant that our services will be uninterrupted, error-free, or secure</li>
              <li>We are not responsible for decisions made based on AI-generated outputs</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              AI technology is inherently probabilistic and may produce unexpected results. You are responsible for
              reviewing and validating all AI-generated outputs before relying on them.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">12. Indemnification</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              You agree to indemnify and hold harmless Vivid Flow and its directors, employees, and agents from any
              claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Your breach of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your use of our services in a manner not authorised by these Terms</li>
              <li>Any dispute between you and a third party relating to our services</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">13. Termination</h2>

            <h3 className="text-lg font-semibold text-white mb-2">13.1 Termination by Either Party</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Either party may terminate services by providing written notice in accordance with any applicable service
              agreement. In the absence of a specific agreement, 30 days&apos; written notice is required.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">13.2 Termination for Cause</h3>
            <p className="text-slate-300 leading-relaxed mb-4">We may terminate or suspend your access immediately if you:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Breach any material provision of these Terms</li>
              <li>Fail to make payments when due</li>
              <li>Become insolvent or enter administration</li>
              <li>Engage in conduct that damages our reputation</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">13.3 Effect of Termination</h3>
            <p className="text-slate-300 leading-relaxed mb-4">Upon termination:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>You must pay all outstanding fees for services rendered</li>
              <li>We will deliver any completed or partially completed deliverables</li>
              <li>Both parties must return or destroy confidential information upon request</li>
              <li>Provisions that by their nature should survive (including confidentiality, intellectual property, and limitation of liability) shall remain in effect</li>
            </ul>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">14. Dispute Resolution</h2>

            <h3 className="text-lg font-semibold text-white mb-2">14.1 Informal Resolution</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Before initiating formal proceedings, both parties agree to attempt to resolve disputes through good faith
              negotiation for a period of 30 days.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">14.2 Governing Law</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              These Terms are governed by and construed in accordance with the laws of England and Wales.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">14.3 Jurisdiction</h3>
            <p className="text-slate-300 leading-relaxed">
              Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">15. General Provisions</h2>

            <h3 className="text-lg font-semibold text-white mb-2">15.1 Entire Agreement</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              These Terms, together with any service agreements and our Privacy Policy, constitute the entire agreement
              between you and Vivid Flow regarding the subject matter hereof.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.2 Amendments</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              We may update these Terms from time to time. Material changes will be notified via our website or by email.
              Continued use of our services after changes take effect constitutes acceptance of the revised Terms.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.3 Severability</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall
              continue in full force and effect.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.4 Waiver</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.5 Assignment</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              You may not assign or transfer your rights under these Terms without our prior written consent. We may
              assign our rights to a successor in the event of a merger, acquisition, or sale of substantially all our assets.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.6 Force Majeure</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Neither party shall be liable for delays or failures in performance resulting from circumstances beyond
              reasonable control, including natural disasters, war, terrorism, riots, pandemics, government actions,
              or failures of third-party services.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">15.7 Third-Party Rights</h3>
            <p className="text-slate-300 leading-relaxed">
              These Terms do not create any rights enforceable by third parties under the Contracts (Rights of Third Parties) Act 1999.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">16. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-slate-300 mb-2"><strong className="text-white">Vivid Flow</strong> (trading as Ictus Flow Ltd)</p>
              <ul className="text-slate-300 space-y-1">
                <li>Email: <a href="mailto:legal@vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">legal@vividflow.co.uk</a></li>
                <li>Website: <a href="https://vividflow.co.uk" className="text-indigo-400 hover:text-indigo-300">vividflow.co.uk</a></li>
                <li>Registered in England &amp; Wales</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
