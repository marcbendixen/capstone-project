export default function getSeriesDetails(id) {
  return fetch(`/api/series/${id}`).then(res => res.json())
}
