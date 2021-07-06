import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ReactComponent as IconSearch } from '../assets/icons/search.svg'
import Poster from '../components/Poster'
import useSearch from '../hooks/useSearch'

export default function SearchPage() {
  const { query, results, handleSearch } = useSearch()

  return (
    <StyledSection>
      <StyledLabel>
        Suche:
        <StyledInput
          type="text"
          placeholder="Was willst du finden?"
          autoComplete="off"
          onChange={handleSearch}
          onKeyDown={event =>
            (event.key === 'Enter' || event.key === 'Escape') &&
            event.target.blur()
          }
        />
      </StyledLabel>
      {results ? (
        <>
          <StyledText>
            <strong>{results.length}</strong> Ergebnis
            {results.length !== 1 && `se`} für <i>"{query}"</i> gefunden{' '}
            {results.length !== 0 ? '🥳' : '🙈'}
          </StyledText>
          <StyledList>
            {results.map(
              ({
                id,
                name,
                poster_path: posterPath,
                first_air_date: firstAirDate,
              }) => (
                <StyledListItem key={id}>
                  <StyledNavLink to={`/serie/${id}`}>
                    <StyledContainer>
                      <Poster
                        path={
                          posterPath
                            ? `https://image.tmdb.org/t/p/w154${posterPath}`
                            : 'poster.png'
                        }
                        alt={`Poster von ${name}`}
                      />
                    </StyledContainer>
                    <StyledMetaContainer>
                      <StyledHeading>{name}</StyledHeading>
                      {firstAirDate !== undefined && (
                        <div>{firstAirDate.substring(0, 4)}</div>
                      )}
                    </StyledMetaContainer>
                  </StyledNavLink>
                </StyledListItem>
              )
            )}
          </StyledList>
        </>
      ) : (
        <StyledIconSearch />
      )}
    </StyledSection>
  )
}

const StyledSection = styled.section`
  display: grid;
  justify-items: center;
  gap: 32px;
  padding: 0 16px;
`

const StyledLabel = styled.label`
  display: grid;
  max-width: 375px;
  width: 100%;
  color: var(--color-black);
`

const StyledInput = styled.input`
  font-size: inherit;
  font-family: inherit;
  color: #fff;
  background: var(--color-gray-blue);
  border-radius: var(--border-radius);
  border-color: transparent;
  padding: 12px 8px;

  :focus {
    outline-color: var(--color-blue);
  }
`

const StyledText = styled.span`
  text-align: center;
`

const StyledList = styled.ul`
  display: grid;
  list-style: none;
  width: 100%;
  border-top: 1px solid var(--color-border);
  padding: 0;
  margin: 0;
`

const StyledListItem = styled.li`
  border-bottom: 1px solid var(--color-border);
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 8px;
  text-decoration: none;
  padding: 16px 0;
`

const StyledContainer = styled.div`
  flex-shrink: 0;
  max-width: 60px;
  width: 100%;
`

const StyledMetaContainer = styled.div`
  display: grid;
  align-content: start;
`

const StyledHeading = styled.h2`
  font-size: 1.1rem;
  letter-spacing: 0.057em;
  margin: 0;
`

const StyledIconSearch = styled(IconSearch)`
  width: 160px;
  color: var(--color-gray-blue);
  margin-top: 40px;
  opacity: 0.2;
`
