import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Liberian flag:
 * - 11 red & white horizontal stripes
 * - Blue canton (top left) with a single white 5-point star
 */
export function FlagAnimation() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#050d2c] to-[#0a1a4a] px-6 py-20"
      aria-label="The Liberian flag"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),transparent_65%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0.4 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Flag */}
        <div
          className="animate-flag-wave rounded-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
        >
          <div className="relative w-[260px] overflow-hidden rounded-md sm:w-[360px] md:w-[440px]">
            {/* Stripes container */}
            <div className="flex flex-col">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[18px] sm:h-[22px] md:h-[26px]"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(90deg,#b8232e,#9a1b25)'
                        : 'linear-gradient(90deg,#fdfcf7,#f0e9d8)',
                  }}
                />
              ))}
            </div>

            {/* Blue canton */}
            <div
              className="absolute left-0 top-0 flex items-center justify-center"
              style={{
                width: '40%',
                height: '54.5%',
                background: 'linear-gradient(135deg,#1e3a8a,#0a1a4a)',
              }}
            >
              {/* White star */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] sm:h-8 sm:w-8 md:h-10 md:w-10"
                fill="white"
                aria-hidden="true"
              >
                <path d="M12 2l2.9 6.9L22 9.3l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.9L2 9.3l7.1-.4L12 2z" />
              </svg>
            </div>

            {/* Subtle fabric highlight */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15" />
          </div>
        </div>

        {/* Caption */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="font-display text-2xl font-light leading-relaxed text-white/90 sm:text-3xl">
            One flag.
          </p>
          <p className="font-display text-2xl font-light leading-relaxed text-white/90 sm:text-3xl">
            One nation.
          </p>
          <p className="font-display text-2xl font-medium leading-relaxed text-white sm:text-3xl">
            One people.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
