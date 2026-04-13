import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const HighlightsSection = ({ event }: Props) => {
  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-6">Collaboration Highlights</h2>

      <div className="md:hidden -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-1">
          {event.collaborationHighlights?.map((item) => (
            <article key={item.title} className="w-[280px] border border-zinc-700 bg-black/40 p-4 rounded-sm">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-300 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {event.collaborationHighlights?.map((item) => (
          <article key={item.title} className="border border-zinc-700 bg-black/40 p-5 rounded-sm">
            <h3 className="text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-zinc-300 text-sm">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HighlightsSection;
