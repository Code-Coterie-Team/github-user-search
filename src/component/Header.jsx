import { useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";

function Header(){
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const [modaltask,setMoalTask]=useState(false);
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    const [modalDelete,setModalDelete]=useState(false);
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
    const handelDelet=()=>{
        if(selectBoard){
            const storeData=JSON.parse(localStorage.getItem('saveData')|| []);
            const  updateData=storeData.filter(item=>item.Name !==selectBoard.Name);
            localStorage.setItem('saveData',JSON.stringify(updateData));

            dispatch(setSelectBoard(null));
        }
    }
    const handelNewTak=()=>{
        setMoalTask(true);
    }


    return(
    
        <div className="bg-white h-28 border-b-2 justify-left align-middle grid grid-cols-6  ">
            <div className="flex text-center   border-r-2  p-8   col-span-1 gap-6">
                <img src="" alt="" />
            </div>
            <div className=" p-3  flex  items-center justify-between  col-start-2  col-end-7">
                <h2  className="">{selectBoard ? selectBoard.Name : "No Board Found"}</h2>
                <div className="flex  gap-8">
                    <button className="bg-purpledo  rounded-3xl text-white p-2 h-10" onClick={handelNewTak}>+ Add New Task</button>
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
                            <li className="text-gray-300" onClick={()=>handelOPtion('Edit Board')}>Edit Board</li>
                            <li className="text-red-400 cursor-pointer" onClick={()=>(setModalDelete(true))} >Delete Board </li>
                        </ul>
                    </div>
                    )}
                </div>

            </div>
            {modalDelete && (
                <div className="bg-black/40 fixed w-full h-full top-0 left-0">
                    <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl">
                        <span className="text-red-400">Delete this board?</span>
                        <span className="text-gray-400 text-xs">Are you sure you want to delete the {selectBoard.Name} board? This action will remove all columns and tasks and cannot be reversed.</span>
                        <div className="flex gap-4 justify-center"> 
                            <button className="bg-red-400 rounded-full text-white w-1/2" onClick={handelDelet}>Delete</button>
                            <button className="bg-slate-300 rounded-full text-purple w-1/2" onClick={()=>{setModalDelete(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>

               )

            }
            <div>
                {modaltask &&(
                        <div className="bg-black/40 fixed top-0 left-0 h-full w-full">
                            <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl" >
                                <label className="text-gray-400" >Title</label>
                                <input type="text" className="border-2" />
                                <label className="text-gray-400">Description</label>
                                <input type="text" className="border-2 h-20" />
                                <label  className="text-gray-400">Subtasks</label>
                                <input type="text" className="border-2 " />
                                <button className="bg-buttoncolor text-purpledo rounded-2xl">+ Add Ne Subtask</button>
                                <label className="text-gray-400" >Status</label>
                                <button className=" rounded-2xl bg-purpledo text-white h-10">Create Task</button>
                            </div>
                        </div>
                    )}
            </div>
            

        </div>

    
    )
}

export default  Header;