import { useDispatch, useSelector } from "react-redux"
import { setSelectTask } from "../features/selecttaskSlice"
import { useRef, useState ,useEffect} from "react"
import { setShowEditTask } from "../features/modalSlice"
import { setSelectBoard } from "../features/boardSlice"



function EditTask(){
    const {selectTask}=useSelector((state)=>state.selectTask)
     const taskEitRef=useRef(null)
    const dispatch=useDispatch()
    const [seletColumn,setSeclectCoulmn]=useState('');
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {showEditTask}=useSelector((state)=>state.modals)
    const [updateTask,setUpdateTask]=useState({title:selectTask.title,description:selectTask.description,subtasks:[...selectTask.subtasks]})


    const handelEditTitle=(e)=>{
        const newTitle=e.target.value;
       setUpdateTask(prevTask=>({
            ...prevTask,
            title:newTitle,

       })) }
    
    const handelEditDescription=(e)=>{
        const newDescription=e.target.value;
        setUpdateTask(prevTask=>({
            ...prevTask,
            description:newDescription,
        }))
       }
    const handelEdtiSubtasks=(e)=>{
        const newSubtasks=e.target.value;
        setUpdateTask((prevTask)=>({
            ...prevTask,
            subtasks:[...prevTask.subtasks,newSubtasks]
        }))
    }
    const handelSaveEditTask=()=>{
        console.log(selectBoard);
        dispatch(setSelectTask({...selectTask,title:updateTask.title,description:updateTask.description,subtasks:[...updateTask.subtasks]}))
        const updateEditTask=selectBoard.columns.find(item=> item.tasks.some())

            item.title===selectTask.title ?{...item, title:updateTask.title,description:updateTask.description,subtasks:[...updateTask.subtasks]} :item
        
        dispatch(setSelectBoard([...selectBoard,updateEditTask]));
        

        dispatch(setShowEditTask(false))
        
    }
    useEffect(()=>{
        if(showEditTask){
            document.addEventListener('mousedown',handelClick)
        }else{
            document.removeEventListener('mousedown',handelClick)
        }
    },[showEditTask]);

    const handelClick=(event)=>{
        if(taskEitRef.current && !taskEitRef.current.contains(event.target)){
            dispatch(setShowEditTask(false))

        }
    }


   return (
    <div  className="bg-black/40 fixed top-0 left-0 h-full w-full">
        <div ref={taskEitRef} className="bg-white dark:bg-dark-primary-100  text-gray-950  fixed top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl"  >
            <label className="text-gray-500 bg-white " >Title</label>
            <input type="text" className="border-2 p-2"  value={updateTask.title} onChange={handelEditTitle}/>
            <label className="text-gray-400">Description</label>
            <input type="text" className="border-2 h-20 p-2" value={selectTask.description} onChange={handelEditDescription} />
            <label  className="text-gray-400">Subtasks</label>
            <input type="text" className="border-2 p-2"  value={selectTask.subtasks} onChange={handelEdtiSubtasks} />
            <button className="bg-buttoncolor text-purpledo rounded-2xl">+ Add New Subtask</button>
            <label className="text-gray-400" >Status</label>
            <select className="border-2 rounded-2xl p-2" value={seletColumn} >
                <option value="" selected>{selectBoard.columns.find(col=>col.tasks.some(task=>task.title===setSelectTask.title))?.name}</option>
                    {selectBoard.columns.map((col,index)=>(
                    <option key={index} value={col.name}>{col.name}</option>
                    )

                )}
            </select>
            <button className=" rounded-2xl bg-purpledo text-white h-10" onClick={handelSaveEditTask} >Edit Task</button>
        </div>
   </div>
   )

}

export default EditTask