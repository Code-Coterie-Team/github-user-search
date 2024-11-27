import { setDeleteModal } from "../features/modalSlice";
import { useSelector,useDispatch } from "react-redux";
import { setSaveboard } from "../features/savedataSlice";
import { setSelectBoard } from "../features/boardSlice";
  
 
function ModalDelete(props){
    
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {boardsave}=useSelector((state)=>state.boardsave);
    const dispatch=useDispatch()
    const handelDelete=()=>{
        if(selectBoard){
            
            const  updateData=boardsave.filter(item=>item.Name !==selectBoard.Name);
            localStorage.setItem('saveNewData',JSON.stringify(updateData));

            dispatch(setSaveboard(updateData));
            dispatch(setSelectBoard(boardsave[0]))
            dispatch(setDeleteModal(false));
        }
    }

    return(
        <div  className="bg-black/40 fixed w-full h-full top-0 left-0">
            <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl">
                <span className="text-red-400">Delete this {props.type}?</span>
                <span className="text-gray-400 text-xs">Are you sure you want to delete the {selectBoard.Name} {props.type}? This action will remove all columns and tasks and cannot be reversed.</span>
                <div className="flex gap-4 justify-center"> 
                    <button className="bg-red-400 rounded-full text-white w-1/2" onClick={handelDelete}>Delete</button>
                    <button className="bg-slate-300 rounded-full text-purple w-1/2" onClick={()=>{dispatch(setDeleteModal(false))}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
 export default ModalDelete;
