import { useRef ,useState,useEffect} from "react";
import { setShowTaskModalMain ,setShowEditTask} from "../features/modalSlice";
import { setSaveboard } from "../features/savedataSlice";
import { useDispatch, useSelector } from "react-redux";
import EditBoard from "./EditBoard";
import ModalTask from "./TaskModal";
import EditTask from "./EditTask";
import DeleteTask from "./DeletTask";
import { setSelectBoard } from "../features/boardSlice";



const ShowTaskModal=()=>{
    const modalRef=useRef(null);
    const{showTaskModalMain}=useSelector((state)=>state.modals)
    const[isOpenTask,setIsOpenTask]=useState(false);
    const {showEditBoardModal }=useSelector((state)=>state.modals); 
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const [newColumn,setNewColumn]=useState('')
    const {selectTask}=useSelector((state)=>state.selectTask)
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const dispatch=useDispatch()
 
    const handelEdit=()=>{
        dispatch(setShowEditTask(true));
        dispatch(setShowTaskModalMain(false))

    }


     const toggleMenu=()=>{
        setIsOpenTask(!isOpenTask);
    }

    const handelChangeCoulmn=(e)=>{
                const targetvalue=e.target.value 
                
                setNewColumn(targetvalue);
                const upateColumn=selectBoard.columns.map((col)=>{
    
                    if (col.tasks.find((task)=> task.title===selectTask.title)){
                        const updateTask=col.tasks.filter((task)=> task.title !==selectTask.title)
                        
                        return{
                            ...col,
                            tasks:updateTask,
                        };
                    }
                    if (col.name===targetvalue){
                    return{
                        ...col,
                        tasks:[...col.tasks,selectTask]
                    }
                    }
                    return col;
                });
                
    
                
                dispatch(setSelectBoard({...selectBoard,columns:upateColumn}));
                localStorage.setItem('selectBoard',JSON.stringify(selectBoard));
                const updateBoardSave=boardsave.map((item)=>{
                    if(item.Name === selectBoard.Name){
                        return{
                            ...item,columns:upateColumn,
                        }
                    }return item;
                });
                dispatch(setSaveboard(updateBoardSave))
                
                localStorage.setItem('saveNewData',JSON.stringify(updateBoardSave));
                setTaskShowModal(false)
        }
     const handelClickOut = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
    
                dispatch(setShowTaskModalMain(false))
            }
        };
     useEffect(() => {
            if (showTaskModalMain) {
                document.addEventListener('mousedown', handelClickOut);
            } else {
                document.removeEventListener('mousedown', handelClickOut);
            }
            return () => {
                document.removeEventListener('mousedown', handelClickOut);
            };
        }, [showTaskModalMain]);
    return(
            
       
        <div className="bg-black/40 fixed top-0 left-0 h-screen w-full">
            <div  ref={modalRef} className="bg-white dark:bg-dark-primary-100   dark:text-white  fixed w-2/5 max-h-max flex flex-col  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-max p-8 rounded gap-4" >
                <div className="flex justify-between  dark:bg-dark-primary-10 ">
                    
                    <div className="text-lg font-bold  dark:bg-dark-primary-100 ">{selectTask.title}</div>
                    <div className=" relative">
                        <div className="flex flex-col  cursor-pointer gap-1" onClick={toggleMenu}>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                        </div>
                    </div>
                    {isOpenTask&&(
                        <div className=" absolute flex flex-col items-center bg-white w-32 h-15 z-50 top-12 -right-8 text-sm rounded shadow-2xl gap-2 p-2">
                            <div className="text-gray-500" onClick={handelEdit}>Edit Task</div>
                            <div className="text-red-400 " onClick={()=>dispatch(setShowTaskDelete(true))} >Delete Task</div>

                        </div>
                    )}
                </div>
                <span className="text-gray-400 text-xs font-normal  dark:bg-dark-primary-100 dark:text-white">{selectTask.description}</span>
                <p className="text-gray-400 text-xs">Subtasks {`(0 of ${selectTask.subtasks.length})`} </p>
                <div  className="bg-gray-100 hover:bg-buttoncolor text-xs font-bold h-full p-4 rounded-md dark:hover:bg-purpledo  dark:bg-dark-primary-100 ">
                    
                    {selectTask.subtasks}
                </div>
                <label className="text-gray-400 text-xs  dark:bg-dark-primary-100 dark:text-white">current state</label>
                <select className="rounded border-2 border-gray-200 text-xs font-medium  p-2 hover:border-purpledo  dark:bg-dark-primary-100 " value={newColumn} onChange={handelChangeCoulmn} >
                        <option  >
                            {selectBoard.columns.find(col => col.tasks.find(task => task.title === selectTask.title))?.name || 'Not Found'}
                        </option>
                        {selectBoard.columns.map((col,index)=>(
                            <option value={col.name} key={index}>{col.name}</option>)
                        )}
                </select>
                
            </div>

        </div>)
        

}
export default ShowTaskModal;