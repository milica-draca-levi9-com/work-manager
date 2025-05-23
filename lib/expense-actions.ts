"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createExpenseReport(formData: FormData) {
  try {
    // Extract form data
    const purchaseDate = formData.get("purchase_date") as string
    const description = formData.get("description") as string
    const amount = formData.get("amount") as string
    const attachment = formData.get("attachment") as File | null

    // Validate required fields
    if (!purchaseDate || !description || !amount) {
      return { success: false, error: "Missing required fields" }
    }

    // Validate amount is a number
    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum)) {
      return { success: false, error: "Amount must be a valid number" }
    }

    // Prepare data for insertion
    const expenseData: any = {
      // In a real app, get this from the authenticated user
      user_id: "00000000-0000-0000-0000-000000000001",
      purchase_date: purchaseDate,
      description: description,
      amount: amountNum,
      status: "Pending",
    }

    // Handle file attachment if present
    if (attachment && attachment.size > 0) {
      // Convert file to ArrayBuffer
      const arrayBuffer = await attachment.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Add file data to the expense record
      expenseData.attachment_file = buffer
      expenseData.attachment_filename = attachment.name
      expenseData.attachment_content_type = attachment.type
    }

    // Insert into database
    const { data, error } = await supabase.from("expense_reports").insert([expenseData]).select()

    if (error) {
      console.error("Error creating expense report:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the expense report page to show the new request
    revalidatePath("/expense-report")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in createExpenseReport:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
