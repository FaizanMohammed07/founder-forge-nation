import {
  Ban,
  MapPin,
  AlertTriangle,
  Users,
  Globe,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";

const problems = [
  {
    icon: Ban,
    title: "No Mentorship",
    desc: "Students lack access to experienced mentors who have been in the trenches.",
  },
  {
    icon: MapPin,
    title: "No Roadmap",
    desc: "Wasting time figuring out the right path from raw idea to launch.",
  },
  {
    icon: AlertTriangle,
    title: "Fear of Failure",
    desc: "Paralyzed by the idea of failing, with no safe environment to test.",
  },
  {
    icon: Users,
    title: "No Co-Founder",
    desc: "Struggling to find the right technical or business partner.",
  },
  {
    icon: Globe,
    title: "No Ecosystem",
    desc: "Building in isolation without a network of peers and insiders.",
  },
  {
    icon: ShieldAlert,
    title: "No Validation",
    desc: "Building things nobody wants because assumptions weren't tested.",
  },
  {
    icon: TrendingDown,
    title: "No Investor Access",
    desc: "Zero pathways to early-stage funding or angel networks.",
  },
];

const ProblemSection = () => {
  const duplicatedProblems = [...problems, ...problems, ...problems];

  return (
    <section className="py-24 md:py-32 bg-[#050505] overflow-hidden relative group/section">
      <style>
        {`
          @keyframes slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.333%)); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: slide-left 50s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .edge-fade {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}
      </style>

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E50914] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-[11px] font-bold tracking-widest uppercase mb-6">
            <AlertTriangle className="w-3.5 h-3.5" /> The Harsh Reality
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Why 90% of Student Startup Ideas{" "}
            <span className="text-[#E50914]">Fail</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
            Passion is common. Execution is rare. Without the right structure,
            network, and guidance, even brilliant concepts die before they reach
            the market.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full edge-fade">
        <div className="animate-marquee gap-6 px-6">
          {duplicatedProblems.map((p, idx) => (
            <div
              key={idx}
              className="w-[320px] md:w-[400px] p-8 border border-white/5 bg-[#111111] hover:bg-[#161616] rounded-sm flex flex-col gap-6 relative overflow-hidden transition-colors cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E50914]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-14 h-14 rounded-sm bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center text-[#E50914] group-hover:scale-110 transition-transform duration-500 ease-out">
                <p.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="font-bold text-white text-xl mb-3 tracking-tight group-hover:text-[#E50914] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
