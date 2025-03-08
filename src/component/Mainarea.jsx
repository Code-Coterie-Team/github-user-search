import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectBoard } from "../features/selectboardSlice";
import { setSelectTask } from "../features/selecttaskSlice";
import { setShowTaskModalMain, setShowEditBoard } from "../features/modalSlice";
import { DndContext } from "@dnd-kit/core";
import DroppableColumn from "./Column";
import TaskOfColumn from "./TaskofColumn";
import { setSaveboard } from "../features/savedataSlice";

function Main() {
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const { boardsave } = useSelector((state) => state.boardsave);
  const dispatch = useDispatch();
  const color=['#49C4E5','#8471F2','#67E2AE','#e5a449','#2a3fdb','#c36e6e']

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskTitle = active.id;
    const sourceColumnName = active.data.current.from;
    const destinationColumnName = over.id;

    if (sourceColumnName === destinationColumnName) return;

    let movedTask = null;

    const updatedColumns = selectBoard?.columns
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

  

    const updatedBoard = { ...selectBoard, columns: updatedColumns };
    localStorage.setItem("selectBoard", JSON.stringify(updatedBoard));
    dispatch(setSelectBoard(updatedBoard));
  

    const updateBoardSave=boardsave.map((board)=>
    board.Name===selectBoard.Name ?{...board,columns:updatedColumns}:board)
   

      dispatch(setSaveboard(updateBoardSave))
      localStorage.setItem("saveNewData",JSON.stringify(updateBoardSave))

    
    

  };

  const openTaskDetail = (task) => {
    dispatch(setSelectTask(task));
    dispatch(setShowTaskModalMain(true));
  };
  useEffect(()=>{

  })

  return (
    <div className="bg-bgmain dark:bg-dark-primary-200 dark:text-white col-start-1 col-end-10 md:col-start-3  h-[calc(100vh-80px)]  md:col-end-10  overflow-auto max-w-screen-xl">
      <div className=" flex gap-10 pl-6 h-full w-full">
        <DndContext onDragEnd={onDragEnd}>
          {selectBoard  &&selectBoard.columns.length>0 ? (
            selectBoard.columns.map((col, colIndex) => (
              <DroppableColumn key={colIndex} column={col} item={color[colIndex]}>
                {col.tasks.map((task, taskIndex) => (
                  <TaskOfColumn
                    task={task}
                    taskIndex={taskIndex}
                    columnName={col.name}
                    openTaskDetail={() => openTaskDetail(task)}
                  />
                ))}
              </DroppableColumn>
            )) ):(<div className="flex  w-full h-full font-normal justify-center items-center">This Board is empty create new Board</div>) }
        </DndContext>

        <div
          className={`${
                selectBoard && selectBoard.columns.length < 6
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
