import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import PosterList from './components/PosterList'

export default function App() {
  const [popularSeries, setPopularSeries] = useState([])

  useEffect(() => {
    fetch('/api/series/popular')
      .then(res => res.json())
      .then(data => setPopularSeries(data.results))
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <Container>
      <h1>Serientracker</h1>
      <h2>Beliebt</h2>
      <Switch>
        <Route exact path="/">
          <PosterList list={popularSeries} />
        </Route>
        <Route>404 not found</Route>
      </Switch>
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
