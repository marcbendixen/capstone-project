import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import ButtonEpisodeCheck from './ButtonEpisodeCheck'

EpisodeCard.propTypes = {
  episode: PropTypes.object.isRequired,
  seriesIsOnWatchlist: PropTypes.bool.isRequired,
  isEpisodeWatched: PropTypes.bool.isRequired,
  onCheckEpisode: PropTypes.func.isRequired,
}

export default function EpisodeCard({
  episode,
  seriesIsOnWatchlist,
  isEpisodeWatched,
  onCheckEpisode,
}) {
  const { name, episode_number: episodeNumber, overview, id } = episode

  return (
    <Wrapper isEpisodeWatched={isEpisodeWatched}>
      <Heading>
        <StyledEpisodeNumber
          isEpisodeWatched={isEpisodeWatched && seriesIsOnWatchlist}
        >
          {episodeNumber}
        </StyledEpisodeNumber>
        <h4>{name}</h4>
        {seriesIsOnWatchlist && (
          <ButtonEpisodeCheck
            id={id}
            isEpisodeWatched={isEpisodeWatched}
            onCheckEpisode={onCheckEpisode}
          />
        )}
      </Heading>
      <p>{overview}</p>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 4px;
  background: #3c4b5b;
  margin-bottom: 16px;
  position: relative;

  p {
    margin: 0;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  margin-bottom: 4px;

  h4 {
    margin: 0;
  }
`

const StyledEpisodeNumber = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #14171a;
  width: calc(2ch + 16px);
  text-align: center;
  background-color: #38b4f2;
  background-color: ${props =>
    props.isEpisodeWatched ? '#01dc4a' : '#38b4f2'};
  padding: 4px 8px;
  border-radius: 4px;
`
