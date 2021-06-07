import { render, screen } from '@testing-library/react'
import PosterList from './PosterList'

const list = [
  { id: 1, name: 'Title', poster_path: 'poster.jpg' },
  { id: 2, name: 'Title', poster_path: 'poster.jpg' },
  { id: 3, name: 'Title', poster_path: 'poster.jpg' },
]

describe('PostList', () => {
  it('renders', () => {
    render(<PosterList list={list} />)

    const posterList = screen.getByRole('list')
    expect(posterList).toBeInTheDocument()
  })

  it('has 3 list items', () => {
    render(<PosterList list={list} />)

    const posterListItems = screen.getAllByRole('listitem')
    expect(posterListItems).toHaveLength(3)
  })

  it('has 3 images', () => {
    render(<PosterList list={list} />)

    const posterListImages = screen.getAllByRole('img')
    expect(posterListImages).toHaveLength(3)
  })

  it('has 3 alt texts', () => {
    render(<PosterList list={list} />)

    const posterListAltTexts = screen.getAllByAltText('Poster von Title')
    expect(posterListAltTexts).toHaveLength(3)
  })
})
