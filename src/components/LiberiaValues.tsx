import { motion } from 'framer-motion';
import { Heart, Users, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const VALUES = [
  {
    icon: Heart,
    title: 'Resilience',
    text: 'For every challenge we have faced, we continue to rise.',
    accent: '#e85a64',
    glow: 'rgba(232,90,100,0.35)',
    emoji: '❤️',
  },
  {
    icon: Users,
    title: 'Unity',
    text: 'Different stories. One people. One nation.',
    accent: '#fdfcf7',
    glow: 'rgba(253,252,247,0.25)',
    emoji: '🤍',
  },
  {
    icon: Sparkles,
    title: 'Hope',
    text: 'Together, we believe in a brighter Liberia.',
    accent: '#3b6fd6',
    glow: 'rgba(59,111,214,0.35)',
    emoji: '💙',
  },
] as const;

export function LiberiaValues() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0a1a4a] via-[#050d2c] to-[#0a1a4a] px-6 py-24"
      aria-label="Our Liberia"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(184,35,46,0.08),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0.4 : 0.9 }}
        >
          <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
            Our Liberia
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl">
            Three things we carry with us
          </h2>
          <div className="mt-5 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all hover:border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0.4 : 0.7, delay: i * 0.15 }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -8, boxShadow: `0 20px 50px -12px ${v.glow}` }
                }
              >
                {/* Accent top line */}
                <div
                  className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-full"
                  style={{ background: v.accent, boxShadow: `0 0 20px ${v.glow}` }}
                />

                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full border transition-transform"
                  style={{
                    borderColor: v.accent,
                    color: v.accent,
                    background: `${v.accent}10`,
                  }}
                  whileHover={reduced ? undefined : { scale: 1.1, rotate: 5 }}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </motion.div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/65">
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
