import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Poster from './Poster'

PosterList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default function PosterList({ list }) {
  return (
    <StyledList>
      {list.map(({ id, poster_path: posterPath, name }) => (
        <li key={id}>
          <Link to={`/serie/${id}`}>
            <Poster
              path={
                posterPath
                  ? `https://image.tmdb.org/t/p/w300${posterPath}`
                  : 'poster.png'
              }
              alt={`Poster von ${name}`}
            />
          </Link>
        </li>
      ))}
    </StyledList>
  )
}

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(103px, 1fr));
  justify-content: center;
  gap: 8px;
  width: 100%;
  list-style: none;
  padding: 0 8px;
  margin: 0;
`
