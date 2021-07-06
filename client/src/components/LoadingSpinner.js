import ScaleLoader from 'react-spinners/ScaleLoader'
import styled from 'styled-components/macro'

export default function LoadingSpinner() {
  return (
    <StyledContainer>
      <ScaleLoader color={'var(--color-blue)'} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
`
