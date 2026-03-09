import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-20">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Pre-Incubation Launchpad
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="text-foreground">India's Next Generation of </span>
              <span className="glow-blue">Founders</span>
              <span className="text-foreground"> Starts Here</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Validate your idea, build your MVP, connect with mentors and prepare for funding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="btn-primary-glow flex items-center justify-center gap-2 text-base">
                Apply for Pre-Incubation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/survey" className="btn-outline-glow flex items-center justify-center gap-2 text-base">
                Take Readiness Survey
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-10">
              {[
                { value: "500+", label: "Student Founders" },
                { value: "50+", label: "Mentors" },
                { value: "₹10Cr+", label: "Funding Raised" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl md:text-2xl font-display font-bold glow-blue">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden gradient-border">
              <img
                src={heroImg}
                alt="Startup ecosystem illustration showing founders building innovative products"
                className="w-full rounded-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
