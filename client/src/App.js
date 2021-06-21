import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import PosterList from './components/PosterList'
import SeriesDetailsPage from './pages/SeriesDetailsPage'
import getPopular from './services/getPopular'
import getSeriesDetails from './services/getSeriesDetails'

export default function App() {
  const [series, setSeries] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [watchedEpisodes, setWatchedEpisodes] = useState([])

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
    const onWatchlist = series.filter(el => el.isOnWatchlist)
    setWatchlist(onWatchlist)
  }, [series])

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
              handleCheckEpisode={handleCheckEpisode}
              checkIsEpisodeWatched={checkIsEpisodeWatched}
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
    const index = series.findIndex(el => el.id === Number(id))
    const entryToUpdate = series[index]

    setSeries([
      ...series.slice(0, index),
      { ...entryToUpdate, isOnWatchlist: !entryToUpdate.isOnWatchlist },
      ...series.slice(index + 1),
    ])
  }

  function handleCheckEpisode(id) {
    const checkIfOnList = watchedEpisodes.some(el => el === id)

    if (checkIfOnList) {
      const index = watchedEpisodes.findIndex(el => el === id)
      setWatchedEpisodes([
        ...watchedEpisodes.slice(0, index),
        ...watchedEpisodes.slice(index + 1),
      ])
    } else {
      setWatchedEpisodes([...watchedEpisodes, id])
    }
  }

  function checkIsEpisodeWatched(id) {
    return watchedEpisodes.some(el => el === id)
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
