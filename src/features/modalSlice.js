
import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    modalDelete: false,
};
const modalDeleteSlice=createSlice({
    name:'modalDelete',
    initialState,
    reducers:{
            setDeleteModal:(state,action)=>{
                state.modalDelete=action.payload;
        },
    },
});
export const {setDeleteModal}= modalDeleteSlice.actions;
export default modalDeleteSlice.reducer;