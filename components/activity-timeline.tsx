import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  time: string
  category: "sick-leave" | "education" | "travel" | "expense" | "maintenance" | "asset"
}

export function ActivityTimeline() {
  const activities: TimelineItem[] = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        initials: "AJ",
      },
      action: "submitted",
      target: "sick leave request",
      time: "Just now",
      category: "sick-leave",
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        initials: "MG",
      },
      action: "registered for",
      target: "Leadership Workshop",
      time: "2 hours ago",
      category: "education",
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        initials: "DK",
      },
      action: "booked",
      target: "company car",
      time: "Yesterday",
      category: "asset",
    },
    {
      id: 4,
      user: {
        name: "Sarah Wilson",
        initials: "SW",
      },
      action: "submitted",
      target: "expense report",
      time: "2 days ago",
      category: "expense",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sick-leave":
        return "bg-rose-500"
      case "education":
        return "bg-purple-500"
      case "travel":
        return "bg-sky-500"
      case "expense":
        return "bg-emerald-500"
      case "maintenance":
        return "bg-amber-500"
      case "asset":
        return "bg-teal-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="mt-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 group">
              <div className="relative mt-1">
                <Avatar className="h-8 w-8 border border-white shadow-sm">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback className={cn("text-white text-xs", getCategoryColor(activity.category))}>
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900">{activity.user.name}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
