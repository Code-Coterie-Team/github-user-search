import { useState } from "react";



function Sidebar(){
    const[showModal,setShowModal]= useState(false)
    const[board,setBoard]=useState({
        'name':"",
        'coulmns':'',

    })
    
    return(

    <div className="flex ">
        <div className="flex flex-col bg-white gap-96  h-screen p-2 items-baseline w-1/5">
            <div className="flex  flex-col gap-2">
                <div className="" > ALL BOARDS</div>
                <div className="text-gray-500 hover:text-white bg-purple-900"></div>
                 <button className="text-purple-400" onClick={()=>{
                    setShowModal(true);
                    modalBoard();
                 }

                 }>+ Create New Board </button> 
            </div>

            <div className="flex flex-col items-center ">
                <div className=" flex justify-center p-2 w-32 bg-gray-300">
                    <button className="rounded bg-purple-900 w-10 h-4"></button>
                </div>
            </div>
        </div>
        <div className="bg-slate-400 w-4/5"></div>
        { showModal && (
            <div className="bg-black/40  fixed w-full h-screen top-0 left-0">
                <div className=" fixed bg-white top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4  ">
                    <span>Add New Board</span>
                    <form>
                        <label htmlFor="">Name</label>
                        <input type="text" />
                    </form>
                     
                </div>
            </div>
        )

        }
        </div>
        
    
        
    );
}

export default Sidebar;