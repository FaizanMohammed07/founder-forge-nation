import { Users, Wrench, Code, Calendar, Presentation, Handshake } from "lucide-react";

const benefits = [
  { icon: Users, title: "Founder Network", desc: "Connect with 500+ ambitious student founders" },
  { icon: Wrench, title: "Startup Workshops", desc: "Weekly hands-on workshops on startup skills" },
  { icon: Code, title: "Hackathons", desc: "Build products in 48-hour sprints" },
  { icon: Calendar, title: "Startup Events", desc: "Exclusive conferences and fireside chats" },
  { icon: Presentation, title: "Demo Days", desc: "Pitch your product to investors and peers" },
  { icon: Handshake, title: "Investor Meetups", desc: "Direct access to angel investors and VCs" },
];

const CommunitySection = () => (
  <section id="community" className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Community</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Join the Ecosystem
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="section-card-hover p-5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
              <b.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
