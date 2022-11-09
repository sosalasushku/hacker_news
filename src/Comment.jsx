import { React, useState, useEffect } from 'react'
import { getTimeFrom } from './Story'

const Comment = ({ comment }) => {

    useEffect(() => {
        // async function onFirstRender() {
        //     await getKidComments()
        // }
        // onFirstRender()
        getKidComments()
    }, [])

    const [kids, setKids] = useState([])
    const [showKids, setShowKids] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const parser = require('html-react-parser')

    const baseURL = 'https://hacker-news.firebaseio.com/v0/item/'

    const getKidComments = async () => {
        if (comment.kids.length !== 0) {
            await comment.kids.map(async id => {
                const commentsData = await fetch(`${baseURL}${id}.json`)
                const commentsResult = await commentsData.json()
                setKids(prev => ([...prev, commentsResult]))
            })
        }


    }

    return (
        <div className='story-card comment'>
            <div>@{comment.by}</div>
            <div>{parser(String(comment.text))}</div>
            <div className="story-card-info">
                {kids.length ? (
                    <div className='story-card-link' onClick={() => { setShowKids(prev => !prev) }}>More comments</div>
                ) : <div></div>}
                <div>{getTimeFrom(comment.time)}</div>
            </div>
            {/* {String(showKids)} */}
            {!showKids ? '' :
                kids.map(comment => (
                    <Comment comment={comment} />
                ))
            }
        </div>
    )
}

export default Comment
