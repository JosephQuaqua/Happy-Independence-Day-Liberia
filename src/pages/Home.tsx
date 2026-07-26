import { useState, useCallback } from 'react';
import { Hero } from '@/components/Hero';
import { FlagAnimation } from '@/components/FlagAnimation';
import { Envelope } from '@/components/Envelope';
import { Letter } from '@/components/Letter';
import { Timeline } from '@/components/Timeline';
import { LiberiaValues } from '@/components/LiberiaValues';
import { HomeSection } from '@/components/HomeSection';
import { FutureSection } from '@/components/FutureSection';
import { CelebrationCTA } from '@/components/CelebrationCTA';
import { Celebration } from '@/components/Celebration';
import { ShareSection } from '@/components/ShareSection';
import { Footer } from '@/components/Footer';
import { SoundToggle } from '@/components/SoundToggle';

export function Home() {
  const [celebrating, setCelebrating] = useState(false);

  const handleOpenLetter = useCallback(() => {
    // Smooth scroll to the flag section after the hero
    const el = document.getElementById('flag');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleEnvelopeOpen = useCallback(() => {
    const el = document.getElementById('letter');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCelebrate = useCallback(() => {
    setCelebrating(true);
    // Allow re-trigger after the celebration settles
    setTimeout(() => setCelebrating(false), 9500);
  }, []);

  return (
    <main className="grain relative">
      <Hero onOpen={handleOpenLetter} />

      <div id="flag">
        <FlagAnimation />
      </div>

      <div id="envelope">
        <Envelope onOpen={handleEnvelopeOpen} />
      </div>

      <div id="letter">
        <Letter />
      </div>

      <Timeline />

      <LiberiaValues />

      <HomeSection />

      <FutureSection />

      <CelebrationCTA onCelebrate={handleCelebrate} celebrating={celebrating} />

      <ShareSection />

      <Footer />

      <Celebration active={celebrating} />
      <SoundToggle />
    </main>
  );
}
