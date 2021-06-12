import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Poster from '../components/Poster'
import IconLeftArrow from '../components/ui/IconLeftArrow'

export default function SeriesDetails({
  series,
  watchlist,
  handleWatchlist,
  handleNewSeries,
}) {
  const { id } = useParams()
  const [seriesDetails, setSeriesDetails] = useState([])
  const [cast, setCast] = useState([])
  const [isOnWatchlist, setIsOnWatchlist] = useState(false)

  useEffect(() => {
    if (watchlist.length > 0) {
      const result = watchlist.find(element => element.id === Number(id))
      result && setIsOnWatchlist(true)
    }
  }, [watchlist, id])

  useEffect(() => {
    const filteredSeries = series.filter(el => el.id === Number(id))
    filteredSeries.length !== 0
      ? setSeriesDetails(filteredSeries[0])
      : fetch(`/api/series/${id}`)
          .then(res => res.json())
          .then(data => {
            setSeriesDetails(data)
            handleNewSeries(data)
          })
          .catch(error => {
            console.error('Error:', error)
          })
  }, [id, series, handleNewSeries])

  useEffect(() => {
    fetch(`/api/series/${id}/credits`)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [id])

  const { name, poster_path: posterPath, overview } = seriesDetails

  return (
    <Wrapper>
      <BackButton to="/">
        <IconLeftArrow />
      </BackButton>
      <Header>
        <Poster
          path={
            posterPath !== undefined
              ? `https://image.tmdb.org/t/p/w300${posterPath}`
              : '../poster.png'
          }
          alt={`Poster von ${name}`}
        />
        <div>
          <h1>{name}</h1>
          {!isOnWatchlist && (
            <button onClick={() => handleWatchlist(seriesDetails)}>add</button>
          )}
        </div>
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
