import { TASK_TYPE } from "../../constants/taskType"
//action
export const actGetAllTask = (data) => {
    console.log("vao action get all reducer", data);
    return {
      type: TASK_TYPE.SUCCESS_GET_ALL_TASK,
      payload: data,
    };
  };
  export const actChangeFilter = (str) => {
    return {
      type: TASK_TYPE.CHANGE_FILTER,
      payload: str,
    };
  };
  export const actGetCurrentPage = (num) => {
    return {
      type: TASK_TYPE.GET_CURRENT_PAGE,
      payload: num,
    };
  };
  export const actGetKeySearch = (str) => {
    return {
      type: TASK_TYPE.GET_KEY_SEARCH,
      payload: str,
    };
  };
  
  // export const actAddTask = (data) => {
  //   console.log("vao action add task", data);
  //   return {
  //     type: "todolist2/addTask",
  //     payload: data
  //   }
  // };