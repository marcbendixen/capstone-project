import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonSeason from './ButtonSeason'

describe('ButtonWatchlist', () => {
  it('renders', () => {
    render(
      <ButtonSeason
        onClick={() => jest.fn()}
        isActive={true}
        name={'Staffel 1'}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has onClick function', () => {
    const handleOnClick = jest.fn()
    render(
      <ButtonSeason
        onClick={handleOnClick}
        isActive={true}
        name={'Staffel 1'}
      />
    )

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(handleOnClick).toHaveBeenCalled()
  })

  it('has the correct button text', () => {
    render(
      <ButtonSeason
        onClick={() => jest.fn()}
        isActive={true}
        name={'Staffel 1'}
      />
    )

    const text = screen.getByText('Staffel 1')
    expect(text).toBeInTheDocument()
  })
})
