import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./slices/user";
import todosReducer from "./slices/todos";

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
