import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as IconMinus } from '../assets/icons/minus-solid.svg'
import { ReactComponent as IconPlus } from '../assets/icons/plus-solid.svg'

ButtonWatchlist.propTypes = {
  isOnWatchlist: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function ButtonWatchlist({ isOnWatchlist, onClick }) {
  return (
    <StyledButton onClick={onClick} isOnWatchlist={isOnWatchlist}>
      {isOnWatchlist ? (
        <>
          <IconMinus />
          <span>entfernen</span>
        </>
      ) : (
        <>
          <IconPlus />
          <span>hinzufügen</span>
        </>
      )}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  border: 2px solid ${props => (props.isOnWatchlist ? '#ff7500' : '#01dc4a')};
  padding: 4px;
  margin: 8px 0 0 0;
  text-decoration: none;
  background: var(--color-main-bg);
  color: ${props => (props.isOnWatchlist ? '#ff7500' : '#01dc4a')};
  font-family: inherit;
  font-size: 0.75rem;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;

  svg {
    color: ${props => (props.isOnWatchlist ? '#ff7500' : '#01dc4a')};
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`
