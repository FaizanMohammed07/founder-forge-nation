import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const TimelineSection = ({ event }: Props) => {
  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-8">Event Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-red-400/30" />
        <div className="space-y-6">
          {event.timeline?.map((item, index) => {
            const isRight = index % 2 === 1;

            return (
              <div key={item.id} className="relative md:grid md:grid-cols-2 md:gap-8 items-start">
                <span className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-red-400 border border-white/30" />

                <div className={`${isRight ? "md:col-start-2" : ""} pl-10 md:pl-0`}>
                  <article className="border border-zinc-700 bg-black/40 p-4 md:p-5 rounded-sm">
                    <p className="text-[11px] font-mono text-red-300 uppercase tracking-wider mb-1">{item.date}</p>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
