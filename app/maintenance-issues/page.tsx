import Link from "next/link"
import { MaintenanceManagement } from "@/components/maintenance/maintenance-management"

export default function MaintenanceIssuesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
          <span className="mr-2">←</span>
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-500">
            <span className="text-xl">🔧</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Issues</h1>
        </div>

        <MaintenanceManagement />
      </div>
    </div>
  )
}
