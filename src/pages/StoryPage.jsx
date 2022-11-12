import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, updateStory } from '../store/storyPageSlice'
import { Link } from 'react-router-dom'
import formatTime from '../format/formatTime'
import formatDate from '../format/formatDate'
import Comment from '../components/Comment'

const StoryPage = () => {

    const dispatch = useDispatch()
    const story = useSelector(state => state.page_state.currentStory)
    const comments = useSelector(state => state.page_state.comments)
    const isLoading = useSelector(state => state.page_state.isLoading)
    const isError = useSelector(state => state.page_state.isError)
    const errorMessage = useSelector(state => state.page_state.errorMessage)

    const { id, title, time, by, url, descendants } = story

    useEffect(() => {
        async function onFirstRender() {
            dispatch(fetchComments(story))
        }
        onFirstRender()
    }, [])

    const refreshComments = async () => {
        dispatch(updateStory(id))
        dispatch(fetchComments(story))
    }

    return (
        <>
            <Link className='back link-el' to='/'>🡨</Link>
            <div className='story-page-section header'>
                <div className='container'>
                    <div className="header-content">
                        <h1 className='title'>{title}</h1>
                        {url ? (<a className='link' href={url}>{url}</a>) : null}
                        <div className="meta">
                            <div>Post by @{by}</div>
                            <div>{formatTime(time)}</div>
                            <div>{formatDate(time)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="story-page-section">
                <div className="container">
                    <div className="comment counter">
                        <div className='bold-text'>{descendants} comments</div>
                        <div onClick={refreshComments} className={isLoading ? 'refresh-btn loading' : 'refresh-btn'}>⭮</div>
                    </div>
                    {
                        isError ? (<div className='error'>{errorMessage}</div>) : (
                            comments ? (
                                comments.map(comment => (
                                    (comment.deleted || comment.dead) ? null : <Comment key={comment.id} comment={comment} />
                                ))
                            ) : null
                        )}
                </div>
            </div>
        </>
    )
}

export default StoryPage
