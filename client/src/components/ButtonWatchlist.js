import PropTypes from 'prop-types'
import styled, { css } from 'styled-components/macro'
import { ReactComponent as IconMinus } from '../assets/icons/minus.svg'
import { ReactComponent as IconPlus } from '../assets/icons/plus.svg'

ButtonWatchlist.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOnWatchlist: PropTypes.bool.isRequired,
}

export default function ButtonWatchlist({ onClick, isOnWatchlist }) {
  return (
    <StyledButton onClick={onClick} isOnWatchlist={isOnWatchlist}>
      {isOnWatchlist ? (
        <>
          <StyledIconMinus />
          <span>entfernen</span>
        </>
      ) : (
        <>
          <StyledIconPlus />
          <span>hinzufügen</span>
        </>
      )}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.083em;
  text-transform: uppercase;
  color: ${({ isOnWatchlist }) =>
    isOnWatchlist ? 'var(--color-orange)' : 'var(--color-green)'};
  background: var(--color-black);
  border: 2px solid
    ${({ isOnWatchlist }) =>
      isOnWatchlist ? 'var(--color-orange)' : 'var(--color-green)'};
  border-radius: var(--border-radius);
  opacity: ${({ isOnWatchlist }) => (isOnWatchlist ? '0.5' : '1')};
  padding: 4px;
  margin: 8px 0 0 0;
`

const iconStyle = css`
  ${StyledButton}color: ${({ isOnWatchlist }) =>
    isOnWatchlist ? 'var(--color-orange)' : 'var(--color-green)'};
  width: 12px;
  height: 12px;
  margin-right: 4px;
`

const StyledIconPlus = styled(IconPlus)`
  ${iconStyle}
`
const StyledIconMinus = styled(IconMinus)`
  ${iconStyle}
`
