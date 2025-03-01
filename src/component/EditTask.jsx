import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { setShowEditTask } from "../features/modalSlice";
import { setSelectBoard } from "../features/selectboardSlice";

function EditTask() {
  const { selectTask } = useSelector((state) => state.selectTask);

  const taskEitRef = useRef(null);
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(selectTask.title);

  const [editDescribe, setEditDescrib] = useState(selectTask.description);
  const [editSub, setEditSub] = useState(selectTask.subtasks || []);
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const [seletColumn, setSeclectCoulmn] = useState(null);
  const { showEditTask } = useSelector((state) => state.modals);


  const handelEditTitle = (e) => {
    const newTitle = e.target.value;
    setEditTitle(newTitle);
  };

  const handelEditDescription = (e) => {
    const newDescription = e.target.value;
    setEditDescrib(newDescription);
  };
  const handelEdtiSubtasks = (index, value) => {
    const newSubtasks = [...editSub];
    newSubtasks[index] = value;
    setEditSub(newSubtasks);
  };
  const handeleditColumn = (e) => {
    const newColumn = selectBoard.columns.find(
      (col) => col.name === e.target.value
    );
    setSeclectCoulmn(newColumn);
  };

  const handelSaveEditTask = () => {
    const updateSelectTask = {
      ...selectTask,
      title: editTitle,
      description: editDescribe,
      subtasks: Array.isArray(editSub) ? editSub : [editSub],
    };

    const currentColumn = selectBoard.columns.find((col) =>
      col.tasks.some((task) => task.title === selectTask.title)
    );

    const updateColumn = selectBoard.columns.map((col) => {
      if (col.name === currentColumn?.name) {
        const updatedTasks = col.tasks.filter(
          (task) => task.title !== selectTask.title
        );
        if (!seletColumn && col.name === currentColumn?.name) {
          return { ...col, tasks: [...updatedTasks, updateSelectTask] };
        }
        return { ...col, tasks: updatedTasks };
      }

      if (col.name === seletColumn?.name) {
        return { ...col, tasks: [...col.tasks, updateSelectTask] };
      }

      return col;
    });

    dispatch(setSelectBoard({ ...selectBoard, columns: updateColumn }));
    dispatch(setShowEditTask(false));
  };

  useEffect(() => {
    if (showEditTask) {
      document.addEventListener("mousedown", handelClick);
    } else {
      document.removeEventListener("mousedown", handelClick);
    }
  }, [showEditTask]);

  const handelClick = (event) => {
    if (taskEitRef.current && !taskEitRef.current.contains(event.target)) {
      dispatch(setShowEditTask(false));
    }
  };

  return (
    <div className="bg-black/40 fixed top-0 left-0 h-full w-full">
      <div
        ref={taskEitRef}
        className="bg-white text-sm font-medium dark:bg-dark-primary-100  text-gray-950  fixed top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl"
      >
        <label className="text-gray-500  bg-white ">Title</label>
        <input
          type="text"
          className="border-2 p-2"
          value={editTitle}
          onChange={handelEditTitle}
        />
        <label className="text-gray-400">Description</label>
        <input
          type="text"
          className="border-2 h-20 p-2"
          value={editDescribe}
          onChange={handelEditDescription}
        />
        <label className="text-gray-400">Subtasks</label>
        {editSub.map((subtask, index) => (
          <input
            type="text"
            className="border-2 p-2 w-full"
            value={subtask}
            onChange={(e) => handelEdtiSubtasks(index, e.target.value)}
          />
        ))}
        {/* <input type="text" className="border-2 p-2"  value={editSub} onChange={(e)=>handelEdtiSubtasks(index,e.target.value)} /> */}
        <button className="bg-buttoncolor text-purpledo rounded-2xl">
          + Add New Subtask
        </button>
        <label className="text-gray-400">Status</label>
        <select
          className="border-2 rounded-2xl p-2"
          value={seletColumn}
          onChange={handeleditColumn}
        >
          <option>
            {selectBoard.columns.find((col) =>
              col.tasks.find((task) => task.title === selectTask.title)
            )?.name || "not found"}
          </option>
          {selectBoard.columns.map((col, index) => (
            <option key={index} value={col.name}>
              {col.name}
            </option>
          ))}
        </select>
        <button
          className=" rounded-2xl bg-purpledo text-white h-10"
          onClick={handelSaveEditTask}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
}

export default EditTask;
