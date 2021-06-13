import { useEffect, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconFire } from './assets/icons/fire-solid.svg'
import { ReactComponent as IconList } from './assets/icons/list-solid.svg'
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
      <header>
        <Route exact path={['/', '/watchlist']}>
          <h1>Serientracker</h1>
          <Navigation>
            <StyledLink exact to="/" activeClassName="active">
              <StyledIconFire />
              Beliebt
            </StyledLink>
            <StyledLink exact to="/watchlist" activeClassName="active">
              <StyledIconList />
              Watchlist
            </StyledLink>
          </Navigation>
        </Route>
      </header>
      <main>
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
      </main>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
  width: 100%;
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 -8px 16px 8px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
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
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }

  svg {
    position: absolute;
    left: -24px;
    width: 16px;
    height: 16px;
  }
`

const StyledIconFire = styled(IconFire)`
  color: #ff7500;
`

const StyledIconList = styled(IconList)`
  color: #01dc4a;
`
