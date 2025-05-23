import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Cpu, Building } from "lucide-react"
import type { MaintenanceIssue, IssueType } from "@/lib/maintenance-api"

interface MaintenanceTableProps {
  issues: MaintenanceIssue[]
  isLoading: boolean
}

export function MaintenanceTable({ issues, isLoading }: MaintenanceTableProps) {
  // Function to get icon for issue type
  const getIssueIcon = (issueType: IssueType) => {
    const iconProps = { className: "h-5 w-5" }

    switch (issueType) {
      case "Equipment issue":
        return <Cpu {...iconProps} className="h-5 w-5 text-blue-600" />
      case "Building maintenance":
        return <Building {...iconProps} className="h-5 w-5 text-amber-600" />
      default:
        return <Cpu {...iconProps} />
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Open
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      case "Closed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading maintenance issues...</div>
  }

  if (issues.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No maintenance issues found. Report a new issue using the button above.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Issue Type</TableHead>
            <TableHead className="w-1/3">Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{formatDate(issue.date)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {getIssueIcon(issue.issue_type)}
                  <span>{issue.issue_type}</span>
                </div>
              </TableCell>
              <TableCell>{issue.description}</TableCell>
              <TableCell>{issue.location}</TableCell>
              <TableCell>
                {issue.assigned_person ? (
                  <span className="text-sm font-medium">{issue.assigned_person.name}</span>
                ) : (
                  <span className="text-sm text-gray-400">Not assigned</span>
                )}
              </TableCell>
              <TableCell>{renderStatusBadge(issue.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
