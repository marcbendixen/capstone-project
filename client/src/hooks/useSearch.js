import { useEffect, useState } from 'react'
import getSearchResults from '../services/getSearchResults'

export default function useSearch() {
  const [query, setQuery] = useState()
  const [results, setResults] = useState(null)

  useEffect(() => {
    getSearchResults(query).then(data => setResults(data.results))
  }, [query])

  function handleSearch(event) {
    const currentQuery = event.target.value
    console.log(currentQuery)
    currentQuery !== '' ? setQuery(currentQuery) : setResults(null)
  }

  return { results, handleSearch }
}
