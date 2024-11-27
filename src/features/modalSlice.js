
import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    modalDelete: false,
    showTaskModal:false,
    showModalBoard:false,
};
const modalDeleteSlice=createSlice({
    name:'modals',
    initialState,
    reducers:{
        setDeleteModal:(state,action)=>{
                state.modalDelete=action.payload;
        },
        setShowTaskModal:(state,action)=>{
            state.showTaskModal=action.payload
        },
        setShowModalBoard:(state,action)=>{
            state.showModalBoard=action.payload
        }
    },
});
export const {setDeleteModal,setShowTaskModal,setShowModalBoard}= modalDeleteSlice.actions;

export default modalDeleteSlice.reducer;