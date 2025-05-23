import type { MaintenanceIssue, IssueType } from "@/lib/maintenance-api"

interface MaintenanceTableProps {
  issues: MaintenanceIssue[]
  isLoading: boolean
}

export function MaintenanceTable({ issues, isLoading }: MaintenanceTableProps) {
  // Function to get emoji for issue type
  const getIssueEmoji = (issueType: IssueType): string => {
    switch (issueType) {
      case "Equipment issue":
        return "🖥️"
      case "Building maintenance":
        return "🏢"
      default:
        return "🔧"
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
    let bgColor = "bg-gray-50"
    let textColor = "text-gray-700"
    let borderColor = "border-gray-200"

    switch (status) {
      case "Open":
        bgColor = "bg-yellow-50"
        textColor = "text-yellow-700"
        borderColor = "border-yellow-200"
        break
      case "In Progress":
        bgColor = "bg-blue-50"
        textColor = "text-blue-700"
        borderColor = "border-blue-200"
        break
      case "Resolved":
        bgColor = "bg-green-50"
        textColor = "text-green-700"
        borderColor = "border-green-200"
        break
      case "Closed":
        bgColor = "bg-gray-50"
        textColor = "text-gray-700"
        borderColor = "border-gray-200"
        break
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} border ${borderColor}`}
      >
        {status}
      </span>
    )
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issue Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(issue.date)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="mr-2">{getIssueEmoji(issue.issue_type)}</span>
                  <span className="text-sm font-medium text-gray-900">{issue.issue_type}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{issue.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {issue.assigned_person ? (
                  <span className="font-medium">{issue.assigned_person.name}</span>
                ) : (
                  <span className="text-gray-400">Not assigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderStatusBadge(issue.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
