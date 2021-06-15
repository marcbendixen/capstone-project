import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SeriesDetailsPage from './SeriesDetailsPage'

describe('SeriesDetailsPage', () => {
  const series = []

  it('has heading', () => {
    render(
      <Router>
        <SeriesDetailsPage series={series} />
      </Router>
    )

    const heading = screen.getAllByRole('heading')
    expect(heading).toHaveLength(2)
  })

  it('has a header', () => {
    render(
      <Router>
        <SeriesDetailsPage series={series} />
      </Router>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('has a list', () => {
    render(
      <Router>
        <SeriesDetailsPage series={series} />
      </Router>
    )

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})
