import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our sick leave table
export interface SickLeave {
  id: string
  user_id: string
  start_date: string
  end_date: string
  reason: string
  attachment_file?: Buffer
  attachment_filename?: string
  attachment_content_type?: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}
