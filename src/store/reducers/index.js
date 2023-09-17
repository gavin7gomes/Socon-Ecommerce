import { combineReducers } from "redux";
import { enableMapSet } from "immer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

enableMapSet();

global.reduxLog = [];

export default combineReducers({
  product: productReducer,
  auth: authReducer
});
