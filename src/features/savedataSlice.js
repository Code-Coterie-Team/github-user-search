import { createSlice} from "@reduxjs/toolkit";


const saveBoardSlice=createSlice({
    name:'boardsave',
    initialState:{
        boardsave:[{name:'',columns:[{ name: '', tasks: [{title:'',description:'',subtasks:[]},] }]}]
            
    },
    reducers:{
        setSaveboard:(state,action)=>{
            state.boardsave=action.payload ;
        },
        
}});
export const {setSaveboard}=saveBoardSlice.actions    
export default saveBoardSlice.reducer;
