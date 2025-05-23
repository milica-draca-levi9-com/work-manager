"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer } from "lucide-react"

export function RemainingSickLeave() {
  const [remainingDays, setRemainingDays] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Since the user_settings table doesn't exist, we'll use a hardcoded value
    // In a real app, this would come from an existing table or API
    setTimeout(() => {
      setRemainingDays(10)
      setLoading(false)
    }, 500) // Add a small delay to simulate loading
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-rose-500" />
          Sick Leave Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-rose-600">{remainingDays}</span>
            <span className="text-gray-500 mb-1">days remaining</span>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Sick leave resets on January 1st. Use your sick days when you need them!
        </p>
      </CardContent>
    </Card>
  )
}
