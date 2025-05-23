import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CorporateTravelPage from '../page'

// Mock components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">{children}</a>
  )
})

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className} data-testid="mock-button">{children}</button>
  ),
}))

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="mock-arrow-left">Arrow Left</div>,
  Plane: () => <div data-testid="mock-plane-icon">Plane Icon</div>,
  AlertTriangle: () => <div data-testid="mock-alert-triangle">Alert Triangle</div>,
}))

describe('CorporateTravelPage', () => {
  it('renders the page with all components', () => {
    const { container, getByTestId, getByText } = render(<CorporateTravelPage />)

    // Check container classes
    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-b', 'from-gray-50', 'to-gray-100')

    // Check inner container
    const innerContainer = mainContainer.firstChild as HTMLElement
    expect(innerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'py-8')

    // Check back link
    const backLinks = container.querySelectorAll('[data-testid="mock-link"]')
    expect(backLinks[0]).toHaveAttribute('href', '/')
    expect(backLinks[0]).toHaveTextContent('Back to Dashboard')

    // Check header section
    expect(getByTestId('mock-plane-icon')).toBeInTheDocument()
    expect(getByText('Corporate Travel')).toBeInTheDocument()

    // Check alert message
    expect(getByTestId('mock-alert-triangle')).toBeInTheDocument()
    expect(getByText('Not Eligible for Travel Requests')).toBeInTheDocument()
    expect(getByText(/You are currently not eligible/)).toBeInTheDocument()
    expect(getByText(/If you believe this is an error/)).toBeInTheDocument()

    // Check return button
    const returnButton = getByTestId('mock-button')
    expect(returnButton).toHaveClass('bg-sky-500', 'hover:bg-sky-600')
    expect(returnButton).toHaveTextContent('Return to Dashboard')
  })
}) 