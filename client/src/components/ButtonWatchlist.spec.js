import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonWatchlist from './ButtonWatchlist'

describe('ButtonWatchlist', () => {
  it('renders', () => {
    render(<ButtonWatchlist onClick={() => jest.fn()} isOnWatchlist={true} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has onClick function', () => {
    const handleOnClick = jest.fn()
    render(<ButtonWatchlist onClick={handleOnClick} isOnWatchlist={true} />)

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(handleOnClick).toHaveBeenCalled()
  })

  it('has the correct button text', () => {
    render(<ButtonWatchlist onClick={() => jest.fn()} isOnWatchlist={false} />)

    const text = screen.getByText('hinzufügen')
    expect(text).toBeInTheDocument()
  })
})
