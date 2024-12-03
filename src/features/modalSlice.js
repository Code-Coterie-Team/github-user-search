
import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    modalDelete: false,
    showTaskModal:false,
    showModalBoard:false,
    showEditBoardModal:false,
    showEditTask:false,
    showTaskDelete:false,
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
        },
        setShowEditTask:(state,action)=>{
            state.showEditTask=action.payload
        }
        ,
        setShowTaskDelete:(state,action)=>{
            state.showTaskDelete=action.payload
        }
    },
});
export const {setDeleteModal,setShowTaskModal,setShowModalBoard,setShowEditBoard,setShowEditTask,setShowTaskDelete}= modalDeleteSlice.actions;

export default modalDeleteSlice.reducer;