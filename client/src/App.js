import { useEffect, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import PosterList from './components/PosterList'
import SeriesDetailsPage from './pages/SeriesDetailsPage'

export default function App() {
  const [series, setSeries] = useState([])
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    series.length === 0 &&
      fetch('/api/series/popular')
        .then(res => res.json())
        .then(data => {
          Promise.all(
            data.results.map(({ id }) =>
              fetch(`/api/series/${id}`)
                .then(res => res.json())
                .then(data => (data = { ...data, isPopular: true }))
            )
          ).then(data => {
            setSeries(data)
          })
        })
        .catch(error => {
          console.error('Error:', error)
        })
  }, [series])

  useEffect(() => {
    const onWatchlist = series.filter(el => el.isOnWatchlist)
    setWatchlist(onWatchlist)
  }, [series])

  return (
    <Container>
      <Route exact path={['/', '/watchlist']}>
        <h1>Serientracker</h1>
        <Navigation>
          <StyledLink exact to="/" activeClassName="active">
            Beliebt
          </StyledLink>
          <StyledLink exact to="/watchlist" activeClassName="active">
            Watchlist
          </StyledLink>
        </Navigation>
      </Route>
      <Switch>
        <Route exact path="/">
          <PosterList list={series.filter(el => el.isPopular)} />
        </Route>
        <Route exact path="/serie/:id">
          <SeriesDetailsPage
            series={series}
            watchlist={watchlist}
            handleNewSeries={handleNewSeries}
            handleWatchlist={handleWatchlist}
          />
        </Route>
        <Route exact path="/watchlist">
          {watchlist.length === 0 ? (
            <p>
              <em>Du hast noch keine Serie auf deiner Watchlist.</em>
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

  function handleNewSeries(data) {
    setSeries([...series, data])
  }

  function handleWatchlist(id) {
    const index = series.findIndex(el => el.id === Number(id))
    const entryToUpdate = series[index]

    setSeries([
      ...series.slice(0, index),
      { ...entryToUpdate, isOnWatchlist: !entryToUpdate.isOnWatchlist },
      ...series.slice(index + 1),
    ])
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
  margin-bottom: 16px;
`

const StyledLink = styled(NavLink)`
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

  &.active {
    color: #fff;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }
`
