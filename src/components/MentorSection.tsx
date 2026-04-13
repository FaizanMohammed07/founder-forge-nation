import { Award, Sparkles, Users2 } from "lucide-react";

const mentors = [
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    expertise: "SaaS & Product Strategy",
    achievements: "Built 2 funded startups",
  },
  {
    name: "Arjun Mehta",
    role: "Tech Expert",
    expertise: "Full-Stack & AI/ML",
    achievements: "Ex-Google Engineer",
  },
  {
    name: "Sneha Patel",
    role: "Product Builder",
    expertise: "UX & Product Management",
    achievements: "PM at Razorpay",
  },
  {
    name: "Vikram Singh",
    role: "Angel Investor",
    expertise: "Seed-Stage Investing",
    achievements: "20+ startup investments",
  },
  {
    name: "Ananya Roy",
    role: "Industry Leader",
    expertise: "EdTech & HealthTech",
    achievements: "Forbes 30 Under 30",
  },
  {
    name: "Rahul Gupta",
    role: "Startup Founder",
    expertise: "D2C & E-commerce",
    achievements: "Built ₹100Cr brand",
  },
];

const MentorSection = () => (
  <section id="mentors" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#E50914]/15 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-[140px] rounded-full" />
    </div>

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="mb-14 md:mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E50914]/30 bg-[#E50914]/10 mb-5">
          <Sparkles className="w-4 h-4 text-[#E50914]" />
          <span className="text-xs font-black text-[#E50914] uppercase tracking-[0.22em]">
            Network
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
          Learn From The <span className="text-[#E50914]">Best</span>
        </h2>
        <p className="mt-5 text-white/60 text-base md:text-lg max-w-2xl">
          Access direct mentorship from battle-tested founders, investors, and operators who have scaled startups from idea to impact.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10 md:mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
          <div className="flex items-center gap-3">
            <Users2 className="w-5 h-5 text-[#E50914]" />
            <div>
              <div className="text-xl md:text-2xl font-black text-white">50+ Experts</div>
              <div className="text-xs md:text-sm text-white/50">Founder & Investor Network</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#E50914]" />
            <div>
              <div className="text-xl md:text-2xl font-black text-white">12+ Sectors</div>
              <div className="text-xs md:text-sm text-white/50">SaaS, AI, D2C, Fintech & More</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#E50914]" />
            <div>
              <div className="text-xl md:text-2xl font-black text-white">Live Access</div>
              <div className="text-xs md:text-sm text-white/50">Office Hours, Reviews, Warm Intros</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((m) => (
          <div
            key={m.name}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#E50914]/40 hover:shadow-[0_16px_50px_rgba(229,9,20,0.22)]"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#E50914]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-sm">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-bold text-white">{m.name}</h3>
                <span className="text-xs font-semibold text-[#E50914] uppercase tracking-wider">
                  {m.role}
                </span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wide mb-0.5">
                  Focus
                </span>
                <span className="text-white/85 font-medium">
                  {m.expertise}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wide mb-0.5">
                  Track Record
                </span>
                <span className="text-white/85 font-medium">
                  {m.achievements}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MentorSection;
