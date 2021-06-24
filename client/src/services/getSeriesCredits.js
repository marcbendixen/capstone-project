export default async function getSeriesCredits(id) {
  return await fetch(`/api/series/${id}/credits`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
}
