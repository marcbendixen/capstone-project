import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import PosterList from './components/PosterList'
import SeriesDetailsPage from './pages/SeriesDetailsPage'
import getPopular from './services/getPopular'
import getSeriesDetails from './services/getSeriesDetails'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'

export default function App() {
  const [series, setSeries] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [watchlistIds, setWatchlistIds] = useState(
    getLocalStorage('watchlistIds') ?? []
  )
  const [watchedEpisodesIds, setWatchedEpisodesIds] = useState(
    getLocalStorage('watchedEpisodesIds') ?? []
  )

  console.log('WATCHLIST: ', watchlist)

  useEffect(() => {
    series.length === 0 &&
      getPopular()
        .then(data => {
          Promise.all(
            data.results.map(({ id }) =>
              getSeriesDetails(id).then(
                data => (data = { ...data, isPopular: true })
              )
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
    setLocalStorage('watchedEpisodesIds', watchedEpisodesIds)
  }, [watchedEpisodesIds])

  useEffect(() => {
    setLocalStorage('watchlistIds', watchlistIds)
  }, [watchlistIds])

  useEffect(() => {
    Promise.all(
      watchlistIds.map(id => getSeriesDetails(id).then(data => data))
    ).then(data => setWatchlist(data.reverse()))
  }, [watchlistIds])

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

  function handleNewSeries(data) {
    setSeries([...series, data])
  }

  function handleWatchlist(id) {
    const seriesId = Number(id)
    const isOnList = watchlistIds.some(el => el === seriesId)

    if (isOnList) {
      const indexToRemove = watchlistIds.findIndex(el => el === seriesId)
      setWatchlistIds([
        ...watchlistIds.slice(0, indexToRemove),
        ...watchlistIds.slice(indexToRemove + 1),
      ])
    } else {
      setWatchlistIds([...watchlistIds, seriesId])
    }
  }

  function handleCheckEpisode(episodeId) {
    const isOnList = watchedEpisodesIds.some(el => el === episodeId)

    if (isOnList) {
      const indexToRemove = watchedEpisodesIds.findIndex(el => el === episodeId)
      setWatchedEpisodesIds([
        ...watchedEpisodesIds.slice(0, indexToRemove),
        ...watchedEpisodesIds.slice(indexToRemove + 1),
      ])
    } else {
      setWatchedEpisodesIds([...watchedEpisodesIds, episodeId])
    }
  }

  function checkIsEpisodeWatched(id) {
    return watchedEpisodesIds.some(el => el === id)
  }

  function checkIsOnWatchlist(id) {
    return watchlistIds.some(el => el === Number(id))
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
  width: 100%;
  margin-bottom: 32px;
`

const StyledMain = styled.main`
  width: 100%;
`

const StyledParagraph = styled.p`
  text-align: center;
`
