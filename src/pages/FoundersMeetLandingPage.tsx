import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import { foundersMeetEvent } from "@/data/foundersMeetEvents";
import "./founders-meet-register.css";

const FoundersMeetLandingPage = () => {
  const event = foundersMeetEvent;

  return (
    <div className="founders-meet-page">
      <div className="min-h-screen bg-[#030303] relative overflow-hidden pt-28 pb-20 px-6">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.12),transparent_70%)]" />
          <div className="grid-floor opacity-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="glass-panel clip-corner p-8 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
              DevUp Society Presents
            </p>
            <h1 className="font-display text-white text-4xl md:text-6xl font-bold leading-[1.05] mb-4">
              FOUNDERS MEET 2026
            </h1>
            <p className="font-mono text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl">
              {event.fullDescription}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
                  <CalendarDays className="w-4 h-4 text-red-300" />
                  Date
                </div>
                <div className="text-white font-mono">18 April 2026</div>
              </div>
              <div className="border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-red-300" />
                  Venue
                </div>
                <div className="text-white font-mono">{event.location}</div>
              </div>
              <div className="border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
                  <Users className="w-4 h-4 text-red-300" />
                  Seats
                </div>
                <div className="text-white font-mono">{event.seatsLeft} Limited</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/events/founders-meet-2026/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-red-400 transition-colors btn-glitch"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:devupsociety@vjit.ac.in"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors font-mono text-xs uppercase tracking-widest"
              >
                Contact Organizers
              </a>
            </div>
          </div>

          <div className="glass-panel clip-corner p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-6">
              EVENT TIMELINE
            </h2>
            <div className="space-y-4">
              {event.timeline?.map((item) => (
                <div
                  key={item.id}
                  className="border border-zinc-800 bg-black/40 p-4 md:p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="font-mono text-white text-sm uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-red-300 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>
                  <p className="font-mono text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel clip-corner p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-6">FAQ</h2>
            <div className="space-y-4">
              {event.faqs?.map((faq) => (
                <div key={faq.question} className="border border-zinc-800 bg-black/40 p-4">
                  <h3 className="font-mono text-white text-sm mb-2">{faq.question}</h3>
                  <p className="font-mono text-zinc-400 text-xs md:text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersMeetLandingPage;
