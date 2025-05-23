import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../alert-dialog'

describe('AlertDialog', () => {
  beforeAll(() => {
    // Suppress console warnings about accessibility
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('renders trigger button and opens dialog when clicked', async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    const triggerButton = screen.getByRole('button', { name: /open dialog/i })
    expect(triggerButton).toBeInTheDocument()

    // Dialog should be initially closed
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

    // Click the trigger button
    fireEvent.click(triggerButton)

    // Wait for dialog to be in the document
    await waitFor(() => {
      const dialog = screen.getByRole('alertdialog')
      expect(dialog).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /are you sure\?/i })).toBeInTheDocument()
      expect(screen.getByText(/this action cannot be undone\./i)).toBeInTheDocument()
    })
  })

  it('closes when cancel button is clicked', async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /open dialog/i })
    fireEvent.click(triggerButton)

    // Wait for dialog to be in the document
    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    // Wait for dialog to be removed
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  })

  it('calls onAction when action button is clicked', async () => {
    const handleAction = jest.fn()
    
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /open dialog/i })
    fireEvent.click(triggerButton)
    
    // Wait for dialog to be in the document
    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })
    
    // Click the action button
    const actionButton = screen.getByRole('button', { name: /continue/i })
    fireEvent.click(actionButton)
    
    expect(handleAction).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  })
}) 