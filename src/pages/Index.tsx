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
    </div>
  );
};

export default Index;
