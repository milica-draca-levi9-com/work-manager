"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ISSUE_TYPES } from "@/lib/maintenance-api"

interface MaintenanceFiltersProps {
  issueTypeFilter: string
  setIssueTypeFilter: (issueType: string) => void
}

export function MaintenanceFilters({ issueTypeFilter, setIssueTypeFilter }: MaintenanceFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="w-full sm:w-64">
        <Select value={issueTypeFilter} onValueChange={setIssueTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by issue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issue Types</SelectItem>
            {ISSUE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
