import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Poster from './Poster'

PosterList.propTypes = {
  list: PropTypes.array,
}

export default function PosterList({ list }) {
  return (
    <StyledPosterList>
      {list.map(({ id, poster_path, name }) => {
        return (
          <li key={id}>
            <Poster
              path={
                poster_path && `https://image.tmdb.org/t/p/w300/${poster_path}`
              }
              alt={`Poster von ${name}`}
            />
          </li>
        )
      })}
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

  li {
    display: flex;
    border-radius: 4px;

    img {
      max-width: 140px;
      width: 100%;
      height: auto;
    }
  }
`
