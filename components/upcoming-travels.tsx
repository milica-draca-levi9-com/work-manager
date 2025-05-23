"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Travel {
  id: string
  start_date: string
  days: number
  purpose: string
  flight: {
    departure: string
    destination: string
  }
}

export function UpcomingTravels() {
  const [travels, setTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUpcomingTravels() {
      try {
        const today = new Date().toISOString().split("T")[0]

        const { data, error } = await supabase
          .from("corporate_travel")
          .select(`
            id,
            start_date,
            days,
            purpose,
            flight:flights(departure, destination)
          `)
          .eq("status", "Approved")
          .gte("start_date", today)
          .order("start_date")
          .limit(3)

        if (error) {
          console.error("Error fetching upcoming travels:", error)
          setTravels([])
        } else {
          setTravels(data as Travel[])
        }
      } catch (error) {
        console.error("Error:", error)
        setTravels([])
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingTravels()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Plane className="h-5 w-5 text-sky-500" />
          Upcoming Travels
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <div className="animate-pulse h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="animate-pulse h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : travels.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming travels scheduled</p>
        ) : (
          <div className="space-y-3">
            {travels.map((travel) => (
              <div key={travel.id} className="border-l-2 border-sky-200 pl-3 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">
                    {travel.flight.departure} → {travel.flight.destination}
                  </h4>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(travel.start_date)} ({travel.days} days)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
