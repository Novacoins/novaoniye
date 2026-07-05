import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>About Us</SectionLabel>
        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
              A premium digital studio with{" "}
              <span className="text-gold-gradient italic">5+ years</span> of
              craft.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              Nova Studio helps businesses, startups, and entrepreneurs
              transform their ideas into successful digital products. We deliver
              premium mobile apps, AI systems, web platforms, custom software,
              and brand experiences engineered for growth, innovation, and
              lasting profitability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 self-center"
          >
            {[
              { k: "Studio", v: "Nova Studio" },
              { k: "Based in", v: "Worldwide 🌍" },
              { k: "Stack", v: "Mobile · Web · AI" },
              { k: "Status", v: "Available for work 👨‍💻" },
            ].map((i) => (
              <div
                key={i.k}
                className="rounded-2xl border border-border bg-surface/60 p-5"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {i.k}
                </div>
                <div className="mt-1.5 text-base font-medium text-foreground">
                  {i.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-10 bg-gold" />
      <span className="text-xs uppercase tracking-[0.3em] text-gold">
        {children}
      </span>
    </div>
  );
}
