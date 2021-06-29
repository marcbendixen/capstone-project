import PropTypes from 'prop-types'
import { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { ReactComponent as IconChevronDown } from '../assets/icons/chevron-down-solid.svg'
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
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <Wrapper isEpisodeWatched={isEpisodeWatched}>
      <HeadingContainer>
        <StyledEpisodeNumber
          isEpisodeWatched={isEpisodeWatched && seriesIsOnWatchlist}
        >
          {episodeNumber}
        </StyledEpisodeNumber>
        <h4>{name}</h4>
        {overview !== '' && (
          <StyledCollapseButton
            onClick={handleIsCollapsed}
            isCollapsed={isCollapsed}
          >
            <IconChevronDown />
          </StyledCollapseButton>
        )}
        {seriesIsOnWatchlist && (
          <ButtonEpisodeCheck
            id={id}
            isEpisodeWatched={isEpisodeWatched}
            onCheckEpisode={onCheckEpisode}
          />
        )}
      </HeadingContainer>
      {overview !== '' && (
        <StyledOverview isCollapsed={isCollapsed}>{overview}</StyledOverview>
      )}
    </Wrapper>
  )

  function handleIsCollapsed() {
    setIsCollapsed(!isCollapsed)
  }
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 4px;
  background: var(--color-gray-blue);
  margin-bottom: 16px;
  position: relative;
`

const StyledCollapseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: auto;
  padding: 0;
  border: none;
  background: none;
  text-decoration: none;
  cursor: pointer;
  color: var(--color-black);

  svg {
    width: 100%;
    height: 100%;
    transform: scaleY(-1);
  }

  ${props =>
    props.isCollapsed &&
    css`
      svg {
        transform: scaleY(1);
      }
    `}
`

const StyledOverview = styled.p`
  display: ${props => (props.isCollapsed ? 'none' : 'block')};
  height: 100%;
  margin: 0;
`

const HeadingContainer = styled.div`
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
  color: var(--color-black);
  width: calc(2ch + 16px);
  text-align: center;
  background-color: var(--color-blue);
  background-color: ${props =>
    props.isEpisodeWatched ? 'var(--color-green)' : 'var(--color-blue)'};
  padding: 4px 8px;
  border-radius: 4px;
`
