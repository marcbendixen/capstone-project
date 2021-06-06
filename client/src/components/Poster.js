import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Poster.defaultProps = {
  path: 'https://via.placeholder.com/300x450?text=POSTER',
  alt: 'Poster of Series',
}

Poster.propTypes = {
  path: PropTypes.string,
  alt: PropTypes.string,
}

export default function Poster({ path, alt }) {
  return <StyledPoster src={path} alt={alt} />
}

const StyledPoster = styled.img`
  border-radius: 4px;
`
