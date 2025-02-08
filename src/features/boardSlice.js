import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    selectBoard:JSON.parse(localStorage.getItem('selectBoard')) ||(boradsave[0]),
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