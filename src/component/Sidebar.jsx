import { useEffect, useState } from "react";



function Sidebar(){
    const[showModal,setShowModal]= useState(false)
    const[board,setBoard]=useState({
    Name:"",
    coulmn:"",})
    
    const [selectBoard,setSelectBoard]=useState(null);
    const [saveData,setSaveData]=useState(()=>{
        const storeData=localStorage.getItem('saveData');
        try {
            return storeData ? JSON.parse(storeData) : [];
        }
        catch(error){
            console.error("eror",error);
            return [];
        }
    }

    )
   
   const handelSave=()=>{
    
        if(board.Name && board.coulmn){
        const updateData=[...saveData,{Name:board.Name,coulmn:[board.coulmn]}];
        setSaveData(updateData);
        localStorage.setItem('saveData',JSON.stringify(updateData));
        setShowModal(false);
        setBoard({Name:'',coulmn:''});
    }
   }
   useEffect(()=>{
       localStorage.setItem('saveData',JSON.stringify(saveData));
   },[saveData]);

    const handelInputChange=(event)=>{
        const {name,value}=event.target;
        setBoard(prevBoard=>({
            ...prevBoard,
            [name]:value,
        }))
    }
    const handelSelectBoard=(item)=>{
         setSelectBoard(item)
    }
    
    return(

    <div className=" grid grid-cols-3  w-full ">
        <div className="flex flex-col bg-white gap-96  h-screen p-2 items-baseline  grid-cols-1">
            <div className="flex  flex-col gap-2">
                <div className="" > ALL BOARDS</div>

                    {saveData.map((item,index)=>(
                                <div key={index} className="text-gray-500 bg-white hover:text-white hover:bg-purple rounded-sm pl-6" onClick={()=>{handelSelectBoard(item)}}>{item.Name}</div>

                    )
                    )}

                <button className="text-purple" onClick={()=>{
                    setShowModal(true);
                }}>+ Create New Board </button> 
            </div>

            <div className="flex flex-col items-center ">
                <div className=" flex justify-center p-2 w-32 bg-gray-300">
                    <button className="rounded bg-purple-900 w-10 h-4"></button>
                </div>
            </div>
        </div>
        <div className="bg-gray-300 col-start-2 col-end-4 border-r-2">
            <div className="h-full border">
                { selectBoard && Array.isArray(selectBoard.coulmn) && selectBoard.coulmn.map((col,index)=>(
                    <div key={index} className="text-center"> {col} </div>
                    
                ))}
            </div>
        </div>
        { showModal && (
            <div className="bg-black/40 fixed w-full h-screen top-0 left-0">
                <div className=" fixed bg-white top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-9  rounded-xl ">
                    <span>Add New Board</span>
                    <form className="flex flex-col">
                        <label  className="text-sm p-2 text-gray-400 p2" >Name</label>
                        <input  name="Name" type="text" className=" border-2" value={board.Name}  onChange={handelInputChange}/> 
                        <label className="text-sm p-2 text-gray-400">coulmns</label>
                        <input name="coulmn" type="text" value={board.coulmn} onChange={handelInputChange} className=" border-2 p-2" />
                    </form>
                    <button className="text-purple p-2 rounded-xl bg-buttoncolor text-base"> + Add New coulmn</button>
                    <button className="bg-purple text-white font-thin rounded-xl p-2" onClick={handelSave  } > Create New Board</button>
                
                </div>
            </div>
        )

        }
        </div>
        
    
        
    );
}

export default Sidebar;