import { createSlice} from "@reduxjs/toolkit";


const saveDataSlice=createSlice({
    name:'data',
    initialState:{
        data:[{Name:'',columns:[{ name: '', tasks: [{title:'',description:'',subtasks:[]}] }]}],
    },
    reducers:{
        setSaveData:(state,action)=>{
            state.data=action.payload ;
        },
        
}});
export const {setSaveData}=saveDataSlice.actions
export default saveDataSlice.reducer;
