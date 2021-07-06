import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import Navigation from './Navigation'

export default function Header() {
  return (
    <>
      <StyledHeader>
        <StyledNavLink to="/">
          <StyledHeading>Serientracker</StyledHeading>
        </StyledNavLink>
      </StyledHeader>
      <Navigation />
    </>
  )
}

const StyledHeader = styled.header`
  display: grid;
  justify-items: center;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`

const StyledHeading = styled.h1`
  position: relative;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      90deg,
      var(--color-blue) 0%,
      var(--color-green) 50%,
      var(--color-orange) 100%
    );
  }
`
