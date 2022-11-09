import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Story from './Story'

const NewStories = ({ stories, setCurrentStory, getStories }) => {

    const handleRefresh = async () => {
        await getStories()
    }

    return (
        < div className="cards-container" >
            <h1>Last news from Hacker News</h1>
            <button onClick={handleRefresh}>Refresh</button>
            {
                stories.map(story => (
                    <Story story={story} setCurrentStory={setCurrentStory} />
                ))
            }
        </div >
    )
}

export default NewStories
