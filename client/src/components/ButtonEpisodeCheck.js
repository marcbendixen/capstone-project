import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as IconCheck } from '../assets/icons/check.svg'

ButtonEpisodeCheck.propTypes = {
  id: PropTypes.number.isRequired,
  isEpisodeWatched: PropTypes.bool.isRequired,
  onCheckEpisode: PropTypes.func.isRequired,
}

export default function ButtonEpisodeCheck({
  id,
  isEpisodeWatched,
  onCheckEpisode,
}) {
  return (
    <StyledButton
      onClick={() => onCheckEpisode(id)}
      isEpisodeWatched={isEpisodeWatched}
    >
      <StyledIcon />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 0;
  margin: 0 0 0 auto;
  border: none;
  background: none;
  color: ${({ isEpisodeWatched }) =>
    isEpisodeWatched ? 'var(--color-green)' : 'var(--color-black)'};
`

const StyledIcon = styled(IconCheck)`
  width: 32px;
  height: 32px;
`
