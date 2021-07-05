import { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as IconChartBar } from '../assets/icons/chart-bar.svg'
import PosterList from '../components/PosterList'
import { getLocalStorage } from '../utils/localStorage'

export default function WatchlistPage({ watchlist }) {
  const [showStats, setShowStats] = useState(false)

  return (
    <StyledContainer>
      {watchlist.length === 0 ? (
        <StyledParagraph>
          <i>Du hast noch keine Serie auf deiner Watchlist.</i>
        </StyledParagraph>
      ) : (
        <>
          <StyledButtonStats onClick={handleToggleStats} isActive={showStats}>
            <StyledIconChartBar />
            Statistiken {showStats ? 'ausblenden' : 'einblenden'}
          </StyledButtonStats>
          <StyledStatsWrapper isActive={showStats}>
            <StyledParagraph>
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
            </StyledParagraph>
            <StyledBarWrapper>
              <StyledBarWatched
                percentageWatched={calcPercentageEpisodesWatched()}
              ></StyledBarWatched>
              <StyledBarNotWatched
                percentageNotWatched={calcPercentageEpisodesNotWatched()}
              ></StyledBarNotWatched>
            </StyledBarWrapper>
          </StyledStatsWrapper>
          <PosterList list={watchlist} />
        </>
      )}
    </StyledContainer>
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

const StyledContainer = styled.div`
  display: grid;
  justify-items: center;
`

const StyledParagraph = styled.p`
  text-align: center;
  padding: 0 8px;
  margin: 0;
`

const StyledButtonStats = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  color: ${({ isActive }) =>
    isActive ? 'var(--color-orange)' : 'var(--color-blue)'};
  background: transparent;
  border: none;
  margin-bottom: ${({ isActive }) => (isActive ? '8px' : '16px')};
`

const StyledIconChartBar = styled(IconChartBar)`
  width: 24px;
  height: auto;
`

const StyledStatsWrapper = styled.div`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  margin: 0 16px 16px 16px;
`

const StyledBarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 12px;
  margin-top: 4px;
`

const StyledBarWatched = styled.div`
  width: ${({ percentageWatched }) => percentageWatched + '%'};
  background: var(--color-green);
`

const StyledBarNotWatched = styled.div`
  width: ${({ percentageNotWatched }) => percentageNotWatched + '%'};
  background: var(--color-orange);
`
