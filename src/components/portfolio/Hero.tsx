import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import portrait from "@/assets/oniye-portrait.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-32"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3 w-3" /> Founder · NovaPlay Technologies
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Transforming ideas into{" "}
            <span className="text-gold-gradient italic">powerful</span> mobile
            apps & websites.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm <span className="text-foreground">Oniye Taofiq Ishola</span> — a
            mobile app developer, web developer, and digital entrepreneur with
            5+ years crafting premium, business-focused digital products that
            drive growth.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] gold-glow"
            >
              Hire Me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-4 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              View Portfolio
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
            <Stat value="5+" label="Years exp." />
            <div className="h-10 w-px bg-border" />
            <Stat value="50+" label="Projects" />
            <div className="h-10 w-px bg-border" />
            <Stat value="100%" label="Dedication" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-square">
            {/* Rotating gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold via-transparent to-silver/30 blur-2xl opacity-60" />
            <div className="absolute inset-2 rounded-full bg-[conic-gradient(from_0deg,_#ffd700,_transparent_30%,_#c0c0c0_60%,_transparent_90%,_#ffd700)] opacity-50 animate-spin [animation-duration:20s]" />
            <div className="absolute inset-3 overflow-hidden rounded-full glass-panel">
              <img
                src={portrait}
                alt="Oniye Taofiq Ishola, Mobile & Web Developer"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <FloatBadge
              className="-left-6 top-12"
              title="React Native"
              sub="Mobile Expert"
            />
            <FloatBadge
              className="-right-4 top-1/2"
              title="98% Clients"
              sub="Satisfied"
              delay={1}
            />
            <FloatBadge
              className="bottom-6 left-1/4"
              title="Available"
              sub="For new projects"
              delay={2}
              dot
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-gold-gradient">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function FloatBadge({
  className,
  title,
  sub,
  delay = 0,
  dot,
}: {
  className?: string;
  title: string;
  sub: string;
  delay?: number;
  dot?: boolean;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay }}
      className={`absolute z-10 rounded-2xl glass-panel px-4 py-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        {dot && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
        )}
        <div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {sub}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
