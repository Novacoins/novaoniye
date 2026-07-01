import { motion } from "motion/react";
import { Trophy, Zap, Smartphone, Target, ShieldCheck, Lightbulb, Plus, Minus } from "lucide-react";
import { SectionLabel } from "./About";
import { useState } from "react";

const reasons = [
  {
    icon: Trophy,
    title: "5+ Years of Experience",
    desc: "With over five years of hands-on experience in mobile app development, web development, and digital solutions, I deliver reliable, scalable, and high-quality products tailored to each client's goals.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "I value your time and work efficiently to deliver projects on schedule without compromising quality, performance, or attention to detail.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Solutions",
    desc: "Every website and application I build is fully responsive, optimized for all screen sizes, and designed to provide an excellent experience on phones, tablets, and desktops.",
  },
  {
    icon: Target,
    title: "Client-Focused Development",
    desc: "Your vision comes first. I work closely with every client to understand their goals and transform ideas into practical, user-friendly digital products.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    desc: "I provide dependable support after project delivery, including updates, maintenance, bug fixes, and technical assistance whenever needed.",
  },
  {
    icon: Lightbulb,
    title: "Modern UI/UX Design",
    desc: "I create clean, elegant, and intuitive interfaces with smooth animations, fast loading speeds, and user-centered experiences that help businesses stand out.",
  },
];

export function WhyMe() {
  return (
    <section id="why-me" className="relative overflow-hidden py-24 lg:py-32">
      {/* Dark background with subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Why Choose Me</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Premium results,{" "}
            <span className="text-gold-gradient italic">personal</span> attention.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A blend of experience, speed, and design craft that turns your ideas into polished digital products.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-surface/50 p-7 backdrop-blur-xl transition-colors hover:border-gold/40 hover:bg-surface-elevated/80"
            >
              {/* Hover glow orb */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-gold/40">
                  <r.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What services do you offer?",
    a: "I specialize in Mobile App Development, Website Design & Development, Web Applications, UI/UX Design, E-commerce Websites, Business Websites, Landing Pages, Portfolio Websites, Custom Software Solutions, and App Publishing.",
  },
  {
    q: "Which technologies do you use?",
    a: "I use modern technologies including HTML5, CSS3, JavaScript, responsive frameworks, AI-assisted development tools, and other technologies that best fit each project.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "The timeline depends on the project's size and complexity. Small projects may take a few days, while larger applications require several weeks. A clear delivery schedule is provided before development begins.",
  },
  {
    q: "Can you build Android mobile apps?",
    a: "Yes. I develop modern Android applications with beautiful interfaces, fast performance, and features tailored to business and personal needs.",
  },
  {
    q: "Can you redesign or improve my existing website or app?",
    a: "Absolutely. I can redesign outdated websites and mobile apps, improve speed, modernize the UI/UX, fix bugs, and add new features.",
  },
  {
    q: "Do you provide maintenance and technical support?",
    a: "Yes. I offer ongoing maintenance, security updates, performance optimization, bug fixes, and long-term technical support after project delivery.",
  },
  {
    q: "Can you publish my app on the Google Play Store?",
    a: "Yes. I can help prepare, optimize, and publish your Android application on the Google Play Store while following Google's publishing guidelines.",
  },
  {
    q: "How do we get started?",
    a: "Simply contact me through the Contact section of this portfolio. We'll discuss your goals, project requirements, budget, and timeline before starting development.",
  },
  {
    q: "Why should I choose you?",
    a: "I combine technical expertise, modern UI/UX design, clear communication, fast delivery, reliable support, and attention to detail to create digital solutions that help businesses grow and succeed.",
  },
];

const FAQ_ACCENTS = [
  { ring: "hsl(45 90% 60%)", glow: "rgba(255,215,0,0.28)" },   // gold
  { ring: "hsl(200 90% 60%)", glow: "rgba(56,189,248,0.28)" }, // sky
  { ring: "hsl(280 80% 65%)", glow: "rgba(192,132,252,0.28)" },// violet
  { ring: "hsl(150 70% 55%)", glow: "rgba(52,211,153,0.28)" }, // emerald
  { ring: "hsl(15 90% 62%)",  glow: "rgba(251,146,60,0.28)" }, // orange
  { ring: "hsl(340 85% 62%)", glow: "rgba(244,114,182,0.28)" },// pink
  { ring: "hsl(45 90% 60%)",  glow: "rgba(255,215,0,0.28)" },
  { ring: "hsl(200 90% 60%)", glow: "rgba(56,189,248,0.28)" },
  { ring: "hsl(280 80% 65%)", glow: "rgba(192,132,252,0.28)" },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Questions?{" "}
            <span className="text-gold-gradient italic">Answers.</span>
          </h2>
          <p className="mt-5 text-base text-foreground/80 md:text-lg">
            Everything you need to know before starting your next project with Nova Studio.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const accent = FAQ_ACCENTS[i % FAQ_ACCENTS.length];
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur-xl transition-all duration-500"
                style={{
                  borderColor: isOpen ? accent.ring : "hsl(0 0% 100% / 0.08)",
                  boxShadow: isOpen ? `0 20px 60px -20px ${accent.glow}` : undefined,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[3px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${accent.ring}, transparent)`,
                    opacity: isOpen ? 1 : 0.35,
                  }}
                />
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-display text-lg font-semibold text-white md:text-2xl"
                    style={{ color: isOpen ? accent.ring : undefined }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white transition-colors"
                    style={{
                      borderColor: accent.ring,
                      backgroundColor: isOpen ? accent.ring : "transparent",
                      color: isOpen ? "#0a0a0a" : accent.ring,
                    }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-7 pr-16 text-base leading-relaxed text-foreground/85 md:px-7 md:text-lg">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

