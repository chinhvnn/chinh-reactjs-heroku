import { TASK_TYPE } from "../../constants/taskType";
//init state
const initState = {
  isLoading : true,
  isAddTaskSuccess: false,
  isUpdateTaskSuccess :false,
  filter: "All",
  keySearch: "",
  currentPage: 1,
  tasksData: [],
  taskById:{}
};

//reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case TASK_TYPE.GET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TASK_TYPE.GET_ALL_TASK_SUCCESS:
      return {
        ...state,
        tasksData: action.payload,
      };
    case TASK_TYPE.GET_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        taskById: action.payload,
      };
    case TASK_TYPE.ADD_NEW_TASK_SUCCESS:
      return {
        ...state,
        isAddTaskSuccess: action.payload,
      };
    case TASK_TYPE.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isUpdateTaskSuccess: action.payload,
      };
    case TASK_TYPE.CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case TASK_TYPE.GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case TASK_TYPE.GET_KEY_SEARCH:
      return {
        ...state,
        keySearch: action.payload,
      };

    default:
      return state;
  }
  
};

export default rootReducer;
