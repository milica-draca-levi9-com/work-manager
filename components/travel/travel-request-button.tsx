"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TravelForm } from "./travel-form"

interface TravelRequestButtonProps {
  onTravelRequested: () => void
}

export function TravelRequestButton({ onTravelRequested }: TravelRequestButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSuccess = () => {
    setIsOpen(false)
    onTravelRequested()
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700">
        Request Travel
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Request Travel</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <TravelForm onSuccess={handleSuccess} onCancel={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
