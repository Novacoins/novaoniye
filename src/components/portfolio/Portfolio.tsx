import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "./About";
import { projects } from "./projects-data";

const categories = [
  "All",
  "Mobile Apps",
  "Educational Apps",
  "Websites",
  "Business Apps",
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Projects that move{" "}
              <span className="text-gold-gradient italic">businesses</span>{" "}
              forward.
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                filter === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border bg-surface/60 text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 transition-all duration-500 hover:border-gold/60 hover:gold-glow"
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="relative block aspect-[4/3] overflow-hidden bg-black"
              >
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                  {p.tag}
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-widest text-emerald-300 backdrop-blur">
                  {p.status}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{p.cat}</span>
                  <span className="text-gold/80">V{p.version} · {p.platform.toUpperCase()}</span>
                </div>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:rotate-45" />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.short}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[10px] tracking-wide text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
