import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import useSeasons from '../hooks/useSeasons'
import ButtonSeason from './ButtonSeason'
import EpisodeCard from './EpisodeCard'
import Poster from './Poster'

SeasonsList.propTypes = {
  seriesSeasons: PropTypes.array.isRequired,
  isOnWatchlist: PropTypes.bool.isRequired,
}

export default function SeasonsList({ seriesSeasons, isOnWatchlist }) {
  const {
    currentSeason,
    currentSeasonNumber,
    currentEpisodes,
    setCurrentSeasonNumber,
    setCurrentEpisodes,
  } = useSeasons(seriesSeasons)

  return (
    <Wrapper>
      <Navigation>
        {seriesSeasons.map(({ season_number: seasonNumber, name }) => (
          <ButtonSeason
            key={seasonNumber}
            name={name}
            onClick={() => handleOnClick(seasonNumber)}
            isActive={seasonNumber === currentSeasonNumber}
          />
        ))}
      </Navigation>
      {currentSeason && (
        <SeasonMeta>
          <Poster
            path={
              currentSeason.poster_path !== undefined &&
              currentSeason.poster_path
                ? `https://image.tmdb.org/t/p/w300${currentSeason.poster_path}`
                : '../poster.png'
            }
            alt={`Poster von ${currentSeason.name}`}
          />
          {
            <SeasonMetaInfo>
              <h3>{currentSeason.name}</h3>
              <div>
                <i>Ausstrahlung:</i>{' '}
                <strong>{formatDate(currentSeason.air_date)}</strong>
              </div>
              <div>
                <i>Episoden:</i>{' '}
                <strong>{currentSeason.episodes.length}</strong>
              </div>
            </SeasonMetaInfo>
          }
        </SeasonMeta>
      )}
      <StyledList>
        {currentEpisodes &&
          currentEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isOnWatchlist={isOnWatchlist}
              handleCheckEpisode={() => handleCheckEpisode(episode.id)}
            />
          ))}
      </StyledList>
    </Wrapper>
  )

  function handleOnClick(seasonNumber) {
    setCurrentSeasonNumber(seasonNumber)
  }

  function handleCheckEpisode(id) {
    const index = currentEpisodes.findIndex(el => el.id === Number(id))
    const entryToUpdate = currentEpisodes[index]

    setCurrentEpisodes([
      ...currentEpisodes.slice(0, index),
      { ...entryToUpdate, isWatched: !entryToUpdate.isWatched },
      ...currentEpisodes.slice(index + 1),
    ])
  }

  function formatDate(date) {
    return date.split('-').reverse().join('.')
  }
}

const Wrapper = styled.div``

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`

const SeasonMeta = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  h3 {
    margin-top: 0;
  }
`

const SeasonMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledList = styled.ul`
  padding: 0;
  list-style-type: none;
`
