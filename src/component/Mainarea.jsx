import { useState,useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditBoard, setShowEditTask, setShowTaskDelete } from "../features/modalSlice";
import EditBoard from "./EditBoard";
import ModalTask from "./TaskModal";
import { setSelectTask } from "../features/selecttaskSlice";
import EditTask from "./EditTask";
import DeleteTask from "./DeletTask";
import { use } from "react";
import { setSelectBoard } from "../features/boardSlice";
import { setSaveboard } from "../features/savedataSlice";



function Main(){
    const {selectTask}=useSelector((state)=>state.selectTask)
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const[isOpenTask,setIsOpenTask]=useState(false);
    
    const modalRef = useRef(null);
    const[taskShowModal,setTaskShowModal]=useState(false);
    const {showEditBoardModal }=useSelector((state)=>state.modals);
    const dispatch=useDispatch()
   
    const [newColumn,setNewColumn]=useState('')
    
    
    const toggleMenu=()=>{
        setIsOpenTask(!isOpenTask);
    }
    const openTaskDetail=(task)=>{
        dispatch(setSelectTask(task));
        setTaskShowModal(true);
    }
    const randomColor=()=>{
        const r=Math.floor(Math.random()*256)
        const g=Math.floor(Math.random()*256)
        const b=Math.floor(Math.random()*256)

        return `rgb(${r}, ${g} ,${b})`;
    }
   
    const handelClickOut = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {

            setTaskShowModal(false)
        }
    };
    
    const handelEdit=()=>{
        dispatch(setShowEditTask(true));
        setTaskShowModal(false);

    }
    const handelChangeCoulmn=(e)=>{
            const targetvalue=e.target.value 
            setNewColumn(targetvalue);
            const upateColumn=selectBoard.columns.map((col)=>{
                if (col.tasks.some((task)=> task.id===selectTask.id)){
                    return{
                        ...col,
                        tasks: col.tasks.filter((task)=>task.id!==selectTask.id),
                    };
                }
               if (col.name===targetvalue){
                return{
                    ...col,
                    tasks:[...col.tasks,selectTask]
                }
               }
            return col;
             }
             );
             dispatch(setSelectBoard({...selectBoard,columns:upateColumn}));
             console.log(selectBoard);
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
    
    useEffect(() => {
        if (taskShowModal) {
            document.addEventListener('mousedown', handelClickOut);
        } else {
            document.removeEventListener('mousedown', handelClickOut);
        }
        return () => {
            document.removeEventListener('mousedown', handelClickOut);
        };
    }, [taskShowModal]);
useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('saveNewData') || '[]');
    if (savedData.length > 0) {
        const boardData = savedData.find(item => item.Name === selectBoard.Name);
        if (boardData) {
            dispatch(setSelectBoard(boardData)); // به روزرسانی ریداکس با داده‌های ذخیره‌شده
        }
    }
}, [selectBoard.Name]);


    return(
    
        <div className="bg-bgmain dark:bg-dark-primary-200 dark:text-white col-start-3  col-end-9  overflow-auto h-full max-w-screen-xl">
            <div className=" flex gap-10 pl-6 h-screen   "  style={{ minWidth: '1500px' }}>
                {selectBoard  && Array.isArray(selectBoard.columns) && selectBoard.columns.map((col, index) => {
                    const color=randomColor();
                    return(
                    <div className="flex flex-col h-full w-72">
                        <div key={index} className="text-center   "> 
                    
                            <div className='flex gap-4  items-center p-4 '>
                                <div className={`h-4 w-4 rounded-full `}style={{background:color}} ></div>
                                <span className="text-gray-400 "> 
                                {`${col.name} (${col.tasks.length})` }
                                </span>
                            </div>
                        </div> 
                        <div className= {`flex flex-col  gap-6 h-full rounded border-gray-400 ${col.tasks.length === 0 ?'border-2 border-dashed border-gray-30 h-full':''}`} >
                            {col.tasks.map((task,taskIndex)=>(
                                <div key={taskIndex} className=" w-full h-30 p-2 bg-white   dark:bg-dark-primary-100 dark:text-white hover:opacity-20 cursor-pointer rounded-lg shadow-md text-left " onClick={()=>openTaskDetail(task)}>
                                    <h4 className=" text-sm font-bold p-2">{task.title}</h4>
                                    <span className="text-gray-400  p-2 text-sm"> {task.subtasks}</span>
                                </div>
                            ))}
                        </div> 

                    </div>)}
                    ) }
    
            <div className={ `${Array.isArray(selectBoard.columns) &&selectBoard.columns.length < 6 ? `w-72 flex flex-col gap-6` : ` hidden`} ` }>
                <div className=" p-4 "></div>
                <div className=" bg-gradient-to-b from-slate-300 rounded flex  h-full justify-center content-center">
                    <button className="  text-gray-400 font-bold text-2xl  hover:text-purpledo " onClick={()=>dispatch(setShowEditBoard(true))}> + New Coulmn</button>
                    {showEditBoardModal && <EditBoard/>}
                </div>
            </div>
        
        </div>
        
        {taskShowModal &&(
         <div className="bg-black/40 fixed top-0 left-0 h-screen w-full">
            <div ref={modalRef} className="bg-white dark:bg-dark-primary-100   dark:text-white  fixed w-1/3 flex flex-col gap-5 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-max p-6 rounded" >
                <div className="flex justify-between  dark:bg-dark-primary-10 ">
                    <div className="text-sm font-bold  dark:bg-dark-primary-100 ">{selectTask.title}</div>
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
                <span className="text-gray-400 dark:bg-dark-primary-100 dark:text-white">{selectTask.description}</span>
                <div  className="bg-gray-100 hover:bg-buttoncolor text-sm font-bold h-full p-4 rounded-md dark:hover:bg-purpledo  dark:bg-dark-primary-100 ">{selectTask.subtasks}</div>
                <label className="text-gray-400 text-sm  dark:bg-dark-primary-100 dark:text-white">current state</label>
                <select className="rounded border-2 p-2 hover:border-purpledo  dark:bg-dark-primary-100 " value={newColumn} onChange={handelChangeCoulmn} >
                        <option  >
                            {selectBoard.columns.find(col => col.tasks.some(task => task.title === selectTask.title))?.name || 'Not Found'}
                        </option>
                        {selectBoard.columns.map((col,index)=>(
                            <option value={col.name} key={index}>{col.name}</option>)
                        )}
                
                    

                </select>
                
            </div>

        </div>)
        }
       
    </div>
    
   
    )
    
}

export default Main