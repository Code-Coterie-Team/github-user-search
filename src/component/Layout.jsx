import React from 'react'
import { setDeleteModal, setShowEditBoard,setShowTaskModal } from "../features/modalSlice";
import ModalDelete from "./ModalDelete";
import EditBoard from "./EditBoard";
import { useSelector} from 'react-redux';
 import Header from './Header';
import ModalBoard from './BoardModal';  
import EditTask from './EditTask';
import ModalTask from "./TaskModal";
import DeleteTask from './DeletTask';
import ShowTaskModal from './ShowTaskModal';

const Layout = (props) => {
    const {showTaskModal}=useSelector((state)=>state.modals);
    const{showTaskModalMain}=useSelector((state)=>state.modals)
    const {modalDelete}=useSelector((state)=>state.modals);
    const {showEditBoardModal }=useSelector((state)=>state.modals)
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {showModalBoard}=useSelector((state)=>state.modals);
    const {showEditTask}=useSelector((state)=>state.modals);
    const {showTaskDelete}=useSelector((state)=>state.modals);
    
  return (
    <div>
        <Header />
        {props.children}


        { modalDelete &&  <ModalDelete type={selectBoard.Name}/>  }
        { showTaskModal && <ModalTask/> }
        {showEditBoardModal&&< EditBoard/>}
        { showModalBoard && <ModalBoard />  }
        {showEditTask && <EditTask/>}
        {showTaskDelete && <DeleteTask/>}
        {showTaskModalMain && <ShowTaskModal/>}
        
        
            
    
    </div>

  )
}

export default Layout