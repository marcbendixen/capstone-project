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
  const { seriesDetails, seriesSeasons, isLoading } = useSeriesDetails(
    id,
    series,
    handleNewSeries
  )
  const { cast } = useSeriesCredits(id)
  const { similarSeries } = useSimilarSeries(id)
  const [isReadMore, setIsReadMore] = useState(false)
  const isOnWatchlist = checkIsOnWatchlist(id)
  const {
    name,
    poster_path: posterPath,
    overview,
    backdrop_path: backdropPath,
  } = seriesDetails

  return (
    <StyledSection>
      <StyledBackdrop backdropPath={backdropPath}>
        <StyledButtonBack to="/watchlist" aria-label="Zurück">
          <StyledIconArrowLeft />
        </StyledButtonBack>
      </StyledBackdrop>
      <StyledHeader>
        <StyledPosterWrapper>
          <Poster
            path={
              posterPath !== undefined
                ? `https://image.tmdb.org/t/p/w300${posterPath}`
                : '../poster.png'
            }
            alt={`Poster von ${name}`}
          />
        </StyledPosterWrapper>
        <StyledHeadingWrapper>
          <StyledHeading1>{name}</StyledHeading1>
          <ButtonWatchlist
            onClick={() => handleWatchlist(id)}
            isOnWatchlist={isOnWatchlist}
          />
        </StyledHeadingWrapper>
      </StyledHeader>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SeriesMetaInfo seriesDetails={seriesDetails} />
          <StyledOverviewWrapper>
            <StyledParagraph isReadMore={isReadMore}>
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
            </StyledParagraph>
            {overview !== '' && overview?.length >= 350 && (
              <StyledButtonReadMore
                onClick={handleReadMore}
                isReadMore={isReadMore}
              >
                <StyledIconChevronDown />
              </StyledButtonReadMore>
            )}
          </StyledOverviewWrapper>
          <StyledNavigation>
            <StyledNavigationItem href="#">
              <StyledIconArrowUp />
            </StyledNavigationItem>
            <StyledNavigationItem href="#staffeln">
              Staffeln
            </StyledNavigationItem>
            {cast.length > 0 && (
              <StyledNavigationItem href="#besetzung">
                Besetzung
              </StyledNavigationItem>
            )}
            {similarSeries.length > 0 && (
              <StyledNavigationItem href="#aehnlich">
                Ähnlich
              </StyledNavigationItem>
            )}
          </StyledNavigation>
          <StyledAnchorPoint id="staffeln"></StyledAnchorPoint>
          <StyledHeading2>Staffeln</StyledHeading2>
          <SeasonsList
            seriesSeasons={seriesSeasons}
            seriesIsOnWatchlist={isOnWatchlist}
            checkIsEpisodeWatched={checkIsEpisodeWatched}
            onCheckEpisode={onCheckEpisode}
          />
          {cast.length > 0 && (
            <>
              <StyledAnchorPoint id="besetzung"></StyledAnchorPoint>
              <StyledHeading2>Besetzung</StyledHeading2>
              <StyledList>
                {cast.map(
                  ({ id, profile_path: profilePath, name, character }) => (
                    <StyledListItem key={id}>
                      <StyledProfileImage
                        src={
                          profilePath !== null
                            ? `https://image.tmdb.org/t/p/w200${profilePath}`
                            : '../profile.png'
                        }
                        alt={`Portait von ${name}`}
                        width="200"
                        height="300"
                        loading="lazy"
                      />
                      <div>
                        <StyledHeadline3>{name}</StyledHeadline3>
                        <span>{character}</span>
                      </div>
                    </StyledListItem>
                  )
                )}
              </StyledList>
            </>
          )}
          {similarSeries.length > 0 && (
            <>
              <StyledAnchorPoint id="aehnlich"></StyledAnchorPoint>
              <StyledHeading2 id="aehnlich" padding={true}>
                Diese Serien könnten dir auch gefallen:
              </StyledHeading2>
              <PosterList list={similarSeries} />
            </>
          )}
        </>
      )}
    </StyledSection>
  )

  function handleReadMore() {
    setIsReadMore(!isReadMore)
  }
}

const StyledSection = styled.section`
  display: grid;
  gap: 16px;
  width: 100%;
  padding: 8px;
`

const StyledBackdrop = styled.div`
  position: relative;
  max-width: 768px;
  width: calc(100% + 32px);
  min-height: 210px;
  height: 100%;
  top: -16px;
  left: -16px;
  background: ${({ backdropPath }) =>
      backdropPath && `url(https://image.tmdb.org/t/p/w780${backdropPath})`}
    center 0 no-repeat;
  background-size: cover;
  margin-bottom: -64px;

  ::before {
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

const StyledButtonBack = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-start;
  position: absolute;
  top: 12px;
  left: 12px;
`

const StyledIconArrowLeft = styled(IconArrowLeft)`
  width: 36px;
  height: auto;
  background: rgba(20, 23, 26, 0.2);
  border-radius: var(--border-radius);
  padding: 0 4px;
`

const StyledHeader = styled.header`
  display: flex;
  gap: 16px;
  z-index: 2;
`

const StyledPosterWrapper = styled.div`
  max-width: 140px;
  width: 100%;
  height: auto;
`

const StyledHeadingWrapper = styled.div`
  width: 100%;
`

const StyledHeading1 = styled.h1`
  margin: 0;
`

const StyledOverviewWrapper = styled.div`
  display: grid;
  justify-items: center;
  position: relative;
  min-width: 100%;
`

const StyledParagraph = styled.p`
  min-width: 100%;
  max-height: ${({ isReadMore }) => (isReadMore ? '100%' : '150px')};
  padding-bottom: ${({ isReadMore }) => (isReadMore ? '16px' : '0')};
  margin-top: 0;
  overflow: hidden;
`

const StyledButtonReadMore = styled.button`
  position: absolute;
  width: 100%;
  bottom: 0;
  background: ${({ isReadMore }) =>
    isReadMore
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
  padding: ${({ isReadMore }) => (isReadMore ? '32px 0 0 0' : '32px 0 24px 0')};

  svg {
    transform: ${({ isReadMore }) => (isReadMore ? 'scaleY(-1)' : 'scaleY(1)')};
  }
`

const StyledIconChevronDown = styled(IconChevronDown)`
  width: 16px;
  height: auto;
`

const StyledNavigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  background: var(--color-black);
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 12px;
`

const StyledNavigationItem = styled.a`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.071em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-light-blue);

  :visited {
    color: var(--color-light-blue);
  }

  :hover {
    color: var(--color-green);
  }
`

const StyledIconArrowUp = styled(IconArrowUp)`
  width: 21px;
  height: auto;
`

const StyledAnchorPoint = styled.div`
  position: relative;
  top: -32px;
  visibility: hidden;
`

const StyledHeading2 = styled.h2`
  font-size: 1.25rem;
  margin: 16px 0 8px 0;
  ${({ padding }) => padding && 'padding: 0 8px'};
`

const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledListItem = styled.li`
  display: flex;
  gap: 16px;
`

const StyledProfileImage = styled.img`
  max-width: 80px;
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
`

const StyledHeadline3 = styled.h3`
  font-size: 1rem;
  font-family: inherit;
  letter-spacing: normal;
  margin: 0 0 4px 0;
`
