import { createSlice } from "@reduxjs/toolkit";

export interface ThemeSlice {
    theme: string
}

const initialState: ThemeSlice = {
    theme: "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state)=>{
            state.theme = state.theme === "light" ? "dark" : "light"
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer