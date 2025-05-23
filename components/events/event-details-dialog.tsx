"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/events-api"
import { attendEvent, cancelAttendance } from "@/lib/events-actions"

interface EventDetailsDialogProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onEventUpdate: () => void
}

export function EventDetailsDialog({ event, isOpen, onClose, onEventUpdate }: EventDetailsDialogProps) {
  const [isAttending, setIsAttending] = useState(event.isAttending || false)
  const [isLoading, setIsLoading] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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

    if (hours === 0) {
      return `${mins} minutes`
    } else if (mins === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${mins} minutes`
    }
  }

  const handleAttendance = async () => {
    setIsLoading(true)
    try {
      if (isAttending) {
        await cancelAttendance(event.id)
        setIsAttending(false)
      } else {
        await attendEvent(event.id)
        setIsAttending(true)
      }
      onEventUpdate()
    } catch (error) {
      console.error("Error updating attendance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl">{event.name}</DialogTitle>
            <Badge
              variant="secondary"
              className={event.type === "Education" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
            >
              {event.type === "Education" ? "🎓 Education" : "🎉 Social"}
            </Badge>
            {isAttending && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Attending
              </Badge>
            )}
          </div>
          <DialogDescription>{event.short_description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>

            {event.speakers && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Speakers</h3>
                <p className="text-gray-700">{event.speakers}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <img
              src={event.image_url || "/placeholder.svg?height=200&width=400&query=event"}
              alt={event.name}
              className="w-full h-40 object-cover rounded-md"
            />

            <div>
              <div className="flex items-center text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{formatDate(event.date_time)}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {formatTime(event.date_time)} ({formatDuration(event.duration)})
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAttendance}
            disabled={isLoading}
            variant={isAttending ? "outline" : "default"}
            className={isAttending ? "border-red-200 text-red-600 hover:bg-red-50" : ""}
          >
            {isLoading ? "Processing..." : isAttending ? "Cancel Attendance" : "Attend Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
