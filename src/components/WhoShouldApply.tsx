import { Lightbulb, Trophy, Target, Rocket, GraduationCap } from "lucide-react";

const profiles = [
  { icon: Lightbulb, title: "Students with Ideas", desc: "You have an idea and want to turn it into reality" },
  { icon: Trophy, title: "Hackathon Builders", desc: "You've built projects and want to go further" },
  { icon: Target, title: "Problem Solvers", desc: "You see problems everywhere and want to fix them" },
  { icon: Rocket, title: "Future Entrepreneurs", desc: "You dream of building your own company" },
  { icon: GraduationCap, title: "Early Founders", desc: "You want to launch before you graduate" },
];

const WhoShouldApply = () => (
  <section className="py-20 md:py-24 bg-[#111111] text-white">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Who Should Apply
        </h2>
        <div className="h-1 w-12 bg-[#E50914] mx-auto" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {profiles.map((p) => (
          <div
            key={p.title}
            className="p-6 border border-white/10 bg-white/5 rounded-sm hover:bg-white/10 transition-colors text-center flex flex-col items-center"
          >
            <div className="mb-4">
              <p.icon className="w-7 h-7 text-[#E50914]" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-white mb-2 text-base">{p.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoShouldApply;



