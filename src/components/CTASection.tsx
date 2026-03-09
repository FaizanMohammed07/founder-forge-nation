import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 hero-gradient" />
    <div className="absolute inset-0 dot-grid opacity-30" />

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold glow-text mb-6">
          Build Your Startup Before Graduation
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Join India's most ambitious student founders. Your startup journey starts now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/apply" className="btn-primary-glow flex items-center justify-center gap-2 text-base">
            Apply for Pre-Incubation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/survey" className="btn-outline-glow flex items-center justify-center gap-2 text-base">
            Take Readiness Survey
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
