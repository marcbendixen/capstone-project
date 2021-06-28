import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

ButtonSeason.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default function ButtonSeason({ name, onClick, isActive }) {
  return (
    <StyledButton onClick={onClick} isActive={isActive}>
      {name}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border: 2px solid var(--color-blue);
  padding: 4px;
  text-decoration: none;
  background-color: ${props =>
    props.isActive ? 'var(--color-blue)' : 'var(--color-black)'};
  color: ${props => (props.isActive ? 'var(--color-black)' : '#fff')};
  font-family: inherit;
  font-size: 0.75rem;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`
