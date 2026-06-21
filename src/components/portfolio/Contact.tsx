import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./About";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "oniyetaofiqishola11@gmail.com",
    href: "mailto:oniyetaofiqishola11@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+234 904 540 3005", href: "tel:+2349045403005" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+234 904 540 3005",
    href: "https://wa.me/2349045403005",
  },
  { icon: MapPin, label: "Location", value: "Nigeria · Available worldwide", href: "#" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Let's build your{" "}
              <span className="text-gold-gradient italic">next</span> big idea.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Tell me about your project. I'll get back within 24 hours with
              ideas, timelines, and a clear path forward.
            </p>

            <div className="mt-10 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-all hover:border-gold/40 hover:bg-surface-elevated"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="truncate font-medium text-foreground group-hover:text-gold">
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="rounded-3xl glass-panel p-8 md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Your Name" placeholder="Jane Doe" />
              <Field label="Email" type="email" placeholder="jane@email.com" />
            </div>
            <div className="mt-5">
              <Field label="Subject" placeholder="Mobile app project" />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project, goals, and timeline..."
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-8 py-4 text-sm font-semibold text-primary-foreground gold-glow transition-transform hover:scale-[1.01]"
            >
              {sent ? "Message Sent ✓" : (<>Send Message <Send className="h-4 w-4" /></>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}
