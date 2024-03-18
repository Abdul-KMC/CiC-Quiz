import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTest(state, action) {
            console.log('received action: ', action)
            console.log('updating state to ...', action.payload)
            return action.payload
        }
    }
})

export const { setFilter } = testSlice.actions
export default testSlice.reducer