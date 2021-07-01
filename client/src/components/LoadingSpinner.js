import ScaleLoader from 'react-spinners/ScaleLoader'
import styled from 'styled-components/macro'

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <ScaleLoader color={'var(--color-blue)'} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
`
