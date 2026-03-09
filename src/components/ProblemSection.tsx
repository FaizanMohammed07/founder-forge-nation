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
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">The Problem</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Why Most Student Startup Ideas Fail
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {problems.map((p) => (
          <div
            key={p.title}
            className="section-card-hover p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-destructive/8 flex items-center justify-center flex-shrink-0">
              <p.icon className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
