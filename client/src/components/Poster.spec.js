import { render, screen } from '@testing-library/react'
import Poster from './Poster'

describe('Poster', () => {
  it('renders', () => {
    render(<Poster path="https://localhost:3000/" alt="Poster of Series" />)

    const poster = screen.getByRole('img')
    expect(poster).toBeInTheDocument()
  })

  it('has the correct image path', () => {
    const imagePath = 'https://localhost:3000/'

    render(<Poster path={imagePath} alt="Poster of Series" />)

    const poster = screen.getByRole('img')
    expect(poster).toHaveAttribute('src', imagePath)
  })

  it('has the correct alt text', () => {
    const altText = 'Poster of Series'

    render(<Poster path="https://localhost:3000/" alt={altText} />)

    const poster = screen.getByAltText(altText)
    expect(poster).toHaveAttribute('alt', altText)
  })
})
