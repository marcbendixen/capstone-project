import { useEffect, useState } from 'react'
import getPopular from '../services/getPopular'
import getSeriesDetails from '../services/getSeriesDetails'

export default function useSeries() {
  const [series, setSeries] = useState([])
  const isLoading = series.length === 0

  useEffect(() => {
    series.length === 0 &&
      getPopular()
        .then(data => {
          Promise.all(
            data.results.map(
              ({ id }) =>
                !checkIfOnBlacklist(id) &&
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

  function handleNewSeries(data) {
    setSeries([...series, data])
  }

  function checkIfOnBlacklist(id) {
    const blacklist = [94722, 124598]
    return blacklist.some(element => element === id)
  }

  return { series, handleNewSeries, isLoading }
}
