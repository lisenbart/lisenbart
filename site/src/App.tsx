import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactForm from "./components/ContactForm";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      <main className="site-main site-main-stack">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
