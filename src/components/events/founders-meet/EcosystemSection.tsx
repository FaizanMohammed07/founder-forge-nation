import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const EcosystemSection = ({ event }: Props) => {
  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-6">Organizer Ecosystem</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {event.organizerCards?.map((card) => (
          <article key={`${card.title}-${card.description}`} className="border border-zinc-700 bg-black/40 p-5 rounded-sm">
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">{card.title}</p>
            <img
              src={card.logoUrl}
              alt={`${card.description} logo`}
              className="h-14 md:h-16 w-auto object-contain mb-2"
              loading="lazy"
            />
            <p className="text-zinc-200 text-sm">{card.description}</p>
          </article>
        ))}
      </div>

      <div>
        <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">Associate Partners</p>
        <div className="grid grid-cols-2 gap-4">
          {event.associatePartners?.map((partner) => (
            <article key={partner.description} className="border border-zinc-700 bg-black/40 p-4 rounded-sm flex flex-col items-center justify-center">
              <img
                src={partner.logoUrl}
                alt={`${partner.description} logo`}
                className="h-12 w-auto object-contain mb-2"
                loading="lazy"
              />
              <p className="text-zinc-200 text-sm">{partner.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
