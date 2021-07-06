import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

ButtonSeason.propTypes = {
  name: PropTypes.string.isRequired,
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
  font-size: 0.75rem;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.083em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ isActive }) => (isActive ? 'var(--color-black)' : 'inherit')};
  background: ${({ isActive }) =>
    isActive ? 'var(--color-blue)' : 'var(--color-black)'};
  border: 2px solid var(--color-blue);
  border-radius: var(--border-radius);
  padding: 4px;
`
