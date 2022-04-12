import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import sideBarReducer from "./reducers";

const rootReducer = combineReducers({
  sideBarReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
