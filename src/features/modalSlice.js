
import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    modalDelete: false,
    showTaskModal:false,
    showModalBoard:false,
    showEditBoardModal:false,
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
        },
        setShowEditBoard:(state,action)=>{
            state.showEditBoardModal=action.payload
        }
    },
});
export const {setDeleteModal,setShowTaskModal,setShowModalBoard,setShowEditBoard}= modalDeleteSlice.actions;

export default modalDeleteSlice.reducer;