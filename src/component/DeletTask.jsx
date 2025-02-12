import { useDispatch, useSelector } from "react-redux";

import { setShowTaskDelete } from "../features/modalSlice";
import { setSelectBoard } from "../features/selectboardSlice";

function DeleteTask() {
  const { selectTask } = useSelector((state) => state.selectTask);
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const dispatch = useDispatch();

  const handelDelete = () => {
    const updateTaskData = selectBoard.columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((task) => task.title !== selectTask.title),
    }));
    const storeData = JSON.parse(localStorage.getItem("saveNewData"));
    const updateData = storeData.map((item) => {
      if (item.Name === selectBoard.Name) {
        return { ...item, columns: updateTaskData };
      }
      return item;
    });

    localStorage.setItem("saveNewData", JSON.stringify(updateData));

    dispatch(setSelectBoard({ ...selectBoard, columns: updateTaskData }));

    dispatch(setShowTaskDelete(false));
  };

  return (
    <div className="bg-black/40 fixed w-full h-full top-0 left-0">
      <div className="bg-white fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-6 rounded-xl">
        <span className="text-red-400">Delete this {selectTask.title}?</span>
        <span className="text-gray-400 text-xs">
          Are you sure you want to delete the {selectTask.title} ? This action
          will remove all columns and tasks and cannot be reversed.
        </span>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-400 rounded-full text-white w-1/2"
            onClick={handelDelete}
          >
            Delete
          </button>
          <button
            className="bg-slate-300 rounded-full text-purple w-1/2"
            onClick={() => dispatch(setShowTaskDelete(false))}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
