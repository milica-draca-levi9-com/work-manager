"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AssetForm } from "./asset-form"

interface AssetBookButtonProps {
  onAssetBooked: () => void
}

export function AssetBookButton({ onAssetBooked }: AssetBookButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    onAssetBooked()
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600">
        <Plus className="mr-2 h-4 w-4" />
        Book Asset
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Asset</DialogTitle>
            <DialogDescription>Fill out the form below to book an asset for your use.</DialogDescription>
          </DialogHeader>
          <AssetForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
