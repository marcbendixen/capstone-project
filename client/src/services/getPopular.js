export default function getPopular() {
  return fetch('/api/series/popular').then(res => res.json())
}
