import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SickLeaveStats } from '../sick-leave-stats'

// Mock supabase
const mockSupabase = {
  from: jest.fn(),
  select: jest.fn(),
  eq: jest.fn(),
}

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => mockSupabase,
  },
}))

// Mock StatsCardWrapper
jest.mock('@/components/stats-card-wrapper', () => ({
  StatsCardWrapper: ({ title, value, icon: Icon, bgColor, iconColor }: any) => (
    <div
      data-testid="mock-stats-card"
      data-title={title}
      data-value={value}
      className={`${bgColor} ${iconColor}`}
    >
      <Icon />
    </div>
  ),
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Thermometer: () => <div data-testid="mock-thermometer-icon">Thermometer Icon</div>,
}))

describe('SickLeaveStats', () => {
  beforeEach(() => {
    mockSupabase.from.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
  })

  it('renders with correct data from supabase', async () => {
    mockSupabase.eq.mockResolvedValue({
      count: 5,
      error: null,
    })

    const { getByTestId } = render(await SickLeaveStats())

    const statsCard = getByTestId('mock-stats-card')
    expect(statsCard).toBeInTheDocument()

    // Check props passed to StatsCardWrapper
    expect(statsCard).toHaveAttribute('data-title', 'Pending Requests')
    expect(statsCard).toHaveAttribute('data-value', '5')
    expect(statsCard).toHaveClass('bg-rose-100', 'text-rose-500')

    // Check if icon is rendered
    expect(getByTestId('mock-thermometer-icon')).toBeInTheDocument()
  })

  it('handles supabase error gracefully', async () => {
    mockSupabase.eq.mockResolvedValue({
      count: null,
      error: new Error('Database error'),
    })

    const { getByTestId } = render(await SickLeaveStats())

    const statsCard = getByTestId('mock-stats-card')
    expect(statsCard).toBeInTheDocument()
    expect(statsCard).toHaveAttribute('data-value', '0')
  })

  it('handles null count gracefully', async () => {
    mockSupabase.eq.mockResolvedValue({
      count: null,
      error: null,
    })

    const { getByTestId } = render(await SickLeaveStats())

    const statsCard = getByTestId('mock-stats-card')
    expect(statsCard).toBeInTheDocument()
    expect(statsCard).toHaveAttribute('data-value', '0')
  })
}) 