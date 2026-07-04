import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/nova-studio-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Projects" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
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
              width={80}
              height={80}
              className="h-14 w-14 shrink-0 rounded-xl object-contain drop-shadow-[0_4px_18px_rgba(212,175,55,0.35)] md:h-16 md:w-16"
              loading="eager"
              decoding="async"
            />
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.7rem]">
              Nova<span className="text-gold-gradient italic"> Studio</span>
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
            className="lg:hidden"
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mt-3 rounded-3xl glass-panel p-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Hire Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
