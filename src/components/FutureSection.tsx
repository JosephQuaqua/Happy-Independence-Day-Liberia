import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function FutureSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#050d2c] px-6 py-24"
      aria-label="The future is ours to build"
    >
      {/* Subtle background flag stripes */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="flex h-full w-full flex-col">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background:
                  i % 2 === 0
                    ? 'linear-gradient(90deg,#b8232e,#9a1b25)'
                    : 'linear-gradient(90deg,#fdfcf7,#f0e9d8)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,35,46,0.12),transparent_60%)]" />

      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
          The Future
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
          The Future Is Ours to Build
        </h2>
        <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        <p className="mt-8 font-display text-lg leading-relaxed text-white/75 sm:text-xl">
          May the next 179 years bring greater peace, stronger unity, brighter
          opportunities, and a Liberia where every generation can dream boldly.
        </p>

        <p className="mt-5 font-display text-lg leading-relaxed text-white/75 sm:text-xl">
          The story of Liberia is still being written.
        </p>

        <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
          And the next chapter belongs to us.
        </p>

        {/* Final mantra */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#b8232e]" />
            <span className="h-2 w-2 rounded-full bg-[#fdfcf7] ring-1 ring-black/10" />
            <span className="h-2 w-2 rounded-full bg-[#1e3a8a]" />
          </div>
          <p className="font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl md:text-4xl">
            ONE NATION.
          </p>
          <p className="font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl md:text-4xl">
            ONE PEOPLE.
          </p>
          <p className="font-display text-3xl font-bold tracking-wide text-red-gradient sm:text-4xl md:text-5xl">
            ONE LIBERIA.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
