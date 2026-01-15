export const revalidate = 0;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InsurancePlans from "@/components/InsurancePlans";
import QuoteCalculator from "@/components/QuoteCalculator";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ARIAChat from "@/components/ARIAChat";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <InsurancePlans />
      <QuoteCalculator />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
      <ARIAChat />
    </main>
  );
}
