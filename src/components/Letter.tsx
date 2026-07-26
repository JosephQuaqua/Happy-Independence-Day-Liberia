import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Particles } from './Particles';

const PARAGRAPHS: string[] = [
  'Dear Liberia,',
  '179 years ago, a dream of freedom became a nation.',
  'Today, we celebrate not only the Liberia we inherited, but the Liberia we are building together.',
  'Through every challenge, we remain resilient. Through every generation, we carry the hope of a brighter tomorrow.',
  'May our red remind us of the sacrifices that shaped our history.',
  'May our white inspire peace, unity, and hope.',
  'May our blue remind us of the freedom we proudly call our own.',
  'No matter where life takes us, Liberia will always be home.',
  'Happy 179th Independence Day, Liberia! 🇱🇷',
  'One Nation. One People. One Liberia.',
  'With love,',
  'From a proud Liberian.',
];

export function Letter() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#0a1a4a] px-5 py-20"
      aria-label="The letter"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),transparent_65%)]" />
      <Particles count={14} colors={['#e85a64', '#ffffff', '#3b6fd6']} />

      <motion.article
        className="relative z-10 w-full max-w-2xl rounded-2xl paper-texture p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] sm:p-12 md:p-16"
        initial={{ opacity: 0, y: 40, rotateX: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0.4 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top decorative border */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#b8232e]/40" />
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#b8232e]/70" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.9L22 9.3l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.9L2 9.3l7.1-.4L12 2z" />
          </svg>
          <div className="h-px w-12 bg-[#1e3a8a]/40" />
        </div>

        <div className="space-y-5">
          {PARAGRAPHS.map((text, i) => {
            const isSalutation = i === 0;
            const isSignature = i >= 10;
            const isClosing = i === 8 || i === 9;

            return (
              <motion.p
                key={i}
                className={
                  isSalutation
                    ? 'font-hand text-3xl text-[#7a1219] sm:text-4xl'
                    : isSignature
                    ? 'font-hand text-2xl text-[#0a1a4a] sm:text-3xl'
                    : isClosing
                    ? 'font-display text-xl font-semibold text-[#0a1a4a] sm:text-2xl'
                    : 'font-display text-lg leading-relaxed text-[#0a1a4a]/90 sm:text-xl'
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduced ? 0.3 : 0.8,
                  delay: reduced ? 0.05 * i : 0.25 + i * 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {text}
              </motion.p>
            );
          })}
        </div>

        {/* Seal at bottom */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: reduced ? 0.1 : 4.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#b8232e]" />
            <span className="h-2 w-2 rounded-full bg-[#fdfcf7] ring-1 ring-black/10" />
            <span className="h-2 w-2 rounded-full bg-[#1e3a8a]" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#b8232e]/30 bg-[#fdfcf7] shadow-md">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#b8232e]" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.9L22 9.3l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.9L2 9.3l7.1-.4L12 2z" />
            </svg>
          </div>
        </motion.div>
      </motion.article>
    </section>
  );
}
