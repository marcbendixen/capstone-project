import { render, screen } from '@testing-library/react'
import EpisodeCard from './EpisodeCard'

describe('EpisodeCard', () => {
  it('renders', () => {
    const episode = {
      id: 123,
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(
      <EpisodeCard
        episode={episode}
        seriesIsOnWatchlist={true}
        isEpisodeWatched={true}
        handleCheckEpisode={() => jest.fn()}
      />
    )

    const element = screen.getByRole('listitem')
    expect(element).toBeInTheDocument()
  })

  it('has a heading', () => {
    const episode = {
      id: 123,
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(
      <EpisodeCard
        episode={episode}
        seriesIsOnWatchlist={true}
        isEpisodeWatched={true}
        handleCheckEpisode={() => jest.fn()}
      />
    )

    const headline = screen.getByRole('heading')
    expect(headline).toBeInTheDocument()
  })

  it('has the correct heading text', () => {
    const episode = {
      id: 123,
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(
      <EpisodeCard
        episode={episode}
        seriesIsOnWatchlist={true}
        isEpisodeWatched={true}
        handleCheckEpisode={() => jest.fn()}
      />
    )

    const text = screen.getByText('Title')
    expect(text).toBeInTheDocument()
  })
})
