"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { getMaintenancePersonnel } from "./maintenance-api"
import type { IssueType, Location } from "./maintenance-api"

export async function createMaintenanceIssue(formData: FormData) {
  try {
    // Extract form data
    const date = formData.get("date") as string
    const issueType = formData.get("issue_type") as IssueType
    const description = formData.get("description") as string
    const location = formData.get("location") as Location

    // Validate required fields
    if (!date || !issueType || !description || !location) {
      return { success: false, error: "Missing required fields" }
    }

    // Find appropriate maintenance person based on issue type and location
    const assignedPerson = await getMaintenancePersonnel(issueType, location)

    // Prepare data for insertion
    const issueData = {
      // In a real app, get this from the authenticated user
      user_id: "00000000-0000-0000-0000-000000000001",
      date,
      issue_type: issueType,
      description,
      location,
      assigned_person_id: assignedPerson?.id || null,
      status: "Open",
    }

    // Insert into database
    const { data, error } = await supabase.from("maintenance_issues").insert([issueData]).select()

    if (error) {
      console.error("Error creating maintenance issue:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the maintenance issues page to show the new issue
    revalidatePath("/maintenance-issues")

    return {
      success: true,
      data: data[0],
      assignedPerson: assignedPerson
        ? {
            name: assignedPerson.name,
            email: assignedPerson.email,
          }
        : null,
    }
  } catch (error) {
    console.error("Error in createMaintenanceIssue:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
