import { createSlice } from "@reduxjs/toolkit"

interface filterState {
    sortBy: 'newest' | 'oldest' | 'alphabetical'
}

const initialState: filterState = {
    sortBy: 'newest'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
       setSortBy: (state, action) => {
        state.sortBy = action.payload
       } 
    }
})

export const { setSortBy } = filtersSlice.actions

export default filtersSlice.reducer