import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./About";

const ACCESS_KEY = "b3825961-2c7a-4517-802e-e355bdf5557a";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "oniyetaofiqishola11@gmail.com",
    href: "mailto:oniyetaofiqishola11@gmail.com",
  },
  { icon: Phone, label: "\n", value: "\n", href: "tel:+2349045403005" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "\n",
    href: "https://wa.me/2349045403005",
  },
  { icon: MapPin, label: "Location", value: " Available worldwide", href: "#" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = new FormData();
    payload.append("access_key", ACCESS_KEY);
    payload.append("subject", `New message from ${formData.name}`);
    payload.append("from_name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
            onSubmit={handleSubmit}
            className="rounded-3xl glass-panel p-8 md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Your Name"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+234 904 540 3005"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Tell me about your project, goals, and timeline..."
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-8 py-4 text-sm font-semibold text-primary-foreground gold-glow transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                "Sending..."
              ) : status === "success" ? (
                "Message Sent ✓"
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
            {status === "success" && (
              <p className="mt-4 text-center text-sm text-green-400">
                Thank you for contacting Nova Prime Official. Your message has been received and I will respond as soon as possible.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-400">
                Something went wrong. Please try again or email directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}
