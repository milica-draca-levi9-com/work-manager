"use client"

import { useState, useCallback, useMemo } from "react"
import { EventCard } from "./event-card"
import { EventFilters } from "./event-filters"
import type { Event } from "@/lib/events-api"

interface EventsGridViewProps {
  events: Event[]
  onEventUpdate: () => void
}

export function EventsGridView({ events, onEventUpdate }: EventsGridViewProps) {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [showAttendingOnly, setShowAttendingOnly] = useState(false)

  const filteredEvents = useMemo(() => {
    let filtered = events

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    // Filter by attendance
    if (showAttendingOnly) {
      filtered = filtered.filter((event) => event.isAttending)
    }

    return filtered
  }, [events, selectedType, showAttendingOnly])

  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type)
  }, [])

  const handleAttendingToggle = useCallback((attending: boolean) => {
    setShowAttendingOnly(attending)
  }, [])

  return (
    <div className="space-y-6">
      <EventFilters
        selectedType={selectedType}
        showAttendingOnly={showAttendingOnly}
        onTypeChange={handleTypeChange}
        onAttendingToggle={handleAttendingToggle}
        eventCount={filteredEvents.length}
      />

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onEventUpdate={onEventUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}
