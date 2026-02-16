import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import InterSectionCTA from '@/components/InterSectionCTA'
import Sectors from '@/components/Sectors'
import Methodology from '@/components/Methodology'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <InterSectionCTA
        badge="Free Tool"
        title="How much could AI save your business?"
        description="Use our ROI calculator to estimate your potential savings in 2 minutes."
        buttonText="Calculate My ROI"
        buttonHref="/roi-calculator"
      />
      <Sectors />
      <InterSectionCTA
        badge="Quick Assessment"
        title="What's your AI automation opportunity?"
        description="Take our 2-minute assessment and get personalised recommendations."
        buttonText="Take the Quiz"
        buttonHref="/assessment"
        variant="dark"
      />
      <Methodology />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
