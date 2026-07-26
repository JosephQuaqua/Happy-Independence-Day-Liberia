import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-[#050d2c] px-6 py-16 text-center"
      aria-label="Footer"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,35,46,0.08),transparent_60%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0.4 : 0.9 }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#b8232e]" />
          <span className="h-2 w-2 rounded-full bg-[#fdfcf7] ring-1 ring-black/10" />
          <span className="h-2 w-2 rounded-full bg-[#1e3a8a]" />
        </div>

        <p className="font-body text-sm text-white/70">
          Made with <span className="text-[#e85a64]">❤</span> for Liberia 🇱🇷
        </p>
        <p className="font-display text-xl font-medium text-white">
          Happy 179th Independence Day
        </p>
        <p className="font-display text-sm tracking-[0.2em] text-white/60 uppercase">
          One Nation. One People. One Liberia.
        </p>
        <p className="font-body text-xs text-white/40">2026</p>
      </motion.div>
    </footer>
  );
}
