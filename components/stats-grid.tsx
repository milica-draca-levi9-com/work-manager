import { StatsCard } from "@/components/stats-card"
import { Thermometer, GraduationCap, Plane, Receipt } from "lucide-react"

export function StatsGrid() {
  const stats = [
    {
      title: "Pending Requests",
      value: 3,
      icon: Thermometer,
      color: "rose" as const,
    },
    {
      title: "Upcoming Events",
      value: 2,
      icon: GraduationCap,
      color: "purple" as const,
    },
    {
      title: "Planned Trips",
      value: 1,
      icon: Plane,
      color: "sky" as const,
    },
    {
      title: "Expense Claims",
      value: 5,
      icon: Receipt,
      color: "emerald" as const,
    },
  ]

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
      ))}
    </div>
  )
}
