import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SeriesDetailsPage from './SeriesDetailsPage'

describe.skip('SeriesDetailsPage', () => {
  it('has heading', () => {
    render(
      <Router>
        <SeriesDetailsPage />
      </Router>
    )
    const heading = screen.getAllByRole('heading')
    expect(heading).toHaveLength(2)
  })

  it('has a header', () => {
    render(
      <Router>
        <SeriesDetailsPage />
      </Router>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('has a list', () => {
    render(
      <Router>
        <SeriesDetailsPage />
      </Router>
    )

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})
