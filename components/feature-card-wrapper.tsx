import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardWrapperProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  iconColor: string
  bgColor: string
  hoverBgColor: string
  hoverTextColor: string
  cardBgColor?: string // Added optional cardBgColor prop
}

export function FeatureCardWrapper({
  title,
  description,
  icon: Icon,
  href,
  iconColor,
  bgColor,
  hoverBgColor,
  hoverTextColor,
  cardBgColor,
}: FeatureCardWrapperProps) {
  return (
    <Link href={href} className="group">
      <Card
        className={cn(
          "h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden",
          cardBgColor || "bg-gradient-to-br from-white to-gray-50", // Use cardBgColor if provided, otherwise use the default gradient
        )}
      >
        <CardContent className="p-6 flex flex-col items-center md:items-start text-center md:text-left h-full relative">
          <div
            className={cn(
              "p-3 rounded-lg mb-4 transition-colors",
              bgColor,
              iconColor,
              `group-hover:${hoverBgColor} group-hover:${hoverTextColor}`,
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-2 text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
