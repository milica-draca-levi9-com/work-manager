"use client"

import { useState, useEffect } from "react"
import { getAllTravelRequests, getTotalTravelSpending, type CorporateTravel } from "@/lib/travel-api"
import { TravelRequestButton } from "./travel-request-button"

export function TravelManagement() {
  const [travels, setTravels] = useState<CorporateTravel[]>([])
  const [totalSpending, setTotalSpending] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [travelsData, spendingData] = await Promise.all([getAllTravelRequests(), getTotalTravelSpending()])
      setTravels(travelsData)
      setTotalSpending(spendingData)
    } catch (error) {
      console.error("Error fetching travel data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTravelRequested = () => {
    fetchData()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Total Spending Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Total Travel Spending</h2>
        <p className="text-3xl font-bold">{formatCurrency(totalSpending)}</p>
        <p className="text-blue-100 text-sm mt-1">Approved travel expenses</p>
      </div>

      {/* Travel Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Travel Requests</h2>
          <TravelRequestButton onTravelRequested={handleTravelRequested} />
        </div>

        {travels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">✈️</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Travel Requests</h3>
            <p className="text-gray-500">Start by requesting your first business trip!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {travels.map((travel, index) => (
              <div key={travel.id} className="relative">
                {/* Timeline line */}
                {index !== travels.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                )}

                {/* Travel card */}
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">✈️</span>
                  </div>

                  {/* Card content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {travel.flight?.departure} → {travel.flight?.destination}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(travel.start_date)} • {travel.days} days
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(travel.status)}`}>
                        {travel.status}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">{travel.purpose}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Client:</span>
                        <p className="font-medium">{travel.client?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Airline:</span>
                        <p className="font-medium">{travel.preferred_airline?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Hotel Rating:</span>
                        <p className="font-medium">{"⭐".repeat(travel.preferred_hotel_rating)} stars</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cost:</span>
                        <p className="font-medium text-blue-600">{formatCurrency(travel.estimated_cost)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
