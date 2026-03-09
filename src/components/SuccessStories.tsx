import { ExternalLink } from "lucide-react";

const stories = [
  {
    name: "EduFlow",
    founder: "Riya & Aman",
    desc: "AI-powered learning platform that raised ₹2Cr seed funding",
    metric: "₹2Cr Raised",
    tag: "EdTech",
  },
  {
    name: "GreenCart",
    founder: "Sahil Verma",
    desc: "Sustainable grocery delivery startup serving 10,000+ customers",
    metric: "10K+ Users",
    tag: "D2C",
  },
  {
    name: "MedConnect",
    founder: "Kavya Nair",
    desc: "Telemedicine platform connecting rural patients with doctors",
    metric: "50K+ Consultations",
    tag: "HealthTech",
  },
];

const SuccessStories = () => (
  <section id="stories" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Success Stories</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          From Students to Founders
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stories.map((s) => (
          <div
            key={s.name}
            className="section-card-hover p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-md">{s.tag}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-0.5">{s.name}</h3>
            <p className="text-sm text-primary mb-2">by {s.founder}</p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
            <div className="mt-5 pt-4 border-t border-border">
              <span className="text-lg font-bold text-primary">{s.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
