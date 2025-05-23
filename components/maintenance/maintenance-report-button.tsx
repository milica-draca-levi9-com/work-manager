"use client"

import { useState } from "react"
import { MaintenanceForm } from "./maintenance-form"

interface MaintenanceReportButtonProps {
  onIssueReported: () => void
}

export function MaintenanceReportButton({ onIssueReported }: MaintenanceReportButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [assignedPerson, setAssignedPerson] = useState<{ name: string; email: string } | null>(null)

  const handleSuccess = (person: { name: string; email: string } | null) => {
    setAssignedPerson(person)
    setSuccessMessage(
      person
        ? `Your issue has been reported and assigned to ${person.name}.`
        : "Your issue has been reported. A maintenance person will be assigned soon.",
    )

    // Close dialog and refresh data after 3 seconds
    setTimeout(() => {
      setIsDialogOpen(false)
      setSuccessMessage(null)
      setAssignedPerson(null)
      onIssueReported()
    }, 3000)
  }

  if (isDialogOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Report Maintenance Issue</h3>
            <p className="text-sm text-gray-500">Fill out the form below to report a maintenance issue.</p>
          </div>

          {successMessage ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-green-600">✓</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Success!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{successMessage}</p>
                    {assignedPerson && <p className="mt-2">You can contact them at: {assignedPerson.email}</p>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <MaintenanceForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsDialogOpen(true)}
      className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md flex items-center"
    >
      <span className="mr-2">+</span>
      Report an Issue
    </button>
  )
}
