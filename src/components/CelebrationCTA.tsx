import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CelebrationCTAProps {
  onCelebrate: () => void;
  celebrating: boolean;
}

export function CelebrationCTA({ onCelebrate, celebrating }: CelebrationCTAProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#050d2c] via-[#0a1a4a] to-[#050d2c] px-6 py-24 text-center"
      aria-label="Celebrate Liberia"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,35,46,0.18),transparent_55%)]" />

      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
          The Moment
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl">
          Let&apos;s Celebrate
        </h2>
        <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        <p className="mt-6 max-w-xl font-display text-lg text-white/70 sm:text-xl">
          One tap. One moment of joy for the nation we love.
        </p>

        <motion.button
          type="button"
          onClick={onCelebrate}
          disabled={celebrating}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#b8232e] via-[#9a1b25] to-[#1e3a8a] px-10 py-5 font-body text-lg font-bold tracking-wide text-white shadow-[0_10px_50px_-10px_rgba(184,35,46,0.8)] transition-all hover:scale-[1.05] hover:shadow-[0_15px_60px_-8px_rgba(232,90,100,0.9)] active:scale-95 disabled:opacity-70"
          whileHover={reduced ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Celebrate Liberia"
        >
          <Sparkles className="h-6 w-6" />
          <span>CELEBRATE LIBERIA 🇱🇷</span>
        </motion.button>

        {/* Patriotic messages revealed on celebrate */}
        {celebrating && (
          <motion.div
            className="mt-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Happy 179th Independence Day, Liberia! 
            </p>
            <p className="font-display text-xl text-white/80 sm:text-2xl">
              May Liberia continue to rise, shine, and prosper.
            </p>
            <p className="font-display text-2xl font-semibold text-red-gradient sm:text-3xl">
              God Bless Liberia.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
