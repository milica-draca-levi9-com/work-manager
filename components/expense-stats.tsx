import { getExpenseCount } from "@/lib/expense-api"
import { StatsCardWrapper } from "@/components/stats-card-wrapper"
import { Receipt } from "lucide-react"

export async function ExpenseStats() {
  const pendingCount = await getExpenseCount("Pending")

  return (
    <StatsCardWrapper
      title="Expense Claims"
      value={pendingCount}
      icon={Receipt}
      bgColor="bg-emerald-100"
      iconColor="text-emerald-500"
    />
  )
}
