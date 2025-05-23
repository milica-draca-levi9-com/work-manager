import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatsCard } from '../stats-card'
import { Activity } from 'lucide-react'

// Mock the UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-content" className={className}>{children}</div>
  ),
}))

describe('StatsCard', () => {
  afterEach(cleanup)

  const defaultProps = {
    title: 'Test Stats',
    value: 42,
    icon: Activity,
    color: 'rose' as const,
  }

  it('renders with all props correctly', () => {
    const { getByText, getByTestId } = render(<StatsCard {...defaultProps} />)

    // Check if card has correct classes
    const card = getByTestId('mock-card')
    expect(card).toHaveClass('bg-white', 'shadow-sm', 'border', 'border-gray-100')

    // Check if card content has correct classes
    const cardContent = getByTestId('mock-card-content')
    expect(cardContent).toHaveClass('p-4', 'flex', 'items-center', 'justify-between')

    // Check if title and value are rendered
    expect(getByText('Test Stats')).toHaveClass('text-sm', 'text-gray-500')
    expect(getByText('42')).toHaveClass('text-2xl', 'font-bold')

    // Check if icon container has correct classes
    const iconContainer = cardContent.querySelector('div:last-child')
    expect(iconContainer).toHaveClass(
      'h-10',
      'w-10',
      'bg-rose-100',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'text-rose-500'
    )
  })

  it('renders with different color variants', () => {
    const colors = ['purple', 'sky', 'emerald', 'amber', 'teal'] as const
    
    colors.forEach(color => {
      cleanup()
      const { getByTestId } = render(
        <StatsCard {...defaultProps} color={color} />
      )

      const cardContent = getByTestId('mock-card-content')
      const iconContainer = cardContent.querySelector('div:last-child')
      
      expect(iconContainer).toHaveClass(
        `bg-${color}-100`,
        `text-${color}-500`
      )
    })
  })

  it('renders with string value', () => {
    const props = {
      ...defaultProps,
      value: '42%',
    }

    const { getByText } = render(<StatsCard {...props} />)
    expect(getByText('42%')).toBeInTheDocument()
  })
}) 