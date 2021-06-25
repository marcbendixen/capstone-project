import { useEffect, useState } from 'react'
import getSeriesCredits from '../services/getSeriesCredits'

export default function useSeriesCredits(id) {
  const [cast, setCast] = useState([])

  useEffect(() => {
    getSeriesCredits(id)
      .then(data => {
        setCast(data.cast)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [id])

  return { cast }
}
