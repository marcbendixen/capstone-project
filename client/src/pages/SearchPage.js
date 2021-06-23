import useSearch from '../hooks/useSearch'

export default function SearchPage() {
  const { results, handleSearch } = useSearch()

  return (
    <>
      <input type="text" onChange={handleSearch} />
      <ul>
        {results &&
          results.map(result => <li key={result.id}>{result.name}</li>)}
      </ul>
    </>
  )
}
