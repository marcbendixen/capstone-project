import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconChevronDown } from '../assets/icons/chevron-down-solid.svg'
import { ReactComponent as IconArrowLeft } from '../assets/icons/long-arrow-alt-left-solid.svg'
import ButtonWatchlist from '../components/ButtonWatchlist'
import Poster from '../components/Poster'
import SeasonsList from '../components/SeasonsList'
import useSeriesCredits from '../hooks/useSeriesCredits'
import useSeriesDetails from '../hooks/useSeriesDetails'

SeriesDetailsPage.propTypes = {
  series: PropTypes.array.isRequired,
  handleWatchlist: PropTypes.func.isRequired,
  handleNewSeries: PropTypes.func.isRequired,
  onCheckEpisode: PropTypes.func.isRequired,
  checkIsEpisodeWatched: PropTypes.func.isRequired,
  checkIsOnWatchlist: PropTypes.func.isRequired,
}

export default function SeriesDetailsPage({
  series,
  handleWatchlist,
  handleNewSeries,
  onCheckEpisode,
  checkIsEpisodeWatched,
  checkIsOnWatchlist,
}) {
  const { id } = useParams()
  const { seriesDetails, seriesSeasons } = useSeriesDetails(
    id,
    series,
    handleNewSeries
  )
  const { cast } = useSeriesCredits(id)
  const { name, poster_path: posterPath, overview } = seriesDetails
  const isOnWatchlist = checkIsOnWatchlist(id)
  const [isReadMore, setIsReadMore] = useState(false)

  return (
    <Wrapper>
      <BackButton to="/" aria-label="Zurück zur Startseite">
        <IconArrowLeft />
      </BackButton>
      <Header>
        <PosterWrapper>
          <Poster
            path={
              posterPath !== undefined
                ? `https://image.tmdb.org/t/p/w300${posterPath}`
                : '../poster.png'
            }
            alt={`Poster von ${name}`}
          />
        </PosterWrapper>
        <RightArea>
          <h1>{name}</h1>
          <ButtonWatchlist
            onClick={() => handleWatchlist(id)}
            isOnWatchlist={isOnWatchlist}
          />
        </RightArea>
      </Header>
      <OverviewWrapper>
        <Overview isReadMore={isReadMore}>
          {overview !== '' ? (
            overview
          ) : (
            <span>
              <em>
                Die Beschreibung der Serie ist leider noch nicht vorhanden.
                Bitte hab noch etwas Geduld und sieh später nochmal rein, danke
              </em>
              ✌️
            </span>
          )}
        </Overview>
        {overview !== '' && overview?.length >= 350 && (
          <ReadMoreButton onClick={handleReadMore} isReadMore={isReadMore}>
            <IconChevronDown />
          </ReadMoreButton>
        )}
      </OverviewWrapper>
      <h2>Staffeln</h2>
      <SeasonsList
        seriesSeasons={seriesSeasons}
        seriesIsOnWatchlist={isOnWatchlist}
        checkIsEpisodeWatched={checkIsEpisodeWatched}
        onCheckEpisode={onCheckEpisode}
      />
      <h2>Besetzung</h2>
      <List>
        {cast.map(({ id, profile_path: profilePath, name, character }) => (
          <ListItem key={id}>
            <img
              src={
                profilePath !== null
                  ? `https://image.tmdb.org/t/p/w200${profilePath}`
                  : '../profile.png'
              }
              alt={`Portait von ${name}`}
              width="200"
              height="300"
            />
            <div>
              <h4>{name}</h4>
              <span>{character}</span>
            </div>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )

  function handleReadMore() {
    setIsReadMore(!isReadMore)
  }
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  margin: 0;
  width: 100%;

  h2 {
    font-size: 1.25rem;
    margin: 16px 0 0 0;
  }
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-start;

  svg {
    width: 28px;
    height: auto;
  }
`

const Header = styled.header`
  display: flex;
  gap: 16px;

  h1 {
    margin: 0;
  }
`

const PosterWrapper = styled.div`
  max-width: 140px;
  width: 100%;
  height: auto;
`

const RightArea = styled.div`
  width: 100%;
`

const OverviewWrapper = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  min-width: 100%;
`

const Overview = styled.p`
  min-width: 100%;
  max-height: ${props => (props.isReadMore ? '100%' : '150px')};
  padding-bottom: ${props => (props.isReadMore ? '16px' : '0')};
  transition: all 0.02s ease-in-out;
  overflow: hidden;
`

const ReadMoreButton = styled.button`
  position: absolute;
  width: 100%;
  bottom: 0;
  background: ${props =>
    props.isReadMore
      ? 'transparent'
      : `linear-gradient(
    180deg,
    rgba(20, 23, 26, 0) 0%,
    rgba(20, 23, 26, 0.6) 20%,
    rgba(20, 23, 26, 0.8) 30%,
    rgba(20, 23, 26, 0.9) 45%,
    rgba(20, 23, 26, 1) 100%
  )`};
  border: none;
  color: #fff;
  padding: ${props => (props.isReadMore ? '32px 0 0 0' : '32px 0 24px 0')};
  cursor: pointer;

  svg {
    width: 16px;
    height: auto;
    transform: ${props => (props.isReadMore ? 'scaleY(-1)' : 'scaleY(1)')};
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin-top: 0;
`

const ListItem = styled.li`
  display: flex;
  gap: 16px;

  img {
    max-width: 80px;
    width: 100%;
    height: auto;
    border-radius: 4px;
    border: 1px solid rgba(221, 238, 255, 0.35);
  }

  h4 {
    margin: 0 0 4px 0;
  }
`
