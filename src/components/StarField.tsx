import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StarFieldProps {
  count?: number;
  className?: string;
}

export function StarField({ count = 60, className = '' }: StarFieldProps) {
  const reduced = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0.2 }}
          animate={
            reduced
              ? { opacity: 0.5 }
              : { opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.1, 0.8] }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: reduced ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
