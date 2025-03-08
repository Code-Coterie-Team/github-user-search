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
                localStorage.setItem('selectBoard',JSON.stringify(action.payload))
        },
        loadSavedBoard: (state) => {
            const savedBoard = localStorage.getItem('selectBoard');
            if (savedBoard) {
              state.selectBoard = JSON.parse(savedBoard);
            }
          },
    },
});
export const {setSelectBoard,loadSavedBoard}= boardSlice.actions;
export default boardSlice.reducer;