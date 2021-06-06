import styled from 'styled-components'
import PosterList from './components/PosterList'
import popularList from './example_data/popular.json'

export default function App() {
  return (
    <Container>
      <h1>Serientracker</h1>
      <h2>Beliebt</h2>
      <PosterList list={popularList.results} />
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin-bottom: 32px;
`
