import { motion } from "framer-motion";
import { Lightbulb, Users, Code, BarChart3, Wrench, Handshake, MessageCircle, TrendingUp } from "lucide-react";

const solutions = [
  { icon: Lightbulb, title: "Idea Validation Framework", desc: "Structured process to test and validate startup ideas" },
  { icon: Users, title: "Startup Mentorship", desc: "1-on-1 guidance from experienced founders" },
  { icon: Code, title: "MVP Development", desc: "Hands-on support to build your first product" },
  { icon: BarChart3, title: "Business Model Creation", desc: "Learn to build sustainable revenue models" },
  { icon: Wrench, title: "Product Building", desc: "Technical and design support for your product" },
  { icon: Handshake, title: "Co-Founder Network", desc: "Find your perfect co-founder match" },
  { icon: MessageCircle, title: "Startup Community", desc: "Join a network of ambitious student founders" },
  { icon: TrendingUp, title: "Investor Readiness", desc: "Prepare for your first pitch to investors" },
];

const SolutionSection = () => (
  <section className="py-24 md:py-32 relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">The Solution</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          What This Program Provides
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {solutions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
