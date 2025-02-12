import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./selectboardSlice";
import saveBoardSlice from "./savedataSlice";
import { data } from "autoprefixer";
import modalSlice from "./modalSlice";
import themeSlice from "./themeSlice";
import selectTaskSlice from "./selecttaskSlice";

const store = configureStore({
  reducer: {
    board: boardSlice,
    boardsave: saveBoardSlice,
    modals: modalSlice,
    theme: themeSlice,
    selectTask: selectTaskSlice,
  },
});

export default store;
