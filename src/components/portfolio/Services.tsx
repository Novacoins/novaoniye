import { motion } from "motion/react";
import {
  Smartphone,
  Globe,
  ShoppingBag,
  Building2,
  Settings,
  Palette,
  Rocket,
  Workflow,
  Wrench,
  TrendingUp,
  MonitorSmartphone,
  Target,
} from "lucide-react";
import { SectionLabel } from "./About";

const services = [
  { icon: Smartphone, title: "Mobile App Development", desc: "Native & cross-platform apps engineered for performance and scale." },
  { icon: Globe, title: "Website Design & Development", desc: "Pixel-perfect, fast, responsive websites that convert visitors." },
  { icon: ShoppingBag, title: "E-Commerce Development", desc: "Full storefronts with payments, inventory, and growth tooling." },
  { icon: Building2, title: "Business Websites", desc: "Premium corporate sites that establish authority and trust." },
  { icon: Settings, title: "Custom Software Solutions", desc: "Tailor-made platforms built around your unique workflow." },
  { icon: Palette, title: "UI / UX Design", desc: "Interfaces designed with clarity, hierarchy, and craft." },
  { icon: Rocket, title: "Landing Page Development", desc: "High-conversion landing pages for launches and campaigns." },
  { icon: Workflow, title: "Business Automation", desc: "Streamline ops with smart workflows and AI-assisted tools." },
  { icon: Wrench, title: "App Customization", desc: "Refresh, extend, or rebuild existing apps end-to-end." },
  { icon: TrendingUp, title: "SEO Optimization", desc: "Technical SEO and structure that earns long-term traffic." },
  { icon: MonitorSmartphone, title: "Web Applications", desc: "Modern web apps with real-time data and dashboards." },
  { icon: Target, title: "Branding Solutions", desc: "Cohesive brand systems for digital-first businesses." },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Services crafted for{" "}
              <span className="text-gold-gradient italic">premium</span> results.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            End-to-end digital product capability — from idea to launch and
            beyond.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-7 transition-all hover:border-gold/40 hover:bg-surface-elevated"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-all duration-500 group-hover:bg-gold/20" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
