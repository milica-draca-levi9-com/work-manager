"use server"

import { supabase } from "./supabase"
import { revalidatePath } from "next/cache"

export async function createTravelRequest(formData: FormData) {
  try {
    const travelData = {
      user_id: "00000000-0000-0000-0000-000000000001", // Placeholder user ID
      flight_id: formData.get("flight_id") as string,
      start_date: formData.get("start_date") as string,
      days: Number.parseInt(formData.get("days") as string),
      purpose: formData.get("purpose") as string,
      estimated_cost: Number.parseFloat(formData.get("estimated_cost") as string),
      client_id: formData.get("client_id") as string,
      preferred_airline_id: formData.get("preferred_airline_id") as string,
      preferred_hotel_rating: Number.parseInt(formData.get("preferred_hotel_rating") as string),
      status: "Pending",
    }

    const { error } = await supabase.from("corporate_travel").insert([travelData])

    if (error) throw error

    revalidatePath("/corporate-travel")
    return { success: true, message: "Travel request submitted successfully!" }
  } catch (error) {
    console.error("Error creating travel request:", error)
    return { success: false, message: "Failed to submit travel request" }
  }
}
