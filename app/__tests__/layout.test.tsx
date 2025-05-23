import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout from '../layout'

// Mock the CSS import
jest.mock('@/app/globals.css', () => ({}))

// Mock the Inter font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    subsets: ['latin'],
  }),
}))

// Mock ThemeProvider
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}))

describe('RootLayout', () => {
  it('renders layout with theme provider and children', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    expect(getByTestId('theme-provider')).toBeInTheDocument()
    expect(getByTestId('theme-provider')).toHaveTextContent('Test Content')
  })
})

// Test metadata export
describe('metadata', () => {
  it('exports correct metadata values', () => {
    const { metadata } = require('../layout')
    
    expect(metadata).toEqual({
      title: 'Work Manager Dashboard',
      description: 'A dashboard for managing work-related tasks and activities',
      generator: 'v0.dev'
    })
  })
}) 