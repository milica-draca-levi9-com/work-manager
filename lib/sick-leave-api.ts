import { supabase, type SickLeave } from "@/lib/supabase"

export async function getSickLeaveRequests(status?: "pending" | "approved" | "rejected") {
  try {
    let query = supabase.from("sick_leave").select("*").order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching sick leave requests:", error)
      return []
    }

    return data as SickLeave[]
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export async function createSickLeaveRequest(request: {
  user_id: string
  start_date: string
  end_date: string
  reason: string
  attachment_file?: Buffer
  attachment_filename?: string
  attachment_content_type?: string
}) {
  try {
    const { data, error } = await supabase.from("sick_leave").insert([request]).select()

    if (error) {
      console.error("Error creating sick leave request:", error)
      return null
    }

    return data[0] as SickLeave
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
