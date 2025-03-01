import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectBoard } from "../features/selectboardSlice";
import{setSelectTask} from "../features/selecttaskSlice"
import {setShowTaskModalMain } from "../features/modalSlice";
import { DndContext } from "@dnd-kit/core"
import DroppableColumn from "./Column";
import TaskOfColumn from "./TaskofColumn";

function Main() {
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const dispatch = useDispatch();
  const [columns,setColumns]=useState((selectBoard?.columns)||[])
 
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
  
    const taskTitle = active.id;
    const sourceColumnName = active.data.current.from;
    const destinationColumnName = over.id;
  
    if (sourceColumnName === destinationColumnName) return;
  
    let movedTask = null;
  
    // Update local columns state
    const updatedColumns = columns
      .map((col) => {
        if (col.name === sourceColumnName) {
          const newTasks = col.tasks.filter((task) => {
            if (task.title === taskTitle) {
              movedTask = task;
              return false;
            }
            return true;
          });
          return { ...col, tasks: newTasks };
        }
        return col;
      })
      .map((col) => {
        if (col.name === destinationColumnName && movedTask) {
          return { ...col, tasks: [...col.tasks, movedTask] };
        }
        return col;
      });
  
    // Update local state
    setColumns(updatedColumns);
  
    // Create an updated board object and dispatch to Redux
    const updatedBoard = { ...selectBoard, columns: updatedColumns };
    dispatch(setSelectBoard(updatedBoard));
  };
  
  
  const openTaskDetail = (task) => {
    dispatch(setSelectTask(task));
    dispatch(setShowTaskModalMain(true));
  
  };
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("saveNewData") || "[]");
    if (savedData.length > 0) {
      const boardData = savedData.find(
        (item) => item.Name === selectBoard.Name
      );
      if (boardData) {
        dispatch(setSelectBoard(boardData));
        setColumns(boardData.columns);
      }
    }
  }, [selectBoard.Name]);

  return (
    <div className="bg-bgmain dark:bg-dark-primary-200 dark:text-white col-start-1 col-end-10 md:col-start-3  h-[calc(100vh-80px)]  md:col-end-10  overflow-auto max-w-screen-xl">
      <div className=" flex gap-10 pl-6 h-full w-full">
           <DndContext onDragEnd={onDragEnd}>
           {selectBoard &&
          Array.isArray(selectBoard.columns) &&
          selectBoard.columns.map((col, colIndex)=>
                 (
                     <DroppableColumn key={colIndex} column={col}>
                         {col.tasks.map((task,taskIndex)=>(
                           <TaskOfColumn task={task} taskIndex={taskIndex} columnName={col.name} openTaskDetail={()=>openTaskDetail(task)} />
                         ))}

                     </DroppableColumn>
                 ))}
           </DndContext>
           
        
        <div
          className={`${
            Array.isArray(selectBoard.columns) && selectBoard.columns.length < 6
              ? `w-72 flex flex-col gap-6`
              : ` hidden`
          } `}
        >
          <div className=" p-4 "></div>
          <div className=" bg-gradient-to-b from-slate-300 rounded flex  h-full justify-center content-center">
            <button
              className="  text-gray-400 font-bold text-2xl  hover:text-purpledo "
              onClick={() => dispatch(setShowEditBoard(true))}
            >
              {" "}
              + New Coulmn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
