import { TASK_TYPE } from "../../constants/taskType";
//------ action wait to loading data
export const actGetLoading = (boolean) => {
  return {
    type: TASK_TYPE.GET_LOADING,
    payload: boolean,
  };
};

//------ action when get all task success
export const actGetAllTaskSuccess = (data) => {
  return {
    type: TASK_TYPE.GET_ALL_TASK_SUCCESS,
    payload: data,
  };
};
//------ action when get all task success
export const actGetTaskByIdSuccess = (data) => {
  return {
    type: TASK_TYPE.GET_TASK_BY_ID_SUCCESS,
    payload: data,
  };
};
//------ action
export const actChangeFilter = (str) => {
  return {
    type: TASK_TYPE.CHANGE_FILTER,
    payload: str,
  };
};
//------ action
export const actGetCurrentPage = (num) => {
  return {
    type: TASK_TYPE.GET_CURRENT_PAGE,
    payload: num,
  };
};
//------ action
export const actGetKeySearch = (str) => {
  return {
    type: TASK_TYPE.GET_KEY_SEARCH,
    payload: str,
  };
};
//------ action
export const actAddTaskSuccess = (boolean) => {
  return {
    type: TASK_TYPE.ADD_NEW_TASK_SUCCESS,
    payload: boolean,
  };
};
//------ action
export const actUpdateTaskSuccess = (boolean) => {
  return {
    type: TASK_TYPE.UPDATE_TASK_SUCCESS,
    payload: boolean,
  };
};

