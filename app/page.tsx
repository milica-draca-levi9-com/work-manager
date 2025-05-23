import React from 'react'
import { Header } from "@/components/header"
import { WelcomeSection } from "@/components/welcome-section"
import { FeatureCardsGridFixed } from "@/components/feature-cards-grid-fixed"
import { StatsGridFixed } from "@/components/stats-grid-fixed"

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <WelcomeSection />
        <FeatureCardsGridFixed />
        <StatsGridFixed />
      </main>
    </div>
  )
}
