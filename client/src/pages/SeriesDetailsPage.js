import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconArrowLeft } from '../assets/icons/long-arrow-alt-left-solid.svg'
import ButtonWatchlist from '../components/ButtonWatchlist'
import Poster from '../components/Poster'
import SeasonsList from '../components/SeasonsList'
import getSeason from '../services/getSeason'
import getSeriesCredits from '../services/getSeriesCredits'
import getSeriesDetails from '../services/getSeriesDetails'

SeriesDetailsPage.propTypes = {
  series: PropTypes.array.isRequired,
  handleWatchlist: PropTypes.func.isRequired,
  handleNewSeries: PropTypes.func.isRequired,
  onCheckEpisode: PropTypes.func.isRequired,
  checkIsEpisodeWatched: PropTypes.func.isRequired,
}

export default function SeriesDetailsPage({
  series,
  handleWatchlist,
  handleNewSeries,
  onCheckEpisode,
  checkIsEpisodeWatched,
}) {
  const { id } = useParams()
  const [seriesDetails, setSeriesDetails] = useState([])
  const [seriesSeasons, setSeriesSeasons] = useState([])
  const [cast, setCast] = useState([])

  useEffect(() => {
    const findItem = series.find(el => el.id === Number(id))

    if (findItem) {
      setSeriesDetails(findItem)
      fetchSeasonDetails(findItem)
    } else {
      getSeriesDetails(id)
        .then(data => {
          setSeriesDetails(data)
          handleNewSeries(data)
          fetchSeasonDetails(data)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }

    async function fetchSeasonDetails(element) {
      const { id, seasons } = element

      const fetchData = Promise.all(
        seasons.map(({ season_number: seasonNumber }) =>
          getSeason(id, seasonNumber).then(data => data)
        )
      )
      const allSeasons = await fetchData
      setSeriesSeasons([...allSeasons])
    }
  }, [id, series, handleNewSeries])

  useEffect(() => {
    getSeriesCredits(id)
      .then(data => {
        setCast(data.cast)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [id])

  const {
    name,
    poster_path: posterPath,
    overview,
    isOnWatchlist = false,
  } = seriesDetails

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
            isOnWatchlist={isOnWatchlist ?? false}
          />
        </RightArea>
      </Header>
      <Overview>
        {overview !== '' ? (
          overview
        ) : (
          <span>
            <em>
              Die Beschreibung der Serie ist leider noch nicht vorhanden. Bitte
              hab noch etwas Geduld und sieh später nochmal rein, danke
            </em>
            ✌️
          </span>
        )}
      </Overview>
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
            <NameWrapper>
              <h4>{name}</h4>
              <span>{character}</span>
            </NameWrapper>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
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

const Overview = styled.p`
  min-width: 100%;
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
const NameWrapper = styled.div``
