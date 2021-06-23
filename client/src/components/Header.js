import styled from 'styled-components'
import Navigation from './Navigation'

export default function Header() {
  return (
    <StyledHeader>
      <h1>Serientracker</h1>
      <Navigation />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`
