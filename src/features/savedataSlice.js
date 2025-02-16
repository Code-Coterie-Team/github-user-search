import { createSlice} from "@reduxjs/toolkit";
import { initialBoards } from "./initialBoards";


const saveBoardSlice=createSlice({
    name:'boardsave',
    initialState:{
       boardsave:initialBoards,
            
    },
    reducers:{
        setSaveboard:(state,action)=>{
            state.boardsave=action.payload ;
        },
        
}});
export const {setSaveboard}=saveBoardSlice.actions    
export default saveBoardSlice.reducer;
