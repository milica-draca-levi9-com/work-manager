import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ActivityTimeline } from '../activity-timeline'

// Mock the UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-header" className={className}>{children}</div>
  ),
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-title" className={className}>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-card-content">{children}</div>
  ),
}))

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="mock-avatar-image" src={src} alt={alt} />
  ),
  AvatarFallback: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar-fallback" className={className}>{children}</div>
  ),
}))

describe('ActivityTimeline', () => {
  it('renders the timeline with all activities', () => {
    const { getByText, getAllByTestId, getAllByText } = render(<ActivityTimeline />)

    // Check title
    expect(getByText('Recent Activity')).toBeInTheDocument()

    // Check if all activities are rendered
    expect(getByText('Alex Johnson')).toBeInTheDocument()
    expect(getByText('Maria Garcia')).toBeInTheDocument()
    expect(getByText('David Kim')).toBeInTheDocument()
    expect(getByText('Sarah Wilson')).toBeInTheDocument()

    // Check activity details
    const submittedTexts = getAllByText('submitted')
    expect(submittedTexts).toHaveLength(2)
    expect(getByText('sick leave request')).toBeInTheDocument()
    expect(getByText('Just now')).toBeInTheDocument()

    // Check avatars
    const avatarFallbacks = getAllByTestId('mock-avatar-fallback')
    expect(avatarFallbacks).toHaveLength(4)
    expect(avatarFallbacks[0]).toHaveClass('bg-rose-500') // sick-leave category
    expect(avatarFallbacks[1]).toHaveClass('bg-purple-500') // education category
    expect(avatarFallbacks[2]).toHaveClass('bg-teal-500') // asset category
    expect(avatarFallbacks[3]).toHaveClass('bg-emerald-500') // expense category
  })

  it('renders activity items with correct structure', () => {
    const { container } = render(<ActivityTimeline />)
    
    // Check if all activity items have the correct structure
    const activityItems = container.querySelectorAll('.flex.items-start.gap-4.group')
    expect(activityItems).toHaveLength(4)

    // Check if each activity item has the correct elements
    activityItems.forEach(item => {
      const avatar = item.querySelector('[data-testid="mock-avatar"]')
      const content = item.querySelector('.flex-1')
      const timeElement = item.querySelector('.text-xs.text-gray-500')
      
      expect(avatar).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(timeElement).toBeInTheDocument()
    })
  })

  it('applies correct category colors', () => {
    const { getAllByTestId } = render(<ActivityTimeline />)
    
    const avatarFallbacks = getAllByTestId('mock-avatar-fallback')
    const expectedColors = ['bg-rose-500', 'bg-purple-500', 'bg-teal-500', 'bg-emerald-500']
    
    avatarFallbacks.forEach((fallback, index) => {
      expect(fallback).toHaveClass(expectedColors[index])
    })
  })
}) 