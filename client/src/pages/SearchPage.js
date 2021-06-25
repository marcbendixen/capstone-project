import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Poster from '../components/Poster'
import useSearch from '../hooks/useSearch'

export default function SearchPage() {
  const { query, results, handleSearch } = useSearch()

  return (
    <Wrapper>
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
      {results && (
        <>
          <StyledResultInfo>
            <strong>{results.length}</strong> Ergebnis
            {results.length > 1 && `se`} für <i>"{query}"</i> gefunden 🥳
          </StyledResultInfo>
          <StyledList>
            {results.map(
              ({
                id,
                name,
                poster_path: posterPath,
                first_air_date: firstAirDate,
              }) => (
                <Link to={`/serie/${id}`} key={id}>
                  <StyledListItem>
                    <Poster
                      path={
                        posterPath
                          ? `https://image.tmdb.org/t/p/w154${posterPath}`
                          : 'poster.png'
                      }
                      alt={`Poster von ${name}`}
                    />
                    <StyledMetaInfos>
                      <StyledHeading>{name}</StyledHeading>
                      {firstAirDate !== undefined && (
                        <div>{firstAirDate.substring(0, 4)}</div>
                      )}
                    </StyledMetaInfos>
                  </StyledListItem>
                </Link>
              )
            )}
          </StyledList>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  gap: 32px;
`

const StyledLabel = styled.label`
  display: grid;
  max-width: 375px;
  width: 100%;
`

const StyledInput = styled.input`
  padding: 12px 8px;
  border-radius: 4px;
  border-color: transparent;
  font-size: 1rem;
  font-family: inherit;
`

const StyledResultInfo = styled.span`
  text-align: center;
`

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  border-top: 1px solid #2c3440;

  a {
    text-decoration: none;
  }
`

const StyledListItem = styled.li`
  display: flex;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #2c3440;

  img {
    max-width: 60px;
    width: 100%;
    flex-shrink: 0;
  }
`

const StyledMetaInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const StyledHeading = styled.h2`
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin: 0;
`
