import { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as IconInfoCircle } from '../assets/icons/info-circle-solid.svg'
import { ReactComponent as IconLink } from '../assets/icons/link-solid.svg'

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
    <Wrapper>
      <MetaInfoButton
        onClick={() => setIsHidden(!isHidden)}
        isHidden={isHidden}
      >
        <IconInfoCircle /> Details {isHidden ? 'anzeigen' : 'ausblenden'}
      </MetaInfoButton>
      <MetaItemsWrapper isHidden={isHidden}>
        <MetaItem>
          <i>Von:</i>
          <ListWrapper>
            {createdBy?.map(({ id, name }) => (
              <div key={id}>
                <strong>{name}</strong>
              </div>
            ))}
          </ListWrapper>
        </MetaItem>
        <MetaItem>
          <i>Ausstrahlung seit:</i>
          <strong>{firstAirDate?.split('-').reverse().join('.')}</strong>
        </MetaItem>
        <MetaItem>
          <i>Genres:</i>
          <ListWrapper>
            {genres?.map(({ id, name }) => (
              <div key={id}>
                <strong>{name}</strong>
              </div>
            ))}
          </ListWrapper>
        </MetaItem>
        <MetaItem>
          <i>Link:</i>
          <StyledWebsiteLink href={homepage} target="_blank">
            <IconLink />
            Website
          </StyledWebsiteLink>
        </MetaItem>
        <MetaItem>
          <i>Network:</i>
          <ListWrapper>
            {networks?.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </ListWrapper>
        </MetaItem>
        <MetaItem>
          <i>Staffeln:</i>
          {numberOfSeasons}
        </MetaItem>
        <MetaItem>
          <i>Episoden:</i>
          {numberOfEpisodes}
        </MetaItem>
        <MetaItem>
          <div>
            <i>Ursprungsland: </i>
            {originCountry}
          </div>
        </MetaItem>
        <MetaItem>
          <i>Produktion:</i>
          <ListWrapper>
            {productionCompanies?.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </ListWrapper>
        </MetaItem>
      </MetaItemsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
`

const MetaItemsWrapper = styled.div`
  display: ${props => (props.isHidden ? 'none' : 'grid')};
  background: var(--color-gray-blue);
  border-radius: 4px;
`

const MetaInfoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  padding: 0;
  background: transparent;
  color: ${props => (props.isHidden ? '#fff' : 'var(--color-orange)')};
  margin-bottom: ${props => (props.isHidden ? '0' : '8px')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    width: 18px;
    height: 18px;
  }
`

const MetaItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
`

const ListWrapper = styled.div`
  display: grid;
`

const StyledWebsiteLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 12px;
    height: auto;
  }
`
