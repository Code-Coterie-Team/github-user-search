
import {createSlice} from '@reduxjs/toolkit';

 
const initialState = {
    modalDelete: false,
    showTaskModal:false,
    showModalBoard:false,
    showEditBoardModal:false,
    showEditTask:false,
    showTaskDelete:false,
    showTaskModalMain:false,
    sideOpen:false,
};
const modalSlice=createSlice({
    name:'modals',
    initialState,
    reducers:{
        setDeleteModal:(state,action)=>{
                state.modalDelete=action.payload;
        },
        setShowTaskModal:(state,action)=>{
            state.showTaskModal=action.payload;
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
        },
        setShowTaskModalMain:(state,action )=>{
            state.showTaskModalMain=action.payload
        },
        setSideOpen:(state,action)=>{
            state.sideOpen=action.payload
        }
    },
});
export const {setDeleteModal,setShowTaskModal,setShowModalBoard,setShowEditBoard,setShowEditTask,setShowTaskDelete,setShowTaskModalMain,setSideOpen}= modalSlice.actions;

export default modalSlice.reducer;