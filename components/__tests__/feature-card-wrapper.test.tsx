import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FeatureCardWrapper } from '../feature-card-wrapper'
import { Activity } from 'lucide-react'

// Mock the dependencies
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">{children}</a>
  )
})

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-content" className={className}>{children}</div>
  ),
}))

describe('FeatureCardWrapper', () => {
  const defaultProps = {
    title: 'Test Feature',
    description: 'Test Description',
    icon: Activity,
    href: '/test',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    hoverBgColor: 'bg-blue-500',
    hoverTextColor: 'text-white',
  }

  it('renders with default props', () => {
    const { getByText, getByTestId } = render(<FeatureCardWrapper {...defaultProps} />)

    // Check if link is rendered with correct href
    const link = getByTestId('mock-link')
    expect(link).toHaveAttribute('href', '/test')

    // Check if title and description are rendered
    expect(getByText('Test Feature')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()

    // Check if card has correct classes
    const card = getByTestId('mock-card')
    expect(card).toHaveClass(
      'h-full',
      'border',
      'border-gray-100',
      'shadow-sm',
      'hover:shadow-md',
      'transition-shadow',
      'overflow-hidden',
      'bg-gradient-to-br',
      'from-white',
      'to-gray-50'
    )

    // Check if icon container has correct classes
    const iconContainer = card.querySelector('div[class*="p-3 rounded-lg mb-4"]')
    expect(iconContainer).toHaveClass(
      'text-blue-500',
      'bg-blue-100',
      'group-hover:bg-blue-500',
      'group-hover:text-white'
    )
  })

  it('renders with custom cardBgColor', () => {
    const propsWithCustomBg = {
      ...defaultProps,
      cardBgColor: 'bg-custom-gradient',
    }

    const { getByTestId } = render(<FeatureCardWrapper {...propsWithCustomBg} />)

    const card = getByTestId('mock-card')
    expect(card).toHaveClass('bg-custom-gradient')
    expect(card).not.toHaveClass('bg-gradient-to-br', 'from-white', 'to-gray-50')
  })

  it('renders with responsive classes', () => {
    const { getByTestId } = render(<FeatureCardWrapper {...defaultProps} />)

    const cardContent = getByTestId('mock-card-content')
    expect(cardContent).toHaveClass(
      'p-6',
      'flex',
      'flex-col',
      'items-center',
      'md:items-start',
      'text-center',
      'md:text-left',
      'h-full',
      'relative'
    )
  })
}) 