import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-[104px] md:pt-[132px] bg-[#F5F5F5]">
      {/* Breaking News Ticker */}
      <div className="bg-[#111111] text-white border-b border-white/10 py-2.5">
        <div className="container mx-auto px-4 md:px-8 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#E50914] px-2 py-0.5 rounded-sm text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
            <TrendingUp className="w-3 h-3" />
            Breaking
          </div>
          <div className="text-sm font-medium text-white/90 truncate">
            Applications for the 2026 Founder Forge Cohort are now officially
            open. Early bird deadline ends in 14 days.
          </div>
        </div>
      </div>

      {/* Featured Story */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="relative rounded-sm overflow-hidden min-h-[500px] md:min-h-[600px] flex items-end group cursor-pointer border border-[#E5E5E5] shadow-sm">
          {/* Background Image (placeholder) */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />

          {/* Refined Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent opacity-90" />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-12 w-full max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#E50914] text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wide">
                Featured
              </span>
              <span className="text-white/80 text-sm font-medium">
                May 15, 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight text-white group-hover:text-white/90 transition-colors">
              India's Next Generation of Founders Starts Here
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed font-light">
              Validate your idea, build your MVP, connect with elite mentors and
              prepare for seed funding — an inside look at the new 2026
              incubation cohort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/apply"
                className="bg-[#E50914] hover:bg-[#c40812] text-white text-sm font-medium px-6 py-3 transition-all rounded-sm inline-flex items-center justify-center gap-2"
              >
                Apply for Pre-Incubation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/survey"
                className="border border-white/30 hover:border-white/60 hover:bg-white/5 text-white bg-transparent text-sm font-medium px-6 py-3 transition-all rounded-sm inline-flex items-center justify-center"
              >
                Take Readiness Survey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
