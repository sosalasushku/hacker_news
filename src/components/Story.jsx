import { useDispatch } from 'react-redux'
import { setCurrentStory } from '../store/storyPageSlice'
import { Link } from 'react-router-dom'
import formatTime from '../format/formatTime'
import formatDate from '../format/formatDate'

const Story = ({ story }) => {

    const dispatch = useDispatch()

    const { title, score, by, time, id } = story
    const url = `/${id}`

    const openThisStoryPage = () => {
        dispatch(setCurrentStory(story))
    }

    return (
        <Link
            to={url}
            onClick={openThisStoryPage}
            className='link-el'
        >
            <div className='card story'>
                <div className='bold-text'>{title}</div>
                <div className='card-meta'>
                    <div className='meta'>
                        <div>by @{by}</div>
                        <div>{formatTime(time)}</div>
                        <div>{formatDate(time)}</div>
                    </div>
                    <div className="meta">{score} votes</div>

                </div>
            </div>
        </Link>

    )
}

export default Story
