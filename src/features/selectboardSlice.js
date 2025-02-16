import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { initialBoards } from './initialBoards';


const initialState = {
   selectBoard:initialBoards[0]
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