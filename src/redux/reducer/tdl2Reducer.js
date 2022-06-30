import { TASK_TYPE } from "../../constants/taskType";
//init state
const initState = {
  isLoading : true,
  filter: "All",
  keySearch: "",
  currentPage: 1,
  tasksData: [],
};

//reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case TASK_TYPE.GET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TASK_TYPE.SUCCESS_GET_ALL_TASK:
      return {
        ...state,
        tasksData: action.payload,
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
    // case "todolist2/addTask":
    //   return {
    //     ...state,
    //     tasksData: [...state.tasksData, action.payload],
    //   };

    default:
      return state;
  }
  
};

export default rootReducer;
