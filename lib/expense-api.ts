import { supabase } from "@/lib/supabase"

export interface ExpenseReport {
  id: string
  user_id: string
  purchase_date: string
  description: string
  amount: number
  status: "Pending" | "Approved" | "Rejected"
  attachment_file?: Buffer
  attachment_filename?: string
  attachment_content_type?: string
  created_at: string
}

export async function getExpenseReports(status?: "Pending" | "Approved" | "Rejected") {
  try {
    let query = supabase.from("expense_reports").select("*").order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching expense reports:", error)
      return []
    }

    return data as ExpenseReport[]
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export async function getExpenseCount(status: "Pending" | "Approved" | "Rejected" = "Pending") {
  try {
    const { count, error } = await supabase
      .from("expense_reports")
      .select("*", { count: "exact", head: true })
      .eq("status", status)

    if (error) {
      console.error("Error fetching expense count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Error:", error)
    return 0
  }
}
