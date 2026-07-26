import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/Liberia_National_Anthem.ogg');

    audio.loop = false;
    audio.volume = 0.35;
    audio.preload = 'auto';

    audioRef.current = audio;

    const handleEnded = () => {
      setOn(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (on) {
      audio.pause();
      setOn(false);
    } else {
      try {
        await audio.play();
        setOn(true);
      } catch (error) {
        console.error('Unable to play national anthem:', error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:border-white/30 hover:text-white"
      aria-label={on ? 'Stop national anthem' : 'Play national anthem'}
      aria-pressed={on}
    >
      {on ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}

      <span className="hidden sm:inline">
        {on ? 'Anthem Playing' : 'Play National Anthem'}
      </span>
    </button>
  );
}