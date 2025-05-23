import Link from "next/link"
import { ArrowLeft, Plane } from "lucide-react"
import { TravelManagement } from "@/components/travel/travel-management"

export default function CorporateTravelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-sky-100 p-3 rounded-lg text-sky-500">
            <Plane className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Corporate Travel</h1>
        </div>

        <TravelManagement />
      </div>
    </div>
  )
}
