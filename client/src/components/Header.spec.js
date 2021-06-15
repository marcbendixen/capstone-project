import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('renders a heading', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('has a navigation', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    const navigation = screen.getByRole('navigation')
    expect(navigation).toBeInTheDocument()
  })

  it('has at leat one nav link', () => {
    render(
      <Router>
        <Header />
      </Router>
    )
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})
