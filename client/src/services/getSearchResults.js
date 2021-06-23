export default function getSearchResults(query) {
  return fetch(`/api/search/${query}`).then(res => res.json())
}
