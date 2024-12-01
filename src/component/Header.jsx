import { useEffect, useRef, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import EditBoard from "./EditBoard";
import { setSaveboard } from "../features/savedataSlice";
import ModalDelete from "./ModalDelete";
import { setDeleteModal, setShowEditBoard,setShowTaskModal } from "../features/modalSlice";
import ModalBoard from "./BoardModal";
import ModalTask from "./TaskModal";
import { setSelectBoard } from "../features/boardSlice";


function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    
    const {boardsave}=useSelector((state)=>state.boardsave);
    const {showTaskModal}=useSelector((state)=>state.modals)
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    
    const modalTakRef=useRef(null);
    const {showEditBoardModal }=useSelector((state)=>state.modals)
    
    const {modalDelete}=useSelector((state)=>state.modals);
    
 
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
   
    const handeledit=()=>{
       dispatch(setShowEditBoard(!showEditBoardModal))
    }
    
    
    

    useEffect(() => {
    const storeData =localStorage.getItem('saveNewData');
    if(storeData){
        const parsedData = storeData ? JSON.parse(storeData) : [];
    
        dispatch(setSaveboard(parsedData));
    }
    }, [dispatch]); 

    
    
    


    return(
    
        <div className="bg-white  dark:bg-dark-primary-100 text-white  h-2/4 border-b-2 dark:border-b-gray-500 justify-left align-middle grid grid-cols-6 w-screen  ">
            <div className="flex text-center   border-r-2 dark:border-r-gray-500  p-8   col-span-1 gap-6">
                <img src="./src/assets/logo-dark.8590e096.svg" alt="" />

            </div>
            <div className=" p-6  dark:bg-dark-primary-100 flex  items-center justify-between w-screen  col-start-2  col-end-8 ">
                <h2  className=" text-xl font-bold p-2">{ selectBoard ? selectBoard.Name :  boardsave[0].Name}</h2>
                <div className="flex justify-center w gap-6">
                    <button className="bg-purpledo  rounded-3xl text-white p-2 h-10" onClick={()=>(dispatch(setShowTaskModal(true)))}>+ Add New Task</button>
                    <div className=" relative p-2">
                        <div className="menu-icon flex cursor-pointer flex-col gap-1" onClick={toggleMenu} >
                            <div className=" w-1 h-1 bg-slate-500 rounded-full " ></div>
                            <div className="w-1 h-1 bg-slate-500 rounded-full" ></div>
                            <div className="w-1 h-1 bg-slate-500 rounded-full" ></div>
                        </div>
                    </div>
                    {isOpen && (
                    <div className=" absolute bg-white w-28 z-50 top-20 right-2   p-2">
                        <ul>
                            <li className="text-gray-300" onClick={handeledit}>Edit Board</li>
                            <li className="text-red-400 cursor-pointer" onClick={()=>(dispatch(setDeleteModal(true)))} >Delete Board </li>
                        </ul>
                    </div>
                    )}
                </div>

            </div>
           
            { modalDelete ? <ModalDelete type={selectBoard.Name}/> : undefined }
            { showTaskModal ? <ModalTask/> :undefined}
            {showEditBoardModal&&< EditBoard/>}
            
            

        </div>

    
    )
}

export default  Header;