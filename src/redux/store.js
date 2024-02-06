// store.js
import { configureStore } from "@reduxjs/toolkit";

import SidebarReducer from "./SidebarReducer.reducer";

const store = configureStore({
  reducer: SidebarReducer,
});

export default store;
