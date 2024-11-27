import { setDeleteModal } from "../features/modalSlice";
import { useSelector,useDispatch } from "react-redux";
import { setSaveboard } from "../features/savedataSlice";

import { useEffect, useRef, useState } from "react";

function ModalBoard(props){
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const dispatch=useDispatch();
    const [newBoardName, setNewBoardName] = useState('');
    const [newColumnName, setNewColumnName] = useState([{name:'',tasks:[]}]);
    

    const addNewColumn = () => {
        setNewColumnName([...newColumnName,{name:'',tasks:[]}]);
    }

    const handelSave = () => {
    
        const updateData = [...boardsave,
            { Name: newBoardName,
            columns:newColumnName.map(col=>({name:col,tasks:[]}))
            }];
        dispatch(setSaveboard(updateData));
        
        localStorage.setItem('saveNewData', JSON.stringify(updateData));
       
        setNewColumnName([{name:'',tasks:[]}]);
        setNewBoardName('');
        
        
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

    
    return(

        <div className="bg-black/40 fixed w-full h-screen top-0 left-0">
            <div className="fixed bg-white top-1/2 left-1/2 w-1/3 h-max -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-9 rounded-xl"
                >
            <span>Add New Board</span>
            <form className="flex flex-col">
                <label className="text-sm p-2 text-gray-400">Name</label>
                <input 
                    name="boardName" 
                    type="text" 
                    className="border-2  rounded-md h-10  hover:border-purpledo" 
                    value={ newBoardName}  
                    onChange={handelInputChange} 
                   
                />
                <label className="text-sm p-2 text-gray-400">Columns</label>
                <div className="flex flex-col gap-2 ">
                    {newColumnName.map((col,index)=>
                       <input type="text" name="column" value={col.name} key={index} onChange={(e)=>handelColumnChange(index,e.target.value)}
                       
                         className=" border-2 p-2 rounded-md h-10  hover:border-purpledo"
                    />
                   )}
                </div>
                
                
            </form>
            <button className="text-purple p-2 rounded-xl bg-buttoncolor text-base" onClick={addNewColumn}> + Add New Column</button>
            <button className="bg-purpledo text-white font-thin rounded-xl p-2" onClick={handelSave}> Create New Board</button>
        </div>
    </div>
    )

}

export default ModalBoard;