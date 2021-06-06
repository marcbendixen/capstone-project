import PosterList from './components/PosterList'
import popularList from './example_data/popular.json'

function App() {
  return (
    <>
      <h1>Serientracker</h1>
      <PosterList list={popularList.results} />
    </>
  )
}

export default App
