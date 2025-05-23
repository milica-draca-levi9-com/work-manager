import React from 'react'
import Link from "next/link"
import { ArrowLeft, Receipt } from "lucide-react"
import { ExpenseManagement } from "@/components/expense/expense-management"

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

        <ExpenseManagement />
      </div>
    </div>
  )
}
