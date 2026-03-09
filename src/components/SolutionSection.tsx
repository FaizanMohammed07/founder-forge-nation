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
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">The Solution</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          What This Program Provides
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {solutions.map((s) => (
          <div
            key={s.title}
            className="section-card-hover p-5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
