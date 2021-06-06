import { render, screen } from '@testing-library/react'
import PosterList from './PosterList'

const list = [
  { id: 1, alt: 'Poster of Title 1' },
  { id: 2, alt: 'Poster of Title 2' },
  { id: 3, alt: 'Poster of Title 3' },
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
})
