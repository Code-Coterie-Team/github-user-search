import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    selectBoard: null,
};
const boardSlice=createSlice({
    name:'board',
    initialState,
    reducers:{
            setSelectBoard:(state,action)=>{
                state.selectBoard=action.payload;
        },
    },
});
export const {setSelectBoard}= boardSlice.actions;
export default boardSlice.reducer;