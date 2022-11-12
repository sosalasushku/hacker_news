import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewStories from './pages/NewStories'
import StoryPage from './pages/StoryPage'
import { fetchStories } from './store/storiesSlice'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const intervalId = setInterval(() => {
      dispatch(fetchStories())
      console.log('in interval')
    }, 60000)

    async function onFirstRender() {
      dispatch(fetchStories())
    }

    onFirstRender()

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <NewStories />
          </Route>
          <Route path='/:id'>
            <StoryPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
