"use client"

import { useState, useEffect } from "react"
import { MaintenanceTable } from "./maintenance-table"
import { MaintenanceFilters } from "./maintenance-filters"
import { MaintenanceReportButton } from "./maintenance-report-button"
import { getMaintenanceIssues } from "@/lib/maintenance-api"
import type { MaintenanceIssue } from "@/lib/maintenance-api"

export function MaintenanceManagement() {
  const [issues, setIssues] = useState<MaintenanceIssue[]>([])
  const [filteredIssues, setFilteredIssues] = useState<MaintenanceIssue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>("all")

  // Fetch maintenance issues
  const fetchIssues = async () => {
    setIsLoading(true)
    try {
      const data = await getMaintenanceIssues()
      setIssues(data)
      setFilteredIssues(data)
    } catch (error) {
      console.error("Error fetching maintenance issues:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchIssues()
  }, [])

  // Apply filters when issue type filter changes
  useEffect(() => {
    let filtered = issues

    // Apply issue type filter
    if (issueTypeFilter !== "all") {
      filtered = filtered.filter((issue) => issue.issue_type === issueTypeFilter)
    }

    setFilteredIssues(filtered)
  }, [issueTypeFilter, issues])

  // Handle successful submission of a new maintenance issue
  const handleIssueReported = () => {
    fetchIssues()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <MaintenanceFilters issueTypeFilter={issueTypeFilter} setIssueTypeFilter={setIssueTypeFilter} />
        <MaintenanceReportButton onIssueReported={handleIssueReported} />
      </div>

      <MaintenanceTable issues={filteredIssues} isLoading={isLoading} />
    </div>
  )
}
