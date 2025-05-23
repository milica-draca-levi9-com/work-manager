import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plane, AlertTriangle } from "lucide-react"

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

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex justify-center items-center flex-col h-64">
            <div className="text-amber-500 mb-4">
              <AlertTriangle className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Not Eligible for Travel Requests</h2>
            <p className="text-gray-500 text-center max-w-md">
              You are currently not eligible to make any travel requests. This could be due to your position, department
              policy, or other organizational restrictions.
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-600">
                If you believe this is an error or need to request travel for business purposes, please contact your
                manager or the HR department.
              </p>
            </div>
          </div>
        </div>

        <Link href="/">
          <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
