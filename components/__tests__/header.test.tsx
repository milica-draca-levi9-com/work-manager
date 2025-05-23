import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '../header'

// Mock the UI components
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="mock-avatar-image" src={src} alt={alt} />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-avatar-fallback">{children}</div>
  ),
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, size, className }: any) => (
    <button data-testid="mock-button" data-variant={variant} data-size={size} className={className}>
      {children}
    </button>
  ),
}))

jest.mock('lucide-react', () => ({
  Bell: () => <div data-testid="mock-bell-icon">Bell Icon</div>,
  Menu: () => <div data-testid="mock-menu-icon" className="h-6 w-6 text-gray-500 md:hidden">Menu Icon</div>,
}))

describe('Header', () => {
  it('renders header with all components', () => {
    const { getByText, getByTestId, container } = render(<Header />)

    // Check if header has correct classes
    const header = container.querySelector('header')
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'py-4', 'px-6', 'sticky', 'top-0', 'z-10')

    // Check if logo and title are rendered
    expect(getByTestId('mock-menu-icon')).toBeInTheDocument()
    expect(getByText('WorkManager')).toBeInTheDocument()

    // Check if notification button is rendered with correct props
    const notificationButton = getByTestId('mock-button')
    expect(notificationButton).toHaveAttribute('data-variant', 'ghost')
    expect(notificationButton).toHaveAttribute('data-size', 'icon')
    expect(getByTestId('mock-bell-icon')).toBeInTheDocument()

    // Check if notification indicator is rendered
    const notificationIndicator = notificationButton.querySelector('.absolute.top-1.right-1')
    expect(notificationIndicator).toHaveClass('bg-rose-500', 'rounded-full')

    // Check if user info is rendered
    expect(getByText('Hello,')).toBeInTheDocument()
    expect(getByText('Jane Doe')).toBeInTheDocument()

    // Check if avatar is rendered with correct props
    const avatar = getByTestId('mock-avatar')
    expect(avatar).toHaveClass('h-10', 'w-10', 'border-2', 'border-white', 'shadow-sm')

    const avatarImage = getByTestId('mock-avatar-image')
    expect(avatarImage).toHaveAttribute('src', '/diverse-avatars.png')
    expect(avatarImage).toHaveAttribute('alt', 'Jane Doe')

    const avatarFallback = getByTestId('mock-avatar-fallback')
    expect(avatarFallback).toHaveTextContent('JD')
  })

  it('renders with responsive classes', () => {
    const { getByTestId } = render(<Header />)

    // Check if menu icon is hidden on desktop
    const menuIcon = getByTestId('mock-menu-icon')
    expect(menuIcon).toHaveClass('md:hidden')

    // Check if user info text is hidden on mobile
    expect(menuIcon).toHaveClass('text-gray-500')
  })
}) 