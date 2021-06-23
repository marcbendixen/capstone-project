import { useEffect, useState } from 'react'
import getSearchResults from '../services/getSearchResults'

export default function useSearch() {
  const [query, setQuery] = useState(null)
  const [results, setResults] = useState(null)

  useEffect(() => {
    query && getSearchResults(query).then(data => setResults(data.results))
  }, [query])

  function handleSearch(event) {
    const currentQuery = event.target.value
    currentQuery !== '' ? setQuery(currentQuery) : setResults(null)
  }

  return { query, results, handleSearch }
}
