import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card'

describe('Card', () => {
  it('renders basic card', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(container.firstChild).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm')
    expect(container.querySelector('[class*="text-2xl font-semibold"]')).toHaveTextContent('Card Title')
    expect(container.querySelector('[class*="text-sm text-muted-foreground"]')).toHaveTextContent('Card Description')
    expect(container.querySelector('[class*="p-6 pt-0"]')).toHaveTextContent('Card Content')
    expect(container.querySelector('[class*="flex items-center p-6 pt-0"]')).toHaveTextContent('Card Footer')
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders header with custom className', () => {
    const { container } = render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    )

    expect(container.querySelector('[class*="flex flex-col space-y-1.5 p-6"]')).toHaveClass('custom-header')
  })

  it('renders content with custom className', () => {
    const { container } = render(
      <Card>
        <CardContent className="custom-content">Content</CardContent>
      </Card>
    )

    expect(container.querySelector('[class*="p-6 pt-0"]')).toHaveClass('custom-content')
  })

  it('renders footer with custom className', () => {
    const { container } = render(
      <Card>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    )

    expect(container.querySelector('[class*="flex items-center p-6 pt-0"]')).toHaveClass('custom-footer')
  })

  it('renders title with custom className', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle className="custom-title">Title</CardTitle>
        </CardHeader>
      </Card>
    )

    expect(container.querySelector('[class*="text-2xl font-semibold"]')).toHaveClass('custom-title')
  })

  it('renders description with custom className', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardDescription className="custom-description">Description</CardDescription>
        </CardHeader>
      </Card>
    )

    expect(container.querySelector('[class*="text-sm text-muted-foreground"]')).toHaveClass('custom-description')
  })
}) 