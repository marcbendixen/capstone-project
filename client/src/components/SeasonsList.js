import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import ButtonSeason from './ButtonSeason'
import EpisodeCard from './EpisodeCard'
import Poster from './Poster'

SeasonsList.propTypes = {
  seriesSeasons: PropTypes.array.isRequired,
  seriesIsOnWatchlist: PropTypes.bool.isRequired,
  checkIsEpisodeWatched: PropTypes.func.isRequired,
  onCheckEpisode: PropTypes.func.isRequired,
}

export default function SeasonsList({
  seriesSeasons,
  seriesIsOnWatchlist,
  checkIsEpisodeWatched,
  onCheckEpisode,
}) {
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1)
  const currentSeason = seriesSeasons?.find(
    ({ season_number: seasonNumber }) => seasonNumber === currentSeasonNumber
  )
  const {
    poster_path: posterPath,
    name,
    air_date: airDate,
    episodes,
  } = currentSeason
  const currentEpisodes = currentSeason?.episodes

  return (
    <section>
      <StyledNavigation>
        {seriesSeasons.map(({ id, season_number: seasonNumber, name }) => (
          <ButtonSeason
            key={id}
            name={name}
            onClick={() => handleSwitchSeason(seasonNumber)}
            isActive={seasonNumber === currentSeasonNumber}
          />
        ))}
      </StyledNavigation>
      {currentSeason && (
        <StyledContainer>
          <Poster
            path={
              posterPath !== undefined && posterPath
                ? `https://image.tmdb.org/t/p/w300${posterPath}`
                : '../poster.png'
            }
            alt={`Poster von ${name}`}
          />
          {
            <StyledMetaInfo>
              <StyledHeadline>{name}</StyledHeadline>
              <span>
                <i>Ausstrahlung:</i> <strong>{formatDate(airDate)}</strong>
              </span>
              <span>
                <i>Episoden:</i> <strong>{episodes.length}</strong>
              </span>
            </StyledMetaInfo>
          }
        </StyledContainer>
      )}
      <StyledList>
        {currentEpisodes &&
          currentEpisodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              seriesIsOnWatchlist={seriesIsOnWatchlist}
              isEpisodeWatched={checkIsEpisodeWatched(episode.id)}
              onCheckEpisode={onCheckEpisode}
            />
          ))}
      </StyledList>
    </section>
  )

  function handleSwitchSeason(seasonNumber) {
    setCurrentSeasonNumber(seasonNumber)
  }

  function formatDate(date) {
    return date.split('-').reverse().join('.')
  }
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const StyledMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHeadline = styled.h3`
  margin: 0 0 8px 0;
`

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`
