import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import PosterList from './components/PosterList'
import SeriesDetailsPage from './pages/SeriesDetailsPage'

export default function App() {
  const [popularSeries, setPopularSeries] = useState([])
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    fetch('/api/series/popular')
      .then(res => res.json())
      .then(data => {
        setPopularSeries(data.results)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <h1>Serientracker</h1>
          <h2>Beliebt</h2>
          <PosterList list={popularSeries} />
        </Route>
        <Route exact path="/serie/:id">
          <SeriesDetailsPage handleWatchlist={handleWatchlist} />
        </Route>
        <Route>404 not found</Route>
      </Switch>
    </Container>
  )

  function handleWatchlist(newEntry) {
    setWatchlist([...watchlist, newEntry])
  }
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 32px;
`
