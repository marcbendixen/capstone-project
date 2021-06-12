import { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
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
      <Route exact path={['/', '/watchlist']}>
        <h1>Serientracker</h1>
        <Navigation>
          <StyledLink to="/">Beliebt</StyledLink>
          <StyledLink to="/watchlist">Watchlist</StyledLink>
        </Navigation>
      </Route>
      <Switch>
        <Route exact path="/">
          <PosterList list={popularSeries} />
        </Route>
        <Route exact path="/serie/:id">
          <SeriesDetailsPage
            handleWatchlist={handleWatchlist}
            watchlist={watchlist}
          />
        </Route>
        <Route exact path="/watchlist">
          {watchlist.length === 0 ? (
            <p>
              <em>Du hast noch keine Serie(n) auf deiner Watchlist.</em>
            </p>
          ) : (
            <>
              <p>
                Du hast <strong>{watchlist.length}</strong> Serie
                {watchlist.length > 1 && 'n'} auf deiner Watchlist.
              </p>
              <PosterList list={watchlist} />
            </>
          )}
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

const Navigation = styled.nav`
  display: flex;
  margin-bottom: 8px;
`

const StyledLink = styled(Link)`
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
`
