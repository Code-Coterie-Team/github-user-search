import { useDispatch,useSelector } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import { useRef, useState,useEffect } from "react";
import { setShowTaskModal } from "../features/modalSlice";




function ModalTask(){
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const modaltaskRef=useRef(null)
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const dispatch=useDispatch()
    const [taskTitle,setTaskTitle]=useState('');
    const [taskDescriotion,setTaskDescription]=useState('');
    const [subtask,setSubtask]=useState([]);
    const [seletColumn,setSeclectCoulmn]=useState('');
    const {showTaskModal}=useSelector((state)=>state.modals);

   
    const handelSaveTask=()=>{
       if(selectBoard && seletColumn) {
        const updateColumns=selectBoard.columns.map((col)=>{
                        if(col.name===seletColumn){
                            return{
                                ...col,
                                tasks:[
                                    ...col.tasks,{
                                        title:taskTitle,description:taskDescriotion,subtasks:[subtask]
                                    }
                                ],
                            };
                        }
                        return col;
                    });

                    dispatch(setSelectBoard({...selectBoard,columns:updateColumns}));

                    const storeData=JSON.parse(localStorage.getItem(('saveNewData')||['']));
                    const updateData=storeData.map((item)=>{
                        if(item.Name===selectBoard.Name){
                            return{...item,columns:updateColumns}
                        }
                        return item
                    })
                    localStorage.setItem('saveNewData',JSON.stringify(updateData));
                    dispatch(setShowTaskModal(false))
                    setTaskTitle('');
                    setTaskDescription('');
                    setSubtask('');
                    setSeclectCoulmn('');
                    

       }
    }

    return(
        <div   className="bg-black/40 fixed top-0 left-0 h-full w-full">
            <div  className="bg-white fixed top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl"  >
                <label className="text-gray-400" >Title</label>
                <input type="text" className="border-2" required value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                <label className="text-gray-400">Description</label>
                <input type="text" className="border-2 h-20" value={taskDescriotion} onChange={(e)=> setTaskDescription(e.target.value)} />
                <label  className="text-gray-400">Subtasks</label>
                <input type="text" className="border-2 "  required value={subtask} onChange={(e)=>setSubtask(e.target.value)} />
                <button className="bg-buttoncolor text-purpledo rounded-2xl">+ Add New Subtask</button>
                <label className="text-gray-400" >Status</label>
                <select className="border-2 rounded-2xl p-2" value={seletColumn} onChange={(e)=>setSeclectCoulmn(e.target.value)}>
                    <option value="" selected></option>
                        {selectBoard.columns.map((col,index)=>(
                            <option key={index} value={col.name}>{col.name}</option>
                            )

                        )}
                </select>
                <button className=" rounded-2xl bg-purpledo text-white h-10" onClick={handelSaveTask}>Create Task</button>
            </div>
        </div>
    ) 
    

    }

export default ModalTask