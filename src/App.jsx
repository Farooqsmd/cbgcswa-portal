import React from 'react';
import Navbar from './components/Navbar';
import TickerNotice from './components/TickerNotice';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ObjectivesSection from './components/ObjectivesSection';
import AdvocacySection from './components/AdvocacySection';
import LeadershipSection from './components/LeadershipSection';
import MembershipSection from './components/MembershipSection';
import DownloadsSection from './components/DownloadsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <TickerNotice />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <AdvocacySection />
        <LeadershipSection />
        <MembershipSection />
        <DownloadsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
