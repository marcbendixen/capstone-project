import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconArrowLeft } from '../assets/icons/arrow-left.svg'
import { ReactComponent as IconArrowUp } from '../assets/icons/arrow-up.svg'
import { ReactComponent as IconChevronDown } from '../assets/icons/chevron-down.svg'
import ButtonWatchlist from '../components/ButtonWatchlist'
import LoadingSpinner from '../components/LoadingSpinner'
import Poster from '../components/Poster'
import PosterList from '../components/PosterList'
import SeasonsList from '../components/SeasonsList'
import SeriesMetaInfo from '../components/SeriesMetaInfo'
import useSeriesCredits from '../hooks/useSeriesCredits'
import useSeriesDetails from '../hooks/useSeriesDetails'
import useSimilarSeries from '../hooks/useSimilarSeries'

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
  const {
    seriesDetails,
    seriesSeasons,
    isLoadingSeriesDetails,
  } = useSeriesDetails(id, series, handleNewSeries)
  const { cast } = useSeriesCredits(id)
  const {
    name,
    poster_path: posterPath,
    overview,
    backdrop_path: backdropPath,
  } = seriesDetails
  const { similarSeries } = useSimilarSeries(id)
  const isOnWatchlist = checkIsOnWatchlist(id)
  const [isReadMore, setIsReadMore] = useState(false)

  return (
    <Wrapper>
      <StyledBackdropImageWrapper backdropPath={backdropPath}>
        <BackButton to="/watchlist" aria-label="Zurück zur Startseite">
          <IconArrowLeft />
        </BackButton>
      </StyledBackdropImageWrapper>
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
      {isLoadingSeriesDetails ? (
        <LoadingSpinner />
      ) : (
        <>
          <SeriesMetaInfo seriesDetails={seriesDetails} />
          <OverviewWrapper>
            <Overview isReadMore={isReadMore}>
              {overview !== '' ? (
                overview
              ) : (
                <span>
                  <em>
                    Die Beschreibung der Serie ist leider noch nicht vorhanden.
                    Bitte hab noch etwas Geduld und sieh später nochmal rein,
                    danke
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
          <Navigation>
            <NavigationItem href="#">
              <IconArrowUp />
            </NavigationItem>
            <NavigationItem href="#staffeln">Staffeln</NavigationItem>
            {cast.length > 0 && (
              <NavigationItem href="#besetzung">Besetzung</NavigationItem>
            )}
            {similarSeries.length > 0 && (
              <NavigationItem href="#aehnlich">Ähnlich</NavigationItem>
            )}
          </Navigation>
          <AnchorPoint id="staffeln"></AnchorPoint>
          <h2>Staffeln</h2>
          <SeasonsList
            seriesSeasons={seriesSeasons}
            seriesIsOnWatchlist={isOnWatchlist}
            checkIsEpisodeWatched={checkIsEpisodeWatched}
            onCheckEpisode={onCheckEpisode}
          />
          {cast.length > 0 && (
            <>
              <AnchorPoint id="besetzung"></AnchorPoint>
              <h2 id="besetzung">Besetzung</h2>
              <List>
                {cast.map(
                  ({ id, profile_path: profilePath, name, character }) => (
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
                  )
                )}
              </List>
            </>
          )}
          {similarSeries.length > 0 && (
            <>
              <AnchorPoint id="aehnlich"></AnchorPoint>
              <StyledHeadline id="aehnlich">
                Diese Serien könnten dir auch gefallen:
              </StyledHeadline>
              <PosterList list={similarSeries} />
            </>
          )}
        </>
      )}
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
    margin: 16px 0 8px 0;
  }
`

const StyledHeadline = styled.h2`
  font-size: 1.25rem;
  margin: 16px 0 8px 0;
  padding: 0 8px;
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-start;
  position: absolute;
  left: 12px;
  top: 12px;
  cursor: pointer;

  svg {
    width: 36px;
    height: auto;
    background: rgba(20, 23, 26, 0.2);
    border-radius: 4px;
    padding: 0 4px;
  }
`

const StyledBackdropImageWrapper = styled.div`
  position: relative;
  max-width: 768px;
  width: calc(100% + 32px);
  min-height: 210px;
  height: 100%;
  top: -16px;
  left: -16px;
  margin-bottom: -64px;
  background: ${props =>
      props.backdropPath &&
      `url(https://image.tmdb.org/t/p/w780${props.backdropPath})`}
    center 0 no-repeat;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      0deg,
      #14171a 0,
      #14171a 4%,
      rgba(20, 23, 26, 0.98) 6%,
      rgba(20, 23, 26, 0.94) 8%,
      rgba(20, 23, 26, 0.88) 10%,
      rgba(20, 23, 26, 0.8) 12%,
      rgba(20, 23, 26, 0.71) 14%,
      rgba(20, 23, 26, 0.6) 16%,
      rgba(20, 23, 26, 0.5) 18%,
      rgba(20, 23, 26, 0.39) 20%,
      rgba(20, 23, 26, 0.29) 22%,
      rgba(20, 23, 26, 0.2) 24%,
      rgba(20, 23, 26, 0.12) 26%,
      rgba(20, 23, 26, 0) 30%
    );
  }
`

const Header = styled.header`
  display: flex;
  gap: 16px;
  z-index: 2;

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

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 12px;
  background: var(--color-black);
`

const NavigationItem = styled.a`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: #d8e0e8;

  :visited {
    color: #d8e0e8;
  }

  :hover {
    color: var(--color-green);
  }

  svg {
    width: 21px;
    height: auto;
  }
`

const OverviewWrapper = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  min-width: 100%;
`

const Overview = styled.p`
  min-width: 100%;
  margin-top: 0;
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
    border: 1px solid var(--color-border);
  }

  h4 {
    margin: 0 0 4px 0;
  }
`

const AnchorPoint = styled.div`
  position: relative;
  top: -16px;
  visibility: hidden;
`
