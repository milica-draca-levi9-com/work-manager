"use client"

import { useState, useEffect } from "react"
import { SickLeaveTable } from "./sick-leave-table"
import { SickLeaveFilters } from "./sick-leave-filters"
import { SickLeaveRequestButton } from "./sick-leave-request-button"
import { getSickLeaveRequests } from "@/lib/sick-leave-api"
import type { SickLeave } from "@/lib/supabase"

export function SickLeaveManagement() {
  const [sickLeaves, setSickLeaves] = useState<SickLeave[]>([])
  const [filteredLeaves, setFilteredLeaves] = useState<SickLeave[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Fetch sick leave data
  const fetchSickLeaves = async () => {
    setIsLoading(true)
    try {
      const data = await getSickLeaveRequests()
      setSickLeaves(data)
      setFilteredLeaves(data)
    } catch (error) {
      console.error("Error fetching sick leaves:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchSickLeaves()
  }, [])

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let filtered = sickLeaves

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((leave) => leave.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((leave) => leave.reason.toLowerCase().includes(term))
    }

    setFilteredLeaves(filtered)
  }, [searchTerm, statusFilter, sickLeaves])

  // Handle successful submission of a new sick leave request
  const handleSickLeaveSubmitted = () => {
    fetchSickLeaves()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SickLeaveFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <SickLeaveRequestButton onSickLeaveSubmitted={handleSickLeaveSubmitted} />
      </div>

      <SickLeaveTable sickLeaves={filteredLeaves} isLoading={isLoading} />
    </div>
  )
}
