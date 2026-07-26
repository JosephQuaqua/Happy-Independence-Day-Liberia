import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CelebrationProps {
  active: boolean;
}

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  drift: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
}

const COLORS = ['#e85a64', '#ffffff', '#3b6fd6', '#b8232e', '#d4af37'];

function makeConfetti(count: number): Confetti[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    duration: Math.random() * 2 + 2.5,
    color: COLORS[i % COLORS.length],
    size: Math.random() * 8 + 5,
    drift: (Math.random() - 0.5) * 40,
  }));
}

function makeFireworks(count: number): Firework[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 50,
    delay: Math.random() * 3,
    color: COLORS[i % COLORS.length],
  }));
}

export function Celebration({ active }: CelebrationProps) {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) {
      setShow(false);
      return;
    }
    setShow(true);
    // Settle into calm background after the burst
    const t = setTimeout(() => setShow(false), reduced ? 1500 : 9000);
    return () => clearTimeout(t);
  }, [active, reduced]);

  const confetti = useMemo(() => (show ? makeConfetti(reduced ? 30 : 90) : []), [show, reduced]);
  const fireworks = useMemo(() => (show ? makeFireworks(reduced ? 4 : 8) : []), [show, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          {/* Brightening background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/40 via-[#b8232e]/20 to-[#050d2c]/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 4 }}
          />

          {/* Confetti */}
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              className="absolute top-0 rounded-sm"
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 1.4,
                background: c.color,
                boxShadow: `0 0 6px ${c.color}80`,
              }}
              initial={{ y: '-10vh', opacity: 1, rotate: 0 }}
              animate={
                reduced
                  ? { y: '110vh', opacity: 0 }
                  : { y: '110vh', x: c.drift, rotate: 720, opacity: [1, 1, 0] }
              }
              transition={{
                duration: c.duration,
                delay: c.delay,
                ease: 'easeIn',
              }}
            />
          ))}

          {/* Fireworks */}
          {fireworks.map((f) => (
            <motion.div
              key={f.id}
              className="absolute"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={reduced ? { scale: 1, opacity: 0.6 } : { scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: f.delay, repeat: reduced ? 0 : 2, repeatDelay: 0.4 }}
            >
              <div
                className="h-32 w-32 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${f.color} 0%, transparent 60%)`,
                  filter: 'blur(2px)',
                }}
              />
            </motion.div>
          ))}

          {/* Floating stars */}
          {Array.from({ length: reduced ? 6 : 16 }).map((_, i) => (
            <motion.svg
              key={`star-${i}`}
              viewBox="0 0 24 24"
              className="absolute h-4 w-4"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fill: COLORS[i % COLORS.length],
                filter: `drop-shadow(0 0 6px ${COLORS[i % COLORS.length]})`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={reduced ? { scale: 1, opacity: 0.7 } : { scale: [0, 1, 0], opacity: [0, 1, 0], y: [0, -30, -60] }}
              transition={{ duration: 3, delay: Math.random() * 2, repeat: reduced ? 0 : Infinity }}
            >
              <path d="M12 2l2.9 6.9L22 9.3l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.9L2 9.3l7.1-.4L12 2z" />
            </motion.svg>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
