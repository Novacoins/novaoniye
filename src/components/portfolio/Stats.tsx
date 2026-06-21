import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Completed Projects" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 25, suffix: "+", label: "Apps Developed" },
  { value: 30, suffix: "+", label: "Websites Created" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const c = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl glass-panel px-6 py-12 md:px-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl text-gold-gradient md:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
