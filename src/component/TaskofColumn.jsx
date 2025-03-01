import { useDraggable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import{setSelectTask} from "../features/selecttaskSlice"
import { setShowTaskModalMain } from "../features/modalSlice";

const TaskOfColumn = ({ task, columnName, taskIndex,openTaskDetail}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.title,
    data: { task, from: columnName },
    activationConstraint: { distance: 5 },
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined;

  return (
    
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        key={taskIndex}
        className="  h-30 w-full  bg-white  p-5 dark:bg-dark-primary-100 dark:text-white hover:opacity-20 cursor-pointer rounded-lg shadow-md text-left "
        onClick={openTaskDetail}
      >
        <h4 className=" text-sm font-bold p-2">{task.title}</h4>
        <span className="text-gray-400  p-2 text-xs font-bold">
          {" "}
          {`0 of ${task.subtasks.length}  subtasks`}
        </span>
      </div>
   
  );
};
export default TaskOfColumn;
