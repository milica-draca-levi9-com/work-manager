'use client';

import { Header } from '@/components/header';
import { WelcomeSection } from '@/components/welcome-section';
import { FeatureCardsGridFixed } from '@/components/feature-cards-grid-fixed';
import { StatsGridFixed } from '@/components/stats-grid-fixed';
import { UpcomingEvents } from '@/components/upcoming-events';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <WelcomeSection />
        <FeatureCardsGridFixed />
        <UpcomingEvents />
        {/* <StatsGridFixed /> */}
      </main>
    </div>
  );
}
