import { HeroSection } from "@/components/blocks/hero-section-1"
import { AdvantageSection } from "@/components/blocks/advantage-section"
import { ResultsSection } from "@/components/blocks/results-section"
import { ServicesSection } from "@/components/blocks/services-section"
import { HowItWorksSection } from "@/components/blocks/how-it-works-section"
import { AuditSection } from "@/components/blocks/audit-section"
import { PricingSection } from "@/components/blocks/pricing-section"
import { ContactSection } from "@/components/blocks/contact-section"
import { FooterSection } from "@/components/blocks/footer-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdvantageSection />
      <ResultsSection />
      <ServicesSection />
      <HowItWorksSection />
      <AuditSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </>
  )
}
