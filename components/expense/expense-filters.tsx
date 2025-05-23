"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface ExpenseFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
}

export function ExpenseFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: ExpenseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by description..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-40">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
