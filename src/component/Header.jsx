import { useEffect, useRef, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import { setSaveboard } from "../features/savedataSlice";
import ModalDelete from "./ModalDelete";
import { setDeleteModal } from "../features/modalSlice";
import ModalBoard from "./BoardModal";
import ModalTask from "./TaskModal";


function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    
    const {boardsave}=useSelector((state)=>state.boardsave);
    const [modalTask,setModalTask]=useState(false);
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
   
    const modalTakRef=useRef(null);
   
    const [modaledit,setModalEdit]=useState(false);
    const [editBoardName,setEditBoardName]=useState(selectBoard ?.Name);
    const[editColumns,setEditColumns]=useState(() => {
        if (selectBoard && Array.isArray(selectBoard.columns)) {
            return selectBoard.columns.map(col => col.name);
        }
        return [];
    });
    const {modalDelete}=useSelector((state)=>state.modalDelete);


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
    
    const handelDeleteColumn =(index)=>{
         const select=selectBoard.columns[index];

        if(select.tasks.length === 0){
                    const update=selectBoard.columns.filter((_,colIndex)=>colIndex !== index);
                    dispatch(setSelectBoard({...selectBoard,columns:update}));

                    const updatesvae=boardsave.map(board=>
                        board.Name === selectBoard.Name ?{...board,columns:update} :board
                    );
                    dispatch(setSaveboard(updatesvae));
                    localStorage.setItem('saveNewData',JSON.stringify(updatesvae));

        }
        
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
    const addNewColumn = () => {
        
        selectBoard.columns([...newColumnName,{name:'',tasks:[]}])
        
    }
   

    return(
    
        <div className="bg-white h-28 border-b-2 justify-left align-middle grid grid-cols-6  ">
            <div className="flex text-center   border-r-2  p-8   col-span-1 gap-6">
                <img src="./src/assets/logo-dark.8590e096.svg" alt="" />

            </div>
            <div className=" p-6  flex  items-center justify-between  col-start-2  col-end-7">
                <h2  className=" text-lg p-2">{ selectBoard ? selectBoard.Name :  boardsave[0].Name}</h2>
                <div className="flex justify-center  gap-6">
                    <button className="bg-purpledo  rounded-3xl text-white p-2 h-10" onClick={()=>(setModalTask(true))}>+ Add New Task</button>
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
            {modalTask ? <ModalTask/> :undefined}
                        
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
                                            <button className="bg-transparent h-5 w-5 rounded-full text-gray-400"  key={index} onClick={()=>(handelDeleteColumn(index))}>X</button>
                                        </div>

                                    )
                                    }) }
                    
                        
                            <button className="rounded-2xl bg-buttoncolor text-purpledo w-full h-10 " onClick={addNewColumn}  >+add new column</button>
                            <button className="rounded-2xl bg-purpledo text-white h-10 " onClick={handelSaveEdit}>save changes</button>
                            
                        
                    </div>
                </div>
            )}
            

        </div>

    
    )
}

export default  Header;