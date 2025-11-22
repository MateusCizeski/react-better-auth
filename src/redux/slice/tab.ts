import { createSlice } from "@reduxjs/toolkit";

export interface TabState {
  Codigo: number;
  Aba: number;
}

interface TabsSliceState {
  tabs: TabState[];
  tabsIndex: number;
}

const initialState: TabsSliceState = {
  tabs: [],
  tabsIndex: 0,
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabs: (state, action) => {
      state.tabs = action.payload;
    },
    setTabsIndex: (state, action) => {
      state.tabsIndex = action.payload;
    },
  },
});

export const { setTabs, setTabsIndex } = tabsSlice.actions;
export default tabsSlice.reducer;
