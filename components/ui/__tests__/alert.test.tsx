import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Alert, AlertDescription, AlertTitle } from '../alert'
import { Info } from 'lucide-react'

describe('Alert', () => {
  it('renders with default variant', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert Description')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const variants = ['default', 'destructive'] as const
    variants.forEach(variant => {
      const { container } = render(
        <Alert variant={variant}>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>Alert Description</AlertDescription>
        </Alert>
      )

      const alert = container.querySelector('[role="alert"]')
      if (variant === 'destructive') {
        expect(alert).toHaveClass('border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive')
      } else {
        expect(alert).toHaveClass('bg-background text-foreground')
      }
    })
  })

  it('renders with custom icon', () => {
    render(
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Alert className="custom-class">
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    )

    expect(container.querySelector('[role="alert"]')).toHaveClass('custom-class')
  })

  it('renders title with custom className', () => {
    const { container } = render(
      <Alert>
        <AlertTitle className="custom-title">Alert Title</AlertTitle>
      </Alert>
    )

    expect(container.querySelector('h5')).toHaveClass('custom-title')
  })

  it('renders description with custom className', () => {
    const { container } = render(
      <Alert>
        <AlertDescription className="custom-description">Alert Description</AlertDescription>
      </Alert>
    )

    expect(container.querySelector('div[class*="text-sm"]')).toHaveClass('custom-description')
  })
}) 