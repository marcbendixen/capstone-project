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
  return <StyledPoster src={path} alt={alt} width="300" height="450" />
}

const StyledPoster = styled.img`
  display: flex;
  width: 140px;
  height: auto;
  font-size: 0;
  border-radius: 4px;
  border: 1px solid rgba(221, 238, 255, 0.35);
`
