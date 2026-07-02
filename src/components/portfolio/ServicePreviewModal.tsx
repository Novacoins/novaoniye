import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/* ============================================================
   Realistic app mockups shown inside a phone or browser frame.
   All content is authentic-styled (colors, layout) — no lorem.
   ============================================================ */

export type PreviewKind =
  | "chatgpt"
  | "facebook"
  | "appstore"
  | "amazon"
  | "cloudflare"
  | "aws"
  | "figma"
  | "shopify"
  | "instagram"
  | "netflix"
  | "ubereats"
  | "uber"
  | "health"
  | "bank"
  | "duolingo"
  | "zillow"
  | "airbnb"
  | "gaming"
  | "spotify"
  | "tracker";

const AUTO_CLOSE_MS = 7000;

/* ----------------- Phone Frame ----------------- */
function PhoneFrame({
  children,
  label,
  onClose,
  browser,
  url,
}: {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
  browser?: boolean;
  url?: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll like a reel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const start = performance.now();
    const duration = AUTO_CLOSE_MS - 400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const max = el.scrollHeight - el.clientHeight;
      el.scrollTop = max * p;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Auto-close
  useEffect(() => {
    const id = window.setTimeout(onClose, AUTO_CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3 rounded-full border border-gold/40 bg-black/60 px-5 py-2 text-sm font-medium text-gold backdrop-blur-xl">
          <span>{label}</span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute -top-2 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-white/10 md:-right-14 md:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Phone body */}
        <div
          className="relative overflow-hidden rounded-[2.6rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-[0_40px_120px_-10px_rgba(255,215,0,0.35)]"
          style={{ width: 320, height: 640 }}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 flex h-6 w-32 -translate-x-1/2 items-center justify-center rounded-b-2xl bg-black" />
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-1.5 text-[10px] font-semibold text-white/90 mix-blend-difference">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span>●●●●</span>
              <span>􀛨</span>
              <span>100%</span>
            </span>
          </div>

          {browser && (
            <div className="absolute inset-x-0 top-7 z-10 flex items-center gap-2 border-b border-white/10 bg-neutral-800/95 px-3 py-1.5 text-[10px] text-white/80">
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="flex flex-1 items-center gap-1 rounded-md bg-neutral-700/70 px-2 py-1">
                <span className="text-green-400">🔒</span>
                <span className="truncate">{url}</span>
              </span>
            </div>
          )}

          {/* Content scroll */}
          <div
            ref={scrollRef}
            className="scroll-smooth h-full w-full overflow-y-auto overflow-x-hidden pt-8"
            style={{ paddingTop: browser ? 60 : 32 }}
          >
            {children}
            <div className="h-16" />
          </div>

          {/* Home indicator */}
          <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center">
            <span className="h-1 w-24 rounded-full bg-white/70" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ----------------- Mockups ----------------- */

function ChatGPTMock() {
  return (
    <div className="min-h-[900px] bg-[#212121] p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>ChatGPT</span>
          <span className="text-white/50">4o ▾</span>
        </div>
        <div className="h-7 w-7 rounded-full bg-emerald-500 text-center text-xs font-bold leading-7">O</div>
      </div>
      <div className="mt-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-black">✦</div>
        <div className="mt-4 text-lg font-semibold">What can I help with?</div>
      </div>
      <div className="mt-6 space-y-2">
        {[
          "✍️  Write a cover letter for a startup role",
          "🗺️  Plan a 7-day trip to Japan",
          "💡  Explain React hooks like I'm 5",
          "📊  Summarize this earnings report",
          "🐍  Debug my Python function",
          "🎨  Brainstorm a logo for my brand",
        ].map((t) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm">
            {t}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 text-xs">
        {["🔍 Search", "💻 Code", "🖼 Image", "📈 Analyze", "🧠 Reason"].map((c) => (
          <span key={c} className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#2f2f2f] px-3 py-2.5">
        <span className="text-white/60">＋</span>
        <span className="flex-1 text-sm text-white/50">Message ChatGPT…</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">↑</span>
      </div>
    </div>
  );
}

function FacebookMock() {
  return (
    <div className="min-h-[1100px] bg-[#f0f2f5] pb-4">
      <div className="sticky top-0 z-10 bg-[#1877f2] px-4 py-3">
        <div className="text-xl font-black italic text-white">facebook</div>
      </div>
      <div className="flex gap-2 overflow-x-auto p-3">
        {["#FF6B6B","#4ECDC4","#FFD93D","#95E1D3","#C74B50"].map((c) => (
          <div key={c} className="relative h-32 w-20 shrink-0 overflow-hidden rounded-xl" style={{ background: `linear-gradient(160deg, ${c}, #333)` }}>
            <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-white">Story</div>
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 rounded-xl bg-white p-3 text-sm shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#1877f2] text-center text-sm font-bold leading-9 text-white">N</div>
          <div className="flex-1 text-neutral-500">What's on your mind?</div>
        </div>
      </div>
      {[
        { name: "Sarah Kim", time: "2h · 🌎", text: "Just launched my new portfolio! So excited to share it with everyone 🚀", likes: "1.2K", cm: 84 },
        { name: "Marcus Bell", time: "5h · 🌎", text: "Sunset from the office window today. Grateful moments 🌅", likes: "3.4K", cm: 210 },
      ].map((p) => (
        <div key={p.name} className="mx-3 mb-3 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-2 p-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-black">{p.name}</div>
              <div className="text-[11px] text-neutral-500">{p.time}</div>
            </div>
            <div className="text-neutral-500">⋯</div>
          </div>
          <div className="px-3 pb-3 text-sm text-black">{p.text}</div>
          <div className="h-40 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500" />
          <div className="flex items-center justify-between px-3 py-2 text-xs text-neutral-600">
            <div className="flex items-center gap-1">
              <span>👍❤️😂</span>
              <span>{p.likes}</span>
            </div>
            <div>{p.cm} comments</div>
          </div>
          <div className="flex border-t border-neutral-200 text-sm font-medium text-neutral-700">
            {["👍 Like", "💬 Comment", "↗ Share"].map((b) => (
              <div key={b} className="flex-1 py-2 text-center">{b}</div>
            ))}
          </div>
        </div>
      ))}
      <div className="sticky bottom-0 flex justify-around border-t border-neutral-200 bg-white py-2 text-[#1877f2]">
        {["🏠","👥","▶","🔔","☰"].map((i) => <span key={i} className="text-lg">{i}</span>)}
      </div>
    </div>
  );
}

function AppStoreMock() {
  return (
    <div className="min-h-[1000px] bg-[#f2f2f7] pb-4 text-black">
      <div className="px-4 pt-3">
        <div className="text-2xl font-bold">App Store</div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-neutral-200 px-3 py-2 text-sm text-neutral-500">
          <span>🔍</span> Search
        </div>
        <div className="mt-4 flex gap-4 text-sm font-semibold">
          <span className="text-blue-500">Today</span><span>Apps</span><span>Games</span><span>Arcade</span>
        </div>
      </div>
      <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 p-4 text-white shadow">
        <div className="text-xs uppercase tracking-wider">App of the Day</div>
        <div className="mt-1 text-xl font-bold">Focus — Deep Work Timer</div>
        <div className="mt-1 text-xs opacity-90">Get more done in less time.</div>
        <div className="mt-16 flex items-center gap-2">
          <div className="h-12 w-12 rounded-xl bg-white/30" />
          <div className="flex-1 text-sm">Focus</div>
          <button className="rounded-full bg-white/25 px-4 py-1 text-xs font-bold">GET</button>
        </div>
      </div>
      <div className="mt-6 px-4 text-sm font-bold">Top Free Apps</div>
      <div className="flex gap-3 overflow-x-auto p-4">
        {[
          { n: "ChatGPT", c: "#10a37f", ic: "✦" },
          { n: "Spotify", c: "#1DB954", ic: "♫" },
          { n: "Instagram", c: "#E4405F", ic: "◉" },
          { n: "Facebook", c: "#1877f2", ic: "f" },
          { n: "TikTok", c: "#000", ic: "♪" },
        ].map((a) => (
          <div key={a.n} className="w-24 shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow" style={{ background: a.c }}>{a.ic}</div>
            <div className="mt-1 truncate text-xs font-semibold">{a.n}</div>
            <button className="mt-1 rounded-full bg-neutral-200 px-3 py-0.5 text-[11px] font-bold text-blue-600">GET</button>
          </div>
        ))}
      </div>
      <div className="mt-2 px-4 text-sm font-bold">Top Games</div>
      <div className="mt-2 space-y-2 px-4">
        {["Monument Valley", "Clash Royale", "Genshin Impact", "Roblox", "Among Us"].map((g, i) => (
          <div key={g} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{g}</div>
              <div className="text-[11px] text-neutral-500">Adventure · #{i + 1}</div>
            </div>
            <button className="rounded-full bg-neutral-200 px-4 py-1 text-xs font-bold text-blue-600">GET</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmazonMock() {
  return (
    <div className="min-h-[1100px] bg-white pb-6 text-black">
      <div className="bg-[#131a22] px-3 py-2">
        <div className="text-lg font-bold text-white">
          amazon<span className="text-orange-400">.</span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md bg-white px-2 py-1.5 text-xs">
          <span>🔍</span><span className="text-neutral-500">Search Amazon</span>
        </div>
        <div className="mt-2 flex gap-3 overflow-x-auto text-xs text-white">
          {["All","Electronics","Fashion","Home","Books","Deals"].map((t) => <span key={t} className="whitespace-nowrap">{t}</span>)}
        </div>
      </div>
      <div className="mx-3 mt-3 rounded-md bg-gradient-to-r from-orange-500 to-red-500 p-3 text-sm font-bold text-white">
        🎁 Holiday Deals · Up to 60% Off
      </div>
      <div className="mt-4 px-3 text-sm font-bold">Best Sellers</div>
      <div className="mt-2 grid grid-cols-2 gap-2 px-3">
        {[
          { n: "iPhone 15 Pro", p: "$999.00", c: "#eee" },
          { n: 'MacBook Air 15"', p: "$1,299.00", c: "#e0e7ff" },
          { n: "Sony WH-1000XM5", p: "$349.99", c: "#111" },
          { n: "Apple Watch S9", p: "$399.00", c: "#fee2e2" },
        ].map((p) => (
          <div key={p.n} className="rounded-md border border-neutral-200 p-2">
            <div className="h-24 rounded" style={{ background: p.c }} />
            <div className="mt-1 text-xs font-medium line-clamp-2">{p.n}</div>
            <div className="text-sm font-bold">{p.p}</div>
            <div className="text-[10px] text-blue-700">✓prime FREE Delivery</div>
          </div>
        ))}
      </div>
      <div className="mt-5 px-3 text-sm font-bold">Shop by Category</div>
      <div className="mt-2 grid grid-cols-3 gap-2 px-3">
        {["📱","💻","🎧","👕","🏠","📚","🎮","⌚","🥾"].map((e) => (
          <div key={e} className="flex aspect-square items-center justify-center rounded-md bg-neutral-100 text-2xl">{e}</div>
        ))}
      </div>
    </div>
  );
}

function CloudflareMock() {
  return (
    <div className="min-h-[1100px] bg-[#0f1421] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="text-orange-400 text-lg">☁</span>
        <span className="font-semibold">Cloudflare</span>
      </div>
      <div className="flex">
        <div className="w-24 shrink-0 border-r border-white/10 p-2 text-[11px]">
          {["Dashboard","Analytics","Security","Firewall","DNS","SSL","Workers"].map((t,i) => (
            <div key={t} className={`rounded p-1.5 ${i===2?"bg-orange-500/20 text-orange-300":"text-white/70"}`}>{t}</div>
          ))}
        </div>
        <div className="flex-1 p-3">
          <div className="text-sm font-semibold">Web Application Firewall</div>
          <div className="mt-2 rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
            <div className="text-[11px] text-orange-300">Threats blocked · today</div>
            <div className="text-2xl font-bold">1,247</div>
          </div>
          <div className="mt-3 rounded-lg bg-white/5 p-3">
            <div className="text-[11px] text-white/70">Traffic vs Threats · 24h</div>
            <svg viewBox="0 0 200 60" className="mt-1 h-16 w-full">
              <polyline points="0,50 20,45 40,40 60,30 80,35 100,20 120,25 140,15 160,20 180,10 200,15" fill="none" stroke="#60a5fa" strokeWidth="2" />
              <polyline points="0,55 20,54 40,50 60,52 80,48 100,45 120,42 140,44 160,40 180,42 200,38" fill="none" stroke="#f97316" strokeWidth="2" />
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-500/10 p-3">
            <span className="text-xs">Security Score</span>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold">94/100</span>
          </div>
          <div className="mt-3 text-xs font-semibold">Recent Threats</div>
          <div className="mt-2 space-y-1 text-[10px]">
            {[
              { ip: "185.220.101.42", t: "SQL Injection", f: "🇷🇺" },
              { ip: "45.155.204.13", t: "XSS Attempt", f: "🇨🇳" },
              { ip: "104.28.14.89", t: "Bot Traffic", f: "🇺🇸" },
              { ip: "91.240.118.202", t: "DDoS", f: "🇺🇦" },
              { ip: "203.0.113.5", t: "Path Traversal", f: "🇧🇷" },
              { ip: "198.51.100.7", t: "Brute Force", f: "🇮🇳" },
            ].map((r) => (
              <div key={r.ip} className="flex items-center justify-between rounded bg-white/5 p-2">
                <span className="font-mono">{r.ip}</span>
                <span>{r.t}</span>
                <span>{r.f}</span>
                <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-red-300">Blocked</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AWSMock() {
  return (
    <div className="min-h-[1000px] bg-[#0f172a] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-black">aws</span>
          <span className="text-sm font-semibold">Console</span>
        </div>
        <span className="text-xs text-white/60">us-east-1 ▾</span>
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold">Services</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { n: "EC2", i: "🖥", c: "#ff9900" },
            { n: "S3", i: "🪣", c: "#569A31" },
            { n: "Lambda", i: "λ", c: "#FF9900" },
            { n: "RDS", i: "🗄", c: "#3b48cc" },
            { n: "CloudFront", i: "☁", c: "#8C4FFF" },
            { n: "IAM", i: "🔑", c: "#DD344C" },
          ].map((s) => (
            <div key={s.n} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded text-white" style={{ background: s.c }}>{s.i}</div>
              <div className="mt-1 text-[11px] font-medium">{s.n}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs font-semibold">Cost Explorer</div>
          <div className="mt-1 text-2xl font-bold text-orange-400">$342.50</div>
          <div className="text-[11px] text-white/60">Estimated · this month</div>
          <svg viewBox="0 0 200 40" className="mt-2 h-12 w-full">
            <polyline points="0,30 25,25 50,28 75,20 100,22 125,15 150,18 175,10 200,12" fill="none" stroke="#f97316" strokeWidth="2" />
          </svg>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { n: "EC2 Instances", v: "12 running", ok: true },
            { n: "S3 Storage", v: "4.2 TB used", ok: true },
            { n: "Lambda Invocations", v: "2.4M / day", ok: true },
            { n: "RDS · prod-db", v: "Healthy", ok: true },
          ].map((r) => (
            <div key={r.n} className="flex items-center justify-between rounded-lg bg-white/5 p-2 text-xs">
              <span>{r.n}</span>
              <span className="text-white/70">{r.v}</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">{r.ok ? "Healthy" : "Warn"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FigmaMock() {
  return (
    <div className="min-h-[1000px] bg-[#1e1e1e] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs">
        <span className="text-pink-500">◆</span>
        <span>Brand · Logo Explorations</span>
      </div>
      <div className="flex">
        <div className="w-24 border-r border-white/10 p-2 text-[10px]">
          {["Frame 1","Logo Mark","Wordmark","Colors","Type"].map((l) => (
            <div key={l} className="rounded p-1.5 hover:bg-white/5">▸ {l}</div>
          ))}
        </div>
        <div className="flex-1 bg-[#2c2c2c] p-4">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-4xl font-black text-black">N</div>
          <div className="mt-3 text-center text-xs">Nova Studio · Monogram</div>
          <div className="mt-4 flex justify-center gap-2">
            {["#0F0F0F","#FFD700","#F5F5F5","#8C1AFF","#FF3B3B"].map((c) => (
              <div key={c} className="h-10 w-10 rounded-lg border border-white/10" style={{ background: c }} />
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-white/5 p-3 text-xs">
            <div className="font-semibold">Typography</div>
            <div className="mt-1 font-serif text-2xl">Cormorant Garamond</div>
            <div className="text-sm text-white/70">Inter · 14 / 16 / 20</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
            {["Button","Card","Input","Modal","Toast","Badge"].map((c) => (
              <div key={c} className="rounded border border-white/10 bg-white/5 p-2 text-center">{c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopifyMock() {
  return (
    <div className="min-h-[1100px] bg-white text-black">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <span className="font-bold">NOVA · Store</span>
        <span className="relative">🛒<span className="absolute -right-2 -top-1 rounded-full bg-black px-1.5 text-[10px] text-white">2</span></span>
      </div>
      <div className="relative h-40 bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400">
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xs uppercase tracking-widest">New Arrivals</div>
          <div className="text-2xl font-black">Summer Collection</div>
          <button className="mt-2 rounded-full bg-black px-4 py-1.5 text-xs">Shop Now →</button>
        </div>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto px-4 text-xs">
        {["All","New","Best Sellers","Sale","Accessories"].map((c) => (
          <span key={c} className="whitespace-nowrap rounded-full border border-neutral-300 px-3 py-1">{c}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {[
          { n: "Linen Shirt", p: "$89", c: "#f5f5dc" },
          { n: "Silk Scarf", p: "$45", c: "#f9a8d4" },
          { n: "Leather Bag", p: "$249", c: "#78350f" },
          { n: "Gold Hoops", p: "$120", c: "#facc15" },
          { n: "Denim Jacket", p: "$139", c: "#1e40af" },
          { n: "Wool Coat", p: "$399", c: "#404040" },
        ].map((p) => (
          <div key={p.n}>
            <div className="aspect-square rounded-lg" style={{ background: p.c }} />
            <div className="mt-1 text-sm">{p.n}</div>
            <div className="text-sm font-bold">{p.p}</div>
            <button className="mt-1 w-full rounded-full bg-black py-1.5 text-xs text-white">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstagramMock() {
  return (
    <div className="min-h-[1100px] bg-white text-black">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <span className="font-cursive text-xl font-bold" style={{ fontFamily: "cursive" }}>Instagram</span>
        <span>❤️  ✈️</span>
      </div>
      <div className="flex gap-3 overflow-x-auto p-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-500 p-[2px]">
              <div className="h-14 w-14 rounded-full bg-neutral-200" />
            </div>
            <div className="mt-1 text-[10px]">user_{i + 1}</div>
          </div>
        ))}
      </div>
      {[
        { u: "sarah_designs", loc: "New York", c: "linear-gradient(135deg,#f472b6,#a855f7)" },
        { u: "marcus.photo", loc: "Tokyo", c: "linear-gradient(135deg,#fbbf24,#ef4444)" },
        { u: "novastudio.co", loc: "Worldwide", c: "linear-gradient(135deg,#facc15,#000)" },
      ].map((p) => (
        <div key={p.u} className="mb-3">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{p.u}</div>
              <div className="text-[10px] text-neutral-500">{p.loc}</div>
            </div>
            <span>⋯</span>
          </div>
          <div className="h-72" style={{ background: p.c }} />
          <div className="flex items-center justify-between px-3 py-2 text-lg">
            <div className="flex gap-3">❤️ 💬 ✈️</div>
            <div>🔖</div>
          </div>
          <div className="px-3 text-sm"><span className="font-semibold">2,431 likes</span></div>
          <div className="px-3 pb-2 text-sm"><span className="font-semibold">{p.u}</span> Loving this moment ✨</div>
        </div>
      ))}
    </div>
  );
}

function NetflixMock() {
  return (
    <div className="min-h-[1100px] bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-2xl font-black text-red-600">NETFLIX</span>
        <span>🔍 👤</span>
      </div>
      <div className="relative h-72">
        <div className="h-full w-full bg-gradient-to-b from-red-900 via-neutral-900 to-black" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs uppercase text-red-500">#1 in the world today</div>
          <div className="text-2xl font-black">The Night Agent</div>
          <div className="mt-2 flex gap-2">
            <button className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-black">▶ Play</button>
            <button className="rounded bg-white/25 px-4 py-1.5 text-sm">+ My List</button>
          </div>
        </div>
      </div>
      {["Continue Watching","Trending Now","New Releases","Only on Netflix"].map((row) => (
        <div key={row} className="mt-5">
          <div className="px-4 text-sm font-bold">{row}</div>
          <div className="mt-2 flex gap-2 overflow-x-auto px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="relative h-32 w-24 shrink-0 overflow-hidden rounded" style={{ background: `hsl(${i * 60},50%,30%)` }}>
                <div className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[10px] text-green-400">{95 - i}% Match</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function UberEatsMock() {
  return (
    <div className="min-h-[1100px] bg-white text-black">
      <div className="px-4 pt-3">
        <div className="text-2xl font-bold">What are you craving?</div>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500">🔍 Restaurants, dishes…</div>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto px-4">
        {[
          { e: "🍕", n: "Pizza" },
          { e: "🍣", n: "Sushi" },
          { e: "🍔", n: "Burgers" },
          { e: "🌮", n: "Tacos" },
          { e: "🍜", n: "Ramen" },
          { e: "🥗", n: "Healthy" },
        ].map((c) => (
          <div key={c.n} className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">{c.e}</div>
            <div className="mt-1 text-xs font-medium">{c.n}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 px-4 text-sm font-bold">Featured Restaurants</div>
      <div className="mt-2 space-y-3 px-4">
        {[
          { n: "Sushi Bar Tokyo", r: 4.8, t: "20–30 min", f: "$1.99", s: true, c: "#dc2626" },
          { n: "The Burger Joint", r: 4.6, t: "15–25 min", f: "Free", s: false, c: "#f59e0b" },
          { n: "Green Bowl Kitchen", r: 4.9, t: "25–35 min", f: "$2.49", s: false, c: "#16a34a" },
          { n: "Taco Fiesta", r: 4.7, t: "20–30 min", f: "$0.99", s: true, c: "#eab308" },
        ].map((r) => (
          <div key={r.n} className="overflow-hidden rounded-xl border border-neutral-200">
            <div className="h-32 w-full" style={{ background: `linear-gradient(135deg, ${r.c}, #111)` }} />
            <div className="p-3">
              <div className="flex items-center gap-2 text-sm font-bold">
                {r.n} {r.s && <span className="rounded bg-neutral-200 px-1 text-[10px]">Sponsored</span>}
              </div>
              <div className="mt-0.5 text-xs text-neutral-600">⭐ {r.r} · {r.t} · {r.f} delivery</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UberMock() {
  return (
    <div className="min-h-[900px] bg-neutral-900 text-white">
      <div className="relative h-80 bg-[radial-gradient(circle_at_30%_40%,#374151_0%,#1f2937_60%,#111827_100%)]">
        <div className="absolute inset-4 rounded-lg opacity-40" style={{ background: "repeating-linear-gradient(45deg,#4b5563 0 2px,transparent 2px 20px)" }} />
        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-4 ring-white" />
      </div>
      <div className="p-4">
        <div className="rounded-xl bg-neutral-800 p-3">
          <div className="flex items-center gap-2 text-sm">🟢 Current Location</div>
          <div className="my-1 h-px bg-white/10" />
          <div className="flex items-center gap-2 text-sm">🟥 Where to?</div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { n: "UberX", d: "Affordable everyday rides", p: "$12.40", eta: "3 min", i: "🚗" },
            { n: "Comfort", d: "Newer cars with more legroom", p: "$16.80", eta: "5 min", i: "🚙" },
            { n: "Uber Black", d: "Premium rides in luxury cars", p: "$29.50", eta: "8 min", i: "🖤" },
          ].map((r) => (
            <div key={r.n} className="flex items-center gap-3 rounded-xl bg-neutral-800 p-3">
              <div className="text-2xl">{r.i}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{r.n} · {r.eta} away</div>
                <div className="text-xs text-white/60">{r.d}</div>
              </div>
              <div className="text-sm font-bold">{r.p}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black">Request UberX</button>
      </div>
    </div>
  );
}

function HealthMock() {
  return (
    <div className="min-h-[1000px] bg-neutral-50 text-black">
      <div className="p-4">
        <div className="text-xs text-neutral-500">Good morning</div>
        <div className="text-2xl font-bold">Sarah 👋</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-red-500">❤️ Heart Rate</div>
            <div className="text-2xl font-bold">72 <span className="text-sm text-neutral-500">BPM</span></div>
            <svg viewBox="0 0 100 30" className="mt-1 h-8 w-full">
              <polyline points="0,20 15,20 20,5 25,25 30,15 50,15 55,5 60,25 65,15 100,15" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-emerald-500">👟 Steps</div>
            <div className="text-2xl font-bold">8,432</div>
            <div className="mt-1 h-2 rounded-full bg-neutral-200"><div className="h-full rounded-full bg-emerald-500" style={{ width: "84%" }} /></div>
            <div className="mt-1 text-[10px] text-neutral-500">Goal 10,000</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-indigo-500">😴 Sleep</div>
            <div className="text-2xl font-bold">7h 23m</div>
            <div className="text-[10px] text-neutral-500">Score 92 · Excellent</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-orange-500">🔥 Calories</div>
            <div className="text-2xl font-bold">1,842</div>
            <div className="text-[10px] text-neutral-500">Active · 428 kcal</div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-blue-500 p-4 text-white">
          <div className="text-xs uppercase">Upcoming Appointment</div>
          <div className="mt-1 text-lg font-bold">Dr. Patel · Cardiology</div>
          <div className="text-sm opacity-90">Tomorrow · 10:30 AM</div>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">Weekly Activity</div>
          <div className="mt-3 flex items-end justify-between gap-2 h-24">
            {[40,70,55,90,65,80,50].map((h,i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-cyan-400" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BankMock() {
  return (
    <div className="min-h-[1000px] bg-[#0b1a3b] text-white">
      <div className="p-4">
        <div className="text-xs text-white/60">Total Balance</div>
        <div className="text-3xl font-bold">$12,450.00</div>
        <div className="text-xs text-emerald-300">+ $842.30 this month</div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[{i:"↑",n:"Send"},{i:"↓",n:"Receive"},{i:"🏷",n:"Pay"},{i:"＋",n:"Top Up"}].map((a) => (
            <div key={a.n} className="rounded-xl bg-white/10 p-3 text-center">
              <div className="text-lg">{a.i}</div>
              <div className="mt-1 text-[10px]">{a.n}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-white/5 p-4">
          <div className="text-xs font-semibold">Income vs Expenses</div>
          <div className="mt-3 flex items-end justify-between gap-2 h-24">
            {[[60,40],[80,55],[70,50],[90,65],[75,50],[85,60],[95,70]].map((h,i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="flex w-full items-end gap-0.5 h-full">
                  <div className="flex-1 rounded-t bg-emerald-400" style={{ height: `${h[0]}%` }} />
                  <div className="flex-1 rounded-t bg-rose-400" style={{ height: `${h[1]}%` }} />
                </div>
                <div className="text-[9px] text-white/50">{["M","T","W","T","F","S","S"][i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-sm font-semibold">Recent Transactions</div>
        <div className="mt-2 space-y-2">
          {[
            { i: "🛒", n: "Amazon", t: "Shopping", a: "-$84.20" },
            { i: "☕", n: "Starbucks", t: "Coffee", a: "-$6.45" },
            { i: "💼", n: "Payroll", t: "Salary", a: "+$4,200.00" },
            { i: "📱", n: "Apple", t: "Subscription", a: "-$9.99" },
            { i: "🚗", n: "Uber", t: "Transport", a: "-$14.80" },
            { i: "🍔", n: "Uber Eats", t: "Food", a: "-$28.50" },
          ].map((r) => (
            <div key={r.n} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">{r.i}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{r.n}</div>
                <div className="text-[11px] text-white/60">{r.t}</div>
              </div>
              <div className={`text-sm font-bold ${r.a.startsWith("+") ? "text-emerald-400" : "text-white"}`}>{r.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DuolingoMock() {
  return (
    <div className="min-h-[1000px] bg-white text-black">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <span className="text-2xl font-black text-emerald-500">duolingo</span>
        <span className="flex items-center gap-2 text-sm">🔥 <b>47</b></span>
      </div>
      <div className="p-4">
        <div className="rounded-2xl bg-emerald-500 p-4 text-white">
          <div className="text-xs uppercase">Daily Goal</div>
          <div className="text-2xl font-black">340 XP</div>
          <div className="mt-2 h-2 rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{ width: "68%" }} /></div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {["Basics","Phrases","Food","Family","Travel","Numbers"].map((u, i) => (
            <div key={u} className="flex flex-col items-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                {i < 3 ? "⭐" : "🔒"}
                <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#d1fae5" strokeWidth="3" />
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${(i < 3 ? 100 : 20)},200`} />
                </svg>
              </div>
              <div className="mt-1 text-xs font-semibold">{u}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm font-bold">Leaderboard · Diamond League</div>
        <div className="mt-2 space-y-1">
          {[["Alex",5420],["You",4890],["Maria",4210],["Ken",3980],["Priya",3660]].map(([n,xp], i) => (
            <div key={n} className={`flex items-center justify-between rounded-lg p-2 ${n === "You" ? "bg-emerald-100" : "bg-neutral-100"}`}>
              <span className="text-sm">#{i + 1} {n}</span>
              <span className="text-sm font-bold">{xp} XP</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-2xl bg-emerald-500 py-3 font-black text-white">CONTINUE LEARNING</button>
      </div>
    </div>
  );
}

function ZillowMock() {
  return (
    <div className="min-h-[1100px] bg-white text-black">
      <div className="h-48 bg-[radial-gradient(circle_at_30%_50%,#a7f3d0_0%,#86efac_40%,#4ade80_100%)] relative">
        {[[20,30],[45,50],[70,25],[35,70],[80,60]].map(([x,y],i) => (
          <div key={i} className="absolute rounded-full bg-blue-600 text-[10px] font-bold text-white px-2 py-1" style={{ left: `${x}%`, top: `${y}%` }}>${400 + i * 50}K</div>
        ))}
      </div>
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto text-xs">
          {["For Sale","Price","Beds & Baths","Home Type","More"].map((t) => (
            <span key={t} className="whitespace-nowrap rounded-full border border-neutral-300 px-3 py-1">{t}</span>
          ))}
        </div>
        <div className="mt-3 space-y-3">
          {[
            { p: "$485,000", b: "3 bd · 2 ba · 1,842 sqft", a: "412 Cedar Ln, Austin, TX", c: "#93c5fd" },
            { p: "$729,000", b: "4 bd · 3 ba · 2,410 sqft", a: "88 Willow St, Denver, CO", c: "#fca5a5" },
            { p: "$312,500", b: "2 bd · 2 ba · 1,120 sqft", a: "9 Maple Ave, Portland, OR", c: "#fcd34d" },
            { p: "$1,240,000", b: "5 bd · 4 ba · 3,650 sqft", a: "77 Ocean Dr, San Diego, CA", c: "#a7f3d0" },
          ].map((h) => (
            <div key={h.a} className="overflow-hidden rounded-lg border border-neutral-200">
              <div className="h-36 w-full" style={{ background: `linear-gradient(135deg, ${h.c}, #334)` }} />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">{h.p}</div>
                  <div>❤️</div>
                </div>
                <div className="text-xs">{h.b}</div>
                <div className="text-[11px] text-neutral-600">{h.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AirbnbMock() {
  return (
    <div className="min-h-[1100px] bg-white text-black">
      <div className="px-4 pt-3">
        <div className="rounded-full border border-neutral-300 px-4 py-3 text-sm shadow-sm">
          <div className="font-semibold">Anywhere</div>
          <div className="text-xs text-neutral-500">Any week · Add guests</div>
        </div>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 text-xs">
        {["🏖 Beach","🏔 Cabins","🏝 Islands","🌆 City","🌲 Nature","🏰 Castles"].map((c) => (
          <div key={c} className="whitespace-nowrap border-b-2 border-transparent pb-2">{c}</div>
        ))}
      </div>
      <div className="mt-2 space-y-4 px-4">
        {[
          { l: "Kyoto, Japan", d: "Nov 12–18", p: "$142", c: "#fda4af" },
          { l: "Santorini, Greece", d: "Dec 3–10", p: "$286", c: "#93c5fd" },
          { l: "Tulum, Mexico", d: "Jan 5–12", p: "$198", c: "#fcd34d" },
          { l: "Reykjavik, Iceland", d: "Feb 20–25", p: "$174", c: "#c4b5fd" },
        ].map((s) => (
          <div key={s.l}>
            <div className="relative h-56 overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${s.c}, #111)` }}>
              <span className="absolute right-3 top-3 text-lg">🤍</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm font-semibold">{s.l}</div>
              <div className="text-sm">⭐ 4.9{2}</div>
            </div>
            <div className="text-xs text-neutral-500">{s.d}</div>
            <div className="mt-1 text-sm"><b>{s.p}</b> night</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GamingMock() {
  return (
    <div className="min-h-[1000px] bg-[#0b0d1a] text-white">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
          <div className="flex-1">
            <div className="text-sm font-bold">NovaPlayer_47</div>
            <div className="text-xs text-cyan-400">Level 47 · Legend</div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: "72%" }} /></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-bold">Achievements</div>
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {["🏆","⚔️","🔥","💎","🎯","🚀","🥇","🛡"].map((e, i) => (
            <div key={i} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl">{e}</div>
          ))}
        </div>
        <div className="mt-4 text-sm font-bold">Recent Matches</div>
        <div className="mt-2 space-y-1">
          {[
            { m: "Ranked · Duo", r: "WIN", k: "18/4/9", c: "text-emerald-400" },
            { m: "Ranked · Solo", r: "WIN", k: "22/6/3", c: "text-emerald-400" },
            { m: "Casual · Squad", r: "LOSS", k: "9/7/14", c: "text-rose-400" },
            { m: "Ranked · Duo", r: "WIN", k: "15/2/11", c: "text-emerald-400" },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 p-2 text-xs">
              <span>{r.m}</span>
              <span className={`font-bold ${r.c}`}>{r.r}</span>
              <span className="text-white/70">{r.k}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm font-bold">Leaderboard</div>
        <div className="mt-2 space-y-1 text-xs">
          {["ShadowKing","NovaPlayer_47","IcePhoenix","VoltStrike","AtomicByte"].map((n, i) => (
            <div key={n} className={`flex items-center justify-between rounded-lg p-2 ${i === 1 ? "bg-fuchsia-500/20" : "bg-white/5"}`}>
              <span>#{i + 1} {n}</span>
              <span>{9800 - i * 320} pts</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-3 font-bold">▶ PLAY NOW</button>
      </div>
    </div>
  );
}

function SpotifyMock() {
  return (
    <div className="min-h-[1100px] bg-gradient-to-b from-[#1a1a1a] to-black text-white">
      <div className="p-4">
        <div className="text-2xl font-bold">Good evening</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["Liked Songs","Daily Mix 1","Chill Vibes","Deep Focus","Discover Weekly","Release Radar"].map((n, i) => (
            <div key={n} className="flex items-center gap-2 rounded-md bg-white/10 pr-2">
              <div className="h-12 w-12 rounded-md" style={{ background: `hsl(${i * 60},70%,50%)` }} />
              <div className="text-xs font-semibold">{n}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm font-bold">Made for You</div>
        <div className="mt-2 flex gap-3 overflow-x-auto">
          {["Daily Mix 1","Discover Weekly","Release Radar","On Repeat","Time Capsule"].map((n, i) => (
            <div key={n} className="w-32 shrink-0">
              <div className="h-32 w-32 rounded-md" style={{ background: `hsl(${i * 45},60%,40%)` }} />
              <div className="mt-1 text-xs font-semibold">{n}</div>
              <div className="text-[10px] text-white/60">Nova Studio</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm font-bold">Recently Played</div>
        <div className="mt-2 space-y-2">
          {[
            { t: "Blinding Lights", a: "The Weeknd" },
            { t: "Anti-Hero", a: "Taylor Swift" },
            { t: "Flowers", a: "Miley Cyrus" },
            { t: "As It Was", a: "Harry Styles" },
          ].map((s) => (
            <div key={s.t} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded bg-gradient-to-br from-emerald-500 to-cyan-500" />
              <div>
                <div className="text-sm font-semibold">{s.t}</div>
                <div className="text-xs text-white/60">{s.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center gap-3 bg-emerald-800 p-3">
        <div className="h-10 w-10 rounded bg-black" />
        <div className="flex-1">
          <div className="text-xs font-semibold">Blinding Lights</div>
          <div className="text-[10px] text-white/70">The Weeknd</div>
        </div>
        <span className="text-xl">⏸</span>
      </div>
    </div>
  );
}

function TrackerMock() {
  return (
    <div className="min-h-[1000px] bg-white text-black">
      <div className="p-4">
        <div className="text-xl font-bold">Track Package</div>
        <div className="mt-3 rounded-2xl border border-neutral-200 p-4 shadow-sm">
          <div className="text-xs text-neutral-500">Tracking #</div>
          <div className="text-sm font-mono">NS-8471-2039</div>
          <div className="mt-3 relative h-32 rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100">
            <svg viewBox="0 0 200 100" className="h-full w-full">
              <path d="M 20 80 Q 100 20 180 40" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
              </path>
              <circle cx="20" cy="80" r="5" fill="#10b981" />
              <circle cx="180" cy="40" r="5" fill="#ef4444" />
            </svg>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { s: "Order Placed", d: "Mon · Complete", ok: true },
              { s: "Shipped", d: "Tue · Complete", ok: true },
              { s: "In Transit", d: "Wed · Complete", ok: true },
              { s: "Out for Delivery", d: "Today · Active", ok: true, active: true },
              { s: "Delivered", d: "Tomorrow · Pending", ok: false },
            ].map((r) => (
              <div key={r.s} className="flex items-center gap-2 text-sm">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${r.ok ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500"} ${r.active ? "ring-4 ring-emerald-200" : ""}`}>{r.ok ? "✓" : "○"}</span>
                <div className="flex-1">
                  <div className="font-medium">{r.s}</div>
                  <div className="text-[11px] text-neutral-500">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold">Marcus · Driver</div>
              <div className="text-xs text-neutral-500">⭐ 4.94 · Van · ABC-1234</div>
            </div>
            <button className="rounded-full bg-emerald-500 px-3 py-1 text-xs text-white">Call</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Registry ----------------- */

type PreviewSpec = {
  label: string;
  browser?: boolean;
  url?: string;
  Comp: React.FC;
};

const REGISTRY: Record<PreviewKind, PreviewSpec> = {
  chatgpt:    { label: "🤖 AI App Preview – ChatGPT", Comp: ChatGPTMock },
  facebook:   { label: "📱 Android App Preview – Facebook", Comp: FacebookMock },
  appstore:   { label: "🍎 iOS App Preview – App Store", Comp: AppStoreMock },
  amazon:     { label: "🌐 Website Preview – Amazon", browser: true, url: "amazon.com", Comp: AmazonMock },
  cloudflare: { label: "🔒 Cybersecurity Preview – Cloudflare", browser: true, url: "dash.cloudflare.com", Comp: CloudflareMock },
  aws:        { label: "☁️ Cloud Preview – AWS Console", browser: true, url: "console.aws.amazon.com", Comp: AWSMock },
  figma:      { label: "🎨 Design Preview – Figma", browser: true, url: "figma.com", Comp: FigmaMock },
  shopify:    { label: "🛒 E-Commerce Preview – Shopify", browser: true, url: "novastore.myshopify.com", Comp: ShopifyMock },
  instagram:  { label: "📸 Social App Preview – Instagram", Comp: InstagramMock },
  netflix:    { label: "🎬 Streaming Preview – Netflix", Comp: NetflixMock },
  ubereats:   { label: "🍔 Food Delivery Preview – Uber Eats", Comp: UberEatsMock },
  uber:       { label: "🚖 Ride-Sharing Preview – Uber", Comp: UberMock },
  health:     { label: "❤️ Healthcare Preview – Health Dashboard", Comp: HealthMock },
  bank:       { label: "💳 FinTech Preview – Banking App", Comp: BankMock },
  duolingo:   { label: "📚 EdTech Preview – Duolingo", Comp: DuolingoMock },
  zillow:     { label: "🏠 Real Estate Preview – Zillow", Comp: ZillowMock },
  airbnb:     { label: "✈️ Travel Preview – Airbnb", Comp: AirbnbMock },
  gaming:     { label: "🎮 Gaming Preview – Player Dashboard", Comp: GamingMock },
  spotify:    { label: "🎵 Music Preview – Spotify", Comp: SpotifyMock },
  tracker:    { label: "📦 Logistics Preview – Package Tracker", Comp: TrackerMock },
};

/* ----------------- Category resolver ----------------- */

export function resolvePreview(title: string): PreviewKind {
  const t = title.toLowerCase();
  if (/(ai|chatbot|machine|ml|voice|nlp|assistant|automat|bot)/.test(t)) return "chatgpt";
  if (/(android)/.test(t)) return "facebook";
  if (/(ios|iphone|ipad|apple|app store)/.test(t)) return "appstore";
  if (/(security|cyber|encrypt|auth|biometric|firewall|access)/.test(t)) return "cloudflare";
  if (/(cloud|devops|server|database|api|infra|migration)/.test(t)) return "aws";
  if (/(figma|design system|brand|logo|ui|ux|landing|photo|design)/.test(t)) return "figma";
  if (/(e-?commerce|shop|marketplace|store|invoice|inventory|pos|subscription|payment|billing)/.test(t)) return "shopify";
  if (/(instagram|social|network|community|messag|photo)/.test(t)) return "instagram";
  if (/(video|stream|film|media|news|content|podcast|ar\/vr|arvr)/.test(t)) return "netflix";
  if (/(restaurant|food|order|delivery.*food)/.test(t)) return "ubereats";
  if (/(taxi|ride|uber|transport|gps|logistic|fleet|shipping|tracking|hotel|booking|travel|tour|airbnb|real estate|estate|construction)/.test(t)) {
    if (/(hotel|travel|booking|tour|airbnb)/.test(t)) return "airbnb";
    if (/(real estate|estate|building|property)/.test(t)) return "zillow";
    if (/(logistic|delivery|tracking|shipping|fleet)/.test(t)) return "tracker";
    return "uber";
  }
  if (/(health|medical|clinic|patient|hospital|fitness|wellness|workout)/.test(t)) return "health";
  if (/(fintech|bank|wallet|payment|financ|crypto|web3|money)/.test(t)) return "bank";
  if (/(learn|education|edu|school|course|training|tutor|student|e-?learning)/.test(t)) return "duolingo";
  if (/(game|gaming|puzzle|arcade|rewards|loyalty)/.test(t)) return "gaming";
  if (/(music|audio|podcast|sound|spotify)/.test(t)) return "spotify";
  if (/(website|web app|dashboard|analytics|reporting|erp|crm|business|saas|hr|recruit|marketing|ad|growth|seo|performance|iot|data|bi|automation)/.test(t)) return "amazon";
  return "chatgpt";
}

/* ----------------- Public component ----------------- */

export function ServicePreviewModal({
  kind,
  onClose,
}: {
  kind: PreviewKind | null;
  onClose: () => void;
}) {
  const spec = kind ? REGISTRY[kind] : null;
  return (
    <AnimatePresence>
      {spec && (
        <PhoneFrame
          key={kind}
          label={spec.label}
          onClose={onClose}
          browser={spec.browser}
          url={spec.url}
        >
          <spec.Comp />
        </PhoneFrame>
      )}
    </AnimatePresence>
  );
}
