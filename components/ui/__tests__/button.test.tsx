import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '../button'

describe('Button', () => {
  afterEach(cleanup)

  it('renders with default variant and size', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    const button = getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'whitespace-nowrap',
      'rounded-md',
      'text-sm',
      'font-medium',
      'ring-offset-background',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      '[&_svg]:pointer-events-none',
      '[&_svg]:size-4',
      '[&_svg]:shrink-0',
      'bg-primary',
      'text-primary-foreground',
      'hover:bg-primary/90',
      'h-10',
      'px-4',
      'py-2'
    )
  })

  it('renders with different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
    
    variants.forEach(variant => {
      cleanup()
      const { getByRole } = render(<Button variant={variant}>Button</Button>)
      const button = getByRole('button')
      
      if (variant === 'default') {
        expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90')
      } else if (variant === 'destructive') {
        expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground', 'hover:bg-destructive/90')
      } else if (variant === 'outline') {
        expect(button).toHaveClass('border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground')
      } else if (variant === 'secondary') {
        expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80')
      } else if (variant === 'ghost') {
        expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')
      } else if (variant === 'link') {
        expect(button).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline')
      }
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const
    
    sizes.forEach(size => {
      cleanup()
      const { getByRole } = render(<Button size={size}>Button</Button>)
      const button = getByRole('button')
      
      if (size === 'default') {
        expect(button).toHaveClass('h-10', 'px-4', 'py-2')
      } else if (size === 'sm') {
        expect(button).toHaveClass('h-9', 'px-3')
      } else if (size === 'lg') {
        expect(button).toHaveClass('h-11', 'px-8')
      } else if (size === 'icon') {
        expect(button).toHaveClass('h-10', 'w-10')
      }
    })
  })

  it('renders as different elements', () => {
    const { container } = render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    )

    const linkButton = container.querySelector('a')
    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
    expect(linkButton).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center'
    )
  })

  it('handles disabled state', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>)
    const button = getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>)
    
    getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 