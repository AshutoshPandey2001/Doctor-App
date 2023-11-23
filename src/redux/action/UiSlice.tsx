import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    tabBar: true,
    currenttabIndex: 0
}
const uiSlice = createSlice({
    name: 'SET_USER_INTERFACE',
    initialState,
    reducers: {
        setLoading: (state: any, action) => {
            state.isLoading = action.payload
        },
        setTabBar: (state: any, action) => {
            state.tabBar = action.payload
        },
        setCurrrentTabindex: (state: any, action) => {
            state.currenttabIndex = action.payload
        }

    }
})
export const { setLoading, setTabBar, setCurrrentTabindex } = uiSlice.actions;

const uiReducer = uiSlice.reducer;
export default uiReducer