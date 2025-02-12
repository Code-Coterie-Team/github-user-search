import {  useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setShowEditBoard ,setDeleteModal,setShowTaskModal} from "../features/modalSlice";
import ToggleIcon from "../assets/ToggleIcon";
import MiniSide from "./MiniSide";


function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    const [sideOpen,setSideOpen]=useState(false)
    
    
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
   
    const handeltoggle=()=>{
         setIsOpen(false);
        dispatch(setShowEditBoard(true))
         
    }
    
    const handeltoggleDel=()=>{
        setIsOpen(false);
        dispatch(setDeleteModal(true))
    }
    
   const toggleSide=()=>{
        setSideOpen(!sideOpen);
   }


    
    
    


    return(
        
        <div className="bg-white  dark:bg-dark-primary-100 text-white  h-2/4 border-b dark:border-b-gray-500  grid  grid-cols-9 ">
            <div className="flex  items-center md:border-r dark:border-r-gray-500  gap-2  md:p-8  col-span-2 ">
                <div className=" flex   md:hidden  w-34 h-8 "><img src="/logo.svg"  className="h-full w-full" alt="kanban board" /></div>
                <div className=" hidden md:flex w-34 h-8 "><img src="/logolight.svg"  className="h-full w-full" alt="kanban board" /></div>
                <button className="flex items-center md:hidden" onClick={toggleSide}> <ToggleIcon/></button>
                
             </div>
             {sideOpen && <MiniSide/>}
            <div className=" p-6  dark:bg-dark-primary-100 dark:text-white flex  items-center justify-between   col-start-3  col-end-10 ">
                <h1  className=" text-lg md:text-2xl font-bold text-black dark:text-white tracking-wide  p-2">{ selectBoard? selectBoard.Name : "borad dose not exist" }</h1>
                <div className="flex justify-center  gap-6">
                    <button className="bg-purpledo w-12 h-8  text-center font-bold text-sm rounded-3xl text-white p-2 md:h-12 md:w-40" onClick={()=>dispatch(setShowTaskModal(true))}>+ <span className="hidden md:inline-block">Add New Task</span></button>
                    <div className=" relative p-2">
                        <div className="menu-icon flex cursor-pointer flex-col gap-1 " onClick={toggleMenu} >
                            <div className=" size-1 bg-slate-500 rounded-full " ></div>
                            <div className="size-1 bg-slate-500 rounded-full" ></div>
                            <div className="size-1 bg-slate-500 rounded-full" ></div>
                        </div>
                    </div>
                    
                    {isOpen && (
                    <div className=" absolute bg-white w-32 z-50 top-20 shadow-md rounded-lg right-2 dark:bg-dark-primary-100 p-2">
                        <ul className=" cursor-pointer">
                            <li className="text-gray-400 text-sm  font-medium " onClick={handeltoggle}>Edit Board</li>
                            <li className="text-red-400   text-sm font-meduim" onClick={handeltoggleDel} >Delete Board </li>
                        </ul>
                    </div>
                    )}
                </div>

            </div>
        </div>

    
    )
}

export default  Header;