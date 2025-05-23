import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Receipt } from "lucide-react"

export default function ExpenseReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-500">
            <Receipt className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Expense Report</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex justify-center items-center flex-col h-64">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m3-4h8m-4-4v8m0 0l3-3m-3 3l-3-3"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">This page is under construction</h2>
            <p className="text-gray-500 text-center max-w-md">
              The expense report submission system will be available soon. Check back later!
            </p>
          </div>
        </div>

        <Link href="/">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
