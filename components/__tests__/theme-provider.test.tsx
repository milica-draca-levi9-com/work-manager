import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '../theme-provider'
import { type ThemeProviderProps } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="mock-next-themes-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}))

describe('ThemeProvider', () => {
  it('renders children and passes props to NextThemesProvider', () => {
    const testProps: Partial<ThemeProviderProps> = {
      attribute: 'class',
      defaultTheme: 'light',
      enableSystem: true,
    }

    const { getByTestId, getByText } = render(
      <ThemeProvider {...testProps}>
        <div>Test Child</div>
      </ThemeProvider>
    )

    // Check if NextThemesProvider is rendered
    const provider = getByTestId('mock-next-themes-provider')
    expect(provider).toBeInTheDocument()

    // Check if props are passed correctly
    const passedProps = JSON.parse(provider.getAttribute('data-props') || '{}')
    expect(passedProps).toEqual(testProps)

    // Check if children are rendered
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('renders without optional props', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    )

    // Check if NextThemesProvider is rendered
    const provider = getByTestId('mock-next-themes-provider')
    expect(provider).toBeInTheDocument()

    // Check if children are rendered
    expect(getByText('Test Child')).toBeInTheDocument()

    // Check if props are empty
    const passedProps = JSON.parse(provider.getAttribute('data-props') || '{}')
    expect(passedProps).toEqual({})
  })
}) 