import { useState,useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditBoard, setShowEditTask, setShowTaskModalMain } from "../features/modalSlice";
import EditBoard from "./EditBoard";
import ModalTask from "./TaskModal";
import { setSelectTask } from "../features/selecttaskSlice";

import { use } from "react";
import { setSelectBoard } from "../features/boardSlice";




function Main(){
    
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const dispatch=useDispatch()

    const openTaskDetail=(task)=>{
        dispatch(setSelectTask(task));
       dispatch(setShowTaskModalMain(true));
    }
    const randomColor=()=>{
        const r=Math.floor(Math.random()*256)
        const g=Math.floor(Math.random()*256)
        const b=Math.floor(Math.random()*256)

        return `rgb(${r}, ${g} ,${b})`;
    }

useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('saveNewData') || '[]');
    if (savedData.length > 0) {
        const boardData = savedData.find(item => item.Name === selectBoard.Name);
        if (boardData) {
            dispatch(setSelectBoard(boardData));
        }
    }
}, [selectBoard.Name]);


    return(
    
        <div className="bg-bgmain dark:bg-dark-primary-200 dark:text-white col-start-3  col-end-10  overflow-auto h-full max-w-screen-xl">
            <div className=" flex gap-10 pl-6  "  style={{minHeight:'1500 px',minWidth: '1500px' }}>
                {selectBoard  && Array.isArray(selectBoard.columns) && selectBoard.columns.map((col, index) => {
                    const color=randomColor();
                    return(
                    <div className="flex flex-col "  style={ {width:'20rem'}} key={index}>
                        <div className="text-center   "> 
                    
                            <div className='flex gap-4  items-center p-4 '>
                                <div className={`h-4 w-4 rounded-full `}style={{background:color}} ></div>
                                <span className="text-gray-400 "> 
                                {`${col?.name} (${col?.tasks?.length})` }
                                </span>
                            </div>
                        </div> 
                        <div className= {`flex flex-col  gap-6 rounded border-gray-400 ${col.tasks.length === 0 ?'border-2 border-dashed border-gray-300 h-[75vh] ':''}`} >
                            {col.tasks.map((task,taskIndex)=>(
                                <div key={taskIndex} className=" w-full h-30  bg-white  p-6  dark:bg-dark-primary-100 dark:text-white hover:opacity-20 cursor-pointer rounded-lg shadow-md text-left " 
                                    onClick={()=>openTaskDetail(task)}>
                                    <h4 className=" text-base font-bold p-2">{task.title}</h4>
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
                    
                </div>
            </div>
        
        </div>
    </div>
    
   
    )
    
}

export default Main