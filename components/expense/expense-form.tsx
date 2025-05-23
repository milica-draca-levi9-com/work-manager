"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createExpenseReport } from "@/lib/expense-actions"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ExpenseFormProps {
  onSuccess: () => void
}

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
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

  // Check if date is in the future
  const isInFuture = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date.getTime() > today.getTime()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!purchaseDate || !description || !amount) {
      setError("Please fill in all required fields")
      return
    }

    // Validate amount is a number
    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format date for the API
      const formattedPurchaseDate = purchaseDate
        ? `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, "0")}-${String(
            purchaseDate.getDate(),
          ).padStart(2, "0")}`
        : ""

      // Create FormData for file upload
      const formData = new FormData()
      formData.append("purchase_date", formattedPurchaseDate)
      formData.append("description", description)
      formData.append("amount", amount)

      if (file) {
        formData.append("attachment", file)
      }

      const result = await createExpenseReport(formData)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error || "Failed to create expense report")
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
      <div className="space-y-2">
        <Label htmlFor="purchase_date">Purchase Date *</Label>
        <Popover>
          <PopoverTrigger>
            <Button
              id="purchase_date"
              variant="outline"
              type="button"
              className={cn("w-full justify-start text-left font-normal", !purchaseDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {purchaseDate ? formatDate(purchaseDate) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={purchaseDate}
              onSelect={setPurchaseDate}
              disabled={(date) => (date ? isInFuture(date) : false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Input
          id="description"
          placeholder="Brief description of the expense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount *</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5">$</span>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            className="pl-7"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">Receipt (Optional)</Label>
        <Input id="attachment" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <p className="text-sm text-gray-500">Upload a receipt or invoice (PDF, JPG, PNG)</p>
      </div>

      {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Expense"
          )}
        </Button>
      </div>
    </form>
  )
}
