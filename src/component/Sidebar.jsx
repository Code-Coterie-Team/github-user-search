import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSelectBoard } from "../features/boardSlice";
import store from "../features/store";
import { setSaveData } from "../features/savedataSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const selectBoard=useSelector((state)=>state.board.selectBoard);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const [board, setBoard] = useState({
        Name: "",
        columns: [{ name: '', tasks: [{title:'',description:'',subtasks:[]}] }], 
    });
    
    const saveNewData=useSelector((state)=>state.data.data);
    console.log(saveNewData);
    
    const handelSave = () => {
        if (board.Name && board.columns.length > 0) {
            const updateData = [...saveNewData, { Name: board.Name, columns: board.columns }];
            dispatch(setSaveData(updateData)); 
            localStorage.setItem('saveData', JSON.stringify(updateData));
            setShowModal(false);
            setBoard({ Name: '', columns: [{ name: '', tasks: [] }] }); 
        }
    };
    useEffect(() => {
            const storeData = localStorage.getItem('savenNewData');
            const parsedData = storeData ? JSON.parse(storeData) : [];
            dispatch(setSaveData(parsedData));
           
    }, [dispatch]);
    
    const handelClickOut = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handelClickOut);
        } else {
            document.removeEventListener('mousedown', handelClickOut);
        }
        return () => {
            document.removeEventListener('mousedown', handelClickOut);
        };
    }, [showModal]);

    useEffect(() => {
        localStorage.setItem('saveNewData', JSON.stringify(saveNewData));
    }, []);

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setBoard(prevBoard => ({
            ...prevBoard,
            [name]: value,
        }));
    };

    const handleSelectBoard = (item) => {
        if (item) {
            dispatch(setSelectBoard(item));
            
        } else {
            console.error('Invalid item:', item);
        }
    };

    const addNewColumn = () => {
        if (board.columns.length < 6) {
            setBoard(prevBoard => ({
                ...prevBoard,
                columns: [...prevBoard.columns, { name: '', tasks: [] }],
            }));
        }
    };

    const handelColumnChange = (index, value) => {
        const updateColumns = [...board.columns];
        updateColumns[index].name = value;
        setBoard(prevBoard => ({
            ...prevBoard,
            columns: updateColumns,
        }));
    };

    return (
        <div className="grid grid-cols-6 w-full">
            <div className="flex flex-col bg-white gap-96 h-screen col-span-1">
                <div className="flex flex-col items-baseline gap-4 pt-2">
                    <div className="text-xs text-gray-400 flex  pl-6">ALL BOARDS</div>
                        {(Array.isArray(saveNewData) && saveNewData.map((item) => (
                        <div className="text-gray-500  text-xl text-left w-10/12 hover:text-white  hover:bg-purpledo rounded-sm pl-6 rounded-r-full h-10 hover:transition ease-out p-2" 
                            onClick={() => handleSelectBoard(item)}>
                            {item.Name}
                        </div>
                    )))}
                    <button className="text-purpledo pl-6" onClick={() => setShowModal(true)}>+ Create New Board</button> 
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center p-2 w-32 bg-gray-300">
                        <button className="rounded bg-purple-900 w-10 h-4"></button>
                    </div>
                </div>
            </div>
            {/* main section */}
            <div className="bg-bgmain col-start-2 col-end-7 border-r-2">
                <div className="h-full border flex gap-4 p-4">
                    {selectBoard && Array.isArray(selectBoard.columns) && selectBoard.columns.map((col, index) => (
                        <div key={index} className="text-center  "> 
                            
                            <div className="flex gap-4  items-center ">
                                <div className="h-3 w-3 rounded-full bg-green-200"></div>
                                <span className="text-gray-400 "> 
                                    {col.name}
                                </span>
                           </div>
                            <div className=" flex flex-col gap-4   border-gray-500 h-full w-56 rounded border-gray-400 ">
                                {col.tasks.map((task,taskIndex)=>(
                                    <div key={taskIndex} className=" w-full p-2 bg-white hover:opacity-20 cursor-pointer rounded">
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                        <ul>
                                            {task.subtasks.map((subtask, subIndex) => (
                                            <li key={subIndex}>{subtask}</li> 
                                            ))}       
                                        </ul>
                                    </div>
                                )
                            )}
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
            {/* modal */}
            {showModal && (
                <div className="bg-black/40 fixed w-full h-screen top-0 left-0">
                    <div 
                        ref={modalRef} 
                        className="fixed bg-white top-1/2 left-1/2 w-96 h-max -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-9 rounded-xl"
                    >
                        <span>Add New Board</span>
                        <form className="flex flex-col">
                            <label className="text-sm p-2 text-gray-400">Name</label>
                            <input 
                                name="Name" 
                                type="text" 
                                className="border-2" 
                                value={board.Name}  
                                onChange={handelInputChange} 
                            />
                            <label className="text-sm p-2 text-gray-400">Columns</label>
                            {board.columns.map((column, index) => (
                                <input 
                                    key={index} 
                                    type="text" 
                                    className="border-2 p-2 mb-2"
                                    value={column.name}
                                    onChange={(e) => handelColumnChange(index, e.target.value)}
                                    placeholder={`Column ${index + 1}`}
                                />
                            ))}
                        </form>
                        <button className="text-purple p-2 rounded-xl bg-buttoncolor text-base" onClick={addNewColumn}> + Add New Column</button>
                        <button className="bg-purpledo text-white font-thin rounded-xl p-2" onClick={handelSave}> Create New Board</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
