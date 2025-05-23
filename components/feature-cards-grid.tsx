import { FeatureCard } from "@/components/feature-card"
import { Thermometer, GraduationCap, Plane, Wrench, Car, Receipt } from "lucide-react"

export function FeatureCardsGrid() {
  const features = [
    {
      title: "Sick Leave",
      description: "Submit your sick leave with just a few clicks and get some rest!",
      icon: Thermometer,
      href: "/sick-leave",
      color: "rose" as const,
    },
    {
      title: "Education & Social",
      description: "Learn something new or join team-building events",
      icon: GraduationCap,
      href: "/education-social",
      color: "purple" as const,
    },
    {
      title: "Corporate Travel",
      description: "Arrange flights and book your business trips",
      icon: Plane,
      href: "/corporate-travel",
      color: "sky" as const,
    },
    {
      title: "Expense Report",
      description: "Upload receipts and get reimbursed quickly",
      icon: Receipt,
      href: "/expense-report",
      color: "emerald" as const,
    },
    {
      title: "Maintenance Issues",
      description: "Report issues and let the fixers handle it",
      icon: Wrench,
      href: "/maintenance-issues",
      color: "amber" as const,
    },
    {
      title: "Asset Booking",
      description: "Book company cars, projectors, and more",
      icon: Car,
      href: "/asset-booking",
      color: "teal" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          href={feature.href}
          color={feature.color}
        />
      ))}
    </div>
  )
}
