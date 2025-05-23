import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { SickLeave } from "@/lib/supabase"
import { ImageIcon } from "lucide-react"

interface SickLeaveTableProps {
  sickLeaves: SickLeave[]
  isLoading: boolean
}

export function SickLeaveTable({ sickLeaves, isLoading }: SickLeaveTableProps) {
  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error) {
      return dateString
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading sick leave requests...</div>
  }

  if (sickLeaves.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No sick leave requests found. Create a new request using the button above.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="w-1/3">Reason</TableHead>
            <TableHead>Attachment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sickLeaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{formatDate(leave.start_date)}</TableCell>
              <TableCell>{formatDate(leave.end_date)}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                {leave.attachment_filename ? (
                  <span className="text-sm text-blue-600">
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </TableCell>
              <TableCell>{renderStatusBadge(leave.status)}</TableCell>
              <TableCell>{formatDate(leave.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
