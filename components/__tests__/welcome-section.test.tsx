import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { WelcomeSection } from '../welcome-section'

describe('WelcomeSection', () => {
  it('renders welcome message with correct text and styling', () => {
    const { getByText, container } = render(<WelcomeSection />)

    // Check container classes
    const container_div = container.firstChild as HTMLElement
    expect(container_div).toHaveClass('mb-10', 'text-center', 'md:text-left')

    // Check heading
    const heading = getByText('Welcome to your work manager')
    expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'text-gray-800')

    // Check subtext
    const subtext = getByText('Manage all your work-related tasks in one place')
    expect(subtext).toHaveClass('text-gray-500', 'mt-2')
  })

  it('renders with responsive text alignment', () => {
    const { container } = render(<WelcomeSection />)
    const welcomeSection = container.firstChild as HTMLElement

    // Check responsive text alignment classes
    expect(welcomeSection).toHaveClass('text-center', 'md:text-left')
  })

  it('renders with responsive heading size', () => {
    const { getByText } = render(<WelcomeSection />)
    const heading = getByText('Welcome to your work manager')

    // Check responsive heading size classes
    expect(heading).toHaveClass('text-3xl', 'md:text-4xl')
  })
}) 