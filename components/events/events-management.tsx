"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Grid3X3, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { EventsGridView } from "./events-grid-view"
import { EventsCalendarView } from "./events-calendar-view"
import { getAllEvents, type Event } from "@/lib/events-api"

type ViewMode = "grid" | "calendar"

export function EventsManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsData = await getAllEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const refreshEvents = useCallback(async () => {
    setLoading(true)
    try {
      const eventsData = await getAllEvents()
      setEvents(eventsData)
    } catch (error) {
      console.error("Error refreshing events:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-500">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Education & Social Activities</h1>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <EventsGridView events={events} onEventUpdate={refreshEvents} />
        ) : (
          <EventsCalendarView events={events} onEventUpdate={refreshEvents} />
        )}
      </div>
    </div>
  )
}
