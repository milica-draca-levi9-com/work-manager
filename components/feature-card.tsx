import React from 'react'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: "rose" | "purple" | "sky" | "emerald" | "amber" | "teal"
}

export function FeatureCard({ title, description, icon: Icon, href, color }: FeatureCardProps) {
  return (
    <Link href={href} className="group">
      <Card
        className={`h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-gradient-to-br from-white to-${color}-50`}
      >
        <CardContent className="p-6 flex flex-col items-center md:items-start text-center md:text-left h-full relative">
          <div
            className={`bg-${color}-100 p-3 rounded-lg mb-4 text-${color}-500 group-hover:bg-${color}-500 group-hover:text-white transition-colors`}
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
