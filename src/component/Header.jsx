import { useState  } from "react";
 
function Header(){
    const [isOpen,setIsOpen]=useState(false);
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    };
    const handelOPtion=(option)=>{
         setIsOpen(false);
    }
    return(
    
        <div className="bg-white h-28 border-b-2 justify-left align-middle grid grid-cols-3  ">
            <div className="flex text-center   border-r-2  p-8 col-span-1">
                <div>|||</div>
                <h1 className=" font-bold"> kanban</h1>
            </div>
            <div className="justify-between  p-3  flex align-middle  col-start-2  col-end-4">
                <h2  className="">Marketing Plan</h2>
                <div  className="flex justify-start"><button className="bg-purple  rounded-3xl text-white p-2 h-10">+ Add New Task</button></div>
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
                            <li className="text-red-400" onClick={()=>handelOPtion('Delete Board')} >Delete Board </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    
    )
}

export default  Header;