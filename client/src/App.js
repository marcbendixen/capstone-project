import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import PosterList from './components/PosterList'
import useEpisodes from './hooks/useEpisodes'
import useSeries from './hooks/useSeries'
import useWatchlist from './hooks/useWatchlist'
import SeriesDetailsPage from './pages/SeriesDetailsPage'

export default function App() {
  const { series, handleNewSeries } = useSeries()
  const { watchlist, handleWatchlist, checkIsOnWatchlist } = useWatchlist()
  const { handleCheckEpisode, checkIsEpisodeWatched } = useEpisodes()

  return (
    <Container>
      <Route exact path={['/', '/watchlist']}>
        <Header />
      </Route>
      <StyledMain>
        <Switch>
          <Route exact path="/">
            <PosterList list={series.filter(el => el.isPopular)} />
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
            {watchlist.length === 0 ? (
              <StyledParagraph>
                <i>Du hast noch keine Serie auf deiner Watchlist.</i>
              </StyledParagraph>
            ) : (
              <>
                <StyledParagraph>
                  Du hast <strong>{watchlist.length}</strong> Serie
                  {watchlist.length > 1 && 'n'} auf deiner Watchlist.
                </StyledParagraph>
                <PosterList list={watchlist} />
              </>
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

const StyledParagraph = styled.p`
  text-align: center;
`
