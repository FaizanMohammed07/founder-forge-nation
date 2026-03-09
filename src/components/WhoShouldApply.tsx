import { Lightbulb, Trophy, Target, Rocket, GraduationCap } from "lucide-react";

const profiles = [
  { icon: Lightbulb, title: "Students with Startup Ideas", desc: "You have an idea and want to turn it into reality" },
  { icon: Trophy, title: "Hackathon Builders", desc: "You've built projects and want to go further" },
  { icon: Target, title: "Problem Solvers", desc: "You see problems everywhere and want to fix them" },
  { icon: Rocket, title: "Future Entrepreneurs", desc: "You dream of building your own company" },
  { icon: GraduationCap, title: "Pre-Graduation Founders", desc: "You want to launch before you graduate" },
];

const WhoShouldApply = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Who It's For</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Who Should Apply
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {profiles.map((p) => (
          <div
            key={p.title}
            className="section-card-hover p-5 text-center flex flex-col items-center"
          >
            <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center mb-3">
              <p.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1.5 text-sm">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoShouldApply;
