import { motion } from "framer-motion";
import { Search, FileSearch, CheckCircle, Code, TestTube, BarChart3, Rocket, TrendingUp } from "lucide-react";

const stages = [
  { icon: Search, title: "Idea Discovery", desc: "Explore problems worth solving and generate innovative ideas" },
  { icon: FileSearch, title: "Problem Research", desc: "Deep dive into user pain points and market gaps" },
  { icon: CheckCircle, title: "Market Validation", desc: "Test your assumptions with real potential users" },
  { icon: Code, title: "MVP Development", desc: "Build the simplest version of your product" },
  { icon: TestTube, title: "Product Testing", desc: "Iterate based on user feedback and data" },
  { icon: BarChart3, title: "Business Model", desc: "Design your revenue and growth strategy" },
  { icon: Rocket, title: "Startup Launch", desc: "Go to market with your first customers" },
  { icon: TrendingUp, title: "Investor Readiness", desc: "Prepare your pitch and financials for funding" },
];

const JourneySection = () => (
  <section id="journey" className="py-24 md:py-32 section-gradient relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-widest uppercase">Your Journey</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 glow-text">
          Program Roadmap
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          8 structured stages to take you from idea to investor-ready startup
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        <div className="flex flex-col gap-8 lg:gap-0">
          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`lg:flex items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                  <div className={`glass-card-hover p-6 inline-block max-w-md ${isLeft ? "lg:ml-auto" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <stage.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-primary font-medium">Stage {i + 1}</span>
                        <h3 className="font-display font-semibold text-foreground">{stage.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex items-center justify-center w-8">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--electric)/0.5)]" />
                </div>

                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
