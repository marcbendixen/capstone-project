import { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as IconChartBar } from '../assets/icons/chart-bar-solid.svg'
import PosterList from '../components/PosterList'
import { getLocalStorage } from '../utils/localStorage'

export default function WatchlistPage({ watchlist }) {
  const [showStats, setShowStats] = useState(false)
  return (
    <Wrapper>
      {watchlist.length === 0 ? (
        <StyledParagraph>
          <i>Du hast noch keine Serie auf deiner Watchlist.</i>
        </StyledParagraph>
      ) : (
        <>
          <StyledStatsButton onClick={handleToggleStats} isActive={showStats}>
            <IconChartBar />
            <span>Statistiken {showStats ? 'ausblenden' : 'einblenden'}</span>
          </StyledStatsButton>
          <StyledStatsParagraph isActive={showStats}>
            <p>
              Du hast <strong>{calcTotalSeries()}</strong> Serie
              {calcTotalSeries() > 1 && 'n'} auf deiner Watchlist.
              <br />
              Das macht insgesamt <strong>{calcTotalSeasons()}</strong> Staffel
              {calcTotalSeasons() > 1 && 'n'},{' '}
              <strong>{calcTotalEpisodes()}</strong> Episode
              {calcTotalEpisodes() > 1 && 'n'} und{' '}
              <strong>{calcTotalWatchtime()}</strong> Minuten oder{' '}
              <strong>{(calcTotalWatchtime() / 60).toFixed(2)}</strong> Stunden.
              {calcTotalEpisodesWatched() >= 0 && (
                <>
                  <br />
                  Von <strong>{calcTotalEpisodes()}</strong> Episode
                  {calcTotalEpisodes() > 1 && 'n'} hast du{' '}
                  <strong>{calcTotalEpisodesWatched()}</strong> als gesehen
                  markiert. Das sind{' '}
                  <strong>{calcPercentageEpisodesWatched()}%</strong>.
                </>
              )}
            </p>
            <BarWrapper>
              <BarWatchedEpisodes
                percentageWatched={calcPercentageEpisodesWatched()}
              ></BarWatchedEpisodes>
              <BarNotWatchedEpisodes
                percentageNotWatched={calcPercentageEpisodesNotWatched()}
              ></BarNotWatchedEpisodes>
            </BarWrapper>
          </StyledStatsParagraph>
          <PosterList list={watchlist} />
        </>
      )}
    </Wrapper>
  )

  function handleToggleStats() {
    setShowStats(!showStats)
  }

  function calcTotalSeries() {
    return watchlist.length
  }

  function calcTotalSeasons() {
    return watchlist.reduce(function (prev, cur) {
      return prev + cur.number_of_seasons
    }, 0)
  }

  function calcTotalEpisodes() {
    return watchlist.reduce(function (prev, cur) {
      return prev + cur.number_of_episodes
    }, 0)
  }

  function calcTotalEpisodesWatched() {
    const episodes = getLocalStorage('watchedEpisodesIds')
    return episodes.length
  }

  function calcPercentageEpisodesWatched() {
    return ((calcTotalEpisodesWatched() / calcTotalEpisodes()) * 100).toFixed(2)
  }

  function calcPercentageEpisodesNotWatched() {
    return 100 - calcPercentageEpisodesWatched()
  }

  function calcTotalWatchtime() {
    return watchlist.reduce(function (prev, cur) {
      return prev + cur.number_of_episodes * cur.episode_run_time[0]
    }, 0)
  }
}

const BarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 12px;
  margin-top: 4px;
`

const BarWatchedEpisodes = styled.div`
  width: ${props => props.percentageWatched + '%'};
  background: var(--color-green);
`

const BarNotWatchedEpisodes = styled.div`
  width: ${props => props.percentageNotWatched + '%'};
  background: var(--color-orange);
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledStatsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: ${props =>
    props.isActive ? 'var(--color-orange)' : 'var(--color-blue)'};
  font-family: inherit;
  cursor: pointer;
  margin-bottom: ${props => (props.isActive ? '8px' : '16px')};

  svg {
    width: 24px;
    height: auto;
  }
`

const StyledStatsParagraph = styled.div`
  display: ${props => (props.isActive ? 'block' : 'none')};
  text-align: center;
  margin: 0 16px 16px 16px;

  p {
    margin: 0;
    padding: 0 8px;
  }
`

const StyledParagraph = styled.p`
  text-align: center;
  padding: 0 8px;
`
