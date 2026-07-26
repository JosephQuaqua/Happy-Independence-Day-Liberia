import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient sound toggle — OFF by default.
 * Uses the Web Audio API to synthesize a soft, looping ambient pad
 * so no external audio asset is required. Subtle, patriotic-feeling
 * chord progression in a minor key.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ oscs: OscillatorNode[]; gains: GainNode[] } | null>(null);

  useEffect(() => {
    return () => {
      stop();
      ctxRef.current?.close().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // Soft chord (A minor-ish pad): A2, E3, A3, C4
      const freqs = [110, 164.81, 220, 261.63];
      const oscs: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = f;

        const g = ctx.createGain();
        g.gain.value = 0.08;

        // Slow LFO for gentle movement
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.1 + i * 0.03;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain);
        lfoGain.connect(g.gain);
        lfo.start();

        osc.connect(g);
        g.connect(master);
        osc.start();
        oscs.push(osc);
        gains.push(g);
      });

      // Fade in
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
      nodesRef.current = { oscs, gains };
    } catch {
      // Audio not supported / blocked — silently ignore
    }
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (ctx && nodes) {
      try {
        ctx.destination;
        const master = nodes.gains[0];
        // fade out via the first gain's parent (master) — simpler: just stop
        nodes.oscs.forEach((o) => {
          try { o.stop(); } catch { /* noop */ }
        });
      } catch { /* noop */ }
    }
    nodesRef.current = null;
  };

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
    } else {
      void start();
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:border-white/30 hover:text-white"
      aria-label={on ? 'Turn sound off' : 'Turn sound on'}
      aria-pressed={on}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="hidden sm:inline">{on ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
}
