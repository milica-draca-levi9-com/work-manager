"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createSickLeave(formData: FormData) {
  try {
    // Extract form data
    const startDate = formData.get("start_date") as string
    const endDate = formData.get("end_date") as string
    const reason = formData.get("reason") as string
    const attachment = formData.get("attachment") as File | null

    // Validate required fields
    if (!startDate || !endDate || !reason) {
      return { success: false, error: "Missing required fields" }
    }

    // Prepare data for insertion
    const sickLeaveData: any = {
      // In a real app, get this from the authenticated user
      user_id: "00000000-0000-0000-0000-000000000001",
      start_date: startDate,
      end_date: endDate,
      reason: reason,
      status: "pending",
    }

    // Handle file attachment if present
    if (attachment && attachment.size > 0) {
      // Convert file to ArrayBuffer
      const arrayBuffer = await attachment.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Add file data to the sick leave record
      sickLeaveData.attachment_file = buffer
      sickLeaveData.attachment_filename = attachment.name
      sickLeaveData.attachment_content_type = attachment.type
    }

    // Insert into database
    const { data, error } = await supabase.from("sick_leave").insert([sickLeaveData]).select()

    if (error) {
      console.error("Error creating sick leave:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the sick leave page to show the new request
    revalidatePath("/sick-leave")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in createSickLeave:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
