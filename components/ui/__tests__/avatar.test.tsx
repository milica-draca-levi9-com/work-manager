import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'

// Mock Radix UI Avatar components
jest.mock('@radix-ui/react-avatar', () => ({
  Root: function Root({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span data-testid="avatar-root" className={className}>{children}</span>
  },
  Image: function Image({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return <img data-testid="avatar-image" role="img" src={src} alt={alt} className={className} />
  },
  Fallback: function Fallback({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span data-testid="avatar-fallback" className={className}>{children}</span>
  },
}))

describe('Avatar', () => {
  it('renders with image', () => {
    const { getByRole } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    const avatar = getByRole('img')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/test.jpg')
    expect(avatar).toHaveAttribute('alt', 'Test User')
  })

  it('renders with custom size classes', () => {
    const { getByTestId } = render(
      <Avatar className="h-20 w-20">
        <AvatarImage src="/test.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    const avatar = getByTestId('avatar-root')
    expect(avatar).toHaveClass('h-20', 'w-20')
  })

  it('renders image with custom classes', () => {
    const { getByRole } = render(
      <Avatar>
        <AvatarImage className="object-contain" src="/test.jpg" alt="Test User" />
      </Avatar>
    )

    const image = getByRole('img')
    expect(image).toHaveClass('object-contain')
  })

  it('renders fallback', () => {
    const { getByText } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    expect(getByText('TU')).toBeInTheDocument()
  })
}) 