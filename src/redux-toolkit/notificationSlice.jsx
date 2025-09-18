import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState:{
        message: null,
        description: null,
        type: null,
    },
    reducers:{
        showNotification: (state,action)=>{
            const { type, message, description } = action.payload;
            state.type = type;
            state.message = message;
            state.description = description;
        },
        clearNotification: (state,action)=>{
            state.type= null,
            state.message = null,
            state.descriptions = null
        }
    }
})

// export actions để dispatch trong component
export const { showNotification, clearNotification } = notificationSlice.actions;

// export reducer để add vào store
export default notificationSlice.reducer;