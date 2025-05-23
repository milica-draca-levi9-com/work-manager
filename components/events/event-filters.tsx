"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface EventFiltersProps {
  selectedType: string
  showAttendingOnly: boolean
  onTypeChange: (type: string) => void
  onAttendingToggle: (attending: boolean) => void
  eventCount: number
}

export function EventFilters({
  selectedType,
  showAttendingOnly,
  onTypeChange,
  onAttendingToggle,
  eventCount,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <label htmlFor="type-filter" className="text-sm font-medium text-gray-700">
          Filter by type:
        </label>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Education">
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span>Education</span>
              </div>
            </SelectItem>
            <SelectItem value="Social">
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span>Social</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="attending-filter" checked={showAttendingOnly} onCheckedChange={onAttendingToggle} />
        <Label htmlFor="attending-filter" className="text-sm font-medium text-gray-700">
          Show only events I'm attending
        </Label>
      </div>

      <div className="ml-auto text-sm text-gray-500">
        Showing {eventCount} event{eventCount !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
