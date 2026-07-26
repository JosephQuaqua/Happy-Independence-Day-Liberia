import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return <span ref={ref}>{value}</span>;
}

export function Timeline() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#0a1a4a] px-6 py-24"
      aria-label="179 years of a journey"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.15),transparent_60%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
          A Journey
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl">
          179 Years of a Journey
        </h2>
        <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        {/* Timeline */}
        <div className="relative mt-16 flex w-full max-w-3xl items-center justify-between">
          {/* Line */}
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#b8232e] via-white/30 to-[#1e3a8a]" />

          {/* 1847 */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#b8232e] bg-[#050d2c] shadow-[0_0_30px_-6px_rgba(232,90,100,0.6)]">
              <span className="font-display text-sm font-semibold text-white">1847</span>
            </div>
            <p className="mt-3 font-body text-xs tracking-[0.3em] text-white/60 uppercase">
              Independence
            </p>
          </motion.div>

          {/* 179 counter */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-[#1e3a8a] to-[#0a1a4a] shadow-[0_0_40px_-6px_rgba(59,111,214,0.7)]">
              <span className="font-display text-3xl font-bold text-white">
                <CountUp to={179} />
              </span>
            </div>
            <p className="mt-3 font-body text-xs tracking-[0.3em] text-white/60 uppercase">
              Years
            </p>
          </motion.div>

          {/* 2026 */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#3b6fd6] bg-[#050d2c] shadow-[0_0_30px_-6px_rgba(59,111,214,0.6)]">
              <span className="font-display text-sm font-semibold text-white">2026</span>
            </div>
            <p className="mt-3 font-body text-xs tracking-[0.3em] text-white/60 uppercase">
              Today
            </p>
          </motion.div>
        </div>

        <motion.p
          className="mt-16 max-w-xl font-display text-lg leading-relaxed text-white/70 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          From the dreams of those who came before us to the hopes of those who
          will come after us, Liberia&apos;s story continues.
        </motion.p>
      </motion.div>
    </section>
  );
}
