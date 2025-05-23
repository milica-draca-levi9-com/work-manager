import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import SickLeavePage from '../page'

// Mock components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">{children}</a>
  )
})

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="mock-arrow-left">Arrow Left</div>,
  Thermometer: () => <div data-testid="mock-thermometer-icon">Thermometer Icon</div>,
}))

jest.mock('@/components/sick-leave/sick-leave-management', () => ({
  SickLeaveManagement: () => <div data-testid="mock-sick-leave-management">Sick Leave Management</div>,
}))

describe('SickLeavePage', () => {
  it('renders the page with all components', () => {
    const { container, getByTestId, getByText } = render(<SickLeavePage />)

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
    expect(getByTestId('mock-thermometer-icon')).toBeInTheDocument()
    expect(getByText('Sick Leave')).toBeInTheDocument()

    // Check if SickLeaveManagement component is rendered
    expect(getByTestId('mock-sick-leave-management')).toBeInTheDocument()
  })
}) 