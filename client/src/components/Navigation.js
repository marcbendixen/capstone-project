import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'
import { ReactComponent as IconFire } from '../assets/icons/fire.svg'
import { ReactComponent as IconList } from '../assets/icons/list.svg'
import { ReactComponent as IconSearch } from '../assets/icons/search.svg'

export default function Navigation() {
  return (
    <StyledNavigation>
      <StyledNavLink exact to="/suche" activeClassName="active">
        <StyledIconSearch />
        Suche
      </StyledNavLink>
      <StyledNavLink exact to="/" activeClassName="active">
        <StyledIconFire />
        Beliebt
      </StyledNavLink>
      <StyledNavLink exact to="/watchlist" activeClassName="active">
        <StyledIconList />
        Watchlist
      </StyledNavLink>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 0 16px 24px;
  margin-bottom: 16px;
  background: var(--color-black);
  z-index: 9;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.071em;
  text-transform: uppercase;
  text-decoration: none;
  color: #d8e0e8;
  margin: 8px 16px;

  :visited {
    color: #d8e0e8;
  }

  :hover {
    color: #fff;
  }

  &.active {
    color: #fff;

    ::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }
`

const iconStyle = css`
  position: absolute;
  left: -24px;
  width: 16px;
  height: 16px;
`

const StyledIconSearch = styled(IconSearch)`
  ${iconStyle}
  color: var(--color-blue);
`

const StyledIconFire = styled(IconFire)`
  ${iconStyle}
  color: var(--color-orange);
`

const StyledIconList = styled(IconList)`
  ${iconStyle}
  color: var(--color-green);
`
