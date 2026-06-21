import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl">
              Oniye<span className="text-gold-gradient italic">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Founder of NovaPlay Technologies. Crafting premium mobile apps,
              websites, and digital products for businesses worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold">
              Navigate
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["About", "Services", "Portfolio", "Reviews", "Contact"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase()}`}
                      className="hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>oniyetaofiqishola11@gmail.com</li>
              <li>+234 904 540 3005</li>
              <li>WhatsApp: 09045403005</li>
              <li>Nigeria · Remote worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Oniye Taofiq Ishola · NovaPlay Technologies. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Designed & built with care.
          </div>
        </div>
      </div>
    </footer>
  );
}
