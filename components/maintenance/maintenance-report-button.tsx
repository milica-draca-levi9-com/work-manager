"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MaintenanceForm } from "./maintenance-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

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

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-amber-500 hover:bg-amber-600">
        <Plus className="mr-2 h-4 w-4" />
        Report an Issue
      </Button>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setSuccessMessage(null)
            setAssignedPerson(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report Maintenance Issue</DialogTitle>
            <DialogDescription>Fill out the form below to report a maintenance issue.</DialogDescription>
          </DialogHeader>

          {successMessage ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
              {assignedPerson && (
                <AlertDescription className="mt-2">You can contact them at: {assignedPerson.email}</AlertDescription>
              )}
            </Alert>
          ) : (
            <MaintenanceForm onSuccess={handleSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
