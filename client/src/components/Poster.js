import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Poster.propTypes = {
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default function Poster({
  path = 'poster.png',
  alt = 'Poster of Series',
}) {
  return <StyledPoster src={path} alt={alt} />
}

const StyledPoster = styled.img`
  max-width: 140px;
  width: 100%;
  height: auto;
  border-radius: 4px;
  border: 1px solid rgba(221, 238, 255, 0.35);
`
