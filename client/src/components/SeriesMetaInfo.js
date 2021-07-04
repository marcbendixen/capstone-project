import { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as IconInfoCircle } from '../assets/icons/info-circle.svg'
import { ReactComponent as IconLink } from '../assets/icons/link.svg'

export default function SeriesMetaInfo({ seriesDetails }) {
  const [isHidden, setIsHidden] = useState(true)
  const {
    created_by: createdBy,
    first_air_date: firstAirDate,
    genres,
    homepage,
    networks,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    origin_country: originCountry,
    production_companies: productionCompanies,
  } = seriesDetails

  return (
    <StyledContainer>
      <StyledButton onClick={() => setIsHidden(!isHidden)} isHidden={isHidden}>
        <StyledIconInfoCircle /> Details {isHidden ? 'anzeigen' : 'ausblenden'}
      </StyledButton>
      <StyledWrapper isHidden={isHidden}>
        <StyledMetaItem>
          <i>Von:</i>
          <StyledList>
            {createdBy?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </StyledList>
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Ausstrahlung seit:</i>
          {firstAirDate?.split('-').reverse().join('.')}
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Genres:</i>
          <StyledList>
            {genres?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </StyledList>
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Link:</i>
          <StyledLink href={homepage} target="_blank">
            <StyledIconLink />
            Website
          </StyledLink>
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Network:</i>
          <StyledList>
            {networks?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </StyledList>
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Staffeln:</i>
          {numberOfSeasons}
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Episoden:</i>
          {numberOfEpisodes}
        </StyledMetaItem>
        <StyledMetaItem>
          <div>
            <i>Ursprungsland: </i>
            {originCountry}
          </div>
        </StyledMetaItem>
        <StyledMetaItem>
          <i>Produktion:</i>
          <StyledList>
            {productionCompanies?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </StyledList>
        </StyledMetaItem>
      </StyledWrapper>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: grid;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ isHidden }) => (isHidden ? 'inherit' : 'var(--color-orange)')};
  background: none;
  border: none;
  padding: 0;
  margin-bottom: ${({ isHidden }) => (isHidden ? '0' : '8px')};
  transition: all 0.2s ease-in-out;
`

const StyledIconInfoCircle = styled(IconInfoCircle)`
  width: 18px;
  height: 18px;
`

const StyledWrapper = styled.div`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'grid')};
  background: var(--color-gray-blue);
  border-radius: var(--border-radius);
`

const StyledMetaItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
`

const StyledIconLink = styled(IconLink)`
  width: 12px;
  height: auto;
`
