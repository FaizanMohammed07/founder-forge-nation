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
    achievements: "Built Rs100Cr brand",
  },
];

const statCardClassName =
  "rounded-2xl border border-[#24181d]/10 bg-white/70 p-4 md:p-5 backdrop-blur-sm shadow-[0_18px_40px_rgba(34,18,22,0.08)]";

const statCardStyle = {
  background: "linear-gradient(180deg, rgba(255,250,247,0.96) 0%, rgba(252,244,239,0.96) 100%)",
};

const mentorCardStyle = {
  background: "linear-gradient(180deg, #2a1b22 0%, #1b1117 100%)",
  boxShadow: "0 24px 60px rgba(35, 17, 22, 0.22)",
};

const MentorSection = () => (
  <section
    id="mentors"
    className="relative overflow-hidden border-y border-[#e6d8d2] py-24 md:py-32"
    style={{
      background:
        "linear-gradient(180deg, #f7f0e9 0%, #f1e4dd 54%, #f6efe8 100%)",
    }}
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-16 left-[8%] h-72 w-72 rounded-full bg-[#E50914]/10 blur-[110px]" />
      <div className="absolute bottom-0 right-[4%] h-80 w-80 rounded-full bg-orange-300/20 blur-[130px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E50914]/20 to-transparent" />
    </div>

    <div className="container relative z-10 mx-auto px-4 md:px-8">
      <div className="mb-14 max-w-3xl md:mb-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-[#E50914]" />
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#E50914]">
            Network
          </span>
        </div>
        <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-[#171113] md:text-5xl lg:text-6xl">
          Learn From The <span className="text-[#E50914]">Best</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-[#5d4f51] md:text-lg">
          Access direct mentorship from battle-tested founders, investors, and
          operators who have scaled startups from idea to impact.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-3 md:mb-12">
        <div className={statCardClassName} style={statCardStyle}>
          <div className="flex items-center gap-3">
            <Users2 className="h-5 w-5 text-[#E50914]" />
            <div>
              <div className="text-xl font-black text-[#171113] md:text-2xl">
                50+ Experts
              </div>
              <div className="text-xs text-[#645557] md:text-sm">
                Founder & Investor Network
              </div>
            </div>
          </div>
        </div>
        <div className={statCardClassName} style={statCardStyle}>
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-[#E50914]" />
            <div>
              <div className="text-xl font-black text-[#171113] md:text-2xl">
                12+ Sectors
              </div>
              <div className="text-xs text-[#645557] md:text-sm">
                SaaS, AI, D2C, Fintech & More
              </div>
            </div>
          </div>
        </div>
        <div className={statCardClassName} style={statCardStyle}>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#E50914]" />
            <div>
              <div className="text-xl font-black text-[#171113] md:text-2xl">
                Live Access
              </div>
              <div className="text-xs text-[#645557] md:text-sm">
                Office Hours, Reviews, Warm Intros
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <div
            key={mentor.name}
            className="group relative overflow-hidden rounded-2xl border border-[#3a2931] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#E50914]/45 hover:shadow-[0_20px_55px_rgba(229,9,20,0.24)]"
            style={mentorCardStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-90" />
            <div className="absolute -right-12 -top-12 h-28 w-28 bg-[#E50914]/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative mb-5 flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sm font-bold text-white">
                {mentor.name
                  .split(" ")
                  .map((namePart) => namePart[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-bold text-white">{mentor.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                  {mentor.role}
                </span>
              </div>
            </div>
            <div className="relative space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                  Focus
                </span>
                <span className="font-medium text-white/85">
                  {mentor.expertise}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                  Track Record
                </span>
                <span className="font-medium text-white/85">
                  {mentor.achievements}
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
