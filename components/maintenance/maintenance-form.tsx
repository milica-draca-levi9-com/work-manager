"use client"

import type React from "react"
import { useState } from "react"
import { createMaintenanceIssue } from "@/lib/maintenance-actions"
import { ISSUE_TYPES, LOCATIONS } from "@/lib/maintenance-api"
import type { IssueType, Location } from "@/lib/maintenance-api"

interface MaintenanceFormProps {
  onSuccess: (assignedPerson: { name: string; email: string } | null) => void
}

export function MaintenanceForm({ onSuccess }: MaintenanceFormProps) {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [issueType, setIssueType] = useState<IssueType | "">("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState<Location | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !issueType || !description || !location) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("date", date)
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date *
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="issue_type" className="block text-sm font-medium text-gray-700">
          Issue Type *
        </label>
        <select
          id="issue_type"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value as IssueType)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          required
        >
          <option value="" disabled>
            Select an issue type
          </option>
          {ISSUE_TYPES.map((type) => (
            <option key={type} value={type}>
              {getIssueEmoji(type)} {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location *
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value as Location)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          required
        >
          <option value="" disabled>
            Select a location
          </option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          placeholder="Please describe the issue in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          required
        />
      </div>

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={() => onSuccess(null)}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Issue"}
        </button>
      </div>
    </form>
  )
}
