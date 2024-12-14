import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const initialState = {
    selectBoard:JSON.parse(localStorage.getItem('selectBoard')) || {},
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