import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatsCardWrapper } from '../stats-card-wrapper'
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

describe('StatsCardWrapper', () => {
  const defaultProps = {
    title: 'Test Stats',
    value: 42,
    icon: Activity,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  }

  it('renders with all props correctly', () => {
    const { getByText, getByTestId } = render(<StatsCardWrapper {...defaultProps} />)

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
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'bg-blue-100',
      'text-blue-500'
    )
  })

  it('renders with string value', () => {
    const props = {
      ...defaultProps,
      value: '42%',
    }

    const { getByText } = render(<StatsCardWrapper {...props} />)
    expect(getByText('42%')).toBeInTheDocument()
  })

  it('renders with different colors', () => {
    const props = {
      ...defaultProps,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-500',
    }

    const { getByTestId } = render(<StatsCardWrapper {...props} />)
    const cardContent = getByTestId('mock-card-content')
    const iconContainer = cardContent.querySelector('div:last-child')

    expect(iconContainer).toHaveClass('bg-red-100', 'text-red-500')
  })

  it('renders icon with correct size', () => {
    const { container } = render(<StatsCardWrapper {...defaultProps} />)
    const icon = container.querySelector('.h-5.w-5')
    expect(icon).toBeInTheDocument()
  })
}) 