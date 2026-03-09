import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-xs font-medium text-muted-foreground">
              Applications Open for 2026 Cohort
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6 tracking-tight text-foreground">
            India's Next Generation of{" "}
            <span className="text-primary">Founders</span>{" "}
            Starts Here
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Validate your idea, build your MVP, connect with mentors and prepare for funding — all before graduation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/apply" className="btn-primary flex items-center justify-center gap-2 text-sm">
              Apply for Pre-Incubation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/survey" className="btn-outline flex items-center justify-center gap-2 text-sm">
              Take Readiness Survey
            </Link>
          </div>

          <div className="flex items-center gap-10 mt-12 pt-8 border-t border-border">
            {[
              { value: "500+", label: "Student Founders" },
              { value: "50+", label: "Mentors" },
              { value: "₹10Cr+", label: "Funding Raised" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
