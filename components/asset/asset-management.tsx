"use client"

import { useState, useEffect } from "react"
import { AssetFilters } from "./asset-filters"
import { AssetBookButton } from "./asset-book-button"
import { getAssetBookings } from "@/lib/asset-api"
import type { AssetBooking } from "@/lib/asset-api"

export function AssetManagement() {
  const [assets, setAssets] = useState<AssetBooking[]>([])
  const [filteredAssets, setFilteredAssets] = useState<AssetBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [assetTypeFilter, setAssetTypeFilter] = useState<string>("all")

  // Fetch asset data
  const fetchAssets = async () => {
    setIsLoading(true)
    try {
      const data = await getAssetBookings()
      setAssets(data)
      setFilteredAssets(data)
    } catch (error) {
      console.error("Error fetching assets:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAssets()
  }, [])

  // Apply filters when asset type filter changes
  useEffect(() => {
    let filtered = assets

    // Apply asset type filter
    if (assetTypeFilter !== "all") {
      filtered = filtered.filter((asset) => asset.asset_type === assetTypeFilter)
    }

    setFilteredAssets(filtered)
  }, [assetTypeFilter, assets])

  // Handle successful submission of a new asset booking
  const handleAssetBooked = () => {
    fetchAssets()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <AssetFilters assetTypeFilter={assetTypeFilter} setAssetTypeFilter={setAssetTypeFilter} />
        <AssetBookButton onAssetBooked={handleAssetBooked} />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading asset bookings...</div>
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No asset bookings found. Create a new booking using the button above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const borrowDate = new Date(asset.borrow_date)
            const returnDate = new Date(asset.return_date)
            const today = new Date()
            const duration = Math.ceil((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24))
            const isActive = today >= borrowDate && today <= returnDate
            const isUpcoming = today < borrowDate
            const isOverdue = today > returnDate && !isActive && !isUpcoming

            // Use consistent green color scheme for all cards
            const bgColor = "bg-gray-50"
            const borderColor = "border-gr-200"
            const textColor = "text-green-700"

            return (
              <div
                key={asset.id}
                className={`${bgColor} border ${borderColor} rounded-lg p-5 shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full ${textColor} bg-white flex items-center justify-center border ${borderColor}`}
                  >
                    {asset.asset_type === "Car" && "🚗"}
                    {asset.asset_type === "Speaker" && "🔊"}
                    {asset.asset_type === "Projector" && "📽️"}
                    {asset.asset_type === "Wifi Router" && "📶"}
                    {asset.asset_type === "Bike" && "🚲"}
                    {asset.asset_type === "TV" && "📺"}
                    {asset.asset_type === "Laptop" && "💻"}
                    {asset.asset_type === "Mobile phone" && "📱"}
                  </div>
                  <h3 className={`font-medium text-lg ${textColor}`}>{asset.asset_type}</h3>

                  {isOverdue && (
                    <div className="ml-auto">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800">
                        ⚠️
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Borrow Date:</span>
                    <span className="font-medium">
                      {borrowDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Return Date:</span>
                    <span className={`font-medium ${isOverdue ? "text-amber-600" : ""}`}>
                      {returnDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">
                      {duration} {duration === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  {isOverdue && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Overdue
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
