import { Route, Switch } from 'react-router-dom'
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
  const {
    watchlist,
    handleWatchlist,
    checkIsOnWatchlist,
    isLoadingWatchlist,
  } = useWatchlist()
  const { handleCheckEpisode, checkIsEpisodeWatched } = useEpisodes()

  return (
    <Container>
      <Route exact path={['/', '/suche', '/watchlist']}>
        <Header />
      </Route>
      <StyledMain>
        <Switch>
          <Route exact path="/">
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
            {isLoadingWatchlist ? (
              <LoadingSpinner />
            ) : (
              <WatchlistPage watchlist={watchlist} />
            )}
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
