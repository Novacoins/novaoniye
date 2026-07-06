import { useEffect, useState } from "react";
import { Menu, X, Home, User, Wrench, Briefcase, Star, Award, Phone } from "lucide-react";
import logoUrl from "@/assets/nova-studio-logo.png";

const links = [
  { href: "#home", label: "Home", Icon: Home },
  { href: "#about", label: "About", Icon: User },
  { href: "#services", label: "Services", Icon: Wrench },
  { href: "#portfolio", label: "Projects", Icon: Briefcase },
  { href: "#testimonials", label: "Reviews", Icon: Star },
  { href: "#certifications", label: "Certifications", Icon: Award },
  { href: "#contact", label: "Contact", Icon: Phone },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div
          className={`flex w-full items-center justify-between rounded-full px-6 py-3 transition-all ${
            scrolled ? "glass-panel" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Nova Studio"
              width={96}
              height={96}
              className="h-16 w-16 shrink-0 rounded-xl object-contain drop-shadow-[0_4px_18px_rgba(212,175,55,0.35)] sm:h-[74px] sm:w-[74px] md:h-20 md:w-20"
              loading="eager"
              decoding="async"
            />
            <span className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.9rem]">
              <span>
                Nova<span className="text-gold-gradient italic"> Studio</span>
              </span>
              <span
                aria-label="Verified"
                title="Verified"
                className="group/badge relative inline-flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110 md:h-6 md:w-6"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-full w-full drop-shadow-[0_0_6px_rgba(29,155,240,0.55)] transition-[filter] duration-300 group-hover/badge:drop-shadow-[0_0_12px_rgba(29,155,240,0.9)]"
                  aria-hidden="true"
                >
                  <path
                    fill="#1D9BF0"
                    d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                  />
                  <path
                    fill="#fff"
                    d="m10.54 15.6-2.63-2.63 1.42-1.42 1.21 1.21 3.79-3.79 1.41 1.42z"
                  />
                </svg>
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-primary-foreground lg:inline-flex"
          >
            Hire Us
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden transition-all duration-300 ${
              open
                ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)] hover:drop-shadow-[0_0_18px_rgba(239,68,68,1)]"
                : "text-foreground"
            }`}
            aria-label="Menu"
          >
            {open ? <X className="h-8 w-8" strokeWidth={2.5} /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mt-3 rounded-3xl glass-panel p-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <Icon className="h-5 w-5 text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                <span>{label}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Hire Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
