"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SickLeaveForm } from "./sick-leave-form"

interface SickLeaveRequestButtonProps {
  onSickLeaveSubmitted: () => void
}

export function SickLeaveRequestButton({ onSickLeaveSubmitted }: SickLeaveRequestButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    onSickLeaveSubmitted()
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-rose-500 hover:bg-rose-600">
        <Plus className="mr-2 h-4 w-4" />
        Request Sick Leave
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Sick Leave</DialogTitle>
            <DialogDescription>Fill out the form below to submit a new sick leave request.</DialogDescription>
          </DialogHeader>
          <SickLeaveForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
