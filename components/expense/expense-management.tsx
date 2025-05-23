"use client"

import { useState, useEffect } from "react"
import { ExpenseTable } from "./expense-table"
import { ExpenseFilters } from "./expense-filters"
import { ExpenseAddButton } from "./expense-add-button"
import { getExpenseReports } from "@/lib/expense-api"
import type { ExpenseReport } from "@/lib/expense-api"

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<ExpenseReport[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Fetch expense data
  const fetchExpenses = async () => {
    setIsLoading(true)
    try {
      const data = await getExpenseReports()
      setExpenses(data)
      setFilteredExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchExpenses()
  }, [])

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let filtered = expenses

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((expense) => expense.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((expense) => expense.description.toLowerCase().includes(term))
    }

    setFilteredExpenses(filtered)
  }, [searchTerm, statusFilter, expenses])

  // Handle successful submission of a new expense report
  const handleExpenseSubmitted = () => {
    fetchExpenses()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <ExpenseFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ExpenseAddButton onExpenseSubmitted={handleExpenseSubmitted} />
      </div>

      <ExpenseTable expenses={filteredExpenses} isLoading={isLoading} />
    </div>
  )
}
