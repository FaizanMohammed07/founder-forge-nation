import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const stories = [
  {
    name: "EduFlow",
    founder: "Riya & Aman",
    desc: "AI-powered learning platform that raised ₹2Cr seed funding",
    metric: "₹2Cr Raised",
    tag: "EdTech",
  },
  {
    name: "GreenCart",
    founder: "Sahil Verma",
    desc: "Sustainable grocery delivery startup serving 10,000+ customers",
    metric: "10K+ Users",
    tag: "D2C",
  },
  {
    name: "MedConnect",
    founder: "Kavya Nair",
    desc: "Telemedicine platform connecting rural patients with doctors",
    metric: "50K+ Consultations",
    tag: "HealthTech",
  },
];

const SuccessStories = () => (
  <section id="stories" className="py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Success Stories</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          From Students to Founders
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{s.tag}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-1">{s.name}</h3>
            <p className="text-sm text-primary mb-3">by {s.founder}</p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
            <div className="mt-6 pt-4 border-t border-border/50">
              <span className="font-display text-lg font-bold glow-blue">{s.metric}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
