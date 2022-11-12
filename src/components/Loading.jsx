import React from 'react'
import loading from './media/loading.svg'

const Loading = () => {
    return (
        <div className='loading-container'>
            <img src={loading} className='loading-img' />
        </div>
    )
}

export default Loading
