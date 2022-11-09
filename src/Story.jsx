import { React, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export const getTimeFrom = (str) => {
    const date = new Date(str * 1000)

    let hours = String(date.getHours())
    if (hours.length === 1) hours = '0'.concat(hours)

    let minutes = String(date.getMinutes())
    if (minutes.length === 1) minutes = '0'.concat(minutes)

    let seconds = String(date.getSeconds())
    if (seconds.length === 1) seconds = '0'.concat(seconds)

    let day = String(date.getDate())
    if (day.length === 1) day = '0'.concat(day)

    let month = String(date.getMonth() + 1)
    if (month.length === 1) month = '0'.concat(month)

    let year = String(date.getFullYear() + 1)

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

const Story = ({ story, setCurrentStory }) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        // async function onFirstRender() {
        //     await getComments(kids)
        // }
        // onFirstRender()
    }, [])

    const baseURL = 'https://hacker-news.firebaseio.com/v0/item/'

    const { title, score, by, time, id, kids } = story

    const url = `/${id}`

    const handleClick = () => {
        setCurrentStory(story)
    }

    return (
        <Link to={url} className='story-card' >
            <div onClick={handleClick}>
                <h4>{title || 'no title'}</h4>
                <div className='story-card-info-left'>
                    <div className='story-card-info'>
                        <div>Score: {score}</div>
                        <div>Posted by {by}</div>
                        <div>{getTimeFrom(time)}</div>
                    </div>
                </div>

            </div>
        </Link>

    )
}

export default Story
