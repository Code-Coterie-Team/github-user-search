import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import store from "../features/store";
import { setSaveboard } from "../features/savedataSlice";
import ModalDelete from "./ModalDelete";
import { setDeleteModal ,setShowModalBoard} from "../features/modalSlice";
import ModalBoard from "./BoardModal";
import Main from "./Mainarea";
import { setTheme } from "../features/themeSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const {showModalBoard}=useSelector((state)=>state.modals)
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
    const {theme}=useSelector((state)=>state.theme)
  
    const toggleTheme=()=>{
        if(theme==="dark"){
            dispatch(setTheme("light"))
        }else{
            dispatch(setTheme("dark"))
        }
        
    }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {

      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

    useEffect(() => {
        const storeData =localStorage.getItem('saveNewData');
        if(storeData){
            const parsedData = storeData ? JSON.parse(storeData) : [];
        
            dispatch(setSaveboard(parsedData));
        }
        const lasteselectBoard=localStorage.getItem('lastSelectBoard')
        if(lasteselectBoard){
            const board=JSON.parse(lasteselectBoard);
            dispatch(setSelectBoard(board))
        }
    }, [dispatch]);
    
    const handleSelectBoard = (item) => {
            dispatch(setSelectBoard(item));
            localStorage.setItem('lastSelectBoard',JSON.stringify(item))

    };

    useEffect(()=>{
       const storeData=localStorage.getItem('saveNewData')
       if(storeData){
        const  parsedData=storeData?JSON.parse(storeData):[];
       
        parsedData.map((item)=>{
                if(item.Name === selectBoard.Name){
                    dispatch(setSelectBoard(item))

                }
        })}
       

    },[dispatch])
    return (

  
            <div className="flex flex-col dark:bg-dark-primary-100 dark:text-white bg-white gap-96 col-span-1 border-r dark:border-r-gray-500">
                <div className="flex flex-col  text-center items-baseline gap-4 ">
                    <div className="text-xs  text-gray-400 flex  p-4">ALL BOARDS {`(${boardsave.length})`}</div>
                        {(Array.isArray(boardsave) && boardsave.map((item,index) => (
                        <div  key={index} className="text-gray-500  text-base text-left w-10/12 hover:text-white  hover:bg-purple-500 active:bg-purpledo  active:border-green-300 rounded-sm pl-6 rounded-r-full h-10 hover:transition ease-out p-2" 
                            onClick={() => handleSelectBoard(item)}>
                            {item.Name}
                        </div>
                    )))}
                    <button className="text-purpledo pl-6" onClick={() => dispatch(setShowModalBoard(true))}>+ Create New Board</button> 
                </div>
                
                <div className="flex flex-col items-center">
                    <div className="flex justify-center p-2 w-32 bg-gray-300">
                        <img src="" alt="" />
                        <button className="rounded bg-purple-900 w-10 h-4" onClick={toggleTheme}></button>
                        <img src="" alt="" />
                    </div>
                </div>
            
            
            { showModalBoard && <ModalBoard />  }
            
            
        </div>


    );
}

export default Sidebar;
