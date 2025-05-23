"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAssetBooking } from "@/lib/asset-actions"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ASSET_TYPES } from "@/lib/asset-api"
import type { AssetType } from "@/lib/asset-api"

interface AssetFormProps {
  onSuccess: () => void
}

export function AssetForm({ onSuccess }: AssetFormProps) {
  const [assetType, setAssetType] = useState<AssetType | "">("")
  const [borrowDate, setBorrowDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date())
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

    if (!assetType || !borrowDate || !returnDate) {
      setError("Please fill in all required fields")
      return
    }

    if (borrowDate > returnDate) {
      setError("Return date cannot be before borrow date")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format dates for the API
      const formattedBorrowDate = borrowDate
        ? `${borrowDate.getFullYear()}-${String(borrowDate.getMonth() + 1).padStart(2, "0")}-${String(borrowDate.getDate()).padStart(2, "0")}`
        : ""
      const formattedReturnDate = returnDate
        ? `${returnDate.getFullYear()}-${String(returnDate.getMonth() + 1).padStart(2, "0")}-${String(returnDate.getDate()).padStart(2, "0")}`
        : ""

      // Create FormData
      const formData = new FormData()
      formData.append("asset_type", assetType)
      formData.append("borrow_date", formattedBorrowDate)
      formData.append("return_date", formattedReturnDate)

      const result = await createAssetBooking(formData)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error || "Failed to create asset booking")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to get color for asset type
  const getAssetColor = (assetType: AssetType): string => {
    switch (assetType) {
      case "Car":
        return "text-blue-600"
      case "Speaker":
        return "text-purple-600"
      case "Projector":
        return "text-orange-600"
      case "Wifi Router":
        return "text-green-600"
      case "Bike":
        return "text-red-600"
      case "TV":
        return "text-indigo-600"
      case "Laptop":
        return "text-gray-600"
      case "Mobile phone":
        return "text-pink-600"
      default:
        return "text-gray-600"
    }
  }

  // Function to get emoji for asset type
  const getAssetEmoji = (assetType: AssetType): string => {
    switch (assetType) {
      case "Car":
        return "🚗"
      case "Speaker":
        return "🔊"
      case "Projector":
        return "📽️"
      case "Wifi Router":
        return "📶"
      case "Bike":
        return "🚲"
      case "TV":
        return "📺"
      case "Laptop":
        return "💻"
      case "Mobile phone":
        return "📱"
      default:
        return "📦"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="asset_type">Asset Type *</Label>
        <Select value={assetType} onValueChange={(value) => setAssetType(value as AssetType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an asset type">
              {assetType && (
                <div className="flex items-center">
                  <span className="mr-2">{getAssetEmoji(assetType as AssetType)}</span>
                  <span>{assetType}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ASSET_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <span className="mr-2">{getAssetEmoji(type)}</span>
                  <span className={getAssetColor(type)}>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="borrow_date">Borrow Date *</Label>
          <Popover>
            <PopoverTrigger>
              <Button
                id="borrow_date"
                variant="outline"
                type="button"
                className={cn("w-full justify-start text-left font-normal", !borrowDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {borrowDate ? formatDate(borrowDate) : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={borrowDate}
                onSelect={(date) => {
                  setBorrowDate(date)
                  // If return date is before new borrow date, update return date
                  if (returnDate && date && isDateBefore(returnDate, date)) {
                    setReturnDate(date)
                  }
                }}
                disabled={(date) => (date ? isBeforeToday(date) : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="return_date">Return Date *</Label>
          <Popover>
            <PopoverTrigger>
              <Button
                id="return_date"
                variant="outline"
                type="button"
                className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? formatDate(returnDate) : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                disabled={(date) =>
                  date ? (borrowDate ? isDateBefore(date, borrowDate) : isBeforeToday(date)) : false
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="bg-teal-500 hover:bg-teal-600" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Book Asset"
          )}
        </Button>
      </div>
    </form>
  )
}
