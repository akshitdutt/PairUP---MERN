import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed", 
    initialState: null, 
    reducers:{
        addfeed: (state, action) =>{
            return action.payload;
        }, 
        removefeed: (state, action) =>{
            return null;
        }, 
        removeUserFromFeed: (state, action) => {
    return state.filter(
        (user) => user._id !== action.payload
    );
}
    }
})

export const {addfeed, removefeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;