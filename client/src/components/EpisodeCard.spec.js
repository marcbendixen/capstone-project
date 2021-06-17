import { render, screen } from '@testing-library/react'
import EpisodeCard from './EpisodeCard'

describe('EpisodeCard', () => {
  it('renders', () => {
    const episode = {
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(<EpisodeCard episode={episode} />)

    const element = screen.getByRole('listitem')
    expect(element).toBeInTheDocument()
  })

  it('has a heading', () => {
    const episode = {
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(<EpisodeCard episode={episode} />)

    const headline = screen.getByRole('heading')
    expect(headline).toBeInTheDocument()
  })

  it('has the correct heading text', () => {
    const episode = {
      name: 'Title',
      overview: 'Lorem Ipsum Dolor',
      episode_number: 1,
    }

    render(<EpisodeCard episode={episode} />)

    const text = screen.getByText('Title')
    expect(text).toBeInTheDocument()
  })
})
