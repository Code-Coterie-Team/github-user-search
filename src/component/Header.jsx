import {  useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setShowEditBoard ,setDeleteModal,setShowTaskModal} from "../features/modalSlice";


function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    
    
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
   
    
    
    
    



    
    
    


    return(
        // conver grid min one 
        <div className="bg-white  dark:bg-dark-primary-100 text-white  h-2/4 border-b dark:border-b-gray-500  grid  grid-cols-9 ">
            <div className="flex  border-r dark:border-r-gray-500  p-8   col-span-2 ">
                <img src="./src/assets/logo-dark.8590e096.svg" alt="" />

            </div>
            <div className=" p-6  dark:bg-dark-primary-100 dark:text-white flex  items-center justify-between   col-start-3  col-end-10 ">
                <h1  className=" text-2xl font-bold text-black dark:text-white  p-2">{ selectBoard? selectBoard.Name : "borad dose not exist" }</h1>
                <div className="flex justify-center  gap-6">
                    <button className="bg-purpledo font-bold  rounded-3xl text-white p-2 h-12 w-40" onClick={()=>dispatch(setShowTaskModal(true))}>+ Add New Task</button>
                    <div className=" relative p-2">
                        <div className="menu-icon flex cursor-pointer flex-col gap-1 " onClick={toggleMenu} >
                            <div className=" size-1 bg-slate-500 rounded-full " ></div>
                            <div className="size-1 bg-slate-500 rounded-full" ></div>
                            <div className="size-1 bg-slate-500 rounded-full" ></div>
                        </div>
                    </div>
                    {/* change parent */}
                    {isOpen && (
                    <div className=" absolute bg-white w-28 z-50 top-20 right-2 dark:bg-dark-primary-100 p-2">
                        <ul className=" cursor-pointer">
                            <li className="text-gray-300 " onClick={()=>dispatch(setShowEditBoard(true))}>Edit Board</li>
                            <li className="text-red-400 " onClick={()=>dispatch(setDeleteModal(true))} >Delete Board </li>
                        </ul>
                    </div>
                    )}
                </div>

            </div>
        </div>

    
    )
}

export default  Header;