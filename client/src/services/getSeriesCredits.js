export default function getSeriesCredits(id) {
  return fetch(`/api/series/${id}/credits`).then(res => res.json())
}
