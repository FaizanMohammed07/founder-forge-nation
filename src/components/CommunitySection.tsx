import { motion } from "framer-motion";
import { Users, Wrench, Code, Calendar, Presentation, Handshake } from "lucide-react";

const benefits = [
  { icon: Users, title: "Founder Network", desc: "Connect with 500+ ambitious student founders" },
  { icon: Wrench, title: "Startup Workshops", desc: "Weekly hands-on workshops on startup skills" },
  { icon: Code, title: "Hackathons", desc: "Build products in 48-hour sprints" },
  { icon: Calendar, title: "Startup Events", desc: "Exclusive conferences and fireside chats" },
  { icon: Presentation, title: "Demo Days", desc: "Pitch your product to investors and peers" },
  { icon: Handshake, title: "Investor Meetups", desc: "Direct access to angel investors and VCs" },
];

const CommunitySection = () => (
  <section id="community" className="py-24 md:py-32 section-gradient">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Community</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Join the Ecosystem
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <b.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
