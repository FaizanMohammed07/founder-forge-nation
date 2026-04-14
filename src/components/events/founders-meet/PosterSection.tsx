import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const PosterSection = ({ event }: Props) => {
  if (!event.posters) {
    return null;
  }

  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="space-y-3">
          <h2 className="font-display text-2xl text-white">{event.posters.mainTitle}</h2>
          <div className="border border-zinc-800 bg-black/40 p-3 rounded-sm">
            <img
              src={event.posters.mainImageUrl}
              alt="Founders Meet 2026 main poster"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </article>
        <article className="space-y-3">
          <h2 className="font-display text-2xl text-white">{event.posters.timelineTitle}</h2>
          <div className="border border-zinc-800 bg-black/40 p-3 rounded-sm">
            <img
              src={event.posters.timelineImageUrl}
              alt="Founders Meet 2026 timeline poster"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default PosterSection;
