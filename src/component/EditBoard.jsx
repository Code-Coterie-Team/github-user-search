import { useEffect, useRef, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import { setSaveboard } from "../features/savedataSlice";
import {  setShowEditBoard } from "../features/modalSlice";


function EditBoard(){
    const {boardsave}=useSelector((state)=>state.boardsave);
    const editBoardRef=useRef(null);
    const {showEditBoardModal }=useSelector((state)=>state.modals)
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    
    const [newColumnName, setNewColumnName] = useState('');
    const[isShoeNewCoulmn,setIsShowNewColumn]=useState(false);
    const dispatch=useDispatch()
    const {theme}=useSelector((state)=>state.theme)
    const [newBoardName,setNewBoardName]=useState(selectBoard.Name)
    
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

    useEffect(()=>{
        if(showEditBoardModal){
            document.addEventListener('mousedown',handelClickEdit)
            console.log('modakl');
        }
        return(
            document.removeEventListener('mousedown',handelClickEdit)
        )
    },[showEditBoardModal]);

    const handelClickEdit=(event)=>{
        if(editBoardRef.current  && !editBoardRef.current.contains(event.target)){
            dispatch(setShowEditBoard(false));
            
        }else{
            console.log('not herhe');
        }
    }

    const addNewColumn = () => {

        if(!newColumnName){
            setIsShowNewColumn(true)
        } else{
        
            if  (!newColumnName.trim()) return;
            
            if(selectBoard.columns.length<5){
                const newColumn = { name:newColumnName, tasks: [] };
                const updatedColumns = [...selectBoard.columns, newColumn];
                dispatch(setSelectBoard({ ...selectBoard, columns: updatedColumns }));
    

            const updatedSaveData = boardsave.map(board =>
                board.Name === selectBoard.Name ? { ...board, columns: updatedColumns } : board
            );
            dispatch(setSaveboard(updatedSaveData));
            localStorage.setItem('saveNewData', JSON.stringify(updatedSaveData));
            setEditColumns(updatedColumns.map(col => col.name)); 
    
            setNewColumnName('');
            }
        }
    };
    const handelNewName=(e)=>{
        setNewBoardName(e.target.value);
    }
    
    const handelSaveEdit=()=>{
            const updatedColumns = selectBoard.columns.map((col) => ({
                name: col.name,
                tasks: col.tasks,
            }));
        
        
            if (newColumnName.trim()) {
                updatedColumns.push({ name: newColumnName, tasks: [] });
                setNewColumnName(''); 
            }
        
            
            dispatch(setSelectBoard({ ...selectBoard,Name:newBoardName, columns: updatedColumns }));
            const updatedSaveData = boardsave.map(item => 
                item.Name === selectBoard.Name ? { ...item, Name:newBoardName,columns: updatedColumns } : item
            );
        
            
            dispatch(setSaveboard(updatedSaveData));
            localStorage.setItem('saveNewData', JSON.stringify(updatedSaveData));
            dispatch(setShowEditBoard(false))
    
    }
   

    return(
        <div className="bg-black/40 fixed top-0 left-0 h-full w-screen">
            <div ref={editBoardRef}  className="bg-white dark:bg-dark-primary-100 dark:text-white w-96 h-max top-1/2 flex flex-col gap-4 left-1/2 
                    -translate-x-1/2 -translate-y-1/2 fixed p-8 rounded  ">
                <div className="text-black dark:text-white">Edit Board </div>
                <label className="text-gray-400 text-sm" >Name</label>
                <input type="text" value={newBoardName}  onChange={handelNewName} className="border-2 rounded-sm p-2 text-sm  dark:bg-dark-primary-100 dark:border-dark-primary-200"/>
                <label className="text-gray-400" >columns</label>
                    {Array.isArray(selectBoard.columns )&&selectBoard.columns.map((col,index)=>{
                        return(
                            <div className="flex  gap-1 w-full" key={index} >
                                <input type="text"  
                                    value={col.name}
                                    
                                    onChange={(e)=>{
                                    const newCoulmns=[...selectBoard.columns];
                                    newCoulmns[index]=e.target.value;
                                    dispatch(setSelectBoard(selectBoard.columns((newCoulmns))))}}
                                    
                                    className="border-2 rounded-sm p-2 w-full dark:bg-dark-primary-100 dark:border-dark-primary-200"
                                />
                                <button className="bg-transparent h-5 w-5 rounded-full text-gray-400"   onClick={()=>(handelDeleteColumn(index))}>X</button>
                            </div>        
                        )
                        }) 
                    }
        
                    {isShoeNewCoulmn && (<input
                                    type="text"
                                    value={newColumnName}
                                    onChange={(e) => setNewColumnName(e.target.value)}
                                    className="border-2 rounded-sm p-2 w-full dark:bg-dark-primary-100 dark:border-dark-primary-200"
                                />)}    
                    
                <button className="rounded-2xl bg-buttoncolor text-purpledo w-full h-10 " onClick={(addNewColumn)}  >+add new column</button>
                <button className="rounded-2xl bg-purpledo text-white h-10 " onClick={handelSaveEdit}>save changes</button>
                
            
            </div>
        </div>
    )
}

export default EditBoard