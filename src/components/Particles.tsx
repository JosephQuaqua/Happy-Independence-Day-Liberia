import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export function Particles({
  count = 30,
  colors = ['#e85a64', '#ffffff', '#3b6fd6'],
  className = '',
}: ParticlesProps) {
  const reduced = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        color: colors[i % colors.length],
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 6,
      })),
    [count, colors]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={
            reduced
              ? { opacity: 0.6 }
              : { opacity: [0, 0.8, 0], y: [0, -40, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: reduced ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
