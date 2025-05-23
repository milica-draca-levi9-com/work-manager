"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventDetailsDialog } from "./event-details-dialog"
import type { Event } from "@/lib/events-api"
import { EventFilters } from "./event-filters"

interface EventsCalendarViewProps {
  events: Event[]
  onEventUpdate: () => void
}

export function EventsCalendarView({ events, onEventUpdate }: EventsCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
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

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of the month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDay = (day: number) => {
    const dayDate = new Date(year, month, day)
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date_time)
      return eventDate.toDateString() === dayDate.toDateString()
    })
  }

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getEventTypeColor = (type: "Education" | "Social") => {
    return type === "Education" ? "bg-blue-500" : "bg-green-500"
  }

  return (
    <div className="space-y-6">
      <EventFilters
        selectedType={selectedType}
        showAttendingOnly={showAttendingOnly}
        onTypeChange={handleTypeChange}
        onAttendingToggle={handleAttendingToggle}
        eventCount={filteredEvents.length}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center font-medium text-gray-500 text-sm">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="p-2 h-24"></div>
            }

            const dayEvents = getEventsForDay(day)
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

            return (
              <div
                key={day}
                className={`p-2 h-24 border border-gray-100 ${
                  isToday ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-700"}`}>{day}</div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full text-left text-xs p-1 rounded text-white truncate ${getEventTypeColor(
                        event.type,
                      )} hover:opacity-80`}
                      title={`${event.name} - ${formatTime(event.date_time)}`}
                    >
                      {formatTime(event.date_time)} {event.name}
                    </button>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Event Details Dialog */}
        {selectedEvent && (
          <EventDetailsDialog
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onEventUpdate={onEventUpdate}
          />
        )}
      </div>
    </div>
  )
}
