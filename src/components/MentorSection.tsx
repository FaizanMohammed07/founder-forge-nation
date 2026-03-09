const mentors = [
  { name: "Priya Sharma", role: "Startup Founder", expertise: "SaaS & Product Strategy", achievements: "Built 2 funded startups" },
  { name: "Arjun Mehta", role: "Tech Expert", expertise: "Full-Stack & AI/ML", achievements: "Ex-Google Engineer" },
  { name: "Sneha Patel", role: "Product Builder", expertise: "UX & Product Management", achievements: "PM at Razorpay" },
  { name: "Vikram Singh", role: "Angel Investor", expertise: "Seed-Stage Investing", achievements: "20+ startup investments" },
  { name: "Ananya Roy", role: "Industry Leader", expertise: "EdTech & HealthTech", achievements: "Forbes 30 Under 30" },
  { name: "Rahul Gupta", role: "Startup Founder", expertise: "D2C & E-commerce", achievements: "Built ₹100Cr brand" },
];

const MentorSection = () => (
  <section id="mentors" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Mentors</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Learn From The Best
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((m) => (
          <div
            key={m.name}
            className="section-card-hover p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-primary/8 flex items-center justify-center font-semibold text-primary text-sm">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
                <span className="text-xs text-primary">{m.role}</span>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="text-muted-foreground">
                <span className="text-foreground/80 font-medium">Expertise:</span> {m.expertise}
              </div>
              <div className="text-muted-foreground">
                <span className="text-foreground/80 font-medium">Achievement:</span> {m.achievements}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MentorSection;
