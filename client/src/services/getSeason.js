export default function getSeason(id, seasonNumber) {
  return fetch(`/api/series/${id}/season/${seasonNumber}`).then(res =>
    res.json()
  )
}
