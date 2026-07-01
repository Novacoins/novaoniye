export function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-semibold">
              Nova<span className="text-gold-gradient italic"> Studio</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/75">
              Nova Studio is a premium digital agency crafting world-class mobile
              apps, AI systems, web platforms and luxury brand experiences for
              ambitious businesses worldwide.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Navigate
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              {["About", "Services", "Portfolio", "Reviews", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li>
                <a href="mailto:oniyetaofiqishola11@gmail.com" className="hover:text-gold">
                  oniyetaofiqishola11@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2349045403005" className="hover:text-gold">
                  Call: 09045403005
                </a>
              </li>
              <li>
                <a href="https://wa.me/2349045403005" target="_blank" rel="noopener" className="hover:text-gold">
                  WhatsApp: 09045403005
                </a>
              </li>
              <li>Available Worldwide 🌍</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} Nova Studio. All rights reserved.
          </div>
          <div className="text-xs text-foreground/60">
            Designed &amp; engineered with care.
          </div>
        </div>
      </div>
    </footer>
  );
}
