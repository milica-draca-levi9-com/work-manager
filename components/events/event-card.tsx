"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EventDetailsDialog } from "./event-details-dialog"
import type { Event } from "@/lib/events-api"

interface EventCardProps {
  event: Event
  onEventUpdate: () => void
}

export function EventCard({ event, onEventUpdate }: EventCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h` : ""} ${mins > 0 ? `${mins}m` : ""}`
  }

  return (
    <>
      <Card
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image_url || "/placeholder.svg?height=200&width=400&query=event"}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge
              variant="secondary"
              className={event.type === "Education" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
            >
              {event.type === "Education" ? "🎓 Education" : "🎉 Social"}
            </Badge>
            {event.isAttending && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Attending
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{event.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.short_description}</p>
          <div className="flex items-center text-gray-500 text-xs mb-1">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(event.date_time)}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{formatTime(event.date_time)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{event.venue}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{formatDuration(event.duration)}</span>
            </div>
            {event.speakers && (
              <div className="flex items-center text-gray-500 text-xs">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span className="truncate max-w-[150px]">{event.speakers}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>

      <EventDetailsDialog
        event={event}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onEventUpdate={onEventUpdate}
      />
    </>
  )
}
