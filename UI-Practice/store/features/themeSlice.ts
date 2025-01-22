import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  value: "light" | "dark";
}

const initialState: ThemeState = {
  value: "light",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme == "dark" ? "light" : "dark";
    },
  },
});

export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
