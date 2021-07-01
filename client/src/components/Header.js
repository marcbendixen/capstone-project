import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Navigation from './Navigation'

export default function Header() {
  return (
    <>
      <StyledHeader>
        <Link to="/">
          <h1>Serientracker</h1>
        </Link>
      </StyledHeader>
      <Navigation />
    </>
  )
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
  }

  h1 {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(
        90deg,
        var(--color-blue) 0%,
        var(--color-green) 50%,
        var(--color-orange) 100%
      );
    }
  }
`
