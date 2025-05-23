import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetTable } from '../asset-table'
import type { AssetType } from '@/lib/asset-api'

// Import setup mocks
import './setup'

// Mock the UI components
jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: any) => <table data-testid="mock-table">{children}</table>,
  TableHeader: ({ children }: any) => <thead data-testid="mock-table-header">{children}</thead>,
  TableBody: ({ children }: any) => <tbody data-testid="mock-table-body">{children}</tbody>,
  TableRow: ({ children }: any) => <tr data-testid="mock-table-row">{children}</tr>,
  TableHead: ({ children }: any) => <th data-testid="mock-table-head">{children}</th>,
  TableCell: ({ children, className }: any) => (
    <td data-testid="mock-table-cell" className={className}>
      {children}
    </td>
  ),
}))

jest.mock('lucide-react', () => ({
  Car: () => <div data-testid="mock-car-icon">Car Icon</div>,
  Volume2: () => <div data-testid="mock-speaker-icon">Speaker Icon</div>,
  Projector: () => <div data-testid="mock-projector-icon">Projector Icon</div>,
  Wifi: () => <div data-testid="mock-wifi-icon">Wifi Icon</div>,
  Bike: () => <div data-testid="mock-bike-icon">Bike Icon</div>,
  Tv: () => <div data-testid="mock-tv-icon">TV Icon</div>,
  Laptop: () => <div data-testid="mock-laptop-icon">Laptop Icon</div>,
  Smartphone: () => <div data-testid="mock-smartphone-icon">Smartphone Icon</div>,
}))

describe('AssetTable', () => {
  const mockAssets = [
    {
      id: '1',
      user_id: 'user1',
      asset_type: 'Car' as AssetType,
      borrow_date: '2024-03-01T00:00:00Z',
      return_date: '2024-03-05T00:00:00Z',
      created_at: '2024-02-29T00:00:00Z',
    },
    {
      id: '2',
      user_id: 'user1',
      asset_type: 'Speaker' as AssetType,
      borrow_date: '2024-03-10T00:00:00Z',
      return_date: '2024-03-15T00:00:00Z',
      created_at: '2024-03-09T00:00:00Z',
    },
  ]

  it('renders table with assets', () => {
    const { getByTestId, getAllByTestId } = render(
      <AssetTable assets={mockAssets} isLoading={false} />
    )

    // Check table structure
    expect(getByTestId('mock-table')).toBeInTheDocument()
    expect(getByTestId('mock-table-header')).toBeInTheDocument()
    expect(getByTestId('mock-table-body')).toBeInTheDocument()

    // Check header cells
    const headerCells = getAllByTestId('mock-table-head')
    expect(headerCells).toHaveLength(5)
    expect(headerCells[0]).toHaveTextContent('Asset Type')
    expect(headerCells[1]).toHaveTextContent('Borrow Date')
    expect(headerCells[2]).toHaveTextContent('Return Date')
    expect(headerCells[3]).toHaveTextContent('Duration')
    expect(headerCells[4]).toHaveTextContent('Created')

    // Check rows
    const rows = getAllByTestId('mock-table-row')
    expect(rows.length).toBeGreaterThan(1) // Header + data rows

    // Check icons
    expect(getByTestId('mock-car-icon')).toBeInTheDocument()
    expect(getByTestId('mock-speaker-icon')).toBeInTheDocument()
  })

  it('renders all asset type icons', () => {
    const allAssetTypes = [
      { ...mockAssets[0], id: '1', asset_type: 'Car' as AssetType },
      { ...mockAssets[0], id: '2', asset_type: 'Speaker' as AssetType },
      { ...mockAssets[0], id: '3', asset_type: 'Projector' as AssetType },
      { ...mockAssets[0], id: '4', asset_type: 'Wifi Router' as AssetType },
      { ...mockAssets[0], id: '5', asset_type: 'Bike' as AssetType },
      { ...mockAssets[0], id: '6', asset_type: 'TV' as AssetType },
      { ...mockAssets[0], id: '7', asset_type: 'Laptop' as AssetType },
      { ...mockAssets[0], id: '8', asset_type: 'Mobile phone' as AssetType },
    ]

    const { getByTestId } = render(
      <AssetTable assets={allAssetTypes} isLoading={false} />
    )

    // Check if all icons are rendered
    expect(getByTestId('mock-car-icon')).toBeInTheDocument()
    expect(getByTestId('mock-speaker-icon')).toBeInTheDocument()
    expect(getByTestId('mock-projector-icon')).toBeInTheDocument()
    expect(getByTestId('mock-wifi-icon')).toBeInTheDocument()
    expect(getByTestId('mock-bike-icon')).toBeInTheDocument()
    expect(getByTestId('mock-tv-icon')).toBeInTheDocument()
    expect(getByTestId('mock-laptop-icon')).toBeInTheDocument()
    expect(getByTestId('mock-smartphone-icon')).toBeInTheDocument()
  })

  it('handles loading state', () => {
    const { getByText } = render(
      <AssetTable assets={[]} isLoading={true} />
    )

    // When loading, show loading message
    expect(getByText('Loading asset bookings...')).toBeInTheDocument()
  })

  it('handles empty assets array', () => {
    const { getByText } = render(
      <AssetTable assets={[]} isLoading={false} />
    )

    // When empty, show empty message
    expect(getByText('No asset bookings found. Create a new booking using the button above.')).toBeInTheDocument()
  })
}) 