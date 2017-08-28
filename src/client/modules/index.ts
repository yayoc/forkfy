import { combineReducers } from "redux";
import auth from "./auth";
import search from "./search";
import entity from "./entity";
export default combineReducers({ auth, search, entity });
