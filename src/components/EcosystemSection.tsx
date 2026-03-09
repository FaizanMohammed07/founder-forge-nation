import { motion } from "framer-motion";
import { GraduationCap, Beaker, Building, Rocket, Banknote, TrendingUp } from "lucide-react";

const steps = [
  { icon: GraduationCap, label: "Student" },
  { icon: Beaker, label: "Pre-Incubation" },
  { icon: Building, label: "Incubation" },
  { icon: Rocket, label: "Accelerator" },
  { icon: Banknote, label: "Funding" },
  { icon: TrendingUp, label: "Startup Growth" },
];

const EcosystemSection = () => (
  <section className="py-24 md:py-32 section-gradient">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Ecosystem</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Your Startup Journey
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center"
          >
            <div className="glass-card-hover p-6 flex flex-col items-center min-w-[140px]">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${i === 0 ? "bg-primary/20" : "bg-primary/10"}`}>
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">{s.label}</span>
              <span className="text-[10px] text-primary mt-1">Stage {i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center px-2">
                <div className="w-8 h-px bg-gradient-to-r from-primary/50 to-primary/20" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EcosystemSection;
