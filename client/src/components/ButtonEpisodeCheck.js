import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as IconCheck } from '../assets/icons/check-circle-solid.svg'

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
      <IconCheck />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: auto;
  margin-left: auto;
  padding: 0;
  margin: 0 0 0 auto;
  border: none;
  background: none;
  text-decoration: none;
  cursor: pointer;
  color: ${props =>
    props.isEpisodeWatched ? '#01dc4a' : 'var(--color-main-bg)'};

  svg {
    width: 100%;
    height: 100%;
  }
`
