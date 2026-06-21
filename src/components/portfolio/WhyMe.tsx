import { motion } from "motion/react";
import { Zap, Brush, Smartphone, DollarSign, Award, LifeBuoy } from "lucide-react";
import { SectionLabel } from "./About";

const items = [
  { icon: Zap, title: "Fast Delivery", desc: "Sprint-based delivery with clear timelines from day one." },
  { icon: Brush, title: "Professional Design", desc: "Modern, polished interfaces that elevate your brand." },
  { icon: Smartphone, title: "Responsive Development", desc: "Built to look stunning on every device, every screen." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality at fair, transparent pricing." },
  { icon: Award, title: "Premium Quality", desc: "Production-grade code that scales with your business." },
  { icon: LifeBuoy, title: "Ongoing Support", desc: "I'm with you post-launch — updates, fixes, growth." },
];

export function WhyMe() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Why Choose Me</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Built on{" "}
            <span className="text-gold-gradient italic">discipline</span>,
            crafted with care.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface-elevated"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
