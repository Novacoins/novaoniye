import { motion } from "motion/react";
import certAsset from "@/assets/nova-certificate.png.asset.json";
import { SectionLabel } from "./About";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionLabel>Credentials</SectionLabel>
          <h2 className="mt-5 font-display text-[3.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[4rem] md:text-[5rem]">
            <span aria-hidden>🏆 </span>
            Professional <span className="text-gold-gradient italic">Certifications</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/80">
            Verified certificates demonstrating my professional software development skills and technical expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 w-full max-w-3xl"
        >
          <div className="cert-glow relative rounded-3xl p-[2px]">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] border border-gold/30 bg-surface/70 p-3 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-4">
              <img
                src={certAsset.url}
                alt="Nova Studio professional software development certificate"
                loading="lazy"
                decoding="async"
                className="block w-full rounded-2xl object-contain"
                style={{ maxHeight: "32vh", minHeight: "220px" }}
              />
              <span className="cert-corner cert-corner-tl" aria-hidden />
              <span className="cert-corner cert-corner-tr" aria-hidden />
              <span className="cert-corner cert-corner-bl" aria-hidden />
              <span className="cert-corner cert-corner-br" aria-hidden />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80">
            <span className="h-px w-8 bg-gold/40" />
            Verified Credential
            <span className="h-px w-8 bg-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
