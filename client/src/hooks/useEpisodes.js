import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export default function useEpisodes() {
  const [watchedEpisodesIds, setWatchedEpisodesIds] = useState(
    getLocalStorage('watchedEpisodesIds') ?? []
  )

  useEffect(() => {
    setLocalStorage('watchedEpisodesIds', watchedEpisodesIds)
  }, [watchedEpisodesIds])

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

  return { handleCheckEpisode, checkIsEpisodeWatched }
}
