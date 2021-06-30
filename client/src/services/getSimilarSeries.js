export default async function getSimilarSeries(id) {
  return await fetch(`/api/series/${id}/similar`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
}
