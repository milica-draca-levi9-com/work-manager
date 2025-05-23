import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetBookButton } from '../asset-book-button'

// Import setup mocks
import './setup'

// Mock the UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }: any) => (
    <button data-testid="mock-button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}))

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div data-testid="mock-dialog" data-open={open} onClick={() => onOpenChange(false)}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: any) => <div data-testid="mock-dialog-content">{children}</div>,
  DialogHeader: ({ children }: any) => <div data-testid="mock-dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => <div data-testid="mock-dialog-title">{children}</div>,
  DialogDescription: ({ children }: any) => <div data-testid="mock-dialog-description">{children}</div>,
}))

jest.mock('lucide-react', () => ({
  Plus: () => <div data-testid="mock-plus-icon">Plus Icon</div>,
}))

jest.mock('../asset-form', () => ({
  AssetForm: ({ onSuccess }: any) => (
    <button data-testid="mock-asset-form" onClick={onSuccess}>
      Mock Asset Form
    </button>
  ),
}))

describe('AssetBookButton', () => {
  it('renders button and handles dialog open/close', () => {
    const mockOnAssetBooked = jest.fn()
    const { getByTestId, getByRole } = render(
      <AssetBookButton onAssetBooked={mockOnAssetBooked} />
    )

    // Check if button is rendered with correct content
    const button = getByRole('button', { name: /book asset/i })
    expect(button).toBeInTheDocument()
    expect(getByTestId('mock-plus-icon')).toBeInTheDocument()
    expect(button).toHaveTextContent('Book Asset')

    // Open dialog
    fireEvent.click(button)
    const dialog = getByTestId('mock-dialog')
    expect(dialog).toHaveAttribute('data-open', 'true')

    // Check dialog content
    expect(getByTestId('mock-dialog-content')).toBeInTheDocument()
    expect(getByTestId('mock-dialog-header')).toBeInTheDocument()
    expect(getByTestId('mock-dialog-title')).toHaveTextContent('Book Asset')
    expect(getByTestId('mock-dialog-description')).toHaveTextContent('Fill out the form below to book an asset for your use.')

    // Close dialog and check if it's closed
    fireEvent.click(dialog)
    expect(dialog).toHaveAttribute('data-open', 'false')
  })

  it('handles successful asset booking', () => {
    const mockOnAssetBooked = jest.fn()
    const { getByTestId } = render(
      <AssetBookButton onAssetBooked={mockOnAssetBooked} />
    )

    // Open dialog
    fireEvent.click(getByTestId('mock-button'))

    // Submit form
    fireEvent.click(getByTestId('mock-asset-form'))

    // Check if dialog is closed and callback is called
    expect(getByTestId('mock-dialog')).toHaveAttribute('data-open', 'false')
    expect(mockOnAssetBooked).toHaveBeenCalled()
  })
}) 