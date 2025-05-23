"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ASSET_TYPES } from "@/lib/asset-api"

interface AssetFiltersProps {
  assetTypeFilter: string
  setAssetTypeFilter: (assetType: string) => void
}

export function AssetFilters({ assetTypeFilter, setAssetTypeFilter }: AssetFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="w-full sm:w-48">
        <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by asset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Asset Types</SelectItem>
            {ASSET_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
