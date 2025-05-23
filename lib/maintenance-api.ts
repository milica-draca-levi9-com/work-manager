import { supabase } from "@/lib/supabase"

export type IssueType = "Equipment issue" | "Building maintenance"
export type Location = "Novi Sad" | "Belgrade" | "Zrenjanin" | "Iasi" | "Kyiv" | "Lviv" | "Amsterdam"

export interface MaintenanceIssue {
  id: string
  user_id: string
  date: string
  issue_type: IssueType
  description: string
  location: Location
  assigned_person_id: string | null
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  created_at: string
  assigned_person?: MaintenancePerson
}

export interface MaintenancePerson {
  id: string
  name: string
  email: string
  specialization: IssueType
  location: Location
  is_available: boolean
  created_at: string
}

export const ISSUE_TYPES: IssueType[] = ["Equipment issue", "Building maintenance"]

export const LOCATIONS: Location[] = ["Novi Sad", "Belgrade", "Zrenjanin", "Iasi", "Kyiv", "Lviv", "Amsterdam"]

export async function getMaintenanceIssues(issueType?: IssueType) {
  try {
    let query = supabase
      .from("maintenance_issues")
      .select(`*, assigned_person:assigned_person_id(id, name, email, specialization, location)`)
      .order("created_at", { ascending: false })

    if (issueType) {
      query = query.eq("issue_type", issueType)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching maintenance issues:", error)
      return []
    }

    return data as MaintenanceIssue[]
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export async function getMaintenancePersonnel(issueType: IssueType, location: Location) {
  try {
    const { data, error } = await supabase
      .from("maintenance_personnel")
      .select("*")
      .eq("specialization", issueType)
      .eq("location", location)
      .eq("is_available", true)
      .limit(1)

    if (error) {
      console.error("Error fetching maintenance personnel:", error)
      return null
    }

    return data.length > 0 ? (data[0] as MaintenancePerson) : null
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
