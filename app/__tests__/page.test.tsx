import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from '../page'

// Mock all imported components
jest.mock('@/components/header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}))

jest.mock('@/components/welcome-section', () => ({
  WelcomeSection: () => <div data-testid="mock-welcome">Welcome Section</div>,
}))

jest.mock('@/components/feature-cards-grid-fixed', () => ({
  FeatureCardsGridFixed: () => <div data-testid="mock-features">Feature Cards</div>,
}))

jest.mock('@/components/stats-grid-fixed', () => ({
  StatsGridFixed: () => <div data-testid="mock-stats">Stats Grid</div>,
}))

describe('Dashboard', () => {
  it('renders all dashboard components', () => {
    const { getByTestId, container } = render(<Dashboard />)

    // Check if the main container has the correct classes
    const mainContainer = container.querySelector('div')
    expect(mainContainer).toHaveClass('min-h-screen')

    // Check if main element has the correct classes
    const mainElement = container.querySelector('main')
    expect(mainElement).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'py-8')

    // Check if all components are rendered
    expect(getByTestId('mock-header')).toBeInTheDocument()
    expect(getByTestId('mock-welcome')).toBeInTheDocument()
    expect(getByTestId('mock-features')).toBeInTheDocument()
    expect(getByTestId('mock-stats')).toBeInTheDocument()

    // Check the order of components
    const mainContent = mainElement?.innerHTML || ''
    expect(mainContent.indexOf('Welcome Section')).toBeLessThan(mainContent.indexOf('Feature Cards'))
    expect(mainContent.indexOf('Feature Cards')).toBeLessThan(mainContent.indexOf('Stats Grid'))
  })
}) 