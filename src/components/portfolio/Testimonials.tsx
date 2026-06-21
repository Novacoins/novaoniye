import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionLabel } from "./About";

const reviews = [
  {
    name: "Adaobi N.",
    role: "Founder, RetailHub NG",
    quote:
      "Oniye delivered our e-commerce platform ahead of schedule with quality that exceeded our expectations. A true professional.",
  },
  {
    name: "Daniel K.",
    role: "CEO, EduSpark",
    quote:
      "Our learning app would not exist without him. Clean code, beautiful UI, and clear communication throughout.",
  },
  {
    name: "Mariam O.",
    role: "Director, BookEase",
    quote:
      "From concept to launch he handled everything with poise. The booking system runs flawlessly. Highly recommended.",
  },
  {
    name: "Tunde A.",
    role: "Crypto Project Lead",
    quote:
      "Crypto Mining Tycoon turned out incredible. Oniye understood the vision and shipped a polished product.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Kind Words</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Trusted by founders &{" "}
              <span className="text-gold-gradient italic">teams</span>.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl glass-panel p-8 md:p-10"
            >
              <Quote className="absolute right-8 top-8 h-10 w-10 text-gold/20" />
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-xl leading-snug text-foreground md:text-2xl">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-lg text-gold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-medium text-foreground">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {r.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
