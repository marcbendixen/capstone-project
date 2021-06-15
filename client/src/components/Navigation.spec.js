import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders the navigation', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const navigation = screen.getByRole('navigation')
    expect(navigation).toBeInTheDocument()
  })

  it('has at leat one nav link', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})
