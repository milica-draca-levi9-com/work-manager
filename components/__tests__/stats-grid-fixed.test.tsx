import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatsGridFixed } from '../stats-grid-fixed'

// Mock the components
jest.mock('@/components/sick-leave-stats', () => ({
  SickLeaveStats: () => <div data-testid="mock-sick-leave-stats">Sick Leave Stats</div>,
}))

jest.mock('@/components/expense-stats', () => ({
  ExpenseStats: () => <div data-testid="mock-expense-stats">Expense Stats</div>,
}))

jest.mock('@/components/stats-card-wrapper', () => ({
  StatsCardWrapper: ({ title, value, icon: Icon, bgColor, iconColor }: any) => (
    <div
      data-testid="mock-stats-card"
      data-title={title}
      className={`${bgColor} ${iconColor}`}
    >
      <span>{title}</span>
      <span>{value}</span>
      <Icon />
    </div>
  ),
}))

jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="mock-graduation-icon">Graduation Icon</div>,
  Plane: () => <div data-testid="mock-plane-icon">Plane Icon</div>,
}))

describe('StatsGridFixed', () => {
  it('renders all stats components', () => {
    const { getByTestId, getAllByTestId } = render(<StatsGridFixed />)

    // Check if SickLeaveStats is rendered
    expect(getByTestId('mock-sick-leave-stats')).toBeInTheDocument()

    // Check if ExpenseStats is rendered
    expect(getByTestId('mock-expense-stats')).toBeInTheDocument()

    // Check if other stats cards are rendered
    const statsCards = getAllByTestId('mock-stats-card')
    expect(statsCards).toHaveLength(2)

    // Check first stats card (Upcoming Events)
    expect(statsCards[0]).toHaveAttribute('data-title', 'Upcoming Events')
    expect(statsCards[0]).toHaveClass('bg-purple-100', 'text-purple-500')

    // Check second stats card (Planned Trips)
    expect(statsCards[1]).toHaveAttribute('data-title', 'Planned Trips')
    expect(statsCards[1]).toHaveClass('bg-sky-100', 'text-sky-500')
  })

  it('renders with correct grid layout classes', () => {
    const { container } = render(<StatsGridFixed />)
    const gridContainer = container.firstChild as HTMLElement

    expect(gridContainer).toHaveClass(
      'mt-12',
      'grid',
      'grid-cols-1',
      'md:grid-cols-4',
      'gap-4'
    )
  })

  it('renders icons correctly', () => {
    const { getAllByTestId } = render(<StatsGridFixed />)

    // Check if icons are rendered
    expect(getAllByTestId('mock-graduation-icon')).toHaveLength(1)
    expect(getAllByTestId('mock-plane-icon')).toHaveLength(1)
  })
}) 