import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
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
  margin-bottom: 16px;
  padding: 16px 0 16px 24px;
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--color-black);
  z-index: 9;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  margin: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: #d8e0e8;

  :visited {
    color: #d8e0e8;
  }

  :hover {
    color: #fff;
  }

  &.active {
    color: #fff;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }

  svg {
    position: absolute;
    left: -24px;
    width: 16px;
    height: 16px;
  }
`

const StyledIconSearch = styled(IconSearch)`
  color: var(--color-blue);
`

const StyledIconFire = styled(IconFire)`
  color: var(--color-orange);
`

const StyledIconList = styled(IconList)`
  color: var(--color-green);
`
