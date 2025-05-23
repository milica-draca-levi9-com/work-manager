import React from 'react'
import { render } from '@testing-library/react'
import Loading from '../loading'

describe('Loading', () => {
  it('renders nothing as expected', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeNull()
  })
}) 