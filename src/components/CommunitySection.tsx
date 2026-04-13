import {
  Users,
  Wrench,
  Code,
  Calendar,
  Presentation,
  Handshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Users,
    title: "Founder Network",
    desc: "Collaborate with high-agency student founders building across India.",
    outcome: "Find co-founders, collaborators, and early users.",
  },
  {
    icon: Wrench,
    title: "Startup Workshops",
    desc: "Operator-led sessions on GTM, product validation, and growth systems.",
    outcome: "Avoid mistakes and execute faster with proven playbooks.",
  },
  {
    icon: Code,
    title: "Build Sprints",
    desc: "Intense sprint cycles to ship MVPs and improve your product weekly.",
    outcome: "Move from idea to demo-ready product in record time.",
  },
  {
    icon: Calendar,
    title: "Founder Events",
    desc: "Private meetups, founder circles, and strategy rooms with experts.",
    outcome: "Build relationships that open career and startup doors.",
  },
  {
    icon: Presentation,
    title: "Demo Days",
    desc: "Present your traction to mentors, operators, and investor networks.",
    outcome: "Sharpen your pitch and unlock warm introductions.",
  },
  {
    icon: Handshake,
    title: "Investor Access",
    desc: "Curated meetings with angels, VCs, and ecosystem partners.",
    outcome: "Get early capital pathways and strategic support.",
  },
];

const CommunitySection = () => (
  <section
    id="community"
    className="py-24 md:py-32 bg-[#050505] border-t border-white/10 relative overflow-hidden"
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#E50914]/15 blur-[140px] rounded-full" />
      <div className="absolute -bottom-24 right-[-120px] w-[380px] h-[380px] bg-purple-600/15 blur-[130px] rounded-full" />
    </div>

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E50914]/35 bg-[#E50914]/10 mb-6">
          <Sparkles className="w-4 h-4 text-[#E50914]" />
          <span className="text-[11px] font-black text-[#E50914] uppercase tracking-[0.22em]">
            Join the Ecosystem
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
          Build With The <span className="text-[#E50914]">Right Network</span>
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/65 leading-relaxed">
          Your startup outcome is defined by your environment. Enter a founder-first ecosystem where momentum, mentorship, and market access compound every week.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10 md:mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <div className="text-3xl md:text-4xl font-black text-white">500+</div>
          <div className="text-xs md:text-sm text-white/50 mt-1">Student Founders</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <div className="text-3xl md:text-4xl font-black text-white">100+</div>
          <div className="text-xs md:text-sm text-white/50 mt-1">Mentors & Operators</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <div className="text-3xl md:text-4xl font-black text-white">50+</div>
          <div className="text-xs md:text-sm text-white/50 mt-1">Investor Connections</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group relative p-6 border border-white/10 bg-white/[0.03] rounded-2xl transition-all duration-500 flex items-start gap-4 hover:-translate-y-2 hover:border-[#E50914]/45 hover:shadow-[0_16px_44px_rgba(229,9,20,0.25)]"
          >
            <div className="absolute -top-12 -right-8 w-24 h-24 bg-[#E50914]/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/10 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-[#E50914]" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-2">{b.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-3">{b.desc}</p>
              <p className="text-xs text-[#E50914] font-semibold leading-relaxed">
                {b.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-12 rounded-2xl border border-[#E50914]/35 bg-gradient-to-r from-[#E50914]/20 to-purple-600/20 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Don’t Build Alone. Enter The Founder Arena.
            </h3>
            <p className="mt-2 text-white/75 max-w-2xl">
              Applications are competitive. Join now to access mentors, peers, and investors who can accelerate your startup journey.
            </p>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] hover:bg-white/90 font-semibold px-7 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Join the Ecosystem
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySection;


