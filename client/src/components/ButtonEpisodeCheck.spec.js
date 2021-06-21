import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonEpisodeCheck from './ButtonEpisodeCheck'

describe('ButtonEpisodeCheck', () => {
  it('renders', () => {
    render(
      <ButtonEpisodeCheck
        id={123}
        handleCheckEpisode={() => jest.fn()}
        isEpisodeWatched={false}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has onClick function', () => {
    const handleOnClick = jest.fn()
    render(
      <ButtonEpisodeCheck
        id={123}
        handleCheckEpisode={handleOnClick}
        isEpisodeWatched={false}
      />
    )

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(handleOnClick).toHaveBeenCalled()
  })
})
