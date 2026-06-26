import { motion } from "motion/react";
import { Check } from "lucide-react";

const skills = [
  "Mobile App Development",
  "Android Development",
  "Web Development",
  "UI/UX Design",
  "HTML5 / CSS3 / JavaScript",
  "Responsive Design",
  "Web Applications",
  "SEO Optimization",
  "AI-Assisted Development",
  "Business Automation",
];

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>About Me</SectionLabel>
        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              A self-taught developer with{" "}
              <span className="text-gold-gradient italic">5+ years</span> of
              craft.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              I help businesses, startups, and entrepreneurs transform their
              ideas into successful digital products. As the founder of
              NovaPlay Technologies, I've delivered mobile apps, web platforms,
              custom software, and business solutions designed for growth,
              innovation, and profitability.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { k: "Founded", v: "NovaPlay Technologies" },
                { k: "Based in", v: "Worldwide🌍" },
                { k: "Stack", v: "Mobile · Web · AI" },
                { k: "Status", v: "Available for work 👨‍💻" },
              ].map((i) => (
                <div
                  key={i.k}
                  className="rounded-2xl border border-border bg-surface/60 p-4"
                >
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {i.k}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground">
                    {i.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl glass-panel p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.25em] text-gold">
                Core Capabilities
              </div>
              <h3 className="mt-3 font-display text-3xl">My Skills</h3>
              <div className="mt-8 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm text-foreground/90 transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Check className="h-3 w-3 text-gold" /> {s}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <div className="text-xs uppercase tracking-[0.25em] text-gold">
                  Education
                </div>
                <h4 className="mt-3 font-display text-2xl">
                  Self-Taught Software Developer
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  5+ years across Mobile App Development, Website Development,
                  UI/UX Design, Digital Product Development, Business Solutions,
                  and AI-Assisted Development.
                </p>
              </div>
            </div>
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
