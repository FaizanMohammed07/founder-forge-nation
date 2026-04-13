import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stories = [
  {
    name: "EduFlow Disrupts AI Learning Landscape",
    founder: "Riya & Aman",
    desc: "The AI-powered learning platform just closed its seed round, raising ₹2Cr to expand operations across tier-2 cities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    metric: "₹2Cr Raised",
    tag: "EdTech",
    date: "12 hours ago",
  },
  {
    name: "GreenCart's Sustainable Delivery Model Proven",
    founder: "Sahil Verma",
    desc: "A closer look at how this D2C grocery startup reached 10,000+ daily users using an eco-friendly supply chain.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973b0f32e7e?q=80&w=1000&auto=format&fit=crop",
    metric: "10K+ Users",
    tag: "D2C",
    date: "1 day ago",
  },
  {
    name: "MedConnect Reaches Milestone Consultations",
    founder: "Kavya Nair",
    desc: "Telemedicine platform crosses 50,000+ remote consultations, effectively bridging the rural healthcare gap.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    metric: "50K+ Consults",
    tag: "HealthTech",
    date: "2 days ago",
  },
];

const SuccessStories = () => (
  <section
    id="stories"
    className="py-20 md:py-24 bg-white border-t border-[#E5E5E5]"
  >
    <div className="container mx-auto px-4 md:px-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-2">
            Latest Stories
          </h2>
          <p className="text-base text-[#111111]/60">
            News, milestones, and reports from our founder ecosystem.
          </p>
        </div>
        <Link
          to="/stories"
          className="text-sm font-semibold text-[#E50914] hover:text-[#c40812] flex items-center gap-1.5 transition-colors group"
        >
          View all stories{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {stories.map((s) => (
          <div
            key={s.name}
            className="flex flex-col border border-[#E5E5E5] rounded-sm group overflow-hidden bg-white hover:border-[#E50914]/30 transition-colors shadow-sm"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[11px] font-bold text-white bg-[#E50914] px-2.5 py-1 uppercase tracking-wide rounded-sm shadow-sm">
                  {s.tag}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3 text-[13px] text-[#111111]/50 font-medium">
                <span>{s.date}</span>
                <span className="text-[#E50914] font-semibold">{s.metric}</span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3 leading-snug group-hover:text-[#E50914] transition-colors">
                {s.name}
              </h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed flex-1 mb-6">
                {s.desc}
              </p>
              <div className="mt-auto border-t border-[#E5E5E5] pt-4">
                <Link
                  to="/stories"
                  className="text-sm font-bold text-[#111111] hover:text-[#E50914] transition-colors inline-block"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
