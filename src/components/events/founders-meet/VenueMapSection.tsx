import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const VenueMapSection = ({ event }: Props) => {
  if (!event.venueMap) {
    return null;
  }

  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-6">Venue Map</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5 items-stretch">
        <div className="border border-zinc-700 overflow-hidden rounded-sm min-h-[280px]">
          <iframe
            src={event.venueMap.embedUrl}
            title="T-HUB Hyderabad map"
            className="w-full h-[320px] md:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="border border-zinc-700 bg-black/40 rounded-sm p-5 flex flex-col justify-between gap-5">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">Venue</p>
            <p className="text-white text-xl font-semibold">{event.venueMap.venueText}</p>
          </div>
          <a
            href={event.venueMap.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-4 py-3 bg-red-500 hover:bg-red-400 text-black font-semibold rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default VenueMapSection;
