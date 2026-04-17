import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, Layers, ArrowRight } from "lucide-react";
import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const HeroPartnerSection = ({ event }: Props) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const registrationDeadline = event.registrationDeadlineAt
    ? new Date(event.registrationDeadlineAt)
    : null;
  const isRegistrationOpen =
    event.status === "upcoming" &&
    (!registrationDeadline || Date.now() < registrationDeadline.getTime());

  return (
    <section className="glass-panel clip-corner p-6 md:p-10">
      <div className="relative overflow-hidden rounded-lg border border-red-500/20 bg-[radial-gradient(circle_at_10%_0%,rgba(229,9,20,0.24),transparent_50%),radial-gradient(circle_at_90%_100%,rgba(239,68,68,0.2),transparent_45%)] p-5 md:p-8">
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-3 md:gap-6 items-center mb-3">
            {event.partners?.map((partner) => (
              <div
                key={partner.name}
                className="bg-black/30 border border-white/10 rounded-sm p-3 md:p-4 h-20 md:h-24 flex items-center justify-center"
              >
                <img
                  src={partner.imageUrl}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {event.partners?.map((partner) => (
              <span
                key={partner.domain}
                className="text-[10px] md:text-xs font-mono px-3 py-1 border border-white/20 text-zinc-200 rounded-full"
              >
                {partner.domain}
              </span>
            ))}
          </div>

          <span className="inline-flex mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-red-500/20 border border-red-300/30 text-red-200">
            Flagship Founder Event
          </span>

          <h1 className="font-display text-3xl md:text-5xl text-white font-bold mb-3">
            {event.title}
          </h1>

          <p className="font-mono text-zinc-200 text-sm md:text-base leading-relaxed max-w-4xl mb-7">
            {event.shortDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-7">
            <div className="border border-zinc-700 bg-black/40 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase mb-1">
                <CalendarDays className="w-4 h-4 text-red-300" /> Date
              </div>
              <p className="text-white font-semibold">{formattedDate}</p>
            </div>
            <div className="border border-zinc-700 bg-black/40 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase mb-1">
                <MapPin className="w-4 h-4 text-red-300" /> Venue
              </div>
              <p className="text-white font-semibold">T-HUB, Hyderabad</p>
            </div>
            <div className="border border-zinc-700 bg-black/40 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase mb-1">
                <Users className="w-4 h-4 text-red-300" /> Seats
              </div>
              <p className="text-white font-semibold">100 Available</p>
            </div>
            <div className="border border-zinc-700 bg-black/40 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase mb-1">
                <Layers className="w-4 h-4 text-red-300" /> Format
              </div>
              <p className="text-white font-semibold">Paid Passes + Admin Approval</p>
            </div>
          </div>

          <div className="border border-red-400/30 bg-red-500/10 rounded-lg p-5 md:p-6">
            <p className="text-[11px] font-mono uppercase tracking-wider text-red-200 mb-2">
              Event Update
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
              {isRegistrationOpen ? "Ready To Enter The Room?" : "Registrations Closed"}
            </h2>
            <p className="text-sm text-zinc-200 mb-4 max-w-2xl">
              {isRegistrationOpen
                ? "Choose your pass and complete registration to confirm your place."
                : "New registrations have been stopped. You can still review the event details and venue information here."}
            </p>
            {isRegistrationOpen ? (
              <Link
                to="/events/founders-meet-2026/register"
                className="inline-flex items-center gap-2 px-5 py-3 bg-red-500 text-black font-semibold rounded-sm hover:bg-red-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-800 text-white font-semibold rounded-sm border border-white/10">
                Registration Closed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPartnerSection;
