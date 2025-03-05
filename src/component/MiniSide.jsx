import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectBoard } from "../features/selectboardSlice";

import { setSaveboard } from "../features/savedataSlice";
import { setShowModalBoard, setSideOpen } from "../features/modalSlice";
import { setTheme } from "../features/themeSlice";
import GridIcon from "../assets/Gridcon";
import SunIcon from "../assets/SunIcon";
import MoonSvg from "../assets/MoonSvg";

function MiniSide() {
  const dispatch = useDispatch();
  const { selectBoard } = useSelector((state) => state.board);
  const { boardsave } = useSelector(
    (state) => state.boardsave || { boardsave: [] }
  );
  const { theme } = useSelector((state) => state.theme);
  const [isChecked, setIsChecked] = useState(false);
  const miniRef=useRef(null);
  const {sideOpen}=useSelector((state)=>state.modals)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };
  const showBoard=()=>{
    dispatch(setShowModalBoard(true))
    dispatch(setSideOpen(false))
  }
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // useEffect(() => {
  //   const storeData = localStorage.getItem("saveNewData");
  //   if (storeData) {
  //     const parsedData = storeData ? JSON.parse(storeData) : [];
  //     dispatch(setSaveboard(parsedData));
  //   }
  // }, []);
  useEffect(() => {
    if (selectBoard) {
      localStorage.setItem("selectBoard", JSON.stringify(selectBoard));
    }
  }, [selectBoard]);

  const handleSelectBoard = (item) => {
    dispatch(setSelectBoard(item));
    dispatch(setSideOpen(false));
  };
  const handelClick=(event)=>{
    if (miniRef.current && !miniRef.current.contains(event.target)) {
          dispatch(setSideOpen(false));
        }
  }
  useEffect(()=>{
    if(sideOpen){
        document.addEventListener('mousedown',handelClick)
    }
    return ()=>{document.removeEventListener('mousedown',handelClick)}
  },[sideOpen])

  return (
    <div className=" bg-black/40 fixed top-0 left-0  h-full w-full md:hidden">
      <div ref={miniRef}  className="bg-white dark:bg-black w-1/2 h-max  rounded-md  fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  ">
        <div className="flex flex-col  text-center  gap-2  ">
          <div className="text-xs  tracking-widest text-gray-400 flex p-4 ">
            ALL BOARDS {`(${boardsave.length})`}
          </div>
          {Array.isArray(boardsave) &&
            boardsave.map((item, index) => (
              <button
                key={index}
                className={`text-gray-500  pl-6 flex gap-1 font-semibold font-sans text-left w-10/12 hover:text-white hover:bg-purplelight text-xs md:text-base tracking-wide   items-center break-words  rounded-sm  md:pl-6 
                          rounded-r-full h-12 hover:transition ease-out  md:gap-6 ${
                            item.Name === selectBoard.Name
                              ? "bg-purpledo text-white"
                              : ""
                          }`}
                onClick={() => handleSelectBoard(item)}
              >
                <GridIcon />
                <span>{item.Name}</span>
              </button>
            ))}
          <button
            className="text-purpledo pl-6 flex gap-4"
            onClick={showBoard}
          >
            <GridIcon />
            <span className="font-semibold ">+ Create New Board</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8">
          <div className="flex gap-6 justify-center items-center  p-4 rounded-md w-full h-10 bg-bgmain dark:bg-dark-primary-200">
            <MoonSvg />
            <label className="flex cursor-pointer select-none items-center">
              <div className=" relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className=" sr-only"
                />
                <div className="block h-6 w-14 rounded-full border border-purpledo  bg-purpledo"></div>
                <div
                  className={` bg-white absolute  h-4 w-4 rounded-full transition ${
                    isChecked ? "left-1 top-1" : " top-1 left-7"
                  }`}
                ></div>
              </div>
            </label>
            <SunIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniSide;
