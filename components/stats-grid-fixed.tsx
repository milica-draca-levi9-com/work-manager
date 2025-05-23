import { SickLeaveStats } from "@/components/sick-leave-stats"
import { StatsCardWrapper } from "@/components/stats-card-wrapper"
import { GraduationCap, Plane, Receipt } from "lucide-react"

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
    {
      title: "Expense Claims",
      value: 5,
      icon: Receipt,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-500",
    },
  ]

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
      <SickLeaveStats />
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
