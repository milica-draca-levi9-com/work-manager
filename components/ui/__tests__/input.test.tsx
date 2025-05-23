import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '../input'

describe('Input', () => {
  it('renders default input', () => {
    const { container } = render(<Input />)
    const input = container.querySelector('input')
    
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm')
  })

  it('renders with custom className', () => {
    const { container } = render(<Input className="custom-class" />)
    const input = container.querySelector('input')
    
    expect(input).toHaveClass('custom-class')
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    const { container } = render(<Input onChange={handleChange} />)
    const input = container.querySelector('input')

    if (input) {
      fireEvent.change(input, { target: { value: 'test' } })
    }

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const { container } = render(<Input disabled />)
    const input = container.querySelector('input')
    
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed disabled:opacity-50')
  })

  it('renders with different types', () => {
    const types = ['text', 'password', 'email', 'number'] as const
    types.forEach(type => {
      const { container } = render(<Input type={type} />)
      const input = container.querySelector('input')
      
      expect(input).toHaveAttribute('type', type)
    })
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    const { container } = render(<Input ref={ref} />)
    const input = container.querySelector('input')
    
    expect(ref.current).toBe(input)
  })

  it('handles placeholder text', () => {
    const placeholder = 'Enter text here'
    const { container } = render(<Input placeholder={placeholder} />)
    const input = container.querySelector('input')
    
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  it('handles required attribute', () => {
    const { container } = render(<Input required />)
    const input = container.querySelector('input')
    
    expect(input).toBeRequired()
  })
}) 