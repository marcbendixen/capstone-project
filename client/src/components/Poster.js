import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Poster.propTypes = {
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default function Poster({
  path = 'poster.png',
  alt = 'Poster der Serie',
}) {
  return (
    <StyledImage src={path} alt={alt} width="300" height="450" loading="lazy" />
  )
}

const StyledImage = styled.img`
  display: flex;
  max-width: 140px;
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
`
