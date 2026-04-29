import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import InteractivePreview from "@/components/landing/InteractivePreview";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import ComparisonSection from "@/components/landing/ComparisonSection";
import RoadmapSection from "@/components/landing/RoadmapSection";
import FAQSection from "@/components/landing/FAQSection";
import FeedbackSurvey from "@/components/landing/FeedbackSurvey";
import WaitlistCTA from "@/components/landing/WaitlistCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <InteractivePreview />
        <AgentsShowcase />
        <FeaturesGrid />
        <ComparisonSection />
        <RoadmapSection />
        <FAQSection />
        <FeedbackSurvey />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  );
}
