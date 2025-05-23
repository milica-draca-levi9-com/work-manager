import { SickLeaveStats } from "@/components/sick-leave-stats"
import { ExpenseStats } from "@/components/expense-stats"
import { StatsCardWrapper } from "@/components/stats-card-wrapper"
import { GraduationCap, Plane } from "lucide-react"

export function StatsGridFixed() {
  const otherStats = [
    {
      title: "Upcoming Events",
      value: 2,
      icon: GraduationCap,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Planned Trips",
      value: 1,
      icon: Plane,
      bgColor: "bg-sky-100",
      iconColor: "text-sky-500",
    },
  ]

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
      <SickLeaveStats />
      <ExpenseStats />
      {otherStats.map((stat, index) => (
        <StatsCardWrapper
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  )
}
