import { supabase } from "@/lib/supabase"
import { StatsCardWrapper } from "@/components/stats-card-wrapper"
import { Thermometer } from "lucide-react"

async function getSickLeaveCount() {
  try {
    const { count, error } = await supabase
      .from("sick_leave")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    if (error) {
      console.error("Error fetching sick leave count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Error:", error)
    return 0
  }
}

export async function SickLeaveStats() {
  const pendingCount = await getSickLeaveCount()

  return (
    <StatsCardWrapper
      title="Pending Requests"
      value={pendingCount}
      icon={Thermometer}
      bgColor="bg-rose-100"
      iconColor="text-rose-500"
    />
  )
}
