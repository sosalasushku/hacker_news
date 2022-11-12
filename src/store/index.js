import { configureStore } from '@reduxjs/toolkit'
import storiesSlice from './storiesSlice'
import storyPageSlice from './storyPageSlice'

export default configureStore({
    reducer: {
        stories_state: storiesSlice,
        page_state: storyPageSlice,
    }
})