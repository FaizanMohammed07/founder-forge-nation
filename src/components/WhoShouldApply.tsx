import { motion } from "framer-motion";
import { Lightbulb, Trophy, Target, Rocket, GraduationCap } from "lucide-react";

const profiles = [
  { icon: Lightbulb, title: "Students with Startup Ideas", desc: "You have an idea and want to turn it into reality" },
  { icon: Trophy, title: "Hackathon Builders", desc: "You've built projects and want to go further" },
  { icon: Target, title: "Problem Solvers", desc: "You see problems everywhere and want to fix them" },
  { icon: Rocket, title: "Future Entrepreneurs", desc: "You dream of building your own company" },
  { icon: GraduationCap, title: "Pre-Graduation Founders", desc: "You want to launch before you graduate" },
];

const WhoShouldApply = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Who It's For</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Who Should Apply
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {profiles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoShouldApply;
