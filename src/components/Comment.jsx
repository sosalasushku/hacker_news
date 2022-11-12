import { useState } from 'react'
import formatTime from '../format/formatTime'
import formatDate from '../format/formatDate'

const Comment = ({ comment }) => {

    const { text, by, time, kids } = comment

    const [kidComments, setKidComments] = useState([])
    const [showKids, setShowKids] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const parser = require('html-react-parser')

    const baseURL = 'https://hacker-news.firebaseio.com/v0/item/'

    const getKidComments = async () => {

        let arr = []

        try {
            if (kids) {
                arr = await Promise.all(kids.map(async id => {
                    const kidCommentsResponse = await fetch(`${baseURL}${id}.json`)
                    if (!kidCommentsResponse.ok) throw new Error('Error: unable to load more comments')
                    return await kidCommentsResponse.json()
                }))
                setKidComments(arr.sort((a, b) => (b.time - a.time)))
            } else setKidComments(null)
        } catch (e) {
            setIsError(true)
            setErrorMessage(e.message)
        }
    }

    const handleClick = async () => {
        await getKidComments()
        setShowKids(prev => !prev)
    }

    return (
        <div className='card comment'>
            <div className="meta">
                <div className='bold-text'>@{by}</div>
                <div>{formatTime(time)}</div>
                <div>{formatDate(time)}</div>
            </div>

            <div className='comment content'>{parser(String(text))}</div>
            {kids?.length ? (
                <div className='comment btn' onClick={handleClick}>{showKids ? '🡫 Hide' : '🡫 Show more'}</div>
            ) : null}

            {!showKids ? '' :
                isError ? <div className="error small">{errorMessage}</div> :
                    (kidComments ? (
                        kidComments.map(comment => (comment.deleted || comment.dead) ? null :
                            <Comment key={comment.id} comment={comment} />)
                    ) : null)
            }
        </div>
    )
}

export default Comment
