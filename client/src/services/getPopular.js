export default async function getPopular() {
  return await fetch('/api/series/popular')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
}
