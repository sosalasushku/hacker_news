import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = 'https://hacker-news.firebaseio.com/v0/'

export const updateStory = createAsyncThunk(
    'page_state/updateStory',
    async function (id, { rejectWithValue }) {

        try {
            const updatedStoryResponse = await fetch(`${baseURL}item/${id}.json`)
            if (!updatedStoryResponse.ok) throw new Error('Error: unable to refresh the page')
            return await updatedStoryResponse.json()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const fetchComments = createAsyncThunk(
    'page_state/fetchComments',
    async function (parent, { rejectWithValue }) {



        try {
            if (parent.kids) {

                const arr = await Promise.all(parent.kids.map(async id => {
                    const commentsResponse = await fetch(`${baseURL}item/${id}.json`)
                    if (!commentsResponse.ok) throw new Error('Error: unable to load the comments')
                    return await commentsResponse.json()
                }))

                return arr
            }

            return null
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const storyPageSlice = createSlice({
    name: 'page_state',
    initialState: {
        isLoading: true,
        isError: false,
        errorMessage: '',
        currentStory: {},
        comments: [],
    },
    reducers: {
        setCurrentStory(state, action) {
            state.currentStory = action.payload
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true
            state.isError = false
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments = action.payload?.filter(item => (!item.deleted && !item.dead)).sort((a, b) => (b.time - a.time)) || null
            state.isLoading = false
            state.isError = false
        },
        [updateStory.pending]: (state) => {
            state.isLoading = true
            state.isError = false
        },
        [updateStory.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload
        },
        [updateStory.fulfilled]: (state, action) => {
            state.currentStory = action.payload
            fetchComments()
            state.isLoading = false
            state.isError = false

        }
    }
})

export const { setCurrentStory } = storyPageSlice.actions

export default storyPageSlice.reducer