import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Facebook, Twitter, MessageCircle, Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SHARE_TEXT =
  'Happy 179th Independence Day, Liberia! 🇱🇷❤️🤍💙\n\nA small digital letter to the country I call home.\n\nOne Nation. One People. One Liberia.\n\nOpen the letter and celebrate Liberia with me.';

export function ShareSection() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encoded = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(shareUrl);

  const buttons = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encoded}`,
      color: '#25D366',
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`,
      color: '#1877F2',
    },
    {
      label: 'X / Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`,
      color: '#e85a64',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#050d2c] via-[#0a1a4a] to-[#050d2c] px-6 py-24"
      aria-label="Share the love for Liberia"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.15),transparent_60%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.4 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-[0.4em] text-white/50 uppercase">
          Send The Love
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl">
          Share The Love For Liberia 🇱🇷
        </h2>
        <p className="mt-5 font-display text-lg text-white/70 sm:text-xl">
          Send this little letter to someone who carries Liberia in their heart.
        </p>
        <div className="mt-5 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#e85a64] to-transparent" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {buttons.map((b) => {
            const Icon = b.icon;
            return (
              <motion.a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.07]"
                whileHover={reduced ? undefined : { y: -4 }}
                whileTap={{ scale: 0.96 }}
                aria-label={`Share on ${b.label}`}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ background: `${b.color}20`, color: b.color }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-body text-sm font-medium text-white/80">
                  {b.label}
                </span>
              </motion.a>
            );
          })}

          {/* Copy Link */}
          <motion.button
            type="button"
            onClick={handleCopy}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.07]"
            whileHover={reduced ? undefined : { y: -4 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Copy link"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Check className="h-6 w-6 text-[#25D366]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="link"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <LinkIcon className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="font-body text-sm font-medium text-white/80">
              Copy Link
            </span>
          </motion.button>
        </div>

        {/* Copied notification */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-[#25D366]"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <Check className="h-4 w-4" />
              Link copied! 🇱🇷
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
