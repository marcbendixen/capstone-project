import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
        rgba(56, 180, 242, 1) 0%,
        rgba(1, 220, 74, 1) 50%,
        rgba(255, 117, 0, 1) 100%
      );
    }
  }
`
