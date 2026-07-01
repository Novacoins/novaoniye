import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/2349045403005"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_40px_-5px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400/40" style={{ animationDuration: "2.4s" }} />
        <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/20 blur-xl" />
        {/* WhatsApp glyph */}
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.83 2.722.83.687 0 2.15-.36 2.478-1.245.155-.42.14-.807-.03-1.09-.244-.386-1.14-.85-1.436-.85z m3.6-8.29A11.98 11.98 0 0 0 15.984 4a11.9 11.9 0 0 0-11.9 11.9c0 2.055.53 4.06 1.535 5.826L4 27.7l5.973-1.568a11.83 11.83 0 0 0 5.996 1.6h.005c6.57 0 11.97-5.35 11.97-11.925 0-3.19-1.242-6.19-3.5-8.44z" />
        </svg>
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-background/80 text-gold backdrop-blur transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
