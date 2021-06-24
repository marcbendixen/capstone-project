export default async function getSeason(id, seasonNumber) {
  return await fetch(`/api/series/${id}/season/${seasonNumber}`).then(res =>
    res.json().catch(error => {
      console.error('Error:', error)
    })
  )
}
