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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Questions?{" "}
            <span className="text-gold-gradient italic">Answers.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Everything you need to know before starting your next project.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-border/60 bg-surface/50 backdrop-blur-xl transition-colors hover:border-gold/30"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
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
