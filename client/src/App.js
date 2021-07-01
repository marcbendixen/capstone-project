import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import PosterList from './components/PosterList'
import useEpisodes from './hooks/useEpisodes'
import useSeries from './hooks/useSeries'
import useWatchlist from './hooks/useWatchlist'
import SearchPage from './pages/SearchPage'
import SeriesDetailsPage from './pages/SeriesDetailsPage'
import WatchlistPage from './pages/WatchlistPage'

export default function App() {
  const { series, handleNewSeries, isLoading } = useSeries()
  const { watchlist, handleWatchlist, checkIsOnWatchlist } = useWatchlist()
  const { handleCheckEpisode, checkIsEpisodeWatched } = useEpisodes()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Container>
      <Route exact path={['/', '/suche', '/watchlist']}>
        <Header />
      </Route>
      <StyledMain>
        <Switch>
          <Route exact path="/">
            <StyledText>
              Mit dem <StyledBrand href="/">Serientracker</StyledBrand> kannst
              du deinen Serien folgen und alle Episoden tracken, um immer zu
              wissen, wo du stehen geblieben bist.
            </StyledText>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <PosterList list={series.filter(el => el.isPopular)} />
            )}
          </Route>
          <Route exact path="/suche">
            <SearchPage />
          </Route>
          <Route exact path="/serie/:id">
            <SeriesDetailsPage
              series={series}
              handleNewSeries={handleNewSeries}
              handleWatchlist={handleWatchlist}
              onCheckEpisode={handleCheckEpisode}
              checkIsEpisodeWatched={checkIsEpisodeWatched}
              checkIsOnWatchlist={checkIsOnWatchlist}
            />
          </Route>
          <Route exact path="/watchlist">
            <WatchlistPage watchlist={watchlist} />
          </Route>
          <Route>404 not found</Route>
        </Switch>
      </StyledMain>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 768px;
  width: 100%;
  margin-bottom: 32px;
`

const StyledMain = styled.main`
  width: 100%;
`

const StyledText = styled.p`
  margin: 0 0 16px 0;
  padding: 0 8px;
  text-align: center;
`

const StyledBrand = styled.a`
  position: relative;
  text-decoration: none;
  font-family: 'Domine', 'Times New Roman', serif;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--color-blue) 0%,
      var(--color-green) 50%,
      var(--color-orange) 100%
    );
  }
`
