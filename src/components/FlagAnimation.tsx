import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Classic Liberian flag card — matches the reference:
 * - 11 horizontal stripes (6 red, 5 white), starting and ending red
 * - Blue canton top-left covering 6 stripes tall × 40% wide
 * - Single white 5-point star centred in the canton
 * - Displayed as a large rounded card with deep shadow
 */
export function FlagAnimation() {
  const reduced = useReducedMotion();

  const stripeColors = [
    '#c0202c', // 1 red
    '#f2ede0', // 2 white
    '#c0202c', // 3 red
    '#f2ede0', // 4 white
    '#c0202c', // 5 red
    '#f2ede0', // 6 white  ← canton bottom aligns here
    '#c0202c', // 7 red
    '#f2ede0', // 8 white
    '#c0202c', // 9 red
    '#f2ede0', // 10 white
    '#c0202c', // 11 red
  ];

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'linear-gradient(160deg,#0d1e50 0%,#0a1640 50%,#0d1e50 100%)' }}
      aria-label="The Liberian flag"
    >
      {/* Subtle radial glow behind the flag */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.25),transparent)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0.4 : 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FLAG CARD ─────────────────────────────────── */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            width: 'clamp(280px, 72vw, 580px)',
            aspectRatio: '19 / 10',
            borderRadius: '12px',
            boxShadow:
              '0 4px 6px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.45), 0 32px 60px rgba(0,0,0,0.35)',
          }}
          animate={
            reduced
              ? {}
              : {
                  rotateX: [0.8, -0.8, 0.8],
                  rotateY: [-1, 1, -1],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Stripes */}
          <div className="absolute inset-0 flex flex-col">
            {stripeColors.map((color, i) => (
              <div
                key={i}
                className="flex-1"
                style={{ background: color }}
              />
            ))}
          </div>

          {/* Blue canton — covers top 6 stripes × 40% width */}
          <div
            className="absolute left-0 top-0 flex items-center justify-center"
            style={{
              width: '40%',
              height: `${(6 / 11) * 100}%`,
              background: 'linear-gradient(145deg,#1c3b8e,#142d7a)',
            }}
          >
            {/* White star */}
            <svg
              viewBox="0 0 51 48"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
              style={{ width: '36%', height: 'auto' }}
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M25.5 2l5.9 14.2 15.4 1.2-11.7 10.1 3.8 15-13.4-8.2-13.4 8.2 3.8-15L4.2 17.4l15.4-1.2L25.5 2z"
              />
            </svg>
          </div>

          {/* Subtle top-left highlight for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(145deg,rgba(255,255,255,0.08) 0%,transparent 45%)',
              borderRadius: '12px',
            }}
          />
          {/* Subtle bottom shadow inside */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
            style={{
              background:
                'linear-gradient(to top,rgba(0,0,0,0.18),transparent)',
            }}
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          {['One flag.', 'One nation.', 'One people.'].map((line, i) => (
            <motion.p
              key={line}
              className="font-display leading-snug text-white/90"
              style={{
                fontSize: 'clamp(1.3rem, 3.5vw, 1.9rem)',
                fontWeight: i === 2 ? 600 : 400,
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.18 }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
