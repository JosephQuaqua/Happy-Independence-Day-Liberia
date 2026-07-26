import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Fixed glowing points (symbolic diaspora locations) — percentages on the abstract globe
const POINTS = [
  { x: 22, y: 52, delay: 0 },    // Americas
  { x: 48, y: 58, delay: 0.4 },  // Europe / West Africa
  { x: 55, y: 48, delay: 0.8 },  // Liberia
  { x: 68, y: 60, delay: 1.2 },  // Africa
  { x: 78, y: 45, delay: 1.6 },  // Asia
  { x: 85, y: 70, delay: 2.0 },  // Oceania
  { x: 30, y: 35, delay: 2.4 },
  { x: 50, y: 70, delay: 2.8 },
  { x: 15, y: 65, delay: 3.2 },
  { x: 62, y: 38, delay: 3.6 },
];

export function HomeSection() {
  const reduced = useReducedMotion();
  const points = useMemo(() => POINTS, []);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#0a1a4a] px-6 py-24"
      aria-label="Wherever you are, Liberia is home"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.18),transparent_60%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
          Wherever You Are,
          <br />
          <span className="text-red-gradient">Liberia Is Home.</span>
        </h2>
        <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        {/* Abstract globe */}
        <div className="relative mt-12 h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: reduced ? 0 : Infinity, ease: 'linear' }}
          >
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e85a64] shadow-[0_0_10px_#e85a64]" />
          </motion.div>

          {/* Middle ring (tilted) */}
          <motion.div
            className="absolute inset-6 rounded-full border border-white/15"
            style={{ transform: 'rotateX(65deg)' }}
            animate={reduced ? {} : { rotateZ: 360 }}
            transition={{ duration: 40, repeat: reduced ? 0 : Infinity, ease: 'linear' }}
          />

          {/* Inner sphere */}
          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#1e3a8a]/40 to-[#0a1a4a]/60 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
          </div>

          {/* Glowing diaspora points */}
          {points.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: '#e85a64',
                boxShadow: '0 0 12px #e85a64, 0 0 24px rgba(232,90,100,0.5)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: p.delay * 0.3 }}
              animate={
                reduced
                  ? {}
                  : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }
              }
            />
          ))}

          {/* Center pulse (Liberia) */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            animate={reduced ? {} : { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 20px white, 0 0 40px rgba(255,255,255,0.5)' }}
          />
        </div>

        <div className="mt-12 max-w-xl space-y-3 font-display text-lg leading-relaxed text-white/75 sm:text-xl">
          <p>Across cities, across borders, and across generations, Liberia lives in the hearts of her people.</p>
          <p>Wherever life takes us, we carry home with us.</p>
          <p className="font-medium text-white/90">
            We carry the flag. We carry the memories. We carry the hope.
          </p>
          <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
            And we carry Liberia.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
