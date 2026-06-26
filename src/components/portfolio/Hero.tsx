import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Volume2,
  VolumeX,
  Bell,
  Music2,
  Code2,
  Braces,
  Terminal,
  Cpu,
} from "lucide-react";
import workspaceAsset from "@/assets/developer-workspace.png.asset.json";
import profileAsset from "@/assets/profile-picture.png.asset.json";

const workspace = workspaceAsset.url;
const profilePicture = profileAsset.url;

const HERO_STATEMENT =
  "I Build Premium Mobile Apps, Web Applications, and Digital Products That Help Businesses Grow, Engage Users, and Scale Successfully.";

function useTyping(text: string, speed = 28) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

// Lightweight WebAudio-synthesized SFX (no asset deps)
function useSfx(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    if (!enabled) return;
    if (!ctxRef.current) {
      const AC =
        (window as unknown as { AudioContext?: typeof AudioContext })
          .AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    ctxRef.current?.resume();
  }, [enabled]);

  const blip = (freq: number, dur = 0.08, type: OscillatorType = "square") => {
    const ctx = ctxRef.current;
    if (!ctx || !enabled) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0.04;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  };

  return {
    type: () => blip(900 + Math.random() * 600, 0.04, "square"),
    notify: () => {
      blip(880, 0.12, "sine");
      setTimeout(() => blip(1320, 0.18, "sine"), 110);
    },
    reply: () => blip(1100, 0.1, "triangle"),
  };
}

export function Hero() {
  const typed = useTyping(HERO_STATEMENT, 24);
  const [soundOn, setSoundOn] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const sfx = useSfx(soundOn);

  // Periodic typing sounds
  useEffect(() => {
    if (!soundOn) return;
    const id = setInterval(() => sfx.type(), 180);
    return () => clearInterval(id);
  }, [soundOn, sfx]);

  // Periodic notification
  useEffect(() => {
    const loop = setInterval(() => {
      setShowNotif(true);
      if (soundOn) sfx.notify();
      setTimeout(() => {
        if (soundOn) sfx.reply();
      }, 1800);
      setTimeout(() => setShowNotif(false), 3600);
    }, 7000);
    return () => clearInterval(loop);
  }, [soundOn, sfx]);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-32"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-6 flex items-center gap-3 sm:gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-full bg-gradient-to-tr from-gold via-[#ffe9a0] to-gold p-[3px] shadow-lg shadow-gold/25 sm:h-20 sm:w-20 lg:h-24 lg:w-24 lg:p-[4px]">
              <div className="absolute inset-[-12%] rounded-full bg-gradient-to-tr from-gold/50 via-[#ffe9a0]/50 to-gold/50 opacity-75 blur-md animate-pulse" />
              <img
                src={profilePicture}
                alt="Oniye Taofiq Ishola"
                className="relative h-full w-full rounded-full object-cover shadow-2xl"
              />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground sm:text-base lg:text-lg">
                Oniye Taofiq Ishola
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">
                Founder, NovaPlay Technologies
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3 w-3" /> Founder · NovaPlay Technologies
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {typed}
            <span className="ml-1 inline-block h-[0.9em] w-[3px] -translate-y-[-4px] animate-pulse bg-gold align-middle" />
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I'm <span className="text-gold-gradient font-semibold">Nova Prime Official</span> — a
            mobile app developer, web developer, and digital entrepreneur with
            5+ years crafting premium, business-focused digital products.
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
            <button
              onClick={() => setSoundOn((s) => !s)}
              aria-label={soundOn ? "Mute sound effects" : "Enable sound effects"}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-surface/60 px-5 py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {soundOn ? (
                <Volume2 className="h-4 w-4 text-gold" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {soundOn ? "Sound on" : "Enable sound"}
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
            <Stat value="5+" label="Years exp." />
            <div className="h-10 w-px bg-border" />
            <Stat value="50+" label="Projects" />
            <div className="h-10 w-px bg-border" />
            <Stat value="100%" label="Dedication" />
          </div>
        </motion.div>

        {/* Animated workspace scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative">
            {/* Glow backdrop */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-gold/20 via-transparent to-silver/10 blur-3xl" />
            <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_0deg,_#ffd700,_transparent_30%,_#c0c0c0_60%,_transparent_90%,_#ffd700)] opacity-20 animate-spin [animation-duration:24s]" />

            {/* Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[2rem] glass-panel gold-glow"
            >
              <img
                src={workspace}
                alt="Premium developer workspace with dual monitors and mechanical keyboard"
                width={1024}
                height={1024}
                className="block h-full w-full object-cover"
              />

              {/* Subtle monitor glow pulse */}
              <motion.div
                aria-hidden
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.85_0.15_88_/_0.25),_transparent_60%)]"
              />

              {/* Floating code icons */}
              <FloatIcon icon={<Code2 />} className="left-4 top-6" delay={0} />
              <FloatIcon icon={<Braces />} className="right-6 top-12" delay={1.2} />
              <FloatIcon icon={<Terminal />} className="left-8 bottom-20" delay={2.1} />
              <FloatIcon icon={<Cpu />} className="right-10 bottom-10" delay={0.6} />

              {/* Music widget */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl glass-panel px-3 py-2"
              >
                <Music2 className="h-3.5 w-3.5 text-gold" />
                <div className="flex items-end gap-0.5">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [4, 12, 6, 14, 4] }}
                      transition={{
                        duration: 1 + i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-[3px] rounded-sm bg-gold"
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Lo-fi
                </span>
              </motion.div>

              {/* Notification popup */}
              <AnimatePresence>
                {showNotif && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="absolute right-4 top-4 flex max-w-[200px] items-start gap-2 rounded-2xl glass-panel px-3 py-2.5"
                  >
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Bell className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-foreground">
                        New client message
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        "Can we ship by Friday?" — replying…
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Outside floating badges */}
            <FloatBadge
              className="-left-4 top-10"
              title="React Native"
              sub="Mobile Expert"
            />
            <FloatBadge
              className="-right-4 bottom-24"
              title="Available"
              sub="For new projects"
              delay={1.4}
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

function FloatIcon({
  icon,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`pointer-events-none absolute flex h-9 w-9 items-center justify-center rounded-xl border border-gold/30 bg-background/40 text-gold backdrop-blur-md ${className}`}
    >
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
    </motion.div>
  );
}
