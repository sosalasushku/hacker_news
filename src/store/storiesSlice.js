import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = 'https://hacker-news.firebaseio.com/v0/'

export const fetchStories = createAsyncThunk(
    'stories_state/fetchStories',
    async function (_, { rejectWithValue }) {

        try {
            const idsResponse = await fetch(`${baseURL}/newstories.json`, {
                priority: 'low'
            })

            if (!idsResponse.ok) throw new Error('Loading error')

            const idData = await idsResponse.json()

            const arr = await Promise.all(idData.map(async id => {
                const storiesResponse = await fetch(`${baseURL}item/${id}.json`, {
                    priority: 'low'
                })
                if (!storiesResponse.ok) throw new Error('Loading error')
                return await storiesResponse.json()
            }))

            return arr
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const storiesSlice = createSlice({
    name: 'stories_state',
    initialState: {
        isLoading: true,
        isError: false,
        errorMessage: '',
        storiesIds: [],
        stories: [],
        currentStory: {}
    },
    extraReducers: {
        [fetchStories.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchStories.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload
        },
        [fetchStories.fulfilled]: (state, action) => {
            state.stories = action.payload.sort((a, b) => (b.time - a.time)).slice(0, 100)
            state.isLoading = false
        },
    }
})

export const { setLoading } = storiesSlice.actions

export default storiesSlice.reducer