import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetManagement } from '../asset-management'
import { getAssetBookings } from '@/lib/asset-api'

// Import setup mocks
import './setup'

// Mock the asset API
jest.mock('@/lib/asset-api', () => ({
  getAssetBookings: jest.fn(),
}))

// Mock child components
jest.mock('../asset-filters', () => ({
  AssetFilters: ({ assetTypeFilter, setAssetTypeFilter }: any) => (
    <div data-testid="mock-asset-filters">
      <select
        data-testid="mock-filter-select"
        value={assetTypeFilter}
        onChange={(e) => setAssetTypeFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Car">Car</option>
      </select>
    </div>
  ),
}))

jest.mock('../asset-book-button', () => ({
  AssetBookButton: ({ onAssetBooked }: any) => (
    <button data-testid="mock-book-button" onClick={onAssetBooked}>
      Book Asset
    </button>
  ),
}))

jest.mock('../asset-table', () => ({
  AssetTable: ({ assets, isLoading }: any) => (
    <div data-testid="mock-asset-table" data-loading={isLoading}>
      {assets.map((asset: any) => (
        <div key={asset.id} data-testid="asset-row">
          {asset.asset_type}
        </div>
      ))}
    </div>
  ),
}))

describe('AssetManagement', () => {
  const mockAssets = [
    { id: 1, asset_type: 'Car', borrow_date: '2024-03-15', return_date: '2024-03-16' },
    { id: 2, asset_type: 'Laptop', borrow_date: '2024-03-17', return_date: '2024-03-18' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all components and fetches initial data', async () => {
    const mockGetAssetBookings = getAssetBookings as jest.Mock
    mockGetAssetBookings.mockResolvedValueOnce(mockAssets)

    const { getByTestId, getAllByTestId } = render(<AssetManagement />)

    // Check if components are rendered
    expect(getByTestId('mock-asset-filters')).toBeInTheDocument()
    expect(getByTestId('mock-book-button')).toBeInTheDocument()
    expect(getByTestId('mock-asset-table')).toBeInTheDocument()

    // Check loading state
    expect(getByTestId('mock-asset-table')).toHaveAttribute('data-loading', 'true')

    // Wait for data to load
    await waitFor(() => {
      expect(getByTestId('mock-asset-table')).toHaveAttribute('data-loading', 'false')
    })

    // Check if assets are displayed
    const assetRows = getAllByTestId('asset-row')
    expect(assetRows).toHaveLength(2)
    expect(assetRows[0]).toHaveTextContent('Car')
    expect(assetRows[1]).toHaveTextContent('Laptop')
  })

  it('handles asset type filtering', async () => {
    const mockGetAssetBookings = getAssetBookings as jest.Mock
    mockGetAssetBookings.mockResolvedValueOnce(mockAssets)

    const { getByTestId, getAllByTestId } = render(<AssetManagement />)

    // Wait for initial data load
    await waitFor(() => {
      expect(getByTestId('mock-asset-table')).toHaveAttribute('data-loading', 'false')
    })

    // Change filter to 'Car'
    fireEvent.change(getByTestId('mock-filter-select'), { target: { value: 'Car' } })

    // Check if only Car assets are displayed
    const assetRows = getAllByTestId('asset-row')
    expect(assetRows).toHaveLength(1)
    expect(assetRows[0]).toHaveTextContent('Car')
  })

  it('handles error when fetching assets', async () => {
    const mockGetAssetBookings = getAssetBookings as jest.Mock
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockGetAssetBookings.mockRejectedValueOnce(new Error('Failed to fetch'))

    const { getByTestId } = render(<AssetManagement />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(getByTestId('mock-asset-table')).toHaveAttribute('data-loading', 'false')
    })

    // Check if error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching assets:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })

  it('refreshes data when new asset is booked', async () => {
    const mockGetAssetBookings = getAssetBookings as jest.Mock
    mockGetAssetBookings
      .mockResolvedValueOnce(mockAssets)
      .mockResolvedValueOnce([...mockAssets, { id: 3, asset_type: 'Speaker' }])

    const { getByTestId, getAllByTestId } = render(<AssetManagement />)

    // Wait for initial data load
    await waitFor(() => {
      expect(getByTestId('mock-asset-table')).toHaveAttribute('data-loading', 'false')
    })

    // Initial check
    expect(getAllByTestId('asset-row')).toHaveLength(2)

    // Trigger new asset booked
    fireEvent.click(getByTestId('mock-book-button'))

    // Wait for refresh
    await waitFor(() => {
      const assetRows = getAllByTestId('asset-row')
      expect(assetRows).toHaveLength(3)
      expect(assetRows[2]).toHaveTextContent('Speaker')
    })
  })
}) 