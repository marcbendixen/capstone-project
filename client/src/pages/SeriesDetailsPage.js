// import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Poster from '../components/Poster'
import IconLeftArrow from '../components/ui/IconLeftArrow'

export default function SeriesDetails() {
  const { id } = useParams()
  const [seriesDetails, setSeriesDetails] = useState([])
  const [cast, setCast] = useState([])

  useEffect(() => {
    fetch(`/api/series/${id}`)
      .then(res => res.json())
      .then(data => setSeriesDetails(data))
      .catch(error => {
        console.error('Error:', error)
      })
  }, [id])

  useEffect(() => {
    fetch(`/api/series/${id}/credits`)
      .then(res => res.json())
      .then(data => setCast(data.cast))
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
              ? `https://image.tmdb.org/t/p/w300/${posterPath}`
              : '../poster.png'
          }
          alt={`Poster von ${name}`}
        />
        <h1>{name}</h1>
      </Header>
      <p>{overview}</p>
      <h2>Besetzung</h2>
      <List>
        {cast.map(({ id, profile_path: profilePath, name, character }) => (
          <ListItem key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${profilePath}`}
              alt={`Portait von ${name}`}
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
