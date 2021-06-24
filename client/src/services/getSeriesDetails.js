export default async function getSeriesDetails(id) {
  return await fetch(`/api/series/${id}`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
}
