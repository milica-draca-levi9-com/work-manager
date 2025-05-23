"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createAssetBooking(formData: FormData) {
  try {
    // Extract form data
    const assetType = formData.get("asset_type") as string
    const borrowDate = formData.get("borrow_date") as string
    const returnDate = formData.get("return_date") as string

    // Validate required fields
    if (!assetType || !borrowDate || !returnDate) {
      return { success: false, error: "Missing required fields" }
    }

    // Validate date order
    if (new Date(borrowDate) > new Date(returnDate)) {
      return { success: false, error: "Return date cannot be before borrow date" }
    }

    // Prepare data for insertion
    const assetData = {
      // In a real app, get this from the authenticated user
      user_id: "00000000-0000-0000-0000-000000000001",
      asset_type: assetType,
      borrow_date: borrowDate,
      return_date: returnDate,
    }

    // Insert into database
    const { data, error } = await supabase.from("asset_bookings").insert([assetData]).select()

    if (error) {
      console.error("Error creating asset booking:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the asset booking page to show the new booking
    revalidatePath("/asset-booking")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in createAssetBooking:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
