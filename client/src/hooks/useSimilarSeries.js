import { useEffect, useState } from 'react'
import getSimilarSeries from '../services/getSimilarSeries'

export default function useSimilarSeries(id) {
  const [similarSeries, setSimilarSeries] = useState([])

  useEffect(() => {
    getSimilarSeries(id)
      .then(data => {
        setSimilarSeries(data.results.slice(0, 12))
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [id])

  return { similarSeries }
}
