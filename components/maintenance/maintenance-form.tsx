"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createMaintenanceIssue } from "@/lib/maintenance-actions"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ISSUE_TYPES, LOCATIONS } from "@/lib/maintenance-api"
import type { IssueType, Location } from "@/lib/maintenance-api"

interface MaintenanceFormProps {
  onSuccess: (assignedPerson: { name: string; email: string } | null) => void
}

export function MaintenanceForm({ onSuccess }: MaintenanceFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [issueType, setIssueType] = useState<IssueType | "">("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState<Location | "">("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !issueType || !description || !location) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format date for the API
      const formattedDate = date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        : ""

      // Create FormData
      const formData = new FormData()
      formData.append("date", formattedDate)
      formData.append("issue_type", issueType)
      formData.append("description", description)
      formData.append("location", location)

      const result = await createMaintenanceIssue(formData)

      if (result.success) {
        onSuccess(result.assignedPerson)
      } else {
        setError(result.error || "Failed to create maintenance issue")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Function to get emoji for issue type
  const getIssueEmoji = (issueType: IssueType): string => {
    switch (issueType) {
      case "Equipment issue":
        return "🖥️"
      case "Building maintenance":
        return "🏢"
      default:
        return "🔧"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Popover>
          <PopoverTrigger>
            <Button
              id="date"
              variant="outline"
              type="button"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? formatDate(date) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="issue_type">Issue Type *</Label>
        <Select value={issueType} onValueChange={(value) => setIssueType(value as IssueType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an issue type">
              {issueType && (
                <div className="flex items-center">
                  <span className="mr-2">{getIssueEmoji(issueType as IssueType)}</span>
                  <span>{issueType}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ISSUE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <span className="mr-2">{getIssueEmoji(type)}</span>
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Select value={location} onValueChange={(value) => setLocation(value as Location)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Please describe the issue in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={() => onSuccess(null)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Issue"
          )}
        </Button>
      </div>
    </form>
  )
}
