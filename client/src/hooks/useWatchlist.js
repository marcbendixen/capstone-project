import { useEffect, useState } from 'react'
import getSeriesDetails from '../services/getSeriesDetails'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([])
  const [watchlistIds, setWatchlistIds] = useState(
    getLocalStorage('watchlistIds') ?? []
  )
  const isLoadingWatchlist = watchlist.length === 0

  useEffect(() => {
    Promise.all(watchlistIds.map(id => getSeriesDetails(id).then(data => data)))
      .then(data => setWatchlist(data.reverse()))
      .catch(error => {
        console.error('Error:', error)
      })
  }, [watchlistIds])

  useEffect(() => {
    setLocalStorage('watchlistIds', watchlistIds)
  }, [watchlistIds])

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

  function checkIsOnWatchlist(id) {
    return watchlistIds.some(el => el === Number(id))
  }

  return { watchlist, handleWatchlist, checkIsOnWatchlist, isLoadingWatchlist }
}
