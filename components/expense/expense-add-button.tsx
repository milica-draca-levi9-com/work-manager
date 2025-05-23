"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExpenseForm } from "./expense-form"

interface ExpenseAddButtonProps {
  onExpenseSubmitted: () => void
}

export function ExpenseAddButton({ onExpenseSubmitted }: ExpenseAddButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    onExpenseSubmitted()
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-500 hover:bg-emerald-600">
        <Plus className="mr-2 h-4 w-4" />
        Add Expense
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Expense Report</DialogTitle>
            <DialogDescription>Fill out the form below to submit a new expense report.</DialogDescription>
          </DialogHeader>
          <ExpenseForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
