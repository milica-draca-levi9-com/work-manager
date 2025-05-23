"use server"

import { supabase } from "./supabase"
import { getCurrentUserId } from "./events-api"

export async function attendEvent(eventId: string) {
  const userId = getCurrentUserId()

  const { error } = await supabase.from("event_attendees").insert({
    event_id: eventId,
    user_id: userId,
  })

  if (error) {
    console.error("Error attending event:", error)
    throw new Error("Failed to attend event")
  }

  return { success: true }
}

export async function cancelAttendance(eventId: string) {
  const userId = getCurrentUserId()

  const { error } = await supabase.from("event_attendees").delete().eq("event_id", eventId).eq("user_id", userId)

  if (error) {
    console.error("Error cancelling attendance:", error)
    throw new Error("Failed to cancel attendance")
  }

  return { success: true }
}
