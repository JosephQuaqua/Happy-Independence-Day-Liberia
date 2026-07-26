import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { StarField } from './StarField';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroProps {
  onOpen: () => void;
}

export function Hero({ onOpen }: HeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      aria-label="Cinematic opening"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050d2c] via-[#0a1a4a] to-[#050d2c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,35,46,0.18),transparent_55%)] animate-glow-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(30,58,138,0.25),transparent_60%)]" />
      <StarField count={70} />

      {/* Soft light rays */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[80vh] w-[2px] -translate-x-1/2 bg-gradient-to-b from-white/15 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(2px)' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Small flag pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-sm tracking-[0.3em] text-white/70">JULY 26 · 2026</span>
        </motion.div>

        {/* 179 YEARS */}
        <motion.h1
          className="font-display text-7xl font-semibold leading-none tracking-tight text-white sm:text-8xl md:text-9xl"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: reduced ? 0.4 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          179{' '}
          <span className="font-display italic font-light text-white/80">Years</span>
        </motion.h1>

        <motion.p
          className="mt-4 font-display text-lg tracking-[0.35em] text-white/80 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          OF FREEDOM, HOPE &amp; UNITY
        </motion.p>

        <motion.div
          className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />

        <motion.p
          className="mt-6 font-display text-2xl font-medium text-white sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Happy Independence Day, Liberia 🇱🇷
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/65 sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Today, we celebrate the nation we call home, the people who built it,
          and the hope we carry for tomorrow.
        </motion.p>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={onOpen}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#b8232e] to-[#7a1219] px-9 py-4 font-body text-base font-semibold text-white shadow-[0_8px_40px_-8px_rgba(184,35,46,0.7)] transition-all hover:scale-[1.04] hover:shadow-[0_12px_50px_-6px_rgba(232,90,100,0.85)] active:scale-95"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          whileHover={{ scale: reduced ? 1 : 1.04 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open the letter"
        >
          <span>OPEN THE LETTER</span>
          <Heart className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: reduced ? 0 : Infinity, delay: 2.5 }}
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
