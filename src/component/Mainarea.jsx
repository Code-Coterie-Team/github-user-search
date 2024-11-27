import { useState,useRef,useEffect } from "react";
import { useSelector } from "react-redux";


function Main(){

    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const [selectTask,setSeletTask]=useState(null);
    const[isOpenTask,setIsOpenTask]=useState(false);
    const {boardsave}=useSelector((state)=>state.boardsave);
    const modalRef = useRef(null);
    const[taskShowModal,setTaskShowModal]=useState(false);
    
    const toggleMenu=()=>{
        setIsOpenTask(!isOpenTask);
    }
    const openTaskDetail=(task)=>{
        setSeletTask(task);
        setTaskShowModal(true);
    }
    
    const handelClickOut = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {

            setTaskShowModal(false)
        }
    };
    

    
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

    return(
    
        <div className="bg-bgmain w-screen h-full col-start-2 col-end-7 border-r-2">
        <div className="h-full  border flex gap-10 p-4 ">
            <>  
                  
            {selectBoard && Array.isArray(selectBoard.columns) && selectBoard.columns.map((col, index) => (
                <div key={index} className="text-center w-72  "> 
                    
                    <div className='flex gap-4  items-center p-4 '>
                        <div className={`h-3 w-3 rounded-full bg-green-200 `}></div>
                        <span className="text-gray-400 "> 
                            {`${col.name} (${col.tasks.length})` }
                        </span>
                    </div>
                    <div className= {`flex flex-col gap-6   h-full  rounded border-gray-400 ${col.tasks.length === 0 ?'border-2 border-dashed border-gray-30 h-full':''}`} >
                        {col.tasks.map((task,taskIndex)=>(
                            <div key={taskIndex} className=" w-full h-30 p-2 bg-white hover:opacity-20 cursor-pointer rounded-lg shadow-md text-left " onClick={()=>openTaskDetail(task)}>
                                <h4 className=" text-sm font-bold p-2">{task.title}</h4>
                                <span className="text-gray-400  p-2 text-sm"> {task.subtasks}</span>
                                
            
                            </div>
                            )
                        )}
                        
                        
                    </div> 

                </div>
              
            ))  }
            <div className=" w-72 flex flex-col gap-6  ">
                 <div className=" p-4 "></div>
                 <div className=" bg-gradient-to-b from-slate-300 rounded flex justify-center content-center text-gray-400 font-bold text-2xl h-full hover:text-purpledo"><button> + New Coulmn</button></div>
            </div>
            </>
        </div>
        
        {taskShowModal &&(
         <div className="bg-black/40 fixed top-0 left-0 h-screen w-full">
            <div ref={modalRef} className="bg-white fixed w-1/3 flex flex-col gap-5 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-max p-6 rounded" >
                <div className="flex justify-between">
                    <div className="text-sm font-bold ">{selectTask.title}</div>
                    <div className=" relative">
                        <div className="flex flex-col  cursor-pointer gap-1" onClick={toggleMenu}>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                        </div>
                    </div>
                    {isOpenTask&&(
                        <div className=" absolute flex flex-col items-center bg-white w-32 h-15 z-50 top-12 -right-8 text-sm rounded shadow-2xl gap-2 p-2">
                            <div className="text-gray-500">Edit Task</div>
                            <div className="text-red-400 " onClick={()=>dispatch(setDeleteModal(true))} >Delete Task</div>

                        </div>
                    )}
                </div>
                <span className="text-gray-400">{selectTask.description}</span>
                <div  className="bg-gray-100 hover:bg-buttoncolor text-sm font-bold h-full p-4 rounded-md ">{selectTask.subtasks}</div>
                <label className="text-gray-400 text-sm">current state</label>
                <select className="rounded border-2 p-2 hover:border-purpledo" value={selectBoard.columns} >
                        <option value="" ></option>
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