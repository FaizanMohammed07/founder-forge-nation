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
  <section id="journey" className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Your Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Program Roadmap
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
          8 structured stages to take you from idea to investor-ready startup
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            className="section-card-hover p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center flex-shrink-0">
                <stage.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary">Stage {i + 1}</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{stage.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default JourneySection;
