import PropTypes from 'prop-types'
import { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { ReactComponent as IconChevronDown } from '../assets/icons/chevron-down.svg'
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
    <StyledListItem isEpisodeWatched={isEpisodeWatched}>
      <StyledContainer isCollapsed={isCollapsed}>
        <StyledEpisodeNumber
          isEpisodeWatched={isEpisodeWatched && seriesIsOnWatchlist}
        >
          {episodeNumber}
        </StyledEpisodeNumber>
        <StyledHeadline>{name}</StyledHeadline>
        {overview !== '' && (
          <StyledCollapseButton
            onClick={handleIsCollapsed}
            isCollapsed={isCollapsed}
          >
            <StyledIconChevronDown />
          </StyledCollapseButton>
        )}
        {seriesIsOnWatchlist && (
          <ButtonEpisodeCheck
            id={id}
            isEpisodeWatched={isEpisodeWatched}
            onCheckEpisode={onCheckEpisode}
          />
        )}
      </StyledContainer>
      {overview !== '' && (
        <StyledParagraph isCollapsed={isCollapsed}>{overview}</StyledParagraph>
      )}
    </StyledListItem>
  )

  function handleIsCollapsed() {
    setIsCollapsed(!isCollapsed)
  }
}

const StyledListItem = styled.li`
  display: grid;
  background: var(--color-gray-blue);
  border-radius: var(--border-radius);
  padding: 8px;
  margin-bottom: 8px;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ isCollapsed }) => (isCollapsed ? '0' : '4px')};
`

const StyledEpisodeNumber = styled.span`
  font-weight: 700;
  text-align: center;
  color: var(--color-black);
  width: calc(2ch + 16px);
  background: ${props =>
    props.isEpisodeWatched ? 'var(--color-green)' : 'var(--color-blue)'};
  border-radius: var(--border-radius);
  padding: 4px 8px;
`

const StyledHeadline = styled.h4`
  font-size: 1.05rem;
  margin: 0;
`

const StyledCollapseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-black);
  padding: 0;
  border: none;
  background: none;

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      svg {
        transform: scaleY(1);
      }
    `}
`

const StyledIconChevronDown = styled(IconChevronDown)`
  width: 18px;
  height: auto;
  transform: scaleY(-1);
`

const StyledParagraph = styled.p`
  display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};
  height: 100%;
  margin: 0;
`
