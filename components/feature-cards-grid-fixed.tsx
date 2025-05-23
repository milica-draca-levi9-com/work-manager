import { FeatureCardWrapper } from "@/components/feature-card-wrapper"
import { Thermometer, GraduationCap, Plane, Wrench, Car, Receipt } from "lucide-react"

export function FeatureCardsGridFixed() {
  const features = [
    {
      title: "Sick Leave",
      description: "Submit your sick leave with just a few clicks and get some rest!",
      icon: Thermometer,
      href: "/sick-leave",
      iconColor: "text-rose-500",
      bgColor: "bg-rose-100",
      hoverBgColor: "bg-rose-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-rose-50", // Added background color
    },
    {
      title: "Education & Social",
      description: "Learn something new or join team-building events",
      icon: GraduationCap,
      href: "/education-social",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100",
      hoverBgColor: "bg-purple-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-purple-50", // Added background color
    },
    {
      title: "Corporate Travel",
      description: "Arrange flights and book your business trips",
      icon: Plane,
      href: "/corporate-travel",
      iconColor: "text-sky-500",
      bgColor: "bg-sky-100",
      hoverBgColor: "bg-sky-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-sky-50", // Added background color
    },
    {
      title: "Expense Report",
      description: "Upload receipts and get reimbursed quickly",
      icon: Receipt,
      href: "/expense-report",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-100",
      hoverBgColor: "bg-emerald-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-emerald-50", // Added background color
    },
    {
      title: "Maintenance Issues",
      description: "Report issues and let the fixers handle it",
      icon: Wrench,
      href: "/maintenance-issues",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-100",
      hoverBgColor: "bg-amber-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-amber-50", // Added background color
    },
    {
      title: "Asset Booking",
      description: "Book company cars, projectors, and more",
      icon: Car,
      href: "/asset-booking",
      iconColor: "text-teal-500",
      bgColor: "bg-teal-100",
      hoverBgColor: "bg-teal-500",
      hoverTextColor: "text-white",
      cardBgColor: "bg-teal-50", // Added background color
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCardWrapper
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          href={feature.href}
          iconColor={feature.iconColor}
          bgColor={feature.bgColor}
          hoverBgColor={feature.hoverBgColor}
          hoverTextColor={feature.hoverTextColor}
          cardBgColor={feature.cardBgColor} // Pass the cardBgColor prop
        />
      ))}
    </div>
  )
}
