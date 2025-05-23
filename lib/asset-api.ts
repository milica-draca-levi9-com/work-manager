import { supabase } from "@/lib/supabase"

export type AssetType = "Car" | "Speaker" | "Projector" | "Wifi Router" | "Bike" | "TV" | "Laptop" | "Mobile phone"

export interface AssetBooking {
  id: string
  user_id: string
  asset_type: AssetType
  borrow_date: string
  return_date: string
  created_at: string
}

export async function getAssetBookings(assetType?: AssetType) {
  try {
    let query = supabase.from("asset_bookings").select("*").order("created_at", { ascending: false })

    if (assetType) {
      query = query.eq("asset_type", assetType)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching asset bookings:", error)
      return []
    }

    return data as AssetBooking[]
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export const ASSET_TYPES: AssetType[] = [
  "Car",
  "Speaker",
  "Projector",
  "Wifi Router",
  "Bike",
  "TV",
  "Laptop",
  "Mobile phone",
]
