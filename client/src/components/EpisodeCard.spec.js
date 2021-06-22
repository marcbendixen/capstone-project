import { render, screen } from '@testing-library/react'
import EpisodeCard from './EpisodeCard'

describe('EpisodeCard', () => {
  const episode = {
    id: 123,
    name: 'Title',
    overview: 'Lorem Ipsum Dolor',
    episode_number: 1,
  }

  it('renders a listitem with heading and correct text', () => {
    render(
      <EpisodeCard
        episode={episode}
        seriesIsOnWatchlist={true}
        isEpisodeWatched={true}
        onCheckEpisode={() => jest.fn()}
      />
    )

    const element = screen.getByRole('listitem')
    expect(element).toBeInTheDocument()

    const headline = screen.getByRole('heading')
    expect(headline).toBeInTheDocument()

    const text = screen.getByText('Title')
    expect(text).toBeInTheDocument()
  })
})
