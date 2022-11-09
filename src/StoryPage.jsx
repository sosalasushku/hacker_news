import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTimeFrom } from './Story'
import Comment from './Comment'

const StoryPage = ({ story }) => {

    const [comments, setComments] = useState([])
    const [thisStory, setThisStory] = useState(story)

    const { id, title, time, by, url, kids } = thisStory

    useEffect(() => {
        async function onFirstRender() {
            await getComments()
        }
        onFirstRender()
    }, [])

    useEffect(() => {
        async function onFirstRender() {
            await getComments()
        }
        onFirstRender()
    }, [story])

    const baseURL = 'https://hacker-news.firebaseio.com/v0/item/'
    let arr = []

    const getComments = async () => {

        if (kids) {
            await Promise.all(kids.map(async id => {
                const commentsData = await fetch(`${baseURL}${id}.json`)
                arr.push(await commentsData.json())
            }))
            setComments(arr)
            arr = []
        }

    }

    const updateStory = async () => {
        const receivedPromise = await fetch(`${baseURL}${id}.json`)
        const receivedResult = await receivedPromise.json()
        setThisStory(receivedResult)
    }

    const handleRefresh = async () => {
        await updateStory()
        console.log(thisStory)
    }

    return (
        <>
            <Link className='back' to='/'>↶ Back</Link>
            <div>
                <h1>{title}</h1>
                <p>{getTimeFrom(time)}</p>
                <p>Post by @{by}</p>
                <a href={url}>{url}</a>
                <p>{kids?.length || 0} comments</p>
                <button onClick={handleRefresh}>Refresh commentsssssssssssss</button>
                <div className='cards-container'>
                    {comments.map(comment => <Comment comment={comment} />)}
                </div>
            </div>
        </>
    )
}

export default StoryPage
