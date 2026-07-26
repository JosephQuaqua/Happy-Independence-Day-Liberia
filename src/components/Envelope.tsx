import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Particles } from './Particles';

interface EnvelopeProps {
  onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Let the envelope animation play before transitioning to the letter
    setTimeout(onOpen, reduced ? 200 : 1400);
  };

  const bodyAnimate = opening
    ? reduced
      ? { opacity: 0 }
      : { scale: 1.08, y: -10 }
    : {};
  const letterAnimate = opening
    ? reduced
      ? { y: '-130%' }
      : { y: ['-50%', '-120%', '-140%'], opacity: [1, 1, 0.9] }
    : { y: '-50%' };
  const flapAnimate = opening
    ? reduced
      ? { rotateX: -180 }
      : { rotateX: -175 }
    : { rotateX: 0 };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#0a1a4a] px-6 py-20"
      aria-label="A letter to Liberia"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,35,46,0.12),transparent_60%)]" />
      <Particles count={18} />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
          A Letter to Liberia
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl">
          Written with love, pride &amp; hope
        </h2>
        <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        {/* Envelope */}
        <div className="relative mt-12 h-[230px] w-[320px] sm:h-[280px] sm:w-[400px]">
          {/* Envelope body */}
          <motion.div
            className="absolute inset-0"
            animate={bodyAnimate}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Back of envelope */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#9a1b25] to-[#7a1219] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]" />

            {/* Letter peeking out (rises on open) */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-md paper-texture shadow-2xl"
              animate={letterAnimate}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 p-5 text-center">
                <p className="font-hand text-2xl text-[#7a1219] sm:text-3xl">Dear Liberia,</p>
                <div className="h-px w-12 bg-[#b8232e]/40" />
                <p className="font-display text-sm text-[#0a1a4a]/70 sm:text-base">
                  179 years of freedom...
                </p>
              </div>
            </motion.div>

            {/* Front pocket (covers lower half of letter) */}
            <div className="absolute bottom-0 left-0 right-0 h-[62%] rounded-b-lg rounded-t-sm bg-gradient-to-br from-[#b8232e] to-[#7a1219] shadow-[inset_0_8px_20px_rgba(0,0,0,0.3)]">
              {/* Diagonal flap lines */}
              <div className="absolute inset-0 overflow-hidden rounded-b-lg">
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-transparent via-black/10 to-transparent" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} />
              </div>
            </div>

            {/* Flap (top) */}
            <motion.div
              className="absolute left-0 right-0 top-0 origin-top"
              style={{ height: '55%' }}
              animate={flapAnimate}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="h-full w-full bg-gradient-to-b from-[#c92433] to-[#9a1b25]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              />
              {/* Inner flap shade */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
            </motion.div>

            {/* Wax seal (visible while closed) */}
            <AnimatePresence>
              {!opening && (
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  className="absolute left-1/2 top-[55%] z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#9a7b1f] shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-2 ring-[#fdfcf7]/40"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: reduced ? 1 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Open the letter"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#fdfcf7" aria-hidden="true">
                    <path d="M12 2l2.9 6.9L22 9.3l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.9L2 9.3l7.1-.4L12 2z" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Open button */}
        <AnimatePresence>
          {!opening && (
            <motion.button
              type="button"
              onClick={handleOpen}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-body text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-[#e85a64]/60 hover:bg-[#b8232e]/20 hover:shadow-[0_0_30px_-6px_rgba(232,90,100,0.6)] active:scale-95"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: reduced ? 1 : 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              OPEN LETTER
            </motion.button>
          )}
        </AnimatePresence>

        <p className="mt-6 max-w-sm text-center font-body text-xs text-white/40">
          Tap the seal to open the letter
        </p>
      </motion.div>
    </section>
  );
}
