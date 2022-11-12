import { useSelector, useDispatch } from 'react-redux'
import { fetchStories } from '../store/storiesSlice'
import Story from '../components/Story'

const NewStories = () => {

    const dispatch = useDispatch()
    const stories = useSelector(state => state.stories_state.stories)
    const isLoading = useSelector(state => state.stories_state.isLoading)
    const isError = useSelector(state => state.stories_state.isError)
    const errorMessage = useSelector(state => state.stories_state.errorMessage)

    const refreshStories = async () => {
        dispatch(fetchStories())
    }

    return (
        <div className="container container-small">
            <div className="start-header">
                <div className='title'>Last news from Hacker News</div>
                <div className={isLoading ? 'refresh-btn loading' : 'refresh-btn'} onClick={refreshStories} disabled={isLoading}>⭮</div>
            </div>

            {
                isError ? <div className="title error">{errorMessage}</div> :
                    stories.map(story => (
                        <Story key={story.id} story={story} />
                    ))
            }
        </div>
    )
}

export default NewStories
