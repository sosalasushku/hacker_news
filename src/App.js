import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewStories from './NewStories'
import StoryPage from './StoryPage'
import Empty from './Empty'

function App() {

  const [currentStory, setCurrentStory] = useState({})
  const [currentComments, setCurrentComments] = useState([])

  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const intervalId = setInterval(() => {
      onFirstRender()
      console.log('in interval')
    }, 60000)

    async function onFirstRender() {
      await getStories()
      setIsLoading(false)
    }

    onFirstRender()

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const baseURL = 'https://hacker-news.firebaseio.com/v0/'
  const newStoriesURL = `${baseURL}topstories.json`
  const storyURL = `${baseURL}item/`

  let arr = []

  async function getStories() {

    const idsResponse = await fetch(newStoriesURL)
    const idData = await idsResponse.json()

    await Promise.all(idData.map(async id => {
      const storiesData = await fetch(`${storyURL}${id}.json`)
      const storiesResult = await storiesData.json()
      arr.push(storiesResult)
    }))

    setStories(arr.sort((a, b) => (b.time - a.time)).slice(0, 100))
    arr = []
  }

  if (isLoading) {
    return <h3>Загрузка...</h3>
  } else return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route path='/' element={<NewStories setCurrentStory={setCurrentStory} stories={stories} getStories={getStories} />} />
          <Route path='/:id' element={<StoryPage story={currentStory} preloadedComments={currentComments} />} />
          <Route path='/empty' element={<Empty />} />
        </Routes>
      </div>
    </div>
  );
}



export default App;
