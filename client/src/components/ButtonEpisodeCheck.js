import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as IconCheck } from '../assets/icons/check-circle-solid.svg'

ButtonEpisodeCheck.propTypes = {
  onClick: PropTypes.func.isRequired,
  isWatched: PropTypes.bool.isRequired,
}

export default function ButtonEpisodeCheck({ onClick, isWatched }) {
  return (
    <StyledButton onClick={onClick} isWatched={isWatched}>
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
  color: ${props => (props.isWatched ? '#01dc4a' : '#14171A')};
`
