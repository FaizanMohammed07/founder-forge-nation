import { motion } from "framer-motion";
import { Ban, MapPin, AlertTriangle, Users, Globe, ShieldAlert, TrendingDown } from "lucide-react";

const problems = [
  { icon: Ban, title: "No Mentorship", desc: "Students lack access to experienced startup mentors" },
  { icon: MapPin, title: "No Roadmap", desc: "No clear path from idea to launch" },
  { icon: AlertTriangle, title: "Fear of Failure", desc: "No safe environment to experiment and learn" },
  { icon: Users, title: "No Co-Founder", desc: "Difficulty finding the right team members" },
  { icon: Globe, title: "No Ecosystem", desc: "Isolated from the startup community" },
  { icon: ShieldAlert, title: "No Validation", desc: "Ideas remain untested assumptions" },
  { icon: TrendingDown, title: "No Investor Access", desc: "No pathway to early-stage funding" },
];

const ProblemSection = () => (
  <section className="py-24 md:py-32 section-gradient relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">The Problem</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Why Most Student Startup Ideas Fail
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6 flex flex-col items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <p.icon className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
