import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FeatureCardsGridFixed } from '../feature-cards-grid-fixed'

// Mock the FeatureCardWrapper component
jest.mock('@/components/feature-card-wrapper', () => ({
  FeatureCardWrapper: ({
    title,
    description,
    href,
    iconColor,
    bgColor,
    cardBgColor,
  }: any) => (
    <div
      data-testid="mock-feature-card"
      data-title={title}
      data-href={href}
      className={`${iconColor} ${bgColor} ${cardBgColor}`}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}))

describe('FeatureCardsGridFixed', () => {
  it('renders all feature cards with correct props', () => {
    const { getAllByTestId, getByText } = render(<FeatureCardsGridFixed />)

    const featureCards = getAllByTestId('mock-feature-card')
    expect(featureCards).toHaveLength(6)

    // Check if all titles are rendered
    expect(getByText('Sick Leave')).toBeInTheDocument()
    expect(getByText('Education & Social')).toBeInTheDocument()
    expect(getByText('Corporate Travel')).toBeInTheDocument()
    expect(getByText('Expense Report')).toBeInTheDocument()
    expect(getByText('Maintenance Issues')).toBeInTheDocument()
    expect(getByText('Asset Booking')).toBeInTheDocument()

    // Check if all descriptions are rendered
    expect(getByText('Submit your sick leave with just a few clicks and get some rest!')).toBeInTheDocument()
    expect(getByText('Learn something new or join team-building events')).toBeInTheDocument()
    expect(getByText('Arrange flights and book your business trips')).toBeInTheDocument()
    expect(getByText('Upload receipts and get reimbursed quickly')).toBeInTheDocument()
    expect(getByText('Report issues and let the fixers handle it')).toBeInTheDocument()
    expect(getByText('Book company cars, projectors, and more')).toBeInTheDocument()
  })

  it('renders cards with correct colors and links', () => {
    const { getAllByTestId } = render(<FeatureCardsGridFixed />)
    const featureCards = getAllByTestId('mock-feature-card')

    // Check first card (Sick Leave)
    expect(featureCards[0]).toHaveClass('text-rose-500', 'bg-rose-100', 'bg-rose-50')
    expect(featureCards[0]).toHaveAttribute('data-href', '/sick-leave')

    // Check second card (Education & Social)
    expect(featureCards[1]).toHaveClass('text-purple-500', 'bg-purple-100', 'bg-purple-50')
    expect(featureCards[1]).toHaveAttribute('data-href', '/education-social')

    // Check third card (Corporate Travel)
    expect(featureCards[2]).toHaveClass('text-sky-500', 'bg-sky-100', 'bg-sky-50')
    expect(featureCards[2]).toHaveAttribute('data-href', '/corporate-travel')

    // Check fourth card (Expense Report)
    expect(featureCards[3]).toHaveClass('text-emerald-500', 'bg-emerald-100', 'bg-emerald-50')
    expect(featureCards[3]).toHaveAttribute('data-href', '/expense-report')

    // Check fifth card (Maintenance Issues)
    expect(featureCards[4]).toHaveClass('text-amber-500', 'bg-amber-100', 'bg-amber-50')
    expect(featureCards[4]).toHaveAttribute('data-href', '/maintenance-issues')

    // Check sixth card (Asset Booking)
    expect(featureCards[5]).toHaveClass('text-teal-500', 'bg-teal-100', 'bg-teal-50')
    expect(featureCards[5]).toHaveAttribute('data-href', '/asset-booking')
  })

  it('renders with correct grid layout classes', () => {
    const { container } = render(<FeatureCardsGridFixed />)
    const gridContainer = container.firstChild as HTMLElement

    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'gap-6'
    )
  })
}) 