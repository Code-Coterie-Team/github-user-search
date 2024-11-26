import { useEffect, useRef, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import { setSaveboard } from "../features/savedataSlice";


function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {boardsave}=useSelector((state)=>state.boardsave);
    const [modalTask,setModalTask]=useState(false);
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    const [modalDelete,setModalDelete]=useState(false);
    const modalTakRef=useRef(null);
    const [taskTitle,setTaskTitle]=useState('');
    const [taskDescriotion,setTaskDescription]=useState('');
    const [subtask,setSubtask]=useState([]);
    console.log(selectBoard);
    const [seletColumn,setSeclectCoulmn]=useState('');
    const [modaledit,setModalEdit]=useState(false);
    const [editBoardName,setEditBoardName]=useState(selectBoard ?.Name);
    const[editColumns,setEditColumns]=useState(() => {
        if (selectBoard && Array.isArray(selectBoard.columns)) {
            return selectBoard.columns.map(col => col.name);
        }
        return [];
    });
  
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
    const handelClickDelModal= (event)=>{
        if (modalTakRef.current && !modalTakRef.current.contains(event.target)) {
            setModalTask(false);
        }

    }
   
    
    useEffect(() => {
        if (modalTask) {
            document.addEventListener( 'mousedown',handelClickDelModal);
        } else {
            document.removeEventListener('mousedown',handelClickDelModal);
        };
        return () => {
            document.removeEventListener('mousedown',handelClickDelModal);
        };
        }, [modalTask]);


    const handelDelete=()=>{
        if(selectBoard){
            
            const  updateData=boardsave.filter(item=>item.Name !==selectBoard.Name);
            localStorage.setItem('saveNewData',JSON.stringify(updateData));

            dispatch(setSaveboard(updateData));
        }
    }

    const handelSaveTask=()=>{
        if(selectBoard && seletColumn){
        
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
        const storeData=JSON.parse(localStorage.getItem('saveNewData')||'[]');
        
        const updateStoreData=storeData.map((item)=>{
            if(item.Name===selectBoard.Name){
                return{...item,columns:updateColumns};
            }
            return item;
        });
        localStorage.setItem('saveNewData',JSON.stringify(updateStoreData));

        setTaskTitle('');
        setTaskDescription('');
        setSubtask('');
        setSeclectCoulmn('');
        setModalTask(false);
     };
   }
   useEffect(() => {
    const storeData =localStorage.getItem('saveNewData');
    if(storeData){
        const parsedData = storeData ? JSON.parse(storeData) : [];
    
        dispatch(setSaveboard(parsedData));
    }
    }, [dispatch]);

    const handeledit=()=>{
        setModalEdit(!modaledit);
                   
    }
    
    const handelDeleteColumn =(col)=>{
        const updateData=editColumns.filter(item=> item!== col);
        setEditColumns(updateData)
        const storeData=JSON.parse(localStorage.getItem('saveNewData'));
        const upadateStoreData=storeData.map(item=>{
            if(item.name === selectBoard.Name){
                return{
                    ...item,
                    columns:updateData.map(name=>({name,tasks:[]}))
                }
            }
           
            return item
        })
        localStorage.setItem('saveNewData',JSON.stringify(upadateStoreData)) 
        setSelectBoard(prevBoard => ({
            ...prevBoard,
            columns:updateData.map(name => ({ name, tasks: [] }))
        }));

        }
    
    const handelSaveEdit=()=>{
        const updateData=boardsave.map(item=>{
            if(item.Name === selectBoard.Name){
                return{
                    ...item,
                    columns:editColumns.map(name=>({name,tasks:[]}))
                }
            }
            return item
        })
        dispatch(setSelectBoard(updateData));
        localStorage.setItem('saveNewData', JSON.stringify(updateData));
        setModalEdit(false)
    }
    return(
    
        <div className="bg-white h-28 border-b-2 justify-left align-middle grid grid-cols-6  ">
            <div className="flex text-center   border-r-2  p-8   col-span-1 gap-6">
                <img src="./src/assets/logo-dark.8590e096.svg" alt="" />

            </div>
            <div className=" p-3  flex  items-center justify-between  col-start-2  col-end-7">
                <h2  className="">{selectBoard ? selectBoard.Name : "No Board Found"}</h2>
                <div className="flex  gap-8">
                    <button className="bg-purpledo  rounded-3xl text-white p-2 h-10" onClick={()=>(setModalTask(true))}>+ Add New Task</button>
                    <div className=" relative">
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
                            <li className="text-red-400 cursor-pointer" onClick={()=>(setModalDelete(true))} >Delete Board </li>
                        </ul>
                    </div>
                    )}
                </div>

            </div>
            {/* modal delete */}
            {modalDelete && (
                <div  ref={modalTakRef}className="bg-black/40 fixed w-full h-full top-0 left-0">
                    <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl">
                        <span className="text-red-400">Delete this board?</span>
                        <span className="text-gray-400 text-xs">Are you sure you want to delete the {selectBoard.Name} board? This action will remove all columns and tasks and cannot be reversed.</span>
                        <div className="flex gap-4 justify-center"> 
                            <button className="bg-red-400 rounded-full text-white w-1/2" onClick={handelDelete}>Delete</button>
                            <button className="bg-slate-300 rounded-full text-purple w-1/2" onClick={()=>{setModalDelete(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>

               )

            }  
            {/* save task in this modal */}
                {modalTask &&(
                        <div   className="bg-black/40 fixed top-0 left-0 h-full w-full">
                            <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl" ref={modalTakRef}  >
                                <label className="text-gray-400" >Title</label>
                                <input type="text" className="border-2" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                                <label className="text-gray-400">Description</label>
                                <input type="text" className="border-2 h-20" value={taskDescriotion} onChange={(e)=> setTaskDescription(e.target.value)} />
                                <label  className="text-gray-400">Subtasks</label>
                                <input type="text" className="border-2 " value={subtask} onChange={(e)=>setSubtask(e.target.value)} />
                                <button className="bg-buttoncolor text-purpledo rounded-2xl">+ Add Ne Subtask</button>
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
                    )}
            
            {/* edit modal */}
            {modaledit && (
                <div className="bg-black/40 fixed top-0 left-0 h-full w-screen">
                    <div className="bg-white w-96 h-max top-1/2 flex flex-col gap-4 left-1/2 
                    -translate-x-1/2 -translate-y-1/2 fixed p-8 rounded  ">
                        <div className="text-black">Edit Board </div>
                        <label className="text-gray-400 text-sm" >Name</label>
                        <input type="text" value={selectBoard.Name} onChange={(e)=>{
                            setSelectBoard(e.target.value)}} className="border-2 rounded-sm p-2 text-sm"/>
                        <label className="text-gray-400" >columns</label>
                    
                                {selectBoard.columns.map((col,index)=>{
                                    return(
                                        
                                        <div className="flex  gap-1 w-full">

                                            <input type="text"  value={col.name}
                                                key={index} 
                                                placeholder={`Column ${index + 1}`} 
                                                onChange={(e)=>{
                                                const newCoulmns=[...selectBoard.columns];
                                                newCoulmns[index]=e.target.value;
                                                dispatch(selectBoard.columns((newCoulmns)))}}
                                                className="border-2 rounded-sm p-2 w-full"
                                            />
                                            <button className="bg-transparent h-5 w-5 rounded-full text-gray-400" onClick={(index)=>(handelDeleteColumn(col))}>X</button>
                                        </div>

                                    )
                                    }) }
                    
                        
                            <button className="rounded-2xl bg-buttoncolor text-purpledo w-full h-10 " >+add new column</button>
                            <button className="rounded-2xl bg-purpledo text-white h-10 " onClick={handelSaveEdit}>save changes</button>
                            
                        
                    </div>
                </div>
            )}

        </div>

    
    )
}

export default  Header;