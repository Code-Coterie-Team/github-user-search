import { createSlice} from "@reduxjs/toolkit";


const saveDataSlice=createSlice({
    name:'data',
    initialState:{
        data:[],
    },
    reducers:{
        setSaveData:(state,action)=>{
            state.data=action.payload ;
        },
        
}});
export const {setSaveData}=saveDataSlice.actions    
export default saveDataSlice.reducer;
