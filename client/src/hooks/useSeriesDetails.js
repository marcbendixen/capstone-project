import { useEffect, useState } from 'react'
import getSeason from '../services/getSeason'
import getSeriesDetails from '../services/getSeriesDetails'

export default function useSeriesDetails(id, series, handleNewSeries) {
  const [seriesDetails, setSeriesDetails] = useState([])
  const [seriesSeasons, setSeriesSeasons] = useState([])
  const isLoading = seriesDetails.length === 0 || seriesSeasons.length === 0

  useEffect(() => {
    const findItem = series.find(el => el.id === Number(id))

    if (findItem) {
      setSeriesDetails(findItem)
      fetchSeasonDetails(findItem)
    } else {
      getSeriesDetails(id)
        .then(data => {
          setSeriesDetails(data)
          handleNewSeries(data)
          fetchSeasonDetails(data)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }

    async function fetchSeasonDetails(element) {
      const { id, seasons } = element

      const fetchData = Promise.all(
        seasons.map(({ season_number: seasonNumber }) =>
          getSeason(id, seasonNumber).then(data => data)
        )
      )
      const allSeasons = await fetchData
      setSeriesSeasons([...allSeasons])
    }
  }, [id, series, handleNewSeries])

  return {
    seriesDetails,
    seriesSeasons,
    handleNewSeries,
    isLoading,
  }
}
