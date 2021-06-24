export default async function getSearchResults(query) {
  return await fetch(`/api/search/${query}`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
}
