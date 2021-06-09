import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import PosterList from './PosterList'

const list = [
  { id: 1, name: 'Title', poster_path: 'poster.jpg' },
  { id: 2, name: 'Title', poster_path: 'poster.jpg' },
  { id: 3, name: 'Title', poster_path: 'poster.jpg' },
]

describe('PostList', () => {
  it('renders', () => {
    render(
      <Router>
        <PosterList list={list} />
      </Router>
    )

    const posterList = screen.getByRole('list')
    expect(posterList).toBeInTheDocument()
  })

  it('has 3 list items', () => {
    render(
      <Router>
        <PosterList list={list} />
      </Router>
    )

    const posterListItems = screen.getAllByRole('listitem')
    expect(posterListItems).toHaveLength(3)
  })

  it('has 3 images', () => {
    render(
      <Router>
        <PosterList list={list} />
      </Router>
    )

    const posterListImages = screen.getAllByRole('img')
    expect(posterListImages).toHaveLength(3)
  })

  it('has 3 alt texts', () => {
    render(
      <Router>
        <PosterList list={list} />
      </Router>
    )

    const posterListAltTexts = screen.getAllByAltText('Poster von Title')
    expect(posterListAltTexts).toHaveLength(3)
  })
})
