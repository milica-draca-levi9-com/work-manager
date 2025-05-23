import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import EducationSocialPage from '../page'

// Mock the EventsManagement component
jest.mock('@/components/events/events-management', () => ({
  EventsManagement: () => <div data-testid="mock-events-management">Events Management</div>,
}))

describe('EducationSocialPage', () => {
  it('renders the events management component', () => {
    const { getByTestId } = render(<EducationSocialPage />)
    expect(getByTestId('mock-events-management')).toBeInTheDocument()
  })
}) 