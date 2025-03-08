import { setDeleteModal } from "../features/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSaveboard } from "../features/savedataSlice";
import { setSelectBoard } from "../features/selectboardSlice";

function ModalDelete(props) {
  const selectBoard = useSelector((state) => state.board.selectBoard);
  const { boardsave } = useSelector((state) => state.boardsave);
  const dispatch = useDispatch();
  const handelDelete = () => {
    if (selectBoard) {
      const updateData = boardsave.filter(
        (item) => item.Name !== selectBoard.Name
      );
      localStorage.setItem("saveNewData", JSON.stringify(updateData));
      dispatch(setSelectBoard(updateData[0]));
      dispatch(setSaveboard(updateData));

      dispatch(setDeleteModal(false));
    } else {
      setSelectBoard(null);
    }
  };

  return (
    <div className="bg-black/40 fixed w-full h-full top-0 left-0">
      <div className="bg-white fixed top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-6 rounded-xl">
        <span className="text-red-400">Delete this Board?</span>
        <span className="text-gray-400  font-medium text-xs">
          Are you sure you want to delete the {props.type}? This action will
          remove all columns and tasks and cannot be reversed.
        </span>
        <div className="flex gap-4 text-sm justify-center">
          <button
            className="bg-red-400 rounded-full h-9 text-white w-1/2"
            onClick={handelDelete}
          >
            Delete
          </button>
          <button
            className="bg-slate-300 rounded-full h-9  text-purpledo w-1/2"
            onClick={() => {
              dispatch(setDeleteModal(false));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalDelete;
