import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import App from '../App'

test('renders an App component with a "Materials" heading', () => {
    const { getByText } = render(<App />)
    const title = getByText("Materials")
    expect(title).toBeInTheDocument()
})

test('renders an App with two buttons', () => {
    const { getAllByRole } = render(<App />)
    const buttons = getAllByRole("button")
    expect(buttons.length).toBe(2)
})

test('renders a total of $0.00 on initialization', () => {
    const { getByText } = render(<App />)
    const total = getByText("$0.00")
    expect(total).toBeInTheDocument()
})

test('renders a form when "Add" button clicked', async () => {
    render(<App />)
    fireEvent.click(screen.getByText("Add"))
    await waitFor(() => screen.getByTestId('material-form'))
    const form = screen.getByTestId('material-form')
    expect(form).toHaveTextContent('Name')
    expect(form).toHaveTextContent('Volume')
    expect(form).toHaveTextContent('Color')
    expect(form).toHaveTextContent('Delivery')
    expect(form).toHaveTextContent('Cost')
})