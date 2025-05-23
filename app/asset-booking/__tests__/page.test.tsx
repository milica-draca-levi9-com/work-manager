import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AssetBookingPage from '../page'

// Mock the components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">{children}</a>
  )
})

jest.mock('@/components/asset/asset-management', () => ({
  AssetManagement: () => <div data-testid="mock-asset-management">Asset Management</div>,
}))

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="mock-arrow-left">Arrow Left</div>,
  Car: () => <div data-testid="mock-car-icon">Car Icon</div>,
}))

describe('AssetBookingPage', () => {
  it('renders the page with all components', () => {
    const { container, getByTestId, getByText } = render(<AssetBookingPage />)

    // Check container classes
    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-b', 'from-gray-50', 'to-gray-100')

    // Check inner container
    const innerContainer = mainContainer.firstChild as HTMLElement
    expect(innerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'py-8')

    // Check back link
    const backLink = getByTestId('mock-link')
    expect(backLink).toHaveAttribute('href', '/')
    expect(backLink).toHaveTextContent('Back to Dashboard')

    // Check header section
    expect(getByTestId('mock-car-icon')).toBeInTheDocument()
    expect(getByText('Internal Asset Booking')).toBeInTheDocument()

    // Check if AssetManagement component is rendered
    expect(getByTestId('mock-asset-management')).toBeInTheDocument()
  })
}) 