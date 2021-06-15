import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Poster from './Poster'

PosterList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default function PosterList({ list = [] }) {
  return (
    <StyledPosterList>
      {list.map(({ id, poster_path: posterPath, name }) => (
        <li key={id}>
          <Link to={`/serie/${id}`}>
            <Poster
              path={
                posterPath
                  ? `https://image.tmdb.org/t/p/w300/${posterPath}`
                  : 'poster.png'
              }
              alt={`Poster von ${name}`}
            />
          </Link>
        </li>
      ))}
    </StyledPosterList>
  )
}

const StyledPosterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    max-width: 105px;
    width: 100%;

    a {
      display: flex;
    }
  }
`
