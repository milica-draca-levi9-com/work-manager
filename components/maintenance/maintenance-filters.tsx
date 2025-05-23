"use client"

import { ISSUE_TYPES } from "@/lib/maintenance-api"

interface MaintenanceFiltersProps {
  issueTypeFilter: string
  setIssueTypeFilter: (issueType: string) => void
}

export function MaintenanceFilters({ issueTypeFilter, setIssueTypeFilter }: MaintenanceFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="w-full sm:w-64">
        <select
          value={issueTypeFilter}
          onChange={(e) => setIssueTypeFilter(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
        >
          <option value="all">All Issue Types</option>
          {ISSUE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
