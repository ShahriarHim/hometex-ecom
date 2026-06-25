import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface ProductFAQsProps {
  faqs?: FAQ[];
}

export function ProductFAQs({ faqs }: ProductFAQsProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Set the first item as default open
  const defaultValue = faqs.length > 0 ? `item-${faqs[0].id}` : undefined;

  return (
    <section className="space-y-6" aria-labelledby="faqs-heading">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 id="faqs-heading" className="text-2xl font-bold">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
