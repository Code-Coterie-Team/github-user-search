import { createSelector, createSlice } from "@reduxjs/toolkit";
import reducer from "./selectboardSlice";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
