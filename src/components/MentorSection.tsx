import { motion } from "framer-motion";

const mentors = [
  { name: "Priya Sharma", role: "Startup Founder", expertise: "SaaS & Product Strategy", achievements: "Built 2 funded startups" },
  { name: "Arjun Mehta", role: "Tech Expert", expertise: "Full-Stack & AI/ML", achievements: "Ex-Google Engineer" },
  { name: "Sneha Patel", role: "Product Builder", expertise: "UX & Product Management", achievements: "PM at Razorpay" },
  { name: "Vikram Singh", role: "Angel Investor", expertise: "Seed-Stage Investing", achievements: "20+ startup investments" },
  { name: "Ananya Roy", role: "Industry Leader", expertise: "EdTech & HealthTech", achievements: "Forbes 30 Under 30" },
  { name: "Rahul Gupta", role: "Startup Founder", expertise: "D2C & E-commerce", achievements: "Built ₹100Cr brand" },
];

const MentorSection = () => (
  <section id="mentors" className="py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Mentors</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Learn From The Best
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-lg">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{m.name}</h3>
                <span className="text-xs text-primary">{m.role}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground/70 font-medium">Expertise:</span> {m.expertise}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground/70 font-medium">Achievement:</span> {m.achievements}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MentorSection;
