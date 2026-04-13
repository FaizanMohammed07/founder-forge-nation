import {
  Lightbulb,
  Users,
  Code,
  BarChart3,
  Wrench,
  Handshake,
  MessageCircle,
  TrendingUp,
  Trophy,
  Target,
  Rocket,
} from "lucide-react";

const solutions = [
  {
    icon: Target,
    title: "Idea Validation Framework",
    desc: "Structured, high-velocity process to rigorously test and validate startup ideas before writing a single line of code.",
    span: "md:col-span-2 lg:col-span-2",
    badge: "Phase 1: Discovery",
  },
  {
    icon: Users,
    title: "Startup Mentorship",
    desc: "1-on-1 guidance from founders who have successfully built and exited.",
    span: "md:col-span-1 lg:col-span-1",
    badge: "Guidance",
  },
  {
    icon: Code,
    title: "MVP Development",
    desc: "Hands-on engineering support to architect and deploy your first viable product.",
    span: "md:col-span-1 lg:col-span-1",
    badge: "Execution",
  },
  {
    icon: BarChart3,
    title: "Business Models",
    desc: "Learn to build sustainable, scalable revenue generation engines.",
    span: "md:col-span-1 lg:col-span-1",
    badge: "Strategy",
  },
  {
    icon: Wrench,
    title: "Product Architecture",
    desc: "Technical deep-dives, UI/UX design support, and architectural scaling strategies for your MVP.",
    span: "md:col-span-1 lg:col-span-2",
    badge: "Engineering",
  },
  {
    icon: Handshake,
    title: "Co-Founder Network",
    desc: "Algorithm-backed pairing with perfect technical or business co-founders.",
    span: "md:col-span-2 lg:col-span-1",
    badge: "Team",
  },
  {
    icon: MessageCircle,
    title: "The Inner Circle",
    desc: "Join an elite, private network of India's most ambitious student founders. Share resources, talent, and growth hacks.",
    span: "md:col-span-1 lg:col-span-2",
    badge: "Community",
  },
  {
    icon: Rocket,
    title: "Investor Readiness",
    desc: "Pitch deck reviews, valuation metrics, and direct pathways to top-tier angels and seed VCs.",
    span: "md:col-span-1 lg:col-span-2",
    badge: "Funding",
  },
];

const SolutionSection = () => (
  <section className="py-24 md:py-32 bg-[#F8F9FA] relative overflow-hidden">
    {/* Subtle Dot Pattern Background */}
    <div
      className="absolute inset-0 z-0 opacity-[0.25]"
      style={{
        backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E50914]/10 text-[#E50914] text-[12px] font-extrabold tracking-widest uppercase mb-6 border border-[#E50914]/20 shadow-sm">
            <Trophy className="w-4 h-4" /> Founder Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            What This Program{" "}
            <span className="text-[#E50914] relative whitespace-nowrap">
              Unlocks
              <svg
                className="absolute -bottom-2.5 left-0 w-full h-3 text-[#E50914] opacity-80"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 Q 50 0 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>
        <p className="text-lg text-gray-500 font-medium max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#E50914] pl-4 md:pl-0 md:pr-4 py-2">
          Everything a student founder needs to transform an idea into a funded
          startup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((s, i) => (
          <div
            key={s.title}
            className={`group relative p-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#E50914]/10 hover:-translate-y-1.5 transition-all duration-500 ${s.span}`}
          >
            {/* Background Watermark Icon */}
            <s.icon className="absolute -bottom-6 -right-6 w-40 h-40 text-gray-50 group-hover:text-gray-100 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

            {/* Top Row: Icon + Badge */}
            <div className="flex items-start justify-between mb-8 relative z-10 w-full gap-4">
              <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-[#E50914] group-hover:scale-110 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                <s.icon
                  className="w-7 h-7 text-[#111111] group-hover:text-white transition-colors duration-500"
                  strokeWidth={2}
                />
              </div>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-100 text-[11px] font-bold uppercase tracking-widest rounded-md group-hover:bg-[#E50914]/10 group-hover:text-[#E50914] group-hover:border-[#E50914]/30 transition-colors duration-300 text-right">
                {s.badge}
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="font-extrabold text-[#111111] text-xl mb-3 group-hover:text-[#E50914] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300 pb-2">
                {s.desc}
              </p>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#E50914] via-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
