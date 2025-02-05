import { setDeleteModal,setShowModalBoard} from "../features/modalSlice";
import { useSelector,useDispatch } from "react-redux";
import { setSaveboard } from "../features/savedataSlice";
import { useRef, useState,useEffect } from "react";
import { setSelectBoard } from "../features/boardSlice";

function ModalBoard(){
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const{showModalBoard}=useSelector((state)=>state.modals);
    const boradRef=useRef(null);
    const dispatch=useDispatch();
    const [newBoardName, setNewBoardName] = useState('');
    const [newColumnName, setNewColumnName] = useState([{name:'',tasks:[]}]);
    console.log(newBoardName);
    
   

    const addNewColumn = () => {
        
        if (newColumnName.length<6){
            setNewColumnName([...newColumnName,{name:'',tasks:[]}]);
        }
        }
       
    
    const handelSave = () => {
        
        const updateData = [...boardsave,
            { Name: newBoardName,
            columns:newColumnName.map(col=>({name:col,tasks:[]}))
            }];
        dispatch(setSaveboard(updateData));
        const selectboarddata={Name:newBoardName,columns:newColumnName.map(col=>({name:col,tasks:[]}))}
        dispatch(setSelectBoard(selectboarddata));
        
        localStorage.setItem('saveNewData', JSON.stringify(updateData));
    
    
        setNewColumnName([{name:'',tasks:[]}]);
        setNewBoardName('');
        
        dispatch(setShowModalBoard(false))
        
        
    };

    const handelInputChange = (event) => {
        const {name,value}=event.target;
        if(name==='boardName'){
            setNewBoardName(value)
        }
        
        
        
    };
    const handelColumnChange =(index,value)=>{
        
            const upadateColumn=[...newColumnName,]
            upadateColumn[index]=value;
            setNewColumnName(upadateColumn);
        }
    useEffect(()=>{
        if(showModalBoard){
            document.addEventListener('mousedown',handelClickOut);
        }else{
            document.removeEventListener('mousedown',handelClickOut)
        }
        
        

    },[showModalBoard]);



    const handelClickOut=(event)=>{
        if(boradRef.current && !boradRef.current.contains(event.target)){
            dispatch(setShowModalBoard(false))
        }
    }
    
    return(

        <div className="bg-black/40 fixed h-full w-full top-0 left-0">
            <div ref={boradRef} className="fixed dark:bg-dark-primary-100 dark:text-white bg-white top-1/2 left-1/2  w-2/5  -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-9 rounded-xl">
            <span className="font-bold text-xl">Add New Board</span>
            <form className="flex text-xs flex-col">
                <label className=" p-2 font-bold text-gray-400">Name</label>
                <input 
                    required
                    name="boardName" 
                    type="text" 
                    className="border-2 p-2 text-sm font-normal rounded-md h-10  hover:border-purpledo  dark:border-dark-primary-200 dark:bg-dark-primary-100" 
                    value={ newBoardName}  
                    onChange={(e) =>{handelInputChange(e);
                        ;
                    }} 
            
                />
                <label className=" p-2 font-bold text-gray-400">Columns</label>
                <div className="flex flex-col gap-2  ">
                    { Array.isArray(newColumnName)&& newColumnName.map((col,index)=>
                       <input type="text" name="column" required  value={col.name} key={index} onChange={(e)=>{handelColumnChange(index,e.target.value);
                        }
                        }
                       
                        className=" border-2 p-2 rounded-md h-10 text-sm font-normal   hover:border-purpledo dark:border-dark-primary-200 dark:bg-dark-primary-100"
                    />
                   )}
                </div>
                
                
            </form>
            <button className="text-purpledo p-2 rounded-xl bg-buttoncolor text-xs" onClick={addNewColumn}> + Add New Column </button>
            <button className="bg-purpledo text-white text-xs rounded-xl p-2" onClick={handelSave}>Create New Board </button>
        </div>
    </div>
    )

}

export default ModalBoard;

