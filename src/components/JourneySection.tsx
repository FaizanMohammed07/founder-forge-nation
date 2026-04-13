import {
  Search,
  FileSearch,
  CheckCircle,
  Code,
  TestTube,
  BarChart3,
  Rocket,
  TrendingUp,
} from "lucide-react";

const stages = [
  {
    icon: Search,
    title: "Idea Discovery",
    desc: "Explore ambitious problems worth solving. We teach you how to spot hidden market needs.",
    metric: "100+ Ideas Filtered",
  },
  {
    icon: FileSearch,
    title: "Problem Research",
    desc: "Deep dive into user pain points, analyze competitors, and map out the exact market gap.",
    metric: "Target ICP Defined",
  },
  {
    icon: CheckCircle,
    title: "Market Validation",
    desc: "Run high-speed validation sprints. Get real waitlist signups before writing any code.",
    metric: "Real User Intent",
  },
  {
    icon: Code,
    title: "MVP Architecture",
    desc: "Build the slimmest, most efficient version of your product using modern tech stacks.",
    metric: "V1.0 Deployed",
  },
  {
    icon: TestTube,
    title: "Product Testing",
    desc: "Put the product in the hands of early adopters. Track data, measure retention, and iterate.",
    metric: "User Feedback Loops",
  },
  {
    icon: BarChart3,
    title: "Business Model",
    desc: "Design your pricing strategy, unit economics, and scalable pathways to profitability.",
    metric: "Revenue Playbook",
  },
  {
    icon: Rocket,
    title: "Growth & Launch",
    desc: "Execute a coordinated launch campaign to acquire your first 1,000 true customers.",
    metric: "Initial Traction",
  },
  {
    icon: TrendingUp,
    title: "Investor Readiness",
    desc: "Finalize your pitch deck, practice with mock VC panels, and prepare for seed funding.",
    metric: "Fundraising Ready",
  },
];

const JourneySection = () => (
  <section
    id="journey"
    className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden"
  >
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <div className="inline-block px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-bold tracking-widest text-[#E50914] uppercase mb-6">
          The Blueprint
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-6">
          Your Path to <span className="text-[#E50914] relative">Scale</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-light">
          Stop wandering. We provide the exact, step-by-step roadmap that
          successful founders use to turn raw concepts into venture-backed
          companies.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* The Core Track Line */}
        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-1.5 md:-ml-[3px] bg-gradient-to-b from-[#E50914]/10 via-[#E50914] to-[#E50914]/10 rounded-full shadow-[0_0_15px_rgba(229,9,20,0.5)]" />

        <div className="flex flex-col gap-12 md:gap-20">
          {stages.map((stage, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={stage.title}
                className={`flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""} items-start md:items-center relative w-full group`}
              >
                {/* Center Glowing Node */}
                <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)] z-20 group-hover:scale-110 transition-transform duration-300">
                  <stage.icon className="w-6 h-6 text-[#E50914]" />
                </div>

                {/* Content Card Side */}
                <div
                  className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                    {/* Giant background number */}
                    <div
                      className={`absolute -top-10 ${isEven ? "md:-left-6 right-0 md:right-auto" : "-right-6"} text-[140px] font-black text-gray-50 group-hover:text-[#E50914]/5 transition-colors duration-500 pointer-events-none select-none z-0`}
                    >
                      0{i + 1}
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E50914] rounded-md text-xs font-bold uppercase tracking-wider mb-4 border border-red-100 ${isEven ? "md:flex-row-reverse" : ""}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                        Stage 0{i + 1}
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#111111] mb-3 group-hover:text-[#E50914] transition-colors">
                        {stage.title}
                      </h3>
                      <p className="text-gray-500 text-lg leading-relaxed mb-6">
                        {stage.desc}
                      </p>

                      {/* Metric/Outcome badge */}
                      <div
                        className={`flex items-center gap-2 border-t border-gray-100 pt-4 w-full ${isEven ? "md:justify-end" : ""}`}
                      >
                        <span className="text-[#111111] font-semibold text-sm">
                          Target Outcome:
                        </span>
                        <span className="text-[#E50914] font-medium text-sm px-2 py-0.5 bg-red-50 rounded-sm">
                          {stage.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty Side (For spacing on desktop) */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
