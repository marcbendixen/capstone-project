import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
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
        <Header />
      </Route>
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
  margin-bottom: 32px;
`

const StyledParagraph = styled.p`
  text-align: center;
`
