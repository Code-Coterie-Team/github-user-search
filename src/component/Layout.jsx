import React from 'react'
import { setDeleteModal, setShowEditBoard,setShowTaskModal } from "../features/modalSlice";
import ModalDelete from "./ModalDelete";
import EditBoard from "./EditBoard";
import { useSelector} from 'react-redux';
 import Header from './Header';
  


import ModalTask from "./TaskModal";

const Layout = (props) => {
    const {showTaskModal}=useSelector((state)=>state.modals)
    const {modalDelete}=useSelector((state)=>state.modals);
    const {showEditBoardModal }=useSelector((state)=>state.modals)
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    console.log(showTaskModal,"hi");
  return (
    <div>
        <Header />
        {props.children}


        { modalDelete &&  <ModalDelete type={selectBoard.Name}/>  }
        { showTaskModal && <ModalTask/> }
        {showEditBoardModal&&< EditBoard/>}
            
    
    </div>

  )
}

export default Layout