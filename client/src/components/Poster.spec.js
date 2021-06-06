import { render, screen } from '@testing-library/react'
import Poster from './Poster'

describe('Poster', () => {
  it('renders', () => {
    render(<Poster />)

    const poster = screen.getByRole('img')
    expect(poster).toBeInTheDocument()
  })

  it('has the correct image path', () => {
    const imagePath = 'https://via.placeholder.com/300x450?text=POSTER'

    render(<Poster path={imagePath} />)

    const poster = screen.getByRole('img')
    expect(poster).toHaveAttribute('src', imagePath)
  })

  it('has the correct alt text', () => {
    const altText = 'Text for alt attribute'

    render(<Poster alt={altText} />)

    const poster = screen.getByRole('img')
    expect(poster).toHaveAttribute('alt', altText)
  })
})
