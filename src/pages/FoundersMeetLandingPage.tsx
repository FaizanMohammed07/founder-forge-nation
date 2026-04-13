import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { foundersMeetEvent } from "@/data/foundersMeetEvents";
import HeroPartnerSection from "@/components/events/founders-meet/HeroPartnerSection";
import PosterSection from "@/components/events/founders-meet/PosterSection";
import TimelineSection from "@/components/events/founders-meet/TimelineSection";
import EventEcosystemSection from "@/components/events/founders-meet/EcosystemSection";
import HighlightsSection from "@/components/events/founders-meet/HighlightsSection";
import VenueMapSection from "@/components/events/founders-meet/VenueMapSection";
import FaqSection from "@/components/events/founders-meet/FaqSection";
import "./founders-meet-register.css";

const FoundersMeetLandingPage = () => {
  const event = foundersMeetEvent;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="founders-meet-page">
      <div className="min-h-screen bg-[#030303] relative overflow-hidden pt-28 pb-20 px-6">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.12),transparent_70%)]" />
          <div className="grid-floor opacity-20" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-xs md:text-sm font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white px-3 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <Home className="w-4 h-4" />
            Back to HomePage
          </Link>

          <HeroPartnerSection event={event} />
          <PosterSection event={event} />
          <TimelineSection event={event} />
          <EventEcosystemSection event={event} />
          <HighlightsSection event={event} />
          <VenueMapSection event={event} />
          <FaqSection event={event} />
        </div>
      </div>
    </div>
  );
};

export default FoundersMeetLandingPage;
