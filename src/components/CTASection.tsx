import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight mb-4">
          Build Your Startup Before Graduation
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          Join India's most ambitious student founders. Your startup journey starts now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/apply" className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-medium px-6 py-3 rounded-lg text-sm transition-all hover:opacity-90">
            Apply for Pre-Incubation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/survey" className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-medium px-6 py-3 rounded-lg text-sm transition-all hover:bg-primary-foreground/10">
            Take Readiness Survey
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
