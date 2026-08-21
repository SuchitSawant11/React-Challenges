import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'ui',
    initialState : {
        sidebarOpen : FontFaceSetLoadEvent
    },
    reducers : {
        toggleSidebar : (state) => {
            !state.sidebarOpen
        }
    }
})

export const { toggleSidebar } = uiSlice.actions

export default uiSlice.reducer