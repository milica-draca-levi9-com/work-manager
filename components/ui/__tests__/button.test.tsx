import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '../button'

describe('Button', () => {
  it('renders button with default variant', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('renders button with different variants', () => {
    const { container } = render(
      <>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </>
    )

    const buttons = container.querySelectorAll('button')
    expect(buttons[0]).toHaveClass('bg-secondary')
    expect(buttons[1]).toHaveClass('bg-destructive')
    expect(buttons[2]).toHaveClass('border')
    expect(buttons[3]).toHaveClass('hover:bg-accent')
  })

  it('renders button with different sizes', () => {
    const { container } = render(
      <>
        <Button size="default">Default</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </>
    )

    const buttons = container.querySelectorAll('button')
    expect(buttons[0]).toHaveClass('h-10 px-4 py-2')
    expect(buttons[1]).toHaveClass('h-9 px-3')
    expect(buttons[2]).toHaveClass('h-11 px-8')
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    const { container } = render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = container.querySelector('button')
    button?.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const { container } = render(<Button disabled>Disabled</Button>)
    
    const button = container.querySelector('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })
}) 