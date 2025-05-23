import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetForm } from '../asset-form'
import { createAssetBooking } from '@/lib/asset-actions'

// Import setup mocks
import './setup'

// Mock the asset actions
jest.mock('@/lib/asset-actions', () => ({
  createAssetBooking: jest.fn(),
}))

// Mock the UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled }: any) => (
    <button data-testid="mock-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}))

jest.mock('@/components/ui/label', () => ({
  Label: ({ children }: any) => <label data-testid="mock-label">{children}</label>,
}))

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="mock-select" data-value={value} onClick={() => onValueChange('Car')}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div data-testid="mock-select-trigger">{children}</div>,
  SelectValue: ({ children, placeholder }: any) => (
    <div data-testid="mock-select-value" data-placeholder={placeholder}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => <div data-testid="mock-select-content">{children}</div>,
  SelectItem: ({ children, value }: any) => (
    <div data-testid="mock-select-item" data-value={value}>
      {children}
    </div>
  ),
}))

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ selected, onSelect }: any) => (
    <div
      data-testid="mock-calendar"
      data-selected={selected?.toISOString()}
      onClick={() => onSelect(new Date('2024-03-15'))}
    >
      Calendar
    </div>
  ),
}))

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: any) => <div data-testid="mock-popover">{children}</div>,
  PopoverTrigger: ({ children }: any) => <div data-testid="mock-popover-trigger">{children}</div>,
  PopoverContent: ({ children }: any) => <div data-testid="mock-popover-content">{children}</div>,
}))

jest.mock('lucide-react', () => ({
  CalendarIcon: () => <div data-testid="mock-calendar-icon">Calendar Icon</div>,
  Loader2: () => <div data-testid="mock-loader-icon">Loader Icon</div>,
}))

describe('AssetForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form with all fields', () => {
    const { getByTestId, getByText } = render(<AssetForm onSuccess={() => {}} />)

    // Check if all form elements are rendered
    expect(getByText('Asset Type *')).toBeInTheDocument()
    expect(getByTestId('mock-select')).toBeInTheDocument()
    expect(getByText('Borrow Date *')).toBeInTheDocument()
    expect(getByText('Return Date *')).toBeInTheDocument()
    expect(getByText('Book Asset')).toBeInTheDocument()
  })

  it('handles asset type selection', () => {
    const { getByTestId } = render(<AssetForm onSuccess={() => {}} />)

    // Select asset type
    fireEvent.click(getByTestId('mock-select'))
    expect(getByTestId('mock-select')).toHaveAttribute('data-value', 'Car')
  })

  it('handles date selection', () => {
    const { getAllByTestId } = render(<AssetForm onSuccess={() => {}} />)

    // Select dates
    const calendars = getAllByTestId('mock-calendar')
    fireEvent.click(calendars[0]) // Borrow date
    fireEvent.click(calendars[1]) // Return date
  })

  it('handles form submission successfully', async () => {
    const mockOnSuccess = jest.fn()
    const mockCreateAssetBooking = createAssetBooking as jest.Mock

    mockCreateAssetBooking.mockResolvedValueOnce({ success: true })

    const { getByTestId, getByText, getAllByTestId } = render(<AssetForm onSuccess={mockOnSuccess} />)

    // Fill form
    fireEvent.click(getByTestId('mock-select')) // Select asset type
    const calendars = getAllByTestId('mock-calendar')
    fireEvent.click(calendars[0]) // Select borrow date
    fireEvent.click(calendars[1]) // Select return date

    // Submit form
    fireEvent.click(getByText('Book Asset'))

    await waitFor(() => {
      expect(mockCreateAssetBooking).toHaveBeenCalledWith({
        asset_type: 'Car',
        borrow_date: expect.any(String),
        return_date: expect.any(String),
      })
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('handles form submission error', async () => {
    const mockOnSuccess = jest.fn()
    const mockCreateAssetBooking = createAssetBooking as jest.Mock

    mockCreateAssetBooking.mockRejectedValueOnce(new Error('Submission failed'))

    const { getByTestId, getByText, findByText, getAllByTestId } = render(<AssetForm onSuccess={mockOnSuccess} />)

    // Fill form
    fireEvent.click(getByTestId('mock-select')) // Select asset type
    const calendars = getAllByTestId('mock-calendar')
    fireEvent.click(calendars[0]) // Select borrow date
    fireEvent.click(calendars[1]) // Select return date

    // Submit form
    fireEvent.click(getByText('Book Asset'))

    // Check error message
    expect(await findByText('Error submitting form: Submission failed')).toBeInTheDocument()
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })

  it('validates required fields', async () => {
    const { getByText, findByText } = render(<AssetForm onSuccess={() => {}} />)

    // Submit without filling required fields
    fireEvent.click(getByText('Book Asset'))

    // Check validation message
    expect(await findByText('Please fill in all required fields')).toBeInTheDocument()
  })

  it('validates date order', async () => {
    const { getByTestId, getByText, findByText, getAllByTestId } = render(<AssetForm onSuccess={() => {}} />)

    // Fill form with invalid dates
    fireEvent.click(getByTestId('mock-select')) // Select asset type
    const calendars = getAllByTestId('mock-calendar')
    fireEvent.click(calendars[1]) // Select return date first
    fireEvent.click(calendars[0]) // Select borrow date second

    // Submit form
    fireEvent.click(getByText('Book Asset'))

    // Check validation message
    expect(await findByText('Return date must be after borrow date')).toBeInTheDocument()
  })
}) 