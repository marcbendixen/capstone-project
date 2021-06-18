import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonEpisodeCheck from './ButtonEpisodeCheck'

describe('ButtonEpisodeCheck', () => {
  it('renders', () => {
    render(<ButtonEpisodeCheck onClick={() => jest.fn()} isWatched={false} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has onClick function', () => {
    const handleOnClick = jest.fn()
    render(<ButtonEpisodeCheck onClick={handleOnClick} isWatched={false} />)

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(handleOnClick).toHaveBeenCalled()
  })
})
