import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { ExpenseReport } from "@/lib/expense-api"

interface ExpenseTableProps {
  expenses: ExpenseReport[]
  isLoading: boolean
}

export function ExpenseTable({ expenses, isLoading }: ExpenseTableProps) {
  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "Rejected":
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
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading expense reports...</div>
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No expense reports found. Create a new report using the button above.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Attachment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{formatDate(expense.purchase_date)}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{formatCurrency(expense.amount)}</TableCell>
              <TableCell>
                {expense.attachment_filename ? (
                  <span className="text-sm text-blue-600">{expense.attachment_filename}</span>
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </TableCell>
              <TableCell>{renderStatusBadge(expense.status)}</TableCell>
              <TableCell>{formatDate(expense.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
