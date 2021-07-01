import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SeriesDetailsPage from './SeriesDetailsPage'

describe('SeriesDetailsPage', () => {
  const series = []

  it('renders a details page with header, headings and lists', () => {
    const handleIsOnWatchlist = jest.fn()

    render(
      <Router>
        <SeriesDetailsPage
          series={series}
          handleWatchlist={() => jest.fn()}
          handleNewSeries={() => jest.fn()}
          onCheckEpisode={() => jest.fn()}
          checkIsEpisodeWatched={() => jest.fn()}
          checkIsOnWatchlist={handleIsOnWatchlist.mockReturnValueOnce(true)}
        />
      </Router>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const heading = screen.getAllByRole('heading', { level: 1 })
    expect(heading).toHaveLength(1)
  })
})
