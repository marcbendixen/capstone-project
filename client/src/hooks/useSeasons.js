import { useEffect, useState } from 'react'

export default function useSeasons(seriesSeasons) {
  const [seasons, setSeasons] = useState(null)
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1)
  const [currentSeason, setCurrentSeason] = useState(null)
  const [currentEpisodes, setCurrentEpisodes] = useState(null)

  useEffect(() => {
    if (seriesSeasons.length > 0) {
      setSeasons(seriesSeasons)
    }
  }, [seriesSeasons])

  useEffect(() => {
    if (seasons) {
      const filteredSeason = seasons.find(
        ({ season_number: seasonNumber }) =>
          seasonNumber === currentSeasonNumber
      )
      setCurrentSeason(filteredSeason)
    }
  }, [seasons, currentSeasonNumber])

  useEffect(() => {
    if (currentSeason) {
      const episodes = currentSeason.episodes
      setCurrentEpisodes(episodes)
    }
  }, [currentSeason])

  return {
    currentSeason,
    currentSeasonNumber,
    currentEpisodes,
    setCurrentSeasonNumber,
    setCurrentEpisodes,
  }
}
