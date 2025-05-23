"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createSickLeave } from "@/lib/sick-leave-actions"
import { CalendarIcon, Loader2 } from "lucide-react"
// Remove the date-fns import and implement simple date functions
// import { format, isBefore } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface SickLeaveFormProps {
  onSuccess: () => void
}

export function SickLeaveForm({ onSuccess }: SickLeaveFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [reason, setReason] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simple date formatting function
  const formatDate = (date: Date | undefined): string => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Simple date comparison function
  const isDateBefore = (date1: Date | undefined, date2: Date | undefined): boolean => {
    if (!date1 || !date2) return false
    return date1.getTime() < date2.getTime()
  }

  // Check if date is before today
  const isBeforeToday = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date.getTime() < today.getTime()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || !reason) {
      setError("Please fill in all required fields")
      return
    }

    if (startDate > endDate) {
      setError("End date cannot be before start date")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format dates for the API
      const formattedStartDate = startDate
        ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`
        : ""
      const formattedEndDate = endDate
        ? `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`
        : ""

      // Create FormData for file upload
      const formData = new FormData()
      formData.append("start_date", formattedStartDate)
      formData.append("end_date", formattedEndDate)
      formData.append("reason", reason)

      if (file) {
        formData.append("attachment", file)
      }

      const result = await createSickLeave(formData)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error || "Failed to create sick leave request")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date *</Label>
          <Popover>
            <PopoverTrigger>
              <Button
                id="start_date"
                variant="outline"
                type="button"
                className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? formatDate(startDate) : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date)
                  // If end date is before new start date, update end date
                  if (endDate && date && isDateBefore(endDate, date)) {
                    setEndDate(date)
                  }
                }}
                disabled={(date) => (date ? isBeforeToday(date) : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date *</Label>
          <Popover>
            <PopoverTrigger>
              <Button
                id="end_date"
                variant="outline"
                type="button"
                className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? formatDate(endDate) : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => (date ? (startDate ? isDateBefore(date, startDate) : isBeforeToday(date)) : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason *</Label>
        <Textarea
          id="reason"
          placeholder="Please describe the reason for your sick leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">Attachment (Optional)</Label>
        <Input id="attachment" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <p className="text-sm text-gray-500">Upload a doctor's note or other relevant document (PDF, JPG, PNG)</p>
      </div>

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </form>
  )
}
