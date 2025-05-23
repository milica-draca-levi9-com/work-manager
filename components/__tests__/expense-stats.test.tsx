import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ExpenseStats } from '../expense-stats'

// Mock the dependencies
jest.mock('@/lib/expense-api', () => ({
  getExpenseCount: jest.fn().mockResolvedValue(5),
}))

jest.mock('@/components/stats-card-wrapper', () => ({
  StatsCardWrapper: ({ title, value, icon: Icon, bgColor, iconColor }: any) => (
    <div data-testid="mock-stats-card">
      <h3 data-testid="stats-title">{title}</h3>
      <span data-testid="stats-value">{value}</span>
      <div data-testid="stats-icon" className={`${bgColor} ${iconColor}`}>
        <Icon />
      </div>
    </div>
  ),
}))

jest.mock('lucide-react', () => ({
  Receipt: () => <div data-testid="mock-receipt-icon">Receipt Icon</div>,
}))

describe('ExpenseStats', () => {
  it('renders with correct props and data', async () => {
    const { getByTestId } = render(await ExpenseStats())

    // Check if StatsCardWrapper is rendered with correct props
    const statsCard = getByTestId('mock-stats-card')
    expect(statsCard).toBeInTheDocument()

    // Check title
    expect(getByTestId('stats-title')).toHaveTextContent('Expense Claims')

    // Check value from API
    expect(getByTestId('stats-value')).toHaveTextContent('5')

    // Check icon colors
    const iconContainer = getByTestId('stats-icon')
    expect(iconContainer).toHaveClass('bg-emerald-100', 'text-emerald-500')

    // Check if Receipt icon is rendered
    expect(getByTestId('mock-receipt-icon')).toBeInTheDocument()
  })
}) 