import { useEffect } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconGhost } from './assets/icons/ghost.svg'
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
    <StyledAppContainer>
      <Route exact path={['/', '/suche', '/watchlist']}>
        <Header />
      </Route>
      <StyledMain>
        <Switch>
          <Route exact path="/">
            <StyledParagraph>
              Mit dem <StyledLink href="/">Serientracker</StyledLink> kannst du
              deinen Serien folgen und alle Episoden tracken, um immer zu
              wissen, wo du stehen geblieben bist.
            </StyledParagraph>
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
          <Route>
            <StyledNotFound>
              <Header />
              <h2>404 not found</h2>
              <p>
                Huch, die Seite konnte leider nicht gefunden werden. Versuche es
                doch mal über die <Link to="/suche">Suche</Link>.
              </p>
              <StyledIconGhost />
            </StyledNotFound>
          </Route>
        </Switch>
      </StyledMain>
    </StyledAppContainer>
  )
}

const StyledAppContainer = styled.div`
  display: grid;
  justify-items: center;
  max-width: 768px;
  width: 100%;
  margin-bottom: 80px;
`

const StyledMain = styled.main`
  width: 100%;
`

const StyledParagraph = styled.p`
  margin: 0 0 16px 0;
  padding: 0 8px;
  text-align: center;
`

const StyledLink = styled.a`
  position: relative;
  font-family: 'Domine', 'Times New Roman', serif;
  text-decoration: none;
  z-index: 0;

  ::after {
    content: '';
    position: absolute;
    bottom: -2px;
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

const StyledNotFound = styled.section`
  display: grid;
  justify-items: center;
  gap: 16px;
  text-align: center;

  h2,
  p {
    margin: 0;
    padding: 0 16px;
  }
`

const StyledIconGhost = styled(IconGhost)`
  width: 160px;
  height: auto;
  color: var(--color-gray-blue);
`
