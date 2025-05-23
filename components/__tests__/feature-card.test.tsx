import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FeatureCard } from '../feature-card'
import { Activity } from 'lucide-react'

describe('FeatureCard', () => {
  const defaultProps = {
    title: 'Test Feature',
    description: 'This is a test feature description',
    icon: Activity,
    href: '/test',
    color: 'rose' as const,
  }

  it('renders with all props correctly', () => {
    const { container } = render(<FeatureCard {...defaultProps} />)

    const title = container.querySelector('h2')
    const description = container.querySelector('p')
    const link = container.querySelector('a')

    expect(title).toHaveTextContent(defaultProps.title)
    expect(description).toHaveTextContent(defaultProps.description)
    expect(link).toHaveAttribute('href', defaultProps.href)
  })

  it('renders with different colors', () => {
    const colors = ['rose', 'purple', 'sky', 'emerald', 'amber', 'teal'] as const
    colors.forEach(color => {
      const { container } = render(
        <FeatureCard {...defaultProps} color={color} />
      )
      const card = container.querySelector('[class*="bg-gradient-to-br"]')
      expect(card).toHaveClass(`bg-gradient-to-br from-white to-${color}-50`)
    })
  })

  it('renders icon component', () => {
    const { container } = render(<FeatureCard {...defaultProps} />)
    
    // Check if the icon container is present with the correct color classes
    const iconContainer = container.querySelector(`[class*="bg-${defaultProps.color}-100"]`)
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass(`text-${defaultProps.color}-500`)
  })

  it('applies hover styles correctly', () => {
    const { container } = render(<FeatureCard {...defaultProps} />)
    
    const iconContainer = container.querySelector(`[class*="bg-${defaultProps.color}-100"]`)
    expect(iconContainer).toHaveClass(`group-hover:bg-${defaultProps.color}-500`)
    expect(iconContainer).toHaveClass('group-hover:text-white')
  })

  it('renders with required props only', () => {
    const minimalProps = {
      title: 'Minimal Feature',
      description: 'Minimal description',
      icon: Activity,
      color: 'sky' as const,
      href: '/minimal',
    }

    const { container } = render(<FeatureCard {...minimalProps} />)
    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
  })
}) 