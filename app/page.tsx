"use client"

import { Header } from "@/components/header"
import { WelcomeSection } from "@/components/welcome-section"
import { FeatureCardsGridFixed } from "@/components/feature-cards-grid-fixed"
import { UpcomingEvents } from "@/components/upcoming-events"
import { RemainingSickLeave } from "@/components/remaining-sick-leave"
import { UpcomingTravels } from "@/components/upcoming-travels"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <WelcomeSection />

        {/* Add the sick leave and travel info below the welcome section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RemainingSickLeave />
          <UpcomingTravels />
        </div>
        <FeatureCardsGridFixed />
          <UpcomingEvents />
      </main>
    </div>
  )
}
