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
    const {selectBoard}=useSelector((state)=>state.board)
    const {boardsave}=useSelector((state)=>state.boardsave || {boardsave:[]});
   const {theme}=useSelector((state)=>state.theme);
    console.log(selectBoard);

    const [isChecked, setIsChecked] = useState(false);
    const [isVisibleSideBar,setIsVisibleSideBar]=useState(true)

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
      if(theme==="light"){
        dispatch(setTheme("dark"))
      }else{
        dispatch(setTheme("light"))
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
        
    }, [dispatch]);
    
    const handleSelectBoard = (item) => {
            dispatch(setSelectBoard(item));

            };
    // const toggleSideBar=()=>{
    //         setIsVisibleSideBar(!isVisibleSideBar)
    // }
  
    return (

          
        
            <div className={`flex flex-col h-full dark:bg-dark-primary-100 dark:text-white bg-white gap-96
                col-span-2 border-r dark:border-r-gray-500 ${isVisibleSideBar ?'':'hidden'}` }>
                <div className="flex flex-col  text-center  gap-4  ">
                    
                    <div className="text-xs  text-gray-400 flex   p-4">ALL BOARDS {`(${boardsave.length})`}</div>
                        {(Array.isArray(boardsave) && boardsave.map((item,index) => (
                        
                        <button  key={index} className={`text-gray-500 flex gap-4 font-antialiased  text-left w-10/12 hover:text-white hover:bg-purplelight rounded-sm pl-6 
                          rounded-r-full h-10 hover:transition ease-out p-2 ${ item===selectBoard ?'bg-purpledo text-white':'bg-white'}`} 
                            onClick={() => handleSelectBoard(item)}>
                            <img src="./src/assets/grid.svg" alt=""  />
                            <span>{item.Name}</span>
                        </button>
                    )))}
                    <button className="text-purpledo pl-6 flex gap-4" onClick={() => dispatch(setShowModalBoard(true))}>
                        <img src="./src/assets/grid.svg" alt="" />
                        <span>+ Create New Board</span>
                    </button> 
                </div>
                
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex gap-4 justify-center items-center  p-2 rounded-sm w-full h-12 bg-buttoncolor dark:bg-dark-primary-200">
                        <img src="./src/assets/moon.svg" alt="" />
                        <label className="flex cursor-pointer select-none items-center">
                            <div className=" relative">
                                <input type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className=" sr-only"
                                />
                                <div className="block h-6 w-14 rounded-full border border-purpledo  bg-purpledo"></div>
                                <div className={` bg-white absolute  h-4 w-4 rounded-full transition ${isChecked ?'left-1 top-1' : " top-1 left-7"}` }></div>
                            </div>
                        </label> 
                        <img src="./src/assets/sun.svg" alt="" />
                    </div>
    
                </div>
            
          </div>
        
        
       


    );
}

export default Sidebar;
