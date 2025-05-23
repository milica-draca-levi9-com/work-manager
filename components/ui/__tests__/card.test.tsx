import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card'

describe('Card', () => {
  it('renders card with all subcomponents', () => {
    const { getByTestId } = render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Card Title</CardTitle>
          <CardDescription data-testid="card-description">Card Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">Card Content</CardContent>
        <CardFooter data-testid="card-footer">Card Footer</CardFooter>
      </Card>
    )

    // Check if all components are rendered
    expect(getByTestId('card')).toBeInTheDocument()
    expect(getByTestId('card-header')).toBeInTheDocument()
    expect(getByTestId('card-title')).toBeInTheDocument()
    expect(getByTestId('card-description')).toBeInTheDocument()
    expect(getByTestId('card-content')).toBeInTheDocument()
    expect(getByTestId('card-footer')).toBeInTheDocument()
  })

  it('renders with correct default classes', () => {
    const { getByTestId } = render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Title</CardTitle>
          <CardDescription data-testid="card-description">Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">Content</CardContent>
        <CardFooter data-testid="card-footer">Footer</CardFooter>
      </Card>
    )

    // Check default classes
    expect(getByTestId('card')).toHaveClass(
      'rounded-lg',
      'border',
      'bg-card',
      'text-card-foreground',
      'shadow-sm'
    )
    expect(getByTestId('card-header')).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    expect(getByTestId('card-title')).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
    expect(getByTestId('card-description')).toHaveClass('text-sm', 'text-muted-foreground')
    expect(getByTestId('card-content')).toHaveClass('p-6', 'pt-0')
    expect(getByTestId('card-footer')).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })

  it('accepts and applies custom className', () => {
    const { getByTestId } = render(
      <Card data-testid="card" className="custom-class">
        <CardHeader data-testid="card-header" className="header-class">
          <CardTitle data-testid="card-title" className="title-class">Title</CardTitle>
          <CardDescription data-testid="card-description" className="description-class">Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content" className="content-class">Content</CardContent>
        <CardFooter data-testid="card-footer" className="footer-class">Footer</CardFooter>
      </Card>
    )

    // Check if custom classes are applied
    expect(getByTestId('card')).toHaveClass('custom-class')
    expect(getByTestId('card-header')).toHaveClass('header-class')
    expect(getByTestId('card-title')).toHaveClass('title-class')
    expect(getByTestId('card-description')).toHaveClass('description-class')
    expect(getByTestId('card-content')).toHaveClass('content-class')
    expect(getByTestId('card-footer')).toHaveClass('footer-class')
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()
    expect(getByText('Test Content')).toBeInTheDocument()
    expect(getByText('Test Footer')).toBeInTheDocument()
  })
}) 