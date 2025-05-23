import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetFilters } from '../asset-filters'

// Mock the UI components
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

describe('AssetFilters', () => {
  it('renders with initial value and handles changes', () => {
    const mockSetAssetTypeFilter = jest.fn()
    const { getByTestId } = render(
      <AssetFilters assetTypeFilter="all" setAssetTypeFilter={mockSetAssetTypeFilter} />
    )

    // Check if select is rendered with correct value
    const select = getByTestId('mock-select')
    expect(select).toHaveAttribute('data-value', 'all')

    // Check if placeholder is rendered
    const selectValue = getByTestId('mock-select-value')
    expect(selectValue).toHaveAttribute('data-placeholder', 'Filter by asset type')

    // Simulate value change
    fireEvent.click(select)
    expect(mockSetAssetTypeFilter).toHaveBeenCalledWith('Car')
  })
}) 