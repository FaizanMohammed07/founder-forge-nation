import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Event } from "@/data/foundersMeetEvents";

interface Props {
  event: Event;
}

const FaqSection = ({ event }: Props) => {
  return (
    <section className="glass-panel clip-corner p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-6">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        {event.faqs?.map((faq, index) => (
          <AccordionItem value={`faq-${index}`} key={faq.question} className="border-zinc-700">
            <AccordionTrigger className="text-left text-white hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-300 text-sm leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqSection;
