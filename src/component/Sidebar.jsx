import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import store from "../features/store";
import { setSaveboard } from "../features/savedataSlice";
import ModalDelete from "./ModalDelete";
import { setDeleteModal ,setShowModalBoard} from "../features/modalSlice";
import ModalBoard from "./BoardModal";
import Main from "./Mainarea";

function Sidebar() {
    const dispatch = useDispatch();
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {showModalBoard}=useSelector((state)=>state.modals)
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    
  

    useEffect(() => {
        const storeData =localStorage.getItem('saveNewData');
        if(storeData){
            const parsedData = storeData ? JSON.parse(storeData) : [];
        
            dispatch(setSaveboard(parsedData));
        }
    }, [dispatch]);
    
    const handleSelectBoard = (item) => {
    
            dispatch(setSelectBoard(item));
    };

    return (

  
        <div className="grid grid-cols-6  w-screen h-full">
            <div className="flex flex-col bg-white gap-96 h-screen col-span-1 border-r-2">
                <div className="flex flex-col  text-center items-baseline gap-4 ">
                    <div className="text-xs  text-gray-400 flex  p-4">ALL BOARDS {`(${boardsave.length})`}</div>
                        {(Array.isArray(boardsave) && boardsave.map((item,index) => (
                        <div  key={index} className="text-gray-500  text-base text-left w-10/12 hover:text-white  hover:bg-purpledo rounded-sm pl-6 rounded-r-full h-10 hover:transition ease-out p-2" 
                            onClick={() => handleSelectBoard(item)}>
                            {item.Name}
                        </div>
                    )))}
                    <button className="text-purpledo pl-6" onClick={() => dispatch(setShowModalBoard(true))}>+ Create New Board</button> 
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center p-2 w-32 bg-gray-300">
                        <button className="rounded bg-purple-900 w-10 h-4"></button>
                    </div>
                </div>
            </div>
            <Main/>
            { showModalBoard && <ModalBoard /> }
            
            
        </div>


    );
}

export default Sidebar;
