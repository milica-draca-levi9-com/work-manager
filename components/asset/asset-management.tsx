"use client"

import { useState, useEffect } from "react"
import { AssetTable } from "./asset-table"
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

      <AssetTable assets={filteredAssets} isLoading={isLoading} />
    </div>
  )
}
