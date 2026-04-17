import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import JourneySection from "@/components/JourneySection";
import WhoShouldApply from "@/components/WhoShouldApply";
import EcosystemSection from "@/components/EcosystemSection";
import MentorSection from "@/components/MentorSection";
import CommunitySection from "@/components/CommunitySection";
import SuccessStories from "@/components/SuccessStories";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [showEventPopup, setShowEventPopup] = useState(true);

  useEffect(() => {
    if (showEventPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showEventPopup]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <JourneySection />
      <WhoShouldApply />
      <EcosystemSection />
      <MentorSection />
      <CommunitySection />
      <SuccessStories />
      <CTASection />
      <Footer />

      {showEventPopup && (
        <div className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-gray-200 shadow-2xl rounded-xl p-6 md:p-8">
            <p className="inline-flex items-center px-3 py-1 bg-red-50 border border-red-100 text-[#E50914] text-[11px] font-bold uppercase tracking-wider rounded-full mb-4">
              Upcoming Event Alert
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight mb-3">
              Founders Meet 2026
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Registrations are now closed for Founders Meet 2026 at T-HUB,
              Hyderabad. You can still view the event details, venue, and
              schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/events/founders-meet-2026"
                className="flex-1 text-center bg-[#E50914] hover:bg-[#c40812] text-white text-sm font-semibold px-5 py-3 rounded-sm transition-all"
              >
                View Event Details
              </Link>
              <button
                type="button"
                onClick={() => setShowEventPopup(false)}
                className="flex-1 border border-gray-300 hover:border-gray-400 text-[#111111] text-sm font-semibold px-5 py-3 rounded-sm transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
