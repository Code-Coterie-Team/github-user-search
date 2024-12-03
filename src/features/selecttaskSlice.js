import { createSlice } from "@reduxjs/toolkit";



const selectTaskSlice=createSlice(
    {
        name:"selectTask",
        initialState:{},
        reducers:{
            setSelectTask:(state,action )=>{
                state.selectTask=action.payload;
            },
        },
    }
);
export  const {setSelectTask}=selectTaskSlice.actions
export default selectTaskSlice.reducer