import {combineReducers} from "react-redux"
import TDL2reducer from './tdl2Reducer'

export const rootReducer = combineReducers({
    todolist2: TDL2reducer,
  })