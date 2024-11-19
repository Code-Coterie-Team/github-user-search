import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";


function Sidebar(){
    const dispatch=useDispatch();
  
    const[showModal,setShowModal]= useState(false)
    const[board,setBoard]=useState({
    Name:"",
    coulmns:[''],})
    console.log(board);
    
    const [selectedBoard, setSelectedBoard] = useState(null)
    
    
    const [saveData,setSaveData]=useState(()=>{
        const storeData=localStorage.getItem('saveData');
        try {
            return storeData ? JSON.parse(storeData) : [];
        }
        catch(error){
            console.error("eror",error);
            return [];
        }});
   const handelSave=()=>{
    
        if(board.Name && board.coulmns){
        const updateData=[...saveData,{Name:board.Name,coulmns:[board.coulmns]}];
        setSaveData(updateData);
        localStorage.setItem('saveData',JSON.stringify(updateData));
        setShowModal(false);
        setBoard({Name:'',coulmns:[]});
    }
   };
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
    const handleSelectBoard = (item) => {
        if (item) {
            dispatch(setSelectBoard(item)); // Dispatching the action
            setSelectedBoard(item); // Update local state
        } else {
            console.error('Invalid item:', item); // Log if item is invalid
        }
    };
    const addNewCoulmn=()=>{
         if(board.coulmns.length<6){
            setBoard(prevBoard=>({
                ...prevBoard,
                coulmns:[...prevBoard.coulmns,''],
            }));
         }
        }
    const handelCoulmnChange=(index,value)=>{
            const updateColumns=[...board.coulmns];
            updateColumns[index]=value;
            setBoard(prevBoard=>({
                ...prevBoard,
                coulmns:updateColumns,
            }))
    }
    return(

    <div className=" grid grid-cols-3  w-full ">
        <div className="flex flex-col bg-white gap-96  h-screen col-span-1 ">
            <div className="flex  flex-col gap-4 pt-2">
                <div className="text-xs text-gray-400 pl-6" > ALL BOARDS</div>

                    {saveData.map((item,index)=>(
                                <div key={index} className="text-gray-500  bg-white text-xl text-left w-10/12 hover:text-white hover:bg-purple rounded-sm pl-6 rounded-r-full h-10 hover:transition ease-out " onClick={()=>{handleSelectBoard(item)}}>{item.Name}</div>

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
        {/* main section */}
        <div className="bg-buttoncolor col-start-2 col-end-4 border-r-2">
            <div className="h-full border flex-wrap ">
                
                {selectedBoard && Array.isArray(selectedBoard.columns) && selectedBoard.columns.map((col,index) => (
                    <div key={index} className="text-center w-1/6 border-dotted"> 
                        {col}
                    </div>
                ))}
   
            </div>
        </div>
       
        { showModal && (
            <div className="bg-black/40 fixed w-full h-screen top-0 left-0">
                <div className=" fixed bg-white top-1/2 left-1/2 w-96 h-max -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-9  rounded-xl ">
                    <span>Add New Board</span>
                    <form className="flex flex-col">
                        <label  className="text-sm p-2 text-gray-400 p2" >Name</label>
                        <input  name="Name" type="text" className=" border-2" value={board.Name}  onChange={handelInputChange}/> 
                        <label className="text-sm p-2 text-gray-400">coulmns</label>
                        {board.coulmns.map((coulmn,index)=>(
                            <input key={index} type="text" className="border-2 p-2 mb-2"
                            value={coulmn}
                            onChange={(e)=>handelCoulmnChange(index,e.target.value)}
                            placeholder={`coulmn ${index+1}`}/>
                        )

                        )}
                    </form>
                    <button className="text-purple p-2 rounded-xl bg-buttoncolor text-base " onClick={addNewCoulmn}> + Add New coulmn</button>
                    <button className="bg-purple text-white font-thin rounded-xl p-2" onClick={handelSave  } > Create New Board</button>
                  
                </div>
            </div>
        )

        }
        
    </div>
        
    
        
    );
}

export default Sidebar;