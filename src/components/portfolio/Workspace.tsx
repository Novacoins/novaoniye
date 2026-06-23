import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Bell,
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { projects } from "./projects-data";

/* ---------------- Sound (WebAudio synthesized) ---------------- */
function useSfx(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!enabled) {
      ambientRef.current?.stop();
      ambientRef.current = null;
      return;
    }
    const Ctx =
      (window as unknown as { AudioContext: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    // soft ambience (low pad)
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 110;
    g.gain.value = 0.012;
    o.connect(g).connect(ctx.destination);
    o.start();
    ambientRef.current = {
      stop: () => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      },
    };
    return () => {
      ambientRef.current?.stop();
      ambientRef.current = null;
    };
  }, [enabled]);

  const ping = (freq: number, dur = 0.06, type: OscillatorType = "square", vol = 0.05) => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  };

  return {
    key: () => ping(380 + Math.random() * 240, 0.04, "square", 0.035),
    notify: () => {
      ping(880, 0.12, "sine", 0.06);
      setTimeout(() => ping(1320, 0.16, "sine", 0.05), 110);
    },
    reply: () => ping(660, 0.18, "triangle", 0.05),
  };
}

/* ---------------- Animated developer SVG ---------------- */
function DeveloperScene({
  active,
  onType,
}: {
  active: boolean;
  onType: () => void;
}) {
  const [codeOffset, setCodeOffset] = useState(0);
  const [pose, setPose] = useState<"work" | "stretch" | "tired" | "stand">("work");

  // typing tick → scroll code + sfx
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setCodeOffset((o) => (o + 14) % 280);
      onType();
    }, 220);
    return () => window.clearInterval(id);
  }, [active, onType]);

  // pose cycle
  useEffect(() => {
    if (!active) return;
    let timer: number;
    const cycle = () => {
      const r = Math.random();
      const next: typeof pose =
        r < 0.55 ? "work" : r < 0.75 ? "stretch" : r < 0.9 ? "tired" : "stand";
      setPose(next);
      timer = window.setTimeout(cycle, 4500 + Math.random() * 4000);
    };
    timer = window.setTimeout(cycle, 5000);
    return () => window.clearTimeout(timer);
  }, [active]);

  const armAnim =
    pose === "stretch"
      ? { rotate: [-8, -60, -8], y: [0, -6, 0] }
      : pose === "tired"
      ? { rotate: [-6, -2, -6], y: [0, 1, 0] }
      : pose === "stand"
      ? { rotate: [-10, -10, -10], y: [-8, -8, -8] }
      : { rotate: [-8, -16, -8], y: [0, -2, 0] };

  const headAnim =
    pose === "tired"
      ? { rotate: [0, 8, 0], y: [0, 3, 0] }
      : pose === "stretch"
      ? { rotate: [0, -10, 0], y: [0, -4, 0] }
      : { rotate: [-4, 4, -4] };

  const bodyY = pose === "stand" ? -16 : 0;

  return (
    <svg
      viewBox="0 0 600 380"
      className="h-full w-full"
      role="img"
      aria-label="Animated developer at workspace"
    >
      <defs>
        <linearGradient id="screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0b0f1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="gold" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(45 90% 55%)" />
          <stop offset="1" stopColor="hsl(40 95% 70%)" />
        </linearGradient>
        <radialGradient id="lamp" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="hsl(45 95% 70% / 0.55)" />
          <stop offset="1" stopColor="hsl(45 95% 70% / 0)" />
        </radialGradient>
        <clipPath id="mClip">
          <rect x="155" y="70" width="160" height="100" rx="6" />
        </clipPath>
        <clipPath id="mClip2">
          <rect x="335" y="80" width="140" height="90" rx="6" />
        </clipPath>
      </defs>

      {/* lamp glow */}
      <ellipse cx="300" cy="60" rx="260" ry="120" fill="url(#lamp)" />

      {/* desk */}
      <rect x="40" y="270" width="520" height="14" rx="3" fill="#1a1a1a" stroke="url(#gold)" strokeOpacity="0.4" />
      <rect x="60" y="284" width="14" height="80" fill="#111" />
      <rect x="526" y="284" width="14" height="80" fill="#111" />

      {/* left monitor */}
      <g>
        <rect x="148" y="60" width="174" height="120" rx="10" fill="#0a0a0a" stroke="url(#gold)" strokeOpacity="0.6" />
        <rect x="155" y="70" width="160" height="100" rx="6" fill="url(#screen)" />
        <g clipPath="url(#mClip)">
          <g transform={`translate(0, ${-codeOffset})`}>
            {Array.from({ length: 26 }).map((_, i) => (
              <g key={i} transform={`translate(162, ${82 + i * 14})`}>
                <rect width="10" height="3" fill="hsl(45 90% 60%)" opacity="0.7" />
                <rect x="14" width={30 + ((i * 17) % 50)} height="3" fill="#9aa3b2" opacity="0.7" />
                <rect x={50 + ((i * 11) % 30)} width={20 + ((i * 7) % 40)} height="3" fill="hsl(160 70% 55%)" opacity="0.7" />
              </g>
            ))}
          </g>
          {/* cursor */}
          <motion.rect
            x="180"
            y={82 + (((codeOffset / 14) | 0) % 6) * 14}
            width="2"
            height="8"
            fill="hsl(45 90% 65%)"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </g>
        <rect x="220" y="180" width="30" height="6" rx="2" fill="#1a1a1a" />
        <rect x="200" y="186" width="70" height="4" rx="2" fill="#1a1a1a" />
      </g>

      {/* right monitor */}
      <g>
        <rect x="330" y="72" width="150" height="100" rx="10" fill="#0a0a0a" stroke="url(#gold)" strokeOpacity="0.4" />
        <rect x="335" y="80" width="140" height="90" rx="6" fill="url(#screen)" />
        <g clipPath="url(#mClip2)">
          {/* dashboard mock */}
          <rect x="342" y="90" width="50" height="30" rx="3" fill="hsl(45 90% 55% / 0.18)" stroke="hsl(45 90% 55% / 0.6)" />
          <rect x="398" y="90" width="70" height="30" rx="3" fill="#111" stroke="#222" />
          <motion.rect
            x="342"
            y="128"
            height="6"
            rx="2"
            fill="url(#gold)"
            animate={{ width: [20, 120, 60, 120] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <rect x="342" y="140" width="126" height="4" rx="2" fill="#222" />
          <rect x="342" y="150" width="90" height="4" rx="2" fill="#222" />
        </g>
        <rect x="392" y="172" width="26" height="6" rx="2" fill="#1a1a1a" />
        <rect x="372" y="178" width="66" height="4" rx="2" fill="#1a1a1a" />
      </g>

      {/* laptop */}
      <g>
        <rect x="240" y="220" width="120" height="60" rx="4" fill="#0a0a0a" stroke="url(#gold)" strokeOpacity="0.45" />
        <rect x="246" y="226" width="108" height="48" rx="2" fill="#0c1220" />
        <motion.rect
          x="250"
          y="232"
          width="50"
          height="3"
          fill="hsl(160 70% 55%)"
          animate={{ width: [10, 90, 10] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <rect x="225" y="278" width="150" height="6" rx="2" fill="#111" />
      </g>

      {/* keyboard + mouse */}
      <rect x="180" y="296" width="180" height="22" rx="4" fill="#0c0c0c" stroke="url(#gold)" strokeOpacity="0.35" />
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.rect
          key={i}
          x={188 + i * 12}
          y={302}
          width="9"
          height="9"
          rx="1.5"
          fill="#1a1a1a"
          animate={active ? { y: [302, 304, 302] } : undefined}
          transition={{
            duration: 0.18,
            repeat: Infinity,
            delay: (i * 0.07) % 0.9,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.g
        animate={active ? { x: [0, 8, -4, 0], y: [0, -2, 3, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="380" y="300" width="24" height="32" rx="10" fill="#101010" stroke="url(#gold)" strokeOpacity="0.4" />
      </motion.g>

      {/* developer (body) */}
      <motion.g animate={{ y: bodyY }} transition={{ type: "spring", stiffness: 80, damping: 14 }}>
        {/* chair back */}
        <rect x="430" y="200" width="14" height="90" rx="4" fill="#1a1a1a" />
        <rect x="410" y="210" width="60" height="70" rx="10" fill="#161616" stroke="url(#gold)" strokeOpacity="0.3" />

        {/* torso */}
        <path
          d="M380 250 q40 -28 80 0 l-6 50 q-34 14 -68 0 z"
          fill="#111"
          stroke="url(#gold)"
          strokeOpacity="0.45"
        />

        {/* arms (animated) */}
        <motion.g
          style={{ originX: "445px", originY: "258px" }}
          animate={active ? armAnim : undefined}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M438 256 q-30 28 -80 44" stroke="#1c1c1c" strokeWidth="10" fill="none" strokeLinecap="round" />
          <circle cx="360" cy="302" r="6" fill="#e9c674" />
        </motion.g>
        <motion.g
          style={{ originX: "405px", originY: "258px" }}
          animate={active ? { ...armAnim, rotate: armAnim.rotate.map((r) => -r) } : undefined}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M408 256 q30 28 70 44" stroke="#1c1c1c" strokeWidth="10" fill="none" strokeLinecap="round" />
          <circle cx="478" cy="302" r="6" fill="#e9c674" />
        </motion.g>

        {/* head */}
        <motion.g
          style={{ originX: "422px", originY: "230px" }}
          animate={active ? headAnim : undefined}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="422" cy="222" r="22" fill="#e9c674" />
          {/* hair */}
          <path d="M400 218 q22 -30 44 0 q-4 -12 -22 -14 q-18 2 -22 14 z" fill="#0d0d0d" />
          {/* eyes */}
          <AnimatePresence>
            {pose !== "tired" ? (
              <motion.g key="open">
                <circle cx="414" cy="224" r="1.8" fill="#0a0a0a" />
                <circle cx="430" cy="224" r="1.8" fill="#0a0a0a" />
              </motion.g>
            ) : (
              <motion.g key="closed">
                <rect x="411" y="223" width="6" height="1.4" fill="#0a0a0a" />
                <rect x="427" y="223" width="6" height="1.4" fill="#0a0a0a" />
              </motion.g>
            )}
          </AnimatePresence>
          {/* mouth */}
          <path
            d={pose === "tired" ? "M416 234 q6 -2 12 0" : "M416 233 q6 3 12 0"}
            stroke="#0a0a0a"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* headphones */}
          <path d="M398 220 q24 -28 48 0" stroke="url(#gold)" strokeWidth="2" fill="none" />
          <rect x="395" y="218" width="6" height="12" rx="2" fill="#1a1a1a" />
          <rect x="443" y="218" width="6" height="12" rx="2" fill="#1a1a1a" />
        </motion.g>
      </motion.g>

      {/* lamp */}
      <g>
        <rect x="86" y="180" width="6" height="80" fill="#1a1a1a" />
        <path d="M70 180 l40 0 l-10 -24 l-20 0 z" fill="#161616" stroke="url(#gold)" strokeOpacity="0.5" />
      </g>

      {/* plant */}
      <g>
        <rect x="500" y="240" width="30" height="28" rx="3" fill="#161616" />
        <path d="M515 240 q-10 -20 -18 -24 q4 18 18 24z" fill="hsl(150 50% 35%)" />
        <path d="M515 240 q10 -22 22 -22 q-2 18 -22 22z" fill="hsl(150 55% 40%)" />
      </g>
    </svg>
  );
}

/* ---------------- Project rotator ---------------- */
const rotatorItems = [
  ...projects.map((p) => ({
    name: p.title,
    image: p.image,
    category: p.category,
    platform: p.platform,
    status: p.status,
    version: p.version,
  })),
  {
    name: "Next Project",
    image: projects[0].image,
    category: "Coming Soon",
    platform: "Multi-platform",
    status: "In Development" as const,
    version: "TBA",
    placeholder: true as const,
  },
];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((x) => (x + 1) % rotatorItems.length), 4000);
    return () => window.clearInterval(id);
  }, []);
  const item = rotatorItems[i];
  return (
    <div className="relative mx-auto mt-10 max-w-3xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[hsl(45_90%_55%/0.25)] bg-black/60 shadow-[0_20px_80px_-20px_hsl(45_90%_55%/0.35)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {"placeholder" in item ? (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1408]">
                <div className="text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-[hsl(45_90%_60%)]" />
                  <div className="mt-3 text-2xl font-semibold text-[hsl(45_90%_70%)]">
                    Next Project
                  </div>
                  <div className="mt-1 text-sm text-white/60">In active development</div>
                </div>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* info card */}
        <motion.div
          key={`info-${i}`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[hsl(45_90%_70%)]">
                {item.category}
              </div>
              <div className="mt-1 text-xl font-semibold text-white">{item.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {[
                { k: "Status", v: item.status },
                { k: "Platform", v: item.platform },
                { k: "Version", v: item.version },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-md border border-white/10 bg-black/50 px-2 py-1 text-center"
                >
                  <div className="text-[9px] uppercase tracking-wider text-white/50">
                    {m.k}
                  </div>
                  <div className="mt-0.5 font-medium text-white">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* dots */}
      <div className="mt-4 flex justify-center gap-2">
        {rotatorItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show project ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-[hsl(45_90%_60%)]" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export function Workspace() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [soundOn, setSoundOn] = useState(false);
  const [playing, setPlaying] = useState(true);
  const sfx = useSfx(soundOn && inView && playing);

  const [notif, setNotif] = useState<null | "incoming" | "reply">(null);
  useEffect(() => {
    if (!inView || !playing) return;
    let t1: number;
    let t2: number;
    const loop = () => {
      t1 = window.setTimeout(() => {
        setNotif("incoming");
        sfx.notify();
        t2 = window.setTimeout(() => {
          setNotif("reply");
          sfx.reply();
          window.setTimeout(() => setNotif(null), 1600);
        }, 2200);
      }, 6000 + Math.random() * 4000);
    };
    loop();
    const id = window.setInterval(loop, 12000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(id);
    };
  }, [inView, playing, sfx]);

  const active = inView && playing;

  const onType = useMemo(() => {
    let n = 0;
    return () => {
      n = (n + 1) % 3;
      if (n === 0) sfx.key();
    };
  }, [sfx]);

  return (
    <section
      id="workspace"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[hsl(45_90%_55%/0.10)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(45_90%_55%/0.35)] bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[hsl(45_90%_70%)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Live Developer Workspace
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Inside the <span className="text-gold-gradient">Studio</span>
          </h2>
          <p className="mt-3 text-white/65">
            A peek into the workspace where premium mobile apps, web platforms,
            and digital products come to life.
          </p>
        </div>

        {/* scene */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(45_90%_55%/0.25)] bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-4 shadow-[0_30px_120px_-30px_hsl(45_90%_55%/0.35)] sm:p-8">
            {/* controls */}
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause animation" : "Play animation"}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur transition hover:text-[hsl(45_90%_70%)]"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setSoundOn((s) => !s)}
                aria-label={soundOn ? "Mute sound" : "Enable sound"}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-[hsl(45_90%_55%/0.4)] bg-black/60 px-3 text-xs text-[hsl(45_90%_75%)] backdrop-blur transition hover:bg-[hsl(45_90%_55%/0.12)]"
              >
                {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                {soundOn ? "Sound on" : "Enable sound"}
              </button>
            </div>

            {/* scene grid */}
            <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_280px]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-[radial-gradient(ellipse_at_top,hsl(45_90%_55%/0.10),transparent_60%)]">
                <DeveloperScene active={active} onType={onType} />

                {/* notification popup */}
                <AnimatePresence>
                  {notif && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="absolute right-4 top-4 w-56 rounded-xl border border-[hsl(45_90%_55%/0.4)] bg-black/80 p-3 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(45_90%_55%/0.2)]">
                          <Bell className="h-3.5 w-3.5 text-[hsl(45_90%_70%)]" />
                        </div>
                        <div className="text-xs">
                          <div className="font-medium text-white">
                            {notif === "incoming" ? "New client message" : "Reply sent ✓"}
                          </div>
                          <div className="text-white/55">
                            {notif === "incoming" ? "Project inquiry • now" : "Delivered just now"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* side panel (music + status) */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-[hsl(45_90%_55%/0.2)]">
                      <Music2 className="h-4 w-4 text-[hsl(45_90%_70%)]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Lo-fi Focus</div>
                      <div className="text-[11px] text-white/55">Deep work • Studio mix</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-1">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 rounded-sm bg-gradient-to-t from-[hsl(45_90%_45%)] to-[hsl(45_90%_75%)]"
                        animate={active ? { height: [6, 18 + (i % 6) * 3, 6] } : { height: 6 }}
                        transition={{
                          duration: 0.9 + (i % 4) * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (i * 0.07) % 1.2,
                        }}
                        style={{ height: 6 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                    Live Status
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm text-white">Coding in session</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                      <div className="text-white/50">Editor</div>
                      <div className="font-medium text-white">VS Code</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                      <div className="text-white/50">Stack</div>
                      <div className="font-medium text-white">Flutter</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                      <div className="text-white/50">Branch</div>
                      <div className="font-medium text-white">main</div>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                      <div className="text-white/50">Uptime</div>
                      <div className="font-medium text-white">∞</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* rotator */}
            <Rotator />
          </div>
        </div>
      </div>
    </section>
  );
}
