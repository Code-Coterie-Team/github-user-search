


import { useDroppable } from "@dnd-kit/core";
const DroppableColumn = ({ column, children ,key,item}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.name,
  });

 
  
  return (
    <div ref={setNodeRef} key={key} className="flex gap-10 pl-6 h-full w-full">
      
         
            <div className="flex flex-col w-72  " >
              <div className="text-center   ">
                <div className="flex gap-4  items-center p-4 ">
                 
                    <div
          
                    className={`h-4 w-4 rounded-full `}
                    style={{background:item}}
                   ></div>
                 
                  <span className="text-gray-400  text-xs tracking-widest ">
                    {`${column?.name} (${column?.tasks?.length})`}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col w-72 gap-6 rounded pb-8 border-gray-400 ${
                  column.tasks.length === 0
                    ? "border-2 border-dashed  border-gray-300 h-[73vh] "
                    : ""
                }`}
              >
            
                {children}
              </div>
            </div>
         
      
    </div>
  );
};
export default DroppableColumn;
