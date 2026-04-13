import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-20 md:py-24 bg-[#111111] border-y border-white/5 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
    />

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-sm bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-[#E50914]"
          >
            <path
              d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinelinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
          Ready to Launch Your Startup?
        </h2>
        <p className="text-white/60 mb-10 max-w-lg mx-auto text-lg font-light leading-relaxed">
          Join the national ecosystem of ambitious student founders. Validate,
          build, and pitch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 bg-[#E50914] text-white hover:bg-[#c40812] font-medium px-8 py-3.5 rounded-sm text-sm transition-colors shadow-sm"
          >
            Apply for Pre-Incubation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/survey"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-sm text-sm transition-colors"
          >
            Take Readiness Survey
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
