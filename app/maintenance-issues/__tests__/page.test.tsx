import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MaintenanceIssuesPage from '../page'

// Mock components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">{children}</a>
  )
})

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="mock-arrow-left">Arrow Left</div>,
  Wrench: () => <div data-testid="mock-wrench-icon">Wrench Icon</div>,
}))

jest.mock('@/components/maintenance/maintenance-management', () => ({
  MaintenanceManagement: () => <div data-testid="mock-maintenance-management">Maintenance Management</div>,
}))

describe('MaintenanceIssuesPage', () => {
  it('renders the page with all components', () => {
    const { container, getByTestId, getByText } = render(<MaintenanceIssuesPage />)

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
    expect(getByTestId('mock-wrench-icon')).toBeInTheDocument()
    expect(getByText('Maintenance Issues')).toBeInTheDocument()

    // Check if MaintenanceManagement component is rendered
    expect(getByTestId('mock-maintenance-management')).toBeInTheDocument()
  })
}) 