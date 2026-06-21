import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./About";

const categories = [
  "All",
  "Mobile Apps",
  "Websites",
  "Business Apps",
  "Crypto Apps",
  "Educational Apps",
  "E-Commerce",
];

const projects = [
  { title: "NovaPlay", cat: "Mobile Apps", desc: "Reward-based gaming experience with engaging gameplay loops.", tag: "Flagship" },
  { title: "NovaSpin", cat: "Mobile Apps", desc: "Spin-to-win mobile app with real rewards and clean UI.", tag: "Live" },
  { title: "NovaMemory", cat: "Educational Apps", desc: "Brain-training memory game built for daily engagement.", tag: "Launched" },
  { title: "Crypto Mining Tycoon", cat: "Crypto Apps", desc: "Tycoon-style crypto simulator with progression mechanics.", tag: "Trending" },
  { title: "Rewards & Spin Wheel", cat: "Mobile Apps", desc: "Rewards engine with spin wheel, missions, and payouts.", tag: "Popular" },
  { title: "Business Management Suite", cat: "Business Apps", desc: "Operations dashboard for SMB workflow automation.", tag: "Custom" },
  { title: "Educational Learning App", cat: "Educational Apps", desc: "Interactive learning platform with progress tracking.", tag: "Edtech" },
  { title: "E-Commerce Platform", cat: "E-Commerce", desc: "Full-featured storefront with payments and inventory.", tag: "Live" },
  { title: "Booking & Reservation System", cat: "Websites", desc: "End-to-end booking platform for service businesses.", tag: "Custom" },
];

const palettes = [
  "from-amber-400/30 via-yellow-200/10 to-transparent",
  "from-yellow-300/30 via-amber-500/10 to-transparent",
  "from-orange-300/25 via-amber-200/10 to-transparent",
  "from-yellow-400/30 via-yellow-100/10 to-transparent",
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
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 transition-all hover:border-gold/40"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${
                  palettes[i % palettes.length]
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.85_0.15_88_/_0.3),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-6xl text-gold-gradient opacity-80">
                    {p.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <div className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {p.cat}
                </div>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:rotate-45" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
