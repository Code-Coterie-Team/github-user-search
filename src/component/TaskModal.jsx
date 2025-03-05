import { useDispatch, useSelector } from "react-redux";
import { setSelectBoard } from "../features/selectboardSlice";
import { useRef, useState, useEffect } from "react";
import { setShowTaskModal } from "../features/modalSlice";


function ModalTask() {
  const modaltaskRef = useRef(null);
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtask, setSubtask] = useState([]);
  const [seletColumn, setSeclectCoulmn] = useState("");

  const { showTaskModal } = useSelector((state) => state.modals);
  const handelSaveTask = () => {
    if (selectBoard && seletColumn) {
      const updateColumns = selectBoard.columns.map((col) => {
        if (col.name === seletColumn) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                title: taskTitle,
                description: taskDescription,
                subtasks: [subtask],
              },
            ],
          };
        }
        return col;
      });

      dispatch(setSelectBoard({ ...selectBoard, columns: updateColumns }));

      // const storeData = JSON.parse(localStorage.getItem("saveNewData" )||['']);
      // const updateData = storeData.map((item) => {
      //   if (item.Name === selectBoard.Name) {
      //     return { ...item, columns: updateColumns };
      //   }
      //   return item;
      // });
      // localStorage.setItem("saveNewData", JSON.stringify(updateData));

      dispatch(setShowTaskModal(false));

      setTaskTitle("");
      setTaskDescription("");
      setSubtask("");
      setSeclectCoulmn("");
    }
  };
  // useEffect(()=>{
  //   const savedData = JSON.parse(localStorage.getItem("saveNewData")) || [];
  //   if (savedData.length > 0) {
  //     const boardData = savedData.find((item) => item.Name === selectBoard.Name);
  //     if (boardData) {
  //       dispatch(setSelectBoard(boardData));
  //     }
  //   }
  // },[selectBoard.Name])
  useEffect(() => {
    if (showTaskModal) {
      document.addEventListener("mousedown", handelclickout);
    } else {
      document.removeEventListener("mousedown", handelclickout);
    }
  }, [showTaskModal]);

  const handelclickout = (event) => {
    if (modaltaskRef.current && !modaltaskRef.current.contains(event.target)) {
      dispatch(setShowTaskModal(false));
    }
  };
  return (
    <div className="bg-black/40 fixed top-0 left-0 h-full w-full">
      <div
        ref={modaltaskRef}
        className="bg-white dark:bg-dark-primary-100  text-gray-950  dark:text-white fixed top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl"
      >
        <span className="text-black text-sm">Add New Task</span>
        <label className="text-modecolor text-xs ">Title</label>
        <input
          type="text"
          className="border-2 border-gray-300 text-sm font-normal  rounded p-2 dark:bg-dark-primary-200 dark:border-dark-primary-100"
          required
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <label className=" text-modecolor text-xs  ">Description</label>
        <input
          type="text"
          className="border-2  border-gray-300 h-20 text-sm font-normal  roundedh-20 p-2 dark:bg-dark-primary-200 dark:border-dark-primary-100"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <label className="text-modecolor text-xs  ">Subtasks</label>
        <input
          type="text"
          className="border-2 p-2 border-gray-300 text-sm font-normal  rounded  dark:bg-dark-primary-200 dark:border-dark-primary-100"
          required
          value={subtask}
          onChange={(e) => setSubtask(e.target.value)}
        />
        <button className="bg-buttoncolor h-10 text-purpledo  text-xs rounded-xl">
          + Add New Subtask
        </button>
        <label className="text-modecolor text-xs ">Status</label>
        <select
          className="border-2 text-modecolor text-xs rounded-2xl p-2 dark:bg-dark-primary-200 dark:border-dark-primary-100"
          value={seletColumn}
          onChange={(e) => setSeclectCoulmn(e.target.value)}
        >
          <option value="" selected></option>
          {selectBoard.columns.map((col, index) => (
            <option className="text-modecolor " key={index} value={col.name}>
              {col.name}
            </option>
          ))}
        </select>
        <button
          className=" rounded-2xl bg-purpledo text-white h-10"
          onClick={handelSaveTask}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

export default ModalTask;
