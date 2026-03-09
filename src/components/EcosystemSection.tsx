import { GraduationCap, Beaker, Building, Rocket, Banknote, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  { icon: GraduationCap, label: "Student" },
  { icon: Beaker, label: "Pre-Incubation" },
  { icon: Building, label: "Incubation" },
  { icon: Rocket, label: "Accelerator" },
  { icon: Banknote, label: "Funding" },
  { icon: TrendingUp, label: "Startup Growth" },
];

const EcosystemSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Ecosystem</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Your Startup Journey
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="section-card-hover p-5 flex flex-col items-center min-w-[130px]">
              <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center mb-2.5">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-sm text-foreground">{s.label}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Stage {i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center px-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EcosystemSection;
