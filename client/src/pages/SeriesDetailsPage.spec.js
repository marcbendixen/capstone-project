import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SeriesDetailsPage from './SeriesDetailsPage'

describe('SeriesDetailsPage', () => {
  const series = []

  it('renders a details page with header, headings and lists', () => {
    render(
      <Router>
        <SeriesDetailsPage
          series={series}
          handleWatchlist={() => jest.fn()}
          handleNewSeries={() => jest.fn()}
          onCheckEpisode={() => jest.fn()}
          checkIsEpisodeWatched={() => jest.fn()}
        />
      </Router>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const heading = screen.getAllByRole('heading')
    expect(heading).toHaveLength(3)

    const list = screen.getAllByRole('list')
    expect(list).toHaveLength(2)
  })
})
